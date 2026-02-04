import Link from 'next/link';
import Image from 'next/image';
import { Shield, ArrowRight, Building2, Lock, Users, BarChart3, CheckCircle, Zap, Globe, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Enterprise Email Signature Management | Siggly',
  description: 'Enterprise-grade email signature management with SSO, advanced security, compliance features, and dedicated support. Scale to thousands of users.',
  keywords: ['enterprise email signatures', 'enterprise signature management', 'SSO email signatures', 'compliance email signatures', 'large organization signatures'],
  canonical: '/for/enterprise',
});

const enterpriseFeatures = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SSO/SAML, SOC 2 compliance, role-based access control, and audit logs.',
  },
  {
    icon: Users,
    title: 'Unlimited Scale',
    description: 'Deploy to 10,000+ users across multiple departments and locations.',
  },
  {
    icon: Lock,
    title: 'Advanced Compliance',
    description: 'GDPR, HIPAA, SOX compliance features with legal disclaimer management.',
  },
  {
    icon: BarChart3,
    title: 'Enterprise Analytics',
    description: 'Advanced reporting, custom dashboards, and ROI tracking.',
  },
  {
    icon: Globe,
    title: 'Multi-Region Support',
    description: 'Deploy different signatures by region, language, or business unit.',
  },
  {
    icon: Award,
    title: 'Dedicated Support',
    description: '24/7 priority support, dedicated account manager, and onboarding assistance.',
  },
];

const securityFeatures = [
  'Single Sign-On (SSO) with SAML 2.0',
  'Multi-factor authentication (MFA)',
  'Role-based access control (RBAC)',
  'Comprehensive audit logs',
  'Data encryption at rest and in transit',
  'SOC 2 Type II certified',
  'GDPR compliant',
  'Custom data retention policies',
];

const complianceFeatures = [
  {
    title: 'Legal Disclaimers',
    description: 'Automatically append required legal disclaimers by region and industry.',
  },
  {
    title: 'Brand Governance',
    description: 'Enforce brand guidelines across all departments and prevent unauthorized changes.',
  },
  {
    title: 'Approval Workflows',
    description: 'Multi-level approval process for signature changes and deployments.',
  },
  {
    title: 'Version Control',
    description: 'Track all signature changes with full version history and rollback capability.',
  },
];

const testimonials = [
  {
    quote: "Siggly helped us deploy consistent signatures to 5,000+ employees across 12 countries in just 2 weeks.",
    name: "Michael Chen",
    role: "CIO, Global Tech Corp",
    company: "Fortune 500 Technology Company",
  },
  {
    quote: "The compliance features and audit logs were critical for our financial services requirements.",
    name: "Sarah Johnson",
    role: "IT Director, Financial Services",
    company: "Leading Investment Bank",
  },
];

export default function EnterprisePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
                <Building2 className="h-4 w-4" />
                Enterprise Solution
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Enterprise Email Signature Management at Scale
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Deploy consistent, compliant email signatures to thousands of users. 
                Enterprise security, advanced compliance, and dedicated support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" className="bg-slate-800 text-white hover:bg-slate-700">
                    Contact Sales
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-slate-400 mt-4">
                SSO/SAML Support • SOC 2 Certified • 24/7 Support
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
                alt="Enterprise office building"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-1">10,000+</div>
                  <div className="text-sm text-slate-600">Users Deployed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-6">Trusted by enterprise organizations worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            <div className="text-2xl font-bold text-gray-400">ACME Corp</div>
            <div className="text-2xl font-bold text-gray-400">TechGlobal</div>
            <div className="text-2xl font-bold text-gray-400">FinanceFirst</div>
            <div className="text-2xl font-bold text-gray-400">HealthCare+</div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for Enterprise Scale</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage email signatures across your entire organization 
              with enterprise-grade security and compliance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enterpriseFeatures.map((feature) => (
              <div key={feature.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-violet-300 transition-colors">
                <div className="h-12 w-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Enterprise-Grade Security</h2>
              <p className="text-slate-300 mb-8">
                Your data security is our top priority. Siggly meets the highest 
                enterprise security standards.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {securityFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {complianceFeatures.map((feature) => (
                <div key={feature.title} className="bg-white/5 backdrop-blur rounded-xl p-6">
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Advanced Enterprise Capabilities</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-violet-50 to-white border border-violet-200 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Multi-Tenant Architecture</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span>Separate environments per business unit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span>Isolated data and permissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span>Centralized billing and reporting</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">API & Integrations</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>RESTful API for custom integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>SCIM for user provisioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Webhook notifications</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Premium Support</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>24/7 priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Custom onboarding & training</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by Enterprise Leaders</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white border border-gray-200 rounded-xl p-8">
                <p className="text-gray-600 mb-6 text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-violet-100 rounded-full flex items-center justify-center">
                    <span className="text-violet-600 font-semibold">{testimonial.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-xs text-gray-400">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Process */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Enterprise Deployment Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our proven deployment process ensures smooth rollout to your entire organization.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Discovery & Planning</h3>
              <p className="text-sm text-gray-600">
                Understand your requirements, compliance needs, and deployment strategy.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Configuration & Testing</h3>
              <p className="text-sm text-gray-600">
                Set up SSO, configure templates, and test with pilot group.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Phased Rollout</h3>
              <p className="text-sm text-gray-600">
                Deploy to departments progressively with monitoring and support.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Ongoing Support</h3>
              <p className="text-sm text-gray-600">
                24/7 support, training, and optimization with dedicated team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to deploy at enterprise scale?
          </h2>
          <p className="text-violet-100 mb-8 max-w-2xl mx-auto">
            Start your free trial or contact our enterprise team to discuss 
            your organization's unique requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-violet-700 hover:bg-gray-100">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-violet-700 text-white hover:bg-violet-800">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
