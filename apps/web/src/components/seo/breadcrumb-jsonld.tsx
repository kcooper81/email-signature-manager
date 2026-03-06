'use client';

import { usePathname } from 'next/navigation';

const SITE_URL = 'https://siggly.io';

const SEGMENT_LABELS: Record<string, string> = {
  blog: 'Blog',
  features: 'Features',
  pricing: 'Pricing',
  about: 'About',
  contact: 'Contact',
  compare: 'Compare',
  for: 'Solutions',
  integrations: 'Integrations',
  industries: 'Industries',
  'use-cases': 'Use Cases',
  'case-studies': 'Case Studies',
  guides: 'Guides',
  examples: 'Examples',
  checklists: 'Checklists',
  compliance: 'Compliance',
  alternatives: 'Alternatives',
  platforms: 'Platforms',
  glossary: 'Glossary',
  'email-signatures': 'Email Signatures',
  'email-signature-templates': 'Templates',
  'migrate-from': 'Migration',
  'google-workspace': 'Google Workspace',
  help: 'Help',
  demo: 'Demo',
  tools: 'Tools',
};

function formatSegment(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  return segment
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function BreadcrumbJsonLd() {
  const pathname = usePathname();

  if (!pathname || pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const items = [
    { name: 'Home', url: '/' },
    ...segments.map((segment, i) => ({
      name: formatSegment(segment),
      url: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
