import Link from 'next/link';
import { BookOpen, Mail, MessageCircle, FileText, Zap, Users } from 'lucide-react';
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
    icon: BookOpen,
    title: 'Documentation',
    description: 'Comprehensive guides and tutorials',
    links: [
      { text: 'Template Builder Guide', href: '/features' },
      { text: 'Integration Setup', href: '/google-workspace' },
      { text: 'Department Templates', href: '/features' },
    ],
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Manage users and permissions',
    links: [
      { text: 'Add Team Members', href: '/features' },
      { text: 'Assign Templates', href: '/features' },
      { text: 'Bulk Operations', href: '/features' },
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
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Start Guides</h2>
          <div className="grid md:grid-cols-3 gap-8">
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
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/blog" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
              <FileText className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Blog & Guides</h3>
              <p className="text-sm text-gray-600">
                Best practices, tips, and industry insights
              </p>
            </Link>

            <Link href="/use-cases" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
              <Users className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Use Cases</h3>
              <p className="text-sm text-gray-600">
                See how teams use Siggly for their needs
              </p>
            </Link>

            <Link href="/security" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
              <FileText className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Security & Compliance</h3>
              <p className="text-sm text-gray-600">
                Learn about our security practices
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
