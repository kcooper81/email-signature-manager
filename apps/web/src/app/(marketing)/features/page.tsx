import Link from 'next/link';
import { Mail, ArrowRight, Check, Users, Palette, Rocket, Shield, BarChart3, Zap, Globe, Clock, Building2, RefreshCw, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Features | Siggly - Email Signature Management',
  description: 'Explore all features of Siggly email signature management: visual editor, team management, one-click deployment, analytics, and more.',
};

const features = [
  {
    icon: Palette,
    title: 'Visual Signature Editor',
    description: 'Design beautiful email signatures with our intuitive drag-and-drop editor. No coding required.',
    benefits: ['Drag-and-drop blocks', 'Real-time preview', 'Custom branding', 'Mobile-responsive'],
    color: 'violet',
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Sync users from Google Workspace automatically. Organize by department and manage at scale.',
    benefits: ['Auto-sync from directory', 'Department grouping', 'Bulk operations', 'Role-based access'],
    color: 'blue',
  },
  {
    icon: Rocket,
    title: 'One-Click Deployment',
    description: 'Deploy signatures to your entire team instantly. No more manual copying and pasting.',
    benefits: ['Deploy to all or select users', 'Instant updates', 'Deployment history', 'Rollback support'],
    color: 'cyan',
  },
  {
    icon: RefreshCw,
    title: 'Dynamic Fields',
    description: 'Use placeholders that automatically populate with each user\'s information.',
    benefits: ['Name, title, department', 'Contact information', 'Custom fields', 'Conditional content'],
    color: 'green',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Track deployment success rates and monitor signature performance across your organization.',
    benefits: ['Deployment metrics', 'Success/failure tracking', 'Usage reports', 'Export data'],
    color: 'amber',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Your data is protected with industry-leading security practices and compliance.',
    benefits: ['OAuth 2.0 authentication', 'Encrypted data', 'Audit logs', 'GDPR compliant'],
    color: 'red',
  },
];

const integrations = [
  { name: 'Google Workspace', description: 'Gmail signature deployment', available: true },
  { name: 'Microsoft 365', description: 'Outlook signature deployment', available: false },
  { name: 'Slack', description: 'Deployment notifications', available: false },
  { name: 'Zapier', description: 'Workflow automation', available: false },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Everything you need to manage
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              email signatures at scale
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Powerful features designed for teams of all sizes. From startups to enterprises.
          </p>
          <Link href="/signup">
            <Button size="lg">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Integrations</h2>
            <p className="text-gray-600">Connect with the tools you already use</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((integration) => (
              <div key={integration.name} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="font-semibold mb-1">{integration.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{integration.description}</p>
                {integration.available ? (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Available</span>
                ) : (
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Coming Soon</span>
                )}
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
            Start your free trial today. No credit card required.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Start Free Trial</Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">Watch Demo</Button>
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
