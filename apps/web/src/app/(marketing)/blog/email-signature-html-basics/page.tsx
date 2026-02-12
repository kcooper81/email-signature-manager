import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'HTML Email Signatures: A Technical Guide | Siggly',
  description: 'Understand HTML email signature basics. Tables, inline styles, and email client compatibility for custom signature development.',
  keywords: ['html email signature', 'signature html code', 'email signature coding'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-html-basics',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Technical</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">HTML Email Signatures: A Technical Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 14, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop" alt="HTML code" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Building HTML email signatures requires different techniques than web development. Here's what you need to know.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Key Principles</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Tables for layout</strong> — CSS flexbox/grid don't work reliably</li>
            <li><strong>Inline styles</strong> — External CSS is stripped by most clients</li>
            <li><strong>Absolute URLs</strong> — All images must use full URLs</li>
            <li><strong>Simple HTML</strong> — Avoid divs, use basic elements</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Email Client Challenges</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Outlook uses Word's rendering engine</li>
            <li>Gmail strips certain CSS properties</li>
            <li>Apple Mail is most forgiving</li>
            <li>Mobile clients have limited width</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Safe CSS Properties</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>color, font-family, font-size</li>
            <li>text-align, text-decoration</li>
            <li>padding (on table cells)</li>
            <li>border (on tables)</li>
            <li>width, height (on images)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">What to Avoid</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>CSS floats and positioning</li>
            <li>Background images (poor support)</li>
            <li>Web fonts (use font stacks)</li>
            <li>JavaScript (never works)</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Tip: Using a signature management tool like Siggly handles all these technical complexities for you.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Skip the coding</h3>
            <p className="text-gray-600 mb-6">Siggly's visual editor creates compatible HTML automatically.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
