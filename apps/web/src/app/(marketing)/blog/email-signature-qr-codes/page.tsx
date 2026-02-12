import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'QR Codes in Email Signatures: Do They Work? | Siggly',
  description: 'Should you add QR codes to email signatures? Pros, cons, and use cases for QR codes in professional email signatures.',
  keywords: ['qr code email signature', 'signature qr code', 'email qr code'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-qr-codes',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Innovation</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">QR Codes in Email Signatures: Do They Work?</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> October 31, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=1200&h=600&fit=crop" alt="QR code" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">QR codes in email signatures are trendy, but are they actually useful? Let's examine the pros, cons, and best use cases.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Potential Use Cases</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>vCard/contact download</li>
            <li>Event registration</li>
            <li>App download</li>
            <li>Physical-digital bridge (print emails)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">The Reality</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Reading on same device</strong> — Most people read email on their phone, making QR scanning impractical</li>
            <li><strong>Clickable links are easier</strong> — In digital context, just link directly</li>
            <li><strong>Takes up space</strong> — QR codes need to be large enough to scan</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">When QR Codes Make Sense</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Emails that will be printed</li>
            <li>Conference/event contexts</li>
            <li>Contact card download (vCard)</li>
            <li>Bridging to mobile app</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices If Using</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Make it large enough to scan (50px minimum)</li>
            <li>Include text explaining what it does</li>
            <li>Also include a regular link</li>
            <li>Test that it actually works</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Bottom line: For most email signatures, a clickable link is more practical than a QR code.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Smart signature design</h3>
            <p className="text-gray-600 mb-6">Siggly helps you create effective signatures focused on what actually works.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
