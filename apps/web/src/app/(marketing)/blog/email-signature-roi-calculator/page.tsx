import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature ROI: Calculate Your Return | Siggly',
  description: 'Calculate the ROI of email signature management. Understand the value of consistent branding, banner clicks, and time savings.',
  keywords: ['email signature ROI', 'signature value calculator', 'signature marketing ROI'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-roi-calculator',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">ROI</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature ROI: Calculate Your Return</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 17, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop" alt="ROI calculation" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Email signature management delivers measurable ROI through marketing value, time savings, and brand consistency. Here's how to calculate it.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">ROI Components</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Marketing value</strong> — Banner impressions and clicks</li>
            <li><strong>Time savings</strong> — IT and employee time saved</li>
            <li><strong>Brand value</strong> — Consistent professional image</li>
            <li><strong>Lead generation</strong> — Conversions from signature CTAs</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Quick Calculation</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6">
            <p className="text-gray-600 mb-4"><strong>Impressions:</strong> Employees × Emails/day × Work days = Annual impressions</p>
            <p className="text-gray-600 mb-4"><strong>Example:</strong> 50 employees × 30 emails × 250 days = 375,000 impressions</p>
            <p className="text-gray-600"><strong>At $5 CPM:</strong> $1,875 equivalent ad value</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Time Savings</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Manual signature updates: 15-30 min per person</li>
            <li>IT support for signature issues: Hours per month</li>
            <li>Onboarding signature setup: 15+ min per hire</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Lead Generation Value</h2>
          <p className="text-gray-600 mb-6">If signature CTAs generate even 1-2 leads per month, the value quickly exceeds software costs for most companies.</p>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">For a 50-person company, signature management typically pays for itself within the first month through time savings alone.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">See your ROI</h3>
            <p className="text-gray-600 mb-6">Siggly's affordable pricing delivers clear ROI for teams of all sizes.</p>
            <Link href="/pricing"><Button>View Pricing <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
