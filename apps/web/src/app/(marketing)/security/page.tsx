import Link from 'next/link';
import { Shield, Lock, Eye, FileCheck, Server, CheckCircle, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Security & Compliance - Siggly',
  description: 'Learn how Siggly protects your data with enterprise-grade security, encryption, and compliance standards.',
  keywords: ['security', 'data protection', 'compliance', 'encryption', 'GDPR', 'SOC 2'],
  canonical: '/security',
});

const securityFeatures = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256) to ensure maximum security.',
  },
  {
    icon: Shield,
    title: 'Secure Infrastructure',
    description: 'Hosted on enterprise-grade cloud infrastructure with 99.9% uptime SLA and automatic backups.',
  },
  {
    icon: Eye,
    title: 'Privacy by Design',
    description: 'We collect only essential data and never sell your information to third parties.',
  },
  {
    icon: FileCheck,
    title: 'GDPR Compliant',
    description: 'Full compliance with GDPR, CCPA, and other data protection regulations.',
  },
  {
    icon: Server,
    title: 'Regular Security Audits',
    description: 'Continuous monitoring, vulnerability scanning, and third-party security assessments.',
  },
  {
    icon: CheckCircle,
    title: 'Access Controls',
    description: 'Role-based permissions, SSO support, and audit logs for enterprise customers.',
  },
];

const complianceStandards = [
  { name: 'GDPR', description: 'EU General Data Protection Regulation', status: 'achieved' as const },
  { name: 'CCPA', description: 'California Consumer Privacy Act', status: 'achieved' as const },
  { name: 'SOC 2 Type II', description: 'In progress - Expected Q2 2026', status: 'in-progress' as const },
  { name: 'ISO 27001', description: 'Roadmap - 2026', status: 'roadmap' as const },
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-6">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Security & Compliance</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your data security is our top priority. Learn how we protect your information with enterprise-grade security measures.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How We Keep Your Data Safe</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature) => (
              <div key={feature.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Data Protection Practices</h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Data Storage & Location</h3>
              <p className="text-gray-600 mb-2">
                All customer data is stored in secure, SOC 2 compliant data centers. We use Supabase (built on PostgreSQL) 
                with automatic backups and point-in-time recovery.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Access Control</h3>
              <p className="text-gray-600 mb-2">
                We implement strict access controls with role-based permissions. Only authorized personnel have access to 
                production systems, and all access is logged and monitored.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Encryption</h3>
              <p className="text-gray-600 mb-2">
                Data in transit is protected with TLS 1.3 encryption. Data at rest is encrypted using AES-256. 
                OAuth tokens are encrypted and stored securely.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Third-Party Integrations</h3>
              <p className="text-gray-600 mb-2">
                We use OAuth 2.0 for Google Workspace and Microsoft 365 integrations. We never store your email passwords. 
                All API connections use secure, encrypted channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Compliance & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {complianceStandards.map((standard) => (
              <div key={standard.name} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  {standard.status === 'achieved' && (
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  )}
                  {standard.status === 'in-progress' && (
                    <Clock className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  )}
                  {standard.status === 'roadmap' && (
                    <Calendar className="h-6 w-6 text-gray-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="font-semibold mb-1">
                      {standard.name}
                      {standard.status === 'in-progress' && (
                        <span className="ml-2 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">In Progress</span>
                      )}
                      {standard.status === 'roadmap' && (
                        <span className="ml-2 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Planned</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600">{standard.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Security Incident Response</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <p className="text-gray-600 mb-4">
              We have a comprehensive incident response plan in place. In the unlikely event of a security incident:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>We will notify affected customers within 72 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Our security team will investigate and contain the incident immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>We will provide transparent communication throughout the resolution process</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Post-incident reports will be shared with affected parties</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Report Vulnerability */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Report a Security Vulnerability</h2>
            <p className="text-gray-600 mb-6">
              If you discover a security vulnerability, please report it to us responsibly. 
              We appreciate your help in keeping Siggly secure.
            </p>
            <Link href="/contact">
              <Button size="lg">
                Report Vulnerability
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Email: security@siggly.io
            </p>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Have Security Questions?</h2>
          <p className="text-gray-600 mb-8">
            Our team is here to answer any questions about our security practices.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Contact Security Team
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
