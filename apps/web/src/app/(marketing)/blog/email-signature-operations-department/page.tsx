import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Operations Department Email Signatures | Siggly',
  description: 'Email signature best practices for operations teams. Practical signatures for logistics, facilities, and operational roles.',
  keywords: ['operations email signature', 'logistics signature', 'ops team email'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Operations</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Operations Department Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 19, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop" alt="Operations" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Operations teams need practical, efficient signatures that facilitate quick communication with vendors, partners, and internal teams.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Key Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Name and specific role</li>
            <li>Department/facility</li>
            <li>Mobile phone (for urgent matters)</li>
            <li>Location/site</li>
            <li>Hours of availability</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Role-Specific Variations</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Logistics:</strong> Shipping/receiving hours, dock info</li>
            <li><strong>Facilities:</strong> Emergency contact, work order link</li>
            <li><strong>Procurement:</strong> PO submission portal</li>
            <li><strong>Project management:</strong> Project portal link</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">James Wilson</p>
            <p>Operations Manager</p>
            <p className="mt-2 font-semibold">Acme Distribution Center</p>
            <p className="text-gray-600">1234 Warehouse Rd, Chicago, IL</p>
            <p className="mt-2">📱 (555) 123-4567 (emergencies)</p>
            <p className="text-violet-600">jwilson@acme.com</p>
            <p className="text-gray-600 text-xs mt-2">Receiving hours: M-F 7am-4pm CT</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Ops-ready signatures</h3>
            <p className="text-gray-600 mb-6">Siggly helps operations teams create practical, informative signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
