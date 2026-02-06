import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Marketing: Measure ROI & Drive Results | Siggly',
  description: 'Turn email signatures into a marketing channel. Learn to measure ROI, add campaign banners, and track clicks from employee signatures.',
  keywords: ['email signature marketing', 'email signature ROI', 'signature banner campaigns', 'email signature analytics'],
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
        <h1 className="text-4xl font-bold mb-6">Email Signature Marketing: Measure ROI & Drive Results</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 25, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 9 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop" alt="Marketing analytics" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Your employees send thousands of emails every week. Each one is an opportunity to promote your brand, drive traffic, and generate leads. Here's how to measure and maximize email signature marketing ROI.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">The Untapped Marketing Channel</h2>
          <p className="text-gray-600 mb-6">Consider the math:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>50 employees × 30 emails/day = 1,500 daily impressions</li>
            <li>1,500 × 20 working days = 30,000 monthly impressions</li>
            <li>That's 360,000 signature views per year — for free</li>
          </ul>
          <p className="text-gray-600 mb-6">Unlike social posts or ads, these impressions reach people already engaged with your company.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Campaign Banner Strategies</h2>
          <p className="text-gray-600 mb-6">Add promotional banners below your standard signature to drive specific actions:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Event promotion:</strong> Webinars, conferences, product launches</li>
            <li><strong>Content marketing:</strong> New ebooks, whitepapers, blog posts</li>
            <li><strong>Product announcements:</strong> New features, updates, offers</li>
            <li><strong>Social proof:</strong> Awards, reviews, case studies</li>
            <li><strong>Seasonal campaigns:</strong> Holiday offers, end-of-year promotions</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Best practice: Rotate banners monthly or quarterly. Stale banners get ignored. Fresh campaigns maintain engagement.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Tracking Clicks</h2>
          <p className="text-gray-600 mb-6">Measure signature performance with UTM parameters:</p>
          <div className="bg-gray-100 p-4 rounded-lg my-6 text-sm font-mono overflow-x-auto">
            <p>https://yoursite.com/landing-page</p>
            <p className="text-violet-600">?utm_source=email_signature</p>
            <p className="text-violet-600">&utm_medium=email</p>
            <p className="text-violet-600">&utm_campaign=q1_webinar</p>
          </div>
          <p className="text-gray-600 mb-6">This allows you to track signature clicks in Google Analytics alongside other marketing channels.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Key Metrics to Track</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Click-through rate:</strong> Clicks / emails sent</li>
            <li><strong>Conversion rate:</strong> Signups or actions / clicks</li>
            <li><strong>Traffic volume:</strong> Total visits from signature links</li>
            <li><strong>Lead quality:</strong> How signature leads compare to other sources</li>
            <li><strong>Revenue attribution:</strong> Deals influenced by signature campaigns</li>
          </ul>

          <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop" alt="Dashboard metrics" width={800} height={400} className="rounded-xl my-8" />

          <h2 className="text-2xl font-bold mt-12 mb-4">ROI Calculation</h2>
          <p className="text-gray-600 mb-6">Calculate your email signature marketing ROI:</p>
          <div className="bg-gray-50 p-6 rounded-xl my-6">
            <p className="font-semibold mb-4">Example calculation:</p>
            <ul className="space-y-2 text-sm">
              <li>Monthly signature clicks: 500</li>
              <li>Conversion rate to lead: 5%</li>
              <li>New leads from signatures: 25</li>
              <li>Lead to customer rate: 10%</li>
              <li>New customers: 2.5/month</li>
              <li>Average customer value: $2,000</li>
              <li className="font-bold pt-2 border-t">Monthly revenue: $5,000</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">A/B Testing Signatures</h2>
          <p className="text-gray-600 mb-6">Test different elements to optimize performance:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Banner design and colors</li>
            <li>Call-to-action text</li>
            <li>Offer positioning</li>
            <li>Link placement</li>
            <li>Image vs. text-only banners</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Campaign Ideas by Department</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Sales:</strong> Case studies, demo links, meeting schedulers</li>
            <li><strong>Marketing:</strong> Content offers, event registrations</li>
            <li><strong>Support:</strong> Knowledge base, satisfaction surveys</li>
            <li><strong>HR:</strong> Job openings, company culture content</li>
            <li><strong>Executive:</strong> Thought leadership, company news</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Turn signatures into a marketing channel</h3>
            <p className="text-gray-600 mb-6">Siggly includes banner campaigns, click tracking, and analytics to measure your signature marketing ROI.</p>
            <Link href="/features"><Button>See Features <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
