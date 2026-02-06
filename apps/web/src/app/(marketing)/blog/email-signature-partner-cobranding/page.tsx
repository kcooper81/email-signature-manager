import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Partner Co-Branding in Email Signatures | Siggly',
  description: 'Include partner logos and co-branding in email signatures. Best practices for technology partners, resellers, and strategic alliances.',
  keywords: ['partner email signature', 'co-branding signature', 'partner logo email'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Partnerships</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Partner Co-Branding in Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 2, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=600&fit=crop" alt="Partnership" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Strategic partnerships often require co-branded communications. Here's how to include partner branding in email signatures appropriately.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">When to Co-Brand</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Certified partner programs</li>
            <li>Reseller/distributor relationships</li>
            <li>Technology partnerships</li>
            <li>Joint ventures</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Display Options</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Partner badge</strong> — Small certification logo</li>
            <li><strong>Text mention</strong> — "Certified Partner of..."</li>
            <li><strong>Dual logo</strong> — Both logos side by side</li>
            <li><strong>Partner tier</strong> — Gold, Platinum, etc.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Follow partner brand guidelines</li>
            <li>Use approved badge assets</li>
            <li>Keep partner logo smaller than your own</li>
            <li>Get approval if required by agreement</li>
            <li>Update when partnership tier changes</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Common Partnerships</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Microsoft Partner</li>
            <li>Google Cloud Partner</li>
            <li>Salesforce Partner</li>
            <li>HubSpot Solutions Partner</li>
            <li>AWS Partner</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Showcase your partnerships</h3>
            <p className="text-gray-600 mb-6">Siggly supports partner badges and co-branding in signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
