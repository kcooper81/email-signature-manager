import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Branding: Build Consistency Across Your Team | Siggly',
  description: 'Create branded email signatures that reinforce your company identity. Learn color, font, and logo best practices for signature branding.',
  keywords: ['email signature branding', 'branded email signature', 'company email signature brand'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-branding',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Branding</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Branding: Build Consistency Across Your Team</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 11, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=600&fit=crop" alt="Brand consistency" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Your email signature is an extension of your brand. Every email your team sends is an opportunity to reinforce brand recognition and professionalism.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Brand Elements in Signatures</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Logo Usage</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Use your official logo, properly sized (150-200px wide)</li>
            <li>Maintain proper spacing around the logo</li>
            <li>Use PNG with transparency for clean backgrounds</li>
            <li>Consider a simplified version for small sizes</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Color Palette</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Use your primary brand color for accents</li>
            <li>Keep text in readable colors (black/dark gray)</li>
            <li>Limit to 2-3 colors maximum</li>
            <li>Use hex codes to ensure exact color matching</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Typography</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Stick to web-safe fonts for compatibility</li>
            <li>Match your brand's font style (modern, traditional, etc.)</li>
            <li>Use consistent sizing (name larger, details smaller)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Consistency Matters</h2>
          <p className="text-gray-600 mb-6">When every employee has a different signature style, it looks unprofessional. Standardized signatures signal:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Organization and attention to detail</li>
            <li>Professional, established company</li>
            <li>Unified team identity</li>
            <li>Brand awareness with every interaction</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Creating Brand Guidelines</h2>
          <p className="text-gray-600 mb-6">Document your signature standards:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Approved templates and variations</li>
            <li>Color codes and font specifications</li>
            <li>Logo files and placement rules</li>
            <li>What can/cannot be customized</li>
            <li>Who to contact for changes</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Tip: Marketing should own signature design, but IT handles deployment. Collaborate to balance brand requirements with technical constraints.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Enforce brand consistency</h3>
            <p className="text-gray-600 mb-6">Siggly ensures every signature matches your brand guidelines — employees can't go off-brand.</p>
            <Link href="/signup"><Button>Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
