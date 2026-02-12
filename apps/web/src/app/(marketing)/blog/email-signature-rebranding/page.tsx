import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Updating Email Signatures During Rebranding | Siggly',
  description: 'How to update email signatures during a company rebrand. Plan and execute signature rollout for new logos, colors, and messaging.',
  keywords: ['email signature rebrand', 'update company signature', 'signature brand refresh'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-rebranding',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Rebranding</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Updating Email Signatures During Rebranding</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 13, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=600&fit=crop" alt="Brand design" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">A rebrand means updating everything — including email signatures. Here's how to execute a smooth signature rollout.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Planning the Rollout</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Set a launch date aligned with broader rebrand</li>
            <li>Prepare new templates with updated assets</li>
            <li>Test on multiple email clients</li>
            <li>Create communication for employees</li>
            <li>Plan for simultaneous deployment</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">What Typically Changes</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Company logo</li>
            <li>Brand colors</li>
            <li>Company name (if changing)</li>
            <li>Tagline or positioning</li>
            <li>Website URL (if changing)</li>
            <li>Social media handles</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Execution Steps</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Finalize new signature design with marketing</li>
            <li>Upload new logo and assets</li>
            <li>Create new templates</li>
            <li>Test thoroughly before launch date</li>
            <li>Deploy to all employees on launch day</li>
            <li>Communicate the change internally</li>
            <li>Verify deployment and address issues</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Common Challenges</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Coordinating timing with broader launch</li>
            <li>Ensuring all employees update simultaneously</li>
            <li>Legacy systems with old signatures</li>
            <li>Mobile devices with separate signatures</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Tip: Centralized signature management makes rebrand rollouts significantly easier — update once, deploy everywhere.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Rebrand rollout made easy</h3>
            <p className="text-gray-600 mb-6">Siggly lets you update all signatures instantly when your brand changes.</p>
            <Link href="/signup"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
