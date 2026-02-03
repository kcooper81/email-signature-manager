import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Using Email Signatures for Marketing Campaigns | Siggly Blog',
  description: 'How to leverage your team\'s email signatures as a powerful, free marketing channel.',
};

export default function BlogPost() {
  return (
    <>
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
          </Link>

          <div className="mb-8">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">Marketing</span>
          </div>

          <h1 className="text-4xl font-bold mb-6">Using Email Signatures for Marketing Campaigns</h1>

          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 28, 2025</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
          </div>

          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop"
            alt="Marketing analytics and campaigns"
            width={1200}
            height={600}
            className="rounded-2xl mb-12"
          />

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Your team sends thousands of emails every week. Each one is an opportunity to promote 
              your latest campaign, event, or content—without spending a dime on advertising.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">The Untapped Marketing Channel</h2>
            <p className="text-gray-600 mb-6">
              Email signatures are the most underutilized marketing channel. Unlike social posts that 
              disappear in feeds or ads that get blocked, signature banners reach people who are 
              already engaged with your business.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-violet-50 rounded-xl p-6 text-center">
                <TrendingUp className="h-8 w-8 text-violet-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-violet-600">45,000</div>
                <div className="text-sm text-gray-600">Monthly impressions (50-person team)</div>
              </div>
              <div className="bg-violet-50 rounded-xl p-6 text-center">
                <Target className="h-8 w-8 text-violet-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-violet-600">100%</div>
                <div className="text-sm text-gray-600">Warm audience reach</div>
              </div>
              <div className="bg-violet-50 rounded-xl p-6 text-center">
                <BarChart3 className="h-8 w-8 text-violet-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-violet-600">$0</div>
                <div className="text-sm text-gray-600">Cost per impression</div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Campaign Ideas for Signature Banners</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-3">Product Launches</h3>
            <p className="text-gray-600 mb-6">
              Launching a new product or feature? Add a banner to every signature a week before launch. 
              By the time you announce publicly, your existing contacts are already aware.
            </p>

            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop"
              alt="Product launch team meeting"
              width={800}
              height={400}
              className="rounded-xl my-8"
            />

            <h3 className="text-xl font-semibold mt-8 mb-3">Events and Webinars</h3>
            <p className="text-gray-600 mb-6">
              Promoting a webinar or conference? Signature banners can drive registrations from people 
              who might not see your social posts or email blasts.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">Content Promotion</h3>
            <p className="text-gray-600 mb-6">
              Published a new case study, whitepaper, or blog post? Add it to your signatures for 
              a few weeks to maximize distribution.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">Seasonal Campaigns</h3>
            <p className="text-gray-600 mb-6">
              Holiday sales, end-of-quarter promotions, or seasonal offers can all be promoted 
              through signature banners with scheduled start and end dates.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices for Signature Campaigns</h2>

            <div className="space-y-4 my-8">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <h4 className="font-semibold text-green-800">✓ Keep banners small and focused</h4>
                <p className="text-green-700 text-sm">One message, one CTA. Don't try to promote everything at once.</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <h4 className="font-semibold text-green-800">✓ Use compelling visuals</h4>
                <p className="text-green-700 text-sm">Eye-catching graphics increase click-through rates significantly.</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <h4 className="font-semibold text-green-800">✓ Add UTM tracking</h4>
                <p className="text-green-700 text-sm">Track clicks in Google Analytics to measure campaign performance.</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <h4 className="font-semibold text-green-800">✓ Rotate regularly</h4>
                <p className="text-green-700 text-sm">Change banners every 2-4 weeks to keep content fresh.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Measuring ROI</h2>
            <p className="text-gray-600 mb-6">
              To measure the effectiveness of your signature campaigns:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Use unique UTM parameters for signature links</li>
              <li>Track clicks through your signature management tool</li>
              <li>Monitor landing page conversions from signature traffic</li>
              <li>Compare performance across different banner designs</li>
            </ul>

            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
              alt="Analytics dashboard showing campaign performance"
              width={800}
              height={400}
              className="rounded-xl my-8"
            />

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
              <h3 className="text-xl font-bold mb-4">Start your signature marketing campaign</h3>
              <p className="text-gray-600 mb-6">
                Siggly makes it easy to add campaign banners to your team's signatures. 
                Schedule them in advance, track clicks, and measure ROI.
              </p>
              <Link href="/signup">
                <Button>Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

    </>
  );
}
