import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Using Email Signatures for Recruiting & Hiring | Siggly',
  description: 'Turn employee emails into a recruiting channel. Add job posting banners to signatures and attract candidates organically.',
  keywords: ['email signature hiring', 'recruiting email signature', 'job posting signature banner'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Recruiting</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Using Email Signatures for Recruiting & Hiring</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 9, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop" alt="Hiring team" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Every employee email reaches people who might be great candidates or know someone who is. Signature banners can turn everyday communication into a recruiting channel.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Why It Works</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Passive reach</strong> — Thousands of impressions without effort</li>
            <li><strong>Quality candidates</strong> — Reaches people in your network</li>
            <li><strong>Low cost</strong> — No job board fees</li>
            <li><strong>Shows culture</strong> — Signals a growing, dynamic company</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Banner Examples</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>"We're hiring! See open roles →"</li>
            <li>"Join our team — [X] positions open"</li>
            <li>"Love what you do? So do we. View careers"</li>
            <li>"Help us grow — refer a friend"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Implementation Tips</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Link to careers page, not individual postings</li>
            <li>Update banner when actively hiring vs not</li>
            <li>Consider department-specific banners</li>
            <li>Track clicks with UTM parameters</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Referral Integration</h2>
          <p className="text-gray-600 mb-6">Combine hiring banners with employee referral programs. Employees can share openings naturally through their email communications.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Recruiting through signatures</h3>
            <p className="text-gray-600 mb-6">Siggly makes it easy to deploy hiring banners across your organization or specific departments.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
