import { SupabaseClient } from '@supabase/supabase-js';
import {
  fetchPagePerformance,
  fetchPageQueries,
  fetchGA4PageData,
  type SearchConsoleRow,
  type SearchConsoleQueryRow,
  type GA4PageData,
} from './google-clients';
import { searchSERP, type SERPResponse } from './serp-client';
import { type SEOEngineConfig, DEFAULT_CONFIG } from './config';

// Import all 17 SEO data arrays (same as sitemap.ts)
import { industriesPages } from '@/lib/seo-pages/data/industries';
import { useCasesPages } from '@/lib/seo-pages/data/use-cases';
import { solutionsPages } from '@/lib/seo-pages/data/solutions';
import { featuresPages } from '@/lib/seo-pages/data/features';
import { integrationsPages } from '@/lib/seo-pages/data/integrations';
import { guidesPages } from '@/lib/seo-pages/data/guides';
import { comparisonsPages } from '@/lib/seo-pages/data/comparisons';
import { templatesPages } from '@/lib/seo-pages/data/templates';
import { emailSignaturesPages } from '@/lib/seo-pages/data/email-signatures';
import { alternativesPages } from '@/lib/seo-pages/data/alternatives';
import { platformsPages } from '@/lib/seo-pages/data/platforms';
import { glossaryPages } from '@/lib/seo-pages/data/glossary';
import { migrationsPages } from '@/lib/seo-pages/data/migrations';
import { examplesPages } from '@/lib/seo-pages/data/examples';
import { caseStudiesPages } from '@/lib/seo-pages/data/case-studies';
import { checklistsPages } from '@/lib/seo-pages/data/checklists';
import { compliancePages } from '@/lib/seo-pages/data/compliance';
import type { SEOLandingPageData } from '@/lib/seo-pages/types';

const ALL_PAGE_ARRAYS: SEOLandingPageData[][] = [
  industriesPages,
  useCasesPages,
  solutionsPages,
  featuresPages,
  integrationsPages,
  guidesPages,
  comparisonsPages,
  templatesPages,
  emailSignaturesPages,
  alternativesPages,
  platformsPages,
  glossaryPages,
  migrationsPages,
  examplesPages,
  caseStudiesPages,
  checklistsPages,
  compliancePages,
];

export interface TrackedPage {
  url: string;
  title: string;
  description: string;
  category: string;
  source: 'static' | 'generated';
}

/**
 * Get all tracked URLs from static data files + generated pages in DB.
 */
export async function getAllTrackedPages(
  supabase: SupabaseClient
): Promise<TrackedPage[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';

  // Static pages from data files
  const staticPages: TrackedPage[] = ALL_PAGE_ARRAYS.flatMap((pages) =>
    pages.map((page) => ({
      url: `${baseUrl}${page.meta.canonical}`,
      title: page.meta.title,
      description: page.meta.description,
      category: page.category,
      source: 'static' as const,
    }))
  );

  // Generated pages from DB
  const { data: generatedPages } = await supabase
    .from('seo_generated_pages')
    .select('category, slug, page_data, status')
    .eq('status', 'published');

  const dbPages: TrackedPage[] = (generatedPages || []).map((gp) => {
    const pageData = gp.page_data as any;
    return {
      url: `${baseUrl}${pageData?.meta?.canonical || `/${gp.category}/${gp.slug}`}`,
      title: pageData?.meta?.title || gp.slug,
      description: pageData?.meta?.description || '',
      category: gp.category,
      source: 'generated' as const,
    };
  });

  return [...staticPages, ...dbPages];
}

/**
 * Reverse lookup: find the current meta title/description for a page URL from static data.
 */
export function getCurrentMeta(pageUrl: string): {
  title: string;
  description: string;
} | null {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';

  for (const pages of ALL_PAGE_ARRAYS) {
    for (const page of pages) {
      const fullUrl = `${baseUrl}${page.meta.canonical}`;
      if (fullUrl === pageUrl || page.meta.canonical === pageUrl) {
        return {
          title: page.meta.title,
          description: page.meta.description,
        };
      }
    }
  }

  return null;
}

/**
 * Get a static page's full data by canonical URL.
 */
export function getStaticPageByCanonical(canonical: string): SEOLandingPageData | null {
  for (const pages of ALL_PAGE_ARRAYS) {
    const found = pages.find((p) => p.meta.canonical === canonical);
    if (found) return found;
  }
  return null;
}

// --- Date helpers ---

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return formatDate(d);
}

// --- Collection orchestrators ---

export interface CollectionResult {
  snapshotsUpserted: number;
  competitorQueriesRun: number;
  errors: string[];
}

/**
 * Collect Search Console + GA4 data and upsert into seo_snapshots.
 */
export async function collectSearchData(
  supabase: SupabaseClient,
  config: SEOEngineConfig = DEFAULT_CONFIG
): Promise<{ upserted: number; errors: string[] }> {
  const errors: string[] = [];
  const siteUrl = process.env.SEARCH_CONSOLE_SITE_URL;
  const ga4PropertyId = process.env.GA4_PROPERTY_ID;

  if (!siteUrl) {
    return { upserted: 0, errors: ['SEARCH_CONSOLE_SITE_URL not configured'] };
  }

  const yesterday = daysAgo(1);
  const thirtyDaysAgo = daysAgo(config.dataCollectionWindowDays);

  // Fetch Search Console data
  let pageData: SearchConsoleRow[] = [];
  let queryData: SearchConsoleQueryRow[] = [];

  try {
    [pageData, queryData] = await Promise.all([
      fetchPagePerformance(siteUrl, thirtyDaysAgo, yesterday),
      fetchPageQueries(siteUrl, thirtyDaysAgo, yesterday),
    ]);
  } catch (error: any) {
    errors.push(`Search Console fetch failed: ${error.message}`);
  }

  // Group queries by page
  const queriesByPage = new Map<string, SearchConsoleQueryRow[]>();
  for (const row of queryData) {
    const existing = queriesByPage.get(row.page) || [];
    existing.push(row);
    queriesByPage.set(row.page, existing);
  }

  // Fetch GA4 data
  let ga4Data: GA4PageData[] = [];
  if (ga4PropertyId) {
    try {
      ga4Data = await fetchGA4PageData(ga4PropertyId, thirtyDaysAgo, yesterday);
    } catch (error: any) {
      errors.push(`GA4 fetch failed: ${error.message}`);
    }
  }

  // Index GA4 data by path
  const ga4ByPath = new Map<string, GA4PageData>();
  for (const row of ga4Data) {
    ga4ByPath.set(row.pagePath, row);
  }

  // Get current meta for each page
  const snapshotDate = yesterday;
  const rows = pageData.map((page) => {
    const pagePath = new URL(page.page).pathname;
    const ga4 = ga4ByPath.get(pagePath);
    const topQueries = (queriesByPage.get(page.page) || [])
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, config.topQueriesPerPage)
      .map((q) => ({
        query: q.query,
        clicks: q.clicks,
        impressions: q.impressions,
        ctr: q.ctr,
        position: q.position,
      }));

    const meta = getCurrentMeta(page.page);

    return {
      snapshot_date: snapshotDate,
      page_url: page.page,
      clicks: page.clicks,
      impressions: page.impressions,
      ctr: page.ctr,
      position: page.position,
      top_queries: topQueries,
      sessions: ga4?.sessions || 0,
      bounce_rate: ga4?.bounceRate || 0,
      avg_engagement_time: ga4?.avgEngagementTime || 0,
      meta_title: meta?.title || null,
      meta_description: meta?.description || null,
    };
  });

  // Upsert in batches
  let upserted = 0;
  const BATCH_SIZE = config.snapshotBatchSize;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from('seo_snapshots')
      .upsert(batch, { onConflict: 'snapshot_date,page_url' });

    if (error) {
      errors.push(`Snapshot upsert batch ${i} failed: ${error.message}`);
    } else {
      upserted += batch.length;
    }
  }

  return { upserted, errors };
}

/**
 * Collect competitor SERP data for top queries.
 */
export async function collectCompetitorData(
  supabase: SupabaseClient,
  queryLimit: number = 50,
  config: SEOEngineConfig = DEFAULT_CONFIG
): Promise<{ queriesRun: number; errors: string[] }> {
  const errors: string[] = [];

  // Get the most recent snapshot's top queries by impressions
  const { data: recentSnapshots } = await supabase
    .from('seo_snapshots')
    .select('top_queries, page_url')
    .order('snapshot_date', { ascending: false })
    .limit(config.maxSnapshotsForAnalysis);

  if (!recentSnapshots || recentSnapshots.length === 0) {
    return { queriesRun: 0, errors: ['No snapshots available for competitor analysis'] };
  }

  // Extract unique queries, sorted by impressions
  const queryMap = new Map<string, { impressions: number; pageUrl: string }>();
  for (const snapshot of recentSnapshots) {
    const queries = (snapshot.top_queries as any[]) || [];
    for (const q of queries) {
      const existing = queryMap.get(q.query);
      if (!existing || q.impressions > existing.impressions) {
        queryMap.set(q.query, {
          impressions: q.impressions,
          pageUrl: snapshot.page_url,
        });
      }
    }
  }

  const topQueries = [...queryMap.entries()]
    .sort((a, b) => b[1].impressions - a[1].impressions)
    .slice(0, queryLimit);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';
  const ourDomain = new URL(baseUrl).hostname.replace('www.', '');
  let queriesRun = 0;

  for (const [query, { pageUrl }] of topQueries) {
    try {
      const serpResult = await searchSERP(query);
      queriesRun++;

      // Find our position
      const ourResult = serpResult.organic.find((r) =>
        r.domain === ourDomain || r.domain === `www.${ourDomain}`
      );

      // Determine search volume bucket based on impressions
      const impressions = queryMap.get(query)?.impressions || 0;
      const volumeBucket =
        impressions > config.highVolumeThreshold ? 'high' : impressions > config.mediumVolumeThreshold ? 'medium' : 'low';

      const row = {
        keyword: query,
        our_position: ourResult?.position || null,
        our_url: ourResult?.link || pageUrl,
        competitors: serpResult.organic
          .filter(
            (r) => r.domain !== ourDomain && r.domain !== `www.${ourDomain}`
          )
          .map((r) => ({
            url: r.link,
            domain: r.domain,
            title: r.title,
            description: r.snippet,
            position: r.position,
          })),
        serp_features: serpResult.serpFeatures,
        search_volume_bucket: volumeBucket,
        captured_at: new Date().toISOString(),
        captured_date: new Date().toISOString().split('T')[0],
      };

      const { error } = await supabase.from('competitor_rankings').upsert(row, {
        onConflict: 'keyword,captured_date',
      });

      if (error) {
        errors.push(`SERP upsert for "${query}" failed: ${error.message}`);
      }
    } catch (error: any) {
      errors.push(`SERP query "${query}" failed: ${error.message}`);
    }

    // Rate limit
    await new Promise((resolve) => setTimeout(resolve, config.serpRateLimitMs));
  }

  return { queriesRun, errors };
}
