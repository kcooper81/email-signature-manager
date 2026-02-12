import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Construction Company Email Signatures: Contractor Guide | Siggly',
  description: 'Create professional email signatures for construction companies and contractors. Include license info and build client trust.',
  keywords: ['construction email signature', 'contractor email signature', 'builder email signature'],
  alternates: {
    canonical: 'https://siggly.io/blog/construction-email-signature',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Construction</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Construction Company Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 27, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=600&fit=crop" alt="Construction site" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Construction professionals need signatures that convey reliability and include required licensing information while making it easy for clients and subcontractors to connect.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Essential Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Full name and title</li>
            <li>Company name</li>
            <li>Contractor license number</li>
            <li>Mobile phone (critical for job sites)</li>
            <li>Office phone</li>
            <li>Service area</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Mike Thompson</p>
            <p>Project Manager</p>
            <p className="mt-2 font-semibold">Thompson Construction Co.</p>
            <p className="mt-2">📱 (555) 123-4567</p>
            <p>Office: (555) 987-6543</p>
            <p className="text-violet-600">mike@thompsonconst.com</p>
            <p className="text-violet-600">www.thompsonconst.com</p>
            <p className="mt-2 text-gray-500 text-xs">License #12345 | Bonded & Insured</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Trust Signals</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>License number (required in most states)</li>
            <li>Bonded & Insured statement</li>
            <li>Industry certifications</li>
            <li>BBB rating or reviews</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Professional signatures for your crew</h3>
            <p className="text-gray-600 mb-6">Siggly helps construction companies maintain consistent professional image.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
