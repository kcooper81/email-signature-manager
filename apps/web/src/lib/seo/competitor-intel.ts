import { SupabaseClient } from '@supabase/supabase-js';
import { type SEOEngineConfig, DEFAULT_CONFIG } from './config';

/**
 * Competitor Intelligence Engine — identifies content gaps,
 * analyzes competitor meta patterns, and ranks opportunities.
 */

export const KNOWN_COMPETITORS = [
  { domain: 'exclaimer.com', name: 'Exclaimer' },
  { domain: 'codetwo.com', name: 'CodeTwo' },
  { domain: 'wisestamp.com', name: 'WiseStamp' },
  { domain: 'newoldstamp.com', name: 'Newoldstamp' },
  { domain: 'rocketseed.com', name: 'Rocketseed' },
  { domain: 'opensense.com', name: 'Opensense' },
  { domain: 'sigstr.com', name: 'Sigstr' },
  { domain: 'bybrand.io', name: 'Bybrand' },
  { domain: 'mysignature.io', name: 'MySignature' },
] as const;

const COMPETITOR_DOMAINS = new Set(KNOWN_COMPETITORS.map((c) => c.domain));

export interface ContentGap {
  keyword: string;
  ourPosition: number | null;
  topCompetitors: {
    domain: string;
    position: number;
    title: string;
    description: string;
  }[];
  searchVolumeBucket: string;
  opportunityScore: number;
  suggestedCategory: string | null;
}

export interface CompetitorMetaAnalysis {
  keyword: string;
  competitorMeta: {
    domain: string;
    title: string;
    titleLength: number;
    description: string;
    descriptionLength: number;
    hasKeywordInTitle: boolean;
    hasCTA: boolean;
  }[];
  patterns: {
    avgTitleLength: number;
    avgDescLength: number;
    commonWords: string[];
    ctaPresenceRate: number;
  };
}

export interface RankedOpportunity extends ContentGap {
  estimatedEffort: 'low' | 'medium' | 'high';
  recommendedAction: 'optimize_existing' | 'create_new_page' | 'add_content';
}

// Category mapping: maps keywords to likely SEO page categories
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  alternatives: ['alternative', 'vs', 'versus', 'compared', 'replacement', 'switch from'],
  features: ['feature', 'tool', 'tracking', 'analytics', 'template', 'editor', 'deployment'],
  industries: ['industry', 'healthcare', 'legal', 'finance', 'real estate', 'education', 'manufacturing'],
  'use-cases': ['use case', 'how to', 'for teams', 'for companies', 'branding', 'compliance'],
  integrations: ['integration', 'google workspace', 'microsoft 365', 'outlook', 'gmail', 'hubspot'],
  guides: ['guide', 'tutorial', 'setup', 'configure', 'best practices'],
  compare: ['compare', 'comparison', 'vs', 'versus'],
  platforms: ['platform', 'google', 'microsoft', 'apple', 'android'],
  compliance: ['compliance', 'gdpr', 'hipaa', 'regulation', 'legal requirement'],
  'migrate-from': ['migrate', 'switch', 'move from', 'transition'],
};

/**
 * Identify keywords where competitors rank but we don't.
 */
export async function identifyContentGaps(
  supabase: SupabaseClient,
  config: SEOEngineConfig = DEFAULT_CONFIG
): Promise<ContentGap[]> {
  const { data: rankings } = await supabase
    .from('competitor_rankings')
    .select('*')
    .gte('captured_at', new Date(Date.now() - 7 * 86400000).toISOString())
    .order('captured_at', { ascending: false });

  if (!rankings || rankings.length === 0) return [];

  // Dedupe by keyword (keep most recent)
  const byKeyword = new Map<string, any>();
  for (const r of rankings) {
    if (!byKeyword.has(r.keyword)) {
      byKeyword.set(r.keyword, r);
    }
  }

  const gaps: ContentGap[] = [];

  for (const [keyword, ranking] of byKeyword) {
    // We're absent or ranking poorly (beyond max position)
    if (ranking.our_position !== null && ranking.our_position <= config.contentGapMaxPosition) continue;

    const knownCompetitors = (ranking.competitors || []).filter((c: any) =>
      COMPETITOR_DOMAINS.has(c.domain)
    );

    // At least one known competitor in top 10
    const topKnownCompetitors = knownCompetitors.filter(
      (c: any) => c.position <= 10
    );
    if (topKnownCompetitors.length === 0) continue;

    const suggestedCategory = suggestCategory(keyword);
    const impressionScore =
      ranking.search_volume_bucket === 'high'
        ? 3
        : ranking.search_volume_bucket === 'medium'
          ? 2
          : 1;
    const competitionScore = topKnownCompetitors.length;
    const positionScore = ranking.our_position === null ? 3 : 1; // Absent = higher opportunity

    gaps.push({
      keyword,
      ourPosition: ranking.our_position,
      topCompetitors: topKnownCompetitors.slice(0, 5).map((c: any) => ({
        domain: c.domain,
        position: c.position,
        title: c.title || '',
        description: c.description || '',
      })),
      searchVolumeBucket: ranking.search_volume_bucket,
      opportunityScore: impressionScore * 2 + competitionScore + positionScore,
      suggestedCategory,
    });
  }

  return gaps.sort((a, b) => b.opportunityScore - a.opportunityScore);
}

/**
 * Analyze competitor meta patterns for a given keyword.
 */
export async function analyzeCompetitorMeta(
  supabase: SupabaseClient,
  keyword: string
): Promise<CompetitorMetaAnalysis | null> {
  const { data: ranking } = await supabase
    .from('competitor_rankings')
    .select('*')
    .eq('keyword', keyword)
    .order('captured_at', { ascending: false })
    .limit(1)
    .single();

  if (!ranking) return null;

  const ctaWords = ['free', 'try', 'start', 'get', 'sign up', 'demo', 'download'];

  const competitorMeta = (ranking.competitors || [])
    .filter((c: any) => c.position <= 10)
    .map((c: any) => {
      const title = c.title || '';
      const desc = c.description || '';
      const lowerTitle = title.toLowerCase();

      return {
        domain: c.domain,
        title,
        titleLength: title.length,
        description: desc,
        descriptionLength: desc.length,
        hasKeywordInTitle: lowerTitle.includes(keyword.toLowerCase().split(' ')[0]),
        hasCTA: ctaWords.some((w) => lowerTitle.includes(w) || desc.toLowerCase().includes(w)),
      };
    });

  if (competitorMeta.length === 0) return null;

  // Extract patterns
  const avgTitleLength =
    competitorMeta.reduce((sum: number, c: any) => sum + c.titleLength, 0) /
    competitorMeta.length;
  const avgDescLength =
    competitorMeta.reduce((sum: number, c: any) => sum + c.descriptionLength, 0) /
    competitorMeta.length;
  const ctaPresenceRate =
    competitorMeta.filter((c: any) => c.hasCTA).length / competitorMeta.length;

  // Find common words across titles
  const wordFreq = new Map<string, number>();
  const stopWords = new Set([
    'the', 'a', 'an', 'is', 'are', 'in', 'for', 'of', 'to', 'and', 'or',
    'with', 'by', 'on', 'at', '|', '-', '—',
  ]);
  for (const cm of competitorMeta) {
    const words = (cm as any).title.toLowerCase().split(/\s+/).filter(
      (w: string) => w.length > 2 && !stopWords.has(w)
    );
    const uniqueWords = new Set<string>(words);
    for (const w of uniqueWords) {
      wordFreq.set(w as string, (wordFreq.get(w as string) || 0) + 1);
    }
  }

  const commonWords = [...wordFreq.entries()]
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);

  return {
    keyword,
    competitorMeta,
    patterns: {
      avgTitleLength: Math.round(avgTitleLength),
      avgDescLength: Math.round(avgDescLength),
      commonWords,
      ctaPresenceRate: Math.round(ctaPresenceRate * 100) / 100,
    },
  };
}

/**
 * Rank content gaps by opportunity + effort.
 */
export function rankOpportunities(gaps: ContentGap[]): RankedOpportunity[] {
  return gaps.map((gap) => {
    // Determine effort and action based on our current position
    let estimatedEffort: 'low' | 'medium' | 'high';
    let recommendedAction: 'optimize_existing' | 'create_new_page' | 'add_content';

    if (gap.ourPosition === null) {
      // No page at all — need new content
      recommendedAction = 'create_new_page';
      estimatedEffort = 'high';
    } else if (gap.ourPosition > 50) {
      // Page exists but ranks very poorly — likely need major content addition
      recommendedAction = 'add_content';
      estimatedEffort = 'high';
    } else {
      // Page exists and ranks somewhat — optimize what's there
      recommendedAction = 'optimize_existing';
      estimatedEffort = gap.ourPosition > 20 ? 'medium' : 'low';
    }

    return {
      ...gap,
      estimatedEffort,
      recommendedAction,
    };
  });
}

/**
 * Suggest new page topics from content gaps.
 */
export function suggestNewPageTopics(
  gaps: ContentGap[]
): {
  keyword: string;
  category: string;
  opportunityScore: number;
  competitorTitles: string[];
}[] {
  return gaps
    .filter((g) => g.ourPosition === null && g.suggestedCategory)
    .map((g) => ({
      keyword: g.keyword,
      category: g.suggestedCategory!,
      opportunityScore: g.opportunityScore,
      competitorTitles: g.topCompetitors.map((c) => c.title),
    }))
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 20);
}

// --- Helpers ---

function suggestCategory(keyword: string): string | null {
  const lower = keyword.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return category;
    }
  }

  // Default: if it mentions a competitor name, it's likely a comparison/alternative
  for (const comp of KNOWN_COMPETITORS) {
    if (lower.includes(comp.name.toLowerCase())) {
      return lower.includes('vs') || lower.includes('versus')
        ? 'compare'
        : 'alternatives';
    }
  }

  return null;
}
