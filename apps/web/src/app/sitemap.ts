import { MetadataRoute } from 'next';
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

// Blog posts data - should match the blog page
const blogPosts = [
  { slug: 'google-workspace-admin-signature-guide', date: '2026-02-07' },
  { slug: 'gmail-signature-compliance-guide', date: '2026-02-07' },
  { slug: 'google-workspace-vs-microsoft-365-signatures', date: '2026-02-07' },
  { slug: 'gmail-signature-troubleshooting', date: '2026-02-07' },
  { slug: 'enforce-email-signatures-google-workspace', date: '2026-02-07' },
  { slug: 'email-signature-future-trends', date: '2026-01-28' },
  { slug: 'brand-consistency-guide', date: '2026-01-27' },
  { slug: 'google-workspace-signature-management', date: '2026-01-26' },
  { slug: 'email-signature-design-tips', date: '2026-01-25' },
  { slug: 'signature-marketing-campaigns', date: '2026-01-24' },
  { slug: 'legal-requirements-email-signatures', date: '2026-01-23' },
  { slug: 'email-signature-animated-gifs', date: '2026-01-22' },
  { slug: 'email-signature-qr-codes', date: '2026-01-21' },
  { slug: 'email-signature-customer-testimonials', date: '2026-01-20' },
  { slug: 'email-signature-partner-cobranding', date: '2026-01-19' },
  { slug: 'email-signature-awards-recognition', date: '2026-01-18' },
  { slug: 'email-signature-sustainability', date: '2026-01-17' },
  { slug: 'email-signature-crisis-communication', date: '2026-01-16' },
  { slug: 'email-signature-employee-advocacy', date: '2026-01-15' },
  { slug: 'email-signature-newsletter-promotion', date: '2026-01-14' },
  { slug: 'email-signature-podcast-promotion', date: '2026-01-13' },
  { slug: 'email-signature-vendor-selection', date: '2026-01-12' },
  { slug: 'email-signature-team-rollout', date: '2026-01-11' },
  { slug: 'email-signature-common-mistakes', date: '2026-01-10' },
  { slug: 'email-signature-brand-guidelines', date: '2026-01-09' },
  { slug: 'email-signature-template-library', date: '2026-01-08' },
  { slug: 'email-signature-html-basics', date: '2026-01-07' },
  { slug: 'email-signature-mobile-optimization', date: '2026-01-06' },
  { slug: 'email-signature-accessibility', date: '2026-01-05' },
  { slug: 'email-signature-roi-calculator', date: '2026-01-04' },
  { slug: 'email-signature-engineering-department', date: '2026-01-03' },
  { slug: 'email-signature-operations-department', date: '2026-01-02' },
  { slug: 'email-signature-finance-department', date: '2026-01-01' },
  { slug: 'email-signature-marketing-department', date: '2025-12-31' },
  { slug: 'email-signature-hr-department', date: '2025-12-30' },
  { slug: 'email-signature-product-launch', date: '2025-12-29' },
  { slug: 'email-signature-ebook-promotion', date: '2025-12-28' },
  { slug: 'email-signature-webinar-promotion', date: '2025-12-27' },
  { slug: 'email-signature-video-links', date: '2025-12-26' },
  { slug: 'email-signature-social-proof', date: '2025-12-25' },
  { slug: 'email-signature-multi-language', date: '2025-12-24' },
  { slug: 'email-signature-mergers-acquisitions', date: '2025-12-23' },
  { slug: 'email-signature-professional-services', date: '2025-12-22' },
  { slug: 'email-signature-government', date: '2025-12-21' },
  { slug: 'email-signature-manufacturing', date: '2025-12-20' },
  { slug: 'email-signature-technology-companies', date: '2025-12-19' },
  { slug: 'email-signature-legal-firm', date: '2025-12-18' },
  { slug: 'email-signature-photo-guidelines', date: '2025-12-17' },
  { slug: 'email-signature-seasonal-updates', date: '2025-12-16' },
  { slug: 'email-signature-hubspot-integration', date: '2025-12-15' },
  { slug: 'email-signature-customer-support', date: '2025-12-14' },
  { slug: 'email-signature-hiring-banners', date: '2025-12-13' },
  { slug: 'email-signature-software-comparison', date: '2025-12-12' },
  { slug: 'email-signature-dark-mode', date: '2025-12-11' },
  { slug: 'email-signature-directory-sync', date: '2025-12-10' },
  { slug: 'email-signature-rebranding', date: '2025-12-09' },
  { slug: 'email-signature-ab-testing', date: '2025-12-08' },
  { slug: 'email-signature-banner-campaigns', date: '2025-12-07' },
  { slug: 'email-signature-calendar-links', date: '2025-12-06' },
  { slug: 'email-signature-cta-examples', date: '2025-12-05' },
  { slug: 'email-signature-analytics', date: '2025-12-04' },
  { slug: 'email-signature-social-icons', date: '2025-12-03' },
  { slug: 'email-signature-best-practices', date: '2025-12-02' },
  { slug: 'email-signature-fonts', date: '2025-12-01' },
  { slug: 'email-signature-colors', date: '2025-11-30' },
  { slug: 'email-signature-branding', date: '2025-11-29' },
  { slug: 'email-signature-size-guide', date: '2025-11-28' },
  { slug: 'email-signature-examples', date: '2025-11-27' },
  { slug: 'email-signature-image-hosting', date: '2025-11-26' },
  { slug: 'email-signature-disclaimer-guide', date: '2025-11-25' },
  { slug: 'email-signature-troubleshooting', date: '2025-11-24' },
  { slug: 'email-signature-onboarding', date: '2025-11-23' },
  { slug: 'email-signature-update-guide', date: '2025-11-22' },
  { slug: 'email-signature-security', date: '2025-11-21' },
  { slug: 'email-signature-pronouns', date: '2025-11-20' },
  { slug: 'email-signature-marketing-roi', date: '2025-11-19' },
  { slug: 'email-signature-mistakes', date: '2025-11-18' },
  { slug: 'email-signature-templates-guide', date: '2025-11-17' },
  { slug: 'email-signature-generator-guide', date: '2025-11-16' },
  { slug: 'microsoft-365-signature-management', date: '2025-11-15' },
  { slug: 'deploy-signatures-google-workspace', date: '2025-11-14' },
  { slug: 'outlook-signature-setup-guide', date: '2025-11-13' },
  { slug: 'gmail-signature-setup-guide', date: '2025-11-12' },
  { slug: 'apple-mail-signature-setup', date: '2025-11-11' },
  { slug: 'html-email-signature-guide', date: '2025-11-10' },
  { slug: 'enterprise-email-signature-management', date: '2025-11-09' },
  { slug: 'it-admin-email-signature-guide', date: '2025-11-08' },
  { slug: 'mobile-email-signature-guide', date: '2025-11-07' },
  { slug: 'remote-team-email-signatures', date: '2025-11-06' },
  { slug: 'startup-email-signatures', date: '2025-11-05' },
  { slug: 'small-business-email-signature', date: '2025-11-04' },
  { slug: 'executive-email-signature', date: '2025-11-03' },
  { slug: 'sales-team-email-signatures', date: '2025-11-02' },
  { slug: 'email-signature-for-freelancers', date: '2025-11-01' },
  { slug: 'email-signature-for-agencies', date: '2025-10-31' },
  { slug: 'real-estate-email-signature', date: '2025-10-30' },
  { slug: 'healthcare-email-signature', date: '2025-10-29' },
  { slug: 'law-firm-email-signature', date: '2025-10-28' },
  { slug: 'financial-advisor-email-signature', date: '2025-10-27' },
  { slug: 'insurance-email-signature', date: '2025-10-26' },
  { slug: 'consulting-firm-email-signature', date: '2025-10-25' },
  { slug: 'accounting-firm-email-signature', date: '2025-10-24' },
  { slug: 'nonprofit-email-signature', date: '2025-10-23' },
  { slug: 'education-email-signature', date: '2025-10-22' },
  { slug: 'hospitality-email-signature', date: '2025-10-21' },
  { slug: 'retail-email-signature', date: '2025-10-20' },
  { slug: 'construction-email-signature', date: '2025-10-19' },
  { slug: 'gdpr-email-signature-requirements', date: '2025-10-18' },
  { slug: 'exclaimer-alternative', date: '2025-10-17' },
  { slug: 'codetwo-alternative', date: '2025-10-16' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';
  
  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Solution pages (high-value for SEO)
  const solutionPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/for/it-admins`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for/marketing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for/small-business`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for/agencies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for/enterprise`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/google-workspace`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/integrations/microsoft-365`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/use-cases`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Comparison pages (very high-value for competitor keywords)
  const comparisonPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/compare/exclaimer`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/compare/codetwo`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/compare/siggy`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/compare/wisestamp`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
  ];

  // Blog pagination (12 posts per page = 9 pages for 106 posts)
  const POSTS_PER_PAGE = 12;
  const totalBlogPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // Paginated blog index pages (page 2 onwards)
    ...Array.from({ length: totalBlogPages - 1 }, (_, i) => ({
      url: `${baseUrl}/blog/page/${i + 2}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.75,
    })),
    // Individual blog posts
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  // Tool pages (for organic traffic)
  const toolPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/tools/signature-generator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/tools/signature-templates`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/tools/html-signature-converter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
  ];

  // Industry pages (high-value for niche SEO)
  const industryPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/industries/legal`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/industries/healthcare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/industries/finance`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/industries/real-estate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Other pages
  const otherPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/demo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  // SEO landing pages - dynamically generated from data files
  const seoRouteMap: { pages: { meta: { canonical: string } }[]; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
    { pages: solutionsPages, priority: 0.85, changeFrequency: 'weekly' },
    { pages: comparisonsPages, priority: 0.85, changeFrequency: 'weekly' },
    { pages: industriesPages, priority: 0.8, changeFrequency: 'monthly' },
    { pages: featuresPages, priority: 0.8, changeFrequency: 'monthly' },
    { pages: integrationsPages, priority: 0.8, changeFrequency: 'monthly' },
    { pages: useCasesPages, priority: 0.75, changeFrequency: 'monthly' },
    { pages: templatesPages, priority: 0.75, changeFrequency: 'monthly' },
    { pages: guidesPages, priority: 0.7, changeFrequency: 'monthly' },
    { pages: emailSignaturesPages, priority: 0.8, changeFrequency: 'monthly' },
    { pages: alternativesPages, priority: 0.85, changeFrequency: 'weekly' },
    { pages: platformsPages, priority: 0.8, changeFrequency: 'monthly' },
  ];

  const seoLandingPages: MetadataRoute.Sitemap = seoRouteMap.flatMap(
    ({ pages, priority, changeFrequency }) =>
      pages.map((page) => ({
        url: `${baseUrl}${page.meta.canonical}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      }))
  );

  return [
    ...corePages,
    ...solutionPages,
    ...comparisonPages,
    ...blogPages,
    ...toolPages,
    ...industryPages,
    ...otherPages,
    ...seoLandingPages,
  ];
}
