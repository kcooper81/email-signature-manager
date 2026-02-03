import { MetadataRoute } from 'next';

// Blog posts data - should match the blog page
const blogPosts = [
  { slug: 'why-email-signatures-matter', date: '2026-01-28' },
  { slug: 'brand-consistency-guide', date: '2026-01-21' },
  { slug: 'google-workspace-signature-management', date: '2026-01-14' },
  { slug: 'email-signature-design-tips', date: '2026-01-07' },
  { slug: 'signature-marketing-campaigns', date: '2025-12-28' },
  { slug: 'legal-requirements-email-signatures', date: '2025-12-21' },
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
    { url: `${baseUrl}/google-workspace`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/use-cases`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Comparison pages (very high-value for competitor keywords)
  const comparisonPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/compare/exclaimer`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/compare/codetwo`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/compare/siggy`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
  ];

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
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
  ];

  // Other pages
  const otherPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/demo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  return [
    ...corePages,
    ...solutionPages,
    ...comparisonPages,
    ...blogPages,
    ...toolPages,
    ...otherPages,
  ];
}
