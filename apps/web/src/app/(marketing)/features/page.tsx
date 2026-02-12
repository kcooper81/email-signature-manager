import Link from 'next/link';
import { Mail, ArrowRight, Check, Users, Palette, Rocket, Shield, BarChart3, Zap, Globe, Clock, Building2, RefreshCw, Lock, Link2, UserPlus, GitBranch, Image, FileText, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IntegrationsSection } from '@/components/marketing/integrations-section';
import { MarketingCTA } from '@/components/marketing/cta';

export const metadata = {
  title: 'Features | Siggly - Email Signature Management',
  description: 'Explore all features of Siggly email signature management: visual editor, team management, one-click deployment, analytics, and more.',
  alternates: {
    canonical: 'https://siggly.io/features',
  },
};

const features = [
  {
    icon: Palette,
    title: 'Visual Signature Editor',
    description: 'Design beautiful email signatures with our intuitive drag-and-drop editor. No coding required.',
    benefits: ['Drag-and-drop blocks', 'Real-time preview', 'Custom branding', 'Mobile-responsive'],
    color: 'violet',
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Sync users from Google Workspace automatically. Organize by department and manage at scale.',
    benefits: ['Auto-sync from directory', 'Department grouping', 'Bulk operations', 'Role-based access'],
    color: 'blue',
  },
  {
    icon: Rocket,
    title: 'One-Click Deployment',
    description: 'Deploy signatures to your entire team instantly. No more manual copying and pasting.',
    benefits: ['Deploy to all or select users', 'Instant updates', 'Deployment history', 'Rollback support'],
    color: 'cyan',
  },
  {
    icon: Link2,
    title: 'Personal Links',
    description: 'Let employees add their own scheduling and social links like Calendly and LinkedIn.',
    benefits: ['Self-service profile updates', 'Calendly integration', 'LinkedIn profiles', 'Custom URLs'],
    color: 'indigo',
  },
  {
    icon: UserPlus,
    title: 'Bulk Invite',
    description: 'Invite multiple employees at once to create accounts and manage their own profiles.',
    benefits: ['Mass employee onboarding', 'Self-service accounts', 'Reduced admin workload', 'Email invitations'],
    color: 'emerald',
  },
  {
    icon: GitBranch,
    title: 'Signature Rules',
    description: 'Create conditional logic to show different signatures based on recipient, department, or date.',
    benefits: ['Internal vs external', 'Department-specific', 'Date-based campaigns', 'Priority ordering'],
    color: 'orange',
  },
  {
    icon: Image,
    title: 'Campaign Banners',
    description: 'Add promotional banners with built-in click tracking. Schedule campaigns with start/end dates.',
    benefits: ['Click tracking', 'Scheduled campaigns', 'A/B testing ready', 'ROI measurement'],
    color: 'pink',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track clicks on links and banners. Measure engagement and signature marketing ROI.',
    benefits: ['Click-through rates', 'Link performance', 'Campaign metrics', 'Export reports'],
    color: 'amber',
  },
  {
    icon: Shield,
    title: 'Role-Based Access (RBAC)',
    description: 'Control who can do what with granular permissions. Owner, Admin, Editor, and Viewer roles.',
    benefits: ['Granular permissions', 'Secure delegation', 'Compliance ready', 'Team hierarchy'],
    color: 'red',
  },
  {
    icon: ClipboardList,
    title: 'Audit Logs',
    description: 'Complete record of all actions for compliance. Track who changed what and when.',
    benefits: ['Full action history', 'Before/after values', 'SOC 2 ready', 'HIPAA compliant'],
    color: 'slate',
  },
  {
    icon: FileText,
    title: 'Disclaimers Library',
    description: 'Browse and insert 15+ pre-written legal disclaimers including GDPR, HIPAA, and confidentiality.',
    benefits: ['GDPR compliance', 'HIPAA notices', 'Legal disclaimers', 'Industry-specific'],
    color: 'teal',
  },
  {
    icon: RefreshCw,
    title: 'Dynamic Fields',
    description: 'Use placeholders that automatically populate with each user\'s information.',
    benefits: ['Name, title, department', 'Contact information', 'Custom fields', 'Conditional content'],
    color: 'green',
  },
];


export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Everything you need to manage
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              email signatures at scale
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Powerful features designed for teams of all sizes. From startups to enterprises.
          </p>
          <Link href="/signup">
            <Button size="lg">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <IntegrationsSection />

      {/* CTA */}
      <MarketingCTA 
        description="Get started with our free plan. No credit card required."
        variant="default"
      />

    </>
  );
}
