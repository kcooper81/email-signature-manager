import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Sustainability Messaging in Email Signatures | Siggly',
  description: 'Include sustainability and environmental messaging in email signatures. Green initiatives, certifications, and eco-friendly messaging.',
  keywords: ['sustainability email signature', 'green signature', 'environmental messaging email'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-sustainability',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Sustainability</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Sustainability Messaging in Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 4, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&h=600&fit=crop" alt="Sustainability" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Companies increasingly communicate sustainability commitments through email signatures. Here's how to do it authentically.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">What to Include</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Environmental certifications (B Corp, Carbon Neutral)</li>
            <li>"Please consider the environment" messages</li>
            <li>Sustainability report links</li>
            <li>Green initiative announcements</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Messaging</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>"🌱 We're carbon neutral — Learn about our commitment"</li>
            <li>"Certified B Corporation"</li>
            <li>"Please consider the environment before printing this email"</li>
            <li>"View our sustainability report"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Authenticity Matters</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Only include verified certifications</li>
            <li>Link to real sustainability efforts</li>
            <li>Avoid greenwashing</li>
            <li>Back up claims with actions</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Design Tips</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Small certification badge/icon</li>
            <li>Subtle placement (footer)</li>
            <li>Don't overwhelm the signature</li>
            <li>Link to more information</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Share your commitment</h3>
            <p className="text-gray-600 mb-6">Siggly makes it easy to include sustainability messaging in team signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
