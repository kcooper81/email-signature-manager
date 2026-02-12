import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Troubleshooting: Fix Common Problems | Siggly',
  description: 'Fix common email signature problems. Solutions for broken images, formatting issues, missing signatures, and display problems across email clients.',
  keywords: ['email signature not working', 'fix email signature', 'signature troubleshooting', 'email signature problems'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-troubleshooting',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Troubleshooting</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Troubleshooting: Fix Common Problems</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 6, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 8 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop" alt="Troubleshooting" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Email signatures can break in frustrating ways. Here's how to diagnose and fix the most common issues.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Images Not Displaying</h2>
          <p className="text-gray-600 mb-4"><strong>Symptoms:</strong> Broken image icons, empty boxes, or no images at all.</p>
          <p className="text-gray-600 mb-4"><strong>Causes & Fixes:</strong></p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>URL is broken — Check image link is still valid</li>
            <li>Not publicly accessible — Ensure cloud storage is set to public</li>
            <li>Using local path — Images must be hosted online, not C:\</li>
            <li>Recipient blocks images — Nothing you can do; provide alt text</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Formatting Looks Wrong</h2>
          <p className="text-gray-600 mb-4"><strong>Symptoms:</strong> Misaligned text, wrong fonts, broken layout.</p>
          <p className="text-gray-600 mb-4"><strong>Causes & Fixes:</strong></p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>CSS not inline — Move styles to inline style attributes</li>
            <li>Using modern CSS — Avoid flexbox/grid; use tables</li>
            <li>Custom fonts — Stick to web-safe fonts</li>
            <li>Outlook quirks — Test specifically in Outlook</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Signature Not Appearing</h2>
          <p className="text-gray-600 mb-4"><strong>Symptoms:</strong> Emails sent without signature.</p>
          <p className="text-gray-600 mb-4"><strong>Causes & Fixes:</strong></p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Not set as default — Check signature settings</li>
            <li>Reply/forward settings — Set signature for all email types</li>
            <li>Mobile vs desktop — Mobile apps have separate settings</li>
            <li>Composing in plain text — Switch to HTML format</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Signature at Wrong Position</h2>
          <p className="text-gray-600 mb-4"><strong>Symptoms:</strong> Signature appears below quoted text in replies.</p>
          <p className="text-gray-600 mb-4"><strong>Causes & Fixes:</strong></p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Server-side rules (Exchange/Gmail append footer) always place at bottom</li>
            <li>Solution: Use client-side signatures or third-party tools</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Extra Spacing or Lines</h2>
          <p className="text-gray-600 mb-4"><strong>Symptoms:</strong> Unwanted blank lines, large gaps.</p>
          <p className="text-gray-600 mb-4"><strong>Causes & Fixes:</strong></p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Extra line breaks in HTML — Clean up source code</li>
            <li>Image display:block — Add style="display:block" to images</li>
            <li>Paragraph tags — Use br instead of p tags</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Different on Each Device</h2>
          <p className="text-gray-600 mb-4"><strong>Symptoms:</strong> Signature looks different on phone vs desktop.</p>
          <p className="text-gray-600 mb-4"><strong>Causes & Fixes:</strong></p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Separate mobile signatures — Sync or centralize management</li>
            <li>Not responsive — Design for mobile-first</li>
            <li>Mobile app limitations — Some apps only support plain text</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Eliminate signature problems</h3>
            <p className="text-gray-600 mb-6">Siggly handles all the technical complexity — signatures work reliably across all clients and devices.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
