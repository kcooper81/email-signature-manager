import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Accessible Email Signatures: Inclusive Design | Siggly',
  description: 'Create accessible email signatures for all users. Alt text, color contrast, screen readers, and inclusive design practices.',
  keywords: ['accessible email signature', 'email signature accessibility', 'inclusive signature design'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Accessibility</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Accessible Email Signatures: Inclusive Design</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 16, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=600&fit=crop" alt="Accessibility" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Email signatures should be accessible to everyone, including people using screen readers or with visual impairments. Here's how to design inclusively.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Accessibility Requirements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Alt text</strong> — Descriptive text for all images</li>
            <li><strong>Color contrast</strong> — 4.5:1 ratio for text</li>
            <li><strong>Link text</strong> — Descriptive, not "click here"</li>
            <li><strong>Font size</strong> — Minimum 14px for readability</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Alt Text Examples</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Logo: "Acme Company logo"</li>
            <li>Headshot: "Photo of Jane Smith"</li>
            <li>Social icon: "LinkedIn profile"</li>
            <li>Banner: "Download our free guide on email marketing"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Screen Reader Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Use semantic HTML structure</li>
            <li>Avoid image-only content</li>
            <li>Include text alternatives for visual elements</li>
            <li>Test with actual screen readers</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Common Issues to Avoid</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Missing alt text on images</li>
            <li>Low contrast text colors</li>
            <li>Tiny font sizes</li>
            <li>Links that just say "here" or "click"</li>
            <li>Image-only signatures (no text fallback)</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Accessible by default</h3>
            <p className="text-gray-600 mb-6">Siggly templates are designed with accessibility in mind.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
