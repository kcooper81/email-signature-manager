import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdmin } from '@/lib/seo/admin-auth';
import { collectSearchData, collectCompetitorData } from '@/lib/seo/data-collector';
import { analyzeIssues } from '@/lib/seo/analyzer';
import { generateRecommendations } from '@/lib/seo/optimizer';
import { mergeConfig } from '@/lib/seo/config';

export async function POST(request: NextRequest) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin, userId } = auth;

    const startTime = Date.now();
    const allErrors: string[] = [];

    // Load algorithm config from settings
    const { data: settings } = await supabaseAdmin
      .from('seo_settings')
      .select('algorithm_config, daily_serp_query_limit')
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

    const duration = Date.now() - startTime;

    // Log the manual audit run
    await supabaseAdmin.from('seo_change_log').insert({
      action: 'manual_audit_run',
      details: {
        triggered_by: userId,
        snapshots_upserted: searchResult.upserted,
        competitor_queries_run: competitorResult.queriesRun,
        issues_found: analysisResult.issuesFound,
        recommendations_created: recommendationResult.created,
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
        duration_ms: duration,
        errors: allErrors,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
