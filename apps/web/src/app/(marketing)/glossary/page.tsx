import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { glossaryPages } from '@/lib/seo-pages/data/glossary';

export const metadata = genMeta({
  title: 'Email Signature Glossary - Terms & Definitions | Siggly',
  description: 'Complete glossary of email signature terms, email authentication, compliance, and signature management concepts. Learn everything about professional email signatures.',
  keywords: ['email signature glossary', 'email terms', 'signature management definitions', 'email authentication terms'],
  canonical: '/glossary',
});

// Group pages by their thematic groups based on slug patterns
const groups = [
  { title: 'Core Email Signature Concepts', filter: (s: string) => ['email-signature', 'html-email-signature', 'plain-text-signature', 'email-signature-block', 'email-footer', 'email-disclaimer', 'confidentiality-notice', 'email-branding', 'digital-business-card', 'vcard'].includes(s) },
  { title: 'Email Authentication & Security', filter: (s: string) => ['dkim', 'spf-record', 'dmarc', 'email-authentication', 'email-deliverability', 'email-spoofing', 'phishing-protection', 'email-encryption'].includes(s) },
  { title: 'Email Infrastructure', filter: (s: string) => ['smtp', 'email-client', 'webmail', 'mail-transfer-agent', 'exchange-online', 'google-workspace-email', 'microsoft-365-email', 'email-header'].includes(s) },
  { title: 'Signature Management', filter: (s: string) => ['signature-deployment', 'directory-sync', 'centralized-signature-management', 'signature-template', 'dynamic-fields', 'role-based-access-control', 'signature-versioning', 'bulk-signature-update'].includes(s) },
  { title: 'Marketing & Analytics', filter: (s: string) => ['email-banner-campaign', 'click-through-rate', 'email-signature-analytics', 'ab-testing-signatures', 'call-to-action-email', 'employee-advocacy-email', 'campaign-tracking-email', 'email-marketing-roi'].includes(s) },
  { title: 'Compliance & Standards', filter: (s: string) => ['gdpr-email-compliance', 'hipaa-email-requirements', 'can-spam-act', 'email-retention-policy', 'email-archiving', 'sox-compliance-email', 'brand-consistency-email', 'responsive-email-design'].includes(s) },
];

export default function GlossaryIndex() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4" />
            Glossary
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Email Signature Glossary
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about email signatures, authentication, compliance, and signature management — explained simply.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {groups.map((group) => {
            const pages = glossaryPages.filter((p) => group.filter(p.slug));
            if (pages.length === 0) return null;
            return (
              <div key={group.title} className="mb-12">
                <h2 className="text-2xl font-bold mb-4">{group.title}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/glossary/${page.slug}`}
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
