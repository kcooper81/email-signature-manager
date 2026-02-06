import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signatures for Product Launch Campaigns | Siggly',
  description: 'Use email signatures to amplify product launches. Create excitement, drive signups, and coordinate team messaging.',
  keywords: ['product launch email signature', 'launch announcement signature', 'new product email'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Product Marketing</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signatures for Product Launch Campaigns</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 23, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=600&fit=crop" alt="Product launch" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Product launches benefit from multi-channel promotion. Email signatures ensure every team member amplifies your announcement.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Launch Timeline</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Pre-launch:</strong> Teaser banners, waitlist signups</li>
            <li><strong>Launch day:</strong> "Now available" announcement</li>
            <li><strong>Post-launch:</strong> "Try our new [product]" CTAs</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Banner Examples</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>"🚀 Coming soon: [Product Name]"</li>
            <li>"Just launched: [Product] — Try it free"</li>
            <li>"New: [Feature] is here — See what's new"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Team Coordination</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Deploy signature updates simultaneously</li>
            <li>Ensure all teams have the same message</li>
            <li>Consider role-specific variants (sales vs support)</li>
            <li>Schedule removal of launch banners</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Link to landing page with launch details</li>
            <li>Create urgency for limited-time offers</li>
            <li>Track clicks to measure interest</li>
            <li>Update messaging as launch progresses</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Launch with impact</h3>
            <p className="text-gray-600 mb-6">Siggly helps coordinate signature campaigns across your entire organization.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
