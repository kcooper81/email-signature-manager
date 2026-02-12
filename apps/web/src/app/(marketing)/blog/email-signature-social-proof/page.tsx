import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Adding Social Proof to Email Signatures | Siggly',
  description: 'Include social proof in your email signatures. Awards, ratings, certifications, and trust signals that build credibility.',
  keywords: ['email signature social proof', 'trust signals email', 'signature awards badges'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-social-proof',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Marketing</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Adding Social Proof to Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 27, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop" alt="Awards and recognition" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Social proof builds trust quickly. Strategically placed awards, ratings, and certifications in your signature reinforce credibility.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Types of Social Proof</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Awards:</strong> Industry recognition, best workplace</li>
            <li><strong>Ratings:</strong> G2, Capterra, Trustpilot scores</li>
            <li><strong>Certifications:</strong> ISO, SOC 2, industry-specific</li>
            <li><strong>Press mentions:</strong> "As featured in..."</li>
            <li><strong>Customer count:</strong> "Trusted by 10,000+ companies"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Display Options</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Small badge icons (20-30px)</li>
            <li>Text mention with link</li>
            <li>Banner graphic with award logos</li>
            <li>Star rating display</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Sales Team</p>
            <p className="font-semibold mt-2">Acme Software</p>
            <p className="mt-3 text-gray-600">⭐ 4.8/5 on G2 | 🏆 Best Software 2025</p>
            <p className="text-violet-600">Trusted by 5,000+ companies</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Choose 1-2 most impressive elements</li>
            <li>Keep badges small and subtle</li>
            <li>Update when you win new awards</li>
            <li>Link to review pages</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Showcase your credibility</h3>
            <p className="text-gray-600 mb-6">Siggly makes it easy to add social proof elements to team signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
