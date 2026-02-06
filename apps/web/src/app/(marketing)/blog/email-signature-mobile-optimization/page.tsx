import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Mobile-Optimized Email Signatures: Design Tips | Siggly',
  description: 'Create email signatures that look great on mobile. Responsive design, touch-friendly links, and mobile email considerations.',
  keywords: ['mobile email signature', 'responsive signature', 'email signature phone'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Mobile</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Mobile-Optimized Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 15, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop" alt="Mobile email" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Over half of emails are read on mobile devices. Your signature needs to look great and function well on small screens.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Mobile Design Principles</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Width</strong> — Keep under 320px wide</li>
            <li><strong>Single column</strong> — Stack elements vertically</li>
            <li><strong>Touch targets</strong> — Links at least 44px tall</li>
            <li><strong>Font size</strong> — Minimum 14px</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Mobile-Friendly Features</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Tap-to-call phone links (tel:)</li>
            <li>Tap-to-email mailto links</li>
            <li>Large, tappable social icons</li>
            <li>Simplified layout</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">What to Avoid</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Multi-column layouts</li>
            <li>Tiny text or links</li>
            <li>Wide images that get scaled down</li>
            <li>Too many elements</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Testing</h2>
          <p className="text-gray-600 mb-6">Test signatures on actual mobile devices:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>iOS Mail app</li>
            <li>Gmail app (iOS and Android)</li>
            <li>Outlook mobile</li>
            <li>Various screen sizes</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Mobile-ready signatures</h3>
            <p className="text-gray-600 mb-6">Siggly templates are designed responsive for all devices.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
