import Link from 'next/link';

import { findRelatedPages } from '@/lib/seo/internal-links';

interface RelatedPostsProps {
  currentUrl: string;
  count?: number;
}

const categoryColors: Record<string, string> = {
  alternatives: 'bg-orange-100 text-orange-700',
  comparisons: 'bg-blue-100 text-blue-700',
  features: 'bg-violet-100 text-violet-700',
  'use-cases': 'bg-emerald-100 text-emerald-700',
  industries: 'bg-teal-100 text-teal-700',
  integrations: 'bg-indigo-100 text-indigo-700',
  guides: 'bg-amber-100 text-amber-700',
  solutions: 'bg-pink-100 text-pink-700',
  compliance: 'bg-red-100 text-red-700',
  migrations: 'bg-cyan-100 text-cyan-700',
  glossary: 'bg-gray-100 text-gray-700',
  examples: 'bg-lime-100 text-lime-700',
  'case-studies': 'bg-purple-100 text-purple-700',
  checklists: 'bg-yellow-100 text-yellow-700',
  platforms: 'bg-sky-100 text-sky-700',
  templates: 'bg-fuchsia-100 text-fuchsia-700',
  'email-signatures': 'bg-rose-100 text-rose-700',
};

function getCategoryStyle(category: string): string {
  return categoryColors[category] || 'bg-gray-100 text-gray-700';
}

export function RelatedPosts({ currentUrl, count = 3 }: RelatedPostsProps) {
  const suggestions = findRelatedPages(currentUrl, count);

  if (suggestions.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Related Articles
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((suggestion) => {
            const url = new URL(suggestion.url);
            const pathname = url.pathname;

            return (
              <Link
                key={suggestion.url}
                href={pathname}
                className="group block rounded-xl bg-white p-6 shadow-sm border border-gray-200 transition-shadow hover:shadow-md"
              >
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getCategoryStyle(suggestion.category)}`}
                >
                  {suggestion.category
                    .split('-')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-violet-600 transition-colors line-clamp-2">
                  {suggestion.title}
                </h3>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-violet-600 group-hover:text-violet-700">
                  Read more
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
