import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Government Email Signatures: Compliance Guide | Siggly',
  description: 'Email signature requirements for government agencies. Official formatting, compliance, and accessibility considerations.',
  keywords: ['government email signature', 'public sector signature', 'agency email'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-government',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Government</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Government Email Signatures: Compliance Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 1, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=600&fit=crop" alt="Government building" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Government agencies have specific requirements for email communications. Signatures must be official, accessible, and compliant with regulations.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Required Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Full name and official title</li>
            <li>Department/agency name</li>
            <li>Official office address</li>
            <li>Work phone (no personal numbers)</li>
            <li>Official email address</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Accessibility Requirements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Alt text for all images (Section 508)</li>
            <li>Sufficient color contrast</li>
            <li>Screen reader compatibility</li>
            <li>Plain text alternative</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Jennifer Adams</p>
            <p>Program Manager</p>
            <p className="mt-2 font-semibold">Department of Environmental Services</p>
            <p>1234 Government Center, Room 456</p>
            <p>City, State 12345</p>
            <p className="mt-2">T: (555) 123-4567</p>
            <p className="text-violet-600">jadams@gov.state.us</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">What to Avoid</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Political messaging or endorsements</li>
            <li>Personal social media links</li>
            <li>Promotional content</li>
            <li>Unofficial logos or imagery</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Government-ready solutions</h3>
            <p className="text-gray-600 mb-6">Contact us to learn about Siggly's compliance features for government agencies.</p>
            <Link href="/contact"><Button>Contact Us <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
