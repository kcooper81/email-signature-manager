import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Showcasing Awards in Email Signatures | Siggly',
  description: 'Display company awards and recognition in email signatures. Badges, certifications, and trust signals that build credibility.',
  keywords: ['awards email signature', 'recognition signature', 'badges email signature'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-awards-recognition',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Awards</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Showcasing Awards in Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 3, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1200&h=600&fit=crop" alt="Awards" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Awards and recognition build trust. Adding them to email signatures ensures every recipient sees your achievements.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Types of Recognition</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Industry awards (Best in Class, Innovation Award)</li>
            <li>Software ratings (G2, Capterra, Gartner)</li>
            <li>Best workplace awards (Great Place to Work, Inc.)</li>
            <li>Certifications (ISO, SOC 2, security)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Display Options</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Small badge images (25-35px)</li>
            <li>Text mention with year</li>
            <li>Row of badges</li>
            <li>Banner announcement for new awards</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Be selective</strong> — Pick 2-3 most impressive</li>
            <li><strong>Keep current</strong> — Update years, remove expired</li>
            <li><strong>Size appropriately</strong> — Small and subtle</li>
            <li><strong>Link to validation</strong> — Where people can verify</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Timing</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Add immediately when won</li>
            <li>Feature prominently at first, then reduce</li>
            <li>Update when new awards replace old</li>
            <li>Remove outdated recognition</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Showcase your achievements</h3>
            <p className="text-gray-600 mb-6">Siggly makes it easy to add award badges to team signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
