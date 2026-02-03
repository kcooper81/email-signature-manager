'use client';

import Link from 'next/link';
import { Check, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PLANS_LIST, TRIAL_DAYS } from '@/lib/billing/plans';
import { PricingPageTracker } from '@/components/analytics';
import { generateMetadata as genMeta, generateFAQSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = genMeta({
  title: 'Pricing - Email Signature Management',
  description: 'Simple, transparent pricing for email signature management. Start free, upgrade as you grow. Plans from $0.50/user/month.',
  keywords: ['pricing', 'email signature pricing', 'signature management cost', 'exclaimer pricing alternative'],
  canonical: '/pricing',
});

const faqs = [
  {
    question: 'Can I try Siggly for free?',
    answer: `Yes! Our Free plan lets you try Siggly with up to 5 team members forever. Paid plans also come with a ${TRIAL_DAYS}-day free trial.`,
  },
  {
    question: 'How does per-user/team member pricing work?',
    answer: 'You pay based on the number of users/team members in your organization who need email signatures. For example: Starter plan at $0.50 per user means a 10-person team pays $5/month, a 50-person team pays $25/month. Professional plan is $29 base + $1 per user, so a 50-person team pays $79/month ($29 + $50). Everyone on your team gets professional signatures.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
  },
  {
    question: 'Do you offer annual billing?',
    answer: 'Yes, we offer a 20% discount for annual billing on all paid plans.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and can arrange invoicing for Enterprise plans.',
  },
  {
    question: 'How does Siggly compare to competitors?',
    answer: 'Siggly offers the same features as Exclaimer, WiseStamp, and CodeTwo at up to 50% lower cost. For example, WiseStamp charges $1/member while our Starter plan is just $0.50/member.',
  },
];

function ProfessionalPricing() {
  const [teamSize, setTeamSize] = useState(10);
  const totalPrice = 29 + teamSize;

  return (
    <div>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl font-bold">$29</span>
        <span className="text-gray-500">/mo</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">+ $1/team member</p>
      
      {/* Quick Calculator */}
      <div className="mt-4 p-3 bg-violet-50 rounded-lg border border-violet-200">
        <p className="text-xs font-medium text-violet-900 mb-2">Quick calculator:</p>
        <div className="space-y-2">
          <input
            type="range"
            min="1"
            max="100"
            value={teamSize}
            onChange={(e) => setTeamSize(parseInt(e.target.value))}
            className="w-full h-2 bg-violet-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
          />
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{teamSize} users</span>
            <span className="font-bold text-violet-600">${totalPrice}/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Start free, upgrade as you grow. No hidden fees, no surprises.
          </p>
          <p className="text-lg text-violet-600 font-medium">
            💡 Pricing is per team member/user — everyone in your organization gets professional email signatures
          </p>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-4">Calculate Your Cost</h2>
            <p className="text-center text-gray-600 mb-6">
              See exactly what you'll pay based on your team size
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 mb-2">10 team members</div>
                <div className="text-3xl font-bold text-violet-600 mb-1">$5/mo</div>
                <div className="text-xs text-gray-500">with Starter ($0.50/user)</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-violet-500">
                <div className="text-sm text-gray-500 mb-2">50 team members</div>
                <div className="text-3xl font-bold text-violet-600 mb-1">$79/mo</div>
                <div className="text-xs text-gray-500">with Professional ($29 + $1/user)</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 mb-2">100 team members</div>
                <div className="text-3xl font-bold text-violet-600 mb-1">$129/mo</div>
                <div className="text-xs text-gray-500">with Professional ($29 + $1/user)</div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">
              💰 Save up to 50% compared to Exclaimer, WiseStamp, and CodeTwo
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Plan</h2>
          <p className="text-center text-gray-600 mb-12">
            All plans include core features. Upgrade for advanced capabilities and priority support.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  ) : plan.id === 'starter' ? (
                    <div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold">$0.50</span>
                        <span className="text-gray-500">/user/mo</span>
                      </div>
                      <p className="text-xs text-violet-600 mt-1">50% cheaper than competitors</p>
                      <p className="text-xs text-gray-400 mt-1">Per team member</p>
                    </div>
                  ) : (
                    <ProfessionalPricing />
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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of teams who trust Siggly for their email signatures.
          </p>
          <Link href="/signup">
            <Button size="lg">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

    </>
  );
}
