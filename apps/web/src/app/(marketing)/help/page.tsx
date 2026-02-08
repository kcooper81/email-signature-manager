import Link from 'next/link';
import { BookOpen, Mail, MessageCircle, FileText, Zap, Users, Link2, GitBranch, Image, Shield, BarChart3, ClipboardList, Sparkles } from 'lucide-react';
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
    links: [
      { text: 'Connect Google Workspace', href: '/google-workspace' },
      { text: 'Create Your First Template', href: '/features' },
      { text: 'Deploy to Your Team', href: '/features' },
    ],
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Manage users, invites, and permissions',
    links: [
      { text: 'Bulk Invite Employees', href: '/features' },
      { text: 'Role-Based Access (RBAC)', href: '/features' },
      { text: 'Personal Links Setup', href: '/features' },
    ],
  },
  {
    icon: GitBranch,
    title: 'Signature Rules',
    description: 'Conditional logic for smart signatures',
    links: [
      { text: 'Internal vs External Rules', href: '/features' },
      { text: 'Department-Based Signatures', href: '/features' },
      { text: 'Campaign Date Scheduling', href: '/features' },
    ],
  },
  {
    icon: Image,
    title: 'Campaign Banners',
    description: 'Promotional banners with tracking',
    links: [
      { text: 'Add Banner to Signature', href: '/features' },
      { text: 'Schedule Campaign Dates', href: '/features' },
      { text: 'Track Banner Clicks', href: '/features' },
    ],
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track clicks and measure ROI',
    links: [
      { text: 'View Click Analytics', href: '/features' },
      { text: 'Link Performance', href: '/features' },
      { text: 'Export Reports', href: '/features' },
    ],
  },
  {
    icon: Shield,
    title: 'Compliance & Security',
    description: 'Disclaimers, audit logs, and more',
    links: [
      { text: 'Disclaimers Library', href: '/features' },
      { text: 'Audit Logs', href: '/features' },
      { text: 'GDPR & HIPAA Compliance', href: '/security' },
    ],
  },
];


export default function HelpPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-6">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Help Center</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find answers, browse documentation, or get in touch with our support team.
          </p>
          {/* What's New Banner */}
          <Link 
            href="/help/releases"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">What's New: February 2026 Release</span>
            <span className="text-violet-200">→</span>
          </Link>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Start Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((section) => (
              <div key={section.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <section.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{section.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.text}>
                      <Link 
                        href={link.href}
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {link.text} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <DynamicFAQs />
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-200 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
              <p className="text-gray-600">
                Can't find what you're looking for? Our support team is here to help.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-sm text-gray-600">Response within 24 hours</p>
                  </div>
                </div>
                <a 
                  href="mailto:support@siggly.io"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  support@siggly.io
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-violet-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Contact Form</h3>
                    <p className="text-sm text-gray-600">Get personalized assistance</p>
                  </div>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Contact Us
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
          <h2 className="text-3xl font-bold text-center mb-12">Additional Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/help/releases" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-violet-300 transition-colors">
              <Sparkles className="h-8 w-8 text-violet-600 mb-3" />
              <h3 className="font-semibold mb-2">What's New</h3>
              <p className="text-sm text-gray-600">
                Latest features and product updates
              </p>
            </Link>

            <Link href="/blog" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
              <FileText className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Blog & Guides</h3>
              <p className="text-sm text-gray-600">
                Best practices, tips, and insights
              </p>
            </Link>

            <Link href="/use-cases" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
              <Users className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Use Cases</h3>
              <p className="text-sm text-gray-600">
                See how teams use Siggly
              </p>
            </Link>

            <Link href="/security" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
              <Shield className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Security</h3>
              <p className="text-sm text-gray-600">
                Our security practices
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
