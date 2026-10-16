import Link from 'next/link';
import { ArrowRight, Check, X, Zap, DollarSign, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta, generateComparisonSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = genMeta({
  title: 'Siggly vs WiseStamp - Email Signature Comparison',
  description: 'Compare Siggly and WiseStamp for email signature management. See features, pricing, and why teams choose Siggly for centralized management.',
  keywords: ['WiseStamp alternative', 'WiseStamp vs Siggly', 'email signature comparison', 'WiseStamp pricing', 'team signature management'],
  canonical: '/compare/wisestamp',
});

const comparisonData = [
  { feature: 'Starting Price', siggly: 'Free (5 users)', wisestamp: '$6/user/mo', winner: 'siggly' },
  { feature: 'Team Management', siggly: true, wisestamp: false, winner: 'siggly' },
  { feature: 'Centralized Control', siggly: true, wisestamp: false, winner: 'siggly' },
  { feature: 'Google Workspace Deploy', siggly: true, wisestamp: false, winner: 'siggly' },
  { feature: 'Microsoft 365 Deploy', siggly: true, wisestamp: false, winner: 'siggly' },
  { feature: 'Visual Editor', siggly: true, wisestamp: true, winner: 'tie' },
  { feature: 'Social Media Links', siggly: true, wisestamp: true, winner: 'tie' },
  { feature: 'Campaign Banners', siggly: true, wisestamp: true, winner: 'tie' },
  { feature: 'Free Plan', siggly: true, wisestamp: 'Limited', winner: 'siggly' },
  { feature: 'Bulk Deployment', siggly: true, wisestamp: false, winner: 'siggly' },
  { feature: 'Department Rules', siggly: true, wisestamp: false, winner: 'siggly' },
  { feature: 'Analytics Dashboard', siggly: true, wisestamp: 'Basic', winner: 'siggly' },
];

const switchReasons = [
  { icon: Users, title: 'Built for teams', description: 'WiseStamp is designed for individuals. Siggly is purpose-built for team management.' },
  { icon: Zap, title: 'Centralized deployment', description: 'Deploy to entire organization in 60 seconds. No browser extensions needed.' },
  { icon: DollarSign, title: 'Better team pricing', description: 'Save 75% with Siggly at $1.50/user vs WiseStamp\'s $6/user.' },
  { icon: Sparkles, title: 'IT admin controls', description: 'Department rules, scheduled updates, and compliance features WiseStamp lacks.' },
];

const comparisonFeatures = comparisonData.map(item => ({
  name: item.feature,
  siggly: item.siggly,
  competitor: item.wisestamp,
}));

export default function WiseStampComparisonPage() {
  return (
    <>
      <JsonLd data={generateComparisonSchema({ competitor: 'WiseStamp', features: comparisonFeatures })} />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Siggly vs WiseStamp</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Looking for a WiseStamp alternative for teams? Siggly offers centralized management, 
            bulk deployment, and team features WiseStamp doesn't have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Try Siggly Free <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">View Pricing</Button>
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
              <div className="text-gray-400">Lower cost for teams</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">60 sec</div>
              <div className="text-gray-400">Deploy to entire team</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-gray-400">Centralized control</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Difference */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border-2 border-amber-400 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">The Key Difference</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-violet-600 mb-3">Siggly (Team-First)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>IT admin deploys to entire organization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Employees don't need to do anything</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Centralized updates and brand control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Department-specific signatures</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500 mb-3">WiseStamp (Individual-First)</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Each employee installs browser extension</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Manual setup for every team member</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>No centralized management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Employees can modify signatures</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Feature Comparison</h2>
          <div className="overflow-x-auto -mx-6 px-6">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden min-w-[480px]">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="px-3 sm:px-6 py-4 font-semibold">Feature</div>
              <div className="px-3 sm:px-6 py-4 font-semibold text-center text-violet-600">Siggly</div>
              <div className="px-3 sm:px-6 py-4 font-semibold text-center text-gray-500">WiseStamp</div>
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
                  {typeof row.wisestamp === 'boolean' ? (
                    row.wisestamp ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />
                  ) : (
                    <span className="text-sm text-gray-500">{row.wisestamp}</span>
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
          <h2 className="text-3xl font-bold text-center mb-12">Why teams choose Siggly over WiseStamp</h2>
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
              <div className="text-4xl font-bold mb-4">$1.50<span className="text-lg font-normal text-gray-500">/user/mo</span></div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Free plan for up to 5 users</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Everything unlocked — no base fee</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Centralized deployment</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> No per-user setup needed</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <div className="text-gray-500 font-semibold mb-2">WiseStamp</div>
              <div className="text-4xl font-bold mb-4">$6.00<span className="text-lg font-normal text-gray-500">/user/mo</span></div>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-center gap-2"><X className="h-4 w-4 text-gray-300" /> Limited free plan (1 user)</li>
                <li className="flex items-center gap-2"><X className="h-4 w-4 text-gray-300" /> No team management</li>
                <li className="flex items-center gap-2"><X className="h-4 w-4 text-gray-300" /> Manual setup per employee</li>
                <li className="flex items-center gap-2"><X className="h-4 w-4 text-gray-300" /> Browser extension required</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            For a 50-person team: Siggly = $75/mo vs WiseStamp = $300/mo. Save $2,700/year.
          </p>
          <p className="text-center text-xs text-gray-400 mt-3">
            Pricing reflects publicly listed rates as of October 2026 and may change — check each vendor&apos;s site for current pricing.
          </p>
        </div>
      </section>

      {/* Detailed breakdown */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Siggly vs WiseStamp: the detailed breakdown</h2>

          <h3 className="text-xl font-semibold mb-2">Individual signatures vs team deployment</h3>
          <p className="text-gray-600 mb-6">
            WiseStamp is excellent at what it was built for: beautiful individual signatures that one
            person sets up for themselves. It&apos;s a popular choice for freelancers, solopreneurs, and
            individuals who want a polished signature quickly. Siggly is built for the other problem —
            deploying and centrally managing consistent signatures across a whole team or company, with
            admin control, department rules, and bulk rollout.
          </p>

          <h3 className="text-xl font-semibold mb-2">Centralized deployment</h3>
          <p className="text-gray-600 mb-6">
            The biggest practical difference for organizations: Siggly pushes signatures directly to
            your team&apos;s Google Workspace or Microsoft 365 accounts, so you&apos;re not relying on
            each employee to copy-paste their own. WiseStamp is primarily a per-user generator, so
            at team scale you typically end up managing signatures one person at a time.
          </p>

          <h3 className="text-xl font-semibold mb-2">Pricing at team scale</h3>
          <p className="text-gray-600 mb-6">
            WiseStamp&apos;s publicly listed team pricing is around $6/user/month (as of October 2026),
            versus Siggly at $1.50/user/month with a free tier. For a 50-person team that&apos;s roughly
            $75/month with Siggly versus about $300/month with WiseStamp — the gap widens as you grow.
          </p>
        </div>
      </section>

      {/* Who should choose WiseStamp — honest balance */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Who should choose WiseStamp?</h2>
            <p className="text-gray-600">
              WiseStamp is a great pick if you&apos;re an individual, freelancer, or very small team who
              mainly needs a polished personal signature and doesn&apos;t need centralized deployment or
              admin control. Its editor is well-regarded for quick, good-looking individual signatures.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-3">When Siggly is the better fit</h2>
            <p className="text-gray-600">
              Choose Siggly if you need to roll signatures out to a whole team, enforce brand
              consistency, apply department-specific rules, deploy directly to Google Workspace or
              Microsoft 365, or manage everything from one admin dashboard — typically at a lower
              per-user cost than WiseStamp&apos;s team plans.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Siggly vs WiseStamp — common questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-1">Is Siggly a good WiseStamp alternative?</h3>
              <p className="text-sm text-gray-600">For teams and companies, yes — Siggly adds centralized deployment, admin control, and department rules that WiseStamp isn&apos;t really built for. For a single individual who just wants a personal signature, WiseStamp is still a fine choice.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Can Siggly deploy signatures to my whole team automatically?</h3>
              <p className="text-sm text-gray-600">Yes. Siggly connects to Google Workspace or Microsoft 365 and pushes signatures to every user, so you don&apos;t have to rely on employees setting up their own — which is the main limitation of a per-user tool.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Is Siggly cheaper than WiseStamp?</h3>
              <p className="text-sm text-gray-600">For teams, usually — Siggly is $1.50/user/month with a free tier, versus WiseStamp&apos;s publicly listed team pricing around $6/user/month (as of October 2026). The savings grow with team size.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Does Siggly have a visual editor like WiseStamp?</h3>
              <p className="text-sm text-gray-600">Yes — Siggly includes a visual signature editor with templates, social links, and campaign banners, plus the team-management and deployment features on top.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to switch from WiseStamp?</h2>
          <p className="text-violet-100 mb-8">Start free today. Deploy to your entire team in minutes, not hours.</p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-violet-700 hover:bg-gray-100">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

    </>
  );
}
