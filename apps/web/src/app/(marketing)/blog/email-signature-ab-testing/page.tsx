import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'A/B Testing Email Signatures: Optimize Performance | Siggly',
  description: 'Learn to A/B test email signatures for better results. Test CTAs, designs, and content to find what converts best.',
  keywords: ['ab test email signature', 'signature testing', 'optimize email signature'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-ab-testing',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Optimization</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">A/B Testing Email Signatures: Optimize Performance</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 14, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop" alt="Testing analytics" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">A/B testing your email signatures can reveal what resonates with recipients. Small changes can significantly impact click rates.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">What to Test</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>CTA text</strong> — "Book a call" vs "Schedule meeting"</li>
            <li><strong>Banner designs</strong> — Different images, colors, layouts</li>
            <li><strong>Link placement</strong> — Top vs bottom of signature</li>
            <li><strong>Social icons</strong> — With or without, which platforms</li>
            <li><strong>Photo inclusion</strong> — Headshot vs no headshot</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">How to Test</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Define what you're testing (one variable at a time)</li>
            <li>Split your team into test groups</li>
            <li>Use UTM parameters to track each version</li>
            <li>Run for 2-4 weeks to gather data</li>
            <li>Compare results and implement winner</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Metrics to Track</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Click-through rate</li>
            <li>Conversion rate (signups, bookings)</li>
            <li>Engagement by recipient type</li>
            <li>Performance by team/department</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Sample Size Matters</h2>
          <p className="text-gray-600 mb-6">You need enough emails sent to reach statistical significance. Small teams may need longer test periods.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Test and optimize</h3>
            <p className="text-gray-600 mb-6">Siggly's analytics help you understand what's working so you can continuously improve.</p>
            <Link href="/features"><Button>See Features <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
