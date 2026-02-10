import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Managing Email Signatures in Google Workspace | Siggly Blog',
  description: 'A step-by-step guide to deploying consistent signatures across your entire Google Workspace organization.',
};

export default function BlogPost() {
  return (
    <>
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
          </Link>

          <div className="mb-8">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Tutorials</span>
          </div>

          <h1 className="text-4xl font-bold mb-6">Managing Email Signatures in Google Workspace</h1>

          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 14, 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
          </div>

          <Image
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=600&fit=crop"
            alt="Google Workspace email management"
            width={1200}
            height={600}
            className="rounded-2xl mb-12"
          />

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Google Workspace is the backbone of communication for millions of businesses. But managing 
              email signatures across your organization can be challenging without the right approach.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">The Challenge with Gmail Signatures</h2>
            <p className="text-gray-600 mb-6">
              By default, Gmail lets each user set their own signature in Settings. This creates problems:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>No central control over branding</li>
              <li>Users forget to update their signatures</li>
              <li>Inconsistent formatting across the organization</li>
              <li>No way to add company-wide announcements</li>
            </ul>

            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop"
              alt="Team working on computers"
              width={800}
              height={400}
              className="rounded-xl my-8"
            />

            <h2 className="text-2xl font-bold mt-12 mb-4">Option 1: Manual Management (Not Recommended)</h2>
            <p className="text-gray-600 mb-6">
              The simplest approach is to email everyone an HTML signature and ask them to paste it into 
              their Gmail settings. However, this approach has significant drawbacks:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Relies on users to actually do it</li>
              <li>No way to verify compliance</li>
              <li>Updates require repeating the process</li>
              <li>Doesn't work for mobile Gmail app</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Option 2: Google Admin Console</h2>
            <p className="text-gray-600 mb-6">
              Google Workspace admins can set organization-wide signatures through the Admin Console. 
              This provides more control but has limitations:
            </p>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6 my-8">
              <h4 className="font-semibold text-yellow-800 mb-2">Admin Console Limitations:</h4>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Limited design options</li>
                <li>• No visual editor</li>
                <li>• Complex to set up per-user dynamic fields</li>
                <li>• No campaign banner support</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Option 3: Third-Party Signature Management (Recommended)</h2>
            <p className="text-gray-600 mb-6">
              Tools like Siggly integrate directly with Google Workspace to provide the best of both worlds: 
              central control with powerful features.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">How Siggly Works with Google Workspace</h3>
            <ol className="list-decimal pl-6 text-gray-600 space-y-3 mb-6">
              <li><strong>Connect your Workspace:</strong> One-click OAuth connection with admin consent</li>
              <li><strong>Import your users:</strong> Automatically sync users from Google Directory</li>
              <li><strong>Design your templates:</strong> Use the visual editor to create on-brand signatures</li>
              <li><strong>Deploy to everyone:</strong> Push signatures to all users with one click</li>
            </ol>

            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
              alt="Dashboard analytics"
              width={800}
              height={400}
              className="rounded-xl my-8"
            />

            <h3 className="text-xl font-semibold mt-8 mb-3">Google Calendar Integration</h3>
            <p className="text-gray-600 mb-6">
              Siggly also integrates with Google Calendar to add powerful scheduling features to your signatures:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Booking Links:</strong> Employees can add their Google Calendar appointment scheduling links directly to their signatures, making it easy for recipients to book meetings</li>
              <li><strong>Out-of-Office Banners:</strong> Siggly automatically detects when employees are on vacation from their Google Calendar and displays a dynamic OOO banner with their return date</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Step-by-Step: Setting Up Siggly for Google Workspace</h2>
            
            <div className="space-y-6 my-8">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold mb-2">Step 1: Create Your Account</h4>
                <p className="text-gray-600 text-sm">Sign up for Siggly with your work email. An organization will be created automatically.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold mb-2">Step 2: Connect Google Workspace</h4>
                <p className="text-gray-600 text-sm">Go to Integrations and click "Connect Google Workspace". Sign in with your admin account and grant permissions.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold mb-2">Step 3: Sync Your Users</h4>
                <p className="text-gray-600 text-sm">Click "Sync Users" to import all users from your Google Directory. Their names, titles, and departments will be pulled automatically.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold mb-2">Step 4: Create a Template</h4>
                <p className="text-gray-600 text-sm">Use the visual editor to design your signature. Add your logo, choose colors, and set up dynamic fields.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold mb-2">Step 5: Deploy</h4>
                <p className="text-gray-600 text-sm">Select your template and users, then click Deploy. Signatures will be pushed to Gmail within seconds.</p>
              </div>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-xl p-8 my-12">
              <h3 className="text-xl font-bold mb-4">Ready to manage your Google Workspace signatures?</h3>
              <p className="text-gray-600 mb-6">
                Connect your Workspace and deploy professional signatures in under 5 minutes.
              </p>
              <Link href="/signup">
                <Button>Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

    </>
  );
}
