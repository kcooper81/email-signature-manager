import Link from 'next/link';
import { Users, Check, ArrowRight, RefreshCw, Zap, Database, Shield, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'HubSpot CRM Integration | Siggly',
  description: 'Sync contact data from HubSpot CRM to enrich your email signatures. Automatically populate signature fields with up-to-date contact information.',
  keywords: ['HubSpot integration', 'HubSpot CRM signatures', 'CRM email signatures', 'contact data sync', 'HubSpot contact sync'],
  canonical: '/integrations/hubspot',
});

const features = [
  {
    icon: RefreshCw,
    title: 'Contact Sync',
    description: 'Automatically sync contact data from HubSpot to populate user information.',
  },
  {
    icon: Database,
    title: 'Standard Fields',
    description: 'Sync name, email, job title, phone, and department from HubSpot contacts.',
  },
  {
    icon: Zap,
    title: 'Automatic Import',
    description: 'Import all HubSpot contacts with one click to populate your team directory.',
  },
  {
    icon: Shield,
    title: 'Secure OAuth',
    description: 'OAuth 2.0 authentication with HubSpot. Your credentials stay secure.',
  },
];

const howItWorks = [
  {
    step: '1',
    title: 'Connect HubSpot',
    description: 'Authenticate with your HubSpot account using secure OAuth 2.0.',
  },
  {
    step: '2',
    title: 'Import Contacts',
    description: 'Sync all HubSpot contacts to automatically populate your team directory.',
  },
  {
    step: '3',
    title: 'Create Signatures',
    description: 'Design signature templates with the visual editor using synced contact data.',
  },
  {
    step: '4',
    title: 'Deploy',
    description: 'Deploy signatures with accurate contact information from HubSpot.',
  },
];

const useCases = [
  {
    title: 'Sales Teams',
    description: 'Keep team signatures up-to-date with contact information synced from HubSpot.',
    icon: Users,
  },
  {
    title: 'Account Managers',
    description: 'Ensure accurate contact details in signatures without manual data entry.',
    icon: Building2,
  },
  {
    title: 'Marketing Teams',
    description: 'Maintain consistent team information across HubSpot and email signatures.',
    icon: Zap,
  },
];

export default function HubSpotIntegrationPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm mb-6">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.07A2.199 2.199 0 0017.232.837h-.068a2.199 2.199 0 00-2.199 2.199v.07a2.196 2.196 0 001.267 1.977v2.847a4.301 4.301 0 00-2.066.7L9.77 4.233a2.25 2.25 0 10-1.342 1.342l4.396 4.396a4.3 4.3 0 00-.7 2.066H9.278a2.196 2.196 0 00-1.978-1.267h-.07a2.199 2.199 0 00-2.199 2.199v.068a2.199 2.199 0 002.199 2.199h.07a2.196 2.196 0 001.977-1.267h2.847a4.301 4.301 0 107.04-4.04z"/>
                </svg>
                HubSpot CRM Integration
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Enrich Email Signatures with
                <span className="text-orange-600"> HubSpot Data</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Import contact data from HubSpot CRM to automatically populate your team directory. 
                Keep your team's signatures accurate with synced contact information.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline">View Pricing</Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Secure OAuth connection • One-click import • Standard field sync
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Contact Synced</div>
                    <div className="text-xs text-gray-500">John Smith • Sales Manager</div>
                  </div>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Database className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Standard Fields</div>
                    <div className="text-xs text-gray-500">Name, Title, Phone, Department</div>
                  </div>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">One-Click Import</div>
                    <div className="text-xs text-gray-500">Import all contacts instantly</div>
                  </div>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful HubSpot Integration Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600">
              Connect HubSpot to Siggly in minutes and start syncing contact data
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {howItWorks.map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perfect For</h2>
            <p className="text-gray-600">
              HubSpot integration works great for teams that rely on CRM data
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <useCase.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                <p className="text-gray-600 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Connect HubSpot?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Start importing HubSpot contacts to populate your team directory
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-orange-700">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
