import Link from 'next/link';
import { Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PLANS_LIST } from '@/lib/billing/plans';
import { MarketingCTA } from '@/components/marketing/cta';
import { PricingPageTracker } from '@/components/analytics';
import { generateMetadata as genMeta, generateFAQSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { ProfessionalPricingCalculator } from '@/components/pricing/professional-pricing-calculator';

export const metadata = genMeta({
  title: 'Pricing - Email Signature Management',
  description: 'Free forever for small teams. Professional plan at $1.50/user/month with a 10-user minimum. Full features on every plan — 25-73% cheaper than competitors.',
  keywords: ['pricing', 'email signature pricing', 'signature management cost', 'exclaimer pricing alternative'],
  canonical: '/pricing',
});

const faqs = [
  {
    question: 'Can I try Siggly for free?',
    answer: `Yes! Our Free plan includes full feature access — HubSpot integration, compliance blocks, bulk operations, directory sync, and more — for up to 5 users with 1 template. It's free forever.`,
  },
  {
    question: 'How does per-user pricing work?',
    answer: 'Professional is $1.50 per user per month with a 10-user minimum ($15/mo). You pay based on the number of users in your organization who need email signatures. For example: 50 users = $75/month. Clean, simple pricing — no base fees, no hidden costs.',
  },
  {
    question: 'What happens when I hit 6 users on the Free plan?',
    answer: 'The Free plan supports up to 5 users. When you need to add a 6th user, you upgrade to Professional at $1.50/user/month (10-user minimum). All your data, templates, and settings carry over seamlessly.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
  },
  {
    question: 'Do you offer annual billing?',
    answer: 'Yes, we offer a 20% discount for annual billing on Professional plans.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and can arrange invoicing for Enterprise plans.',
  },
  {
    question: 'How does Siggly compare to competitors on price?',
    answer: 'At $1.50/user/month, Siggly is 25% cheaper than CodeTwo ($2/user), 50% cheaper than Exclaimer ($2–3/user), and 73% cheaper than Siggy.io ($4/user). You get the same enterprise features at a fraction of the cost.',
  },
];

export default function PricingPage() {
  // Prepare plans for tracking
  const trackablePlans = PLANS_LIST.map(p => ({
    id: p.id,
    name: p.name,
    pricePerUser: p.pricePerUser,
  }));

  return (
    <>
      <PricingPageTracker plans={trackablePlans} />
      <JsonLd data={generateFAQSchema(faqs)} />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Free forever. Simple pricing when you grow.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Full feature access on the Free plan. One paid plan for teams — no tiers, no confusion.
          </p>
          <p className="text-lg text-violet-600 font-medium">
            25-73% cheaper than Exclaimer, CodeTwo, and Siggy.io
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Plan</h2>
          <p className="text-center text-gray-600 mb-12">
            Everything included on Free. Upgrade when your team outgrows 5 users.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS_LIST.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white border rounded-2xl p-6 ${
                  plan.popular ? 'border-violet-500 shadow-lg' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-violet-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                  {plan.id === 'enterprise' ? (
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">Custom</span>
                    </div>
                  ) : plan.id === 'free' ? (
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">$0</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                  ) : (
                    <ProfessionalPricingCalculator />
                  )}
                  <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.featureList.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-2 text-sm">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-gray-300" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.ctaLink}>
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <MarketingCTA variant="default" />

    </>
  );
}
