import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Directory Sync: Automate Updates | Siggly',
  description: 'Sync email signatures with your user directory. Automatically update signatures when employee info changes in AD or Google Directory.',
  keywords: ['email signature directory sync', 'active directory signature', 'auto update signatures'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-directory-sync',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">IT Admin</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Directory Sync: Automate Updates</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 12, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop" alt="Directory sync" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Directory sync ensures signatures automatically reflect current employee information. When someone gets promoted, their signature updates without manual intervention.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">How It Works</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Signature tool connects to your directory (AD, Google, etc.)</li>
            <li>User attributes are mapped to signature fields</li>
            <li>Changes in directory automatically update signatures</li>
            <li>Signatures deploy to email clients</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Common Directory Attributes</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Display name</li>
            <li>Job title</li>
            <li>Department</li>
            <li>Phone numbers (office, mobile)</li>
            <li>Office location</li>
            <li>Manager</li>
            <li>Custom attributes</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Benefits</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Accuracy</strong> — Single source of truth</li>
            <li><strong>Automation</strong> — No manual updates needed</li>
            <li><strong>Consistency</strong> — Everyone's info stays current</li>
            <li><strong>Reduced IT work</strong> — Fewer signature support tickets</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Keep directory data clean and complete</li>
            <li>Standardize job titles and departments</li>
            <li>Include directory updates in HR processes</li>
            <li>Test sync before broad deployment</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Automatic directory sync</h3>
            <p className="text-gray-600 mb-6">Siggly syncs with Google Workspace and Microsoft 365 directories to keep signatures current.</p>
            <Link href="/integrations"><Button>View Integrations <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
