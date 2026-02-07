import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight, Check, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta, generateBlogPostSchema, generateFAQSchema } from '@/lib/seo/metadata';

const postData = {
  slug: 'google-workspace-admin-signature-guide',
  title: 'Google Workspace Admin Guide to Email Signatures',
  excerpt: 'Complete guide for IT admins to deploy, manage, and enforce email signatures across your Google Workspace organization.',
  date: '2026-02-07',
  readTime: '12 min',
  category: 'IT Admin',
  image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
};

export const metadata = genMeta({
  title: 'Google Workspace Admin Guide to Email Signatures | IT Admin Tutorial',
  description: 'Complete guide for IT admins to deploy, manage, and enforce email signatures across your Google Workspace organization. Step-by-step instructions with best practices.',
  keywords: [
    'google workspace admin email signatures',
    'gmail signature management it admin',
    'google admin console signatures',
    'deploy signatures google workspace',
    'centralized gmail signatures',
    'google workspace signature policy',
  ],
  canonical: `/blog/${postData.slug}`,
  ogType: 'article',
  article: {
    publishedTime: postData.date,
    authors: ['Siggly Team'],
    tags: [postData.category, 'Google Workspace', 'IT Admin'],
  },
});

const faqs = [
  {
    question: 'Can I deploy signatures to specific departments only?',
    answer: 'Yes. Using organizational units (OUs) in Google Workspace, you can target specific departments, locations, or teams with different signature templates.',
  },
  {
    question: 'How long does it take for signature changes to propagate?',
    answer: 'Native Google Admin Console changes can take up to 24 hours. Third-party tools like Siggly deploy instantly using the Gmail API.',
  },
  {
    question: 'Do users need to do anything after I deploy signatures?',
    answer: 'With proper deployment via Gmail API, signatures appear automatically. Users don\'t need to install anything or take any action.',
  },
  {
    question: 'Can employees override the centrally managed signature?',
    answer: 'This depends on your deployment method. With enforcement enabled, any manual changes are overwritten on the next sync.',
  },
  {
    question: 'What permissions do I need to manage signatures?',
    answer: 'You need Super Admin or a custom admin role with Gmail settings management permissions in Google Workspace.',
  },
];

export default function BlogPost() {
  const blogSchema = generateBlogPostSchema({
    title: postData.title,
    description: postData.excerpt,
    url: `/blog/${postData.slug}`,
    image: postData.image,
    datePublished: postData.date,
    author: 'Siggly Team',
    readTime: postData.readTime,
    category: postData.category,
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
          </Link>
          
          <div className="mb-8">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{postData.category}</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">{postData.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> February 7, 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {postData.readTime} read</span>
          </div>
          
          <Image 
            src={postData.image} 
            alt="Google Workspace Admin managing email signatures" 
            width={1200} 
            height={600} 
            className="rounded-2xl mb-12" 
          />
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Managing email signatures across a Google Workspace organization is one of those tasks that seems simple until you're responsible for 500 users. I've rolled out signatures to organizations ranging from 20 to 5,000 users, and here's everything I've learned about doing it right.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Why Centralized Signature Management Matters</h2>
            <p className="text-gray-600 mb-6">
              Before diving into the how, let's address the why. When employees create their own signatures, you get:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Inconsistent branding (different fonts, colors, logos)</li>
              <li>Outdated information (old phone numbers, wrong titles)</li>
              <li>Missing legal disclaimers (compliance risk)</li>
              <li>Unprofessional formatting (Comic Sans, anyone?)</li>
              <li>No marketing opportunities (banner campaigns impossible)</li>
            </ul>
            <p className="text-gray-600 mb-6">
              Centralized management solves all of these. One template, automatic population, consistent branding.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Your Options for Google Workspace Signature Management</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-3">Option 1: Google Admin Console (Native)</h3>
            <p className="text-gray-600 mb-6">
              Google Workspace includes basic signature functionality through the Admin Console's "Append Footer" feature.
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-6">
              <h4 className="font-semibold mb-3">How to Set Up:</h4>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>Go to admin.google.com → Apps → Google Workspace → Gmail</li>
                <li>Click "Compliance" → "Append footer"</li>
                <li>Configure your footer HTML</li>
                <li>Select organizational units to apply</li>
                <li>Save and wait up to 24 hours for propagation</li>
              </ol>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800 font-medium mb-2">Critical Limitation</p>
                  <p className="text-amber-700">The append footer places signatures at the very bottom of emails, even below quoted replies. In threaded conversations, your signature appears after the entire email chain—not where recipients expect it.</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-3">Option 2: Gmail API / Third-Party Tools</h3>
            <p className="text-gray-600 mb-6">
              Tools that use the Gmail API can set signatures in the proper location (above quoted text) and offer additional features:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Proper placement</strong> — Signature appears where users expect</li>
              <li><strong>Visual editor</strong> — No HTML coding required</li>
              <li><strong>Dynamic fields</strong> — Auto-populate from Google Directory</li>
              <li><strong>Department rules</strong> — Different signatures per team</li>
              <li><strong>Campaign banners</strong> — Rotate promotional content</li>
              <li><strong>Analytics</strong> — Track clicks and engagement</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Step-by-Step: Deploying Signatures with Siggly</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-3">Step 1: Connect Google Workspace</h3>
            <p className="text-gray-600 mb-6">
              Sign in with your Google Workspace admin account. We use OAuth 2.0—your password is never stored. You'll grant permissions to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Read user directory information</li>
              <li>Manage Gmail signatures</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">Step 2: Sync Your Users</h3>
            <p className="text-gray-600 mb-6">
              Users are automatically imported from your Google Workspace directory with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Display name</li>
              <li>Job title</li>
              <li>Department</li>
              <li>Phone numbers</li>
              <li>Profile photo</li>
              <li>Custom attributes</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-800 font-medium mb-2">Pro Tip</p>
                  <p className="text-blue-700">Before deploying, audit your Google Workspace directory. Missing job titles or outdated phone numbers will show up in signatures. Clean your data first.</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-3">Step 3: Design Your Template</h3>
            <p className="text-gray-600 mb-6">
              Use the visual editor to create your signature. Dynamic fields like {"{{name}}"} and {"{{title}}"} automatically populate for each user.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">Step 4: Assign to Users</h3>
            <p className="text-gray-600 mb-6">
              Select which users or departments get which template. You can have:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>One signature for everyone</li>
              <li>Different signatures per department</li>
              <li>Role-specific signatures (Sales vs Support)</li>
              <li>Location-based signatures (with local phone numbers)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">Step 5: Deploy</h3>
            <p className="text-gray-600 mb-6">
              Click deploy. Signatures push to Gmail accounts in 30-60 seconds. Users see their new signature immediately—no action required on their part.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Deployment Best Practices</h2>
            
            <div className="space-y-4 my-6">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Pilot with IT first</p>
                  <p className="text-sm text-gray-600">Deploy to your IT team for a week before rolling out company-wide.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Communicate the change</p>
                  <p className="text-sm text-gray-600">Send an email explaining the new signatures before deployment.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Test across clients</p>
                  <p className="text-sm text-gray-600">Check how signatures render in Gmail web, mobile, and Outlook.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Plan for exceptions</p>
                  <p className="text-sm text-gray-600">Some roles (legal, executives) may need custom signatures.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Common Issues and Solutions</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-3">Images Not Displaying</h3>
            <p className="text-gray-600 mb-6">
              Gmail blocks images by default for new senders. Ensure your images are hosted on a reliable CDN with proper caching headers. Avoid Google Drive links—they often break.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">Signature Not Appearing on Mobile</h3>
            <p className="text-gray-600 mb-6">
              The Gmail mobile app has a separate signature setting. API-based tools sync to mobile automatically, but native Admin Console footers don't appear on mobile.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">Users Complaining About Signature Length</h3>
            <p className="text-gray-600 mb-6">
              Keep signatures concise. The ideal signature is 3-5 lines of text plus a small logo. Anything longer gets ignored or causes formatting issues.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6 my-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Next Steps</h2>
            <p className="text-gray-600 mb-6">
              Ready to deploy professional signatures across your Google Workspace organization? Here's what to do:
            </p>
            <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
              <li>Audit your Google Workspace directory for data accuracy</li>
              <li>Design your signature template (or use one of ours)</li>
              <li>Start with a pilot group</li>
              <li>Roll out to the full organization</li>
              <li>Set up automatic sync for new hires</li>
            </ol>

            <div className="bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200 rounded-xl p-8 my-12">
              <h3 className="text-xl font-bold mb-4">Deploy to your entire team in 60 seconds</h3>
              <p className="text-gray-600 mb-6">Siggly integrates with Google Workspace to deploy professional signatures with proper placement, dynamic fields, and campaign banners.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/google-workspace"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                <Link href="/signup"><Button variant="outline">Start Free Trial</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
