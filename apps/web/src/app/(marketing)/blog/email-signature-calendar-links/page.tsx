import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Add Calendar Booking Links to Email Signatures | Siggly',
  description: 'Add Calendly, HubSpot, or Cal.com booking links to your email signature. Reduce scheduling friction and book more meetings.',
  keywords: ['email signature calendar link', 'calendly signature', 'meeting link email signature'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Productivity</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Add Calendar Booking Links to Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 2, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&h=600&fit=crop" alt="Calendar scheduling" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">A calendar booking link in your signature eliminates back-and-forth scheduling emails. Recipients can book time with you instantly.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Why Add a Booking Link?</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Reduce friction</strong> — No more "when works for you?" emails</li>
            <li><strong>Save time</strong> — Eliminate 5-10 scheduling emails per meeting</li>
            <li><strong>Book more meetings</strong> — Easy = more people book</li>
            <li><strong>Professional image</strong> — Shows you value efficiency</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Popular Scheduling Tools</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Calendly</strong> — Most popular, easy setup</li>
            <li><strong>HubSpot Meetings</strong> — Free with HubSpot CRM</li>
            <li><strong>Cal.com</strong> — Open source alternative</li>
            <li><strong>Microsoft Bookings</strong> — Included with M365</li>
            <li><strong>Google Calendar</strong> — Appointment schedules feature</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">How to Add It</h2>
          <p className="text-gray-600 mb-6">Options for displaying your booking link:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Text link:</strong> "Schedule a call" hyperlinked</li>
            <li><strong>Button style:</strong> Styled CTA that stands out</li>
            <li><strong>Icon + text:</strong> Calendar emoji + "Book time"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold">Sarah Johnson</p>
            <p>Sales Director | Acme Corp</p>
            <p className="mt-2">(555) 123-4567</p>
            <p className="mt-3 p-2 bg-violet-100 rounded text-center">
              <span className="text-violet-700 font-medium">📅 Schedule a 15-min call</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Use a short, descriptive link text</li>
            <li>Specify meeting length (15 min, 30 min)</li>
            <li>Make it visually distinct but not overwhelming</li>
            <li>Test the link regularly to ensure it works</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Add booking links easily</h3>
            <p className="text-gray-600 mb-6">Siggly makes it simple to add styled booking links to your team's signatures.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
