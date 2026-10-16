import Link from 'next/link';
import { Mail, ArrowRight, Check, X, Zap, DollarSign, Cloud, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta, generateComparisonSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = genMeta({
  title: 'Siggly vs CodeTwo - Email Signature Comparison',
  description: 'Compare Siggly and CodeTwo for email signature management. See why teams choose Siggly for cloud-native simplicity and better pricing.',
  keywords: ['CodeTwo alternative', 'CodeTwo vs Siggly', 'email signature comparison', 'CodeTwo pricing'],
  canonical: '/compare/codetwo',
});

const comparisonData = [
  { feature: 'Starting Price', siggly: 'Free (5 users)', codetwo: '$2.00/user/mo', winner: 'siggly' },
  { feature: 'Cloud-Native', siggly: true, codetwo: false, winner: 'siggly' },
  { feature: 'Google Workspace', siggly: true, codetwo: true, winner: 'tie' },
  { feature: 'Microsoft 365', siggly: true, codetwo: true, winner: 'tie' },
  { feature: 'On-Premise Option', siggly: false, codetwo: true, winner: 'codetwo' },
  { feature: 'Visual Editor', siggly: true, codetwo: true, winner: 'tie' },
  { feature: 'Free Plan', siggly: true, codetwo: false, winner: 'siggly' },
  { feature: 'No Server Required', siggly: true, codetwo: false, winner: 'siggly' },
  { feature: 'Mobile-Optimized', siggly: true, codetwo: false, winner: 'siggly' },
  { feature: 'Setup Time', siggly: '5 minutes', codetwo: '1-2 hours', winner: 'siggly' },
  { feature: 'IT Skills Required', siggly: false, codetwo: true, winner: 'siggly' },
  { feature: 'Modern UI', siggly: true, codetwo: false, winner: 'siggly' },
];

const switchReasons = [
  { icon: Cloud, title: '100% Cloud-Native', description: 'No servers to manage. No software to install. Just sign up and go.' },
  { icon: DollarSign, title: '25% Lower Cost', description: 'Siggly Professional at $1.50/user vs CodeTwo\'s $2.00/user. Plus a generous free tier.' },
  { icon: Zap, title: 'No IT Required', description: 'Marketing and HR teams can manage signatures without IT help.' },
  { icon: Smartphone, title: 'Mobile-First Design', description: 'Signatures that look perfect on every device, including mobile apps.' },
];

const comparisonFeatures = comparisonData.map(item => ({
  name: item.feature,
  siggly: item.siggly,
  competitor: item.codetwo,
}));

export default function CodeTwoComparisonPage() {
  return (
    <>
      <JsonLd data={generateComparisonSchema({ competitor: 'CodeTwo', features: comparisonFeatures })} />
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Siggly vs CodeTwo</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Looking for a CodeTwo alternative? Siggly offers cloud-native simplicity 
            without servers, complex setup, or IT involvement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Try Siggly Free <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">25%</div>
              <div className="text-gray-400">Lower cost than CodeTwo</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">0</div>
              <div className="text-gray-400">Servers to manage</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">5 min</div>
              <div className="text-gray-400">Setup vs 1-2 hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Feature Comparison</h2>
          <div className="overflow-x-auto -mx-6 px-6">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden min-w-[480px]">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="px-3 sm:px-6 py-4 font-semibold">Feature</div>
              <div className="px-3 sm:px-6 py-4 font-semibold text-center text-violet-600">Siggly</div>
              <div className="px-3 sm:px-6 py-4 font-semibold text-center text-gray-500">CodeTwo</div>
            </div>
            {comparisonData.map((row) => (
              <div key={row.feature} className="grid grid-cols-3 border-b border-gray-100 last:border-0">
                <div className="px-3 sm:px-6 py-4 text-sm">{row.feature}</div>
                <div className="px-6 py-4 text-center">
                  {typeof row.siggly === 'boolean' ? (
                    row.siggly ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />
                  ) : (
                    <span className={`text-sm font-medium ${row.winner === 'siggly' ? 'text-green-600' : ''}`}>{row.siggly}</span>
                  )}
                </div>
                <div className="px-6 py-4 text-center">
                  {typeof row.codetwo === 'boolean' ? (
                    row.codetwo ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />
                  ) : (
                    <span className="text-sm text-gray-500">{row.codetwo}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Why Switch */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why teams switch from CodeTwo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {switchReasons.map((reason) => (
              <div key={reason.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <reason.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CodeTwo Limitations */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">CodeTwo Limitations</h2>
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-2">Requires On-Premise Server</h3>
              <p className="text-sm text-red-700">CodeTwo's on-premise solution requires server infrastructure, maintenance, and IT expertise to manage.</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-2">Complex Setup Process</h3>
              <p className="text-sm text-red-700">Installation involves Exchange connectors, transport rules, and server configuration—typically 1-2 hours minimum.</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-2">Outdated Interface</h3>
              <p className="text-sm text-red-700">The admin interface feels dated and requires technical knowledge to navigate effectively.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed breakdown */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Siggly vs CodeTwo: the detailed breakdown</h2>

          <h3 className="text-xl font-semibold mb-2">Architecture: cloud-native vs server-based</h3>
          <p className="text-gray-600 mb-6">
            This is the core difference. Siggly is 100% cloud-native — you connect your Google
            Workspace or Microsoft 365 tenant over OAuth and deploy, with nothing to install.
            CodeTwo&apos;s signature products are built around Exchange/Microsoft 365 and, for some
            configurations, server-side or on-premise components. If you run a Microsoft-centric
            environment and specifically want on-premise Exchange support, CodeTwo offers that and
            Siggly does not — we&apos;ll be upfront about it.
          </p>

          <h3 className="text-xl font-semibold mb-2">Platform support</h3>
          <p className="text-gray-600 mb-6">
            CodeTwo is Microsoft-focused (Microsoft 365 and Exchange, including on-premise). Siggly
            supports both Google Workspace and Microsoft 365. If your organization is on Google
            Workspace, CodeTwo isn&apos;t really aimed at you — Siggly is. If you&apos;re a large
            Microsoft 365 shop that wants deep transport-level stamping or on-premise Exchange, CodeTwo
            is purpose-built for that.
          </p>

          <h3 className="text-xl font-semibold mb-2">Setup and who manages it</h3>
          <p className="text-gray-600 mb-6">
            Siggly is designed so marketing or HR can manage signatures without IT, and most teams are
            live in minutes. CodeTwo deployments are typically IT-led and take longer to configure.
            Pricing-wise, Siggly is $1.50/user/month with a free tier and no contract; CodeTwo&apos;s
            publicly listed rate is around $2.00/user/month with no free plan (as of October 2026).
          </p>
        </div>
      </section>

      {/* Who should choose CodeTwo — honest balance */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Who should choose CodeTwo?</h2>
            <p className="text-gray-600">
              CodeTwo is a solid choice if you&apos;re a Microsoft 365 or on-premise Exchange
              organization, you need server-side transport-level stamping, and you have IT to manage
              the deployment. Its on-premise Exchange support in particular is something Siggly does
              not offer.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-3">When Siggly is the better fit</h2>
            <p className="text-gray-600">
              Choose Siggly if you&apos;re on Google Workspace, you want a cloud-native tool with no
              servers to manage, you&apos;d like marketing/HR to run signatures without IT, or you want
              a free tier and month-to-month billing. For most small and mid-sized teams, that&apos;s
              the better match.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Siggly vs CodeTwo — common questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-1">Is Siggly a good CodeTwo alternative?</h3>
              <p className="text-sm text-gray-600">For Google Workspace teams and organizations that want a cloud-native tool without servers or IT overhead, yes. If you specifically need on-premise Exchange stamping, CodeTwo remains the more specialized option.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Does Siggly support on-premise Exchange like CodeTwo?</h3>
              <p className="text-sm text-gray-600">No — Siggly is cloud-native and supports Microsoft 365 and Google Workspace, not on-premise Exchange. If on-premise is a hard requirement, CodeTwo is the better fit.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">How much does Siggly cost compared to CodeTwo?</h3>
              <p className="text-sm text-gray-600">Siggly is $1.50/user/month with a free plan for up to 5 users. CodeTwo&apos;s publicly listed rate is about $2.00/user/month with no free tier (as of October 2026) — roughly 25% less with Siggly, before the free tier.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">How long does Siggly take to set up versus CodeTwo?</h3>
              <p className="text-sm text-gray-600">Most Siggly teams are live in minutes via an OAuth connection. CodeTwo deployments are typically IT-led and take longer to configure, especially for server-side or on-premise setups.</p>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">Competitor pricing and capabilities reflect publicly available information as of October 2026 and may change.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a simpler solution?</h2>
          <p className="text-blue-100 mb-8">No servers. No IT tickets. Just beautiful signatures in minutes.</p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
