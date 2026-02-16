import Link from 'next/link';
import { Palette } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { examplesPages } from '@/lib/seo-pages/data/examples';

export const metadata = genMeta({
  title: 'Email Signature Examples & Inspiration | Siggly',
  description: 'Browse 25+ curated email signature examples organized by style, elements, team roles, and context. Find inspiration for your next professional email signature design.',
  keywords: ['email signature examples', 'signature inspiration', 'professional signature designs', 'email signature gallery'],
  canonical: '/examples',
});

const groups = [
  { title: 'Style-Based Examples', filter: (s: string) => ['professional', 'modern', 'minimalist', 'creative', 'corporate'].includes(s) },
  { title: 'Element-Based Examples', filter: (s: string) => ['with-banner', 'with-logo', 'with-photo', 'with-social-icons', 'with-cta'].includes(s) },
  { title: 'Team & Role-Based Examples', filter: (s: string) => ['sales-team', 'marketing-team', 'legal-team', 'healthcare', 'real-estate', 'startup', 'executive', 'freelancer', 'remote-team', 'small-business'].includes(s) },
  { title: 'Context-Based Examples', filter: (s: string) => ['enterprise', 'holiday-seasonal', 'event-promotion', 'hiring-recruitment', 'best-2026'].includes(s) },
];

export default function ExamplesIndex() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6">
            <Palette className="h-4 w-4" />
            Examples
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Email Signature Examples & Inspiration
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse curated email signature examples organized by style, design elements, team roles, and use case. Find the perfect inspiration for your next signature.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {groups.map((group) => {
            const pages = examplesPages.filter((p) => group.filter(p.slug));
            if (pages.length === 0) return null;
            return (
              <div key={group.title} className="mb-12">
                <h2 className="text-2xl font-bold mb-4">{group.title}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/examples/${page.slug}`}
                      className="block p-4 rounded-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-colors"
                    >
                      <h3 className="font-semibold text-sm">{page.hero.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{page.hero.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
