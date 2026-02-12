import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Choosing an Email Signature Vendor: Buyer Guide | Siggly',
  description: 'How to evaluate and select an email signature management vendor. RFP questions, feature comparison, and decision criteria.',
  keywords: ['email signature vendor', 'signature software selection', 'choose signature tool'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-vendor-selection',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Buying Guide</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Choosing an Email Signature Vendor</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 9, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop" alt="Vendor selection" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Selecting the right email signature vendor is crucial. Here's a framework for making the best choice for your organization.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Key Evaluation Criteria</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Platform support</strong> — Works with your email system</li>
            <li><strong>Ease of use</strong> — Can marketing use it without IT?</li>
            <li><strong>Features</strong> — Has what you need now and later</li>
            <li><strong>Pricing</strong> — Fits your budget at your scale</li>
            <li><strong>Support</strong> — Responsive when you need help</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Questions to Ask</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>What platforms do you support?</li>
            <li>How does the signature appear in replies?</li>
            <li>What's the setup/onboarding process?</li>
            <li>How is pricing structured?</li>
            <li>What integrations are available?</li>
            <li>What's your uptime/reliability?</li>
            <li>How is data/security handled?</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Red Flags</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>No free trial</li>
            <li>Long-term contracts required</li>
            <li>Hidden fees</li>
            <li>Poor reviews on G2/Capterra</li>
            <li>Limited platform support</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Decision Process</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Define requirements</li>
            <li>Research vendors</li>
            <li>Request demos</li>
            <li>Run pilot/trial</li>
            <li>Make decision</li>
          </ol>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">See why teams choose Siggly</h3>
            <p className="text-gray-600 mb-6">Simple pricing, great support, works with Google and Microsoft.</p>
            <Link href="/pricing"><Button>View Pricing <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
