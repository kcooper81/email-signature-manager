import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight, AlertTriangle, Check, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta, generateBlogPostSchema, generateFAQSchema } from '@/lib/seo/metadata';

const postData = {
  slug: 'gmail-signature-troubleshooting',
  title: 'Gmail Signature Not Showing? Troubleshooting Guide for Google Workspace',
  excerpt: 'Fix common Gmail signature issues including signatures not appearing, images not loading, and mobile sync problems in Google Workspace.',
  date: '2026-02-07',
  readTime: '8 min',
  category: 'Troubleshooting',
  image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
};

export const metadata = genMeta({
  title: 'Gmail Signature Not Showing? Troubleshooting Guide | Google Workspace',
  description: 'Fix common Gmail signature issues: signatures not appearing, images not loading, mobile sync problems. Step-by-step solutions for Google Workspace admins.',
  keywords: [
    'gmail signature not showing',
    'gmail signature not working',
    'gmail signature images not displaying',
    'google workspace signature problems',
    'gmail signature troubleshooting',
    'gmail signature mobile not syncing',
    'gmail signature disappeared',
  ],
  canonical: `/blog/${postData.slug}`,
  ogType: 'article',
  article: {
    publishedTime: postData.date,
    authors: ['Siggly Team'],
    tags: [postData.category, 'Google Workspace', 'Gmail'],
  },
});

const faqs = [
  {
    question: 'Why did my Gmail signature suddenly disappear?',
    answer: 'Common causes include browser cache issues, a recent Google Workspace update, or an admin changing signature settings. Try clearing your cache and checking if the signature is still configured in Gmail settings.',
  },
  {
    question: 'Why is my signature showing at the bottom of the email thread?',
    answer: 'This happens when using Google Admin Console\'s "Append Footer" feature. It adds content at the very bottom of emails, including below quoted replies. Use a third-party tool with Gmail API access for proper placement.',
  },
  {
    question: 'How long does it take for signature changes to appear?',
    answer: 'User-level changes appear immediately. Admin-deployed signatures via Append Footer can take up to 24 hours. Third-party tools using the Gmail API deploy instantly.',
  },
  {
    question: 'Why does my signature look different on mobile?',
    answer: 'The Gmail mobile app uses a separate signature setting. Native admin tools don\'t sync to mobile. You need a tool that uses the Gmail API to sync signatures across all devices.',
  },
];

const issues = [
  {
    title: 'Signature Not Appearing at All',
    symptoms: ['No signature on sent emails', 'Signature field is empty', 'Signature was there but disappeared'],
    causes: [
      'Signature not saved properly',
      'Browser cache issue',
      'Admin policy overriding user settings',
      'Using wrong "From" address',
    ],
    solutions: [
      'Go to Gmail Settings → See all settings → General → Signature',
      'Ensure signature is selected for the correct email address',
      'Check "signature defaults" for new emails and replies',
      'Clear browser cache and cookies',
      'Check with IT if admin policies are in place',
    ],
  },
  {
    title: 'Images Not Displaying',
    symptoms: ['Broken image icons', 'Images show as attachments', 'Logo not visible to recipients'],
    causes: [
      'Images hosted on inaccessible URLs',
      'Google Drive images with wrong permissions',
      'Images blocked by recipient\'s email client',
      'Image URLs expired or changed',
    ],
    solutions: [
      'Host images on a public CDN (not Google Drive)',
      'Use direct image URLs, not shortened links',
      'Keep images under 100KB for faster loading',
      'Test by sending to external email addresses',
      'Use PNG or JPG format (avoid SVG)',
    ],
  },
  {
    title: 'Signature in Wrong Position',
    symptoms: ['Signature appears below quoted text', 'Signature at very bottom of email chain', 'Signature placement inconsistent'],
    causes: [
      'Using Admin Console Append Footer',
      'Gmail\'s default behavior with quotes',
      'Compose settings misconfigured',
    ],
    solutions: [
      'For proper placement, use Gmail API-based tools',
      'Check Settings → General → "Insert signature before quoted text"',
      'Avoid using Append Footer for signatures',
    ],
  },
  {
    title: 'Mobile Signature Different',
    symptoms: ['No signature on mobile', 'Different signature on phone', 'Mobile signature is plain text'],
    causes: [
      'Gmail mobile has separate signature settings',
      'Admin-deployed signatures don\'t sync to mobile',
      'Mobile app using cached old signature',
    ],
    solutions: [
      'Open Gmail app → Settings → [Account] → Mobile Signature',
      'Use a tool with Gmail API access for automatic sync',
      'Force close and reopen Gmail app',
      'Sign out and back into Gmail on mobile',
    ],
  },
  {
    title: 'Signature Formatting Issues',
    symptoms: ['Fonts look wrong', 'Colors changed', 'Layout broken', 'Extra spacing'],
    causes: [
      'Email client stripping styles',
      'Using unsupported fonts',
      'Complex HTML not rendering',
      'Copy-pasting from Word/Docs',
    ],
    solutions: [
      'Use web-safe fonts (Arial, Verdana, Georgia)',
      'Use inline CSS, not external stylesheets',
      'Keep HTML simple (tables for layout)',
      'Avoid copy-pasting from other applications',
      'Test across multiple email clients',
    ],
  },
  {
    title: 'Signature Not Updating',
    symptoms: ['Old signature still showing', 'Changes not taking effect', 'Some users have old version'],
    causes: [
      'Browser cache',
      'Propagation delay (up to 24 hours for admin changes)',
      'Multiple signatures configured',
      'Outlook/desktop client caching',
    ],
    solutions: [
      'Clear browser cache (Ctrl+Shift+Delete)',
      'Wait 24 hours for admin-level changes',
      'Check if correct signature is selected as default',
      'For Outlook: restart the application',
      'Use Gmail API tools for instant updates',
    ],
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
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">{postData.category}</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">{postData.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> February 7, 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {postData.readTime} read</span>
          </div>
          
          <Image 
            src={postData.image} 
            alt="Troubleshooting Gmail signatures" 
            width={1200} 
            height={600} 
            className="rounded-2xl mb-12" 
          />
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Gmail signature issues are frustrating—especially when you're managing signatures for an entire organization. I've seen every signature problem imaginable, and most have simple fixes. Here's how to diagnose and solve the most common issues.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                Quick Diagnostic
              </h3>
              <p className="text-gray-600 text-sm mb-4">Before diving into specific issues, try these quick fixes:</p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2 text-sm">
                <li>Clear your browser cache (Ctrl+Shift+Delete)</li>
                <li>Check Gmail Settings → General → Signature</li>
                <li>Send a test email to yourself</li>
                <li>Try in an incognito/private window</li>
              </ol>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Common Issues and Solutions</h2>

            {issues.map((issue, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 my-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  {issue.title}
                </h3>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Symptoms:</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1 text-sm">
                    {issue.symptoms.map((symptom, i) => (
                      <li key={i}>{symptom}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Common Causes:</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1 text-sm">
                    {issue.causes.map((cause, i) => (
                      <li key={i}>{cause}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-800 mb-2">Solutions:</p>
                  <ul className="space-y-2">
                    {issue.solutions.map((solution, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                        <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <h2 className="text-2xl font-bold mt-12 mb-4">Admin-Specific Issues</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-3">Append Footer Not Working</h3>
            <p className="text-gray-600 mb-4">
              If you've set up an Append Footer in Google Admin Console but it's not appearing:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Wait up to 24 hours for propagation</li>
              <li>Verify the user is in the correct Organizational Unit</li>
              <li>Check that the rule is enabled and saved</li>
              <li>Test with an external recipient (internal emails may not show footer)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">Signatures Not Deploying to All Users</h3>
            <p className="text-gray-600 mb-4">
              When centrally deployed signatures don't reach everyone:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Check Organizational Unit assignments</li>
              <li>Verify users haven't been excluded from the policy</li>
              <li>Look for conflicting rules or policies</li>
              <li>Check if users are using aliases not covered by the rule</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">When to Use Third-Party Tools</h2>
            <p className="text-gray-600 mb-6">
              Native Google Workspace signature management has inherent limitations. Consider a third-party tool if you need:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Proper signature placement</strong> — Above quoted text, not at the bottom</li>
              <li><strong>Instant deployment</strong> — No 24-hour wait time</li>
              <li><strong>Mobile sync</strong> — Signatures that work on Gmail mobile app</li>
              <li><strong>Dynamic fields</strong> — Auto-populate from Google Directory</li>
              <li><strong>Visual editor</strong> — No HTML coding required</li>
              <li><strong>Enforcement</strong> — Prevent users from modifying signatures</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6 my-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Still Having Issues?</h2>
            <p className="text-gray-600 mb-6">
              If you've tried everything and signatures still aren't working:
            </p>
            <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
              <li>Check Google Workspace Status Dashboard for outages</li>
              <li>Contact Google Workspace support</li>
              <li>Consider a third-party signature management tool</li>
            </ol>

            <div className="bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200 rounded-xl p-8 my-12">
              <h3 className="text-xl font-bold mb-4">Skip the troubleshooting</h3>
              <p className="text-gray-600 mb-6">Siggly deploys signatures instantly with proper placement, mobile sync, and zero propagation delays. No more troubleshooting native Gmail limitations.</p>
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
