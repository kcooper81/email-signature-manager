'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  Building2, 
  Users, 
  Globe, 
  ArrowLeft,
  Zap,
  Shield,
  Clock,
  DollarSign,
  Palette,
  BarChart3,
  Headphones,
  RefreshCw,
  CheckCircle2,
  Mail,
  ArrowUpRight,
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

        {/* FAQ / Concerns */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Common Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold">How long does onboarding take?</h3>
              <p className="text-sm text-muted-foreground">
                Most partners are up and running within 24 hours of approval. Client deployments take 5-10 minutes each via OAuth.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Do you access email content?</h3>
              <p className="text-sm text-muted-foreground">
                No. We only sync user directory data (name, title, department) and deploy signatures. We never read, store, or process email content.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">What if a client wants to leave?</h3>
              <p className="text-sm text-muted-foreground">
                No lock-in. Signatures remain in place even if they disconnect. They can export their templates anytime.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">How do I bill my clients?</h3>
              <p className="text-sm text-muted-foreground">
                You receive one consolidated invoice from us. Bill your clients however you prefer — monthly, annually, bundled with other services.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">What support do you provide?</h3>
              <p className="text-sm text-muted-foreground">
                Email support for all partners. Silver+ tiers get priority response. We also provide documentation and onboarding guides you can share with clients.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Can clients manage their own signatures?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, you can grant client admins limited access to manage their own templates while you retain oversight. Or keep full control — your choice.
              </p>
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
