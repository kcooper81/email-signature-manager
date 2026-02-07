import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight, Shield, AlertTriangle, Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta, generateBlogPostSchema, generateFAQSchema } from '@/lib/seo/metadata';

const postData = {
  slug: 'gmail-signature-compliance-guide',
  title: 'Gmail Signature Compliance: What IT Admins Need to Know',
  excerpt: 'Legal requirements, industry regulations, and best practices for compliant email signatures in Google Workspace organizations.',
  date: '2026-02-07',
  readTime: '10 min',
  category: 'Compliance',
  image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop',
};

export const metadata = genMeta({
  title: 'Gmail Signature Compliance Guide | Legal Requirements for Google Workspace',
  description: 'Legal requirements, industry regulations, and best practices for compliant email signatures in Google Workspace. GDPR, HIPAA, and industry-specific guidance.',
  keywords: [
    'gmail signature compliance',
    'google workspace signature legal requirements',
    'email signature disclaimer',
    'gdpr email signature',
    'hipaa email signature',
    'email signature legal',
    'business email compliance',
  ],
  canonical: `/blog/${postData.slug}`,
  ogType: 'article',
  article: {
    publishedTime: postData.date,
    authors: ['Siggly Team'],
    tags: [postData.category, 'Google Workspace', 'Legal'],
  },
});

const faqs = [
  {
    question: 'Is an email disclaimer legally required?',
    answer: 'It depends on your jurisdiction and industry. Many countries require business registration information. Regulated industries like finance and healthcare have additional requirements.',
  },
  {
    question: 'Does GDPR require anything in email signatures?',
    answer: 'GDPR doesn\'t mandate specific signature content, but you should include company contact information and avoid collecting unnecessary personal data through signature links.',
  },
  {
    question: 'Can I use the same signature for all countries?',
    answer: 'You can, but it may need to include elements required by multiple jurisdictions. Many organizations create region-specific signatures to avoid cluttered disclaimers.',
  },
  {
    question: 'How do I enforce signature compliance across my organization?',
    answer: 'Use centralized signature management with enforcement enabled. This prevents employees from modifying or removing required elements.',
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
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">{postData.category}</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">{postData.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> February 7, 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {postData.readTime} read</span>
          </div>
          
          <Image 
            src={postData.image} 
            alt="Legal compliance documents" 
            width={1200} 
            height={600} 
            className="rounded-2xl mb-12" 
          />
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Email signatures aren't just about branding—they're often a legal requirement. If you're managing signatures for a Google Workspace organization, here's what you need to know about compliance across different jurisdictions and industries.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800 font-medium mb-2">Disclaimer</p>
                  <p className="text-amber-700">This guide provides general information, not legal advice. Consult with your legal team for requirements specific to your organization and jurisdiction.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Why Email Signature Compliance Matters</h2>
            <p className="text-gray-600 mb-6">
              Non-compliant email signatures can result in:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Fines</strong> — Some jurisdictions impose penalties for missing business information</li>
              <li><strong>Legal exposure</strong> — Missing disclaimers may not protect confidential communications</li>
              <li><strong>Regulatory action</strong> — Industry regulators may cite signature violations</li>
              <li><strong>Reputation damage</strong> — Unprofessional signatures reflect poorly on your organization</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Requirements by Region</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" /> United Kingdom
            </h3>
            <p className="text-gray-600 mb-4">
              UK companies must include in business emails:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Company registered name</li>
              <li>Company registration number</li>
              <li>Place of registration (England & Wales, Scotland, etc.)</li>
              <li>Registered office address</li>
              <li>VAT number (if VAT registered)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" /> European Union (GDPR)
            </h3>
            <p className="text-gray-600 mb-4">
              While GDPR doesn't mandate specific signature content, EU business email requirements typically include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Company name and legal form</li>
              <li>Registered office address</li>
              <li>Registration number</li>
              <li>VAT identification number</li>
              <li>Managing directors (Germany)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" /> United States
            </h3>
            <p className="text-gray-600 mb-4">
              The US has no federal email signature requirements, but consider:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>State-specific requirements for certain industries</li>
              <li>CAN-SPAM compliance for marketing emails</li>
              <li>Industry regulations (HIPAA, FINRA, etc.)</li>
              <li>Confidentiality disclaimers for sensitive communications</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" /> Australia
            </h3>
            <p className="text-gray-600 mb-4">
              Australian businesses should include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Company name</li>
              <li>ABN (Australian Business Number)</li>
              <li>ACN (Australian Company Number) if applicable</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Industry-Specific Requirements</h2>
            
            <div className="grid gap-6 my-8">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-lg">Healthcare (HIPAA)</h3>
                </div>
                <ul className="list-disc pl-6 text-gray-600 space-y-1 text-sm">
                  <li>Confidentiality notice for PHI</li>
                  <li>Instructions for misdirected emails</li>
                  <li>Avoid including patient information in signatures</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-lg">Financial Services (FINRA/SEC)</h3>
                </div>
                <ul className="list-disc pl-6 text-gray-600 space-y-1 text-sm">
                  <li>Broker-dealer registration information</li>
                  <li>Required disclosures for investment advice</li>
                  <li>Supervisory contact information</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-purple-600" />
                  <h3 className="font-semibold text-lg">Legal</h3>
                </div>
                <ul className="list-disc pl-6 text-gray-600 space-y-1 text-sm">
                  <li>Attorney-client privilege notice</li>
                  <li>Bar admission information</li>
                  <li>Confidentiality disclaimer</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-orange-600" />
                  <h3 className="font-semibold text-lg">Real Estate</h3>
                </div>
                <ul className="list-disc pl-6 text-gray-600 space-y-1 text-sm">
                  <li>License number</li>
                  <li>Brokerage name</li>
                  <li>Fair housing statement (some states)</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Sample Disclaimer Templates</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-3">General Confidentiality</h3>
            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 mb-6 font-mono">
              This email and any attachments are confidential and intended solely for the addressee. If you have received this email in error, please notify the sender immediately and delete it. Any unauthorized use, disclosure, or copying is prohibited.
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-3">UK Company Registration</h3>
            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 mb-6 font-mono">
              [Company Name] is registered in England and Wales. Company No: [Number]. Registered Office: [Address]. VAT No: [Number].
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-3">Healthcare/HIPAA</h3>
            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 mb-6 font-mono">
              This message may contain Protected Health Information (PHI). If you are not the intended recipient, you are prohibited from using, disclosing, or copying this information. Please notify the sender and delete this message immediately.
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Enforcing Compliance in Google Workspace</h2>
            <p className="text-gray-600 mb-6">
              The challenge isn't just creating compliant signatures—it's ensuring employees can't remove or modify required elements. Here's how to enforce compliance:
            </p>

            <div className="space-y-4 my-6">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Use centralized management</p>
                  <p className="text-sm text-gray-600">Deploy signatures from a central admin console, not individual user settings.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Enable enforcement</p>
                  <p className="text-sm text-gray-600">Automatically revert any manual changes users make to their signatures.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Audit regularly</p>
                  <p className="text-sm text-gray-600">Review signatures periodically to ensure compliance elements are present.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Document your policy</p>
                  <p className="text-sm text-gray-600">Create a written email signature policy that employees acknowledge.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6 my-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Compliance Checklist</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" disabled />
                  <span className="text-gray-700">Identified applicable regional requirements</span>
                </li>
                <li className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" disabled />
                  <span className="text-gray-700">Identified industry-specific requirements</span>
                </li>
                <li className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" disabled />
                  <span className="text-gray-700">Consulted with legal team</span>
                </li>
                <li className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" disabled />
                  <span className="text-gray-700">Created compliant signature template</span>
                </li>
                <li className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" disabled />
                  <span className="text-gray-700">Deployed with enforcement enabled</span>
                </li>
                <li className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" disabled />
                  <span className="text-gray-700">Documented email signature policy</span>
                </li>
                <li className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" disabled />
                  <span className="text-gray-700">Set up regular compliance audits</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200 rounded-xl p-8 my-12">
              <h3 className="text-xl font-bold mb-4">Ensure compliance across your organization</h3>
              <p className="text-gray-600 mb-6">Siggly helps you deploy compliant signatures with enforcement, ensuring required elements can't be removed or modified by employees.</p>
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
