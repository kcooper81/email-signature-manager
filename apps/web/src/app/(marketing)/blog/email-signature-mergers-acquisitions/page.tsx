import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signatures During M&A: Transition Guide | Siggly',
  description: 'Manage email signature transitions during mergers and acquisitions. Planning, timing, and execution for brand consolidation.',
  keywords: ['email signature merger', 'acquisition rebrand signature', 'company merger email'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-mergers-acquisitions',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">M&A</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signatures During M&A Transitions</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 29, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop" alt="Business merger" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Mergers and acquisitions require careful signature transitions. Email is often the first place customers see the new brand.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Transition Phases</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Pre-announcement:</strong> Maintain existing signatures</li>
            <li><strong>Announcement:</strong> Add transition messaging</li>
            <li><strong>Transition:</strong> Dual branding if needed</li>
            <li><strong>Consolidation:</strong> Single new brand</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Transition Messaging Examples</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>"Company A is now part of Company B"</li>
            <li>"Exciting news: We've joined forces with..."</li>
            <li>"Same great team, new name"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Implementation Checklist</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Coordinate with legal on announcement timing</li>
            <li>Prepare new brand assets</li>
            <li>Plan simultaneous deployment across entities</li>
            <li>Test before launch date</li>
            <li>Communicate changes to employees</li>
            <li>Update after transition period ends</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Common Challenges</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Different email platforms between companies</li>
            <li>Timing coordination across organizations</li>
            <li>Multiple brand identities during transition</li>
            <li>Employee communication</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Smooth M&A transitions</h3>
            <p className="text-gray-600 mb-6">Siggly helps companies manage signature changes during mergers and acquisitions.</p>
            <Link href="/contact"><Button>Contact Us <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
