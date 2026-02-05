import Link from 'next/link';
import Image from 'next/image';
import { Heart, ArrowRight, Shield, CheckCircle, Lock, Users, FileCheck, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta } from '@/lib/seo';
import { NewsletterSignupSection } from '@/components/newsletter';

export const metadata = genMeta({
  title: 'HIPAA-Compliant Email Signatures for Healthcare | Siggly',
  description: 'Secure email signatures for healthcare organizations. HIPAA-compliant, encrypted deployment, audit logs, and patient confidentiality notices built-in.',
  keywords: ['HIPAA email signatures', 'healthcare email compliance', 'medical practice email signatures', 'hospital email signatures', 'patient confidentiality email'],
  canonical: '/industries/healthcare',
});

const hipaaFeatures = [
  {
    icon: Shield,
    title: 'HIPAA Compliance',
    description: 'Built-in safeguards to meet HIPAA technical and administrative requirements for email communications.',
  },
  {
    icon: Lock,
    title: 'Encrypted Deployment',
    description: 'Secure, encrypted signature deployment with access controls and authentication.',
  },
  {
    icon: FileCheck,
    title: 'Audit Trails',
    description: 'Complete audit logs for compliance documentation and regulatory reviews.',
  },
  {
    icon: AlertTriangle,
    title: 'Confidentiality Notices',
    description: 'Automatic patient confidentiality and privacy notices on every email.',
  },
];

const complianceChecklist = [
  'Built-in compliance blocks with NPI numbers and licenses',
  'Encrypted data transmission (TLS 1.2+)',
  'Access controls and authentication',
  'Audit logs for all signature changes',
  'Business Associate Agreement (BAA) available',
  'Patient confidentiality disclaimers',
  'Secure credential storage',
  'Role-based access control',
  'Automatic PHI protection notices',
];

const healthcareRoles = [
  { role: 'Physicians', example: 'MD, DO credentials, NPI number' },
  { role: 'Nurses', example: 'RN, NP, APRN credentials' },
  { role: 'Administrative Staff', example: 'Office hours, appointment scheduling' },
  { role: 'Specialists', example: 'Board certifications, specialties' },
];

const confidentialityNotice = `CONFIDENTIALITY NOTICE: This email and any attachments may contain confidential and privileged information protected by HIPAA. If you are not the intended recipient, you are hereby notified that any disclosure, copying, distribution, or use of this information is strictly prohibited. If you received this in error, please notify the sender immediately and delete this email.`;

export default function HealthcareIndustryPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
                <Heart className="h-4 w-4" />
                For Healthcare Organizations
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                HIPAA-Compliant Email Signatures for Healthcare
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Secure, compliant email signatures for hospitals, clinics, and medical practices. 
                Built-in HIPAA safeguards and patient confidentiality notices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" className="bg-blue-800 text-white hover:bg-blue-700">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-blue-200 mt-4">
                HIPAA Compliant • BAA Available • Encrypted Deployment
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop"
                alt="Healthcare professionals"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HIPAA Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for HIPAA Compliance</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Protect patient information with email signatures designed for healthcare compliance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hipaaFeatures.map((feature) => (
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

      {/* Compliance Checklist */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">HIPAA Compliance Checklist</h2>
            <p className="text-gray-600">
              Siggly meets HIPAA technical and administrative safeguards for email signatures.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-blue-200">
            <div className="grid md:grid-cols-2 gap-4">
              {complianceChecklist.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Business Associate Agreement (BAA):</strong> Available for all healthcare customers. 
                Contact us to execute a BAA for your organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Confidentiality Notice */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Patient Confidentiality Notices</h2>
            <p className="text-gray-600">
              Automatically include HIPAA-compliant confidentiality notices on every email.
            </p>
          </div>
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-3">Standard HIPAA Notice</h3>
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  {confidentialityNotice}
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Customize for your organization's specific requirements
          </p>
        </div>
      </section>

      {/* Healthcare Roles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Signatures for Every Healthcare Role</h2>
            <p className="text-gray-600">
              Different templates for physicians, nurses, administrative staff, and specialists.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {healthcareRoles.map((item) => (
              <div key={item.role} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.role}</h3>
                    <p className="text-sm text-gray-600">{item.example}</p>
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
          <h2 className="text-3xl font-bold text-center mb-12">Healthcare Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Hospital Systems</h3>
              <p className="text-sm text-gray-600 mb-4">
                Deploy compliant signatures across multiple facilities and departments.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 500+ staff members</li>
                <li>• Multiple locations</li>
                <li>• Department-specific templates</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Medical Practices</h3>
              <p className="text-sm text-gray-600 mb-4">
                Professional signatures for physicians, nurses, and front desk staff.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 5-50 providers</li>
                <li>• Credential management</li>
                <li>• Appointment info</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Specialty Clinics</h3>
              <p className="text-sm text-gray-600 mb-4">
                Specialized signatures for dental, vision, mental health, and more.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Specialty-specific info</li>
                <li>• Insurance details</li>
                <li>• Telehealth links</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6">
          <NewsletterSignupSection
            source="healthcare-industry"
            title="Healthcare IT Insights"
            description="Get tips on HIPAA compliance, healthcare technology, and practice management."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready for HIPAA-compliant email signatures?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join healthcare organizations using Siggly to manage secure, compliant email signatures. 
            BAA available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-blue-800 text-white hover:bg-blue-700">
                Request BAA
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
