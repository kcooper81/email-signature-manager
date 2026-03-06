import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createBlogMetadata, generateBlogPostSchema } from '@/lib/seo';

export const metadata = createBlogMetadata(
  'sales-team-email-signatures',
  'Sales Team Email Signatures: Convert More Leads',
  'Create high-converting email signatures for sales teams. Includes meeting links, social proof, and CTA best practices for sales professionals.',
  ['sales email signature', 'sales team signature', 'email signature for salespeople']
);

export default function BlogPost() {
  const blogSchema = generateBlogPostSchema({
    title: 'Sales Team Email Signatures: Convert More Leads',
    description: 'Create high-converting email signatures for sales teams. Includes meeting links, social proof, and CTA best practices for sales professionals.',
    url: '/blog/sales-team-email-signatures',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=600&fit=crop',
    datePublished: '2026-01-08',
    author: 'Siggly Team',
    readTime: '6 min',
    category: 'Sales',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Sales</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Sales Team Email Signatures: Convert More Leads</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 8, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=600&fit=crop" alt="Sales team" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Sales emails need signatures that build trust and make it easy to take the next step. Here's how to optimize signatures for conversion.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Essential Elements for Sales</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Meeting link</strong> — Calendly/HubSpot link removes friction</li>
            <li><strong>Direct phone</strong> — Mobile number for urgent contacts</li>
            <li><strong>LinkedIn profile</strong> — Builds personal credibility</li>
            <li><strong>Professional photo</strong> — Adds personal connection</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Social Proof Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Company awards or recognition</li>
            <li>G2/Capterra ratings</li>
            <li>Customer count ("Trusted by 1,000+ companies")</li>
            <li>Recent press mentions</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Sales Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Alex Rivera</p>
            <p>Account Executive | Acme Software</p>
            <p className="mt-2">📱 (555) 123-4567</p>
            <p className="text-violet-600">alex@acme.com</p>
            <p className="mt-3 p-2 bg-violet-100 rounded text-center text-violet-700 font-medium">📅 Book a quick call</p>
            <p className="mt-3 text-xs text-gray-500">⭐ Rated 4.8/5 on G2 | 500+ happy customers</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">What to Avoid</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Overly promotional language</li>
            <li>Too many links (focus on one CTA)</li>
            <li>Outdated product information</li>
            <li>Generic company descriptions</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Tip: Test different CTAs (demo link vs. calendar link vs. resource download) to see what converts best for your sales cycle.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Signatures that convert</h3>
            <p className="text-gray-600 mb-6">Siggly helps sales teams create consistent, high-converting signatures with meeting links and tracking.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
