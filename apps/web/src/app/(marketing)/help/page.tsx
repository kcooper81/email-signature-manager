import Link from 'next/link';
import { BookOpen, Mail, MessageCircle, FileText, Zap, Users, GitBranch, Image, Shield, BarChart3, Sparkles, ArrowRight, RefreshCw, Palette, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta } from '@/lib/seo';
import { DynamicFAQs } from '@/components/help/dynamic-faqs';

export const metadata = genMeta({
  title: 'Help Center - Documentation & Support | Siggly',
  description: 'Get help with Siggly. Browse documentation, guides, and FAQs or contact our support team.',
  keywords: ['help', 'support', 'documentation', 'guides', 'FAQ', 'customer support'],
  canonical: '/help',
});

const quickLinks = [
  {
    icon: Zap,
    title: 'Getting Started',
    description: 'Set up your first email signature in minutes',
    color: 'amber',
    links: [
      { text: 'Connect Google Workspace', href: '/help/google-workspace-setup' },
      { text: 'Create Your First Template', href: '/help/create-first-template' },
      { text: 'Deploy to Your Team', href: '/help/deploy-signatures' },
    ],
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Manage users, invites, and permissions',
    color: 'blue',
    links: [
      { text: 'Bulk Invite Employees', href: '/help/bulk-invite-employees' },
      { text: 'Role-Based Access (RBAC)', href: '/help/rbac-permissions' },
      { text: 'Personal Links Setup', href: '/help/personal-links-setup' },
    ],
  },
  {
    icon: GitBranch,
    title: 'Signature Rules',
    description: 'Conditional logic for smart signatures',
    color: 'violet',
    links: [
      { text: 'Internal vs External Rules', href: '/help/signature-rules-internal-external' },
      { text: 'Department-Based Signatures', href: '/help/department-signatures' },
      { text: 'Campaign Date Scheduling', href: '/help/campaign-scheduling' },
    ],
  },
  {
    icon: Image,
    title: 'Campaign Banners',
    description: 'Promotional banners with click tracking',
    color: 'pink',
    links: [
      { text: 'Add Banner to Signature', href: '/help/add-campaign-banner' },
      { text: 'Schedule Campaign Dates', href: '/help/campaign-scheduling' },
      { text: 'Track Banner Clicks', href: '/help/track-banner-clicks' },
    ],
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track clicks and measure ROI',
    color: 'emerald',
    links: [
      { text: 'View Click Analytics', href: '/help/view-analytics' },
      { text: 'Link Performance', href: '/help/link-performance' },
      { text: 'Export Reports', href: '/help/export-reports' },
    ],
  },
  {
    icon: Shield,
    title: 'Compliance & Security',
    description: 'Disclaimers, audit logs, and more',
    color: 'slate',
    links: [
      { text: 'Disclaimer Engine', href: '/help/disclaimer-engine' },
      { text: 'Audit Logs', href: '/help/audit-logs' },
      { text: 'GDPR & HIPAA Compliance', href: '/security' },
    ],
  },
  {
    icon: RefreshCw,
    title: 'HR Sync',
    description: 'Sync employee data from HR providers',
    color: 'cyan',
    links: [
      { text: 'Connect HR Provider', href: '/help/hr-sync-setup' },
      { text: 'Approve Pending Changes', href: '/help/hr-sync-approvals' },
      { text: 'Profile Validation Rules', href: '/help/profile-validation' },
    ],
  },
  {
    icon: ClipboardCheck,
    title: 'Lifecycle Automation',
    description: 'Automate onboarding and offboarding workflows',
    color: 'orange',
    links: [
      { text: 'Create Automation Workflow', href: '/help/lifecycle-workflows' },
      { text: 'Workflow Triggers & Actions', href: '/help/workflow-triggers' },
      { text: 'Test Workflows', href: '/help/test-workflows' },
    ],
  },
  {
    icon: Palette,
    title: 'Brand Governance',
    description: 'Brand guidelines and compliance auditing',
    color: 'purple',
    links: [
      { text: 'Set Up Brand Guidelines', href: '/help/brand-guidelines' },
      { text: 'Run Brand Audit', href: '/help/brand-audit' },
      { text: 'Manage Brand Assets', href: '/help/brand-assets' },
    ],
  },
];

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'hover:border-amber-300' },
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'hover:border-blue-300' },
  violet: { bg: 'bg-violet-50', icon: 'text-violet-600', border: 'hover:border-violet-300' },
  pink: { bg: 'bg-pink-50', icon: 'text-pink-600', border: 'hover:border-pink-300' },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'hover:border-emerald-300' },
  slate: { bg: 'bg-slate-100', icon: 'text-slate-600', border: 'hover:border-slate-300' },
  cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', border: 'hover:border-cyan-300' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'hover:border-orange-300' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'hover:border-purple-300' },
};


export default function HelpPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-6">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find answers, browse guides, or reach out to our support team.
          </p>
          {/* What's New Banner */}
          <Link
            href="/help/releases"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity shadow-md"
          >
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">What&apos;s New: February 2026 Release</span>
            <span className="text-violet-200">→</span>
          </Link>
        </div>
      </section>

      {/* Quick Start Guides */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Quick Start Guides</h2>
            <p className="text-gray-600">Everything you need to get up and running</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {quickLinks.map((section) => {
              const colors = colorMap[section.color] || colorMap.blue;
              return (
                <div
                  key={section.title}
                  className={`bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 ${colors.border} hover:shadow-md`}
                >
                  <div className={`h-11 w-11 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <section.icon className={`h-5 w-5 ${colors.icon}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{section.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{section.description}</p>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.text}>
                        <Link
                          href={link.href}
                          className="group flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to the most common questions</p>
          </div>
          <DynamicFAQs />
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-200 rounded-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Need More Help?</h2>
              <p className="text-gray-600">
                Our support team typically responds within 24 hours.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
                <a
                  href="mailto:support@siggly.io"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  support@siggly.io
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-violet-300 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 bg-violet-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Contact Form</h3>
                    <p className="text-sm text-gray-500">Get personalized assistance</p>
                  </div>
                </div>
                <Link href="/contact">
                  <Button variant="outline" size="sm" className="mt-0.5">
                    Contact Us
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Additional Resources</h2>
            <p className="text-gray-600">Explore more ways to get value from Siggly</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/help/releases" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-violet-300 hover:shadow-md transition-all group">
              <Sparkles className="h-8 w-8 text-violet-600 mb-3" />
              <h3 className="font-semibold mb-1.5 group-hover:text-violet-700 transition-colors">What&apos;s New</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Latest features and product updates
              </p>
            </Link>

            <Link href="/blog" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all group">
              <FileText className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-1.5 group-hover:text-blue-700 transition-colors">Blog & Guides</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Best practices, tips, and insights
              </p>
            </Link>

            <Link href="/use-cases" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-md transition-all group">
              <Users className="h-8 w-8 text-emerald-600 mb-3" />
              <h3 className="font-semibold mb-1.5 group-hover:text-emerald-700 transition-colors">Use Cases</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                See how teams use Siggly
              </p>
            </Link>

            <Link href="/security" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-md transition-all group">
              <Shield className="h-8 w-8 text-slate-600 mb-3" />
              <h3 className="font-semibold mb-1.5 group-hover:text-slate-700 transition-colors">Security</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our security practices and compliance
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
