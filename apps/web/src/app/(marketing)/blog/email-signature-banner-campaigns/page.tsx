import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Banner Campaigns: Design & Strategy Guide | Siggly',
  description: 'Create effective email signature banner campaigns. Learn design best practices, campaign ideas, and how to measure banner performance.',
  keywords: ['email signature banner', 'signature campaign banner', 'email signature marketing banner'],
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
        <h1 className="text-4xl font-bold mb-6">Email Signature Banner Campaigns: Design & Strategy Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 13, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 8 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop" alt="Marketing campaign" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Signature banners turn every email into a marketing opportunity. Add promotional content below your standard signature to drive traffic, registrations, and conversions.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Banner Design Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Size:</strong> 400-600px wide, 70-100px tall</li>
            <li><strong>File format:</strong> PNG or JPEG, under 50KB</li>
            <li><strong>Clear CTA:</strong> One obvious action ("Register Now", "Learn More")</li>
            <li><strong>Brand colors:</strong> Match your signature and brand</li>
            <li><strong>Readable text:</strong> Large enough to read at a glance</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Campaign Ideas</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Events:</strong> Webinar registrations, conferences, product launches</li>
            <li><strong>Content:</strong> New ebook, whitepaper, or blog post</li>
            <li><strong>Promotions:</strong> Limited-time offers, seasonal sales</li>
            <li><strong>Announcements:</strong> New features, company news, awards</li>
            <li><strong>Social proof:</strong> Customer reviews, case study highlights</li>
            <li><strong>Hiring:</strong> Job openings, company culture</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Campaign Calendar</h2>
          <p className="text-gray-600 mb-6">Plan banner rotations in advance:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Rotate banners monthly or quarterly</li>
            <li>Align with marketing calendar and product releases</li>
            <li>Create seasonal banners in advance</li>
            <li>Remove expired promotions immediately</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Tip: Stale banners get ignored. Even if you're promoting the same thing, refresh the design periodically to maintain engagement.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Measuring Performance</h2>
          <p className="text-gray-600 mb-6">Track banner effectiveness with UTM parameters:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Add UTM tags to banner links</li>
            <li>Track clicks in Google Analytics</li>
            <li>Compare performance across campaigns</li>
            <li>A/B test different designs</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Department-Specific Banners</h2>
          <p className="text-gray-600 mb-6">Different teams can run different campaigns:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Sales:</strong> Case studies, demo booking</li>
            <li><strong>Marketing:</strong> Content offers, events</li>
            <li><strong>Support:</strong> Knowledge base, satisfaction surveys</li>
            <li><strong>HR:</strong> Job openings, company culture</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Run banner campaigns easily</h3>
            <p className="text-gray-600 mb-6">Siggly includes banner campaign management with scheduling, targeting, and click tracking.</p>
            <Link href="/features"><Button>See Features <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
