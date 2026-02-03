import Link from 'next/link';
import { Mail, ArrowRight, Check, X, Zap, DollarSign, Cloud, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Siggly vs CodeTwo - Email Signature Comparison | Siggly',
  description: 'Compare Siggly and CodeTwo for email signature management. See why teams choose Siggly for cloud-native simplicity and better pricing.',
};

const comparisonData = [
  { feature: 'Starting Price', siggly: 'Free (5 users)', codetwo: '$1.50/user/mo', winner: 'siggly' },
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
  { icon: DollarSign, title: '67% Lower Cost', description: 'Siggly starts at $0.50/user vs CodeTwo\'s $1.50/user.' },
  { icon: Zap, title: 'No IT Required', description: 'Marketing and HR teams can manage signatures without IT help.' },
  { icon: Smartphone, title: 'Mobile-First Design', description: 'Signatures that look perfect on every device, including mobile apps.' },
];

export default function CodeTwoComparisonPage() {
  return (
    <>
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
              <div className="text-4xl font-bold text-green-400 mb-2">67%</div>
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
          <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="px-6 py-4 font-semibold">Feature</div>
              <div className="px-6 py-4 font-semibold text-center text-violet-600">Siggly</div>
              <div className="px-6 py-4 font-semibold text-center text-gray-500">CodeTwo</div>
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

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a simpler solution?</h2>
          <p className="text-blue-100 mb-8">No servers. No IT tickets. Just beautiful signatures in minutes.</p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
