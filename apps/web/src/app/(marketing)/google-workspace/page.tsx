import Link from 'next/link';
import { Mail, Check, ArrowRight, Shield, Zap, Users, RefreshCw, HelpCircle, Calendar, Palmtree } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo/metadata';

export const metadata = genMeta({
  title: 'Google Workspace Email Signatures | Deploy to All Gmail Users',
  description: 'Manage Gmail signatures for your entire Google Workspace organization. Deploy consistent email signatures to all users with one click. Free for up to 5 users.',
  keywords: [
    'google workspace email signatures',
    'gmail signature management',
    'google workspace signature software',
    'gmail signature for organization',
    'centralized gmail signatures',
    'deploy signatures google workspace',
    'gmail signature management tool',
    'google calendar booking links',
    'out of office email signature',
  ],
  canonical: '/google-workspace',
});

const faqs = [
  {
    question: 'How does Siggly deploy signatures to Google Workspace?',
    answer: 'Siggly uses the official Gmail API to deploy signatures directly to your users\' Gmail accounts. Once you connect your Google Workspace admin account via OAuth, we can push signatures to all selected users with one click.',
  },
  {
    question: 'Do users need to install anything?',
    answer: 'No. Signatures are deployed server-side using the Gmail API. Users don\'t need to install any extensions, add-ons, or software. Signatures appear automatically in their Gmail.',
  },
  {
    question: 'Is Siggly secure for Google Workspace?',
    answer: 'Yes. We use OAuth 2.0 authentication and never store your Google password. We only request the minimum permissions needed to manage signatures. You can revoke access anytime from your Google Admin console.',
  },
  {
    question: 'How long does it take to deploy signatures?',
    answer: 'Deployment typically takes 30-60 seconds for most organizations. We can deploy to 1,000+ users in under a minute using batch API calls.',
  },
  {
    question: 'Can I have different signatures for different departments?',
    answer: 'Yes. You can create multiple signature templates and assign them based on department, location, job title, or any custom attribute synced from your Google Workspace directory.',
  },
  {
    question: 'Does Siggly sync users automatically from Google Workspace?',
    answer: 'Yes. When you connect your Google Workspace account, we automatically import all users with their names, titles, departments, and profile photos. You can also set up automatic sync to keep user data current.',
  },
  {
    question: 'Can I add Google Calendar booking links to signatures?',
    answer: 'Yes. Siggly integrates with Google Calendar to let employees add their appointment scheduling links directly to their signatures. Recipients can book meetings with one click.',
  },
  {
    question: 'Does Siggly support out-of-office banners?',
    answer: 'Yes. Siggly can automatically detect when employees are out of office from their Google Calendar and display a dynamic OOO banner in their signature with their return date.',
  },
  {
    question: 'What happens if a user changes their signature manually?',
    answer: 'You can choose to allow or prevent manual changes. With enforcement enabled, any manual changes will be overwritten on the next sync, ensuring brand consistency across your organization.',
  },
  {
    question: 'Is there a free plan for Google Workspace?',
    answer: 'Yes. Siggly is free for teams up to 5 users, forever. No credit card required. Paid plans start at just $0.50/user/month for larger teams.',
  },
];

const comparisonData = [
  { feature: 'Centralized Management', siggly: true, native: false },
  { feature: 'Bulk Deployment', siggly: true, native: false },
  { feature: 'Department-Based Signatures', siggly: true, native: false },
  { feature: 'Template Library', siggly: true, native: false },
  { feature: 'Campaign Banners', siggly: true, native: false },
  { feature: 'Analytics & Click Tracking', siggly: true, native: false },
  { feature: 'Scheduled Updates', siggly: true, native: false },
  { feature: 'User Directory Sync', siggly: true, native: false },
  { feature: 'Signature Enforcement', siggly: true, native: false },
  { feature: 'Google Calendar Integration', siggly: true, native: false },
  { feature: 'Auto Out-of-Office Banners', siggly: true, native: false },
];

export default function GoogleWorkspacePage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Google Workspace', url: '/google-workspace' },
  ]);

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google Workspace Integration
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Gmail Signature Management for
                <span className="text-blue-600"> Google Workspace</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Deploy professional, consistent email signatures to your entire Google Workspace organization. 
                Sync users automatically and update signatures with one click.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/signup">
                  <Button size="lg">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline">View Pricing</Button>
                </Link>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Gmail Signature</div>
                    <div className="text-sm text-gray-500">Deployed via Siggly</div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">JD</div>
                    <div>
                      <div className="font-semibold">John Doe</div>
                      <div className="text-sm text-gray-600">Marketing Director</div>
                      <div className="text-sm text-blue-600">john@company.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why teams choose Siggly for Google Workspace
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Auto-Sync Users</h3>
              <p className="text-sm text-gray-600">
                Automatically sync users from your Google Workspace directory. No manual imports needed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">One-Click Deploy</h3>
              <p className="text-sm text-gray-600">
                Deploy signatures to all Gmail users instantly using the Gmail API.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-violet-600" />
              </div>
              <h3 className="font-semibold mb-2">Department Templates</h3>
              <p className="text-sm text-gray-600">
                Create different signatures for different departments or teams.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure OAuth</h3>
              <p className="text-sm text-gray-600">
                We use OAuth 2.0 and never store your Google password.
              </p>
            </div>
          </div>

          {/* Calendar Integration Features */}
          <div className="mt-16 pt-16 border-t">
            <h3 className="text-2xl font-bold text-center mb-8">Google Calendar Integration</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold">Booking Links in Signatures</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Let employees add their Google Calendar appointment scheduling links directly to their email signatures. 
                  Recipients can book meetings with one click—no back-and-forth emails needed.
                </p>
              </div>
              <div className="bg-amber-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Palmtree className="h-5 w-5 text-amber-600" />
                  </div>
                  <h4 className="font-semibold">Automatic Out-of-Office Banners</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Siggly automatically detects when employees are on vacation or out of office from their Google Calendar 
                  and displays a dynamic banner in their signature with their return date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Connect Google Workspace</h3>
                <p className="text-gray-600">Sign in with your Google Workspace admin account and authorize Siggly to manage signatures.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Sync your team</h3>
                <p className="text-gray-600">We automatically import users from your Google Workspace directory with their names, titles, and departments.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Design your signature</h3>
                <p className="text-gray-600">Use our visual editor to create beautiful, on-brand signatures with dynamic fields.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Deploy to Gmail</h3>
                <p className="text-gray-600">Click deploy and watch as signatures are pushed to all selected users' Gmail accounts instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Siggly vs Native Gmail Signatures</h2>
            <p className="text-blue-100">
              Native Gmail signatures require manual setup per user. Siggly gives you centralized control over your entire organization.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-white/5 border-b border-white/10">
              <div className="px-6 py-4 font-semibold">Feature</div>
              <div className="px-6 py-4 font-semibold text-center">Siggly</div>
              <div className="px-6 py-4 font-semibold text-center">Native Gmail</div>
            </div>
            {comparisonData.map((row) => (
              <div key={row.feature} className="grid grid-cols-3 border-b border-white/10 last:border-0">
                <div className="px-6 py-4 text-sm">{row.feature}</div>
                <div className="px-6 py-4 text-center">
                  {row.siggly ? (
                    <Check className="h-5 w-5 text-green-400 mx-auto" />
                  ) : (
                    <span className="text-white/40">—</span>
                  )}
                </div>
                <div className="px-6 py-4 text-center">
                  {row.native ? (
                    <Check className="h-5 w-5 text-green-400 mx-auto" />
                  ) : (
                    <span className="text-white/40">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-blue-100 text-sm">
              Save hours of manual work. Deploy signatures to your entire team in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Everything you need to know about managing Google Workspace email signatures with Siggly.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2 flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to manage Gmail signatures?</h2>
          <p className="text-gray-600 mb-8">
            Start free today. Deploy your first signature to your entire Google Workspace organization in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">View Pricing</Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            No credit card required • Free for up to 5 users • Setup in 5 minutes
          </p>
        </div>
      </section>

    </>
  );
}
