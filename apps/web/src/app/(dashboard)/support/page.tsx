'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/dashboard';
import { 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  FileText, 
  Rocket,
  Users,
  Settings,
  Shield,
  Zap,
} from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // Getting Started
  {
    category: 'Getting Started',
    question: 'How do I create my first email signature?',
    answer: 'Navigate to Templates in the sidebar, click "New Template", and use our drag-and-drop editor to build your signature. You can add text blocks, images, social links, contact info, and more. Once done, click Save to store your template.',
  },
  {
    category: 'Getting Started',
    question: 'How do I connect my Google Workspace?',
    answer: 'Go to Integrations in the sidebar and click "Connect" next to Google Workspace. You\'ll be redirected to Google to authorize Siggly. Make sure you\'re signed in as a Google Workspace admin to grant the necessary permissions.',
  },
  {
    category: 'Getting Started',
    question: 'What permissions does Siggly need?',
    answer: 'Siggly requires permission to manage Gmail signatures for users in your organization. We use the Gmail API to read and update signatures. We never access email content, contacts, or any other data.',
  },
  // Deployment
  {
    category: 'Deployment',
    question: 'How do I deploy a signature to my team?',
    answer: 'Go to Deployments, select a template, choose your target users (yourself, selected users, or all users), and click Deploy. The signature will be pushed to Gmail for the selected users within a few minutes.',
  },
  {
    category: 'Deployment',
    question: 'Can I deploy different signatures to different departments?',
    answer: 'Yes! When deploying, you can select specific users or filter by department. Create different templates for each department and deploy them to the appropriate groups.',
  },
  {
    category: 'Deployment',
    question: 'Why did my deployment fail?',
    answer: 'Deployments can fail if: 1) Your Google Workspace connection expired - try reconnecting. 2) A user\'s email doesn\'t exist in Google Workspace. 3) You don\'t have admin permissions for certain users. Check the deployment details for specific error messages.',
  },
  // Templates
  {
    category: 'Templates',
    question: 'Can I use dynamic fields in my signature?',
    answer: 'Yes! Use placeholders like {{first_name}}, {{last_name}}, {{email}}, {{job_title}}, {{department}}, and {{company}}. These will be automatically replaced with each user\'s actual information when deployed.',
  },
  {
    category: 'Templates',
    question: 'What image formats are supported?',
    answer: 'We support PNG, JPG, GIF, and WebP images. For best results, use PNG for logos and graphics. Images are automatically optimized for email clients. We recommend keeping images under 100KB for faster loading.',
  },
  {
    category: 'Templates',
    question: 'Can I add custom HTML to my signature?',
    answer: 'Yes! Use the HTML block to add custom code. However, be aware that email clients have limited HTML/CSS support. We show compatibility warnings for features that may not work in all clients. Stick to table-based layouts for best results.',
  },
  // Account & Billing
  {
    category: 'Account & Billing',
    question: 'How do I add more users to my organization?',
    answer: 'Users are synced from your Google Workspace directory. Go to Users and click "Sync from Google" to import new team members. User counts are updated automatically.',
  },
  {
    category: 'Account & Billing',
    question: 'How do I change my plan?',
    answer: 'Go to Settings > Billing to view your current plan and upgrade options. Changes take effect immediately, and you\'ll be prorated for any differences.',
  },
  // Troubleshooting
  {
    category: 'Troubleshooting',
    question: 'My signature looks different in Outlook vs Gmail',
    answer: 'Email clients render HTML differently. Outlook uses Microsoft Word\'s rendering engine, which has limited CSS support. Use our Email Client Preview in the template editor to see how your signature will look in different clients. Avoid border-radius, flexbox, and complex CSS.',
  },
  {
    category: 'Troubleshooting',
    question: 'Images aren\'t showing in my signature',
    answer: 'Some email clients block images by default. Ensure your images are hosted on HTTPS URLs. Also, some corporate firewalls may block external images. Consider using smaller, optimized images.',
  },
  {
    category: 'Troubleshooting',
    question: 'How do I reset my signature to default?',
    answer: 'You can deploy a blank signature or the Gmail default by creating an empty template and deploying it. Alternatively, users can manually reset their signature in Gmail settings.',
  },
];

const categories = [
  { name: 'Getting Started', icon: Rocket },
  { name: 'Deployment', icon: Zap },
  { name: 'Templates', icon: FileText },
  { name: 'Account & Billing', icon: Settings },
  { name: 'Troubleshooting', icon: Shield },
];

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-accent px-4 -mx-4 transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-muted-foreground text-sm leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFaqs = selectedCategory
    ? faqs.filter((faq) => faq.category === selectedCategory)
    : faqs;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Help & Support"
        description="Find answers to common questions or get in touch with our team"
      />

      {/* Contact Options */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-violet-100 p-3">
              <Mail className="h-6 w-6 text-violet-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Email Support</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Get help from our support team. We typically respond within 24 hours.
              </p>
              <a
                href="mailto:support@siggly.io"
                className="text-sm text-violet-600 hover:text-violet-700 font-medium mt-2 inline-block"
              >
                support@siggly.io
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Browse by category or search for answers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-violet-600 text-white'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-violet-600 text-white'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                <category.icon className="h-3.5 w-3.5" />
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="divide-y divide-gray-100">
            {filteredFaqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No FAQs found for this category.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Still Need Help */}
      <Card className="bg-gradient-to-r from-violet-50 to-blue-50 border-violet-200">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-foreground mb-2">Still need help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <a
            href="mailto:support@siggly.io"
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Contact Support
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
