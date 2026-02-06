import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Disclaimers: When & What to Include | Siggly',
  description: 'Learn when email disclaimers are necessary and what to include. Covers confidentiality, legal, and industry-specific disclaimers.',
  keywords: ['email signature disclaimer', 'email confidentiality notice', 'legal email disclaimer'],
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
        <h1 className="text-4xl font-bold mb-6">Email Signature Disclaimers: When & What to Include</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 16, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop" alt="Legal documents" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Email disclaimers are standard in many industries, but do they actually do anything? Here's when they matter and what to include.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Common Disclaimer Types</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Confidentiality Notice</h3>
          <p className="text-gray-600 mb-6">Standard in professional services, indicating the email may contain confidential information.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Legal/Privilege Notice</h3>
          <p className="text-gray-600 mb-6">For attorneys, indicating attorney-client privilege may apply.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Regulatory Disclaimers</h3>
          <p className="text-gray-600 mb-6">Required disclosures for financial services, healthcare, etc.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Virus/Security Notice</h3>
          <p className="text-gray-600 mb-6">Warning that attachments should be scanned (largely outdated).</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Do Disclaimers Work?</h2>
          <p className="text-gray-600 mb-6">The legal effectiveness of email disclaimers is limited:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>They don't create confidentiality where none exists</li>
            <li>Recipients aren't bound by terms they didn't agree to</li>
            <li>They may provide notice value if information is misdirected</li>
            <li>Some are required by regulations regardless of effectiveness</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">When They're Required</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>HIPAA-covered entities (healthcare)</li>
            <li>FINRA-regulated communications (financial)</li>
            <li>Attorney communications (professional rules)</li>
            <li>EU business registration requirements</li>
            <li>Industry-specific regulations</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Keep it short (no one reads 10 paragraphs)</li>
            <li>Make it relevant to your industry</li>
            <li>Use smaller font to avoid dominating signature</li>
            <li>Consult legal counsel for required language</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Built-in disclaimer templates</h3>
            <p className="text-gray-600 mb-6">Siggly includes industry-specific disclaimer templates approved for common use cases.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
