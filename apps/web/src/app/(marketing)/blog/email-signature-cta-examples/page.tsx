import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature CTA Examples: Drive Action | Siggly',
  description: 'Effective call-to-action examples for email signatures. Book meetings, drive downloads, and generate leads from your signature.',
  keywords: ['email signature cta', 'signature call to action', 'email signature button'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-cta-examples',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Marketing</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature CTA Examples: Drive Action</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 15, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop" alt="Marketing metrics" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">A strategic CTA in your email signature can drive significant action. Here are examples that convert.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Meeting/Booking CTAs</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>📅 Schedule a call</li>
            <li>Book a free consultation</li>
            <li>Let's chat →</li>
            <li>Pick a time to connect</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Content/Resource CTAs</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>📖 Download our free guide</li>
            <li>Read our latest case study</li>
            <li>Get the industry report →</li>
            <li>Watch the demo</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Product CTAs</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Try [Product] free</li>
            <li>See what's new →</li>
            <li>Start your free trial</li>
            <li>Request a demo</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Event CTAs</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>🎟️ Register for our webinar</li>
            <li>Join us at [Event]</li>
            <li>Save your spot →</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">CTA Design Tips</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Make it visually distinct (button style or color)</li>
            <li>Keep text short (2-4 words)</li>
            <li>Use action verbs</li>
            <li>Create urgency when appropriate</li>
            <li>Only one CTA per signature</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Add CTAs that convert</h3>
            <p className="text-gray-600 mb-6">Siggly makes it easy to add styled CTAs with click tracking to measure performance.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
