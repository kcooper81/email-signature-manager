import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Engineering Department Email Signatures | Siggly',
  description: 'Email signature best practices for engineering and technical teams. Developer-friendly signatures that balance professionalism with tech culture.',
  keywords: ['engineering email signature', 'developer signature', 'tech team email'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Engineering</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Engineering Department Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 18, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop" alt="Engineering" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Engineering teams often have different communication needs. Here's how to create signatures that work for developers while maintaining brand standards.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Key Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Name and title</li>
            <li>Team/department</li>
            <li>GitHub profile (optional)</li>
            <li>Time zone (for distributed teams)</li>
            <li>Slack handle (for internal comms)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Tech-Friendly Design</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Minimal, clean layout</li>
            <li>Monospace font acceptable for tech companies</li>
            <li>Developer-focused links (GitHub, Stack Overflow)</li>
            <li>Optional: tech stack or specializations</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm font-mono">
            <p className="font-bold text-lg font-sans">Alex Chen</p>
            <p>Senior Software Engineer</p>
            <p className="mt-2 font-semibold font-sans">Acme Software</p>
            <p className="mt-2 text-violet-600">GitHub | LinkedIn</p>
            <p className="text-gray-600 text-xs mt-2">🌎 Pacific Time (UTC-8)</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Considerations</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>External vs internal communication needs</li>
            <li>Customer-facing vs internal-only roles</li>
            <li>Company culture and flexibility</li>
            <li>Hiring—showcase your tech brand</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Developer-friendly signatures</h3>
            <p className="text-gray-600 mb-6">Siggly offers clean templates that work for engineering teams.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
