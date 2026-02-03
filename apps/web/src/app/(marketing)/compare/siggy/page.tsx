import Link from 'next/link';
import { Mail, ArrowRight, Check, X, Zap, DollarSign, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Siggly vs Siggy.io - Email Signature Comparison | Siggly',
  description: 'Compare Siggly and Siggy.io for email signature management. See features, pricing, and why Siggly offers more value.',
};

const comparisonData = [
  { feature: 'Starting Price', siggly: 'Free (5 users)', siggyio: '$4/user/mo', winner: 'siggly' },
  { feature: 'Free Plan', siggly: true, siggyio: false, winner: 'siggly' },
  { feature: 'Google Workspace', siggly: true, siggyio: true, winner: 'tie' },
  { feature: 'Microsoft 365', siggly: true, siggyio: true, winner: 'tie' },
  { feature: 'Visual Editor', siggly: true, siggyio: true, winner: 'tie' },
  { feature: 'Click Tracking', siggly: true, siggyio: true, winner: 'tie' },
  { feature: 'Campaign Banners', siggly: true, siggyio: true, winner: 'tie' },
  { feature: 'Department Templates', siggly: true, siggyio: true, winner: 'tie' },
  { feature: 'Analytics Dashboard', siggly: true, siggyio: true, winner: 'tie' },
  { feature: 'Per-User Pricing', siggly: '$0.50/user', siggyio: '$4/user', winner: 'siggly' },
  { feature: 'Unlimited Templates', siggly: 'Professional+', siggyio: 'Enterprise only', winner: 'siggly' },
  { feature: 'API Access', siggly: 'Professional+', siggyio: 'Enterprise only', winner: 'siggly' },
];

const switchReasons = [
  { icon: DollarSign, title: '87% Lower Cost', description: 'Siggly starts at $0.50/user vs Siggy.io\'s $4/user. Same features, fraction of the price.' },
  { icon: Users, title: 'Free for Small Teams', description: 'Up to 5 users free forever. Siggy.io has no free tier.' },
  { icon: Zap, title: 'Faster Setup', description: 'Connect and deploy in under 5 minutes with our streamlined onboarding.' },
  { icon: BarChart3, title: 'Better Analytics', description: 'Detailed engagement metrics and ROI tracking included in lower tiers.' },
];

const pricingComparison = [
  { teamSize: '10 users', siggly: '$5/mo', siggyio: '$40/mo', savings: '$420/year' },
  { teamSize: '50 users', siggly: '$25/mo', siggyio: '$200/mo', savings: '$2,100/year' },
  { teamSize: '100 users', siggly: '$50/mo', siggyio: '$400/mo', savings: '$4,200/year' },
  { teamSize: '500 users', siggly: '$250/mo', siggyio: '$2,000/mo', savings: '$21,000/year' },
];

export default function SiggyComparisonPage() {
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
            <Link href="/login"><Button variant="ghost">Sign in</Button></Link>
            <Link href="/signup"><Button>Get Started Free</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Siggly vs Siggy.io</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Looking for a Siggy.io alternative? Siggly offers the same powerful features 
            at up to 87% lower cost, plus a free tier for small teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Try Siggly Free <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">See Demo</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">87%</div>
              <div className="text-gray-400">Lower cost than Siggy.io</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">Free</div>
              <div className="text-gray-400">Plan for up to 5 users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">$21K</div>
              <div className="text-gray-400">Annual savings (500 users)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="px-6 py-4 font-semibold">Feature</div>
              <div className="px-6 py-4 font-semibold text-center text-violet-600">Siggly</div>
              <div className="px-6 py-4 font-semibold text-center text-gray-500">Siggy.io</div>
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
                  {typeof row.siggyio === 'boolean' ? (
                    row.siggyio ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />
                  ) : (
                    <span className="text-sm text-gray-500">{row.siggyio}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">See How Much You'll Save</h2>
          <p className="text-gray-600 text-center mb-12">Same features. Dramatically lower price.</p>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Team Size</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-violet-600">Siggly</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">Siggy.io</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-600">You Save</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pricingComparison.map((row) => (
                  <tr key={row.teamSize}>
                    <td className="px-6 py-4 text-sm font-medium">{row.teamSize}</td>
                    <td className="px-6 py-4 text-sm text-violet-600 font-semibold">{row.siggly}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 line-through">{row.siggyio}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                        {row.savings}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Switch */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why teams choose Siggly over Siggy.io</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {switchReasons.map((reason) => (
              <div key={reason.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <reason.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to save thousands?</h2>
          <p className="text-emerald-100 mb-8">Switch from Siggy.io and keep more money in your budget.</p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Siggly. All rights reserved.</p>
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
