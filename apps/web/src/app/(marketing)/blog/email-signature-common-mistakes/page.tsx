import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '15 Common Email Signature Mistakes to Avoid | Siggly',
  description: 'Avoid these common email signature mistakes. Design errors, technical issues, and content problems that hurt your professional image.',
  keywords: ['email signature mistakes', 'signature errors', 'bad email signature'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-common-mistakes',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Tips</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">15 Common Email Signature Mistakes to Avoid</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 11, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1525785967371-87ba44b3e6cf?w=1200&h=600&fit=crop" alt="Mistakes" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">These common mistakes can undermine your professional image. Here's what to avoid and how to fix it.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Design Mistakes</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Too much information</strong> — Keep it concise</li>
            <li><strong>Tiny or huge images</strong> — Use appropriate sizing</li>
            <li><strong>Poor color choices</strong> — Stick to brand colors</li>
            <li><strong>Inconsistent fonts</strong> — Use one font family</li>
            <li><strong>Cluttered layout</strong> — Embrace white space</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Technical Mistakes</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-3 mb-6" start={6}>
            <li><strong>Broken images</strong> — Host on reliable server</li>
            <li><strong>Missing alt text</strong> — Always include it</li>
            <li><strong>Signature as image</strong> — Use HTML</li>
            <li><strong>Huge file sizes</strong> — Compress images</li>
            <li><strong>Not mobile-friendly</strong> — Test on phones</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Content Mistakes</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-3 mb-6" start={11}>
            <li><strong>Outdated information</strong> — Keep details current</li>
            <li><strong>Personal quotes</strong> — Usually unprofessional</li>
            <li><strong>Too many social links</strong> — Pick 2-3 relevant ones</li>
            <li><strong>Wrong contact info</strong> — Verify before deploying</li>
            <li><strong>Expired promotions</strong> — Remove old banners</li>
          </ol>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Quick fix: Using a signature management tool prevents most of these mistakes automatically.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Mistake-free signatures</h3>
            <p className="text-gray-600 mb-6">Siggly's templates help you avoid common pitfalls.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
