import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Adding Pronouns to Email Signatures: Best Practices | Siggly',
  description: 'How to add pronouns to your email signature professionally. Formatting tips and considerations for inclusive signatures.',
  keywords: ['pronouns in email signature', 'email signature pronouns', 'inclusive email signature'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-pronouns',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Inclusivity</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Adding Pronouns to Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 17, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 4 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=600&fit=crop" alt="Professional portrait" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Adding pronouns to your email signature is becoming increasingly common in professional settings. Here's how to do it effectively.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Why Include Pronouns?</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Creates inclusive environment</li>
            <li>Reduces assumptions about gender</li>
            <li>Helps international colleagues</li>
            <li>Normalizes sharing pronouns</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Formatting Options</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm space-y-4">
            <p><strong>Alex Johnson</strong> (they/them)</p>
            <p><strong>Alex Johnson</strong> | they/them</p>
            <p><strong>Alex Johnson</strong><br />Pronouns: they/them</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Placement</h2>
          <p className="text-gray-600 mb-6">Common placements include:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>After your name on the same line</li>
            <li>On a separate line below your name</li>
            <li>In parentheses or after a divider</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Organization Policies</h2>
          <p className="text-gray-600 mb-6">Some organizations encourage or require pronouns; others leave it optional. Check your company's policy and respect individual choice.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Inclusive signature options</h3>
            <p className="text-gray-600 mb-6">Siggly templates include optional pronoun fields that integrate naturally into your signature design.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
