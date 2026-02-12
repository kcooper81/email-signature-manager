import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Mobile Email Signature Guide: iOS & Android Setup | Siggly',
  description: 'Set up professional email signatures on iPhone and Android. Learn mobile-specific best practices for Gmail, Outlook, and Apple Mail apps.',
  keywords: ['mobile email signature', 'iphone email signature', 'android email signature', 'gmail mobile signature'],
  alternates: {
    canonical: 'https://siggly.io/blog/mobile-email-signature-guide',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Mobile</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Mobile Email Signature Guide: iOS & Android Setup</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 21, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop" alt="Mobile devices" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Over 60% of emails are read on mobile devices. Your signature needs to look professional on small screens too. Here's how to set up mobile signatures across popular apps.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">iPhone Mail App</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Open Settings → Mail</li>
            <li>Scroll down to "Signature"</li>
            <li>Choose "Per Account" if you have multiple accounts</li>
            <li>Type your signature text</li>
          </ol>
          <p className="text-gray-600 mb-6"><strong>Limitation:</strong> Apple Mail only supports plain text signatures. No images, formatting, or HTML.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Gmail App (iOS & Android)</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Open Gmail app → tap menu (☰)</li>
            <li>Scroll down → Settings</li>
            <li>Select your account</li>
            <li>Tap "Mobile Signature"</li>
            <li>Enter your signature</li>
          </ol>
          <p className="text-gray-600 mb-6"><strong>Note:</strong> Gmail mobile signature is separate from your web Gmail signature. They don't sync automatically.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Outlook App (iOS & Android)</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Tap your profile picture</li>
            <li>Tap the gear icon (Settings)</li>
            <li>Select "Signature"</li>
            <li>Toggle "Per Account Signature" for multiple accounts</li>
            <li>Edit your signature text</li>
          </ol>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Replace "Sent from Outlook" or "Sent from my iPhone" with your actual signature. These default messages look unprofessional.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Mobile Signature Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Keep it short</strong> — 3-4 lines maximum on mobile</li>
            <li><strong>Essential info only</strong> — Name, title, phone, email</li>
            <li><strong>Skip the logo</strong> — Most mobile apps don't support images well</li>
            <li><strong>Make phone numbers tappable</strong> — Recipients can call with one tap</li>
            <li><strong>Use line breaks wisely</strong> — Don't let text wrap awkwardly</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Mobile vs Desktop Signature Strategy</h2>
          <p className="text-gray-600 mb-6">Many professionals use different signatures for mobile and desktop:</p>
          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Desktop (Full)</p>
              <p className="text-sm text-gray-600">Name, title, company, phone, email, website, social links, logo, banner</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Mobile (Minimal)</p>
              <p className="text-sm text-gray-600">Name, title, phone number only</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">The Sync Problem</h2>
          <p className="text-gray-600 mb-6">The biggest challenge with mobile signatures is keeping them in sync with desktop versions. When you update your desktop signature, you have to remember to update mobile separately. This leads to:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Outdated mobile signatures</li>
            <li>Inconsistent branding</li>
            <li>Missing updates (new phone, new title)</li>
            <li>Different information on different devices</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Centralized Management Solution</h2>
          <p className="text-gray-600 mb-6">Signature management tools that integrate with Google Workspace or Microsoft 365 can push signatures to all devices automatically, solving the sync problem.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Sync signatures across all devices</h3>
            <p className="text-gray-600 mb-6">Siggly automatically deploys your signature to desktop, web, and mobile — keeping everything consistent.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
