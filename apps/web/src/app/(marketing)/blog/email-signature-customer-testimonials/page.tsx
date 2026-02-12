import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Using Testimonials in Email Signatures | Siggly',
  description: 'Include customer testimonials and reviews in email signatures. Social proof that builds trust with every email sent.',
  keywords: ['testimonial email signature', 'customer review signature', 'social proof email'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-customer-testimonials',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Testimonials</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Using Testimonials in Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 1, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop" alt="Customer testimonials" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Customer testimonials build trust. Including them in signatures puts social proof in front of every recipient.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Testimonial Formats</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Short quote (one line)</li>
            <li>Star rating display</li>
            <li>Review platform badge (G2, Capterra)</li>
            <li>Case study link</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Implementations</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>"⭐⭐⭐⭐⭐ 4.9/5 on G2"</li>
            <li>"'Best tool we've ever used' — Customer Name"</li>
            <li>"See why 1,000+ companies trust us"</li>
            <li>"Read our customer success stories →"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Get permission to use customer names</li>
            <li>Keep quotes very short (signature space limited)</li>
            <li>Link to full testimonials page</li>
            <li>Rotate testimonials periodically</li>
            <li>Use authentic, real reviews</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Where to Display</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Sales team signatures (most impact)</li>
            <li>Customer success signatures</li>
            <li>Company-wide for major milestones</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Build trust with every email</h3>
            <p className="text-gray-600 mb-6">Siggly makes it easy to include testimonials in team signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
