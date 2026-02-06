import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Startup Email Signatures: Build Credibility on a Budget | Siggly',
  description: 'Create professional email signatures for your startup. Budget-friendly tips to look established and build trust with investors and customers.',
  keywords: ['startup email signature', 'tech startup signature', 'email signature early stage'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Startups</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Startup Email Signatures: Build Credibility on a Budget</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 4, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop" alt="Startup team" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Startups need to look professional from day one. A polished email signature helps you compete with established companies when pitching investors and customers.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Why It Matters for Startups</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Investor communications</strong> — First impressions matter for funding</li>
            <li><strong>Customer trust</strong> — Look established even when you're not</li>
            <li><strong>Team professionalism</strong> — Signal organizational maturity</li>
            <li><strong>Free marketing</strong> — Promote your product in every email</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">What to Include</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Name and title (yes, even if you're wearing many hats)</li>
            <li>Company name and brief tagline</li>
            <li>Phone number (shows you're accessible)</li>
            <li>Website link</li>
            <li>LinkedIn profile</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Budget-Friendly Tips</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li>Use free signature generators to start</li>
            <li>Text-based logos work fine initially</li>
            <li>Standardize early, even with 2-3 people</li>
            <li>Upgrade to paid tools as you grow</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">What Investors Notice</h2>
          <p className="text-gray-600 mb-6">When pitching investors, professional details matter:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Consistent signatures across founding team</li>
            <li>Professional email domain (not @gmail.com)</li>
            <li>Clear titles and company positioning</li>
            <li>Links that actually work</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Tip: Include a subtle CTA like "Try [Product] free" in your signature — every investor email becomes a soft pitch.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Free for small teams</h3>
            <p className="text-gray-600 mb-6">Siggly's free plan supports up to 5 users — perfect for early-stage startups.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
