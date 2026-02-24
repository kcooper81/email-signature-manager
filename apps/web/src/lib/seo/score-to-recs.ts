import type { SupabaseClient } from '@supabase/supabase-js';
import type { SEOLandingPageData } from '@/lib/seo-pages/types';
import {
  scoreAllPages,
  scoreMetaTitle,
  scoreMetaDescription,
  scoreContentDepth,
  scoreFaqCoverage,
  scoreStructure,
  getAllStaticPages,
  type PageScore,
} from './content-scoring';

/**
 * Score-to-Recommendations Bridge
 *
 * Generates actionable seo_recommendations from content score issues.
 * Called as Step 6 in the run-audit pipeline (after auto-apply).
 */

interface ScoreRecConfig {
  /** Pages scoring below this get recommendations generated. Default 70. */
  scoreThreshold: number;
  /** Max recommendations to create per run. Default 100. */
  maxRecsPerRun: number;
}

const DEFAULT_SCORE_REC_CONFIG: ScoreRecConfig = {
  scoreThreshold: 70,
  maxRecsPerRun: 100,
};

interface GeneratedRec {
  page_url: string;
  recommendation_type: string;
  current_value: Record<string, unknown>;
  suggested_value: Record<string, unknown>;
  rationale: string;
  confidence: number;
  data_basis: Record<string, unknown>;
}

/**
 * Generate actionable recommendations from content score issues.
 */
export async function generateRecsFromContentScores(
  supabase: SupabaseClient,
  config: ScoreRecConfig = DEFAULT_SCORE_REC_CONFIG
): Promise<{ created: number; skipped: number }> {
  const scores = await scoreAllPages(supabase);

  // Get existing pending/applied recs to deduplicate
  const { data: existingRecs } = await supabase
    .from('seo_recommendations')
    .select('page_url, recommendation_type')
    .in('status', ['pending', 'applied']);

  const existingKeys = new Set(
    (existingRecs || []).map((r) => `${r.page_url}::${r.recommendation_type}`)
  );

  // Build page data lookup for generating fixes
  const staticPages = getAllStaticPages();
  const pageDataByCanonical = new Map<string, SEOLandingPageData>();
  for (const page of staticPages) {
    pageDataByCanonical.set(page.meta.canonical, page);
  }

  // Also load generated pages
  const { data: generatedPages } = await supabase
    .from('seo_generated_pages')
    .select('slug, category, page_data, status')
    .in('status', ['draft', 'published']);

  for (const row of generatedPages || []) {
    const pageData = row.page_data as SEOLandingPageData;
    if (pageData?.meta?.canonical) {
      pageDataByCanonical.set(pageData.meta.canonical, pageData);
    }
  }

  const recs: GeneratedRec[] = [];

  // Process pages below threshold, worst first
  const lowScoring = scores.filter((s) => s.score.overall < config.scoreThreshold);

  for (const ps of lowScoring) {
    if (recs.length >= config.maxRecsPerRun) break;

    const pageData = pageDataByCanonical.get(ps.url);
    if (!pageData) continue;

    const pageUrl = ps.url;
    const breakdown = ps.score.breakdown;

    // Meta title issues
    if (breakdown.metaTitle.issues.length > 0) {
      const fix = generateMetaTitleFix(pageData, breakdown.metaTitle.issues);
      if (fix) {
        recs.push({
          page_url: pageUrl,
          recommendation_type: 'meta_title',
          current_value: { title: pageData.meta.title, length: pageData.meta.title.length },
          suggested_value: fix.suggested,
          rationale: fix.rationale,
          confidence: 0.90,
          data_basis: { source: 'content_score', overall_score: ps.score.overall, issues: breakdown.metaTitle.issues },
        });
      }
    }

    // Meta description issues
    if (breakdown.metaDescription.issues.length > 0) {
      const fix = generateMetaDescriptionFix(pageData, breakdown.metaDescription.issues);
      if (fix) {
        recs.push({
          page_url: pageUrl,
          recommendation_type: 'meta_description',
          current_value: { description: pageData.meta.description, length: pageData.meta.description.length },
          suggested_value: fix.suggested,
          rationale: fix.rationale,
          confidence: 0.90,
          data_basis: { source: 'content_score', overall_score: ps.score.overall, issues: breakdown.metaDescription.issues },
        });
      }
    }

    // FAQ coverage issues
    if (breakdown.faqCoverage.issues.length > 0) {
      const fix = generateFaqFix(pageData);
      if (fix) {
        recs.push({
          page_url: pageUrl,
          recommendation_type: 'add_faq',
          current_value: { faqCount: pageData.faqs?.length || 0 },
          suggested_value: fix.suggested,
          rationale: fix.rationale,
          confidence: 0.75,
          data_basis: { source: 'content_score', overall_score: ps.score.overall, issues: breakdown.faqCoverage.issues },
        });
      }
    }

    // Content depth issues (thin content)
    if (breakdown.contentDepth.issues.length > 0 && breakdown.contentDepth.wordCount < 300) {
      recs.push({
        page_url: pageUrl,
        recommendation_type: 'expand_content',
        current_value: { wordCount: breakdown.contentDepth.wordCount, sectionCount: pageData.sections?.length || 0 },
        suggested_value: {
          action: 'Add prose/benefits/how-it-works sections to reach 500+ words',
          suggestedSections: getSuggestedSections(pageData),
        },
        rationale: `Page has only ${breakdown.contentDepth.wordCount} words (thin content). Adding 2-3 content sections would improve topical authority and rankings.`,
        confidence: 0.65,
        data_basis: { source: 'content_score', overall_score: ps.score.overall, wordCount: breakdown.contentDepth.wordCount },
      });
    }

    // Missing features section
    if (
      breakdown.structure.issues.some((i) => i.includes('No features section')) &&
      breakdown.contentDepth.wordCount >= 300 // Only suggest features if not already thin
    ) {
      recs.push({
        page_url: pageUrl,
        recommendation_type: 'expand_content',
        current_value: { hasFeatures: false, sectionCount: pageData.sections?.length || 0 },
        suggested_value: {
          action: 'Add a features section highlighting key capabilities',
          suggestedSections: ['features'],
        },
        rationale: `Page is missing a features section. Adding one would improve structure score and provide scannable content for users.`,
        confidence: 0.65,
        data_basis: { source: 'content_score', overall_score: ps.score.overall, issues: breakdown.structure.issues },
      });
    }
  }

  // Persist recommendations, deduplicating against existing
  let created = 0;
  let skipped = 0;

  for (const rec of recs) {
    const key = `${rec.page_url}::${rec.recommendation_type}`;
    if (existingKeys.has(key)) {
      skipped++;
      continue;
    }

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

    if (!error) {
      created++;
      existingKeys.add(key);
    } else {
      skipped++;
    }
  }

  return { created, skipped };
}

/**
 * Generate a fix for a single page + issue category.
 * Used by the /fix API endpoint.
 */
export function generateFixForIssue(
  pageData: SEOLandingPageData,
  issueCategory: 'metaTitle' | 'metaDescription' | 'faqCoverage' | 'contentDepth'
): GeneratedRec | null {
  const pageUrl = pageData.meta.canonical;

  switch (issueCategory) {
    case 'metaTitle': {
      const scoring = scoreMetaTitle(pageData);
      if (scoring.issues.length === 0) return null;
      const fix = generateMetaTitleFix(pageData, scoring.issues);
      if (!fix) return null;
      return {
        page_url: pageUrl,
        recommendation_type: 'meta_title',
        current_value: { title: pageData.meta.title, length: pageData.meta.title.length },
        suggested_value: fix.suggested,
        rationale: fix.rationale,
        confidence: 0.90,
        data_basis: { source: 'manual_fix', issues: scoring.issues },
      };
    }
    case 'metaDescription': {
      const scoring = scoreMetaDescription(pageData);
      if (scoring.issues.length === 0) return null;
      const fix = generateMetaDescriptionFix(pageData, scoring.issues);
      if (!fix) return null;
      return {
        page_url: pageUrl,
        recommendation_type: 'meta_description',
        current_value: { description: pageData.meta.description, length: pageData.meta.description.length },
        suggested_value: fix.suggested,
        rationale: fix.rationale,
        confidence: 0.90,
        data_basis: { source: 'manual_fix', issues: scoring.issues },
      };
    }
    case 'faqCoverage': {
      const scoring = scoreFaqCoverage(pageData);
      if (scoring.issues.length === 0) return null;
      const fix = generateFaqFix(pageData);
      if (!fix) return null;
      return {
        page_url: pageUrl,
        recommendation_type: 'add_faq',
        current_value: { faqCount: pageData.faqs?.length || 0 },
        suggested_value: fix.suggested,
        rationale: fix.rationale,
        confidence: 0.75,
        data_basis: { source: 'manual_fix', issues: scoring.issues },
      };
    }
    case 'contentDepth': {
      const scoring = scoreContentDepth(pageData);
      if (scoring.issues.length === 0) return null;
      return {
        page_url: pageUrl,
        recommendation_type: 'expand_content',
        current_value: { wordCount: scoring.wordCount, sectionCount: pageData.sections?.length || 0 },
        suggested_value: {
          action: 'Add prose/benefits/how-it-works sections to improve content depth',
          suggestedSections: getSuggestedSections(pageData),
        },
        rationale: `Page has ${scoring.wordCount} words. ${scoring.issues[0]}`,
        confidence: 0.65,
        data_basis: { source: 'manual_fix', wordCount: scoring.wordCount, issues: scoring.issues },
      };
    }
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Fix generators
// ---------------------------------------------------------------------------

function generateMetaTitleFix(
  pageData: SEOLandingPageData,
  issues: string[]
): { suggested: Record<string, unknown>; rationale: string } | null {
  const title = pageData.meta.title;
  const primaryKeyword = pageData.meta.keywords[0];
  let suggested = title;
  const fixes: string[] = [];

  for (const issue of issues) {
    if (issue.includes('too short')) {
      if (!suggested.includes('| Siggly')) {
        suggested = `${suggested} | Siggly`;
        fixes.push('added brand suffix');
      }
    } else if (issue.includes('too long')) {
      // Trim at a sensible break point
      const maxLen = 60;
      if (suggested.length > maxLen) {
        const breakAt = suggested.lastIndexOf(' ', maxLen);
        suggested = breakAt > 30 ? suggested.substring(0, breakAt) : suggested.substring(0, maxLen);
        if (!suggested.includes('| Siggly') && suggested.length <= 50) {
          suggested += ' | Siggly';
        }
        fixes.push('trimmed to fit 60 chars');
      }
    } else if (issue.includes('Primary keyword') && issue.includes('not in title') && primaryKeyword) {
      // Try to work the keyword into the title
      if (suggested.includes('| Siggly')) {
        suggested = suggested.replace('| Siggly', `- ${capitalize(primaryKeyword)} | Siggly`);
      } else {
        suggested = `${capitalize(primaryKeyword)}: ${suggested}`;
      }
      if (suggested.length > 60) {
        suggested = suggested.substring(0, 57) + '...';
      }
      fixes.push(`added keyword "${primaryKeyword}"`);
    } else if (issue.includes('Missing brand suffix')) {
      if (suggested.length <= 50) {
        suggested = `${suggested} | Siggly`;
        fixes.push('added brand suffix');
      }
    }
  }

  if (suggested === title) return null;

  return {
    suggested: { title: suggested, length: suggested.length },
    rationale: `Meta title improvements: ${fixes.join(', ')}. Original: "${title}" (${title.length} chars).`,
  };
}

function generateMetaDescriptionFix(
  pageData: SEOLandingPageData,
  issues: string[]
): { suggested: Record<string, unknown>; rationale: string } | null {
  const desc = pageData.meta.description;
  const primaryKeyword = pageData.meta.keywords[0];
  let suggested = desc;
  const fixes: string[] = [];

  for (const issue of issues) {
    if (issue.includes('too short')) {
      // Expand with keyword + CTA
      const suffix = primaryKeyword
        ? ` Learn how Siggly helps with ${primaryKeyword}. Get started free today.`
        : ' Discover how Siggly simplifies email signature management for your team.';
      suggested = suggested + suffix;
      if (suggested.length > 155) {
        suggested = suggested.substring(0, 152) + '...';
      }
      fixes.push('expanded with CTA');
    } else if (issue.includes('too long')) {
      const maxLen = 155;
      const breakAt = suggested.lastIndexOf('.', maxLen);
      suggested = breakAt > 80 ? suggested.substring(0, breakAt + 1) : suggested.substring(0, maxLen);
      fixes.push('trimmed to fit 155 chars');
    } else if (issue.includes('No CTA word')) {
      if (!suggested.toLowerCase().startsWith('discover') && !suggested.toLowerCase().startsWith('learn')) {
        suggested = `Discover ${suggested.charAt(0).toLowerCase()}${suggested.slice(1)}`;
        if (suggested.length > 155) {
          suggested = suggested.substring(0, 152) + '...';
        }
        fixes.push('added CTA word');
      }
    } else if (issue.includes('Primary keyword') && issue.includes('not in description') && primaryKeyword) {
      if (!suggested.toLowerCase().includes(primaryKeyword.toLowerCase())) {
        const period = suggested.indexOf('.');
        if (period > 0 && period < suggested.length - 20) {
          suggested = suggested.substring(0, period + 1) + ` ${capitalize(primaryKeyword)} made easy.` + suggested.substring(period + 1);
        } else {
          suggested = suggested + ` ${capitalize(primaryKeyword)} made easy with Siggly.`;
        }
        if (suggested.length > 155) {
          suggested = suggested.substring(0, 152) + '...';
        }
        fixes.push(`added keyword "${primaryKeyword}"`);
      }
    }
  }

  if (suggested === desc) return null;

  return {
    suggested: { description: suggested, length: suggested.length },
    rationale: `Meta description improvements: ${fixes.join(', ')}. Original was ${desc.length} chars.`,
  };
}

function generateFaqFix(
  pageData: SEOLandingPageData
): { suggested: Record<string, unknown>; rationale: string } | null {
  const existingFaqCount = pageData.faqs?.length || 0;
  const neededFaqs = Math.max(0, 3 - existingFaqCount);
  if (neededFaqs === 0) return null;

  const keyword = pageData.meta.keywords[0] || pageData.hero.title;
  const category = pageData.category;

  // Generate template FAQs based on page category + keyword
  const templates = getCategoryFaqTemplates(keyword, category);
  const newFaqs = templates.slice(0, neededFaqs);

  return {
    suggested: { faqs: newFaqs },
    rationale: `Page has ${existingFaqCount} FAQ(s), needs ${neededFaqs} more for rich snippet eligibility. Generated ${newFaqs.length} template FAQs based on "${keyword}" in the ${category} category.`,
  };
}

function getCategoryFaqTemplates(keyword: string, category: string): Array<{ question: string; answer: string }> {
  const kw = keyword.toLowerCase();

  const baseTemplates: Array<{ question: string; answer: string }> = [
    {
      question: `What is ${kw}?`,
      answer: `${capitalize(kw)} refers to the process and tools used to manage professional email signatures across an organization. Siggly provides a centralized platform for creating, deploying, and managing consistent email signatures for your entire team.`,
    },
    {
      question: `How does Siggly help with ${kw}?`,
      answer: `Siggly simplifies ${kw} by providing centralized management, pre-designed templates, and automatic deployment to Google Workspace and Microsoft 365. Teams can maintain brand consistency across all employee email signatures without IT overhead.`,
    },
    {
      question: `What are the benefits of ${kw} for businesses?`,
      answer: `Key benefits include brand consistency across all employee emails, time savings through centralized management, professional appearance that builds trust, and marketing opportunities through promotional banners. Siggly makes these benefits accessible starting at $1.50 per user per month.`,
    },
    {
      question: `How do I get started with ${kw}?`,
      answer: `Getting started is simple: sign up for a free Siggly account (supports up to 5 users), connect your Google Workspace or Microsoft 365 account, design your signature using our template editor, and deploy it to your team with one click.`,
    },
  ];

  // Add category-specific templates
  switch (category) {
    case 'alternatives':
      baseTemplates.push({
        question: `Why should I switch to Siggly for ${kw}?`,
        answer: `Siggly offers competitive pricing at $1.50/user/month, native Google Workspace and Microsoft 365 integrations, an intuitive template designer, and dedicated support. Many teams switch for the simplified setup and lower total cost of ownership.`,
      });
      break;
    case 'industries':
      baseTemplates.push({
        question: `Is Siggly suitable for ${kw}?`,
        answer: `Yes, Siggly is designed to work across all industries including ${kw}. Our platform offers industry-appropriate templates, compliance features, and the flexibility to customize signatures for different departments and roles.`,
      });
      break;
    case 'integrations':
      baseTemplates.push({
        question: `How does the ${kw} integration work?`,
        answer: `Siggly connects directly with your email platform through secure API integrations. Once connected, signatures are automatically deployed and updated across all user accounts, ensuring consistency without manual setup.`,
      });
      break;
  }

  return baseTemplates;
}

function getSuggestedSections(pageData: SEOLandingPageData): string[] {
  const existing = new Set(pageData.sections?.map((s) => s.type) || []);
  const suggestions: string[] = [];

  if (!existing.has('benefits')) suggestions.push('benefits');
  if (!existing.has('how-it-works')) suggestions.push('how-it-works');
  if (!existing.has('prose')) suggestions.push('prose');
  if (!existing.has('checklist')) suggestions.push('checklist');

  return suggestions.slice(0, 3);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
