import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Brand Guidelines: A Template | Siggly',
  description: 'Create brand guidelines for email signatures. Document standards for logos, colors, fonts, and signature elements.',
  keywords: ['email signature guidelines', 'signature brand standards', 'email signature policy'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-brand-guidelines',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Branding</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Brand Guidelines</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 12, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=600&fit=crop" alt="Brand guidelines" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Formal brand guidelines ensure consistency across all employee signatures. Here's a template for creating your own.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Guidelines Template</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">1. Logo Usage</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Approved logo file and format</li>
            <li>Minimum and maximum size</li>
            <li>Clear space requirements</li>
            <li>Where logo should appear</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">2. Colors</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Primary brand color (with hex code)</li>
            <li>Secondary color for links</li>
            <li>Text color specifications</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">3. Typography</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Approved font family (with fallbacks)</li>
            <li>Font sizes for name, title, contact</li>
            <li>Text styling (bold, italic usage)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">4. Required Elements</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Name, title, company</li>
            <li>Contact information</li>
            <li>Social links</li>
            <li>Legal disclaimers</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">5. Prohibited Elements</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Personal quotes</li>
            <li>Unapproved images</li>
            <li>Non-standard fonts</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Enforce your guidelines</h3>
            <p className="text-gray-600 mb-6">Siggly ensures everyone uses approved templates that follow your brand standards.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
