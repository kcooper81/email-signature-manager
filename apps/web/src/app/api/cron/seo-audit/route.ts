import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { collectSearchData, collectCompetitorData } from '@/lib/seo/data-collector';
import { analyzeIssues } from '@/lib/seo/analyzer';
import { generateRecommendations } from '@/lib/seo/optimizer';
import { enhanceRecommendation, isClaudeConfigured } from '@/lib/seo/ai-enhancer';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes max (Vercel Pro)

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret) {
      return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 500 });
    }
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createServiceClient();
    const summary: Record<string, unknown> = {};

    // Load settings
    const { data: settings } = await supabase
      .from('seo_settings')
      .select('*')
      .limit(1)
      .single();

    const serpQueryLimit = settings?.daily_serp_query_limit || 50;
    const autoRunEnabled = settings?.auto_run_enabled && settings?.claude_api_enabled;
    const autoRunMinConfidence = settings?.auto_run_min_confidence || 0.85;
    const autoRunTypes: string[] = settings?.auto_run_types || ['meta_title', 'meta_description'];

    // Step 1: Collect Search Console + GA4 data
    const searchResult = await collectSearchData(supabase);
    summary.searchData = {
      snapshotsUpserted: searchResult.upserted,
      errors: searchResult.errors,
    };

    // Step 2: Collect SERP competitor data (if configured)
    if (process.env.SERPER_API_KEY) {
      const serpResult = await collectCompetitorData(supabase, serpQueryLimit);
      summary.competitorData = {
        queriesRun: serpResult.queriesRun,
        errors: serpResult.errors,
      };
    } else {
      summary.competitorData = { skipped: true, reason: 'SERPER_API_KEY not configured' };
    }

    // Step 3: Run analyzer
    const analysisResult = await analyzeIssues(supabase);
    summary.analysis = {
      issuesFound: analysisResult.issuesFound,
      errors: analysisResult.errors,
    };

    // Step 4: Generate recommendations
    const optimizerResult = await generateRecommendations(supabase);
    summary.recommendations = {
      created: optimizerResult.created,
      errors: optimizerResult.errors,
    };

    // Step 5: Auto-run (if enabled)
    if (autoRunEnabled && isClaudeConfigured()) {
      const autoRunResult = await runAutoApply(
        supabase,
        autoRunMinConfidence,
        autoRunTypes
      );
      summary.autoRun = autoRunResult;
    } else {
      summary.autoRun = { skipped: true, reason: autoRunEnabled ? 'Claude API not configured' : 'Auto-run disabled' };
    }

    return NextResponse.json({ success: true, summary });
  } catch (err: any) {
    console.error('SEO audit cron failed:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * Auto-apply high-confidence recommendations with Claude enhancement.
 */
async function runAutoApply(
  supabase: ReturnType<typeof createServiceClient>,
  minConfidence: number,
  allowedTypes: string[]
): Promise<{ applied: number; errors: string[] }> {
  const errors: string[] = [];
  let applied = 0;

  // Get pending recommendations above threshold
  const { data: candidates } = await supabase
    .from('seo_recommendations')
    .select('*')
    .eq('status', 'pending')
    .gte('confidence', minConfidence)
    .in('recommendation_type', allowedTypes);

  for (const rec of candidates || []) {
    try {
      // Enhance with Claude
      const enhanced = await enhanceRecommendation(
        rec.recommendation_type,
        rec.current_value,
        rec.suggested_value,
        rec.data_basis
      );

      // Save AI enhanced value
      await supabase
        .from('seo_recommendations')
        .update({
          ai_enhanced_value: enhanced,
          status: 'applied',
          applied_by: 'auto_run',
          applied_at: new Date().toISOString(),
        })
        .eq('id', rec.id);

      // Apply the override
      if (rec.page_url && (rec.recommendation_type === 'meta_title' || rec.recommendation_type === 'meta_description')) {
        const overrideData: Record<string, any> = {
          page_url: rec.page_url,
          is_active: true,
          recommendation_id: rec.id,
          updated_at: new Date().toISOString(),
        };

        if (rec.recommendation_type === 'meta_title') {
          overrideData.meta_title = enhanced.title || rec.suggested_value?.title;
        }
        if (rec.recommendation_type === 'meta_description') {
          overrideData.meta_description = enhanced.description || rec.suggested_value?.description;
        }

        await supabase
          .from('seo_content_overrides')
          .upsert(overrideData, { onConflict: 'page_url' });

        // Log the change
        await supabase.from('seo_change_log').insert({
          action: 'override_applied',
          page_url: rec.page_url,
          before_value: rec.current_value,
          after_value: enhanced,
          recommendation_id: rec.id,
          performed_by: 'auto_run',
        });
      }

      applied++;
    } catch (error: any) {
      errors.push(`Auto-apply failed for rec ${rec.id}: ${error.message}`);
    }
  }

  return { applied, errors };
}
