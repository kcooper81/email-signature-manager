import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Consulting Firm Email Signatures: Professional Guide | Siggly',
  description: 'Create polished email signatures for consultants and consulting firms. Build credibility and make it easy for clients to connect.',
  keywords: ['consulting email signature', 'consultant signature', 'management consulting email'],
  alternates: {
    canonical: 'https://siggly.io/blog/consulting-firm-email-signature',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Consulting</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Consulting Firm Email Signatures: Professional Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 29, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop" alt="Consulting meeting" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Consultants sell expertise. Your email signature should reinforce your professional credibility while making it easy for clients and prospects to connect.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Key Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Name and relevant credentials</li>
            <li>Title and practice area</li>
            <li>Firm name</li>
            <li>Mobile number (consultants are often mobile)</li>
            <li>LinkedIn profile (builds credibility)</li>
            <li>Calendar booking link (for prospect calls)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Credential Display</h2>
          <p className="text-gray-600 mb-6">Include credentials that matter to clients:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>MBA, PhD for academic credibility</li>
            <li>PMP for project management</li>
            <li>Industry certifications (Six Sigma, etc.)</li>
            <li>Relevant professional memberships</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Alexandra Chen, MBA</p>
            <p>Principal | Digital Transformation</p>
            <p className="mt-2">Strategy Partners Consulting</p>
            <p className="mt-2">📱 (555) 123-4567</p>
            <p className="text-violet-600">achen@strategypartners.com</p>
            <p className="text-violet-600">LinkedIn</p>
            <p className="mt-2 text-violet-600 font-medium">📅 Schedule a call</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Independent Consultants</h2>
          <p className="text-gray-600 mb-6">Solo consultants should still present professionally with firm-style signatures, even if the "firm" is just you.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Polished signatures for consultants</h3>
            <p className="text-gray-600 mb-6">Siggly helps consulting firms maintain consistent professional image across all consultants.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
