import Image from 'next/image';
import { Shield, Users, Settings, CheckCircle, Lock, RefreshCw, FileText, Zap } from 'lucide-react';
import {
  MarketingHero,
  MarketingStatsBar,
  MarketingFeatureGrid,
  MarketingTestimonial,
  MarketingCTA,
} from '@/components/marketing';
import { generateMetadata as genMeta, generateBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = genMeta({
  title: 'Email Signature Management for IT Admins',
  description: 'Centralized email signature control for IT teams. Deploy consistent signatures across Google Workspace and Microsoft 365 with zero end-user involvement.',
  keywords: ['IT admin', 'centralized management', 'domain-wide deployment', 'directory sync', 'compliance'],
  canonical: '/for/it-admins',
});

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Solutions', url: '/for' },
  { name: 'IT Admins', url: '/for/it-admins' },
];

const painPoints = [
  {
    icon: Users,
    title: 'Employees mess up signatures',
    description: 'Users add random fonts, wrong logos, or outdated info. You spend hours fixing them.',
  },
  {
    icon: Shield,
    title: 'Missing legal disclaimers',
    description: 'Compliance requires specific text in every email. Manual enforcement is impossible.',
  },
  {
    icon: RefreshCw,
    title: 'No central control',
    description: 'When branding changes, you have to update hundreds of signatures manually.',
  },
  {
    icon: Settings,
    title: 'Mobile inconsistency',
    description: 'Signatures look different on mobile apps, breaking your professional image.',
  },
];

const features = [
  {
    icon: Lock,
    title: 'Domain-Wide Deployment',
    description: 'Push signatures to every user in your Google Workspace or Microsoft 365 organization with one click.',
  },
  {
    icon: Users,
    title: 'Directory Sync',
    description: 'Automatically import users from your directory. New hires get signatures on day one.',
  },
  {
    icon: FileText,
    title: 'Compliance Templates',
    description: 'Pre-built legal disclaimer blocks for GDPR, HIPAA, and industry-specific requirements.',
  },
  {
    icon: RefreshCw,
    title: 'Automatic Updates',
    description: 'When job titles or departments change, signatures update automatically.',
  },
  {
    icon: Shield,
    title: 'Audit Trail',
    description: 'Full history of every signature change for compliance and security reviews.',
  },
  {
    icon: Zap,
    title: 'No IT Tickets',
    description: 'End users never touch their signatures. Zero support requests, zero mistakes.',
  },
];

const stats = [
  { value: '60s', label: 'Setup time' },
  { value: '100%', label: 'Compliance rate' },
  { value: '0', label: 'IT tickets' },
  { value: '24/7', label: 'Auto-sync' },
];

export default function ITAdminsPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <MarketingHero
        variant="slate"
        badge={{ icon: Shield, text: 'Built for IT Teams' }}
        title="Centralized Email Signature Control for IT Admins"
        description="Deploy consistent, compliant email signatures across your entire organization. No end-user involvement. No support tickets. No mistakes."
        primaryButtonText="Start Free Trial"
        primaryButtonHref="/signup"
        image={{
          src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
          alt: 'IT team managing email signatures',
        }}
        imageOverlay={
          <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">247 signatures deployed</p>
                <p className="text-sm text-gray-500">Completed in 3 seconds</p>
              </div>
            </div>
          </div>
        }
      />

      <MarketingStatsBar stats={stats} variant="violet" />

      {/* Pain Points */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Sound familiar?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              IT teams waste hours every week dealing with email signature chaos. 
              There's a better way.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {painPoints.map((point) => (
              <div key={point.title} className="bg-red-50 border border-red-100 rounded-xl p-6">
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <point.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">{point.title}</h3>
                <p className="text-sm text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                One dashboard. Complete control.
              </h2>
              <p className="text-gray-600 mb-8">
                Siggly gives IT admins everything they need to manage email signatures 
                at scale. Connect your directory, design your templates, and deploy 
                to everyone—all without touching individual mailboxes.
              </p>
              <ul className="space-y-4">
                {['Google Workspace integration', 'Microsoft 365 support', 'Department-based templates', 'Scheduled deployments', 'Role-based access control'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                alt="Siggly dashboard for IT admins"
                width={800}
                height={600}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <MarketingFeatureGrid
        title="Built for enterprise IT"
        description="Everything you need to manage signatures at scale, with the security and compliance features your organization requires."
        features={features}
        columns={3}
        iconVariant="violet"
      />

      <MarketingTestimonial
        quote="We used to spend 2-3 hours per week on signature-related tickets. With Siggly, we deployed once and haven't touched it since. It just works."
        author={{
          name: 'Michael Chen',
          title: 'IT Director, TechCorp (500+ employees)',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        }}
        variant="slate"
      />

      <MarketingCTA
        title="Ready to take control of your email signatures?"
        description="Join IT teams at hundreds of companies who trust Siggly for centralized signature management."
        primaryButtonText="Start Free Trial"
        primaryButtonHref="/signup"
        secondaryButtonText="View Pricing"
        secondaryButtonHref="/pricing"
        variant="default"
      />
    </>
  );
}
