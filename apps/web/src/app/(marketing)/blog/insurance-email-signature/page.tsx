import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Insurance Agent Email Signatures: Compliance Guide | Siggly',
  description: 'Create compliant email signatures for insurance agents. Includes license numbers, carrier info, and regulatory requirements.',
  keywords: ['insurance agent email signature', 'insurance broker signature', 'insurance email compliance'],
  alternates: {
    canonical: 'https://siggly.io/blog/insurance-email-signature',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Insurance</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Insurance Agent Email Signatures: Compliance Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 1, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop" alt="Insurance documents" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Insurance professionals need signatures that display credentials and meet state licensing requirements while building trust with clients.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Required Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Full legal name</li>
            <li>State license number(s)</li>
            <li>Agency or carrier name</li>
            <li>Lines of authority (Life, Health, P&C)</li>
            <li>Contact information</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">State Requirements</h2>
          <p className="text-gray-600 mb-6">Many states require license numbers on insurance communications. Check your state's Department of Insurance for specific requirements.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Michael Chen</p>
            <p>Licensed Insurance Agent</p>
            <p>Life, Health & Property/Casualty</p>
            <p className="mt-2">Premier Insurance Agency</p>
            <p>📱 (555) 123-4567</p>
            <p className="text-violet-600">mchen@premierins.com</p>
            <p className="mt-2 text-gray-500 text-xs">CA License #0A12345 | TX License #1234567</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Multi-State Agents</h2>
          <p className="text-gray-600 mb-6">If licensed in multiple states, consider listing primary state or using "Licensed in [X] states" with a link to full details.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Compliant signatures for your agency</h3>
            <p className="text-gray-600 mb-6">Siggly helps insurance agencies deploy consistent, compliant signatures across all agents.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
