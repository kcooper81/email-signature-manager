import { SupabaseClient } from '@supabase/supabase-js';
import type { SEOLandingPageData, SEOContentSection } from '@/lib/seo-pages/types';
import { generateNewPage } from './ai-enhancer';

/**
 * Page Generator — creates new SEO landing pages from content gaps.
 * Without Claude: uses category template patterns.
 * With Claude: generates richer, more natural content.
 */

// Category → route prefix mapping
const CATEGORY_ROUTES: Record<string, string> = {
  alternatives: '/alternatives',
  features: '/features',
  industries: '/industries',
  'use-cases': '/use-cases',
  integrations: '/integrations',
  guides: '/guides',
  compare: '/compare',
  'email-signature-templates': '/email-signature-templates',
  'email-signatures': '/email-signatures',
  platforms: '/platforms',
  glossary: '/glossary',
  'migrate-from': '/migrate-from',
  examples: '/examples',
  'case-studies': '/case-studies',
  checklists: '/checklists',
  compliance: '/compliance',
  for: '/for',
};

// Hero variant rotation for visual variety
const HERO_VARIANTS = ['violet', 'emerald', 'indigo', 'slate', 'dark'] as const;

/**
 * Generate a template-based page (no Claude needed).
 */
export function generateTemplatePage(
  category: string,
  slug: string,
  keyword: string,
  competitorTitles: string[] = []
): SEOLandingPageData {
  const routePrefix = CATEGORY_ROUTES[category] || `/${category}`;
  const canonical = `${routePrefix}/${slug}`;
  const displayName = keyword
    .split(/[-_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const variant = HERO_VARIANTS[slug.length % HERO_VARIANTS.length];

  const page: SEOLandingPageData = {
    slug,
    category,
    meta: {
      title: buildTitle(displayName, category),
      description: buildDescription(displayName, category),
      keywords: [keyword, 'email signature', 'Siggly', category.replace(/-/g, ' ')],
      canonical,
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: categoryDisplayName(category), url: routePrefix },
      { name: displayName, url: canonical },
    ],
    hero: {
      badge: { icon: getCategoryIcon(category), text: categoryBadgeText(category) },
      title: buildHeroTitle(displayName, category),
      description: buildHeroDescription(displayName, category),
      variant,
    },
    features: buildTemplateFeatures(displayName, category),
    sections: buildTemplateSections(displayName, category, keyword),
    faqs: buildTemplateFAQs(displayName, category),
    cta: {
      title: `Ready to Improve Your ${displayName} Email Signatures?`,
      description: `Join thousands of teams using Siggly for professional email signature management.`,
      variant: 'violet',
    },
  };

  return page;
}

/**
 * Generate a page and store as draft in the database.
 */
export async function generateAndStorePage(
  supabase: SupabaseClient,
  category: string,
  slug: string,
  keyword: string,
  competitorData: { title: string; description: string }[],
  useAI: boolean,
  recommendationId?: string
): Promise<{ success: boolean; pageId?: string; error?: string }> {
  let pageData: SEOLandingPageData;

  if (useAI) {
    try {
      const aiPage = await generateNewPage(
        category,
        [keyword],
        competitorData,
        generateTemplatePage(category, slug, keyword) // template as example
      );
      pageData = aiPage || generateTemplatePage(category, slug, keyword, competitorData.map((c) => c.title));
    } catch {
      // Fallback to template
      pageData = generateTemplatePage(category, slug, keyword, competitorData.map((c) => c.title));
    }
  } else {
    pageData = generateTemplatePage(category, slug, keyword, competitorData.map((c) => c.title));
  }

  const { data, error } = await supabase
    .from('seo_generated_pages')
    .upsert(
      {
        category,
        slug,
        page_data: pageData,
        status: 'draft',
        source_keywords: [keyword],
        recommendation_id: recommendationId || null,
      },
      { onConflict: 'category,slug' }
    )
    .select('id')
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, pageId: data.id };
}

/**
 * Fetch a generated page from DB (for rendering).
 */
export async function getGeneratedPage(
  supabase: SupabaseClient,
  category: string,
  slug: string
): Promise<SEOLandingPageData | null> {
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

// --- Template builders ---

function buildTitle(name: string, category: string): string {
  const templates: Record<string, string> = {
    alternatives: `${name} Alternative for Email Signatures | Siggly`,
    features: `${name} - Email Signature Feature | Siggly`,
    industries: `${name} Email Signatures | Siggly`,
    'use-cases': `${name} Email Signature Use Case | Siggly`,
    integrations: `${name} Email Signature Integration | Siggly`,
    guides: `${name} Guide | Siggly`,
    compare: `Siggly vs ${name} Comparison | Siggly`,
    compliance: `${name} Email Signature Compliance | Siggly`,
    'migrate-from': `Migrate from ${name} to Siggly`,
    glossary: `${name} - Email Signature Glossary | Siggly`,
  };

  const title = templates[category] || `${name} | Siggly`;
  return title.length > 60 ? title.substring(0, 57) + '...' : title;
}

function buildDescription(name: string, category: string): string {
  const templates: Record<string, string> = {
    alternatives: `Looking for a ${name} alternative? Siggly offers powerful email signature management with easy setup and affordable pricing.`,
    features: `Discover Siggly's ${name} feature for professional email signatures. Centralized management for Google Workspace and Microsoft 365.`,
    industries: `Professional email signature management for the ${name} industry. Deploy consistent signatures across your organization with Siggly.`,
    'use-cases': `Learn how teams use Siggly for ${name}. Manage email signatures at scale with templates, rules, and automatic deployment.`,
    compliance: `Ensure ${name} compliance in your email signatures. Siggly helps organizations manage compliant email signatures at scale.`,
  };

  const desc = templates[category] || `${name} - Professional email signature management with Siggly. Easy setup, powerful features, affordable pricing.`;
  return desc.length > 160 ? desc.substring(0, 157) + '...' : desc;
}

function buildHeroTitle(name: string, category: string): string {
  const templates: Record<string, string> = {
    alternatives: `A Better Alternative to ${name}`,
    features: `${name} for Email Signatures`,
    industries: `Email Signatures for ${name}`,
    'use-cases': `${name} with Siggly`,
    compare: `Siggly vs ${name}`,
    compliance: `${name} Compliant Email Signatures`,
  };

  return templates[category] || `${name} Email Signature Management`;
}

function buildHeroDescription(name: string, category: string): string {
  const templates: Record<string, string> = {
    alternatives: `Switch from ${name} to Siggly for easier email signature management with better pricing, faster setup, and dedicated support.`,
    features: `Powerful ${name.toLowerCase()} capabilities built into Siggly's email signature platform. Manage your team's signatures effortlessly.`,
    industries: `Purpose-built email signature management for ${name.toLowerCase()} organizations. Maintain brand consistency and compliance across your entire team.`,
  };

  return templates[category] || `Professional email signature management for ${name.toLowerCase()}. Easy to set up, simple to manage, loved by teams.`;
}

function buildTemplateFeatures(
  name: string,
  category: string
): SEOLandingPageData['features'] {
  return [
    {
      icon: 'Zap',
      title: 'Quick Setup',
      description: `Get started with ${name.toLowerCase()} email signatures in minutes, not hours.`,
    },
    {
      icon: 'Users',
      title: 'Team Management',
      description: 'Centrally manage signatures for your entire organization from one dashboard.',
    },
    {
      icon: 'Shield',
      title: 'Brand Compliance',
      description: 'Ensure every email signature matches your brand guidelines automatically.',
    },
    {
      icon: 'BarChart',
      title: 'Analytics & Tracking',
      description: 'Track signature link clicks and measure the impact of your email signatures.',
    },
  ];
}

function buildTemplateSections(
  name: string,
  category: string,
  keyword: string
): SEOContentSection[] {
  return [
    {
      type: 'prose',
      title: `Why Choose Siggly for ${name}`,
      paragraphs: [
        `Email signatures are more than just contact information — they're a powerful branding tool for ${name.toLowerCase()} teams.`,
        `Siggly makes it easy to create, manage, and deploy professional email signatures across your entire organization. With support for Google Workspace and Microsoft 365, you can ensure brand consistency in every email.`,
      ],
    },
    {
      type: 'benefits',
      title: 'Key Benefits',
      items: [
        {
          icon: 'Clock',
          title: 'Save Time',
          description: 'Deploy signatures to your entire team in minutes with centralized management.',
        },
        {
          icon: 'Lock',
          title: 'Stay Compliant',
          description: 'Automatically enforce brand guidelines and legal requirements in every signature.',
        },
        {
          icon: 'Globe',
          title: 'Scale Easily',
          description: 'From 5 to 5,000 users — Siggly scales with your organization.',
        },
      ],
    },
  ];
}

function buildTemplateFAQs(
  name: string,
  category: string
): { question: string; answer: string }[] {
  return [
    {
      question: `How does Siggly help with ${name.toLowerCase()} email signatures?`,
      answer: `Siggly provides centralized email signature management specifically designed for ${name.toLowerCase()}. You can create templates, deploy signatures automatically, and ensure brand consistency across your entire team.`,
    },
    {
      question: 'How long does it take to set up Siggly?',
      answer: 'Most teams are up and running within 15 minutes. Siggly integrates directly with Google Workspace and Microsoft 365 for seamless deployment.',
    },
    {
      question: 'What does Siggly cost?',
      answer: 'Siggly offers a free plan for up to 5 users. The Professional plan starts at $1.50 per user per month with a 10-user minimum, including all features.',
    },
  ];
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    alternatives: 'ArrowRightLeft',
    features: 'Sparkles',
    industries: 'Building2',
    'use-cases': 'Lightbulb',
    integrations: 'Plug',
    guides: 'BookOpen',
    compare: 'Scale',
    compliance: 'Shield',
    'migrate-from': 'MoveRight',
    glossary: 'BookText',
    examples: 'Eye',
    'case-studies': 'FileText',
    checklists: 'CheckSquare',
    platforms: 'Monitor',
  };
  return icons[category] || 'FileText';
}

function categoryBadgeText(category: string): string {
  const badges: Record<string, string> = {
    alternatives: 'Alternative',
    features: 'Feature',
    industries: 'Industry',
    'use-cases': 'Use Case',
    integrations: 'Integration',
    guides: 'Guide',
    compare: 'Comparison',
    compliance: 'Compliance',
    'migrate-from': 'Migration',
    glossary: 'Glossary',
    examples: 'Example',
    'case-studies': 'Case Study',
    checklists: 'Checklist',
    platforms: 'Platform',
  };
  return badges[category] || category;
}

function categoryDisplayName(category: string): string {
  const names: Record<string, string> = {
    alternatives: 'Alternatives',
    features: 'Features',
    industries: 'Industries',
    'use-cases': 'Use Cases',
    integrations: 'Integrations',
    guides: 'Guides',
    compare: 'Comparisons',
    compliance: 'Compliance',
    'migrate-from': 'Migrations',
    glossary: 'Glossary',
    examples: 'Examples',
    'case-studies': 'Case Studies',
    checklists: 'Checklists',
    platforms: 'Platforms',
    for: 'Solutions',
    'email-signature-templates': 'Templates',
    'email-signatures': 'Email Signatures',
  };
  return names[category] || category;
}
