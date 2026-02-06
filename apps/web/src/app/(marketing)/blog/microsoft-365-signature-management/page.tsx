import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Microsoft 365 Email Signature Management Guide | Siggly',
  description: 'Deploy and manage email signatures across your Microsoft 365 organization. Learn about transport rules, OWA signatures, and centralized management.',
  keywords: ['microsoft 365 email signature', 'office 365 signature management', 'outlook signature deployment'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Microsoft 365</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Microsoft 365 Email Signature Management Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 31, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 10 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=1200&h=600&fit=crop" alt="Microsoft Office apps" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Managing email signatures for a Microsoft 365 organization presents unique challenges. This guide covers the native options available and their limitations.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Native M365 Signature Options</h2>
          <p className="text-gray-600 mb-6">Microsoft 365 provides several ways to manage signatures, each with tradeoffs:</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">1. Exchange Transport Rules</h3>
          <p className="text-gray-600 mb-6">Transport rules append signatures server-side, ensuring every email gets a signature regardless of which device or client is used.</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Pros:</strong> Consistent, works on all devices, users can't modify</li>
            <li><strong>Cons:</strong> Limited HTML support, signature appears after reply text, complex setup</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">2. Outlook Client Signatures</h3>
          <p className="text-gray-600 mb-6">Each user configures their own signature in Outlook settings. IT can push default signatures via Group Policy.</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Pros:</strong> Rich HTML support, signature appears in correct position</li>
            <li><strong>Cons:</strong> Users can modify or delete, doesn't sync across devices, manual updates</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">3. Outlook on the Web Signatures</h3>
          <p className="text-gray-600 mb-6">OWA has its own signature settings separate from desktop Outlook, requiring users to configure signatures in multiple places.</p>

          <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop" alt="Dashboard analytics" width={800} height={400} className="rounded-xl my-8" />

          <h2 className="text-2xl font-bold mt-12 mb-4">Setting Up Transport Rules</h2>
          <p className="text-gray-600 mb-6">To create a signature via Exchange transport rules:</p>
          <ol className="list-decimal pl-6 text-gray-600 space-y-3 mb-6">
            <li>Go to Exchange Admin Center → Mail flow → Rules</li>
            <li>Click "Add a rule" → "Apply disclaimers"</li>
            <li>Set conditions (e.g., sender is member of organization)</li>
            <li>Enter your HTML signature in the disclaimer text</li>
            <li>Choose fallback action if signature can't be applied</li>
            <li>Save and test with a few users before broad deployment</li>
          </ol>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Limitation: Transport rules place signatures at the very bottom of emails, even below the quoted reply text. This looks unprofessional in threaded conversations.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Dynamic Variables</h2>
          <p className="text-gray-600 mb-6">Transport rules support Azure AD attributes as variables:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>%%DisplayName%% — User's display name</li>
            <li>%%Title%% — Job title</li>
            <li>%%Department%% — Department</li>
            <li>%%PhoneNumber%% — Office phone</li>
            <li>%%MobilePhone%% — Mobile number</li>
          </ul>
          <p className="text-gray-600 mb-6">These pull from Azure AD, so your directory must be up-to-date for accurate signatures.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">The Challenges</h2>
          <p className="text-gray-600 mb-6">Organizations commonly struggle with:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Signature placement</strong> — Transport rules put signatures in the wrong place</li>
            <li><strong>Design limitations</strong> — Native tools offer limited HTML/CSS support</li>
            <li><strong>Multiple devices</strong> — Desktop, web, and mobile need separate configuration</li>
            <li><strong>User compliance</strong> — Employees modify or remove their signatures</li>
            <li><strong>Update management</strong> — Changing signatures requires touching every user</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Third-Party Solutions</h2>
          <p className="text-gray-600 mb-6">Dedicated signature management tools solve these problems by integrating directly with Microsoft 365 via the Graph API. They provide:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Visual signature designers</li>
            <li>Proper signature placement (before quoted text)</li>
            <li>Automatic syncing across all devices</li>
            <li>Centralized template management</li>
            <li>User directory integration</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Simplify M365 signature management</h3>
            <p className="text-gray-600 mb-6">Siggly integrates with Microsoft 365 to deploy professional signatures across your organization in minutes.</p>
            <Link href="/integrations/microsoft-365"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
