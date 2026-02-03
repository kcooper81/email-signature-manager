import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'The Complete Guide to Brand Consistency in Email | Siggly Blog',
  description: 'How to ensure every email your team sends reinforces your brand identity and professionalism.',
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
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Branding</span>
          </div>

          <h1 className="text-4xl font-bold mb-6">The Complete Guide to Brand Consistency in Email</h1>

          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 21, 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 8 min read</span>
          </div>

          <Image
            src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=600&fit=crop"
            alt="Brand consistency in business communications"
            width={1200}
            height={600}
            className="rounded-2xl mb-12"
          />

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Brand consistency isn't just about your website and social media. Every touchpoint matters—
              and email is often the most frequent way your team interacts with customers, partners, and prospects.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Why Email Brand Consistency Matters</h2>
            <p className="text-gray-600 mb-6">
              Studies show that consistent brand presentation across all platforms can increase revenue by up to 23%. 
              Yet many companies overlook email as a branding channel, leaving employees to create their own 
              signatures with varying fonts, colors, and formats.
            </p>

            <Image
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop"
              alt="Professional team meeting"
              width={800}
              height={400}
              className="rounded-xl my-8"
            />

            <h2 className="text-2xl font-bold mt-12 mb-4">The Elements of Email Brand Consistency</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-3">1. Visual Identity</h3>
            <p className="text-gray-600 mb-6">
              Your email signature should reflect your brand's visual identity:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Logo:</strong> Use the correct, high-resolution version</li>
              <li><strong>Colors:</strong> Match your brand's primary and secondary colors</li>
              <li><strong>Typography:</strong> Use web-safe fonts that align with your brand</li>
              <li><strong>Layout:</strong> Consistent structure across all signatures</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">2. Information Hierarchy</h3>
            <p className="text-gray-600 mb-6">
              Every signature should present information in the same order:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Name and title</li>
              <li>Company name</li>
              <li>Contact information</li>
              <li>Social links or CTAs</li>
              <li>Legal disclaimers (if required)</li>
            </ul>

            <Image
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop"
              alt="Email signature design examples"
              width={800}
              height={400}
              className="rounded-xl my-8"
            />

            <h3 className="text-xl font-semibold mt-8 mb-3">3. Tone and Messaging</h3>
            <p className="text-gray-600 mb-6">
              Beyond visuals, consider how your signature communicates:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Professional titles should be standardized</li>
              <li>Promotional banners should align with current campaigns</li>
              <li>CTAs should use consistent language</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Common Brand Consistency Mistakes</h2>
            
            <div className="bg-red-50 border border-red-100 rounded-xl p-6 my-8">
              <h4 className="font-semibold text-red-800 mb-3">Mistakes to Avoid:</h4>
              <ul className="text-red-700 space-y-2">
                <li>❌ Letting employees create their own signatures</li>
                <li>❌ Using outdated logos or contact information</li>
                <li>❌ Inconsistent formatting across departments</li>
                <li>❌ Missing legal disclaimers where required</li>
                <li>❌ Different signatures on desktop vs. mobile</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">How to Achieve Consistency at Scale</h2>
            <p className="text-gray-600 mb-6">
              For organizations with more than a handful of employees, manual signature management 
              is impractical. Here's how to scale:
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Centralize control</h4>
                  <p className="text-gray-600 text-sm">Use a signature management platform that lets you control all signatures from one dashboard.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Use dynamic fields</h4>
                  <p className="text-gray-600 text-sm">Pull user data automatically from your directory to ensure accuracy.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Deploy automatically</h4>
                  <p className="text-gray-600 text-sm">Push updates to all users without requiring any action from them.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Create department templates</h4>
                  <p className="text-gray-600 text-sm">Different teams may need different CTAs while maintaining brand consistency.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
              <h3 className="text-xl font-bold mb-4">Achieve brand consistency with Siggly</h3>
              <p className="text-gray-600 mb-6">
                Deploy consistent, on-brand email signatures to your entire team in minutes. 
                Free for up to 5 users.
              </p>
              <Link href="/signup">
                <Button>Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

    </>
  );
}
