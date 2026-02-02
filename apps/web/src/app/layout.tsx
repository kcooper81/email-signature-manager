import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Siggly - Email Signature Management for Teams',
    template: '%s | Siggly',
  },
  description: 'Siggly is the modern email signature management platform. Create, manage, and deploy consistent email signatures to your entire Google Workspace team in seconds. No more manual updates, no more rogue signatures.',
  keywords: ['email signature', 'signature management', 'Google Workspace', 'Gmail signatures', 'email branding', 'team signatures', 'corporate email', 'signature deployment'],
  authors: [{ name: 'Siggly' }],
  creator: 'Siggly',
  publisher: 'Siggly',
  robots: {
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
    type: 'website',
    locale: 'en_US',
    url: 'https://siggly.com',
    siteName: 'Siggly',
    title: 'Siggly - Email Signature Management for Teams',
    description: 'Create, manage, and deploy consistent email signatures to your entire team in seconds. The modern way to manage email signatures.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Siggly - Email Signature Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siggly - Email Signature Management for Teams',
    description: 'Create, manage, and deploy consistent email signatures to your entire team in seconds.',
    images: ['/og-image.png'],
    creator: '@siggly',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://siggly.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Siggly',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Email signature management platform for teams. Create, manage, and deploy consistent email signatures to your entire Google Workspace organization.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free tier available',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '150',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
