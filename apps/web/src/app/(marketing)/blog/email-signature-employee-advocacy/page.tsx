import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signatures for Employee Advocacy Programs | Siggly',
  description: 'Leverage email signatures for employee advocacy. Amplify company content and brand through every employee email.',
  keywords: ['employee advocacy email', 'signature advocacy', 'amplify brand email'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-employee-advocacy',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Employee Advocacy</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signatures for Employee Advocacy</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 6, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop" alt="Employee advocacy" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Employee advocacy extends beyond social media. Email signatures turn every employee into a brand ambassador.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Advocacy Through Signatures</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Content promotion</strong> — Share latest blog posts, reports</li>
            <li><strong>Brand messaging</strong> — Consistent positioning and values</li>
            <li><strong>Social amplification</strong> — Link to company social profiles</li>
            <li><strong>Recruiting</strong> — "We're hiring" messaging</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Why It Works</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Passive — No extra effort from employees</li>
            <li>Professional context — Not "selling"</li>
            <li>High reach — Every email is exposure</li>
            <li>Trusted source — Employee vs company ad</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Coordination</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Align with marketing campaigns</li>
            <li>Rotate content regularly</li>
            <li>Segment by department if relevant</li>
            <li>Track engagement</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Measuring Impact</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Clicks on signature CTAs</li>
            <li>Traffic from signature sources (UTM)</li>
            <li>Content engagement</li>
            <li>New social followers</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Amplify your brand</h3>
            <p className="text-gray-600 mb-6">Siggly makes coordinating advocacy campaigns across signatures easy.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
