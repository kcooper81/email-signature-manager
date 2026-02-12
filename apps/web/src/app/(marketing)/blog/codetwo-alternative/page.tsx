import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Best CodeTwo Alternatives 2026: Compare Features & Pricing | Siggly',
  description: 'Looking for a CodeTwo alternative? Compare email signature tools with Google Workspace support, easier pricing, and modern features.',
  keywords: ['codetwo alternative', 'codetwo competitor', 'codetwo vs', 'email signature software'],
  alternates: {
    canonical: 'https://siggly.io/blog/codetwo-alternative',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Comparisons</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Best CodeTwo Alternatives 2026: Compare Features & Pricing</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 17, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 8 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop" alt="Software comparison" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">CodeTwo is a popular Microsoft-focused signature tool. If you need Google Workspace support or simpler pricing, here are the best alternatives to consider.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Why Look for CodeTwo Alternatives?</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Microsoft-only</strong> — No Google Workspace support</li>
            <li><strong>Enterprise pricing</strong> — Can be expensive for smaller teams</li>
            <li><strong>Complex setup</strong> — Technical implementation required</li>
            <li><strong>On-premise focus</strong> — Cloud-native options may be simpler</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Top CodeTwo Alternatives</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3">1. Siggly</h3>
          <div className="bg-violet-50 p-4 rounded-lg mb-6">
            <p className="font-semibold text-violet-800 mb-2">Why consider Siggly:</p>
            <ul className="space-y-1 text-sm text-violet-700">
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Works with Google Workspace AND Microsoft 365</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Free tier available</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Modern cloud-native architecture</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Setup in minutes, not hours</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Transparent per-user pricing</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3">2. Exclaimer</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Supports both platforms</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Enterprise-grade features</li>
              <li className="flex items-center gap-2"><X className="h-4 w-4 text-red-500" /> Higher price point</li>
              <li className="flex items-center gap-2"><X className="h-4 w-4 text-red-500" /> Complex for simple needs</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Feature Comparison</h2>
          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 text-left">Feature</th>
                  <th className="border border-gray-200 px-3 py-2 text-center">Siggly</th>
                  <th className="border border-gray-200 px-3 py-2 text-center">CodeTwo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">Google Workspace</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600">✓</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600">✗</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">Microsoft 365</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600">✓</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600">✓</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">Free tier</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600">✓</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600">✗</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">Cloud-native</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600">✓</td>
                  <td className="border border-gray-200 px-3 py-2 text-center">Partial</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">Quick setup</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600">✓</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600">✗</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">When to Stay with CodeTwo</h2>
          <p className="text-gray-600 mb-6">CodeTwo may still be the right choice if you:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Are 100% Microsoft with no plans to change</li>
            <li>Need on-premise deployment options</li>
            <li>Already have it deployed and working</li>
            <li>Require specific Exchange features</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Try Siggly free</h3>
            <p className="text-gray-600 mb-6">See why teams are switching from CodeTwo. Works with Google Workspace and Microsoft 365.</p>
            <Link href="/compare/codetwo"><Button>See Full Comparison <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
