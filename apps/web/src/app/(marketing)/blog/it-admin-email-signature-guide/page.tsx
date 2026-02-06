import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'IT Admin Guide to Email Signature Management | Siggly',
  description: 'Everything IT admins need to know about deploying and managing email signatures. Covers Google Workspace, Microsoft 365, and best practices.',
  keywords: ['it admin email signature', 'deploy email signatures', 'email signature management it'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">IT Admin</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">IT Admin Guide to Email Signature Management</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 10, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 10 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop" alt="IT administration" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Email signatures seem simple until you're responsible for hundreds of them. This guide covers what IT admins need to know about deploying and maintaining signatures at scale.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Common IT Challenges</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>User requests</strong> — "Can you fix my signature?"</li>
            <li><strong>Inconsistency</strong> — Everyone has different formats</li>
            <li><strong>Updates</strong> — Changing signatures for all users</li>
            <li><strong>New hires</strong> — Setting up signatures during onboarding</li>
            <li><strong>Departures</strong> — Removing/redirecting former employee signatures</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Deployment Options</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Google Workspace</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Admin Console:</strong> Append footer via mail routing rules</li>
            <li><strong>Limitation:</strong> Signatures appear at email bottom, limited HTML</li>
            <li><strong>Third-party:</strong> Marketplace apps provide proper placement</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Microsoft 365</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Exchange Rules:</strong> Transport rules for server-side signatures</li>
            <li><strong>Group Policy:</strong> Push to Outlook desktop clients</li>
            <li><strong>Third-party:</strong> Tools like Siggly for comprehensive control</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Evaluation Criteria</h2>
          <p className="text-gray-600 mb-6">When choosing a signature solution, consider:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Platform support (Google, Microsoft, both?)</li>
            <li>Directory integration (automatic user sync)</li>
            <li>Signature placement (before or after quoted text)</li>
            <li>Mobile device support</li>
            <li>Marketing capabilities (banners, campaigns)</li>
            <li>Compliance features (disclaimers, archiving)</li>
            <li>Administrative overhead</li>
            <li>Pricing model</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Implementation Checklist</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Get stakeholder approval (IT, Marketing, Legal)</li>
            <li>Clean up user directory data</li>
            <li>Design signature templates</li>
            <li>Test with pilot group</li>
            <li>Document the solution</li>
            <li>Communicate to users</li>
            <li>Deploy organization-wide</li>
            <li>Monitor and address issues</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Reducing Support Tickets</h2>
          <p className="text-gray-600 mb-6">Centralized management dramatically reduces signature-related support:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>No individual setup required</li>
            <li>Changes propagate automatically</li>
            <li>Users can't break their signatures</li>
            <li>Onboarding becomes automatic</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Built for IT admins</h3>
            <p className="text-gray-600 mb-6">Siggly integrates with your directory and deploys signatures automatically — minimal ongoing maintenance.</p>
            <Link href="/for/it-admins"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
