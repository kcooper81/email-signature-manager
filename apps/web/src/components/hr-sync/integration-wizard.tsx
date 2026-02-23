'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/toast';
import { Loader2, ArrowRight, ExternalLink } from 'lucide-react';

interface IntegrationWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

type Provider = 'bamboohr' | 'gusto' | 'rippling';
type Step = 'select-provider' | 'provider-setup' | 'configure' | 'complete';

export function IntegrationWizard({ onComplete, onCancel }: IntegrationWizardProps) {
  const [step, setStep] = useState<Step>('select-provider');
  const [provider, setProvider] = useState<Provider | null>(null);
  const [subdomain, setSubdomain] = useState('');
  const [useSandbox, setUseSandbox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [configId, setConfigId] = useState<string | null>(null);
  const { error: showError } = useToast();

  const providerInfo = {
    bamboohr: {
      name: 'BambooHR',
      description: 'Sync employees from BambooHR',
      icon: '🎋',
      requiresSubdomain: true,
      supportsSandbox: false,
    },
    gusto: {
      name: 'Gusto',
      description: 'Sync employees from Gusto with real-time webhooks',
      icon: '💼',
      requiresSubdomain: false,
      supportsSandbox: true,
    },
    rippling: {
      name: 'Rippling',
      description: 'Sync employees from Rippling',
      icon: '🌊',
      requiresSubdomain: false,
      supportsSandbox: false,
    },
  };

  async function handleConnect() {
    if (!provider) return;

    const info = providerInfo[provider];
    if (info.requiresSubdomain && !subdomain) {
      showError('Validation error', 'Subdomain is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/oauth/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          subdomain: subdomain || undefined,
          useSandbox,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate OAuth');
      }

      setConfigId(data.configId);
      
      // Redirect to OAuth provider
      window.location.href = data.authUrl;
    } catch (err: any) {
      showError('Connection failed', err.message);
      setLoading(false);
    }
  }

  function renderSelectProvider() {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Choose Your HR System</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select the HR platform you want to sync employees from
          </p>
        </div>

        <div className="grid gap-3">
          {(Object.entries(providerInfo) as [Provider, typeof providerInfo.bamboohr][]).map(([key, info]) => (
            <button
              key={key}
              onClick={() => {
                setProvider(key);
                setStep('provider-setup');
              }}
              className="flex items-start gap-4 p-4 border rounded-lg hover:border-primary hover:bg-accent transition-colors text-left"
            >
              <div className="text-3xl">{info.icon}</div>
              <div className="flex-1">
                <div className="font-semibold">{info.name}</div>
                <div className="text-sm text-muted-foreground">{info.description}</div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  function renderProviderSetup() {
    if (!provider) return null;
    const info = providerInfo[provider];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect to {info.name}</h3>
          <p className="text-sm text-muted-foreground">
            You'll be redirected to {info.name} to authorize access
          </p>
        </div>

        {info.requiresSubdomain && (
          <div className="space-y-2">
            <Label>Your {info.name} Subdomain</Label>
            <Input
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              placeholder="yourcompany"
              className="max-w-md"
            />
            <p className="text-xs text-muted-foreground">
              Enter just the subdomain from yourcompany.bamboohr.com
            </p>
          </div>
        )}

        {info.supportsSandbox && (
          <div className="flex items-center justify-between max-w-md">
            <div>
              <Label>Use Sandbox/Demo Environment</Label>
              <p className="text-xs text-muted-foreground">For testing purposes</p>
            </div>
            <Switch checked={useSandbox} onCheckedChange={setUseSandbox} />
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            What happens next?
          </h4>
          <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
            <li>You'll be redirected to {info.name}</li>
            <li>Sign in and authorize Siggly</li>
            <li>You'll be redirected back here</li>
            <li>Your integration will be ready to use!</li>
          </ol>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => setStep('select-provider')} variant="outline">
            Back
          </Button>
          <Button onClick={handleConnect} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Connect to {info.name}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add HR Integration</CardTitle>
        <CardDescription>
          Connect your HR system to automatically sync employee data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 'select-provider' && renderSelectProvider()}
        {step === 'provider-setup' && renderProviderSetup()}
      </CardContent>
    </Card>
  );
}
