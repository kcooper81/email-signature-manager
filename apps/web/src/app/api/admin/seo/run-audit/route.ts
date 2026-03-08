import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdmin } from '@/lib/seo/admin-auth';
import { collectSearchData, collectCompetitorData } from '@/lib/seo/data-collector';
import { analyzeIssues } from '@/lib/seo/analyzer';
import { generateRecommendations } from '@/lib/seo/optimizer';
import { generateRecsFromContentScores } from '@/lib/seo/score-to-recs';
import { mergeConfig } from '@/lib/seo/config';

/**
 * Auto-run: automatically apply recommendations that meet the confidence
 * threshold and match the allowed types from settings.
 */
async function autoApplyRecommendations(
  supabaseAdmin: any,
  minConfidence: number,
  allowedTypes: string[],
  userId: string
): Promise<{ applied: number; errors: string[] }> {
  const errors: string[] = [];
  let applied = 0;

  if (allowedTypes.length === 0) return { applied, errors };

  // Fetch pending recommendations that qualify for auto-run
  const { data: recs, error: fetchError } = await supabaseAdmin
    .from('seo_recommendations')
    .select('*')
    .eq('status', 'pending')
    .gte('confidence', minConfidence)
    .in('recommendation_type', allowedTypes)
    .order('confidence', { ascending: false })
    .limit(50);

  if (fetchError || !recs || recs.length === 0) {
    if (fetchError) errors.push(`Auto-run fetch failed: ${fetchError.message}`);
    return { applied, errors };
  }

  const now = new Date().toISOString();

  for (const rec of recs) {
    try {
      // Skip new_page — always requires manual publish
      if (rec.recommendation_type === 'new_page') continue;

      const suggestedValue = rec.suggested_value as Record<string, unknown>;

      // Update recommendation status
      const { error: updateError } = await supabaseAdmin
        .from('seo_recommendations')
        .update({
          status: 'applied',
          applied_by: 'auto-run',
          applied_at: now,
        })
        .eq('id', rec.id);

      if (updateError) {
        errors.push(`Auto-apply ${rec.id}: ${updateError.message}`);
        continue;
      }

      // Apply content override if applicable
      if (rec.page_url) {
        const overrideData: Record<string, unknown> = {
          page_url: rec.page_url,
          is_active: true,
          recommendation_id: rec.id,
          updated_at: now,
        };

        switch (rec.recommendation_type) {
          case 'meta_title':
            overrideData.meta_title = suggestedValue.title || null;
            break;
          case 'meta_description':
            overrideData.meta_description = suggestedValue.description || null;
            break;
          case 'add_faq':
            overrideData.additional_faqs = suggestedValue.faqs || [];
            break;
          default:
            break;
        }

        if (Object.keys(overrideData).length > 4) {
          const { error: upsertError } = await supabaseAdmin
            .from('seo_content_overrides')
            .upsert(overrideData, { onConflict: 'page_url' });

          if (upsertError) {
            errors.push(`Auto-apply override ${rec.id}: ${upsertError.message}`);
            continue;
          }
        }
      }

      // Log the auto-applied action
      await supabaseAdmin.from('seo_change_log').insert({
        action: 'auto_run_applied',
        page_url: rec.page_url,
        details: {
          recommendation_id: rec.id,
          recommendation_type: rec.recommendation_type,
          confidence: rec.confidence,
          suggested_value: rec.suggested_value,
          auto_run_by: userId,
        },
      });

      applied++;
    } catch (err: any) {
      errors.push(`Auto-apply ${rec.id}: ${err.message}`);
    }
  }

  return { applied, errors };
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin, userId } = auth;

    const startTime = Date.now();
    const allErrors: string[] = [];

    // Load algorithm config + auto-run settings
    const { data: settings } = await supabaseAdmin
      .from('seo_settings')
      .select('algorithm_config, daily_serp_query_limit, auto_run_enabled, auto_run_min_confidence, auto_run_types, claude_api_enabled')
      .limit(1)
      .single();

    const config = mergeConfig(settings?.algorithm_config);
    const serpQueryLimit = settings?.daily_serp_query_limit || 50;

    // Step 1: Collect search data (Search Console + GA4)
    const searchResult = await collectSearchData(supabaseAdmin, config);
    allErrors.push(...searchResult.errors);

    // Step 2: Collect competitor SERP data
    const competitorResult = await collectCompetitorData(supabaseAdmin, serpQueryLimit, config);
    allErrors.push(...competitorResult.errors);

    // Step 3: Analyze issues from collected data
    const analysisResult = await analyzeIssues(supabaseAdmin, config);
    allErrors.push(...analysisResult.errors);

    // Step 4: Generate recommendations from issues
    const recommendationResult = await generateRecommendations(supabaseAdmin, config);
    allErrors.push(...recommendationResult.errors);

    // Step 5: Auto-apply high-confidence recommendations (if enabled)
    let autoApplyResult = { applied: 0, errors: [] as string[] };
    if (settings?.auto_run_enabled && settings?.auto_run_min_confidence) {
      autoApplyResult = await autoApplyRecommendations(
        supabaseAdmin,
        settings.auto_run_min_confidence,
        settings.auto_run_types || [],
        userId
      );
      allErrors.push(...autoApplyResult.errors);
    }

    // Step 6: Generate recommendations from content score issues
    let contentScoreResult = { created: 0, skipped: 0 };
    try {
      contentScoreResult = await generateRecsFromContentScores(supabaseAdmin);
    } catch (err: any) {
      allErrors.push(`Content score recs failed: ${err.message}`);
    }

    const duration = Date.now() - startTime;

    // Log the audit run
    await supabaseAdmin.from('seo_change_log').insert({
      action: 'manual_audit_run',
      details: {
        triggered_by: userId,
        snapshots_upserted: searchResult.upserted,
        competitor_queries_run: competitorResult.queriesRun,
        issues_found: analysisResult.issuesFound,
        recommendations_created: recommendationResult.created,
        content_score_recs_created: contentScoreResult.created,
        content_score_recs_skipped: contentScoreResult.skipped,
        auto_applied: autoApplyResult.applied,
        duration_ms: duration,
        errors: allErrors,
      },
    });

    return NextResponse.json({
      success: true,
      summary: {
        snapshots_upserted: searchResult.upserted,
        competitor_queries_run: competitorResult.queriesRun,
        issues_found: analysisResult.issuesFound,
        recommendations_created: recommendationResult.created,
        content_score_recs_created: contentScoreResult.created,
        auto_applied: autoApplyResult.applied,
        duration_ms: duration,
        errors: allErrors,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
