import Link from 'next/link';
import { CheckSquare } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { checklistsPages } from '@/lib/seo-pages/data/checklists';

export const metadata = genMeta({
  title: 'Email Signature Checklists - Step-by-Step Guides | Siggly',
  description: 'Actionable, step-by-step email signature checklists for deployment, compliance, design, branding, and operations. Follow each checklist to get it right the first time.',
  keywords: ['email signature checklists', 'signature deployment checklist', 'email compliance checklist', 'signature setup guides'],
  canonical: '/checklists',
});

const groups = [
  {
    title: 'Deployment & Setup',
    filter: (s: string) =>
      ['signature-deployment', 'google-workspace-setup', 'microsoft-365-setup', 'new-employee-onboarding'].includes(s),
  },
  {
    title: 'Compliance',
    filter: (s: string) =>
      ['gdpr-compliance', 'hipaa-compliance', 'security-audit'].includes(s),
  },
  {
    title: 'Design & Branding',
    filter: (s: string) =>
      ['signature-design', 'accessibility', 'mobile-optimization', 'brand-guidelines', 'company-rebranding'].includes(s),
  },
  {
    title: 'Operations',
    filter: (s: string) =>
      ['quarterly-signature-audit', 'banner-campaign-launch', 'analytics-setup'].includes(s),
  },
];

export default function ChecklistsIndex() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
            <CheckSquare className="h-4 w-4" />
            Checklists
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Email Signature Checklists
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Actionable, step-by-step checklists for deploying, designing, securing, and maintaining professional email signatures across your organization.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {groups.map((group) => {
            const pages = checklistsPages.filter((p) => group.filter(p.slug));
            if (pages.length === 0) return null;
            return (
              <div key={group.title} className="mb-12">
                <h2 className="text-2xl font-bold mb-4">{group.title}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/checklists/${page.slug}`}
                      className="block p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
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
