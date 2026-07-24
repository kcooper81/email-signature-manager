import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import type { SEOLandingPageData } from '@/lib/seo-pages/types';

interface HubLink {
  href: string;
  title: string;
  description: string;
}

interface HubPageProps {
  badge: string;
  icon: LucideIcon;
  title: string;
  intro: string;
  basePath: string;
  pages: SEOLandingPageData[];
  /** Optional hand-authored links (e.g. static sibling pages) shown before data pages. */
  extraLinks?: HubLink[];
}

// Sibling category hubs — cross-linked at the foot of every hub so the hubs form
// an interlinked mesh (distributes crawl depth + link equity across categories).
const SIBLING_HUBS: { href: string; label: string }[] = [
  { href: '/platforms', label: 'Platforms' },
  { href: '/for', label: 'Solutions' },
  { href: '/industries', label: 'Industries' },
  { href: '/email-signature-templates', label: 'Templates' },
  { href: '/email-signatures', label: 'By Profession' },
  { href: '/guides', label: 'Guides' },
  { href: '/alternatives', label: 'Alternatives' },
  { href: '/integrations/directory', label: 'Integrations' },
  { href: '/answers', label: 'Answers' },
];

/**
 * Shared category hub/index page. Renders an H1 + intro and a responsive grid
 * linking every child page in the category, giving the programmatic detail
 * pages an internal-linking hub (and making breadcrumb "up" links resolve).
 */
export function HubPage({
  badge,
  icon: Icon,
  title,
  intro,
  basePath,
  pages,
  extraLinks = [],
}: HubPageProps) {
  const links: HubLink[] = [
    ...extraLinks,
    ...pages.map((page) => ({
      href: `${basePath}/${page.slug}`,
      title: page.hero.title,
      description: page.hero.description,
    })),
  ];

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
            <Icon className="h-4 w-4" />
            {badge}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{intro}</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-5 rounded-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-colors"
              >
                <h2 className="font-semibold text-base mb-1">{link.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-3">{link.description}</p>
              </Link>
            ))}
          </div>

          {/* Cross-links to the other category hubs */}
          <div className="mt-14 pt-8 border-t border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Explore more
            </h2>
            <div className="flex flex-wrap gap-2">
              {SIBLING_HUBS.filter((h) => h.href !== basePath && !h.href.startsWith(basePath + '/')).map((h) => (
                <Link
                  key={h.href}
                  href={h.href}
                  className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-violet-300 hover:bg-violet-50 transition-colors"
                >
                  {h.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
