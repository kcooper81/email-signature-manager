import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Tech Company Email Signatures: Modern Design Guide | Siggly',
  description: 'Create modern email signatures for technology companies. Balance innovation with professionalism in your tech startup or enterprise.',
  keywords: ['tech company email signature', 'startup signature', 'saas email signature'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Technology</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Tech Company Email Signatures: Modern Design Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 3, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop" alt="Tech company" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Tech companies can be more creative with signatures while maintaining professionalism. Here's how to strike the right balance.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Modern Design Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Clean, minimal layouts</li>
            <li>Modern sans-serif fonts</li>
            <li>Subtle brand colors</li>
            <li>GitHub/portfolio links (for devs)</li>
            <li>Product links</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Tech Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Alex Rivera</p>
            <p className="text-violet-600">Senior Engineer @ TechCo</p>
            <p className="mt-2 text-gray-600">(555) 123-4567</p>
            <p className="text-violet-600">alex@techco.io | GitHub</p>
            <p className="mt-2 text-violet-600 font-medium">Try our product →</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">What Works in Tech</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Casual but professional tone</li>
            <li>Developer-focused links (GitHub, Stack Overflow)</li>
            <li>Product promotion</li>
            <li>Company culture signals</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Enterprise vs Startup</h2>
          <p className="text-gray-600 mb-6">Startups can be more informal; enterprise tech companies may need more traditional signatures for client communications.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Modern signatures for tech teams</h3>
            <p className="text-gray-600 mb-6">Siggly's clean templates are perfect for technology companies.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
