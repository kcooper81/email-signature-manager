import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Growing Your Newsletter with Email Signatures | Siggly',
  description: 'Use email signatures to grow newsletter subscribers. Add signup CTAs, promote content, and convert contacts to subscribers.',
  keywords: ['newsletter email signature', 'grow newsletter signature', 'subscribe CTA email'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Newsletters</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Growing Your Newsletter with Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 7, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=1200&h=600&fit=crop" alt="Newsletter" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Email signatures are an overlooked channel for growing your newsletter subscriber list. Everyone you email is a potential subscriber.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">CTA Examples</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>"📧 Subscribe to our weekly newsletter"</li>
            <li>"Get [topic] insights — Join 5,000 subscribers"</li>
            <li>"Free newsletter: [Name] — Subscribe"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">What Works</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Value proposition</strong> — What will they get?</li>
            <li><strong>Social proof</strong> — Subscriber count</li>
            <li><strong>Frequency</strong> — Weekly, monthly</li>
            <li><strong>Easy signup</strong> — Direct link to subscribe</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Link Options</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Newsletter landing page</li>
            <li>Direct signup link (Mailchimp, Substack, etc.)</li>
            <li>Latest issue (to preview content)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Who Should Include It</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Marketing team (definitely)</li>
            <li>Sales team (if newsletter supports sales)</li>
            <li>Content creators</li>
            <li>Anyone in customer-facing roles</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Grow your list</h3>
            <p className="text-gray-600 mb-6">Siggly helps you add newsletter CTAs across your organization's signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
