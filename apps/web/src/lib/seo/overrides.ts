import { createServiceClient } from '@/lib/supabase/server';
import type { SEOLandingPageData } from '@/lib/seo-pages/types';

/**
 * Content override system — merges DB overrides with static page data at render time.
 * Uses a simple in-memory cache with 5-minute TTL.
 */

interface ContentOverride {
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  additional_faqs: { question: string; answer: string }[] | null;
  additional_sections: any[] | null;
  internal_links: { anchor_text: string; url: string; context: string }[] | null;
  override_hero: Record<string, unknown> | null;
  override_features: Record<string, unknown> | null;
}

// Simple cache
let overrideCache = new Map<string, ContentOverride | null>();
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function isCacheValid(): boolean {
  return Date.now() - cacheTimestamp < CACHE_TTL_MS;
}

/**
 * Get content overrides for a specific page URL.
 */
export async function getContentOverrides(
  pageUrl: string
): Promise<ContentOverride | null> {
  // Normalize URL — remove trailing slash, ensure consistent format
  const normalizedUrl = pageUrl.replace(/\/$/, '');

  if (isCacheValid() && overrideCache.has(normalizedUrl)) {
    return overrideCache.get(normalizedUrl) || null;
  }

  // Cache miss or expired — refetch all active overrides
  const supabase = createServiceClient();
  const { data: overrides } = await supabase
    .from('seo_content_overrides')
    .select('page_url, meta_title, meta_description, meta_keywords, additional_faqs, additional_sections, internal_links, override_hero, override_features')
    .eq('is_active', true);

  // Rebuild cache
  overrideCache = new Map();
  cacheTimestamp = Date.now();

  for (const o of overrides || []) {
    const url = o.page_url.replace(/\/$/, '');
    overrideCache.set(url, {
      meta_title: o.meta_title,
      meta_description: o.meta_description,
      meta_keywords: o.meta_keywords,
      additional_faqs: o.additional_faqs as any,
      additional_sections: o.additional_sections as any,
      internal_links: o.internal_links as any,
      override_hero: o.override_hero as any,
      override_features: o.override_features as any,
    });
  }

  return overrideCache.get(normalizedUrl) || null;
}

/**
 * Get meta overrides for a page (used by generateMetadata).
 */
export async function getMetaOverrides(
  canonical: string
): Promise<{
  title?: string;
  description?: string;
  keywords?: string[];
} | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';
  const fullUrl = canonical.startsWith('http') ? canonical : `${baseUrl}${canonical}`;

  // Try both full URL and canonical path
  const override =
    (await getContentOverrides(fullUrl)) ||
    (await getContentOverrides(canonical));

  if (!override) return null;

  const result: { title?: string; description?: string; keywords?: string[] } = {};
  if (override.meta_title) result.title = override.meta_title;
  if (override.meta_description) result.description = override.meta_description;
  if (override.meta_keywords) result.keywords = override.meta_keywords;

  return Object.keys(result).length > 0 ? result : null;
}

/**
 * Merge base page data with content overrides from DB.
 */
export async function getPageWithOverrides(
  baseData: SEOLandingPageData
): Promise<SEOLandingPageData> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';
  const fullUrl = `${baseUrl}${baseData.meta.canonical}`;

  const overrides =
    (await getContentOverrides(fullUrl)) ||
    (await getContentOverrides(baseData.meta.canonical));

  if (!overrides) return baseData;

  return {
    ...baseData,
    meta: {
      ...baseData.meta,
      title: overrides.meta_title || baseData.meta.title,
      description: overrides.meta_description || baseData.meta.description,
      keywords: overrides.meta_keywords || baseData.meta.keywords,
    },
    hero: overrides.override_hero
      ? { ...baseData.hero, ...(overrides.override_hero as any) }
      : baseData.hero,
    features: overrides.override_features
      ? (overrides.override_features as any)
      : baseData.features,
    faqs: [
      ...(baseData.faqs || []),
      ...(overrides.additional_faqs || []),
    ],
    sections: [
      ...(baseData.sections || []),
      ...(overrides.additional_sections || []),
    ],
  };
}

/**
 * Fetch a generated page from DB by category + slug.
 */
export async function getGeneratedPage(
  category: string,
  slug: string
): Promise<SEOLandingPageData | null> {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from('seo_generated_pages')
    .select('page_data')
    .eq('category', category)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!data) return null;
  return data.page_data as SEOLandingPageData;
}
