import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'GDPR Email Signature Requirements: EU Compliance Guide | Siggly',
  description: 'Ensure your email signatures comply with GDPR. Learn about privacy notices, data processing disclosures, and EU business requirements.',
  keywords: ['GDPR email signature', 'EU email compliance', 'email signature privacy', 'GDPR disclaimer email'],
  alternates: {
    canonical: 'https://siggly.io/blog/gdpr-email-signature-requirements',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Compliance</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">GDPR Email Signature Requirements: EU Compliance Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 24, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop" alt="Europe data protection" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">If your business operates in the EU or communicates with EU residents, your email signatures may need to address GDPR requirements. Here's what you need to know.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Does GDPR Affect Email Signatures?</h2>
          <p className="text-gray-600 mb-6">GDPR doesn't specifically mandate email signature content, but it does affect how you handle personal data in business communications. Key considerations:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Employee data:</strong> Signatures contain personal data (names, photos, contact info)</li>
            <li><strong>Marketing links:</strong> Tracking links may collect recipient data</li>
            <li><strong>Privacy notices:</strong> Some communications may require privacy information</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">EU Business Registration Requirements</h2>
          <p className="text-gray-600 mb-6">Many EU countries require business emails to include company registration information:</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">UK (Companies Act 2006)</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Company registered name</li>
            <li>Company registration number</li>
            <li>Place of registration (England and Wales, Scotland, etc.)</li>
            <li>Registered office address</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Germany (Impressumspflicht)</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Company name and legal form (GmbH, AG, etc.)</li>
            <li>Managing directors' names</li>
            <li>Commercial register number</li>
            <li>VAT identification number</li>
            <li>Full business address</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Note: Requirements vary significantly by country. Consult local legal counsel for your specific jurisdiction.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Privacy Notice Considerations</h2>
          <p className="text-gray-600 mb-6">For marketing emails or communications where you're collecting data, consider including:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Link to privacy policy</li>
            <li>Data controller contact information</li>
            <li>Brief statement about data use</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Example Privacy Link</h3>
          <div className="bg-gray-100 p-4 rounded-lg my-6 text-sm">
            <p className="text-gray-600">We process personal data in accordance with our <span className="text-violet-600 underline">Privacy Policy</span>.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Tracking & Analytics Compliance</h2>
          <p className="text-gray-600 mb-6">If your signature includes tracked links:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li>Ensure your privacy policy covers email tracking</li>
            <li>Consider whether tracking constitutes profiling</li>
            <li>Be transparent about analytics collection</li>
            <li>Provide opt-out mechanisms where required</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Confidentiality Notices Under GDPR</h2>
          <p className="text-gray-600 mb-6">Traditional confidentiality disclaimers have limited legal effect, but a GDPR-aware version might read:</p>
          <div className="bg-gray-100 p-4 rounded-lg my-6 text-sm">
            <p className="italic">This email may contain confidential information. If you received this in error, please notify the sender and delete all copies. We process personal data in accordance with GDPR and our Privacy Policy at [link].</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Employee Consent</h2>
          <p className="text-gray-600 mb-6">Under GDPR, displaying employee personal data (photos, contact details) in signatures requires a lawful basis. Most organizations rely on:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Legitimate interest:</strong> Business need for professional communication</li>
            <li><strong>Contract performance:</strong> Part of employment duties</li>
            <li><strong>Consent:</strong> Employee agreement (particularly for photos)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li>Include required company registration details for your jurisdiction</li>
            <li>Link to your privacy policy in marketing communications</li>
            <li>Obtain employee consent for photos in signatures</li>
            <li>Review signature content with your DPO or legal team</li>
            <li>Keep signatures updated when regulations change</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Compliant signatures across your organization</h3>
            <p className="text-gray-600 mb-6">Siggly helps EU businesses deploy consistent, compliant signatures with proper registration details and privacy links.</p>
            <Link href="/signup"><Button>Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
