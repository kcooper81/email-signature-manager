import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Building an Email Signature Template Library | Siggly',
  description: 'Create a library of email signature templates for your organization. Templates for different roles, departments, and use cases.',
  keywords: ['email signature template', 'signature library', 'template management'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-template-library',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Templates</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Building an Email Signature Template Library</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 13, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&h=600&fit=crop" alt="Template library" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">A well-organized template library makes signature management easier. Here's how to build one that serves your entire organization.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Template Categories</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>By department (Sales, Marketing, Support)</li>
            <li>By role level (Executive, Manager, Individual)</li>
            <li>By use case (External, Internal)</li>
            <li>By campaign (Seasonal, Promotional)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Essential Templates</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Standard employee signature</li>
            <li>Executive signature</li>
            <li>Sales signature (with CTA)</li>
            <li>Support signature (with help links)</li>
            <li>Minimal signature (for replies)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Template Design System</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Consistent header with logo</li>
            <li>Standardized font and colors</li>
            <li>Modular sections (add/remove as needed)</li>
            <li>Variable placeholders for personalization</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Maintenance</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Review templates quarterly</li>
            <li>Archive outdated templates</li>
            <li>Document purpose of each template</li>
            <li>Assign template ownership</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Template management built-in</h3>
            <p className="text-gray-600 mb-6">Siggly includes template library features to organize and manage your signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
