'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Palette,
  Building2,
  CreditCard,
  Check,
  ArrowRight,
  Rocket,
  ExternalLink,
  Loader2,
} from 'lucide-react';

interface SetupStatus {
  hasBranding: boolean;
  hasClients: boolean;
  portalUrl: string | null;
  partnerTier: string | null;
  companyName: string | null;
}

export default function PartnerWelcomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<SetupStatus>({
    hasBranding: false,
    hasClients: false,
    portalUrl: null,
    partnerTier: null,
    companyName: null,
  });

  useEffect(() => {
    loadSetupStatus();
  }, []);

  const loadSetupStatus = async () => {
    try {
      const [brandingRes, clientsRes] = await Promise.all([
        fetch('/api/settings/branding'),
        fetch('/api/msp/clients'),
      ]);

      const brandingData = brandingRes.ok ? await brandingRes.json() : null;
      const clientsData = clientsRes.ok ? await clientsRes.json() : null;

      const branding = brandingData?.branding || {};
      const hasBranding = !!(branding.companyName || branding.logoUrl);
      const hasClients = (clientsData?.clients?.length || 0) > 0;

      setStatus({
        hasBranding,
        hasClients,
        portalUrl: brandingData?.customSubdomain
          ? `https://${brandingData.customSubdomain}.siggly.io`
          : null,
        partnerTier: brandingData?.partnerTier || null,
        companyName: branding.companyName || null,
      });
    } catch (err) {
      console.error('Failed to load setup status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    document.cookie = 'partner_welcome_dismissed=true; path=/; max-age=2592000';
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const tierLabel = status.partnerTier
    ? status.partnerTier.charAt(0).toUpperCase() + status.partnerTier.slice(1)
    : 'Registered';

  const completedCount = [status.hasBranding, status.hasClients].filter(Boolean).length;

  const steps = [
    {
      title: 'Set Up Your Branding',
      description: 'Add your logo, colors, and company name to white-label your partner portal for clients.',
      href: '/settings/branding',
      icon: Palette,
      completed: status.hasBranding,
      iconBg: 'bg-violet-100 dark:bg-violet-900/30',
      iconColor: 'text-violet-600',
    },
    {
      title: 'Add Your First Client',
      description: 'Create a client organization and invite their admin to start managing their signatures.',
      href: '/clients',
      icon: Building2,
      completed: status.hasClients,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Explore Billing',
      description: 'Review your partner margins, client subscriptions, and revenue overview.',
      href: '/clients?tab=billing',
      icon: CreditCard,
      completed: false,
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-violet-500 to-purple-600 text-white overflow-hidden">
        <CardContent className="py-8">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Welcome to the Siggly Partner Program!</h1>
          </div>
          <p className="text-white/90 text-lg mb-4">
            You're now a <strong>{tierLabel} Partner</strong>. Let's get your portal set up so you can start managing clients.
          </p>
          {status.portalUrl && (
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 w-fit">
              <span className="text-white/80 text-sm">Your portal:</span>
              <a
                href={status.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium hover:underline flex items-center gap-1"
              >
                {status.portalUrl}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Check className="h-4 w-4" />
        <span>{completedCount} of {steps.length} steps completed</span>
      </div>

      {/* Setup Steps */}
      <div className="grid gap-4">
        {steps.map((step) => (
          <Link key={step.href} href={step.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="py-5">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${step.iconBg}`}>
                    {step.completed ? (
                      <Check className="h-6 w-6 text-green-600" />
                    ) : (
                      <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${step.completed ? 'text-muted-foreground line-through' : ''}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Go to Dashboard */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" onClick={handleDismiss} size="lg">
          Go to Dashboard
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
