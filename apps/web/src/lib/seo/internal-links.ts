/**
 * Internal Linking Engine — finds related pages for any given page URL
 * based on shared keywords, category proximity, and content relevance.
 */

import type { SEOLandingPageData } from '@/lib/seo-pages/types';

import { alternativesPages } from '@/lib/seo-pages/data/alternatives';
import { featuresPages } from '@/lib/seo-pages/data/features';
import { industriesPages } from '@/lib/seo-pages/data/industries';
import { useCasesPages } from '@/lib/seo-pages/data/use-cases';
import { integrationsPages } from '@/lib/seo-pages/data/integrations';
import { guidesPages } from '@/lib/seo-pages/data/guides';
import { comparisonsPages } from '@/lib/seo-pages/data/comparisons';
import { compliancePages } from '@/lib/seo-pages/data/compliance';
import { migrationsPages } from '@/lib/seo-pages/data/migrations';
import { glossaryPages } from '@/lib/seo-pages/data/glossary';
import { examplesPages } from '@/lib/seo-pages/data/examples';
import { caseStudiesPages } from '@/lib/seo-pages/data/case-studies';
import { checklistsPages } from '@/lib/seo-pages/data/checklists';
import { platformsPages } from '@/lib/seo-pages/data/platforms';
import { solutionsPages } from '@/lib/seo-pages/data/solutions';
import { templatesPages } from '@/lib/seo-pages/data/templates';
import { emailSignaturesPages } from '@/lib/seo-pages/data/email-signatures';

export interface InternalLinkSuggestion {
  url: string;
  title: string;
  category: string;
  relevanceScore: number;
  reason: string;
}

const ALL_PAGES: SEOLandingPageData[] = [
  ...alternativesPages,
  ...featuresPages,
  ...industriesPages,
  ...useCasesPages,
  ...integrationsPages,
  ...guidesPages,
  ...comparisonsPages,
  ...compliancePages,
  ...migrationsPages,
  ...glossaryPages,
  ...examplesPages,
  ...caseStudiesPages,
  ...checklistsPages,
  ...platformsPages,
  ...solutionsPages,
  ...templatesPages,
  ...emailSignaturesPages,
];

// Pre-compute keyword index for fast lookups
const keywordIndex = new Map<string, Set<string>>();
for (const page of ALL_PAGES) {
  const canonical = page.meta.canonical;
  for (const kw of page.meta.keywords) {
    const kwLower = kw.toLowerCase();
    if (!keywordIndex.has(kwLower)) {
      keywordIndex.set(kwLower, new Set());
    }
    keywordIndex.get(kwLower)!.add(canonical);
  }
}

// Category affinity — related categories that are good cross-link targets
const CATEGORY_AFFINITY: Record<string, string[]> = {
  alternatives: ['comparisons', 'features', 'migrations'],
  comparisons: ['alternatives', 'features', 'solutions'],
  features: ['use-cases', 'integrations', 'solutions'],
  'use-cases': ['industries', 'features', 'solutions'],
  industries: ['use-cases', 'solutions', 'compliance'],
  integrations: ['features', 'platforms', 'guides'],
  guides: ['features', 'checklists', 'examples'],
  solutions: ['features', 'use-cases', 'industries'],
  compliance: ['industries', 'guides', 'solutions'],
  migrations: ['alternatives', 'integrations', 'guides'],
  glossary: ['guides', 'features'],
  examples: ['guides', 'templates', 'use-cases'],
  'case-studies': ['industries', 'use-cases', 'solutions'],
  checklists: ['guides', 'compliance', 'examples'],
  platforms: ['integrations', 'features'],
  templates: ['examples', 'features', 'guides'],
  'email-signatures': ['templates', 'features', 'examples'],
};

/**
 * Find related pages to link to from a given page URL.
 * Returns top N suggestions ranked by relevance.
 */
export function findRelatedPages(
  pageUrl: string,
  count: number = 5
): InternalLinkSuggestion[] {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';

  // Normalize to canonical path
  let canonical: string;
  try {
    canonical = new URL(pageUrl).pathname;
  } catch {
    canonical = pageUrl.startsWith('/') ? pageUrl : `/${pageUrl}`;
  }

  // Find the source page
  const sourcePage = ALL_PAGES.find((p) => p.meta.canonical === canonical);
  if (!sourcePage) {
    // If not a data-driven page, do keyword-based matching on the URL path
    return findRelatedByPath(canonical, count);
  }

  const sourceKeywords = new Set(sourcePage.meta.keywords.map((k) => k.toLowerCase()));
  const sourceCategory = sourcePage.category;
  const affinityCategories = new Set(CATEGORY_AFFINITY[sourceCategory] || []);

  const scores = new Map<string, { score: number; reasons: string[] }>();

  for (const page of ALL_PAGES) {
    if (page.meta.canonical === canonical) continue;

    let score = 0;
    const reasons: string[] = [];

    // 1. Keyword overlap (strongest signal)
    const pageKeywords = page.meta.keywords.map((k) => k.toLowerCase());
    const sharedKeywords = pageKeywords.filter((k) => sourceKeywords.has(k));
    if (sharedKeywords.length > 0) {
      score += sharedKeywords.length * 3;
      reasons.push(`${sharedKeywords.length} shared keyword(s): ${sharedKeywords.slice(0, 3).join(', ')}`);
    }

    // 2. Category affinity
    if (affinityCategories.has(page.category)) {
      score += 2;
      reasons.push(`Related category: ${page.category}`);
    }

    // 3. Same category (weaker — too similar)
    if (page.category === sourceCategory) {
      score += 1;
      reasons.push(`Same category: ${page.category}`);
    }

    // 4. Title keyword overlap
    const sourceTitleWords = new Set(
      sourcePage.hero.title.toLowerCase().split(/\s+/).filter((w) => w.length > 4)
    );
    const pageTitleWords = page.hero.title.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
    const titleOverlap = pageTitleWords.filter((w) => sourceTitleWords.has(w)).length;
    if (titleOverlap > 0) {
      score += titleOverlap;
      reasons.push(`${titleOverlap} title word overlap`);
    }

    if (score > 0) {
      scores.set(page.meta.canonical, { score, reasons });
    }
  }

  // Hardcoded high-value pages that are always good link targets
  const highValuePages = ['/features', '/pricing', '/demo', '/use-cases'];
  for (const hvp of highValuePages) {
    if (hvp === canonical) continue;
    const existing = scores.get(hvp);
    if (existing) {
      existing.score += 1;
      existing.reasons.push('High-value page');
    }
  }

  return [...scores.entries()]
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, count)
    .map(([url, { score, reasons }]) => {
      const page = ALL_PAGES.find((p) => p.meta.canonical === url);
      return {
        url: `${baseUrl}${url}`,
        title: page?.meta.title || url,
        category: page?.category || 'unknown',
        relevanceScore: score,
        reason: reasons[0] || 'Related page',
      };
    });
}

/**
 * Fallback for pages not in static data (e.g. blog posts, hardcoded pages).
 * Extracts keywords from URL path segments and matches against the keyword index.
 */
function findRelatedByPath(
  pathname: string,
  count: number
): InternalLinkSuggestion[] {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';

  // Extract meaningful words from the path
  const pathWords = pathname
    .split('/')
    .filter(Boolean)
    .flatMap((segment) => segment.split('-'))
    .filter((w) => w.length > 3)
    .map((w) => w.toLowerCase());

  const pageScores = new Map<string, number>();

  for (const word of pathWords) {
    // Check direct keyword match
    const matchedPages = keywordIndex.get(word);
    if (matchedPages) {
      for (const canonical of matchedPages) {
        if (canonical === pathname) continue;
        pageScores.set(canonical, (pageScores.get(canonical) || 0) + 2);
      }
    }

    // Also check partial keyword matches
    for (const [keyword, pages] of keywordIndex) {
      if (keyword.includes(word) || word.includes(keyword)) {
        for (const canonical of pages) {
          if (canonical === pathname) continue;
          pageScores.set(canonical, (pageScores.get(canonical) || 0) + 1);
        }
      }
    }
  }

  return [...pageScores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([url, score]) => {
      const page = ALL_PAGES.find((p) => p.meta.canonical === url);
      return {
        url: `${baseUrl}${url}`,
        title: page?.meta.title || url,
        category: page?.category || 'unknown',
        relevanceScore: score,
        reason: 'URL path keyword match',
      };
    });
}
