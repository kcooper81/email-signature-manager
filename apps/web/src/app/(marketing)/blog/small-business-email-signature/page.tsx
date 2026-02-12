import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Small Business Email Signatures: Complete Guide 2026 | Siggly',
  description: 'Create professional email signatures for your small business. Learn what to include, design tips, and free tools to get started.',
  keywords: ['small business email signature', 'business email signature', 'professional email signature small business'],
  alternates: {
    canonical: 'https://siggly.io/blog/small-business-email-signature',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Small Business</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Small Business Email Signatures: Complete Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 15, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=600&fit=crop" alt="Small business team" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">For small businesses, every email is an opportunity to build your brand. A professional signature helps you compete with larger companies and leaves a lasting impression.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Why Signatures Matter for Small Business</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Build credibility</strong> — Look as professional as bigger competitors</li>
            <li><strong>Free marketing</strong> — Every email promotes your brand</li>
            <li><strong>Easy contact</strong> — Make it simple for customers to reach you</li>
            <li><strong>Drive traffic</strong> — Link to your website and social profiles</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Essential Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Your name and role</li>
            <li>Business name</li>
            <li>Phone number (mobile preferred for small business)</li>
            <li>Email address</li>
            <li>Website URL</li>
            <li>Business logo (if you have one)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Small Business Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Sarah Johnson</p>
            <p>Owner, Johnson Marketing</p>
            <p className="mt-2">📱 (555) 123-4567</p>
            <p className="text-violet-600">sarah@johnsonmarketing.com</p>
            <p className="text-violet-600">www.johnsonmarketing.com</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Budget-Friendly Tips</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Use free generators</strong> — Create professional signatures without cost</li>
            <li><strong>Skip the photo</strong> — Text-only signatures look professional too</li>
            <li><strong>Simple logos work</strong> — Even a text logo adds branding</li>
            <li><strong>Focus on essentials</strong> — You don't need every feature</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Growing Your Team</h2>
          <p className="text-gray-600 mb-6">As you hire, maintaining consistent signatures becomes important. Even with 3-5 employees, different signatures look unprofessional. Consider standardizing early.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Free for small teams</h3>
            <p className="text-gray-600 mb-6">Siggly's free plan includes up to 5 team members — perfect for small businesses getting started.</p>
            <Link href="/for/small-business"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
