import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Animated GIFs in Email Signatures: Pros & Cons | Siggly',
  description: 'Should you use animated GIFs in email signatures? Technical considerations, file size issues, and when animation makes sense.',
  keywords: ['animated email signature', 'gif email signature', 'moving signature'],
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
        <h1 className="text-4xl font-bold mb-6">Animated GIFs in Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> October 30, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=600&fit=crop" alt="Animation" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Animated GIFs can make signatures eye-catching, but they come with significant drawbacks. Here's what to consider.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Potential Uses</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Animated company logo</li>
            <li>Promotional banners</li>
            <li>CTA attention-grabbers</li>
            <li>Seasonal animations</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Major Concerns</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>File size</strong> — GIFs are large, bloating every email</li>
            <li><strong>Professionalism</strong> — Can look unprofessional</li>
            <li><strong>Distraction</strong> — Motion draws attention from content</li>
            <li><strong>Compatibility</strong> — Some clients don't animate</li>
            <li><strong>Accessibility</strong> — Motion can be problematic</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Email Client Support</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>✅ Gmail — Animates</li>
            <li>✅ Apple Mail — Animates</li>
            <li>⚠️ Outlook — Shows first frame only</li>
            <li>✅ Most webmail — Animates</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">If You Must Use Animation</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Keep file size under 100KB</li>
            <li>Make first frame compelling (for Outlook)</li>
            <li>Use subtle animation</li>
            <li>Test thoroughly</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Our recommendation: Static images are more professional and reliable. Save animation for marketing emails, not signatures.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Professional signatures</h3>
            <p className="text-gray-600 mb-6">Siggly helps you create effective, professional signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
