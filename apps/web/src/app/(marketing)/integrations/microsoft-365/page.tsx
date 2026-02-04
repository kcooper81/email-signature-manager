import Link from 'next/link';
import { Mail, Check, ArrowRight, Shield, Zap, Users, RefreshCw, Building2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Microsoft 365 Email Signatures | Siggly',
  description: 'Manage Outlook signatures for your entire Microsoft 365 organization. Deploy consistent email signatures to all users with centralized control.',
  keywords: ['Microsoft 365 signatures', 'Outlook signature management', 'Office 365 email signatures', 'Exchange Online signatures', 'Azure AD signatures'],
  canonical: '/integrations/microsoft-365',
});

const features = [
  {
    icon: RefreshCw,
    title: 'Azure AD Sync',
    description: 'Automatically sync users from Azure Active Directory. No manual imports needed.',
  },
  {
    icon: Zap,
    title: 'One-Click Deploy',
    description: 'Deploy signatures to all Outlook users instantly using Microsoft Graph API.',
  },
  {
    icon: Users,
    title: 'Department Rules',
    description: 'Assign different signatures based on department, location, or custom attributes.',
  },
  {
    icon: Shield,
    title: 'Secure Integration',
    description: 'OAuth 2.0 authentication with Microsoft. Your credentials stay secure.',
  },
];

const howItWorks = [
  {
    step: '1',
    title: 'Connect Microsoft 365',
    description: 'Authenticate with your Microsoft 365 admin account using secure OAuth.',
  },
  {
    step: '2',
    title: 'Sync Your Users',
    description: 'Automatically import all users from Azure AD with their profile information.',
  },
  {
    step: '3',
    title: 'Design Signatures',
    description: 'Create professional signature templates using our visual editor.',
  },
  {
    step: '4',
    title: 'Deploy Instantly',
    description: 'Push signatures to all Outlook users with one click. Updates apply immediately.',
  },
];

const supportedPlatforms = [
  'Outlook Desktop (Windows & Mac)',
  'Outlook Web App (OWA)',
  'Outlook Mobile (iOS & Android)',
  'Exchange Online',
  'Microsoft Teams',
  'New Outlook for Windows',
];

const comparisonData = [
  { feature: 'Centralized Management', siggly: true, native: false },
  { feature: 'Bulk Deployment', siggly: true, native: false },
  { feature: 'Department Rules', siggly: true, native: false },
  { feature: 'Template Library', siggly: true, native: false },
  { feature: 'Campaign Banners', siggly: true, native: false },
  { feature: 'Analytics & Tracking', siggly: true, native: false },
  { feature: 'Scheduled Updates', siggly: true, native: false },
  { feature: 'Version Control', siggly: true, native: false },
];

export default function Microsoft365Page() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.5 0h12v12h-12zM0 0h11v11H0zM11.5 12.5h12v11.5h-12zM0 11.5h11V23H0z"/>
                </svg>
                Microsoft 365 Integration
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Outlook Signature Management for
                <span className="text-blue-600"> Microsoft 365</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Deploy professional, consistent email signatures to your entire Microsoft 365 organization. 
                Sync users from Azure AD and update signatures with one click.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/signup">
                  <Button size="lg">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline">View Pricing</Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Works with Exchange Online • Azure AD integration • No IT required
              </p>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Outlook Signature</div>
                    <div className="text-sm text-gray-500">Deployed via Siggly</div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">SM</div>
                    <div>
                      <div className="font-semibold">Sarah Miller</div>
                      <div className="text-sm text-gray-600">Sales Director</div>
                      <div className="text-sm text-blue-600">sarah@company.com</div>
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
            Why teams choose Siggly for Microsoft 365
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Works Across All Microsoft 365 Apps</h2>
            <p className="text-gray-600">
              Your signatures work seamlessly across every Outlook platform and device.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {supportedPlatforms.map((platform) => (
              <div key={platform} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="font-medium">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get your entire Microsoft 365 organization set up with professional signatures in minutes.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">{item.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Siggly vs Native Outlook Signatures</h2>
            <p className="text-blue-100">
              Native Outlook signatures require manual setup per user. Siggly gives you centralized control.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-white/5 border-b border-white/10">
              <div className="px-6 py-4 font-semibold">Feature</div>
              <div className="px-6 py-4 font-semibold text-center">Siggly</div>
              <div className="px-6 py-4 font-semibold text-center">Native Outlook</div>
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
        </div>
      </section>

      {/* Security */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Enterprise-Grade Security</h2>
              <p className="text-gray-600 mb-8">
                Siggly integrates securely with Microsoft 365 using industry-standard OAuth 2.0 
                authentication. Your credentials and data remain secure.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">OAuth 2.0 Authentication</h3>
                    <p className="text-sm text-gray-600">Secure, token-based authentication. We never store your password.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Minimal Permissions</h3>
                    <p className="text-sm text-gray-600">We only request the permissions needed to manage signatures.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Azure AD Integration</h3>
                    <p className="text-sm text-gray-600">Works with your existing Azure AD setup and security policies.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Required Permissions
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Read user profiles from Azure AD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Manage email signatures via Graph API</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Read organization directory</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-4">
                  You can revoke access at any time from your Microsoft 365 admin portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to manage Microsoft 365 signatures?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start free today. Connect your Microsoft 365 account and deploy signatures 
            to your entire organization in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" className="bg-blue-700 text-white hover:bg-blue-800">
                View Pricing
              </Button>
            </Link>
          </div>
          <p className="text-sm text-blue-100 mt-6">
            No credit card required • Free for up to 5 users • Setup in 5 minutes
          </p>
        </div>
      </section>

    </>
  );
}
