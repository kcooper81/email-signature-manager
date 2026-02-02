import Link from 'next/link';
import { Mail, Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PLANS_LIST, TRIAL_DAYS } from '@/lib/billing/plans';

export const metadata = {
  title: 'Pricing | Siggly - Email Signature Management',
  description: 'Simple, transparent pricing for email signature management. Start free, upgrade as you grow.',
};

const faqs = [
  {
    question: 'Can I try Siggly for free?',
    answer: `Yes! Our Free plan lets you try Siggly with up to 5 team members forever. Paid plans also come with a ${TRIAL_DAYS}-day free trial.`,
  },
  {
    question: 'How does per-member pricing work?',
    answer: 'You pay based on the number of team members who receive email signatures. For example, with Starter at $0.50/member, a 50-person team costs just $25/month.',
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

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">Siggly</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free, upgrade as you grow. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
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
                        <span className="text-gray-500">/member/mo</span>
                      </div>
                      <p className="text-xs text-violet-600 mt-1">50% cheaper than competitors</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold">$29</span>
                        <span className="text-gray-500">/mo</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">+ $1/team member</p>
                    </div>
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

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Siggly. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">Terms</Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
