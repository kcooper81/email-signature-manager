import Link from 'next/link';
import { ArrowRight, Paintbrush, Layout, Calculator, ShieldCheck, Shield, Eye, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tools = [
  {
    href: '/tools/signature-generator',
    icon: Paintbrush,
    name: 'Email Signature Generator',
    description: 'Create a professional email signature in seconds. Enter your details and generate ready-to-use HTML for Gmail, Outlook, and more.',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    href: '/tools/signature-templates',
    icon: Layout,
    name: 'Signature Templates',
    description: 'Browse our collection of professionally designed email signature templates. Find the perfect style for your brand.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    href: '/tools/roi-calculator',
    icon: Calculator,
    name: 'ROI Calculator',
    description: 'Calculate the marketing ROI of your team\'s email signatures. See how many impressions, clicks, and conversions you\'re leaving on the table.',
    color: 'bg-green-100 text-green-600',
  },
  {
    href: '/tools/signature-audit',
    icon: ShieldCheck,
    name: 'Signature Audit & Grader',
    description: 'Paste your signature HTML and get an instant grade with actionable recommendations for structure, compatibility, and performance.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    href: '/tools/disclaimer-generator',
    icon: Shield,
    name: 'Disclaimer Generator',
    description: 'Generate professional email disclaimers for HIPAA, GDPR, legal, financial, and general business use. Copy-ready text or HTML.',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    href: '/tools/email-preview',
    icon: Eye,
    name: 'Email Preview Tool',
    description: 'See how your email signature renders across Gmail, Outlook, Apple Mail, and more. Test desktop, tablet, and mobile views.',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    href: '/tools/html-signature-converter',
    icon: Code,
    name: 'HTML Signature Converter',
    description: 'Convert your email signature HTML for maximum compatibility. Inline CSS, clean up code, and optimize for all email clients.',
    color: 'bg-rose-100 text-rose-600',
  },
];

export default function ToolsIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Free Email Signature Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Everything you need to create, test, audit, and optimize email signatures.
            All free, no signup required.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-violet-200 transition-all"
              >
                <div className={`inline-flex p-3 rounded-lg ${tool.color} mb-4`}>
                  <tool.icon className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-semibold mb-2 group-hover:text-violet-600 transition-colors">
                  {tool.name}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {tool.description}
                </p>
                <span className="text-sm font-medium text-violet-600 flex items-center gap-1">
                  Try it free <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need signatures for your entire team?
          </h2>
          <p className="text-violet-100 mb-8 max-w-2xl mx-auto">
            Siggly centralizes email signature management for teams of any size.
            Deploy consistent, on-brand signatures to everyone in your Google Workspace
            or Microsoft 365 organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-violet-700 hover:bg-gray-100">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" className="bg-violet-700 text-white hover:bg-violet-800">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
