import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight, Shield, Check, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta, generateBlogPostSchema, generateFAQSchema } from '@/lib/seo/metadata';

const postData = {
  slug: 'enforce-email-signatures-google-workspace',
  title: 'How to Enforce Email Signatures Across Your Google Workspace Organization',
  excerpt: 'Prevent employees from modifying or removing email signatures. Complete guide to signature enforcement for Google Workspace admins.',
  date: '2026-02-07',
  readTime: '9 min',
  category: 'IT Admin',
  image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=600&fit=crop',
};

export const metadata = genMeta({
  title: 'How to Enforce Email Signatures in Google Workspace | Admin Guide',
  description: 'Prevent employees from modifying or removing email signatures. Complete guide to signature enforcement, compliance, and brand consistency for Google Workspace.',
  keywords: [
    'enforce email signatures google workspace',
    'gmail signature policy',
    'prevent signature changes gmail',
    'google workspace signature enforcement',
    'mandatory email signatures',
    'lock email signatures google',
    'gmail signature compliance',
  ],
  canonical: `/blog/${postData.slug}`,
  ogType: 'article',
  article: {
    publishedTime: postData.date,
    authors: ['Siggly Team'],
    tags: [postData.category, 'Google Workspace', 'Compliance'],
  },
});

const enforcementMethods = [
  {
    method: 'Google Admin Console (Append Footer)',
    enforcement: 'Partial',
    description: 'Adds footer to all outgoing emails regardless of user settings',
    pros: ['Built-in, no extra cost', 'Users cannot remove it', 'Works for all users'],
    cons: ['Appears at bottom of email chain', 'No dynamic user fields', 'Looks like a disclaimer, not a signature'],
  },
  {
    method: 'Gmail API (Third-Party Tools)',
    enforcement: 'Full',
    description: 'Sets user signatures directly and can overwrite manual changes',
    pros: ['Proper signature placement', 'Dynamic fields from directory', 'Can sync on schedule', 'Mobile support'],
    cons: ['Requires third-party tool', 'Monthly cost'],
  },
  {
    method: 'User Training + Policy',
    enforcement: 'None',
    description: 'Rely on employees to use correct signatures',
    pros: ['No technical setup', 'No cost'],
    cons: ['No actual enforcement', 'Inconsistent compliance', 'Manual monitoring required'],
  },
];

const faqs = [
  {
    question: 'Can Google Workspace natively enforce signatures?',
    answer: 'Partially. The Append Footer feature adds content to all emails that users cannot remove, but it appears at the bottom of email threads and doesn\'t support dynamic user fields.',
  },
  {
    question: 'How do I prevent employees from changing their signatures?',
    answer: 'Use a third-party tool with Gmail API access that can overwrite user signatures on a schedule. When users make changes, the next sync reverts to the approved signature.',
  },
  {
    question: 'What happens if an employee deletes their signature?',
    answer: 'With enforcement enabled, the signature is automatically restored on the next sync cycle. Most tools sync every few hours or can be triggered manually.',
  },
  {
    question: 'Can I allow some customization while enforcing core elements?',
    answer: 'Yes. Some tools allow you to lock certain elements (logo, disclaimer) while letting users customize others (personal quote, pronouns).',
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
            alt="Email signature enforcement and security" 
            width={1200} 
            height={600} 
            className="rounded-2xl mb-12" 
          />
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              You've designed the perfect email signature. Now how do you make sure 500 employees actually use it—and don't modify it? Signature enforcement is one of the most requested features from IT admins, and Google Workspace doesn't make it easy. Here's how to actually enforce signatures across your organization.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Why Enforcement Matters</h2>
            <p className="text-gray-600 mb-6">
              Without enforcement, you'll inevitably see:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Brand inconsistency</strong> — Different fonts, colors, and layouts</li>
              <li><strong>Missing information</strong> — Employees removing "required" elements</li>
              <li><strong>Compliance violations</strong> — Legal disclaimers deleted</li>
              <li><strong>Outdated content</strong> — Old phone numbers, wrong titles</li>
              <li><strong>Personal additions</strong> — Quotes, images, or content that doesn't represent the company</li>
            </ul>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800 font-medium mb-2">Real Example</p>
                  <p className="text-amber-700">A financial services company discovered that 40% of employees had removed the required compliance disclaimer from their signatures. This exposed the company to regulatory risk—all because there was no enforcement mechanism.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Enforcement Methods Compared</h2>
            
            <div className="space-y-6 my-8">
              {enforcementMethods.map((method, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{method.method}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      method.enforcement === 'Full' ? 'bg-green-100 text-green-700' :
                      method.enforcement === 'Partial' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {method.enforcement} Enforcement
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-green-700 mb-2">Pros:</p>
                      <ul className="space-y-1">
                        {method.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-700 mb-2">Cons:</p>
                      <ul className="space-y-1">
                        {method.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <X className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Option 1: Google Admin Console (Partial Enforcement)</h2>
            <p className="text-gray-600 mb-6">
              Google Workspace's built-in option is the "Append Footer" feature. Here's how to set it up:
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-6">
              <h4 className="font-semibold mb-3">Setup Steps:</h4>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>Go to admin.google.com</li>
                <li>Navigate to Apps → Google Workspace → Gmail → Compliance</li>
                <li>Click "Append footer" → Configure</li>
                <li>Enter your footer HTML</li>
                <li>Select which organizational units to apply it to</li>
                <li>Save and wait up to 24 hours</li>
              </ol>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-3">Why This Is Only "Partial" Enforcement</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Users can still set their own signatures (which appear first)</li>
              <li>The footer appears at the very bottom, below quoted replies</li>
              <li>No dynamic fields (everyone gets the same footer)</li>
              <li>Looks like a legal disclaimer, not a professional signature</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Option 2: Gmail API Enforcement (Full Control)</h2>
            <p className="text-gray-600 mb-6">
              For true enforcement, you need a tool that uses the Gmail API to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Set signatures directly</strong> — In the proper location, above quoted text</li>
              <li><strong>Overwrite changes</strong> — Automatically revert user modifications</li>
              <li><strong>Sync on schedule</strong> — Hourly, daily, or on-demand</li>
              <li><strong>Use dynamic fields</strong> — Pull name, title, phone from Google Directory</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">How Enforcement Works</h3>
            <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
              <li>Admin creates signature template in the tool</li>
              <li>Tool deploys signatures to all users via Gmail API</li>
              <li>If a user modifies their signature, the next sync overwrites it</li>
              <li>Users learn that changes don't stick, so they stop trying</li>
            </ol>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2">Enforcement Best Practice</h4>
                  <p className="text-gray-600 text-sm">Set sync frequency based on your compliance needs. For regulated industries, sync every hour. For general brand consistency, daily sync is usually sufficient.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Implementing an Enforcement Policy</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-3">Step 1: Document Your Policy</h3>
            <p className="text-gray-600 mb-6">
              Create a written email signature policy that covers:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>What elements are required (name, title, phone, disclaimer)</li>
              <li>What customization is allowed (if any)</li>
              <li>Consequences of non-compliance</li>
              <li>How to request changes or exceptions</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">Step 2: Communicate to Employees</h3>
            <p className="text-gray-600 mb-6">
              Before enabling enforcement:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Announce the new signature policy</li>
              <li>Explain why it matters (brand, compliance, professionalism)</li>
              <li>Show them what the new signature looks like</li>
              <li>Give a deadline for the rollout</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">Step 3: Deploy with Enforcement</h3>
            <p className="text-gray-600 mb-6">
              Roll out in phases:
            </p>
            <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Pilot group</strong> — IT team first, work out any issues</li>
              <li><strong>Department by department</strong> — Sales, then Marketing, etc.</li>
              <li><strong>Full organization</strong> — Everyone on the new system</li>
            </ol>

            <h3 className="text-xl font-semibold mt-8 mb-3">Step 4: Handle Exceptions</h3>
            <p className="text-gray-600 mb-6">
              Some roles may need different signatures:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Executives</strong> — May want a more minimal signature</li>
              <li><strong>Legal</strong> — May need additional disclaimers</li>
              <li><strong>Sales</strong> — May want calendar booking links</li>
              <li><strong>Support</strong> — May need ticket system links</li>
            </ul>
            <p className="text-gray-600 mb-6">
              Create department-specific templates rather than individual exceptions.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Monitoring Compliance</h2>
            <p className="text-gray-600 mb-6">
              Even with enforcement, monitor for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Users who found workarounds</li>
              <li>Sync failures that left old signatures</li>
              <li>New hires who haven't been added to the system</li>
              <li>Feedback about signature issues</li>
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

            <h2 className="text-2xl font-bold mt-12 mb-4">The Bottom Line</h2>
            <p className="text-gray-600 mb-6">
              Google Workspace's native tools provide partial enforcement at best. For true signature enforcement—where employees cannot modify or remove required elements—you need a third-party tool with Gmail API access.
            </p>
            <p className="text-gray-600 mb-6">
              The investment pays off in brand consistency, compliance, and the hours you won't spend chasing down employees with wrong signatures.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200 rounded-xl p-8 my-12">
              <h3 className="text-xl font-bold mb-4">Enforce signatures across your organization</h3>
              <p className="text-gray-600 mb-6">Siggly provides full signature enforcement for Google Workspace. Deploy once, and signatures stay consistent—even when employees try to change them.</p>
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
