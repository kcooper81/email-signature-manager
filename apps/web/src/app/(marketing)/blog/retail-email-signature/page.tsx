import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Retail Business Email Signatures: Store & Ecommerce | Siggly',
  description: 'Create email signatures for retail businesses. Drive store visits and online sales with strategic signature elements.',
  keywords: ['retail email signature', 'store email signature', 'ecommerce email signature'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Retail</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Retail Business Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 25, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=600&fit=crop" alt="Retail store" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Retail email signatures can drive both online and in-store traffic. Every customer service email is a marketing opportunity.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Key Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Name and role</li>
            <li>Store/brand name</li>
            <li>Store hours and location</li>
            <li>Website link</li>
            <li>Current promotion or CTA</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Sarah Martinez</p>
            <p>Customer Experience Manager</p>
            <p className="mt-2 font-semibold">StyleCo Boutique</p>
            <p className="text-gray-600">Open Mon-Sat 10am-8pm, Sun 11am-6pm</p>
            <p className="mt-2">(555) 123-4567</p>
            <p className="text-violet-600">sarah@styleco.com</p>
            <p className="text-violet-600">Shop online →</p>
            <p className="mt-2 text-sm text-green-600 font-medium">🎉 20% off your next purchase</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Promotional Banners</h2>
          <p className="text-gray-600 mb-6">Rotate banners for:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Seasonal sales</li>
            <li>New product launches</li>
            <li>Loyalty program signup</li>
            <li>Store events</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Drive sales with every email</h3>
            <p className="text-gray-600 mb-6">Siggly helps retail businesses turn customer emails into marketing opportunities.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
