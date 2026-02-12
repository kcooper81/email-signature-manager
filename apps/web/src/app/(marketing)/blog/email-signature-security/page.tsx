import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Security: Protect Your Brand | Siggly',
  description: 'Secure your email signatures against spoofing and brand abuse. Learn best practices for signature security and authentication.',
  keywords: ['email signature security', 'signature spoofing', 'email brand protection'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-security',
  },
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Security</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Security: Protect Your Brand</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 24, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=600&fit=crop" alt="Security concept" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Email signatures can be vectors for phishing and brand impersonation. Here's how to protect your organization and employees.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Security Risks</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Spoofing</strong> — Attackers copying your signature style</li>
            <li><strong>Phishing links</strong> — Malicious links in fake signatures</li>
            <li><strong>Image tracking</strong> — Unwanted tracking pixels in signatures</li>
            <li><strong>Data exposure</strong> — Too much information revealed</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li>Use centralized signature management (prevent employee tampering)</li>
            <li>Host images on secure, controlled servers</li>
            <li>Implement DMARC, SPF, and DKIM email authentication</li>
            <li>Avoid including sensitive information</li>
            <li>Regularly audit signature content and links</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">What Not to Include</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Personal mobile numbers (unless required)</li>
            <li>Home addresses</li>
            <li>Personal social media</li>
            <li>Sensitive internal information</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Centralized Control Benefits</h2>
          <p className="text-gray-600 mb-6">When IT controls signatures centrally:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Employees can't add suspicious links</li>
            <li>Consistent format makes spoofing harder</li>
            <li>Updates can be deployed instantly if threats emerge</li>
            <li>Audit trail for compliance</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Secure signature management</h3>
            <p className="text-gray-600 mb-6">Siggly provides centralized control and secure image hosting to protect your brand.</p>
            <Link href="/security"><Button>Learn About Security <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
