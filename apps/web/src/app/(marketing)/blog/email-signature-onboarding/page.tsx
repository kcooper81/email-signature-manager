import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Onboarding: New Employee Setup Guide | Siggly',
  description: 'Streamline email signature setup for new hires. Create an efficient onboarding process that gets signatures right from day one.',
  keywords: ['email signature onboarding', 'new employee signature', 'signature setup process'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-onboarding',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">HR & Onboarding</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Onboarding: New Employee Setup</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 3, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop" alt="Employee onboarding" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Getting email signatures right during onboarding sets the tone for brand consistency. Here's how to make signature setup seamless for new hires.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">The Onboarding Challenge</h2>
          <p className="text-gray-600 mb-6">New employees often start with:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>No signature at all</li>
            <li>Default "Sent from iPhone" signatures</li>
            <li>Self-created signatures that don't match brand</li>
            <li>Copy-pasted signatures with wrong information</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Ideal Onboarding Flow</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Day 0:</strong> IT creates user account with correct directory info</li>
            <li><strong>Day 1:</strong> Signature automatically deployed via management tool</li>
            <li><strong>Day 1:</strong> Employee verifies signature looks correct</li>
            <li><strong>Done:</strong> No manual setup required</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Manual Process (If Needed)</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Include signature setup in IT onboarding checklist</li>
            <li>Provide template and clear instructions</li>
            <li>Verify setup before employee sends first emails</li>
            <li>Document the process for consistency</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Directory Data Matters</h2>
          <p className="text-gray-600 mb-6">For automatic signatures to work, ensure HR enters complete data:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Full name (as it should appear)</li>
            <li>Job title</li>
            <li>Department</li>
            <li>Phone number</li>
            <li>Office location (if relevant)</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Zero-touch onboarding</h3>
            <p className="text-gray-600 mb-6">Siggly automatically deploys signatures to new users when they're added to your directory.</p>
            <Link href="/signup"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
