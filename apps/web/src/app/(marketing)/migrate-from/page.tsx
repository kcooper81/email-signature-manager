import Link from 'next/link';
import { ArrowRightLeft } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { migrationsPages } from '@/lib/seo-pages/data/migrations';

export const metadata = genMeta({
  title: 'Email Signature Migration Guides | Switch to Siggly',
  description: 'Step-by-step migration guides for switching to Siggly from Exclaimer, CodeTwo, WiseStamp, Opensense, and other email signature tools. Zero downtime, full data preservation.',
  keywords: ['email signature migration', 'switch email signature tool', 'migrate to Siggly', 'email signature migration guide'],
  canonical: '/migrate-from',
});

const groups = [
  {
    title: 'Enterprise & Server-Side Solutions',
    description: 'Migrating from tools that modify mail flow or require server infrastructure.',
    filter: (s: string) => ['exclaimer', 'codetwo', 'opensense', 'rocketseed'].includes(s),
  },
  {
    title: 'Campaign & Marketing Platforms',
    description: 'Migrating from tools focused on signature banner campaigns and marketing automation.',
    filter: (s: string) => ['mailtastic', 'letsignit', 'sigstr'].includes(s),
  },
  {
    title: 'Signature Generators & Creators',
    description: 'Migrating from individual signature tools to centralized team management.',
    filter: (s: string) => ['wisestamp', 'newoldstamp', 'gimmio', 'bybrand'].includes(s),
  },
  {
    title: 'Document & Workspace Platforms',
    description: 'Extracting email signature management from broader document platforms.',
    filter: (s: string) => ['templafy'].includes(s),
  },
];

export default function MigrateFromIndex() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6">
            <ArrowRightLeft className="h-4 w-4" />
            Migration Guides
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Migrate to Siggly
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Step-by-step guides for switching from your current email signature tool to Siggly. Zero downtime, full data preservation, and dedicated migration support.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {groups.map((group) => {
            const pages = migrationsPages.filter((p) => group.filter(p.slug));
            if (pages.length === 0) return null;
            return (
              <div key={group.title} className="mb-12">
                <h2 className="text-2xl font-bold mb-2">{group.title}</h2>
                <p className="text-gray-500 text-sm mb-4">{group.description}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/migrate-from/${page.slug}`}
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
