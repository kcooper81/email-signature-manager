import Link from 'next/link';
import { Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta, generateFAQSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { MarketingCTA } from '@/components/marketing/cta';

export const metadata = genMeta({
  title: 'Email Signature Software Pricing Compared',
  description:
    'Compare email signature software pricing per user — Siggly, Exclaimer, CodeTwo, WiseStamp, Sigsync, and more. Free plans, starting prices, and platform support.',
  keywords: [
    'email signature software pricing',
    'email signature software cost',
    'email signature price per user',
    'email signature software comparison',
  ],
  canonical: '/email-signature-software-pricing',
});

// Starting/published prices as of July 2026. Vendor pricing changes frequently —
// figures are indicative; verify current pricing on each vendor's website.
const vendors: {
  name: string;
  free: boolean;
  startingPrice: string;
  platforms: string;
  note: string;
  href?: string;
  highlight?: boolean;
}[] = [
  { name: 'Siggly', free: true, startingPrice: '$1.50 / user', platforms: 'Google + Microsoft', note: 'Free up to 5 users; 10-user minimum on paid', href: '/pricing', highlight: true },
  { name: 'Sigsync', free: false, startingPrice: '~$0.91 / user', platforms: 'Microsoft 365 only', note: 'Trial only; volume-based pricing', href: '/compare/sigsync' },
  { name: 'Signitic', free: true, startingPrice: '~€1 / user', platforms: 'Google + Microsoft', note: 'Free plan adds vendor branding; 20-license minimum', href: '/compare/signitic' },
  { name: 'BulkSignature', free: false, startingPrice: '~$1.10 / user', platforms: 'Google + Microsoft', note: '14-day trial; Google-first', href: '/compare/bulksignature' },
  { name: 'CodeTwo', free: false, startingPrice: '~$1.15 / user', platforms: 'Microsoft-first', note: 'Annual billing; Windows heritage', href: '/compare/codetwo' },
  { name: 'Exclaimer', free: false, startingPrice: '~$1.75 / user', platforms: 'Google + Microsoft', note: 'Custom/enterprise quotes common', href: '/compare/exclaimer' },
  { name: 'SyncSignature', free: true, startingPrice: '$2.00 / user', platforms: 'Google + Microsoft', note: 'Free tier limited to a single signature', href: '/alternatives/syncsignature' },
  { name: 'WiseStamp', free: false, startingPrice: '~$4 / user', platforms: 'Multi-client', note: 'Individual/small-team focused', href: '/compare/wisestamp' },
];

const faqs = [
  {
    question: 'How much does email signature software cost per user?',
    answer:
      'Most email signature management tools cost between roughly $0.90 and $4 per user per month. Siggly is $1.50 per user/month with a 10-user minimum, and is free for teams of up to 5 users.',
  },
  {
    question: 'Is there free email signature management software?',
    answer:
      'Yes. Siggly offers a free plan for up to 5 users with a visual editor. Some vendors offer limited free tiers (often with vendor branding or a single signature), while others provide only a time-limited trial.',
  },
  {
    question: 'Why do prices vary so much between vendors?',
    answer:
      'Pricing depends on platform support (Google, Microsoft, or both), deployment model (server-side vs client-side), included features like analytics and campaign banners, minimum seat counts, and whether the vendor targets individuals or organizations.',
  },
  {
    question: 'What is the cheapest way to manage email signatures for a team?',
    answer:
      'For teams up to 5 users, Siggly\'s free plan is the cheapest full-featured option. Above that, expect roughly $1–$2 per user/month from most reputable organization-focused vendors.',
  },
];

export default function PricingComparisonPage() {
  return (
    <div className="text-gray-900">
      <JsonLd data={generateFAQSchema(faqs)} />

      <section className="relative pt-28 md:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50 to-white" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Email Signature Software Pricing, Compared
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            What email signature management actually costs per user across the major vendors — free plans,
            starting prices, and which platforms each one supports.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-600">
                  <th className="px-4 py-3 font-semibold">Vendor</th>
                  <th className="px-4 py-3 font-semibold">Free plan</th>
                  <th className="px-4 py-3 font-semibold">Starting price</th>
                  <th className="px-4 py-3 font-semibold">Platforms</th>
                  <th className="px-4 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.name} className={`border-t border-gray-100 ${v.highlight ? 'bg-violet-50/60' : ''}`}>
                    <td className="px-4 py-3 font-semibold">
                      {v.href ? (
                        <Link href={v.href} className="text-violet-700 hover:underline">{v.name}</Link>
                      ) : (
                        v.name
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {v.free ? (
                        <span className="inline-flex items-center gap-1 text-green-600"><Check className="h-4 w-4" /> Yes</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400"><X className="h-4 w-4" /> No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{v.startingPrice}</td>
                    <td className="px-4 py-3">{v.platforms}</td>
                    <td className="px-4 py-3 text-gray-500">{v.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Prices are indicative starting rates as published in July 2026 and exclude taxes and annual discounts.
            Vendor pricing changes frequently — always verify current pricing on each vendor&apos;s website.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.question} className="rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold mb-2">{f.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Link href="/pricing">
            <Button size="lg" className="gap-2">
              See Siggly pricing <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MarketingCTA variant="default" />
    </div>
  );
}
