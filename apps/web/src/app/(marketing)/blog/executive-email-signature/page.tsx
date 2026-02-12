import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Executive Email Signatures: CEO & C-Suite Guide | Siggly',
  description: 'Create executive email signatures that convey authority. Guidance for CEOs, C-suite executives, and senior leadership.',
  keywords: ['executive email signature', 'ceo email signature', 'c-suite signature'],
  alternates: {
    canonical: 'https://siggly.io/blog/executive-email-signature',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Executive</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Executive Email Signatures: CEO & C-Suite Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 19, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=600&fit=crop" alt="Executive office" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Executive signatures should convey authority while remaining accessible. Balance professionalism with approachability.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Key Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Full name</li>
            <li>Title (CEO, CFO, etc.)</li>
            <li>Company name</li>
            <li>Direct line (or EA contact)</li>
            <li>LinkedIn (thought leadership)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example CEO Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Amanda Chen</p>
            <p>Chief Executive Officer</p>
            <p className="mt-2 font-semibold">TechCorp Industries</p>
            <p className="mt-2">T: (555) 123-4567</p>
            <p className="text-violet-600">achen@techcorp.com</p>
            <p className="text-violet-600">LinkedIn</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Consider Adding</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Professional headshot (optional)</li>
            <li>Company mission/tagline</li>
            <li>Executive assistant contact (for scheduling)</li>
            <li>Speaking/podcast links (for thought leaders)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">What to Avoid</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Overly promotional language</li>
            <li>Too many social links</li>
            <li>Personal cell (unless intentional)</li>
            <li>Lengthy disclaimers in day-to-day emails</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Executive-grade signatures</h3>
            <p className="text-gray-600 mb-6">Siggly helps organizations maintain consistent signatures from executives to entry-level.</p>
            <Link href="/signup"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
