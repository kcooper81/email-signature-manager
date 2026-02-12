import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Promoting Webinars Through Email Signatures | Siggly',
  description: 'Use email signatures to promote webinars and virtual events. Banners, CTAs, and timing strategies for event promotion.',
  keywords: ['email signature webinar', 'promote webinar signature', 'event banner email'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-webinar-promotion',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Events</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Promoting Webinars Through Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 25, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=600&fit=crop" alt="Webinar promotion" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Email signatures are an underused channel for webinar promotion. Every email becomes an opportunity to drive registrations.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Banner Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Webinar title</li>
            <li>Date and time</li>
            <li>Key speaker or topic highlight</li>
            <li>Clear "Register" CTA</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Banner Text</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>"🎥 Free Webinar: [Topic] — March 15 @ 2pm ET"</li>
            <li>"Join our live workshop: [Topic] — Register free"</li>
            <li>"Don't miss: [Speaker] on [Topic] — Save your spot"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Timing Strategy</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>2-3 weeks before:</strong> Launch banner</li>
            <li><strong>1 week before:</strong> Add urgency ("Next week!")</li>
            <li><strong>Day of:</strong> "Happening today" message</li>
            <li><strong>After:</strong> "Watch the recording" link</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Team Deployment</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Deploy to all customer-facing teams</li>
            <li>Consider role-specific audiences</li>
            <li>Track registrations by source</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Tip: Remember to remove or update the webinar banner after the event ends!</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Event promotion made easy</h3>
            <p className="text-gray-600 mb-6">Siggly lets you schedule webinar banners in advance and deploy across your team.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
