'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface ProviderConnection {
  id: string;
  provider: string;
  is_active: boolean;
  created_at: string;
  token_expires_at: string | null;
}

export default function IntegrationsPage() {
  const searchParams = useSearchParams();
  const [connections, setConnections] = useState<ProviderConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState<string | null>(null);

  const success = searchParams.get('success');
  const error = searchParams.get('error');

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('provider_connections')
      .select('id, provider, is_active, created_at, token_expires_at');

    if (!error && data) {
      setConnections(data);
    }
    setLoading(false);
  };

  const connectGoogle = () => {
    setConnecting('google');
    window.location.href = '/api/integrations/google/connect';
  };

  const disconnectProvider = async (provider: string) => {
    if (!confirm(`Are you sure you want to disconnect ${provider}?`)) return;

    const supabase = createClient();
    const { error } = await supabase
      .from('provider_connections')
      .delete()
      .eq('provider', provider);

    if (!error) {
      setConnections(connections.filter((c) => c.provider !== provider));
    }
  };

  const googleConnection = connections.find((c) => c.provider === 'google');
  const microsoftConnection = connections.find((c) => c.provider === 'microsoft');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">
          Connect your email providers to deploy signatures
        </p>
      </div>

      {/* Status messages */}
      {success === 'google_connected' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <p className="text-green-800">Google Workspace connected successfully!</p>
        </div>
      )}

      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-amber-800">
                {error === 'oauth_denied' && 'Connection was denied'}
                {error === 'missing_params' && 'Invalid callback'}
                {error === 'state_expired' && 'Session timed out'}
                {error === 'callback_failed' && 'Connection failed'}
                {error === 'access_not_configured' && 'Workspace admin approval required'}
              </p>
              <p className="text-sm text-amber-700 mt-1">
                {error === 'oauth_denied' && 'You declined the permission request. Click "Connect Google Workspace" to try again.'}
                {error === 'missing_params' && 'The callback was missing required parameters. Please try connecting again.'}
                {error === 'state_expired' && 'The authorization took too long. This can happen if you needed to get admin approval first. Simply click "Connect Google Workspace" below to continue.'}
                {error === 'callback_failed' && 'Something went wrong saving your connection. Please try again.'}
                {error === 'access_not_configured' && 'Your Google Workspace admin needs to approve this app before you can connect. Contact your admin or check the Google Workspace Admin Console.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Google Workspace */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white border rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-lg">Google Workspace</CardTitle>
                  <CardDescription>Gmail signature management</CardDescription>
                </div>
              </div>
              {googleConnection?.is_active && (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Connected
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your Google Workspace to automatically deploy email signatures to all users in your organization.
            </p>
            
            {googleConnection?.is_active ? (
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  Connected on {new Date(googleConnection.created_at).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={connectGoogle}>
                    Reconnect
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive"
                    onClick={() => disconnectProvider('google')}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={connectGoogle} disabled={connecting === 'google'}>
                {connecting === 'google' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect Google Workspace
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Microsoft 365 */}
        <Card className="opacity-60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white border rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill="#F25022" d="M1 1h10v10H1z"/>
                    <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                    <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                    <path fill="#FFB900" d="M13 13h10v10H13z"/>
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-lg">Microsoft 365</CardTitle>
                  <CardDescription>Outlook signature management</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your Microsoft 365 to automatically deploy email signatures to Outlook users.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              Coming soon
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Setup instructions */}
      {!googleConnection?.is_active && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Google Workspace Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>You must be a Google Workspace admin</li>
                <li>Domain-wide delegation must be enabled (for managing all users)</li>
                <li>The Gmail API must be enabled in your Google Cloud project</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> You'll need to set up a Google Cloud project with OAuth credentials. 
                Contact support if you need help with the setup process.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
