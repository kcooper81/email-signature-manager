import { Metadata } from 'next';

const SITE_NAME = 'Siggly';
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';
const DEFAULT_OG_IMAGE = '/og-image.png';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  article,
}: SEOConfig): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  const baseKeywords = [
    'email signature',
    'signature management',
    'Google Workspace',
    'Microsoft 365',
    'Gmail signatures',
    'email branding',
    'team signatures',
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...baseKeywords, ...keywords],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(article && ogType === 'article'
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.authors,
            tags: article.tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@siggly',
    },
    alternates: {
      canonical: url,
    },
  };
}

// Structured data generators for AI/search engines
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://twitter.com/siggly',
      'https://linkedin.com/company/siggly',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@siggly.io',
    },
  };
}

export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Email signature management platform for teams. Create, manage, and deploy consistent email signatures to your entire Google Workspace or Microsoft 365 organization.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '3',
      priceCurrency: 'USD',
      offerCount: '4',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Google Workspace integration',
      'Microsoft 365 integration',
      'Centralized signature management',
      'Template designer',
      'Department-based signatures',
      'Analytics and tracking',
      'Scheduled deployments',
    ],
  };
}

export function generateBlogPostSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = 'Siggly Team',
  readTime,
  category,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  readTime?: string;
  category?: string;
}) {
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: imageUrl,
    url: `${SITE_URL}${url}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${url}`,
    },
    ...(readTime && { timeRequired: `PT${readTime.replace(' min', 'M')}` }),
    ...(category && { articleSection: category }),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateComparisonSchema({
  competitor,
  features,
}: {
  competitor: string;
  features: { name: string; siggly: boolean; competitor: boolean }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${SITE_NAME} vs ${competitor} - Email Signature Management Comparison`,
    description: `Compare ${SITE_NAME} and ${competitor} for email signature management. See features, pricing, and why teams choose ${SITE_NAME}.`,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Feature Comparison',
      itemListElement: features.map((feature, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: feature.name,
        description: `${SITE_NAME}: ${feature.siggly ? 'Yes' : 'No'}, ${competitor}: ${feature.competitor ? 'Yes' : 'No'}`,
      })),
    },
  };
}

export function generateBlogListSchema({
  page,
  totalPages,
  posts,
}: {
  page: number;
  totalPages: number;
  posts: { title: string; url: string; date: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: page === 1 ? 'Siggly Blog' : `Siggly Blog - Page ${page}`,
    description: 'Tips, guides, and insights about email signatures and brand consistency',
    url: page === 1 ? `${SITE_URL}/blog` : `${SITE_URL}/blog/page/${page}`,
    isPartOf: {
      '@type': 'Blog',
      name: 'Siggly Blog',
      url: `${SITE_URL}/blog`,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}${post.url}`,
        name: post.title,
      })),
    },
    ...(page > 1 && { previousPage: page === 2 ? `${SITE_URL}/blog` : `${SITE_URL}/blog/page/${page - 1}` }),
    ...(page < totalPages && { nextPage: `${SITE_URL}/blog/page/${page + 1}` }),
  };
}

export function generateBlogPostMetadata({
  slug,
  title,
  excerpt,
  date,
  category,
  image,
}: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}): Metadata {
  return generateMetadata({
    title,
    description: excerpt,
    canonical: `/blog/${slug}`,
    ogImage: image,
    ogType: 'article',
    keywords: [category.toLowerCase(), 'email signature', slug.split('-').join(' ')],
    article: {
      publishedTime: date,
      modifiedTime: date,
      authors: ['Siggly Team'],
      tags: [category],
    },
  });
}

export function generateBlogIndexMetadata(page: number, totalPages: number): Metadata {
  const isFirstPage = page === 1;
  const title = isFirstPage ? 'Blog' : `Blog - Page ${page}`;
  const description = isFirstPage
    ? 'Tips, guides, and insights about email signatures and brand consistency'
    : `Email signature tips and guides - Page ${page} of ${totalPages}`;

  return generateMetadata({
    title,
    description,
    canonical: isFirstPage ? '/blog' : `/blog/page/${page}`,
    keywords: ['email signature blog', 'signature tips', 'email branding'],
  });
}

/**
 * Creates metadata for a blog post with proper canonical URL.
 * Use this in individual blog post pages to ensure proper SEO indexing.
 */
export function createBlogMetadata(
  slug: string,
  title: string,
  description: string,
  keywords: string[] = []
): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://siggly.io/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://siggly.io/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function generateProductSchema({
  name,
  description,
  price,
  priceCurrency = 'USD',
}: {
  name: string;
  description: string;
  price: number;
  priceCurrency?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: 'https://schema.org/InStock',
    },
  };
}
