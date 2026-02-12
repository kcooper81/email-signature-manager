import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signatures in Crisis Communication | Siggly',
  description: 'Update email signatures during a crisis. Emergency messaging, status updates, and rapid deployment for crisis response.',
  keywords: ['crisis communication email', 'emergency signature update', 'company crisis email'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-crisis-communication',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Crisis Management</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signatures in Crisis Communication</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 5, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=600&fit=crop" alt="Crisis communication" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">During a crisis, email signatures can quickly communicate important updates to everyone your company emails.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Crisis Signature Uses</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Service disruptions</strong> — Status page links, expected resolution</li>
            <li><strong>Office closures</strong> — Emergency hours, alternate contacts</li>
            <li><strong>Security incidents</strong> — Official communication links</li>
            <li><strong>Major changes</strong> — Policy updates, important notices</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Crisis Banners</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>"⚠️ We are experiencing service disruptions. View status →"</li>
            <li>"Office closed due to weather — Working remotely"</li>
            <li>"Important update: [link to official statement]"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Rapid Deployment</h2>
          <p className="text-gray-600 mb-6">Speed matters in crisis:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Have crisis template ready in advance</li>
            <li>Know who can deploy changes quickly</li>
            <li>Test deployment process before needed</li>
            <li>Document the update process</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Post-Crisis</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Remove crisis messaging promptly</li>
            <li>Return to normal signatures</li>
            <li>Document lessons learned</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Rapid updates when needed</h3>
            <p className="text-gray-600 mb-6">Siggly enables instant signature updates across your organization.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
