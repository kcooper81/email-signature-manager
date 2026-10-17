'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { formatSlugLabel } from '@/lib/seo-pages/slug-label';

const SEGMENT_LABELS: Record<string, string> = {
  blog: 'Blog',
  features: 'Features',
  pricing: 'Pricing',
  about: 'About',
  for: 'Solutions',
  tools: 'Tools',
  compare: 'Compare',
  industries: 'Industries',
  integrations: 'Integrations',
  alternatives: 'Alternatives',
  'use-cases': 'Use Cases',
  guides: 'Guides',
  glossary: 'Glossary',
  platforms: 'Platforms',
  templates: 'Templates',
  'case-studies': 'Case Studies',
  checklists: 'Checklists',
  compliance: 'Compliance',
  examples: 'Examples',
  'email-signatures': 'Email Signatures',
  'migrate-from': 'Migrate From',
  contact: 'Contact',
  help: 'Help Center',
};

function formatSegment(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  return formatSlugLabel(segment);
}

export function VisualBreadcrumbs() {
  const pathname = usePathname();

  if (!pathname || pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = segments.map((segment, i) => ({
    label: formatSegment(segment),
    href: '/' + segments.slice(0, i + 1).join('/'),
  }));

  return (
    <nav aria-label="Breadcrumb" className="border-b border-gray-100 bg-gray-50/60">
      <ol className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-violet-600"
          >
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;

          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              <ChevronRight size={14} className="text-gray-300 shrink-0" />
              {isLast ? (
                <span className="text-gray-800 font-medium" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-violet-600"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
