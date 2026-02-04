import Link from 'next/link';
import Image from 'next/image';
import { Scale, ArrowRight, Shield, CheckCircle, FileText, Users, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta } from '@/lib/seo';
import { NewsletterSignupSection } from '@/components/newsletter';

export const metadata = genMeta({
  title: 'Email Signatures for Law Firms | Legal Compliance | Siggly',
  description: 'Professional email signatures for law firms with built-in legal disclaimers, compliance features, and centralized management. Meet bar association requirements.',
  keywords: ['law firm email signatures', 'legal email disclaimers', 'attorney email signature', 'legal compliance email', 'bar association email requirements'],
  canonical: '/industries/legal',
});

const legalRequirements = [
  {
    icon: FileText,
    title: 'Mandatory Disclaimers',
    description: 'Automatically append required legal disclaimers to every email. Customize by jurisdiction and practice area.',
  },
  {
    icon: Shield,
    title: 'Confidentiality Notices',
    description: 'Include attorney-client privilege and confidentiality statements that meet bar association standards.',
  },
  {
    icon: Lock,
    title: 'Compliance Tracking',
    description: 'Audit logs showing when signatures were deployed and updated for compliance documentation.',
  },
  {
    icon: Users,
    title: 'Partner vs Associate',
    description: 'Different signature templates for partners, associates, paralegals, and support staff.',
  },
];

const commonDisclaimers = [
  {
    jurisdiction: 'General US',
    text: 'This email and any attachments are confidential and may be protected by attorney-client privilege. If you received this in error, please notify the sender and delete it.',
  },
  {
    jurisdiction: 'California Bar',
    text: 'CIRCULAR 230 DISCLOSURE: To ensure compliance with requirements imposed by the IRS, we inform you that any U.S. federal tax advice contained in this communication is not intended or written to be used...',
  },
  {
    jurisdiction: 'New York Bar',
    text: 'This communication may contain attorney advertising. Prior results do not guarantee a similar outcome.',
  },
];

const features = [
  'Centralized signature management for entire firm',
  'Built-in compliance blocks with bar numbers, state, and credentials',
  'Department-based signatures (Litigation, Corporate, IP, etc.)',
  'Automatic disclaimer updates across all attorneys',
  'Mobile-responsive for court communications',
  'Integration with legal practice management software',
  'Secure deployment with audit trails',
];

const testimonial = {
  quote: "Siggly saved us countless hours ensuring every attorney's signature met bar requirements. The automatic disclaimer management is a game-changer.",
  name: "Robert Martinez",
  role: "Managing Partner",
  firm: "Example Law Group LLP",
};

export default function LegalIndustryPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
                <Scale className="h-4 w-4" />
                For Law Firms
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Email Signatures for Law Firms That Meet Bar Requirements
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Professional email signatures with built-in legal disclaimers, compliance tracking, 
                and centralized management for your entire firm.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" className="bg-slate-800 text-white hover:bg-slate-700">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-slate-400 mt-4">
                Bar-compliant disclaimers • Audit trails • Secure deployment
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop"
                alt="Law firm office"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Legal Requirements */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for Legal Compliance</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet bar association requirements and protect your firm with compliant email signatures.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {legalRequirements.map((req) => (
              <div key={req.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <req.icon className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="font-semibold mb-2">{req.title}</h3>
                <p className="text-sm text-gray-600">{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Examples */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Common Legal Disclaimers</h2>
            <p className="text-gray-600">
              Pre-built templates for common jurisdictions. Customize for your specific requirements.
            </p>
          </div>
          <div className="space-y-6">
            {commonDisclaimers.map((disclaimer) => (
              <div key={disclaimer.jurisdiction} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2">{disclaimer.jurisdiction}</h3>
                    <p className="text-sm text-gray-600 italic">{disclaimer.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Everything Your Law Firm Needs</h2>
              <ul className="space-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/signup">
                  <Button size="lg">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold mb-4">Practice Area Templates</h3>
              <div className="space-y-3">
                {['Litigation', 'Corporate Law', 'Intellectual Property', 'Real Estate Law', 'Family Law', 'Criminal Defense'].map((area) => (
                  <div key={area} className="bg-white rounded-lg p-3 flex items-center gap-3">
                    <Scale className="h-5 w-5 text-slate-600" />
                    <span className="font-medium">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="mb-6">
              <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                <Scale className="h-8 w-8" />
              </div>
            </div>
            <blockquote className="text-2xl font-medium mb-6">
              "{testimonial.quote}"
            </blockquote>
            <div>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-slate-400">{testimonial.role}</p>
              <p className="text-sm text-slate-500">{testimonial.firm}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Common Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Firm-Wide Rollout</h3>
              <p className="text-sm text-gray-600 mb-4">
                Deploy compliant signatures to all attorneys, paralegals, and staff in minutes.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 50-500+ attorneys</li>
                <li>• Multiple offices</li>
                <li>• Centralized control</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Disclaimer Updates</h3>
              <p className="text-sm text-gray-600 mb-4">
                Update legal disclaimers across the entire firm instantly when regulations change.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Instant deployment</li>
                <li>• Version control</li>
                <li>• Audit trail</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">New Hire Onboarding</h3>
              <p className="text-sm text-gray-600 mb-4">
                New attorneys get compliant signatures automatically on day one.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Auto-sync from HR system</li>
                <li>• Role-based templates</li>
                <li>• No IT required</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6">
          <NewsletterSignupSection
            source="legal-industry"
            title="Legal Tech Insights"
            description="Get tips on email compliance, legal tech, and firm management delivered to your inbox."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to ensure compliance across your firm?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join law firms using Siggly to manage compliant email signatures. 
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </section>
    </>
  );
}
