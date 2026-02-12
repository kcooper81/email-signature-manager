import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Hospitality Email Signatures: Hotels & Restaurants | Siggly',
  description: 'Create welcoming email signatures for hospitality businesses. Hotels, restaurants, and event venues can build guest relationships.',
  keywords: ['hotel email signature', 'hospitality signature', 'restaurant email signature'],
  alternates: {
    canonical: 'https://siggly.io/blog/hospitality-email-signature',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Hospitality</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Hospitality Email Signatures: Hotels & Restaurants</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 26, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop" alt="Hotel lobby" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Hospitality is about creating experiences. Your email signature should reflect the warmth and professionalism guests expect from your property.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Hotel Signature Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Name and title</li>
            <li>Property name and brand (if applicable)</li>
            <li>Department (Front Desk, Concierge, Sales)</li>
            <li>Direct line and hotel main number</li>
            <li>Reservation/booking link</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Hotel Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Emily Rodriguez</p>
            <p>Guest Services Manager</p>
            <p className="mt-2 font-semibold">The Grand Hotel</p>
            <p className="italic text-gray-600">Where memories are made</p>
            <p className="mt-2">T: (555) 123-4567</p>
            <p className="text-violet-600">erodriguez@grandhotel.com</p>
            <p className="text-violet-600">Book your stay →</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Restaurant Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">James Chen</p>
            <p>General Manager</p>
            <p className="mt-2 font-semibold">Bistro 55</p>
            <p className="mt-2">(555) 987-6543</p>
            <p className="text-violet-600">reservations@bistro55.com</p>
            <p className="text-violet-600 font-medium">Reserve a table →</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Promotional Opportunities</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Seasonal specials and packages</li>
            <li>Events and happenings</li>
            <li>Loyalty program signup</li>
            <li>Review request links</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Signatures for hospitality</h3>
            <p className="text-gray-600 mb-6">Siggly helps hotels and restaurants maintain consistent guest communication.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
