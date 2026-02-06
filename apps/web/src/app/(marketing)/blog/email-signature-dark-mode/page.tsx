import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signatures in Dark Mode: Design Tips | Siggly',
  description: 'Design email signatures that work in dark mode. Tips for logos, colors, and images that look good on both light and dark backgrounds.',
  keywords: ['email signature dark mode', 'dark mode email', 'signature dark theme'],
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
        <h1 className="text-4xl font-bold mb-6">Email Signatures in Dark Mode: Design Tips</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 11, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=600&fit=crop" alt="Dark mode" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Many users now view emails in dark mode. Your signature needs to look good on both light and dark backgrounds.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Dark Mode Challenges</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Logo visibility</strong> — Dark logos disappear on dark backgrounds</li>
            <li><strong>Text color</strong> — Black text becomes unreadable</li>
            <li><strong>Image backgrounds</strong> — White boxes around images</li>
            <li><strong>Color inversion</strong> — Some clients auto-invert colors</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Solutions</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Logos</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Use PNG with transparent background</li>
            <li>Add a subtle border or glow to dark logos</li>
            <li>Consider a light-colored version of your logo</li>
            <li>Test logo on both backgrounds before deploying</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Text</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Avoid pure black (#000000) — use dark gray instead</li>
            <li>Let email clients handle text color inversion</li>
            <li>Don't force white text (invisible on light mode)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Images</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Use PNG with transparency, not JPEG</li>
            <li>Avoid images with white backgrounds</li>
            <li>Test social icons on dark backgrounds</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Testing</h2>
          <p className="text-gray-600 mb-6">Send test emails to yourself and toggle dark mode on/off in your email client to verify appearance.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Dark mode compatible</h3>
            <p className="text-gray-600 mb-6">Siggly templates are designed to work well in both light and dark mode.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
