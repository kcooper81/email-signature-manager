import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'How to Update Email Signatures: Complete Guide | Siggly',
  description: 'Update email signatures across Gmail, Outlook, and Apple Mail. Step-by-step instructions for changing your signature on any platform.',
  keywords: ['update email signature', 'change email signature', 'edit email signature'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">How-To</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">How to Update Email Signatures: Complete Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 21, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&h=600&fit=crop" alt="Computer setup" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Need to update your email signature? Here's how to do it in every major email client.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Gmail (Web)</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Click the gear icon → "See all settings"</li>
            <li>Scroll to "Signature" section</li>
            <li>Select your signature or create new</li>
            <li>Edit the content</li>
            <li>Scroll down and click "Save Changes"</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Outlook (Desktop)</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Go to File → Options → Mail</li>
            <li>Click "Signatures..."</li>
            <li>Select signature to edit</li>
            <li>Make your changes</li>
            <li>Click OK to save</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Outlook (Web)</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Click Settings gear → "View all Outlook settings"</li>
            <li>Go to Mail → Compose and reply</li>
            <li>Edit signature in the editor</li>
            <li>Click Save</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Apple Mail</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Go to Mail → Preferences (or Settings)</li>
            <li>Click "Signatures" tab</li>
            <li>Select account and signature</li>
            <li>Edit in the right panel</li>
            <li>Close window to save</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">When to Update</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>New job title or role</li>
            <li>New phone number</li>
            <li>Company rebranding</li>
            <li>Quarterly campaign changes</li>
            <li>Outdated information</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Remember: If you use multiple devices, you may need to update the signature on each one separately.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Update once, deploy everywhere</h3>
            <p className="text-gray-600 mb-6">With Siggly, update your signature in one place and it syncs to all your devices automatically.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
