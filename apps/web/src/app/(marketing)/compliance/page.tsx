import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { compliancePages } from '@/lib/seo-pages/data/compliance';

export const metadata = genMeta({
  title: 'Email Signature Compliance by Regulation | Siggly',
  description: 'Comprehensive compliance guides for email signatures across GDPR, HIPAA, SOX, CAN-SPAM, CCPA, FERPA, PCI-DSS, CASL, PECR, and ISO 27001. Enterprise-ready regulatory reference.',
  keywords: ['email signature compliance', 'email regulations', 'gdpr email', 'hipaa email', 'email signature requirements'],
  canonical: '/compliance',
});

const groups = [
  {
    title: 'International Regulations',
    description: 'Cross-border and regional data protection and electronic communications laws.',
    slugs: ['gdpr', 'pecr', 'casl'],
  },
  {
    title: 'US Federal Regulations',
    description: 'United States federal laws governing email communications, data privacy, and industry-specific requirements.',
    slugs: ['hipaa', 'sox', 'can-spam', 'ferpa', 'pci-dss', 'ccpa'],
  },
  {
    title: 'International Standards',
    description: 'Voluntary certification standards adopted globally for information security management.',
    slugs: ['iso-27001'],
  },
];

function getKeyStat(slug: string): string | null {
  const page = compliancePages.find((p) => p.slug === slug);
  if (!page?.stats || page.stats.length === 0) return null;
  return `${page.stats[0].value} — ${page.stats[0].label}`;
}

export default function ComplianceIndex() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6">
            <ShieldCheck className="h-4 w-4" />
            Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Email Signature Compliance by Regulation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Deep-dive regulatory guides for enterprise compliance teams. Understand how each regulation affects email signatures and how to achieve compliance.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {groups.map((group) => {
            const pages = group.slugs
              .map((slug) => compliancePages.find((p) => p.slug === slug))
              .filter(Boolean);
            if (pages.length === 0) return null;
            return (
              <div key={group.title} className="mb-12">
                <h2 className="text-2xl font-bold mb-1">{group.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{group.description}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pages.map((page) => {
                    if (!page) return null;
                    const keyStat = getKeyStat(page.slug);
                    return (
                      <Link
                        key={page.slug}
                        href={`/compliance/${page.slug}`}
                        className="block p-4 rounded-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="h-5 w-5 text-violet-600 mt-0.5 shrink-0" />
                          <div>
                            <h3 className="font-semibold text-sm">{page.hero.title}</h3>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{page.hero.description}</p>
                            {keyStat && (
                              <p className="text-xs text-violet-700 font-medium mt-2">
                                {keyStat}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
