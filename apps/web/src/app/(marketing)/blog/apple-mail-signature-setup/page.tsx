import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Apple Mail Signature Setup: Mac & iPhone Guide | Siggly',
  description: 'Set up email signatures in Apple Mail on Mac and iPhone. Step-by-step instructions for creating and managing signatures.',
  keywords: ['apple mail signature', 'mac email signature', 'iphone signature setup'],
  alternates: {
    canonical: 'https://siggly.io/blog/apple-mail-signature-setup',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Apple</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Apple Mail Signature Setup: Mac & iPhone Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 18, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&h=600&fit=crop" alt="Apple devices" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Apple Mail handles signatures differently than other email clients. Here's how to set them up on Mac and iOS devices.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Mac (Apple Mail)</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Open Mail app</li>
            <li>Go to Mail → Settings (or Preferences)</li>
            <li>Click "Signatures" tab</li>
            <li>Click + to create new signature</li>
            <li>Select account to associate with</li>
            <li>Type or paste your signature in right panel</li>
            <li>Drag signature to account to assign</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Adding HTML Signature on Mac</h2>
          <p className="text-gray-600 mb-6">Apple Mail doesn't have an HTML editor, but you can add rich signatures:</p>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Create signature in Mail (any placeholder text)</li>
            <li>Close Mail completely</li>
            <li>Find signature files at ~/Library/Mail/V#/MailData/Signatures/</li>
            <li>Edit the .mailsignature file with your HTML</li>
            <li>Lock the file to prevent changes (optional)</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">iPhone/iPad</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Open Settings app</li>
            <li>Scroll down → Mail</li>
            <li>Tap "Signature"</li>
            <li>Choose "All Accounts" or "Per Account"</li>
            <li>Type your signature (plain text only)</li>
          </ol>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
            <p className="text-yellow-800 font-medium">Limitation: iOS Mail only supports plain text signatures. No images, formatting, or HTML.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Sync Challenges</h2>
          <p className="text-gray-600 mb-6">Apple Mail signatures don't sync between devices via iCloud. You need to set them up separately on each Mac, iPhone, and iPad.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Sync across all Apple devices</h3>
            <p className="text-gray-600 mb-6">Siggly can deploy signatures to Apple Mail on Mac, solving the sync problem.</p>
            <Link href="/signup"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
