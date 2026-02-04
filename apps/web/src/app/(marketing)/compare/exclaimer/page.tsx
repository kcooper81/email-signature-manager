import Link from 'next/link';
import { ArrowRight, Check, X, Zap, DollarSign, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta, generateComparisonSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = genMeta({
  title: 'Siggly vs Exclaimer - Email Signature Comparison',
  description: 'Compare Siggly and Exclaimer for email signature management. See features, pricing, and why teams switch from Exclaimer to Siggly.',
  keywords: ['Exclaimer alternative', 'Exclaimer vs Siggly', 'email signature comparison', 'Exclaimer pricing'],
  canonical: '/compare/exclaimer',
});

const comparisonData = [
  { feature: 'Starting Price', siggly: 'Free (5 users)', exclaimer: '$2.00/user/mo', winner: 'siggly' },
  { feature: 'Google Workspace', siggly: true, exclaimer: true, winner: 'tie' },
  { feature: 'Microsoft 365', siggly: true, exclaimer: true, winner: 'tie' },
  { feature: 'Visual Editor', siggly: true, exclaimer: true, winner: 'tie' },
  { feature: 'Click Tracking', siggly: true, exclaimer: true, winner: 'tie' },
  { feature: 'Campaign Banners', siggly: true, exclaimer: true, winner: 'tie' },
  { feature: 'Free Plan', siggly: true, exclaimer: false, winner: 'siggly' },
  { feature: 'Setup Time', siggly: '5 minutes', exclaimer: '30+ minutes', winner: 'siggly' },
  { feature: 'No IT Required', siggly: true, exclaimer: false, winner: 'siggly' },
  { feature: 'Modern UI', siggly: true, exclaimer: false, winner: 'siggly' },
  { feature: 'AI Signature Generator', siggly: 'Coming Soon', exclaimer: false, winner: 'siggly' },
  { feature: 'Contract Required', siggly: false, exclaimer: true, winner: 'siggly' },
];

const switchReasons = [
  { icon: DollarSign, title: 'Save 75% on costs', description: 'Siggly starts at $0.50/user vs Exclaimer\'s $2.00/user minimum.' },
  { icon: Clock, title: 'Setup in minutes', description: 'No complex configuration or IT involvement needed.' },
  { icon: Zap, title: 'Modern, intuitive UI', description: 'Built for 2024, not 2014. Your team will actually enjoy using it.' },
  { icon: Heart, title: 'Free tier available', description: 'Try with your whole team before committing to a paid plan.' },
];

const comparisonFeatures = comparisonData.map(item => ({
  name: item.feature,
  siggly: item.siggly === true || typeof item.siggly === 'string',
  competitor: item.exclaimer === true || typeof item.exclaimer === 'string',
}));

export default function ExclaimerComparisonPage() {
  return (
    <>
      <JsonLd data={generateComparisonSchema({ competitor: 'Exclaimer', features: comparisonFeatures })} />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Siggly vs Exclaimer</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Looking for an Exclaimer alternative? See why teams are switching to Siggly 
            for simpler setup, modern UI, and up to 75% lower costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Try Siggly Free <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Comparison */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">75%</div>
              <div className="text-gray-400">Lower cost than Exclaimer</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">5 min</div>
              <div className="text-gray-400">Setup vs 30+ minutes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">Free</div>
              <div className="text-gray-400">Plan available (Exclaimer: none)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="px-6 py-4 font-semibold">Feature</div>
              <div className="px-6 py-4 font-semibold text-center text-violet-600">Siggly</div>
              <div className="px-6 py-4 font-semibold text-center text-gray-500">Exclaimer</div>
            </div>
            {comparisonData.map((row) => (
              <div key={row.feature} className="grid grid-cols-3 border-b border-gray-100 last:border-0">
                <div className="px-6 py-4 text-sm">{row.feature}</div>
                <div className="px-6 py-4 text-center">
                  {typeof row.siggly === 'boolean' ? (
                    row.siggly ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />
                  ) : (
                    <span className={`text-sm font-medium ${row.winner === 'siggly' ? 'text-green-600' : ''}`}>{row.siggly}</span>
                  )}
                </div>
                <div className="px-6 py-4 text-center">
                  {typeof row.exclaimer === 'boolean' ? (
                    row.exclaimer ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />
                  ) : (
                    <span className="text-sm text-gray-500">{row.exclaimer}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Switch */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why teams switch from Exclaimer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {switchReasons.map((reason) => (
              <div key={reason.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="h-12 w-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <reason.icon className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="font-semibold mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing Comparison</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-violet-50 border-2 border-violet-500 rounded-2xl p-8">
              <div className="text-violet-600 font-semibold mb-2">Siggly</div>
              <div className="text-4xl font-bold mb-4">$0.50<span className="text-lg font-normal text-gray-500">/user/mo</span></div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Free plan for up to 5 users</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> No contracts or commitments</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> All features included</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Cancel anytime</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <div className="text-gray-500 font-semibold mb-2">Exclaimer</div>
              <div className="text-4xl font-bold mb-4">$2.00<span className="text-lg font-normal text-gray-500">/user/mo</span></div>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-center gap-2"><X className="h-4 w-4 text-gray-300" /> No free plan</li>
                <li className="flex items-center gap-2"><X className="h-4 w-4 text-gray-300" /> Annual contract required</li>
                <li className="flex items-center gap-2"><X className="h-4 w-4 text-gray-300" /> Some features require higher tiers</li>
                <li className="flex items-center gap-2"><X className="h-4 w-4 text-gray-300" /> Complex cancellation</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            For a 100-person team: Siggly = $50/mo vs Exclaimer = $200/mo. Save $1,800/year.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to switch from Exclaimer?</h2>
          <p className="text-violet-100 mb-8">Start free today. No credit card required. Import your existing signatures.</p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-violet-700 hover:bg-gray-100">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

    </>
  );
}
