import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Rolling Out Email Signatures to Your Team | Siggly',
  description: 'Step-by-step guide to rolling out new email signatures across your organization. Communication, timing, and change management.',
  keywords: ['email signature rollout', 'deploy signatures team', 'signature change management'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Implementation</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Rolling Out Email Signatures to Your Team</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 10, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop" alt="Team rollout" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">A successful signature rollout requires planning, communication, and proper execution. Here's how to do it right.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Rollout Phases</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Planning</strong> — Define templates, timeline, stakeholders</li>
            <li><strong>Pilot</strong> — Test with small group first</li>
            <li><strong>Communication</strong> — Announce change to organization</li>
            <li><strong>Deployment</strong> — Roll out to all employees</li>
            <li><strong>Verification</strong> — Confirm successful adoption</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Communication Template</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold">Subject: New Email Signatures Rolling Out [Date]</p>
            <p className="mt-4">Hi Team,</p>
            <p className="mt-2">We're updating our email signatures to [reason]. Starting [date], you'll notice a new signature automatically applied to your emails.</p>
            <p className="mt-2">No action is required on your part. If you notice any issues, contact IT.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Stakeholder Alignment</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Marketing — Brand approval</li>
            <li>IT — Technical deployment</li>
            <li>Legal — Disclaimer review</li>
            <li>HR — Employee communication</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Post-Rollout</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Monitor for issues</li>
            <li>Collect feedback</li>
            <li>Address stragglers</li>
            <li>Document process for future</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Smooth rollouts</h3>
            <p className="text-gray-600 mb-6">Siggly's centralized deployment makes team-wide rollouts simple.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
