import { SupabaseClient } from '@supabase/supabase-js';
import { getCurrentMeta, getStaticPageByCanonical } from './data-collector';
import {
  identifyContentGaps,
  analyzeCompetitorMeta,
  rankOpportunities,
  suggestNewPageTopics,
  type ContentGap,
} from './competitor-intel';

/**
 * Template-based SEO Optimizer — generates recommendation cards from issues + data.
 * Works entirely without Claude API. AI enhancement is optional (see ai-enhancer.ts).
 */

export interface Recommendation {
  page_url: string | null;
  recommendation_type: string;
  current_value: Record<string, unknown> | null;
  suggested_value: Record<string, unknown>;
  rationale: string;
  confidence: number;
  data_basis: Record<string, unknown>;
}

interface IssueRow {
  id: string;
  page_url: string;
  issue_type: string;
  severity: string;
  details: any;
}

interface SnapshotRow {
  page_url: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  top_queries: any[];
  meta_title: string | null;
  meta_description: string | null;
}

/**
 * Generate recommendations from all open issues + competitor data.
 */
export async function generateRecommendations(
  supabase: SupabaseClient
): Promise<{ created: number; errors: string[] }> {
  const errors: string[] = [];
  const recommendations: Recommendation[] = [];

  // Fetch open issues
  const { data: issues } = await supabase
    .from('seo_issues')
    .select('*')
    .eq('status', 'open')
    .order('severity');

  // Fetch recent snapshots for data context
  const { data: snapshots } = await supabase
    .from('seo_snapshots')
    .select('*')
    .order('snapshot_date', { ascending: false })
    .limit(500);

  const snapshotByUrl = new Map<string, SnapshotRow>();
  for (const s of snapshots || []) {
    if (!snapshotByUrl.has(s.page_url)) {
      snapshotByUrl.set(s.page_url, s);
    }
  }

  // Check for existing pending/applied recommendations to avoid duplicates
  const { data: existingRecs } = await supabase
    .from('seo_recommendations')
    .select('page_url, recommendation_type')
    .in('status', ['pending', 'applied']);

  const existingKeys = new Set(
    (existingRecs || []).map((r) => `${r.page_url}::${r.recommendation_type}`)
  );

  // --- Issue-based recommendations ---
  for (const issue of (issues || []) as IssueRow[]) {
    const snapshot = snapshotByUrl.get(issue.page_url);

    switch (issue.issue_type) {
      case 'meta_too_long':
        handleMetaTooLong(issue, snapshot, recommendations);
        break;
      case 'meta_too_short':
        handleMetaTooShort(issue, snapshot, recommendations);
        break;
      case 'low_ctr':
        await handleLowCTR(issue, snapshot, supabase, recommendations);
        break;
      case 'missing_faq_schema':
        handleMissingFAQ(issue, snapshot, recommendations);
        break;
      case 'opportunity_zone':
        handleOpportunityZone(issue, snapshot, recommendations);
        break;
      case 'high_bounce':
        handleHighBounce(issue, snapshot, recommendations);
        break;
    }
  }

  // --- Content gap recommendations ---
  try {
    const gaps = await identifyContentGaps(supabase);
    const ranked = rankOpportunities(gaps);
    const newPageTopics = suggestNewPageTopics(gaps);

    // Existing page improvements
    for (const opp of ranked.filter((r) => r.recommendedAction === 'optimize_existing').slice(0, 20)) {
      const snapshot = snapshotByUrl.get(opp.topCompetitors[0]?.domain || '');
      recommendations.push({
        page_url: opp.topCompetitors[0]?.domain
          ? (snapshotByUrl.get(opp.keyword)?.page_url || null)
          : null,
        recommendation_type: 'expand_content',
        current_value: { keyword: opp.keyword, position: opp.ourPosition },
        suggested_value: {
          action: 'Expand content with sections targeting this keyword',
          keyword: opp.keyword,
          competitorTitles: opp.topCompetitors.map((c) => c.title),
        },
        rationale: `Competitors rank in top ${opp.topCompetitors[0]?.position || 10} for "${opp.keyword}" while we rank at position ${opp.ourPosition || 'N/A'}. Expanding content could improve ranking.`,
        confidence: 0.6,
        data_basis: {
          keyword: opp.keyword,
          ourPosition: opp.ourPosition,
          competitors: opp.topCompetitors,
          searchVolume: opp.searchVolumeBucket,
        },
      });
    }

    // New page recommendations
    for (const topic of newPageTopics.slice(0, 10)) {
      recommendations.push({
        page_url: null,
        recommendation_type: 'new_page',
        current_value: null,
        suggested_value: {
          keyword: topic.keyword,
          category: topic.category,
          competitorTitles: topic.competitorTitles,
          suggestedSlug: keywordToSlug(topic.keyword),
        },
        rationale: `No page targets "${topic.keyword}" but ${topic.competitorTitles.length} competitors rank for it. Creating a page in the "${topic.category}" category could capture this traffic.`,
        confidence: 0.5,
        data_basis: {
          keyword: topic.keyword,
          opportunityScore: topic.opportunityScore,
          competitorTitles: topic.competitorTitles,
        },
      });
    }
  } catch (error: any) {
    errors.push(`Content gap analysis failed: ${error.message}`);
  }

  // --- Persist recommendations (skip duplicates) ---
  let created = 0;
  for (const rec of recommendations) {
    const key = `${rec.page_url}::${rec.recommendation_type}`;
    if (existingKeys.has(key)) continue;

    const { error } = await supabase.from('seo_recommendations').insert({
      page_url: rec.page_url,
      recommendation_type: rec.recommendation_type,
      current_value: rec.current_value,
      suggested_value: rec.suggested_value,
      rationale: rec.rationale,
      confidence: rec.confidence,
      data_basis: rec.data_basis,
      status: 'pending',
    });

    if (error) {
      errors.push(`Failed to insert recommendation: ${error.message}`);
    } else {
      created++;
      existingKeys.add(key);
    }
  }

  return { created, errors };
}

// --- Handler functions for each issue type ---

function handleMetaTooLong(
  issue: IssueRow,
  snapshot: SnapshotRow | undefined,
  out: Recommendation[]
) {
  const details = issue.details;
  const field = details.field as 'title' | 'description';
  const currentValue = details.value as string;
  const maxLen = field === 'title' ? 60 : 155;

  // Trim at sentence boundary
  let suggested = currentValue;
  if (suggested.length > maxLen) {
    const trimmed = suggested.substring(0, maxLen);
    const lastSentence = trimmed.lastIndexOf('.');
    const lastPipe = trimmed.lastIndexOf('|');
    const lastDash = trimmed.lastIndexOf(' - ');
    const breakPoint = Math.max(lastSentence, lastPipe, lastDash);
    suggested = breakPoint > maxLen * 0.5 ? trimmed.substring(0, breakPoint).trim() : trimmed.trim();
  }

  out.push({
    page_url: issue.page_url,
    recommendation_type: field === 'title' ? 'meta_title' : 'meta_description',
    current_value: { [field]: currentValue, length: currentValue.length },
    suggested_value: { [field]: suggested, length: suggested.length },
    rationale: `${field === 'title' ? 'Title' : 'Description'} is ${currentValue.length} characters (max ${maxLen}). May get truncated in search results.`,
    confidence: 0.9,
    data_basis: {
      impressions: snapshot?.impressions || 0,
      clicks: snapshot?.clicks || 0,
      position: snapshot?.position || 0,
    },
  });
}

function handleMetaTooShort(
  issue: IssueRow,
  snapshot: SnapshotRow | undefined,
  out: Recommendation[]
) {
  const details = issue.details;
  const field = details.field as 'title' | 'description';
  const currentValue = details.value as string;
  const topQueries = (snapshot?.top_queries || []).slice(0, 5);

  // Extract keywords from top queries
  const keywords = topQueries
    .map((q: any) => q.query)
    .join(' ')
    .split(/\s+/)
    .filter((w: string) => w.length > 3);

  const uniqueKeywords = [...new Set(keywords)].slice(0, 3);
  const keywordStr = uniqueKeywords.join(', ');

  let suggested = currentValue;
  if (field === 'description' && uniqueKeywords.length > 0) {
    suggested = `${currentValue} Learn about ${keywordStr} and how Siggly helps your team.`;
  } else if (field === 'title') {
    suggested = `${currentValue} | Siggly`;
  }

  out.push({
    page_url: issue.page_url,
    recommendation_type: field === 'title' ? 'meta_title' : 'meta_description',
    current_value: { [field]: currentValue, length: currentValue.length },
    suggested_value: { [field]: suggested, length: suggested.length },
    rationale: `${field === 'title' ? 'Title' : 'Description'} is only ${currentValue.length} characters. Expanding with relevant keywords could improve CTR.`,
    confidence: 0.85,
    data_basis: {
      topQueries: topQueries.slice(0, 3),
      impressions: snapshot?.impressions || 0,
    },
  });
}

async function handleLowCTR(
  issue: IssueRow,
  snapshot: SnapshotRow | undefined,
  supabase: SupabaseClient,
  out: Recommendation[]
) {
  const topQueries = (issue.details.topQueries || snapshot?.top_queries || []).slice(0, 5);
  const currentTitle = snapshot?.meta_title || '';
  const currentDesc = snapshot?.meta_description || '';

  // Get competitor meta for the top query
  const topQuery = topQueries[0]?.query;
  let competitorPatterns: any = null;
  if (topQuery) {
    try {
      competitorPatterns = await analyzeCompetitorMeta(supabase, topQuery);
    } catch {
      // Non-critical
    }
  }

  // Suggest title incorporating top query keywords
  if (currentTitle) {
    const queryKeywords = topQueries
      .map((q: any) => q.query)
      .join(' ')
      .split(/\s+/)
      .filter((w: string) => w.length > 3 && !currentTitle.toLowerCase().includes(w.toLowerCase()));

    const newKeyword = [...new Set<string>(queryKeywords)][0];
    let suggestedTitle = currentTitle;
    if (newKeyword && suggestedTitle.length < 55) {
      suggestedTitle = suggestedTitle.replace(' | Siggly', ` & ${capitalize(newKeyword)} | Siggly`);
      if (suggestedTitle.length > 60) suggestedTitle = currentTitle;
    }

    out.push({
      page_url: issue.page_url,
      recommendation_type: 'meta_title',
      current_value: { title: currentTitle, ctr: issue.details.ctr },
      suggested_value: {
        title: suggestedTitle,
        competitorAvgTitleLength: competitorPatterns?.patterns?.avgTitleLength || null,
      },
      rationale: `CTR is ${(issue.details.ctr * 100).toFixed(1)}% despite ${issue.details.impressions} impressions. Title may not be compelling enough for searchers.`,
      confidence: 0.6,
      data_basis: {
        impressions: issue.details.impressions,
        ctr: issue.details.ctr,
        position: issue.details.position,
        topQueries: topQueries.slice(0, 3),
        competitorPatterns: competitorPatterns?.patterns || null,
      },
    });
  }

  // Suggest description rewrite
  if (currentDesc) {
    const queryStr = topQueries.map((q: any) => q.query).slice(0, 2).join(' and ');
    const suggestedDesc = `Discover how Siggly helps with ${queryStr}. ${currentDesc.split('.')[0]}.`;

    out.push({
      page_url: issue.page_url,
      recommendation_type: 'meta_description',
      current_value: { description: currentDesc, ctr: issue.details.ctr },
      suggested_value: {
        description: suggestedDesc.length <= 160 ? suggestedDesc : suggestedDesc.substring(0, 157) + '...',
      },
      rationale: `Low CTR (${(issue.details.ctr * 100).toFixed(1)}%) with strong position (${issue.details.position.toFixed(1)}). Description may not match search intent.`,
      confidence: 0.6,
      data_basis: {
        impressions: issue.details.impressions,
        ctr: issue.details.ctr,
        topQueries: topQueries.slice(0, 3),
      },
    });
  }
}

function handleMissingFAQ(
  issue: IssueRow,
  snapshot: SnapshotRow | undefined,
  out: Recommendation[]
) {
  const topQueries = snapshot?.top_queries || [];
  const keyword = issue.details.keyword;

  // Generate template FAQs from search queries
  const faqQueries = topQueries
    .filter((q: any) => q.query.includes('?') || q.query.startsWith('how') || q.query.startsWith('what') || q.query.startsWith('why'))
    .slice(0, 3);

  const templateFaqs = faqQueries.length > 0
    ? faqQueries.map((q: any) => ({
        question: capitalize(q.query) + (q.query.endsWith('?') ? '' : '?'),
        answer: `Siggly provides comprehensive solutions for ${q.query.replace('?', '')}. Our platform helps teams manage email signatures effectively.`,
      }))
    : [
        {
          question: `What is the best email signature solution for ${keyword || 'teams'}?`,
          answer: 'Siggly offers a comprehensive email signature management platform designed for teams of all sizes, with features like centralized management, template design, and automatic deployment.',
        },
        {
          question: `How does Siggly compare to other ${keyword || 'email signature'} tools?`,
          answer: 'Siggly stands out with its Google Workspace and Microsoft 365 integrations, easy-to-use template designer, and affordable pricing starting at $1.50/user/month.',
        },
      ];

  out.push({
    page_url: issue.page_url,
    recommendation_type: 'add_faq',
    current_value: { faqs: [] },
    suggested_value: { faqs: templateFaqs },
    rationale: `Competitors have FAQ schema in search results for "${keyword}". Adding FAQs could improve visibility and capture featured snippets.`,
    confidence: 0.7,
    data_basis: {
      keyword,
      topQueries: topQueries.slice(0, 5),
      impressions: snapshot?.impressions || 0,
    },
  });
}

function handleOpportunityZone(
  issue: IssueRow,
  snapshot: SnapshotRow | undefined,
  out: Recommendation[]
) {
  // Page ranks 5-20 — could be improved with content additions
  const url = new URL(issue.page_url);
  const canonical = url.pathname;
  const page = getStaticPageByCanonical(canonical);

  if (page && (!page.sections || page.sections.length < 3)) {
    out.push({
      page_url: issue.page_url,
      recommendation_type: 'expand_content',
      current_value: {
        sectionCount: page.sections?.length || 0,
        position: issue.details.position,
      },
      suggested_value: {
        action: 'Add 2-3 content sections to strengthen topical authority',
        suggestedSections: ['benefits', 'how-it-works', 'checklist'],
      },
      rationale: `Page ranks at position ${issue.details.position.toFixed(1)} with ${issue.details.impressions} impressions but only has ${page.sections?.length || 0} content sections. Adding more depth could push it into the top 5.`,
      confidence: 0.65,
      data_basis: {
        position: issue.details.position,
        impressions: issue.details.impressions,
        clicks: issue.details.clicks,
      },
    });
  }
}

function handleHighBounce(
  issue: IssueRow,
  snapshot: SnapshotRow | undefined,
  out: Recommendation[]
) {
  out.push({
    page_url: issue.page_url,
    recommendation_type: 'add_internal_links',
    current_value: { bounceRate: issue.details.bounceRate },
    suggested_value: {
      action: 'Add internal links to related pages to reduce bounce rate',
      suggestedLinkCount: 3,
    },
    rationale: `Bounce rate is ${(issue.details.bounceRate * 100).toFixed(0)}% with ${issue.details.sessions} sessions. Adding internal links and CTAs could improve engagement.`,
    confidence: 0.6,
    data_basis: {
      bounceRate: issue.details.bounceRate,
      sessions: issue.details.sessions,
    },
  });
}

// --- Utilities ---

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function keywordToSlug(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
