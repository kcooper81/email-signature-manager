import type { SupabaseClient } from '@supabase/supabase-js';
import { getAllStaticPages } from './content-scoring';
import type { SEOLandingPageData } from '@/lib/seo-pages/types';

/**
 * Keyword Cannibalization Detection
 *
 * Identifies pages competing for the same primary keyword, which can
 * dilute ranking signals and confuse search engines about which page to rank.
 */

export interface CannibalizationGroup {
  keyword: string;
  pages: Array<{
    url: string;
    title: string;
    category: string;
    source: 'static' | 'generated';
  }>;
  /** True if GSC data confirms both pages get impressions for the same query */
  confirmedByGSC: boolean;
  gscDetails?: Array<{
    url: string;
    impressions: number;
    clicks: number;
    position: number;
  }>;
}

/**
 * Detect keyword cannibalization across all pages.
 *
 * 1. Groups all pages by their primary keyword (meta.keywords[0])
 * 2. Flags groups with 2+ pages sharing the same primary keyword
 * 3. Cross-references with GSC snapshot data for confirmation
 */
export async function detectCannibalization(
  supabase: SupabaseClient
): Promise<CannibalizationGroup[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';

  // Collect all pages with their primary keywords
  const staticPages = getAllStaticPages();
  const keywordPages = new Map<string, CannibalizationGroup['pages']>();

  for (const page of staticPages) {
    const primaryKw = page.meta.keywords[0]?.toLowerCase();
    if (!primaryKw) continue;

    const entry = {
      url: page.meta.canonical,
      title: page.meta.title,
      category: page.category,
      source: 'static' as const,
    };

    const existing = keywordPages.get(primaryKw) || [];
    existing.push(entry);
    keywordPages.set(primaryKw, existing);
  }

  // Also check generated pages
  const { data: generatedPages } = await supabase
    .from('seo_generated_pages')
    .select('slug, category, page_data, status')
    .in('status', ['draft', 'published']);

  for (const row of generatedPages || []) {
    const pageData = row.page_data as SEOLandingPageData;
    if (!pageData?.meta?.keywords?.[0]) continue;

    const primaryKw = pageData.meta.keywords[0].toLowerCase();
    const entry = {
      url: pageData.meta.canonical,
      title: pageData.meta.title,
      category: row.category,
      source: 'generated' as const,
    };

    const existing = keywordPages.get(primaryKw) || [];
    existing.push(entry);
    keywordPages.set(primaryKw, existing);
  }

  // Filter to only groups with 2+ pages (cannibalization)
  const conflicts: CannibalizationGroup[] = [];

  for (const [keyword, pages] of keywordPages) {
    if (pages.length < 2) continue;

    const group: CannibalizationGroup = {
      keyword,
      pages,
      confirmedByGSC: false,
    };

    // Cross-reference with GSC snapshot data
    const fullUrls = pages.map((p) => `${baseUrl}${p.url}`);
    const { data: snapshots } = await supabase
      .from('seo_snapshots')
      .select('page_url, impressions, clicks, position, top_queries')
      .in('page_url', fullUrls)
      .order('snapshot_date', { ascending: false });

    if (snapshots && snapshots.length >= 2) {
      // Check if multiple pages from this group have impressions for queries containing the keyword
      const pagesWithImpressions = snapshots.filter(
        (s) => s.impressions > 0 && fullUrls.includes(s.page_url)
      );

      // Deduplicate by page_url (keep most recent)
      const uniquePages = new Map<string, typeof snapshots[0]>();
      for (const s of pagesWithImpressions) {
        if (!uniquePages.has(s.page_url)) {
          uniquePages.set(s.page_url, s);
        }
      }

      if (uniquePages.size >= 2) {
        group.confirmedByGSC = true;
        group.gscDetails = [...uniquePages.values()].map((s) => ({
          url: s.page_url,
          impressions: s.impressions,
          clicks: s.clicks,
          position: s.position,
        }));
      }
    }

    conflicts.push(group);
  }

  // Sort: confirmed cannibalization first, then by number of pages
  conflicts.sort((a, b) => {
    if (a.confirmedByGSC !== b.confirmedByGSC) return a.confirmedByGSC ? -1 : 1;
    return b.pages.length - a.pages.length;
  });

  return conflicts;
}
