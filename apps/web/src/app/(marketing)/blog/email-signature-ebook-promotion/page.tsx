import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Promoting Ebooks & Content Through Email Signatures | Siggly',
  description: 'Use email signatures to distribute content. Promote ebooks, whitepapers, guides, and other lead magnets effectively.',
  keywords: ['email signature ebook', 'content promotion signature', 'lead magnet email'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Content Marketing</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Promoting Ebooks & Content Through Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 24, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=600&fit=crop" alt="Ebook content" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Email signatures are a powerful distribution channel for content marketing. Every outgoing email can promote your latest resources.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Content Types to Promote</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Ebooks and guides</li>
            <li>Whitepapers and reports</li>
            <li>Case studies</li>
            <li>Templates and tools</li>
            <li>Blog posts and articles</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Banner Examples</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>"📘 Free Guide: [Topic] — Download now"</li>
            <li>"New: The Complete [Topic] Handbook"</li>
            <li>"Get our latest research: [Report Name]"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Design Tips</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Show ebook cover image (small)</li>
            <li>Clear value proposition</li>
            <li>Strong CTA ("Download free" works well)</li>
            <li>Link to landing page, not direct PDF</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Measuring Success</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Track clicks via UTM parameters</li>
            <li>Monitor landing page conversions</li>
            <li>Compare to other promotion channels</li>
            <li>A/B test different content offers</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Content promotion made easy</h3>
            <p className="text-gray-600 mb-6">Siggly helps you promote content through signature banners across your team.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
