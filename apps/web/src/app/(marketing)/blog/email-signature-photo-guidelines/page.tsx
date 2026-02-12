import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Photo Guidelines: Look Professional | Siggly',
  description: 'Guidelines for email signature headshots. Size, format, style tips for professional profile photos in your signature.',
  keywords: ['email signature photo', 'signature headshot', 'professional photo email'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-photo-guidelines',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Design</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Photo Guidelines</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 5, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=600&fit=crop" alt="Professional headshot" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">A headshot in your signature adds a personal touch and builds recognition. Here's how to do it right.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Photo Specifications</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Size:</strong> 80-100px square for display</li>
            <li><strong>Actual file:</strong> 160-200px (for retina)</li>
            <li><strong>File size:</strong> Under 20KB</li>
            <li><strong>Format:</strong> JPEG (smaller) or PNG</li>
            <li><strong>Shape:</strong> Square or circular crop</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Photo Style Guidelines</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Professional quality</strong> — Not a casual selfie</li>
            <li><strong>Good lighting</strong> — Face clearly visible</li>
            <li><strong>Simple background</strong> — Neutral or on-brand</li>
            <li><strong>Recent photo</strong> — Looks like current you</li>
            <li><strong>Appropriate attire</strong> — Match your industry</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">When to Include a Photo</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Client-facing roles (sales, account management)</li>
            <li>Personal branding (consultants, executives)</li>
            <li>Small teams where personal connection matters</li>
            <li>Industries where relationships are key</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">When to Skip the Photo</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Large organizations with minimal design</li>
            <li>Technical/internal roles</li>
            <li>Privacy-conscious industries</li>
            <li>When company policy prohibits</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Technical Tips</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Compress images before uploading</li>
            <li>Use consistent photo style across team</li>
            <li>Host on reliable server</li>
            <li>Test on dark mode email clients</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Add photos easily</h3>
            <p className="text-gray-600 mb-6">Siggly automatically optimizes photos for email and ensures consistent display.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
