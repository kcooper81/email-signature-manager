import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signatures with HubSpot CRM Integration | Siggly',
  description: 'Connect your email signatures to HubSpot CRM. Sync contact data, personalize signatures, and track engagement.',
  keywords: ['hubspot email signature', 'crm email signature', 'hubspot signature integration'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-hubspot-integration',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Integrations</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signatures with HubSpot CRM Integration</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 7, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop" alt="CRM integration" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Connecting email signatures to HubSpot CRM creates powerful opportunities for personalization and tracking. Here's how the integration works.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Integration Benefits</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Contact sync</strong> — Pull employee data from HubSpot contacts</li>
            <li><strong>Personalization</strong> — Dynamic fields from CRM properties</li>
            <li><strong>Engagement tracking</strong> — Connect signature clicks to contacts</li>
            <li><strong>Campaign alignment</strong> — Coordinate banners with HubSpot campaigns</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Use Cases</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Employee directory</strong> — Sync team data for signatures</li>
            <li><strong>Sales sequences</strong> — Consistent signatures in HubSpot emails</li>
            <li><strong>Attribution</strong> — Track which signatures drive conversions</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">HubSpot Properties for Signatures</h2>
          <p className="text-gray-600 mb-6">Common HubSpot contact properties to pull into signatures:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>First name, last name</li>
            <li>Job title</li>
            <li>Phone number</li>
            <li>Department</li>
            <li>HubSpot owner (for assignment-based routing)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Implementation</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Connect signature tool to HubSpot via OAuth</li>
            <li>Map HubSpot properties to signature fields</li>
            <li>Configure sync frequency</li>
            <li>Test and deploy signatures</li>
          </ol>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">HubSpot integration available</h3>
            <p className="text-gray-600 mb-6">Siggly integrates with HubSpot CRM to sync your team data and enhance your signatures.</p>
            <Link href="/integrations/hubspot"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
