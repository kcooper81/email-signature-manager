import type { SEOLandingPageData, SEOContentSection } from '@/lib/seo-pages/types';
import type { SupabaseClient } from '@supabase/supabase-js';

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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContentScoreBreakdown {
  metaTitle: { score: number; issues: string[] };
  metaDescription: { score: number; issues: string[] };
  contentDepth: { score: number; issues: string[]; wordCount: number };
  keywordUsage: { score: number; issues: string[]; density: number };
  structure: { score: number; issues: string[] };
  faqCoverage: { score: number; issues: string[] };
  readability: { score: number; issues: string[]; avgSentenceLength: number };
}

export interface ContentScore {
  overall: number; // 0-100
  breakdown: ContentScoreBreakdown;
}

export interface PageScore {
  url: string;
  slug: string;
  category: string;
  title: string;
  source: 'static' | 'generated';
  score: ContentScore;
}

// ---------------------------------------------------------------------------
// Text extraction
// ---------------------------------------------------------------------------

function extractAllText(page: SEOLandingPageData): string {
  const parts: string[] = [];

  parts.push(page.hero.title);
  parts.push(page.hero.description);

  if (page.features) {
    for (const f of page.features) {
      parts.push(f.title);
      parts.push(f.description);
    }
  }

  if (page.featuresTitle) parts.push(page.featuresTitle);
  if (page.featuresDescription) parts.push(page.featuresDescription);

  if (page.sections) {
    for (const section of page.sections) {
      parts.push(section.title);
      extractSectionText(section, parts);
    }
  }

  if (page.faqs) {
    for (const faq of page.faqs) {
      parts.push(faq.question);
      parts.push(faq.answer);
    }
  }

  parts.push(page.cta.title);
  parts.push(page.cta.description);

  if (page.testimonial) {
    parts.push(page.testimonial.quote);
  }

  return parts.filter(Boolean).join(' ');
}

function extractSectionText(section: SEOContentSection, parts: string[]): void {
  switch (section.type) {
    case 'prose':
      if (section.paragraphs) {
        for (const p of section.paragraphs) parts.push(p);
      }
      break;
    case 'checklist':
      if (section.items) {
        for (const item of section.items) parts.push(item);
      }
      break;
    case 'how-it-works':
      if (section.steps) {
        for (const step of section.steps) {
          parts.push(step.title);
          parts.push(step.description);
        }
      }
      break;
    case 'benefits':
      if (section.items) {
        for (const item of section.items) {
          parts.push(item.title);
          parts.push(item.description);
        }
      }
      break;
    case 'use-cases-grid':
      if (section.cases) {
        for (const c of section.cases) {
          parts.push(c.title);
          parts.push(c.description);
        }
      }
      break;
    case 'comparison-table':
      if (section.rows) {
        for (const row of section.rows) {
          parts.push(row.feature);
          if (typeof row.siggly === 'string') parts.push(row.siggly);
          if (typeof row.competitor === 'string') parts.push(row.competitor);
        }
      }
      break;
  }
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length;
}

function getSentenceLengths(text: string): number[] {
  const sentences = text
    .replace(/\n/g, ' ')
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return sentences.map((s) => countWords(s));
}

// ---------------------------------------------------------------------------
// Scoring functions (total max = 100)
// ---------------------------------------------------------------------------

function scoreMetaTitle(page: SEOLandingPageData): ContentScoreBreakdown['metaTitle'] {
  const title = page.meta.title;
  const len = title.length;
  const issues: string[] = [];
  let score = 0;

  if (len >= 30 && len <= 60) {
    score += 8;
  } else if (len < 30) {
    issues.push(`Title too short (${len} chars, aim for 30-60)`);
    score += 3;
  } else {
    issues.push(`Title too long (${len} chars, aim for 30-60)`);
    score += 3;
  }

  const primaryKeyword = page.meta.keywords[0];
  if (primaryKeyword && title.toLowerCase().includes(primaryKeyword.toLowerCase())) {
    score += 5;
  } else if (primaryKeyword) {
    issues.push(`Primary keyword "${primaryKeyword}" not in title`);
  }

  if (title.includes('| Siggly') || title.includes('| siggly')) {
    score += 2;
  } else {
    issues.push('Missing brand suffix "| Siggly"');
  }

  return { score: Math.min(score, 15), issues };
}

function scoreMetaDescription(page: SEOLandingPageData): ContentScoreBreakdown['metaDescription'] {
  const desc = page.meta.description;
  const len = desc.length;
  const issues: string[] = [];
  let score = 0;

  if (len >= 120 && len <= 155) {
    score += 9;
  } else if (len < 120) {
    issues.push(`Description too short (${len} chars, aim for 120-155)`);
    score += 4;
  } else {
    issues.push(`Description too long (${len} chars, aim for 120-155)`);
    score += 4;
  }

  const ctaWords = ['get', 'try', 'learn', 'discover', 'start'];
  const descLower = desc.toLowerCase();
  if (ctaWords.some((w) => descLower.includes(w))) {
    score += 3;
  } else {
    issues.push('No CTA word found (get, try, learn, discover, start)');
  }

  const primaryKeyword = page.meta.keywords[0];
  if (primaryKeyword && descLower.includes(primaryKeyword.toLowerCase())) {
    score += 3;
  } else if (primaryKeyword) {
    issues.push(`Primary keyword "${primaryKeyword}" not in description`);
  }

  return { score: Math.min(score, 15), issues };
}

function scoreContentDepth(page: SEOLandingPageData): ContentScoreBreakdown['contentDepth'] {
  const allText = extractAllText(page);
  const wordCount = countWords(allText);
  const issues: string[] = [];
  let score: number;

  if (wordCount >= 1000) {
    score = 20;
  } else if (wordCount >= 500) {
    score = 15;
    issues.push(`Good depth (${wordCount} words) but 1000+ is ideal`);
  } else if (wordCount >= 300) {
    score = 10;
    issues.push(`Moderate depth (${wordCount} words), aim for 500+`);
  } else {
    score = 5;
    issues.push(`Thin content (${wordCount} words), aim for 300+`);
  }

  return { score, issues, wordCount };
}

function scoreKeywordUsage(page: SEOLandingPageData): ContentScoreBreakdown['keywordUsage'] {
  const keywords = page.meta.keywords;
  const issues: string[] = [];

  if (!keywords || keywords.length === 0) {
    return { score: 0, issues: ['No keywords defined'], density: 0 };
  }

  const allText = extractAllText(page);
  const totalWords = countWords(allText);
  if (totalWords === 0) {
    return { score: 0, issues: ['No content to analyze'], density: 0 };
  }

  const primaryKeyword = keywords[0].toLowerCase();
  const textLower = allText.toLowerCase();
  const keywordWordCount = countWords(primaryKeyword);

  let occurrences = 0;
  let searchFrom = 0;
  while (true) {
    const idx = textLower.indexOf(primaryKeyword, searchFrom);
    if (idx === -1) break;
    occurrences++;
    searchFrom = idx + 1;
  }

  const density = (occurrences * keywordWordCount * 100) / totalWords;
  const densityRounded = Math.round(density * 100) / 100;

  let score: number;
  if (density >= 1 && density <= 3) {
    score = 15;
  } else if (density > 3 && density <= 5) {
    score = 8;
    issues.push(`Keyword density high (${densityRounded}%), aim for 1-3%`);
  } else if (density > 0 && density < 1) {
    score = 10;
    issues.push(`Keyword density low (${densityRounded}%), aim for 1-3%`);
  } else if (density > 5) {
    score = 0;
    issues.push(`Keyword density too high (${densityRounded}%), possible stuffing`);
  } else {
    score = 0;
    issues.push('Primary keyword not found in content');
  }

  return { score: Math.min(score, 15), issues, density: densityRounded };
}

function scoreStructure(page: SEOLandingPageData): ContentScoreBreakdown['structure'] {
  const issues: string[] = [];
  let score = 0;

  if (page.hero?.title) {
    score += 3;
  } else {
    issues.push('Missing hero section');
  }

  const sectionCount = page.sections?.length || 0;
  if (sectionCount >= 2) {
    score += 4;
  } else if (sectionCount === 1) {
    score += 2;
    issues.push('Only 1 content section, aim for 2+');
  } else {
    issues.push('No content sections');
  }

  if (page.features && page.features.length > 0) {
    score += 3;
  } else {
    issues.push('No features section');
  }

  if (page.cta?.title) {
    score += 3;
  } else {
    issues.push('Missing CTA section');
  }

  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    score += 2;
  } else {
    issues.push('Missing breadcrumbs');
  }

  return { score: Math.min(score, 15), issues };
}

function scoreFaqCoverage(page: SEOLandingPageData): ContentScoreBreakdown['faqCoverage'] {
  const faqCount = page.faqs?.length || 0;
  const issues: string[] = [];
  let score: number;

  if (faqCount >= 3) {
    score = 10;
  } else if (faqCount >= 1) {
    score = 5;
    issues.push(`Only ${faqCount} FAQ(s), aim for 3+ for rich snippets`);
  } else {
    score = 0;
    issues.push('No FAQs — add structured FAQ for SERP features');
  }

  return { score, issues };
}

function scoreReadability(page: SEOLandingPageData): ContentScoreBreakdown['readability'] {
  const allText = extractAllText(page);
  const sentenceLengths = getSentenceLengths(allText);
  const issues: string[] = [];

  if (sentenceLengths.length === 0) {
    return { score: 0, issues: ['No sentences found'], avgSentenceLength: 0 };
  }

  const avgLen = sentenceLengths.reduce((sum, len) => sum + len, 0) / sentenceLengths.length;
  const avgRounded = Math.round(avgLen * 10) / 10;
  let score: number;

  if (avgLen >= 10 && avgLen <= 20) {
    score = 10;
  } else if (avgLen > 20 && avgLen <= 30) {
    score = 5;
    issues.push(`Avg sentence length ${avgRounded} words, aim for 10-20`);
  } else if (avgLen < 10) {
    score = 7;
    issues.push(`Sentences very short (avg ${avgRounded} words)`);
  } else {
    score = 0;
    issues.push(`Sentences too long (avg ${avgRounded} words), aim for 10-20`);
  }

  const longSentences = sentenceLengths.filter((l) => l > 35).length;
  if (longSentences > 0) {
    issues.push(`${longSentences} sentence(s) exceed 35 words`);
  }

  return { score, issues, avgSentenceLength: avgRounded };
}

// ---------------------------------------------------------------------------
// Main scoring function
// ---------------------------------------------------------------------------

export function scorePageContent(pageData: SEOLandingPageData): ContentScore {
  const metaTitle = scoreMetaTitle(pageData);
  const metaDescription = scoreMetaDescription(pageData);
  const contentDepth = scoreContentDepth(pageData);
  const keywordUsage = scoreKeywordUsage(pageData);
  const structure = scoreStructure(pageData);
  const faqCoverage = scoreFaqCoverage(pageData);
  const readability = scoreReadability(pageData);

  const overall =
    metaTitle.score +
    metaDescription.score +
    contentDepth.score +
    keywordUsage.score +
    structure.score +
    faqCoverage.score +
    readability.score;

  return {
    overall,
    breakdown: {
      metaTitle,
      metaDescription,
      contentDepth,
      keywordUsage,
      structure,
      faqCoverage,
      readability,
    },
  };
}

// ---------------------------------------------------------------------------
// Batch scoring
// ---------------------------------------------------------------------------

function getAllStaticPages(): SEOLandingPageData[] {
  return [
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
}

export async function scoreAllPages(supabase: SupabaseClient): Promise<PageScore[]> {
  const results: PageScore[] = [];

  const staticPages = getAllStaticPages();
  for (const page of staticPages) {
    const score = scorePageContent(page);
    results.push({
      url: page.meta.canonical,
      slug: page.slug,
      category: page.category,
      title: page.meta.title,
      source: 'static',
      score,
    });
  }

  const { data: generatedPages, error } = await supabase
    .from('seo_generated_pages')
    .select('slug, category, page_data, status')
    .in('status', ['draft', 'published']);

  if (!error && generatedPages) {
    for (const row of generatedPages) {
      const pageData = row.page_data as SEOLandingPageData;
      if (!pageData?.meta) continue;

      const score = scorePageContent(pageData);
      results.push({
        url: pageData.meta.canonical,
        slug: row.slug,
        category: row.category,
        title: pageData.meta.title,
        source: 'generated',
        score,
      });
    }
  }

  results.sort((a, b) => a.score.overall - b.score.overall);
  return results;
}
