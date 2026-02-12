import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Financial Advisor Email Signatures: Compliance Guide | Siggly',
  description: 'Create compliant email signatures for financial advisors. Covers FINRA requirements, CRD numbers, disclosures, and regulatory disclaimers.',
  keywords: ['financial advisor email signature', 'FINRA email signature', 'investment advisor signature', 'wealth management email'],
  alternates: {
    canonical: 'https://siggly.io/blog/financial-advisor-email-signature',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Finance</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Financial Advisor Email Signatures: Compliance Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 26, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 8 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop" alt="Financial planning" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Financial advisor email signatures must balance professionalism with strict regulatory requirements. This guide covers FINRA and SEC compliance essentials.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Required Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Full legal name</strong> with credentials (CFP®, CFA, ChFC)</li>
            <li><strong>CRD Number</strong> (Central Registration Depository)</li>
            <li><strong>Firm name</strong> — broker-dealer and/or RIA</li>
            <li><strong>Business address</strong></li>
            <li><strong>Phone and email</strong></li>
            <li><strong>Member FINRA/SIPC</strong> disclosure (if applicable)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Regulatory Disclosures</h2>
          <p className="text-gray-600 mb-6">Financial professionals typically need multiple disclosures:</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Broker-Dealer Disclosure</h3>
          <div className="bg-green-50 p-4 rounded-lg my-6 text-sm border-l-4 border-green-500">
            <p className="italic">Securities offered through [Broker-Dealer Name], Member FINRA/SIPC.</p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3">RIA Disclosure</h3>
          <div className="bg-blue-50 p-4 rounded-lg my-6 text-sm border-l-4 border-blue-500">
            <p className="italic">Investment advisory services offered through [RIA Name], a registered investment adviser.</p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3">Dual Registration</h3>
          <div className="bg-gray-100 p-4 rounded-lg my-6 text-sm">
            <p className="italic">Securities offered through [BD Name], Member FINRA/SIPC. Advisory services offered through [RIA Name], a registered investment adviser. [BD Name] and [RIA Name] are separate entities.</p>
          </div>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Compliance note: Your broker-dealer or RIA compliance department should approve your exact signature language before use. Requirements vary by firm.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Credential Formatting</h2>
          <p className="text-gray-600 mb-6">Use proper trademark symbols for protected designations:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>CFP®</strong> — Certified Financial Planner (requires ®)</li>
            <li><strong>CFA</strong> — Chartered Financial Analyst</li>
            <li><strong>ChFC®</strong> — Chartered Financial Consultant</li>
            <li><strong>CLU®</strong> — Chartered Life Underwriter</li>
            <li><strong>RICP®</strong> — Retirement Income Certified Professional</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Thomas Wright, CFP®, CFA</p>
            <p>Senior Financial Advisor</p>
            <p className="mt-2">Wealth Partners Advisory</p>
            <p>500 Financial Center, Suite 400</p>
            <p>Boston, MA 02110</p>
            <p className="mt-2">T: (617) 555-0100</p>
            <p className="text-violet-600">twright@wealthpartners.com</p>
            <p className="mt-2 text-gray-500 text-xs">CRD# 1234567</p>
            <p className="mt-4 text-xs text-gray-500 border-t pt-4">Securities offered through ABC Securities, LLC, Member FINRA/SIPC. Investment advisory services offered through Wealth Partners Advisory, a registered investment adviser. ABC Securities and Wealth Partners Advisory are not affiliated entities.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">What to Avoid</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li>Performance claims or guarantees</li>
            <li>Testimonials (heavily regulated)</li>
            <li>Unapproved marketing language</li>
            <li>Missing required disclosures</li>
            <li>Outdated registration information</li>
            <li>Personal social media links (firm policy dependent)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Email Archiving Requirements</h2>
          <p className="text-gray-600 mb-6">FINRA requires broker-dealers to archive all business communications, including emails. Your signature is part of these archived records, so accuracy is essential.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Compliant signatures for your firm</h3>
            <p className="text-gray-600 mb-6">Siggly helps financial services firms deploy consistent, compliant signatures with proper regulatory disclosures.</p>
            <Link href="/industries/finance"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
