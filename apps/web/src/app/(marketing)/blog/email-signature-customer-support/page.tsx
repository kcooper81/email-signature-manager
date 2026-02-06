import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Customer Support Email Signatures: Build Trust | Siggly',
  description: 'Create effective email signatures for customer support teams. Include helpful links, build rapport, and improve customer experience.',
  keywords: ['customer support email signature', 'support team signature', 'help desk email signature'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Customer Support</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Customer Support Email Signatures: Build Trust</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 8, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop" alt="Customer support" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Support signatures should build trust and make it easy for customers to find help. A well-designed signature can improve satisfaction.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Key Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Agent name (builds personal connection)</li>
            <li>Role/team (Customer Success, Technical Support)</li>
            <li>Company name</li>
            <li>Support hours</li>
            <li>Knowledge base link</li>
            <li>Feedback/survey link</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Rachel Kim</p>
            <p>Customer Success Team</p>
            <p className="mt-2 font-semibold">Acme Software</p>
            <p className="text-gray-600">Support hours: Mon-Fri 9am-6pm EST</p>
            <p className="mt-2 text-violet-600">Help Center | Submit Feedback</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Helpful Links to Include</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Knowledge base/help center</li>
            <li>FAQ page</li>
            <li>Community forum</li>
            <li>Status page (for SaaS)</li>
            <li>Satisfaction survey</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">What to Avoid</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Sales-focused CTAs (customers need help, not upsells)</li>
            <li>Too many links (overwhelming)</li>
            <li>Missing personal name (feels impersonal)</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Signatures for support teams</h3>
            <p className="text-gray-600 mb-6">Siggly helps support teams maintain helpful, consistent signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
