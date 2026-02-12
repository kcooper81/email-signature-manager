import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Fonts: Web-Safe Typography Guide | Siggly',
  description: 'Choose the right fonts for email signatures. Learn which fonts work across all email clients and how to use them effectively.',
  keywords: ['email signature font', 'web safe fonts email', 'signature typography'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-fonts',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Design</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Fonts: Web-Safe Typography Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 23, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop" alt="Typography" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Custom fonts won't load in email clients. Use web-safe fonts to ensure your signature looks consistent for every recipient.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Web-Safe Font Options</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Sans-Serif (Modern)</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Arial</strong> — Clean, universal, professional</li>
            <li><strong>Helvetica</strong> — Modern classic (falls back to Arial)</li>
            <li><strong>Verdana</strong> — Excellent readability at small sizes</li>
            <li><strong>Tahoma</strong> — Compact, clean</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Serif (Traditional)</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Georgia</strong> — Elegant, professional</li>
            <li><strong>Times New Roman</strong> — Classic, formal</li>
            <li><strong>Palatino</strong> — Refined, readable</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Font Sizing</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Name:</strong> 14-16px (slightly larger)</li>
            <li><strong>Title/Company:</strong> 12-14px</li>
            <li><strong>Contact info:</strong> 11-12px</li>
            <li><strong>Disclaimer:</strong> 10-11px</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Font Stack Example</h2>
          <div className="bg-gray-100 p-4 rounded-lg my-6 text-sm font-mono">
            <p>font-family: Arial, Helvetica, sans-serif;</p>
          </div>
          <p className="text-gray-600 mb-6">Always include fallback fonts in case the primary isn't available.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">What to Avoid</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Script or decorative fonts</li>
            <li>Fonts smaller than 10px</li>
            <li>Too many different fonts</li>
            <li>Custom/downloaded fonts (won't display)</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Consistent typography</h3>
            <p className="text-gray-600 mb-6">Siggly ensures your signatures use compatible fonts that look great everywhere.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
