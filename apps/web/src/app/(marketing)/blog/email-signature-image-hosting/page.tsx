import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Image Hosting: Best Practices Guide | Siggly',
  description: 'Learn where and how to host images for email signatures. Compare hosting options and avoid common image display problems.',
  keywords: ['email signature image hosting', 'host signature logo', 'email signature image url'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Technical</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Image Hosting: Best Practices</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 7, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop" alt="Cloud hosting" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Email signature images must be hosted online — you can't embed them directly. Here's how to host images properly so they display reliably.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Why Images Need Hosting</h2>
          <p className="text-gray-600 mb-6">Unlike attachments, signature images need a public URL. When you send an email, the signature HTML references this URL, and the recipient's email client downloads the image.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Hosting Options</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Your Website</h3>
          <p className="text-gray-600 mb-6">Upload to your company website (e.g., yoursite.com/images/logo.png). Pros: full control, reliable. Cons: requires web access.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Cloud Storage</h3>
          <p className="text-gray-600 mb-6">Google Drive, Dropbox, OneDrive can host images. Make sure sharing is set to "Anyone with the link." Not always reliable for email.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Image Hosting Services</h3>
          <p className="text-gray-600 mb-6">Services like Imgur, Cloudinary, or imgbb are designed for image hosting. Free tiers available but may have limitations.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3">CDN Services</h3>
          <p className="text-gray-600 mb-6">AWS S3, Cloudflare R2, or similar offer professional-grade hosting with high reliability.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Use HTTPS</strong> — Secure URLs display more reliably</li>
            <li><strong>Permanent URLs</strong> — Don't use links that expire</li>
            <li><strong>Fast loading</strong> — Choose a reliable, fast host</li>
            <li><strong>Optimized files</strong> — Compress images before uploading</li>
            <li><strong>Backup copies</strong> — Keep originals in case URLs break</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Common Problems</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Broken images:</strong> URL changed or file deleted</li>
            <li><strong>Slow loading:</strong> Host is too slow or far away</li>
            <li><strong>Blocked:</strong> Some corporate firewalls block external images</li>
            <li><strong>Permissions:</strong> Cloud storage not set to public</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Worry-free image hosting</h3>
            <p className="text-gray-600 mb-6">Siggly automatically hosts your signature images on our reliable CDN — no separate hosting needed.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
