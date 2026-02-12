import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Promoting Your Podcast Through Email Signatures | Siggly',
  description: 'Use email signatures to grow your podcast audience. Add podcast links, episode promotions, and subscriber CTAs.',
  keywords: ['podcast email signature', 'promote podcast signature', 'podcast link email'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-podcast-promotion',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Podcasts</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Promoting Your Podcast Through Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 8, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&h=600&fit=crop" alt="Podcast" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">If your company has a podcast, email signatures are a free promotion channel reaching everyone you email.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">What to Include</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Podcast name and logo/icon</li>
            <li>Subscribe link (or podcast landing page)</li>
            <li>Latest episode highlight (optional)</li>
            <li>Platform icons (Spotify, Apple, etc.)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Banner Examples</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>"🎙️ Listen to [Podcast Name] — Subscribe"</li>
            <li>"New episode: [Title] — Listen now"</li>
            <li>"Join 10,000 listeners — [Podcast Name]"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Link to podcast landing page with all platforms</li>
            <li>Update for notable episodes</li>
            <li>Include on relevant team members (not everyone)</li>
            <li>Track clicks to measure interest</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Platform Link Options</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Apple Podcasts</li>
            <li>Spotify</li>
            <li>Google Podcasts</li>
            <li>YouTube (if video)</li>
            <li>Your website's podcast page</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Grow your audience</h3>
            <p className="text-gray-600 mb-6">Siggly makes it easy to add podcast promotions to team signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
