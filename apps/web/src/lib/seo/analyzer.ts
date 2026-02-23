import { SupabaseClient } from '@supabase/supabase-js';
import { type SEOEngineConfig, DEFAULT_CONFIG } from './config';

/**
 * SEO Issue Analyzer — detects problems from snapshot + competitor data.
 */

export interface SEOIssue {
  page_url: string;
  issue_type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  details: Record<string, unknown>;
}

interface SnapshotRow {
  page_url: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  top_queries: any[];
  sessions: number;
  bounce_rate: number;
  meta_title: string | null;
  meta_description: string | null;
  snapshot_date: string;
}

interface CompetitorRow {
  keyword: string;
  our_position: number | null;
  our_url: string | null;
  competitors: any[];
  serp_features: Record<string, boolean>;
}

/**
 * Run all issue detection rules against current data.
 */
export async function analyzeIssues(
  supabase: SupabaseClient,
  config: SEOEngineConfig = DEFAULT_CONFIG
): Promise<{ issuesFound: number; errors: string[] }> {
  const errors: string[] = [];
  const allIssues: SEOIssue[] = [];

  // Fetch recent and comparison snapshots
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const comparisonStart = new Date();
  comparisonStart.setDate(comparisonStart.getDate() - config.comparisonWindowDays * 2);
  const comparisonEnd = new Date();
  comparisonEnd.setDate(comparisonEnd.getDate() - config.comparisonWindowDays);

  // Get most recent snapshots
  const { data: currentSnapshots } = await supabase
    .from('seo_snapshots')
    .select('*')
    .gte('snapshot_date', new Date(Date.now() - config.recentSnapshotDays * 86400000).toISOString().split('T')[0])
    .order('snapshot_date', { ascending: false });

  // Get comparison period snapshots
  const { data: priorSnapshots } = await supabase
    .from('seo_snapshots')
    .select('*')
    .gte('snapshot_date', comparisonStart.toISOString().split('T')[0])
    .lte('snapshot_date', comparisonEnd.toISOString().split('T')[0]);

  // Get competitor rankings
  const { data: competitorData } = await supabase
    .from('competitor_rankings')
    .select('*')
    .gte('captured_at', new Date(Date.now() - config.recentSnapshotDays * 86400000).toISOString())
    .order('captured_at', { ascending: false });

  // Get recently changed pages (within lockout window) to skip
  const { data: recentChanges } = await supabase
    .from('seo_change_log')
    .select('page_url, created_at')
    .in('action', ['override_applied', 'page_published'])
    .gte(
      'created_at',
      new Date(Date.now() - config.changeLockoutDays * 86400000).toISOString()
    );

  const lockedPages = new Set(
    (recentChanges || []).map((c) => c.page_url).filter(Boolean)
  );

  // Deduplicate snapshots (keep most recent per page)
  const latestByPage = new Map<string, SnapshotRow>();
  for (const snap of currentSnapshots || []) {
    if (!latestByPage.has(snap.page_url)) {
      latestByPage.set(snap.page_url, snap);
    }
  }

  const priorByPage = new Map<string, SnapshotRow>();
  for (const snap of priorSnapshots || []) {
    const existing = priorByPage.get(snap.page_url);
    if (!existing || snap.impressions > existing.impressions) {
      priorByPage.set(snap.page_url, snap);
    }
  }

  // --- Issue detection rules ---

  for (const [pageUrl, current] of latestByPage) {
    if (lockedPages.has(pageUrl)) continue;

    // 1. Low CTR (high impressions, position in top N, but low CTR)
    if (
      current.impressions >= config.minImpressionsForCTR &&
      current.ctr < config.lowCTRThreshold &&
      current.position <= config.lowCTRMaxPosition
    ) {
      allIssues.push({
        page_url: pageUrl,
        issue_type: 'low_ctr',
        severity: 'high',
        details: {
          impressions: current.impressions,
          ctr: current.ctr,
          position: current.position,
          topQueries: (current.top_queries || []).slice(0, 5),
        },
      });
    }

    // 2. Declining traffic
    const prior = priorByPage.get(pageUrl);
    if (prior && prior.clicks > 0) {
      const decline = (prior.clicks - current.clicks) / prior.clicks;
      if (decline > config.trafficDeclineMedium) {
        allIssues.push({
          page_url: pageUrl,
          issue_type: 'declining_traffic',
          severity: decline > config.trafficDeclineHigh ? 'high' : 'medium',
          details: {
            currentClicks: current.clicks,
            priorClicks: prior.clicks,
            declinePercent: Math.round(decline * 100),
          },
        });
      }
    }

    // 3. Opportunity zone (configurable position range, decent impressions)
    if (
      current.position >= config.opportunityZoneMinPosition &&
      current.position <= config.opportunityZoneMaxPosition &&
      current.impressions >= config.opportunityZoneMinImpressions
    ) {
      allIssues.push({
        page_url: pageUrl,
        issue_type: 'opportunity_zone',
        severity: 'medium',
        details: {
          position: current.position,
          impressions: current.impressions,
          clicks: current.clicks,
        },
      });
    }

    // 4. High bounce rate
    if (current.bounce_rate > config.highBounceThreshold && current.sessions > config.highBounceMinSessions) {
      allIssues.push({
        page_url: pageUrl,
        issue_type: 'high_bounce',
        severity: 'medium',
        details: {
          bounceRate: current.bounce_rate,
          sessions: current.sessions,
        },
      });
    }

    // 5. Meta too short
    if (current.meta_title && current.meta_title.length < config.metaTitleMinLength) {
      allIssues.push({
        page_url: pageUrl,
        issue_type: 'meta_too_short',
        severity: 'low',
        details: {
          field: 'title',
          length: current.meta_title.length,
          value: current.meta_title,
        },
      });
    }
    if (current.meta_description && current.meta_description.length < config.metaDescMinLength) {
      allIssues.push({
        page_url: pageUrl,
        issue_type: 'meta_too_short',
        severity: 'low',
        details: {
          field: 'description',
          length: current.meta_description.length,
          value: current.meta_description,
        },
      });
    }

    // 6. Meta too long
    if (current.meta_title && current.meta_title.length > config.metaTitleMaxLength) {
      allIssues.push({
        page_url: pageUrl,
        issue_type: 'meta_too_long',
        severity: 'low',
        details: {
          field: 'title',
          length: current.meta_title.length,
          value: current.meta_title,
        },
      });
    }
    if (current.meta_description && current.meta_description.length > config.metaDescMaxLength) {
      allIssues.push({
        page_url: pageUrl,
        issue_type: 'meta_too_long',
        severity: 'low',
        details: {
          field: 'description',
          length: current.meta_description.length,
          value: current.meta_description,
        },
      });
    }

    // 7. No impressions for 14+ days
    if (current.impressions === 0 && current.clicks === 0) {
      // Check if page has had zero impressions consistently
      allIssues.push({
        page_url: pageUrl,
        issue_type: 'no_impressions',
        severity: 'critical',
        details: {
          message: 'Page has 0 impressions in the reporting period',
        },
      });
    }
  }

  // --- Competitor-based issues ---
  const competitorByKeyword = new Map<string, CompetitorRow>();
  for (const cr of competitorData || []) {
    if (!competitorByKeyword.has(cr.keyword)) {
      competitorByKeyword.set(cr.keyword, cr);
    }
  }

  for (const [keyword, cr] of competitorByKeyword) {
    // 8. Content gap — competitor ranks in top positions, we're absent or beyond max
    if (cr.our_position === null || cr.our_position > config.contentGapMaxPosition) {
      const topCompetitors = (cr.competitors || []).filter(
        (c: any) => c.position <= config.competitorTopPosition
      );
      if (topCompetitors.length > 0) {
        allIssues.push({
          page_url: cr.our_url || keyword,
          issue_type: 'content_gap',
          severity: 'high',
          details: {
            keyword,
            ourPosition: cr.our_position,
            topCompetitors: topCompetitors.slice(0, 3).map((c: any) => ({
              domain: c.domain,
              position: c.position,
              title: c.title,
            })),
          },
        });
      }
    }

    // 9. Competitor outranking — we rank in configurable range, competitor outranks us
    if (cr.our_position && cr.our_position >= config.outrankedMinPosition && cr.our_position <= config.outrankedMaxPosition) {
      const topCompetitors = (cr.competitors || []).filter(
        (c: any) => c.position <= config.outrankedByPosition
      );
      if (topCompetitors.length > 0) {
        allIssues.push({
          page_url: cr.our_url || keyword,
          issue_type: 'competitor_outranking',
          severity: 'medium',
          details: {
            keyword,
            ourPosition: cr.our_position,
            competitorsAhead: topCompetitors.slice(0, 3).map((c: any) => ({
              domain: c.domain,
              position: c.position,
              title: c.title,
            })),
          },
        });
      }
    }

    // 10. Missing FAQ schema
    if (cr.serp_features?.faq && cr.our_url) {
      allIssues.push({
        page_url: cr.our_url,
        issue_type: 'missing_faq_schema',
        severity: 'medium',
        details: {
          keyword,
          message: 'Competitors have FAQ schema in SERP results for this keyword',
        },
      });
    }
  }

  // --- Persist issues ---
  const now = new Date().toISOString();

  for (const issue of allIssues) {
    // Check if issue already exists
    const { data: existing } = await supabase
      .from('seo_issues')
      .select('id, status')
      .eq('page_url', issue.page_url)
      .eq('issue_type', issue.issue_type)
      .in('status', ['open', 'dismissed'])
      .limit(1)
      .single();

    if (existing) {
      // Update last_detected_at if still open
      if (existing.status === 'open') {
        await supabase
          .from('seo_issues')
          .update({
            last_detected_at: now,
            severity: issue.severity,
            details: issue.details,
          })
          .eq('id', existing.id);
      }
      // Don't re-open dismissed issues
    } else {
      await supabase.from('seo_issues').insert({
        page_url: issue.page_url,
        issue_type: issue.issue_type,
        severity: issue.severity,
        status: 'open',
        details: issue.details,
        first_detected_at: now,
        last_detected_at: now,
      });
    }
  }

  // Resolve issues that are no longer detected
  const currentIssueKeys = new Set(
    allIssues.map((i) => `${i.page_url}::${i.issue_type}`)
  );

  const { data: openIssues } = await supabase
    .from('seo_issues')
    .select('id, page_url, issue_type')
    .eq('status', 'open');

  for (const oi of openIssues || []) {
    const key = `${oi.page_url}::${oi.issue_type}`;
    if (!currentIssueKeys.has(key)) {
      await supabase
        .from('seo_issues')
        .update({ status: 'resolved', resolved_at: now })
        .eq('id', oi.id);
    }
  }

  return { issuesFound: allIssues.length, errors };
}
