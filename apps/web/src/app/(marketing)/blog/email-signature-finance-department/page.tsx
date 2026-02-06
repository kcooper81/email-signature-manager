import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Finance Department Email Signatures | Siggly',
  description: 'Email signature best practices for finance teams. Compliance, security, and professional signatures for accounting and finance.',
  keywords: ['finance email signature', 'accounting department signature', 'CFO email'],
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
        <h1 className="text-4xl font-bold mb-6">Finance Department Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 20, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop" alt="Finance team" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Finance department signatures should convey trust and professionalism while including necessary security and compliance elements.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Key Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Name and title</li>
            <li>Company name</li>
            <li>Direct phone (for AP/AR inquiries)</li>
            <li>Professional certifications (CPA, CFA)</li>
            <li>Confidentiality disclaimer</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Security Considerations</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Include fraud warning for payment requests</li>
            <li>Reference to verification procedures</li>
            <li>Link to official payment portal</li>
            <li>Note about never requesting sensitive data via email</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Michael Torres, CPA</p>
            <p>Controller</p>
            <p className="mt-2 font-semibold">Acme Corporation</p>
            <p className="mt-2">📱 (555) 123-4567</p>
            <p className="text-violet-600">mtorres@acme.com</p>
            <p className="mt-3 text-xs text-gray-500">⚠️ Important: We never request payment changes via email. Verify all payment instructions by phone.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Seasonal Updates</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Year-end close deadlines</li>
            <li>Budget submission reminders</li>
            <li>Tax document availability</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Secure finance signatures</h3>
            <p className="text-gray-600 mb-6">Siggly helps finance teams maintain compliant, professional signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
