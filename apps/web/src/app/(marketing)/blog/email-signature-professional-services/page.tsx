import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Professional Services Email Signatures | Siggly',
  description: 'Email signature best practices for professional services firms. Consultants, advisors, and service providers.',
  keywords: ['professional services signature', 'consultant email signature', 'advisor signature'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Professional Services</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Professional Services Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 30, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop" alt="Professional services" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Professional services firms build trust through expertise and credibility. Your email signature should reinforce both.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Essential Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Full name and professional title</li>
            <li>Firm name</li>
            <li>Professional credentials</li>
            <li>Direct contact information</li>
            <li>LinkedIn profile</li>
            <li>Booking link</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Credential Display</h2>
          <p className="text-gray-600 mb-6">Order credentials by relevance and recognition:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Industry-specific certifications first</li>
            <li>Advanced degrees second</li>
            <li>Other relevant credentials</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">David Chen, PMP, MBA</p>
            <p>Senior Consultant</p>
            <p className="mt-2 font-semibold">Strategic Solutions Group</p>
            <p className="mt-2">📱 (555) 123-4567</p>
            <p className="text-violet-600">dchen@ssg.com</p>
            <p className="text-violet-600">Schedule a consultation →</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Professional signature management</h3>
            <p className="text-gray-600 mb-6">Siggly helps professional services firms maintain credibility through consistent signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
