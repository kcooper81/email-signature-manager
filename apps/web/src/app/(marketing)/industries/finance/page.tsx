import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, ArrowRight, Shield, CheckCircle, Lock, FileCheck, AlertCircle, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta } from '@/lib/seo';
import { NewsletterSignupSection } from '@/components/newsletter';

export const metadata = genMeta({
  title: 'Email Signatures for Financial Services | Compliance & Security | Siggly',
  description: 'Compliant email signatures for banks, investment firms, and financial advisors. Meet SEC, FINRA, and SOX requirements with built-in disclaimers and audit trails.',
  keywords: ['financial services email signatures', 'SEC compliant email', 'FINRA email requirements', 'bank email signatures', 'investment advisor email compliance'],
  canonical: '/industries/finance',
});

const complianceFeatures = [
  {
    icon: Shield,
    title: 'SEC & FINRA Compliant',
    description: 'Built-in disclaimers and disclosures that meet SEC Rule 17a-4 and FINRA requirements.',
  },
  {
    icon: Lock,
    title: 'SOX Compliance',
    description: 'Audit trails and access controls for Sarbanes-Oxley compliance documentation.',
  },
  {
    icon: FileCheck,
    title: 'Record Retention',
    description: 'Complete signature deployment history for regulatory audits and examinations.',
  },
  {
    icon: AlertCircle,
    title: 'Risk Disclaimers',
    description: 'Automatic investment risk disclaimers and regulatory notices on every email.',
  },
];

const regulatoryDisclaimers = [
  {
    regulation: 'SEC Investment Advisor',
    text: 'This email is for informational purposes only and does not constitute investment advice. Past performance is not indicative of future results. Please consult with a qualified financial advisor before making investment decisions.',
  },
  {
    regulation: 'FINRA Broker-Dealer',
    text: 'Securities offered through [Firm Name], Member FINRA/SIPC. This communication is not an offer to sell or a solicitation to buy any security.',
  },
  {
    regulation: 'Banking Regulation',
    text: 'This email and any attachments are confidential and may contain privileged information. Unauthorized disclosure or use is prohibited. Member FDIC. Equal Housing Lender.',
  },
];

const financialRoles = [
  { role: 'Financial Advisors', info: 'CFP®, CFA credentials, licenses' },
  { role: 'Investment Bankers', info: 'Series 7, 63, 79 licenses' },
  { role: 'Wealth Managers', info: 'AUM disclosures, certifications' },
  { role: 'Compliance Officers', info: 'Regulatory contact information' },
  { role: 'Bank Officers', info: 'NMLS numbers, lending licenses' },
  { role: 'Insurance Agents', info: 'State licenses, carrier info' },
];

const complianceChecklist = [
  'Built-in compliance blocks with CRD numbers and licenses',
  'SEC Rule 17a-4 compliant record keeping',
  'FINRA advertising rule compliance',
  'Sarbanes-Oxley audit trail requirements',
  'Gramm-Leach-Bliley Act privacy notices',
  'State securities law disclosures',
  'Professional designation usage rules',
  'Encrypted credential storage',
  'Multi-level approval workflows',
];

export default function FinanceIndustryPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-emerald-900 to-emerald-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
                <TrendingUp className="h-4 w-4" />
                For Financial Services
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Compliant Email Signatures for Financial Services
              </h1>
              <p className="text-xl text-emerald-100 mb-8">
                Meet SEC, FINRA, and SOX requirements with email signatures built for financial compliance. 
                Automatic disclaimers, audit trails, and secure deployment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" className="bg-emerald-800 text-white hover:bg-emerald-700">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-emerald-200 mt-4">
                SEC/FINRA Compliant • SOX Audit Trails • Secure Deployment
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
                alt="Financial services office"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for Financial Compliance</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet regulatory requirements with email signatures designed for the financial industry.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {complianceFeatures.map((feature) => (
              <div key={feature.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Disclaimers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Regulatory Disclaimers</h2>
            <p className="text-gray-600">
              Pre-built templates for common financial regulations. Customize for your firm.
            </p>
          </div>
          <div className="space-y-6">
            {regulatoryDisclaimers.map((disclaimer) => (
              <div key={disclaimer.regulation} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2">{disclaimer.regulation}</h3>
                    <p className="text-sm text-gray-600 italic">{disclaimer.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Checklist */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Financial Compliance Checklist</h2>
            <p className="text-gray-600">
              Siggly meets key regulatory requirements for financial services firms.
            </p>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
            <div className="grid md:grid-cols-2 gap-4">
              {complianceChecklist.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Financial Roles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Signatures for Every Financial Role</h2>
            <p className="text-gray-600">
              Role-specific templates with appropriate credentials and disclosures.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financialRoles.map((item) => (
              <div key={item.role} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.role}</h3>
                    <p className="text-sm text-gray-600">{item.info}</p>
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
          <h2 className="text-3xl font-bold text-center mb-12">Financial Services Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Investment Firms</h3>
              <p className="text-sm text-gray-600 mb-4">
                Compliant signatures for advisors, analysts, and portfolio managers.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• SEC/FINRA compliance</li>
                <li>• Risk disclaimers</li>
                <li>• Credential management</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Banks & Credit Unions</h3>
              <p className="text-sm text-gray-600 mb-4">
                Professional signatures for lending, retail, and commercial banking.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• FDIC/NCUA notices</li>
                <li>• NMLS numbers</li>
                <li>• Equal Housing Lender</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Insurance Agencies</h3>
              <p className="text-sm text-gray-600 mb-4">
                Compliant signatures with state licenses and carrier information.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• State license numbers</li>
                <li>• Carrier affiliations</li>
                <li>• Disclosure requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6">
          <NewsletterSignupSection
            source="finance-industry"
            title="Financial Services Insights"
            description="Get tips on regulatory compliance, fintech, and financial services management."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready for compliant email signatures?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join financial services firms using Siggly to manage compliant email signatures. 
            Get started with our free plan today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-emerald-800 text-white hover:bg-emerald-700">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
