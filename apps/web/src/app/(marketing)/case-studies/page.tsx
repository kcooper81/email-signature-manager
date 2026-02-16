import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { caseStudiesPages } from '@/lib/seo-pages/data/case-studies';

export const metadata = genMeta({
  title: 'Customer Case Studies - Email Signature Success Stories | Siggly',
  description: 'Real-world case studies showing how organizations use Siggly to solve email signature challenges. From law firms to healthcare networks, see measurable results across every industry.',
  keywords: ['email signature case studies', 'signature management success stories', 'email branding ROI', 'Siggly customer stories'],
  canonical: '/case-studies',
});

const groups = [
  {
    title: 'Legal & Financial Services',
    filter: (s: string) => ['law-firm-200-attorneys', 'financial-services-compliance', 'insurance-network'].includes(s),
  },
  {
    title: 'Healthcare & Government',
    filter: (s: string) => ['healthcare-network-compliance', 'government-agency'].includes(s),
  },
  {
    title: 'Technology & SaaS',
    filter: (s: string) => ['saas-startup-scaling', 'tech-company-remote'].includes(s),
  },
  {
    title: 'Professional Services',
    filter: (s: string) => ['marketing-agency-clients', 'consulting-firm-rebrand'].includes(s),
  },
  {
    title: 'Education',
    filter: (s: string) => ['university-faculty'].includes(s),
  },
  {
    title: 'Retail & Franchise',
    filter: (s: string) => ['real-estate-brokerage', 'retail-chain-campaigns', 'franchise-consistency'].includes(s),
  },
  {
    title: 'Manufacturing & Nonprofit',
    filter: (s: string) => ['manufacturing-multi-site', 'nonprofit-donor-engagement'].includes(s),
  },
];

export default function CaseStudiesIndex() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6">
            <Trophy className="h-4 w-4" />
            Case Studies
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Customer Case Studies
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-world success stories from organizations that transformed their email signature management with Siggly. Specific numbers, timelines, and outcomes.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {groups.map((group) => {
            const pages = caseStudiesPages.filter((p) => group.filter(p.slug));
            if (pages.length === 0) return null;
            return (
              <div key={group.title} className="mb-12">
                <h2 className="text-2xl font-bold mb-4">{group.title}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/case-studies/${page.slug}`}
                      className="block p-4 rounded-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-colors"
                    >
                      <h3 className="font-semibold text-sm">{page.hero.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{page.hero.description}</p>
                      {page.stats && page.stats.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-3">
                          {page.stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                              <div className="text-sm font-bold text-violet-600">{stat.value}</div>
                              <div className="text-[10px] text-gray-400 uppercase tracking-wide">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
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
