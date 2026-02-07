import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta, generateBlogPostSchema, generateFAQSchema } from '@/lib/seo/metadata';

const postData = {
  slug: 'google-workspace-vs-microsoft-365-signatures',
  title: 'Google Workspace vs Microsoft 365: Signature Management Comparison',
  excerpt: 'Compare email signature management capabilities between Google Workspace and Microsoft 365. Which platform makes it easier to deploy and manage signatures?',
  date: '2026-02-07',
  readTime: '9 min',
  category: 'Comparisons',
  image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=600&fit=crop',
};

export const metadata = genMeta({
  title: 'Google Workspace vs Microsoft 365 Signatures | Platform Comparison',
  description: 'Compare email signature management between Google Workspace and Microsoft 365. Native capabilities, third-party tools, and which platform is easier to manage.',
  keywords: [
    'google workspace vs microsoft 365 signatures',
    'gmail vs outlook signatures',
    'email signature management comparison',
    'google workspace signature management',
    'microsoft 365 signature management',
    'outlook vs gmail signatures',
  ],
  canonical: `/blog/${postData.slug}`,
  ogType: 'article',
  article: {
    publishedTime: postData.date,
    authors: ['Siggly Team'],
    tags: [postData.category, 'Google Workspace', 'Microsoft 365'],
  },
});

const comparisonData = [
  { feature: 'Native Signature Editor', google: 'Basic (per user)', microsoft: 'Basic (per user)', winner: 'tie' },
  { feature: 'Centralized Admin Control', google: 'Append Footer only', microsoft: 'Transport Rules', winner: 'tie' },
  { feature: 'Proper Signature Placement', google: false, microsoft: false, winner: 'tie' },
  { feature: 'Dynamic Variables (Native)', google: false, microsoft: 'Limited', winner: 'microsoft' },
  { feature: 'Mobile Signature Sync', google: false, microsoft: false, winner: 'tie' },
  { feature: 'Visual Editor (Native)', google: true, microsoft: true, winner: 'tie' },
  { feature: 'Department-Based Rules', google: 'Via OUs', microsoft: 'Via Groups', winner: 'tie' },
  { feature: 'Third-Party API Access', google: 'Gmail API', microsoft: 'Graph API', winner: 'tie' },
  { feature: 'Propagation Time', google: 'Up to 24 hours', microsoft: 'Up to 1 hour', winner: 'microsoft' },
];

const faqs = [
  {
    question: 'Which platform has better native signature management?',
    answer: 'Neither platform excels at native centralized signature management. Both require third-party tools for proper placement, dynamic fields, and true centralized control.',
  },
  {
    question: 'Can I manage signatures the same way on both platforms?',
    answer: 'Yes, with a third-party tool like Siggly. We provide identical signature management capabilities for both Google Workspace and Microsoft 365.',
  },
  {
    question: 'Which platform is easier for IT admins?',
    answer: 'Google Workspace has simpler admin controls overall, but Microsoft 365 offers more granular transport rules. For signatures specifically, both require similar effort.',
  },
  {
    question: 'Do signatures sync to mobile on both platforms?',
    answer: 'Neither platform natively syncs admin-deployed signatures to mobile apps. Third-party tools using the Gmail API or Graph API can sync to mobile.',
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
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">{postData.category}</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">{postData.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> February 7, 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {postData.readTime} read</span>
          </div>
          
          <Image 
            src={postData.image} 
            alt="Google Workspace vs Microsoft 365 comparison" 
            width={1200} 
            height={600} 
            className="rounded-2xl mb-12" 
          />
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              If you're managing email signatures for an organization, you've probably wondered: which platform makes this easier—Google Workspace or Microsoft 365? Having deployed signatures on both platforms for years, here's my honest comparison.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">The Short Answer</h2>
            <p className="text-gray-600 mb-6">
              Neither platform has great native signature management. Both require workarounds or third-party tools for proper centralized control. The good news? Third-party tools work equally well on both platforms.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Native Capabilities Comparison</h2>
            
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden my-8">
              <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                <div className="px-6 py-4 font-semibold">Feature</div>
                <div className="px-6 py-4 font-semibold text-center">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </div>
                </div>
                <div className="px-6 py-4 font-semibold text-center">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#00A4EF">
                      <path d="M11.5 0h12v12h-12zM0 0h11v11H0zM11.5 12.5h12v11.5h-12zM0 11.5h11V23H0z"/>
                    </svg>
                    Microsoft
                  </div>
                </div>
              </div>
              {comparisonData.map((row) => (
                <div key={row.feature} className="grid grid-cols-3 border-b border-gray-100 last:border-0">
                  <div className="px-6 py-4 text-sm">{row.feature}</div>
                  <div className="px-6 py-4 text-center">
                    {typeof row.google === 'boolean' ? (
                      row.google ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />
                    ) : (
                      <span className="text-sm text-gray-600">{row.google}</span>
                    )}
                  </div>
                  <div className="px-6 py-4 text-center">
                    {typeof row.microsoft === 'boolean' ? (
                      row.microsoft ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />
                    ) : (
                      <span className="text-sm text-gray-600">{row.microsoft}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Google Workspace: Native Signature Management</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-3">What You Can Do</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>User-level signatures</strong> — Each user can set their own signature in Gmail settings</li>
              <li><strong>Append Footer</strong> — Admins can add a footer to all outgoing emails via Admin Console</li>
              <li><strong>Organizational Units</strong> — Apply different footers to different OUs</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">Limitations</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Footer placement</strong> — Append Footer adds content at the very bottom, below quoted replies</li>
              <li><strong>No dynamic variables</strong> — Can't auto-populate user info from directory</li>
              <li><strong>No visual editor</strong> — Admin footer requires HTML</li>
              <li><strong>No mobile sync</strong> — Mobile app uses separate signature settings</li>
              <li><strong>Propagation delay</strong> — Changes can take up to 24 hours</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Microsoft 365: Native Signature Management</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-3">What You Can Do</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>User-level signatures</strong> — Each user sets their signature in Outlook</li>
              <li><strong>Transport Rules</strong> — Add disclaimers/footers via Exchange Admin Center</li>
              <li><strong>Limited variables</strong> — Some dynamic fields available in transport rules</li>
              <li><strong>Group-based rules</strong> — Apply different rules to different groups</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">Limitations</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Footer placement</strong> — Transport rules add content at the bottom</li>
              <li><strong>Complex setup</strong> — Transport rules require Exchange expertise</li>
              <li><strong>Limited variables</strong> — Only basic AD attributes available</li>
              <li><strong>No mobile sync</strong> — Outlook mobile uses separate settings</li>
              <li><strong>Desktop sync issues</strong> — Outlook desktop may not sync with server signatures</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">The Real Solution: Third-Party Tools</h2>
            <p className="text-gray-600 mb-6">
              Both platforms have APIs that enable proper signature management:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Gmail API
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Set signatures in proper location</li>
                  <li>• Instant deployment</li>
                  <li>• Syncs to mobile</li>
                  <li>• Full HTML support</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#00A4EF">
                    <path d="M11.5 0h12v12h-12zM0 0h11v11H0zM11.5 12.5h12v11.5h-12zM0 11.5h11V23H0z"/>
                  </svg>
                  Microsoft Graph API
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Set signatures in proper location</li>
                  <li>• Works across Outlook clients</li>
                  <li>• Syncs to mobile</li>
                  <li>• Full HTML support</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Which Platform Should You Choose?</h2>
            <p className="text-gray-600 mb-6">
              For signature management specifically, the platform doesn't matter much. Both have similar limitations natively, and both work equally well with third-party tools.
            </p>
            <p className="text-gray-600 mb-6">
              Choose your platform based on other factors:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Google Workspace</strong> — Simpler admin, better collaboration, web-first</li>
              <li><strong>Microsoft 365</strong> — Better for enterprises, deeper integrations, desktop apps</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Hybrid Environments</h2>
            <p className="text-gray-600 mb-6">
              Some organizations use both platforms (e.g., after an acquisition). In this case, you need a signature tool that supports both. Siggly manages signatures across Google Workspace and Microsoft 365 from a single dashboard.
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

            <h2 className="text-2xl font-bold mt-12 mb-4">Bottom Line</h2>
            <p className="text-gray-600 mb-6">
              Don't choose your email platform based on signature management—neither excels at it natively. Instead, use a third-party tool that works with both platforms, giving you consistent signature management regardless of which email system you use.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200 rounded-xl p-8 my-12">
              <h3 className="text-xl font-bold mb-4">One tool for both platforms</h3>
              <p className="text-gray-600 mb-6">Siggly provides identical signature management for Google Workspace and Microsoft 365. Manage both from a single dashboard.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/google-workspace"><Button>Google Workspace <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                <Link href="/integrations/microsoft-365"><Button variant="outline">Microsoft 365</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
