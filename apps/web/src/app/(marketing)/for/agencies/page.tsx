import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowRight, Building2, Users, Layers, Globe, CheckCircle, Palette, Shield, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Management for Agencies | Siggly',
  description: 'Manage email signatures for multiple clients from one dashboard. White-label options, bulk management, and multi-tenant support for agencies.',
};

const painPoints = [
  {
    icon: Building2,
    title: 'Multiple clients, multiple headaches',
    description: 'Juggling signature updates across dozens of client accounts is a nightmare.',
  },
  {
    icon: Layers,
    title: 'No multi-tenant solution',
    description: 'Most tools force you to create separate accounts for each client.',
  },
  {
    icon: Palette,
    title: 'Brand consistency at scale',
    description: 'Ensuring each client\'s signatures match their brand guidelines is tedious.',
  },
  {
    icon: Globe,
    title: 'White-label limitations',
    description: 'You want to offer this as your service, not promote someone else\'s brand.',
  },
];

const features = [
  {
    icon: Building2,
    title: 'Multi-Client Dashboard',
    description: 'Manage all your clients from one login. Switch between accounts instantly.',
  },
  {
    icon: Palette,
    title: 'White-Label Ready',
    description: 'Remove Siggly branding completely. Present it as your own service.',
  },
  {
    icon: Users,
    title: 'Bulk User Management',
    description: 'Import and manage hundreds of users across multiple organizations.',
  },
  {
    icon: Shield,
    title: 'Client Isolation',
    description: 'Each client\'s data is completely separate and secure.',
  },
  {
    icon: BarChart3,
    title: 'Agency Reporting',
    description: 'Generate reports across all clients. Show the value you deliver.',
  },
  {
    icon: Globe,
    title: 'Reseller Pricing',
    description: 'Special agency pricing lets you mark up and profit from each client.',
  },
];

const useCases = [
  { title: 'Marketing Agencies', description: 'Manage client brand consistency across email' },
  { title: 'IT MSPs', description: 'Add signature management to your service offering' },
  { title: 'HR Consultants', description: 'Onboard new hires with professional signatures' },
  { title: 'Brand Agencies', description: 'Ensure brand guidelines extend to email' },
];

export default function AgenciesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/30 text-indigo-200 px-4 py-2 rounded-full text-sm mb-6">
                <Building2 className="h-4 w-4" />
                Built for Agencies
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Manage Client Signatures at Scale
              </h1>
              <p className="text-xl text-indigo-200 mb-8">
                One dashboard for all your clients. White-label options, bulk management, 
                and agency-friendly pricing that lets you profit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-indigo-400 text-white hover:bg-indigo-700">
                    Talk to Sales
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                alt="Agency team managing multiple clients"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Managing multiple clients is hard</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Most signature tools weren't built for agencies. Siggly was.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {painPoints.map((point) => (
              <div key={point.title} className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <point.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold mb-2">{point.title}</h3>
                <p className="text-sm text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Agency-first features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to offer signature management as a service.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Perfect for</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <h3 className="font-semibold mb-2">{useCase.title}</h3>
                <p className="text-sm text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Agency Partner Program</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Get wholesale pricing, white-label options, and dedicated support. 
            Mark up our service and add a new revenue stream.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">20%</div>
              <div className="text-indigo-200">Partner Discount</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">Unlimited</div>
              <div className="text-indigo-200">Client Accounts</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">Priority</div>
              <div className="text-indigo-200">Support Access</div>
            </div>
          </div>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100">
              Apply for Partner Program <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to scale your agency?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join agencies worldwide who use Siggly to manage client signatures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
