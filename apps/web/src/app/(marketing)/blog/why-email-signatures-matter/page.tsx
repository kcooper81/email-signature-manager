import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Why Email Signatures Matter More Than You Think | Siggly Blog',
  description: 'Your email signature is seen hundreds of times a day. Learn why it\'s one of the most underutilized marketing tools for businesses.',
  alternates: {
    canonical: 'https://siggly.io/blog/why-email-signatures-matter',
  },
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
            <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Best Practices</span>
          </div>

          <h1 className="text-4xl font-bold mb-6">Why Email Signatures Matter More Than You Think</h1>

          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 28, 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
          </div>

          <Image
            src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&h=600&fit=crop"
            alt="Professional email communication"
            width={1200}
            height={600}
            className="rounded-2xl mb-12"
          />

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Every day, your team sends hundreds of emails. Each one carries your brand, your message, 
              and an opportunity to make an impression. Yet most businesses treat email signatures as 
              an afterthought.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">The Hidden Marketing Channel</h2>
            <p className="text-gray-600 mb-6">
              Consider this: a company with 50 employees, each sending 30 emails per day, generates 
              <strong> 1,500 daily impressions</strong>. That's 45,000 impressions per month—completely free. 
              Unlike social media posts that disappear in feeds or ads that get ignored, email signatures 
              are seen by people already engaged with your business.
            </p>

            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
              alt="Email analytics dashboard"
              width={800}
              height={400}
              className="rounded-xl my-8"
            />

            <h2 className="text-2xl font-bold mt-12 mb-4">First Impressions Count</h2>
            <p className="text-gray-600 mb-6">
              Your email signature is often the first visual representation of your brand that a prospect sees. 
              A professional, consistent signature signals that your company is organized, trustworthy, and 
              pays attention to details. A messy or missing signature does the opposite.
            </p>

            <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
              <p className="text-violet-900 font-medium">
                "Companies with consistent email signatures see a 32% increase in brand recognition 
                among their email recipients."
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Beyond Branding: The Business Case</h2>
            <p className="text-gray-600 mb-6">Email signatures aren't just about looking professional. They serve critical business functions:</p>
            
            <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
              <li><strong>Legal compliance:</strong> Many industries require specific disclaimers in business emails</li>
              <li><strong>Lead generation:</strong> Promotional banners can drive traffic to landing pages</li>
              <li><strong>Social proof:</strong> Links to reviews, awards, or certifications build trust</li>
              <li><strong>Contact efficiency:</strong> Clear contact info reduces friction for prospects</li>
            </ul>

            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop"
              alt="Team collaboration on branding"
              width={800}
              height={400}
              className="rounded-xl my-8"
            />

            <h2 className="text-2xl font-bold mt-12 mb-4">The Cost of Inconsistency</h2>
            <p className="text-gray-600 mb-6">
              When employees create their own signatures, chaos ensues. Different fonts, outdated logos, 
              missing information, and broken formatting create a fragmented brand experience. IT teams 
              waste hours fixing individual signatures, and marketing loses control of the message.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">The Solution: Centralized Management</h2>
            <p className="text-gray-600 mb-6">
              Modern email signature management tools like Siggly solve these problems by providing:
            </p>
            
            <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
              <li>Centralized template control for brand consistency</li>
              <li>Automatic deployment to all users</li>
              <li>Dynamic fields that update automatically</li>
              <li>Campaign banners that can be scheduled and tracked</li>
              <li>Compliance with legal requirements</li>
            </ul>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
              <h3 className="text-xl font-bold mb-4">Ready to upgrade your email signatures?</h3>
              <p className="text-gray-600 mb-6">
                Start with Siggly's free plan and see how easy it is to deploy professional, 
                consistent signatures across your entire team.
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
