import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'How to Deploy Email Signatures in Google Workspace | Siggly',
  description: 'Deploy consistent email signatures across your Google Workspace organization. Step-by-step guide for IT admins using Admin Console or third-party tools.',
  keywords: ['google workspace email signature', 'deploy gmail signatures', 'google admin signature', 'gmail signature all users'],
  alternates: {
    canonical: 'https://siggly.io/blog/deploy-signatures-google-workspace',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Google Workspace</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">How to Deploy Email Signatures in Google Workspace</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 22, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 10 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=600&fit=crop" alt="Google Workspace" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Deploying consistent email signatures across a Google Workspace organization can be done through the Admin Console or specialized tools. Here's how each approach works.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Option 1: Google Admin Console</h2>
          <p className="text-gray-600 mb-6">Google Workspace includes basic signature management in the Admin Console. Here's how to set it up:</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Step 1: Access Gmail Settings</h3>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Go to admin.google.com</li>
            <li>Navigate to Apps → Google Workspace → Gmail</li>
            <li>Click on "Compliance" or "Default routing"</li>
          </ol>

          <h3 className="text-xl font-semibold mt-8 mb-3">Step 2: Create an Append Footer Rule</h3>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Click "Configure" under "Append footer"</li>
            <li>Name your rule (e.g., "Company Signature")</li>
            <li>Select which users/groups it applies to</li>
            <li>Enter your signature HTML in the footer text</li>
            <li>Save and test</li>
          </ol>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
            <p className="text-yellow-800 font-medium">Limitation: Google's append footer places signatures at the very bottom of emails, even below quoted replies. This looks unprofessional in threaded conversations.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Option 2: Google Workspace Marketplace Apps</h2>
          <p className="text-gray-600 mb-6">Third-party apps from the Google Workspace Marketplace offer more control:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Proper signature placement</strong> — Above quoted text</li>
            <li><strong>Visual editors</strong> — No HTML coding required</li>
            <li><strong>Dynamic variables</strong> — Auto-populate from directory</li>
            <li><strong>Campaign banners</strong> — Rotate promotional content</li>
            <li><strong>Analytics</strong> — Track signature performance</li>
          </ul>

          <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop" alt="Dashboard" width={800} height={400} className="rounded-xl my-8" />

          <h2 className="text-2xl font-bold mt-12 mb-4">Setting Up Dynamic Variables</h2>
          <p className="text-gray-600 mb-6">Google Workspace stores user information that can populate signatures automatically:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Display name</li>
            <li>Job title</li>
            <li>Department</li>
            <li>Phone numbers</li>
            <li>Manager</li>
            <li>Custom attributes</li>
          </ul>
          <p className="text-gray-600 mb-6">This means one template works for everyone — each user's signature automatically shows their specific information.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Deployment Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Test with a pilot group</strong> — Deploy to IT or a small team first</li>
            <li><strong>Clean your directory</strong> — Ensure user data is accurate before deployment</li>
            <li><strong>Communicate the change</strong> — Let employees know about the new signatures</li>
            <li><strong>Provide an opt-out</strong> — Consider exemptions for certain roles</li>
            <li><strong>Monitor feedback</strong> — Address issues quickly in the first week</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Common Deployment Issues</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Images Not Displaying</h3>
          <p className="text-gray-600 mb-6">Ensure images are hosted on publicly accessible URLs. Google Drive images need proper sharing permissions.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Signature Not Appearing</h3>
          <p className="text-gray-600 mb-6">Check that the user is in the correct organizational unit. Changes can take up to 24 hours to propagate.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Mobile Signatures Different</h3>
          <p className="text-gray-600 mb-6">Gmail mobile app uses a separate signature setting. Users may need to update their mobile settings manually or use a tool that syncs across devices.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Deploy signatures in minutes</h3>
            <p className="text-gray-600 mb-6">Siggly integrates with Google Workspace to deploy professional signatures across your entire organization with proper placement.</p>
            <Link href="/google-workspace"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
