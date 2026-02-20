'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Loader2,
  Check,
  Users,
  ArrowLeft,
  Zap,
  Shield,
  DollarSign,
  Palette,
  Headphones,
  RefreshCw,
  CheckCircle2,
  ChevronDown,
  Server,
  Lock,
  Plug,
  HelpCircle,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const SERVICE_OPTIONS = [
  { id: 'it_support', label: 'IT Support & Managed Services' },
  { id: 'cloud_services', label: 'Cloud Services & Migration' },
  { id: 'security', label: 'Cybersecurity' },
  { id: 'consulting', label: 'IT Consulting' },
  { id: 'software_reseller', label: 'Software Reseller/VAR' },
  { id: 'marketing', label: 'Digital Marketing Agency' },
  { id: 'web_development', label: 'Web Development' },
  { id: 'other', label: 'Other' },
];

export default function PartnerApplyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Existing org detection for conversion
  const [existingOrg, setExistingOrg] = useState<{ id: string; name: string } | null>(null);
  const [convertExisting, setConvertExisting] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkExistingOrg = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('organization_id, organizations(id, name, organization_type)')
          .eq('auth_id', user.id)
          .single();
        
        if (userData?.organization_id) {
          const org = userData.organizations as any;
          // Only show conversion option for standard orgs
          if (org?.organization_type === 'standard') {
            setExistingOrg({ id: org.id, name: org.name });
          }
        }
      }
      setCheckingAuth(false);
    };
    checkExistingOrg();
  }, []);

  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    numberOfClients: '',
    primaryServices: [] as string[],
    howHeardAboutUs: '',
    additionalNotes: '',
    preferredSubdomain: '',
  });

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      primaryServices: prev.primaryServices.includes(serviceId)
        ? prev.primaryServices.filter((s) => s !== serviceId)
        : [...prev.primaryServices, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/partners/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          numberOfClients: formData.numberOfClients ? parseInt(formData.numberOfClients) : null,
          convertExistingOrg: convertExisting,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest in the Siggly Partner Program. We'll review your application and get back to you within 2-3 business days.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              A confirmation email has been sent to <strong>{formData.contactEmail}</strong>
            </p>
            <Button asChild>
              <Link href="/">Return to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/siggly-logo-dark.png"
              alt="Siggly Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold text-violet-600">Siggly</span>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            MSP Partner Program
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Stop Losing Revenue on Email Signatures
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your clients need professional email signatures. You're either doing it manually, using clunky tools, or leaving money on the table. Siggly gives you a white-label solution that takes minutes to deploy and generates recurring revenue.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Google Workspace & Microsoft 365
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Deploy in under 5 minutes
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              10-user minimum ($15/mo)
            </span>
          </div>
        </div>

        {/* Pain Points Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Sound Familiar?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-100 rounded-lg p-6">
              <h3 className="font-semibold text-red-800 mb-3">The Manual Nightmare</h3>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Manually updating signatures when employees join or leave</li>
                <li>• Chasing down users who "forgot" to update their signature</li>
                <li>• Inconsistent branding across the organization</li>
                <li>• Hours spent on something that should take minutes</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-lg p-6">
              <h3 className="font-semibold text-red-800 mb-3">The Tool Problem</h3>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Competitors charge $2-4/user with annual contracts</li>
                <li>• Complex setup that requires IT involvement</li>
                <li>• No white-label option — your clients see their branding</li>
                <li>• Clunky interfaces that clients complain about</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Solution Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-2">The Siggly Difference</h2>
          <p className="text-center text-muted-foreground mb-8">Built specifically for MSPs who want to add value without adding headaches</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-violet-100">
              <CardContent className="pt-6">
                <Palette className="h-10 w-10 text-violet-600 mb-4" />
                <h3 className="font-semibold mb-2">Your Brand, Your Portal</h3>
                <p className="text-sm text-muted-foreground">
                  Custom subdomain (yourcompany.siggly.io), your logo, your colors. Clients see your brand, not ours. Optional "Powered by" removal.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-violet-100">
              <CardContent className="pt-6">
                <Zap className="h-10 w-10 text-violet-600 mb-4" />
                <h3 className="font-semibold mb-2">5-Minute Deployment</h3>
                <p className="text-sm text-muted-foreground">
                  OAuth connection to Google Workspace or Microsoft 365. Auto-sync users from directory. No agents, no scripts, no IT tickets.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-violet-100">
              <CardContent className="pt-6">
                <DollarSign className="h-10 w-10 text-violet-600 mb-4" />
                <h3 className="font-semibold mb-2">Profitable Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Starting at $1.50/user. 10-user minimum ($15/mo). Earn 15-25% margin depending on tier. Bill clients at your rate, keep the difference.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-violet-100">
              <CardContent className="pt-6">
                <Users className="h-10 w-10 text-violet-600 mb-4" />
                <h3 className="font-semibold mb-2">Multi-Client Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Switch between clients instantly. One login, all your accounts. See status, user counts, and deployment health at a glance.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-violet-100">
              <CardContent className="pt-6">
                <RefreshCw className="h-10 w-10 text-violet-600 mb-4" />
                <h3 className="font-semibold mb-2">Auto-Sync Everything</h3>
                <p className="text-sm text-muted-foreground">
                  New employee? Signature deployed automatically. Title change? Updated across all devices. Directory is the source of truth.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-violet-100">
              <CardContent className="pt-6">
                <Shield className="h-10 w-10 text-violet-600 mb-4" />
                <h3 className="font-semibold mb-2">Enterprise Security</h3>
                <p className="text-sm text-muted-foreground">
                  SOC 2 compliant infrastructure (via Vercel/Supabase). GDPR ready. Audit logs for compliance. No email content access.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features That Matter */}
        <div className="mb-16 bg-slate-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Features Your Clients Will Love</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Centralized signature management</span>
                <span className="text-muted-foreground"> — one template, deployed to everyone</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Dynamic fields</span>
                <span className="text-muted-foreground"> — name, title, phone auto-populated from directory</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Department-based rules</span>
                <span className="text-muted-foreground"> — different signatures for Sales vs Support</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Marketing banners</span>
                <span className="text-muted-foreground"> — schedule promotional content in signatures</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Legal disclaimers</span>
                <span className="text-muted-foreground"> — automatic compliance text for regulated industries</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Out-of-office banners</span>
                <span className="text-muted-foreground"> — auto-detect OOO from Google Calendar</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Personal booking links</span>
                <span className="text-muted-foreground"> — Calendly, Google Calendar scheduling URLs</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Works on all devices</span>
                <span className="text-muted-foreground"> — desktop, mobile, webmail, Outlook</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Transparency */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-2">Simple, Transparent Pricing</h2>
          <p className="text-center text-muted-foreground mb-8">No hidden fees. No long-term contracts. Cancel anytime.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">Partner</CardTitle>
                <CardDescription>1-9 clients</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-violet-600 mb-2">15%</div>
                <p className="text-sm text-muted-foreground">margin on all subscriptions</p>
                <ul className="text-sm text-left mt-4 space-y-2">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> White-label portal</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Multi-client dashboard</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Email support</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 border-violet-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-xs px-3 py-1 rounded-full">
                Most Popular
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">Silver</CardTitle>
                <CardDescription>10-24 clients</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-violet-600 mb-2">20%</div>
                <p className="text-sm text-muted-foreground">margin on all subscriptions</p>
                <ul className="text-sm text-left mt-4 space-y-2">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Everything in Partner</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Co-branded marketing assets</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Priority support</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">Gold</CardTitle>
                <CardDescription>25+ clients</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-violet-600 mb-2">25%</div>
                <p className="text-sm text-muted-foreground">margin on all subscriptions</p>
                <ul className="text-sm text-left mt-4 space-y-2">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Everything in Silver</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Dedicated account manager</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Custom pricing options</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            Base pricing: Free tier (5 users), Professional at $1.50/user/mo (10-user min), Enterprise custom
          </p>
        </div>

        {/* Comprehensive FAQ */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <HelpCircle className="h-4 w-4" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl font-bold mb-2">Everything You Need to Know</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Answers to common questions about the platform, security, integrations, and the partner program.
            </p>
          </div>

          {/* Platform & Technology */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Server className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Platform & Technology</h3>
            </div>
            <div className="border rounded-lg divide-y">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">What tech stack does Siggly run on?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Siggly is built on a modern, production-grade stack:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Frontend:</strong> Next.js (React) with TypeScript, deployed on Vercel&apos;s edge network</li>
                    <li><strong>Backend:</strong> Next.js API Routes + Supabase (PostgreSQL) for database and authentication</li>
                    <li><strong>Email rendering:</strong> Server-side HTML rendering engine optimized for email client compatibility (Gmail, Outlook, Apple Mail, mobile)</li>
                    <li><strong>Integrations:</strong> Google Workspace APIs (Admin SDK, Gmail API), Microsoft Graph API, HubSpot API</li>
                    <li><strong>Payments:</strong> Stripe for subscription billing</li>
                    <li><strong>Email delivery:</strong> Resend for transactional emails</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">Where is the platform hosted?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Siggly runs on Vercel&apos;s global edge network (powered by AWS) with Supabase cloud (powered by AWS) for database and authentication. Infrastructure is distributed across multiple regions for low latency and high availability. All data is stored in US-based data centers with automated backups.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">What&apos;s the uptime and reliability like?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Siggly inherits the reliability of Vercel (99.99% uptime SLA) and Supabase (99.9% uptime). Signature deployments are idempotent — if a deployment fails due to a transient error, it retries automatically. Signatures that have already been deployed continue working even if Siggly is temporarily unreachable, since they live inside the email platform (Gmail/Outlook), not on our servers.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">Do you offer an API?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Yes. Professional and Enterprise plans include API access for programmatic signature management, template deployment, and user syncing. This is useful for partners who want to integrate Siggly into their own provisioning workflows, PSA tools, or automation scripts.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">How are signatures rendered? Will they break in Outlook?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Signatures are rendered as table-based HTML specifically designed for email client compatibility. We test across Gmail (web, Android, iOS), Outlook (desktop, web, mobile), Apple Mail, Thunderbird, and other clients. The rendering engine uses inline styles, avoids CSS that breaks in Outlook, and handles image sizing for retina displays. What you see in the editor is what your users get in their inbox.</p>
                </div>
              </details>
            </div>
          </div>

          {/* Security & Compliance */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Lock className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Security & Compliance</h3>
            </div>
            <div className="border rounded-lg divide-y">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">Do you access or read email content?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p><strong>No.</strong> Siggly never reads, stores, or processes email content. We only access:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>User directory data (name, title, department, phone) for populating signature fields</li>
                    <li>The Gmail/Outlook signature setting to deploy the HTML signature</li>
                  </ul>
                  <p className="mt-2">We use the minimum OAuth scopes required. Email body content is never requested or accessible to our application.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">What OAuth scopes does Siggly request?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p><strong>Google Workspace:</strong></p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li><code className="bg-muted px-1 rounded text-xs">admin.directory.user.readonly</code> — Read user directory to sync names, titles, departments</li>
                    <li><code className="bg-muted px-1 rounded text-xs">gmail.settings.basic</code> — Set the email signature in Gmail</li>
                  </ul>
                  <p className="mt-3"><strong>Microsoft 365:</strong></p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li><code className="bg-muted px-1 rounded text-xs">User.Read.All</code> — Read user profiles from Azure AD</li>
                    <li><code className="bg-muted px-1 rounded text-xs">MailboxSettings.ReadWrite</code> — Set the email signature in Outlook</li>
                  </ul>
                  <p className="mt-2">No email read scopes. No calendar access. No file access. Just directory and signature settings.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">How is data stored and encrypted?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>At rest:</strong> All data is stored in Supabase (PostgreSQL on AWS) with AES-256 encryption at rest</li>
                    <li><strong>In transit:</strong> All connections use TLS 1.2+ encryption. HTTPS is enforced everywhere</li>
                    <li><strong>OAuth tokens:</strong> Google/Microsoft refresh tokens are encrypted and stored server-side. They are never exposed to the browser</li>
                    <li><strong>Passwords:</strong> Hashed with bcrypt via Supabase Auth. We never store plaintext passwords</li>
                    <li><strong>Row-Level Security:</strong> Database uses Supabase RLS policies so organizations can only access their own data</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">Is Siggly GDPR and privacy compliant?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Yes. Siggly is designed with privacy by default:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>We only collect the minimum data required to render and deploy signatures</li>
                    <li>Data can be deleted on request (right to erasure)</li>
                    <li>No email content is ever accessed or stored</li>
                    <li>Audit logs track all signature deployments for compliance</li>
                    <li>Built-in legal disclaimer engine supports GDPR, HIPAA, and industry-specific compliance text</li>
                    <li>Data processing is limited to what&apos;s necessary for the service (data minimization)</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">Do you store Google or Microsoft credentials?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>We store an encrypted OAuth refresh token that allows Siggly to deploy signatures on behalf of the organization. This token can be revoked at any time from the Google Admin Console or Azure AD portal, which instantly disconnects Siggly. We never store admin passwords or service account keys for your Workspace/365 tenant.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">What about SOC 2 compliance?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Siggly&apos;s infrastructure providers (Vercel, Supabase, AWS) are SOC 2 Type II compliant. All data processing occurs within these certified environments. Audit logging is built into the platform for signature deployments, user changes, and administrative actions.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">Can I get a security questionnaire completed?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Yes. If your organization or your clients require a vendor security assessment, we&apos;re happy to complete security questionnaires and provide documentation about our architecture, data handling, and compliance posture. Contact us at <a href="mailto:security@siggly.com" className="text-primary hover:underline">security@siggly.com</a>.</p>
                </div>
              </details>
            </div>
          </div>

          {/* Integrations */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Plug className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold">Integrations</h3>
            </div>
            <div className="border rounded-lg divide-y">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">Which email platforms are supported?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Google Workspace</strong> — Full integration via OAuth or Google Workspace Marketplace. Signatures are pushed directly to Gmail via the Gmail API</li>
                    <li><strong>Microsoft 365</strong> — Integration via Microsoft Graph API. Signatures are pushed to Outlook (Professional plan and above)</li>
                  </ul>
                  <p className="mt-2">Signatures are deployed server-side, so they work across all devices (desktop, mobile, webmail) without users needing to do anything.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">How does the Google Workspace integration work?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Two options:</p>
                  <ol className="list-decimal list-inside mt-2 space-y-2">
                    <li><strong>Google Workspace Marketplace install</strong> (recommended) — The admin installs Siggly from the <a href="https://workspace.google.com/marketplace/app/siggly_email_signature_manager/485065317326" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Marketplace listing</a>, which grants domain-wide delegation automatically. No manual consent flows needed.</li>
                    <li><strong>OAuth consent flow</strong> — A Workspace admin clicks "Connect Google Workspace" in Siggly and authorizes the required scopes. Takes about 30 seconds.</li>
                  </ol>
                  <p className="mt-2">Once connected, Siggly auto-syncs the user directory and can push signatures to all users in the domain.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">What HR and CRM integrations are available?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>HubSpot CRM</strong> — Sync contact data bidirectionally (all plans)</li>
                    <li><strong>BambooHR</strong> — Auto-sync employee data for signature fields (Professional+)</li>
                    <li><strong>Gusto</strong> — HR data sync for employee information (Professional+)</li>
                    <li><strong>Rippling</strong> — HR data sync for employee information (Professional+)</li>
                  </ul>
                  <p className="mt-2">HR integrations keep signature fields (title, department, phone) up to date automatically when changes happen in the HR system.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">What happens when an employee joins or leaves?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p><strong>New employee:</strong> When they appear in the Google/Microsoft directory, Siggly detects them and automatically deploys the assigned signature template. No manual action needed.</p>
                  <p className="mt-2"><strong>Departing employee:</strong> Lifecycle automation can automatically replace their signature with a "no longer with the company" message or a generic org signature. This prevents ex-employees from continuing to represent the company in email threads.</p>
                  <p className="mt-2"><strong>Title/department change:</strong> Directory changes are synced automatically. The signature updates on the next sync cycle without anyone lifting a finger.</p>
                </div>
              </details>
            </div>
          </div>

          {/* Partner Program */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold">Partner Program</h3>
            </div>
            <div className="border rounded-lg divide-y">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">How long does partner onboarding take?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Most partners are fully set up within 24 hours of application approval. The process:</p>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Submit your application (you&apos;re on this page)</li>
                    <li>We review and approve within 2-3 business days</li>
                    <li>Your MSP portal is set up with your branding and subdomain</li>
                    <li>You start adding clients — each one takes about 5 minutes</li>
                  </ol>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">How do I bill my clients?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>You receive one consolidated monthly invoice from Siggly at the partner rate. You bill your clients however you prefer — monthly, annually, bundled with your existing managed services, or as a line item. Many partners include signature management as part of a broader IT package. Set your own retail price and keep the margin.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">Can I set my own pricing to clients?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Absolutely. You pay the partner rate to Siggly and charge whatever you want to your clients. Most partners charge $2-3/user/month, which creates a healthy margin on top of the $1.50/user base. Some bundle it for free with other services as a value-add to reduce churn on higher-margin contracts.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">What does the white-label include?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Custom subdomain</strong> — yourcompany.siggly.io</li>
                    <li><strong>Your logo</strong> — displayed in the dashboard header and login page</li>
                    <li><strong>Your brand colors</strong> — primary color applied across the interface</li>
                    <li><strong>Multi-client switcher</strong> — jump between client organizations from one dashboard</li>
                    <li><strong>&quot;Powered by&quot; removal</strong> — available for Gold partners and Enterprise plans</li>
                  </ul>
                  <p className="mt-2">Your clients log into your branded portal and see your company, not Siggly.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">Is there a minimum commitment or contract?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>No annual contracts. No minimum commitment. The only minimum is 10 users per client on the Professional plan ($15/month per client). You can cancel any client at any time. We believe partners stay because the product works, not because of lock-in.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">What marketing and sales support do you provide?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Co-branded marketing materials (Silver+ tiers)</li>
                    <li>Onboarding documentation you can share with clients</li>
                    <li>Sales deck and ROI calculator</li>
                    <li>Partner directory listing (coming soon)</li>
                    <li>Dedicated account manager for Gold partners</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">Can clients manage their own signatures?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Flexible access control:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Full MSP control</strong> — You manage everything. Clients don&apos;t log in at all</li>
                    <li><strong>Client admin access</strong> — Grant the client&apos;s IT admin limited access to edit templates while you retain oversight</li>
                    <li><strong>Employee self-service</strong> — Individual employees can update personal fields (phone, title) through a self-service portal with optional admin approval</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">What if a client wants to leave or switch providers?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>No lock-in whatsoever:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Signatures that have already been deployed remain in place inside Gmail/Outlook — they don&apos;t disappear</li>
                    <li>Templates can be exported</li>
                    <li>The client&apos;s Google/Microsoft admin can revoke Siggly&apos;s access with one click</li>
                    <li>No cancellation fees or early termination penalties</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>

          {/* Pricing & Billing */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold">Pricing & Billing</h3>
            </div>
            <div className="border rounded-lg divide-y">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">What are the exact costs I&apos;ll pay?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Siggly has three tiers for end clients:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Free:</strong> Up to 5 users, 1 template, Google Workspace only. Great for small clients or trials</li>
                    <li><strong>Professional:</strong> $1.50/user/month, 10-user minimum ($15/mo). Unlimited templates, Microsoft 365, HR integrations, analytics, lifecycle automation</li>
                    <li><strong>Enterprise:</strong> Custom pricing for large organizations. SSO/SAML, white-label, brand governance, dedicated support</li>
                  </ul>
                  <p className="mt-2">As a partner, you receive a 15-25% margin depending on your tier (Partner, Silver, or Gold).</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">Can I start clients on the free plan?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Yes. The free plan supports up to 5 users with Google Workspace and is a great way to demo the product to a client before upgrading. There&apos;s no trial period — the free tier is permanent. When the client is ready for more users, templates, or Microsoft 365 support, upgrade to Professional.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">How are partner margins paid out?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Partner margins are applied as a discount on your invoice, not as a separate payout. For example, as a Silver partner (20% margin) with a client at $1.50/user:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Client has 50 users = $75/month retail</li>
                    <li>Your cost = $60/month (after 20% discount)</li>
                    <li>You bill the client at your rate and keep the difference</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">What payment methods are accepted?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>All billing is handled through Stripe. We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as ACH bank transfers for US-based partners on annual billing. Invoices are generated monthly and payment is automatic.</p>
                </div>
              </details>
            </div>
          </div>

          {/* Support */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                <Headphones className="h-5 w-5 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold">Support & Onboarding</h3>
            </div>
            <div className="border rounded-lg divide-y">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">What support is included?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>All partners:</strong> Email support, knowledge base, onboarding documentation</li>
                    <li><strong>Silver+:</strong> Priority email support with faster response times, co-branded client onboarding guides</li>
                    <li><strong>Gold:</strong> Dedicated account manager, direct Slack/Teams channel, quarterly business reviews</li>
                  </ul>
                  <p className="mt-2">Partners handle first-line support for their clients. We provide second-line support and escalation paths for technical issues.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">How do I add a new client?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>From your MSP dashboard:</p>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Click &quot;Add Client&quot; and enter their organization name</li>
                    <li>Connect their Google Workspace or Microsoft 365 (OAuth — takes 30 seconds)</li>
                    <li>Users sync automatically from the directory</li>
                    <li>Create or assign a signature template</li>
                    <li>Deploy — signatures are pushed to all users within minutes</li>
                  </ol>
                  <p className="mt-2">Total setup time per client: 5-10 minutes.</p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm">I already have a Siggly account. Can I convert it to an MSP partner account?</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  <p>Yes! If you&apos;re logged in, you&apos;ll see a checkbox above the application form to convert your existing organization. All your templates, team members, and settings are preserved. Your org is simply upgraded to an MSP partner account with multi-client capabilities.</p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle>Partner Application</CardTitle>
            <CardDescription>
              Tell us about your business. We'll review your application within 2-3 business days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Existing Organization Conversion Option */}
            {existingOrg && (
              <div className="mb-6 p-4 bg-violet-50 border border-violet-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="convertExisting"
                    checked={convertExisting}
                    onCheckedChange={(checked) => setConvertExisting(checked === true)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="convertExisting" className="font-medium cursor-pointer">
                      Convert my existing organization to an MSP partner account
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your organization "<strong>{existingOrg.name}</strong>" will be upgraded to an MSP partner account. 
                      All your existing templates, team members, and settings will be preserved.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Company Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Acme IT Solutions"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://acme-it.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredSubdomain">Preferred Subdomain</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="preferredSubdomain"
                      value={formData.preferredSubdomain}
                      onChange={(e) => setFormData({ ...formData, preferredSubdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                      placeholder="acme-it"
                      className="max-w-xs"
                    />
                    <span className="text-muted-foreground">.siggly.io</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This will be your white-label portal URL. We'll confirm availability upon approval.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Contact Information</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="john@acme-it.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Business Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="numberOfClients">How many clients do you currently manage?</Label>
                  <Input
                    id="numberOfClients"
                    type="number"
                    min="0"
                    value={formData.numberOfClients}
                    onChange={(e) => setFormData({ ...formData, numberOfClients: e.target.value })}
                    placeholder="25"
                    className="max-w-xs"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Primary Services (select all that apply)</Label>
                  <div className="grid md:grid-cols-2 gap-3 mt-2">
                    {SERVICE_OPTIONS.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={service.id}
                          checked={formData.primaryServices.includes(service.id)}
                          onCheckedChange={() => handleServiceToggle(service.id)}
                        />
                        <label
                          htmlFor={service.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {service.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="howHeardAboutUs">How did you hear about Siggly?</Label>
                  <Input
                    id="howHeardAboutUs"
                    value={formData.howHeardAboutUs}
                    onChange={(e) => setFormData({ ...formData, howHeardAboutUs: e.target.value })}
                    placeholder="Google search, referral, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="Tell us more about your business and why you're interested in partnering with Siggly..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  By submitting, you agree to our{' '}
                  <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </p>
                <Button type="submit" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
