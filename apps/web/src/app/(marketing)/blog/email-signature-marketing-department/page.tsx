import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Marketing Department Email Signatures | Siggly',
  description: 'Email signature best practices for marketing teams. Brand consistency, campaign promotion, and creative signature design.',
  keywords: ['marketing email signature', 'brand signature', 'marketing team email'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Marketing</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Marketing Department Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 21, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop" alt="Marketing team" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Marketing teams should lead by example with on-brand, creative signatures that support ongoing campaigns and company messaging.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Key Responsibilities</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Define signature brand guidelines</li>
            <li>Create campaign banners</li>
            <li>Maintain template library</li>
            <li>Measure signature performance</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Marketing Signature Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>On-brand design and colors</li>
            <li>Social media links (all platforms)</li>
            <li>Latest campaign promotion</li>
            <li>Content/blog links</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Campaign Rotation</h2>
          <p className="text-gray-600 mb-6">Marketing should rotate signature banners to support current initiatives:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Product launches</li>
            <li>Events and webinars</li>
            <li>Content promotions</li>
            <li>Brand campaigns</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Emily Chen</p>
            <p>Content Marketing Manager</p>
            <p className="mt-2 font-semibold">Acme Software</p>
            <p className="mt-2 text-violet-600">emily@acme.com</p>
            <p className="text-violet-600">Twitter | LinkedIn | Blog</p>
            <p className="mt-2 text-violet-600 font-medium">📘 Download our new guide →</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Marketing-driven signatures</h3>
            <p className="text-gray-600 mb-6">Siggly gives marketing teams control over signature design and campaigns.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
