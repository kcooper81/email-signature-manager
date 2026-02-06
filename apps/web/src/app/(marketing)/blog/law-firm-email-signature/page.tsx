import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Law Firm Email Signatures: Attorney Requirements Guide | Siggly',
  description: 'Create compliant email signatures for law firms. Includes bar number requirements, confidentiality disclaimers, and professional design tips.',
  keywords: ['law firm email signature', 'attorney email signature', 'legal email signature', 'lawyer email disclaimer'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Legal Industry</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Law Firm Email Signatures: Complete Attorney Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 29, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 8 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop" alt="Law office" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Attorney email signatures must balance professionalism with compliance requirements. This guide covers what law firms need to include and common mistakes to avoid.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Required Elements</h2>
          <p className="text-gray-600 mb-6">Most state bars require or recommend these elements:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Full legal name</strong> with credentials (e.g., John Smith, Esq. or J.D.)</li>
            <li><strong>Bar admission state(s)</strong> and bar number</li>
            <li><strong>Firm name</strong> and position</li>
            <li><strong>Office address</strong> (many states require physical address)</li>
            <li><strong>Direct phone</strong> and email</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Confidentiality Disclaimer</h2>
          <p className="text-gray-600 mb-6">Nearly all law firms include a confidentiality notice. While its legal effectiveness is debated, it's become standard practice:</p>
          <div className="bg-gray-100 p-4 rounded-lg my-6 text-sm">
            <p className="italic">CONFIDENTIALITY NOTICE: This email and any attachments are for the exclusive and confidential use of the intended recipient. If you are not the intended recipient, please do not read, distribute, or take action based on this message. If you have received this in error, please notify the sender immediately and delete this message.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Attorney-Client Privilege Notice</h2>
          <p className="text-gray-600 mb-6">For client communications, a privilege notice provides additional protection:</p>
          <div className="bg-gray-100 p-4 rounded-lg my-6 text-sm">
            <p className="italic">This communication may contain information protected by attorney-client privilege and/or attorney work product doctrine. Unauthorized disclosure, copying, or distribution is prohibited.</p>
          </div>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Note: Disclaimers don't create privilege where none exists. They serve as notice to third parties who may accidentally receive confidential information.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">State-Specific Requirements</h2>
          <p className="text-gray-600 mb-6">Some states have specific advertising rules that affect signatures:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>California:</strong> Must include bar number on communications</li>
            <li><strong>New York:</strong> "Attorney Advertising" label may be required</li>
            <li><strong>Texas:</strong> Specific requirements for firm names and practice areas</li>
            <li><strong>Florida:</strong> Must identify principal office location</li>
          </ul>
          <p className="text-gray-600 mb-6">Always verify current requirements with your state bar association.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Attorney Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Sarah Mitchell, Esq.</p>
            <p>Partner | Corporate Law</p>
            <p className="mt-2">Mitchell & Associates LLP</p>
            <p>123 Legal Center Drive, Suite 500</p>
            <p>Chicago, IL 60601</p>
            <p className="mt-2">T: (312) 555-0100 | F: (312) 555-0101</p>
            <p className="text-violet-600">smitchell@mitchelllaw.com</p>
            <p className="mt-2 text-gray-500">Illinois Bar #6234567</p>
            <p className="mt-4 text-xs text-gray-500 border-t pt-4">CONFIDENTIALITY NOTICE: This email contains privileged information...</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">What to Avoid</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li>Claiming specializations without proper certification</li>
            <li>Including case results (may violate advertising rules)</li>
            <li>Overly promotional language</li>
            <li>Missing required disclosures for your jurisdiction</li>
            <li>Outdated bar numbers or credentials</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Firm-Wide Consistency</h2>
          <p className="text-gray-600 mb-6">Law firms benefit greatly from standardized signatures. When every attorney uses the same format, it reinforces firm branding and ensures compliance across the organization.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Compliant signatures for your firm</h3>
            <p className="text-gray-600 mb-6">Siggly helps law firms deploy consistent, compliant email signatures with built-in legal disclaimer templates.</p>
            <Link href="/industries/legal"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
