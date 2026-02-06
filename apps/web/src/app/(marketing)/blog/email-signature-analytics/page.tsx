import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Analytics: Track Performance & ROI | Siggly',
  description: 'Measure email signature performance with analytics. Track clicks, conversions, and ROI from signature links and campaign banners.',
  keywords: ['email signature analytics', 'signature tracking', 'email signature metrics', 'signature click tracking'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Analytics</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Analytics: Track Performance & ROI</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 9, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop" alt="Analytics dashboard" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Your email signatures generate thousands of impressions. Analytics help you understand what's working and prove ROI to stakeholders.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">What to Track</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Link clicks</strong> — How many people click signature links</li>
            <li><strong>Banner clicks</strong> — Campaign banner performance</li>
            <li><strong>Conversion rate</strong> — Actions taken after clicking</li>
            <li><strong>Traffic source</strong> — Attribution to signature vs other channels</li>
            <li><strong>Top performers</strong> — Which employees drive most engagement</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Setting Up Tracking</h2>
          <p className="text-gray-600 mb-6">Use UTM parameters on all signature links:</p>
          <div className="bg-gray-100 p-4 rounded-lg my-6 text-sm font-mono overflow-x-auto">
            <p>?utm_source=email_signature</p>
            <p>&utm_medium=email</p>
            <p>&utm_campaign=q1_2026</p>
            <p>&utm_content=banner_webinar</p>
          </div>
          <p className="text-gray-600 mb-6">This allows Google Analytics to attribute traffic correctly.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Key Metrics</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Click-through rate:</strong> Clicks ÷ emails sent</li>
            <li><strong>Engagement rate:</strong> Interactions per impression</li>
            <li><strong>Conversion rate:</strong> Conversions ÷ clicks</li>
            <li><strong>Cost per conversion:</strong> Tool cost ÷ conversions</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Benchmarks</h2>
          <p className="text-gray-600 mb-6">Typical signature performance ranges:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Click-through rate: 1-3%</li>
            <li>Banner CTR: 0.5-2%</li>
            <li>Conversion rate: 5-15% of clicks</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Reporting to Stakeholders</h2>
          <p className="text-gray-600 mb-6">Create monthly or quarterly reports showing:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Total signature impressions (emails sent)</li>
            <li>Clicks by link type</li>
            <li>Conversions attributed to signatures</li>
            <li>Revenue or leads generated</li>
            <li>Comparison to previous period</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Built-in analytics</h3>
            <p className="text-gray-600 mb-6">Siggly includes signature analytics to track clicks, measure campaigns, and prove ROI.</p>
            <Link href="/features"><Button>See Features <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
