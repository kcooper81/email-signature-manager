import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Manufacturing Company Email Signatures | Siggly',
  description: 'Email signature best practices for manufacturing companies. Professional signatures for sales, engineering, and plant management.',
  keywords: ['manufacturing email signature', 'industrial email signature', 'factory email'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Manufacturing</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Manufacturing Company Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 2, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop" alt="Manufacturing facility" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Manufacturing companies communicate with distributors, suppliers, and customers worldwide. Professional signatures build trust across the supply chain.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Key Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Name and title</li>
            <li>Company name</li>
            <li>Direct phone (critical for time-sensitive orders)</li>
            <li>Plant/facility location</li>
            <li>Certifications (ISO, etc.)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Role-Specific Signatures</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Sales:</strong> Product catalog links, quote requests</li>
            <li><strong>Engineering:</strong> Technical credentials, CAD availability</li>
            <li><strong>Plant management:</strong> Facility info, emergency contacts</li>
            <li><strong>Quality:</strong> Certifications, compliance info</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">John Martinez</p>
            <p>Regional Sales Manager</p>
            <p className="mt-2 font-semibold">Precision Parts Manufacturing</p>
            <p className="text-gray-600">ISO 9001:2015 Certified</p>
            <p className="mt-2">📱 (555) 123-4567</p>
            <p className="text-violet-600">jmartinez@precisionparts.com</p>
            <p className="text-violet-600">Request a quote →</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Signatures for manufacturing</h3>
            <p className="text-gray-600 mb-6">Siggly helps manufacturing companies maintain professional signatures across all locations.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
