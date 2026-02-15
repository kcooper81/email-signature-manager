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
  Lock,
  Copy,
  Check,
} from 'lucide-react';
import { useSubscription, usePayGatesBypass } from '@/hooks/use-subscription';
import Link from 'next/link';

interface ProviderConnection {
  id: string;
  provider: string;
  is_active: boolean;
  created_at: string;
  token_expires_at: string | null;
  auth_type?: 'oauth' | 'marketplace';
  domain?: string;
}

interface HubSpotList {
  id: string;
  name: string;
  listType: 'STATIC' | 'DYNAMIC';
  size: number;
}

export default function IntegrationsPage() {
  const searchParams = useSearchParams();
  const [connections, setConnections] = useState<ProviderConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [syncSuccess, setSyncSuccess] = useState<string | null>(null);
  const [hubspotLists, setHubspotLists] = useState<HubSpotList[]>([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [loadingLists, setLoadingLists] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState<string | null>(null);
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState<string | null>(null);
  const [showMarketplaceSetup, setShowMarketplaceSetup] = useState(false);
  const [marketplaceAdminEmail, setMarketplaceAdminEmail] = useState('');
  const [marketplaceDomain, setMarketplaceDomain] = useState('');
  const [verifyingMarketplace, setVerifyingMarketplace] = useState(false);
  const [marketplaceError, setMarketplaceError] = useState<string | null>(null);
  const [showGoogleOAuthSetup, setShowGoogleOAuthSetup] = useState(false);
  const [showMicrosoftSetup, setShowMicrosoftSetup] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [calendlyEventTypes, setCalendlyEventTypes] = useState<any[]>([]);
  const [loadingCalendlyEvents, setLoadingCalendlyEvents] = useState(false);
  const [refreshingCalendly, setRefreshingCalendly] = useState(false);
  
  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };
  
  // Plan-based access control
  const { plan } = useSubscription();
  const devBypass = usePayGatesBypass();
  const hasMicrosoft365Access = devBypass || plan.features.microsoft365;
  // HubSpot is free for all plans — no access check needed

  const success = searchParams.get('success');
  const error = searchParams.get('error');

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    const supabase = createClient();
    
    // Get current user's organization
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) {
      setLoading(false);
      return;
    }

    // Load connections - ONLY for current organization
    const { data, error } = await supabase
      .from('provider_connections')
      .select('id, provider, is_active, created_at, token_expires_at, auth_type, domain')
      .eq('organization_id', currentUser.organization_id);

    if (!error && data) {
      setConnections(data);
    }
    setLoading(false);
  };

  const connectGoogle = () => {
    setConnecting('google');
    window.location.href = '/api/integrations/google/connect';
  };

  const connectMicrosoft = () => {
    setConnecting('microsoft');
    window.location.href = '/api/integrations/microsoft/connect';
  };

  const connectHubSpot = () => {
    setConnecting('hubspot');
    window.location.href = '/api/integrations/hubspot/connect';
  };

  const connectCalendly = () => {
    setConnecting('calendly');
    window.location.href = '/api/integrations/calendly/connect';
  };

  const loadCalendlyEventTypes = async () => {
    setLoadingCalendlyEvents(true);
    try {
      const response = await fetch('/api/integrations/calendly/event-types');
      if (response.ok) {
        const data = await response.json();
        setCalendlyEventTypes(data.event_types || []);
      }
    } catch (err) {
      console.error('Failed to load Calendly event types:', err);
    } finally {
      setLoadingCalendlyEvents(false);
    }
  };

  const refreshCalendlyMetadata = async () => {
    setRefreshingCalendly(true);
    setSyncError(null);
    setSyncSuccess(null);
    
    try {
      const response = await fetch('/api/integrations/calendly/refresh-metadata', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to refresh Calendly data');
      }
      
      setSyncSuccess('Calendly event types refreshed successfully');
      await loadConnections();
    } catch (err: any) {
      setSyncError(err.message || 'Failed to refresh Calendly data');
      console.error('Calendly refresh error:', err);
    } finally {
      setRefreshingCalendly(false);
    }
  };

  const disconnectCalendly = async () => {
    setShowDisconnectConfirm(null);
    
    try {
      const response = await fetch('/api/integrations/calendly/disconnect', {
        method: 'POST',
      });
      
      if (response.ok) {
        await loadConnections();
        setSyncSuccess('Calendly disconnected successfully');
      }
    } catch (err) {
      console.error('Failed to disconnect Calendly:', err);
      setSyncError('Failed to disconnect Calendly');
    }
  };

  const verifyMarketplaceInstall = async () => {
    if (!marketplaceAdminEmail || !marketplaceDomain) {
      setMarketplaceError('Please enter both admin email and domain');
      return;
    }

    setVerifyingMarketplace(true);
    setMarketplaceError(null);

    try {
      const response = await fetch('/api/integrations/google/verify-marketplace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminEmail: marketplaceAdminEmail,
          domain: marketplaceDomain,
        }),
      });

      const data = await response.json();

      if (!data.installed) {
        setMarketplaceError(data.error || 'App not installed. Please install from Google Workspace Marketplace first.');
        return;
      }

      // Success - reload connections
      setShowMarketplaceSetup(false);
      setMarketplaceAdminEmail('');
      setMarketplaceDomain('');
      await loadConnections();
      setSyncSuccess('Google Workspace Marketplace app connected successfully!');
    } catch (err: any) {
      setMarketplaceError(err.message || 'Failed to verify installation');
    } finally {
      setVerifyingMarketplace(false);
    }
  };

  const syncGoogle = async () => {
    setSyncing('google');
    setSyncError(null);
    setSyncSuccess(null);
    
    try {
      const response = await fetch('/api/integrations/google/sync', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Check if it's a pay gate limit error
        if (response.status === 403 && data.error === 'User limit reached') {
          setUpgradeMessage(data.message);
          setShowUpgradePrompt(true);
          return;
        }
        throw new Error(data.error || 'Failed to sync users');
      }
      
      setSyncSuccess(`Synced ${data.count || 0} users from Google Workspace`);
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      setSyncError(err.message || 'Failed to sync Google Workspace users. Please try again.');
      console.error('Google sync error:', err);
    } finally {
      setSyncing(null);
    }
  };

  const syncMicrosoft = async () => {
    setSyncing('microsoft');
    setSyncError(null);
    setSyncSuccess(null);
    
    try {
      const response = await fetch('/api/integrations/microsoft/sync', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Check if it's a pay gate limit error
        if (response.status === 403 && data.error === 'User limit reached') {
          setUpgradeMessage(data.message);
          setShowUpgradePrompt(true);
          return;
        }
        throw new Error(data.error || 'Failed to sync users');
      }
      
      setSyncSuccess(`Synced ${data.count || 0} users from Microsoft 365`);
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      setSyncError(err.message || 'Failed to sync Microsoft 365 users. Please try again.');
      console.error('Microsoft sync error:', err);
    } finally {
      setSyncing(null);
    }
  };

  const loadHubSpotLists = async () => {
    setLoadingLists(true);
    try {
      const response = await fetch('/api/integrations/hubspot/lists');
      if (response.ok) {
        const data = await response.json();
        setHubspotLists(data.lists || []);
      }
    } catch (err) {
      console.error('Failed to load HubSpot lists:', err);
    } finally {
      setLoadingLists(false);
    }
  };

  const syncHubSpot = async () => {
    setSyncing('hubspot');
    setSyncError(null);
    setSyncSuccess(null);
    
    try {
      const response = await fetch('/api/integrations/hubspot/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listId: selectedListId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Check if it's a pay gate limit error
        if (response.status === 403 && data.error === 'User limit reached') {
          setUpgradeMessage(data.message);
          setShowUpgradePrompt(true);
          return;
        }
        throw new Error(data.error || 'Failed to sync contacts');
      }
      
      setSyncSuccess(`Synced ${data.count || 0} contacts from HubSpot`);
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      setSyncError(err.message || 'Failed to sync HubSpot contacts. Please try again.');
      console.error('HubSpot sync error:', err);
    } finally {
      setSyncing(null);
    }
  };

  const handleDisconnectClick = (provider: string) => {
    setShowDisconnectConfirm(provider);
  };

  const disconnectProvider = async (provider: string) => {
    setShowDisconnectConfirm(null);

    // Use custom disconnect handler for Calendly
    if (provider === 'calendly') {
      await disconnectCalendly();
      return;
    }

    const supabase = createClient();
    
    // Get current user's organization for security
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) return;

    // Delete connection - FILTERED BY ORGANIZATION to prevent cross-org deletion
    const { error } = await supabase
      .from('provider_connections')
      .delete()
      .eq('provider', provider)
      .eq('organization_id', currentUser.organization_id);

    if (!error) {
      setConnections(connections.filter((c) => c.provider !== provider));
    }
  };

  const googleConnection = connections.find((c) => c.provider === 'google' && c.is_active);
  const microsoftConnection = connections.find((c) => c.provider === 'microsoft' && c.is_active);
  const hubspotConnection = connections.find((c) => c.provider === 'hubspot' && c.is_active);
  const calendlyConnection = connections.find((c) => c.provider === 'calendly' && c.is_active);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Connect your email providers to deploy signatures
        </p>
      </div>

      {/* Status messages */}
      {success === 'google_connected' && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <p className="text-emerald-500">Google Workspace connected successfully!</p>
        </div>
      )}

      {success === 'microsoft_connected' && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <p className="text-emerald-500">Microsoft 365 connected successfully!</p>
        </div>
      )}

      {success === 'hubspot_connected' && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <p className="text-emerald-500">HubSpot CRM connected successfully!</p>
        </div>
      )}

      {success === 'calendly_connected' && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <p className="text-emerald-500">Calendly connected successfully!</p>
        </div>
      )}

      {syncSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <p className="text-emerald-500">{syncSuccess}</p>
        </div>
      )}

      {syncError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3">
          <XCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-600">{syncError}</p>
        </div>
      )}

      {error && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-amber-600">
                {error === 'oauth_denied' && 'Connection was denied'}
                {error === 'missing_params' && 'Invalid callback'}
                {error === 'state_expired' && 'Session timed out'}
                {error === 'callback_failed' && 'Connection failed'}
                {error === 'access_not_configured' && 'Workspace admin approval required'}
                {error === 'no_organization' && 'Organization not found'}
                {error === 'storage_failed' && 'Failed to save connection'}
                {error === 'oauth_failed' && 'OAuth failed'}
              </p>
              <p className="text-sm text-amber-600 mt-1">
                {error === 'oauth_denied' && 'You declined the permission request. Please try connecting again.'}
                {error === 'missing_params' && 'The callback was missing required parameters. Please try connecting again.'}
                {error === 'state_expired' && 'The authorization took too long. This can happen if you needed to get admin approval first. Simply try connecting again.'}
                {error === 'callback_failed' && 'Something went wrong saving your connection. Please try again.'}
                {error === 'access_not_configured' && 'Your admin needs to approve this app before you can connect. Contact your admin or check the admin console.'}
                {error === 'no_organization' && 'Your account is not associated with an organization. Please contact support.'}
                {error === 'storage_failed' && 'Failed to store the connection in the database. Please try again.'}
                {error === 'oauth_failed' && 'The OAuth flow failed. Please try again or contact support if the issue persists.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        {/* Google Workspace */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-background border rounded-lg flex items-center justify-center">
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
                <span className="flex items-center gap-1 text-sm text-emerald-500">
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
                  {googleConnection.auth_type === 'marketplace' && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-500/15 text-blue-500 rounded text-xs">
                      Marketplace
                    </span>
                  )}
                  {googleConnection.domain && (
                    <span className="ml-2 text-muted-foreground">
                      ({googleConnection.domain})
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={syncGoogle}
                    disabled={syncing === 'google'}
                  >
                    {syncing === 'google' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      'Sync Users'
                    )}
                  </Button>
                  {googleConnection.auth_type !== 'marketplace' && (
                    <Button variant="outline" size="sm" onClick={connectGoogle}>
                      Reconnect
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive"
                    onClick={() => handleDisconnectClick('google')}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button onClick={() => setShowGoogleOAuthSetup(true)} disabled={connecting === 'google'} variant="outline">
                    {connecting === 'google' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      'Connect with OAuth'
                    )}
                  </Button>
                  <Button onClick={() => setShowMarketplaceSetup(true)} variant="default">
                    Connect Organization
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong>Recommended:</strong> Connect Organization for automatic domain-wide signature management.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Microsoft 365 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-background border rounded-lg flex items-center justify-center">
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
              {microsoftConnection?.is_active && (
                <span className="flex items-center gap-1 text-sm text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                  Connected
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your Microsoft 365 to sync users and manage Outlook Web signatures.
            </p>
            
            {!hasMicrosoft365Access ? (
              <div className="bg-muted border border-border rounded-lg p-4 text-center">
                <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground mb-1">Upgrade Required</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Microsoft 365 integration is available on the Professional plan.
                </p>
                <Link href="/settings/billing">
                  <Button size="sm">Upgrade Plan</Button>
                </Link>
              </div>
            ) : microsoftConnection?.is_active ? (
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  Connected on {new Date(microsoftConnection.created_at).toLocaleDateString()}
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded p-2 text-xs text-blue-600">
                  <strong>Note:</strong> Signatures deploy to Outlook Web only. Desktop users can copy their signature from Outlook Web or use the Copy button in the editor.
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={syncMicrosoft}
                    disabled={syncing === 'microsoft'}
                  >
                    {syncing === 'microsoft' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      'Sync Users'
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={connectMicrosoft}>
                    Reconnect
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive"
                    onClick={() => handleDisconnectClick('microsoft')}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => setShowMicrosoftSetup(true)} disabled={connecting === 'microsoft'}>
                {connecting === 'microsoft' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect Microsoft 365
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* HubSpot CRM */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-background border rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill="#FF7A59" d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.978v-.04A2.084 2.084 0 0 0 17.349 1h-.04a2.084 2.084 0 0 0-2.082 2.082v.04c0 .835.492 1.556 1.198 1.888v2.92a4.132 4.132 0 0 0-2.26 1.21l-7.213-4.39a2.527 2.527 0 1 0-.957 1.568l7.214 4.39a4.167 4.167 0 1 0 5.955-2.778zm-1.082 6.323a2.083 2.083 0 1 1 0-4.166 2.083 2.083 0 0 1 0 4.166z"/>
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-lg">HubSpot CRM</CardTitle>
                  <CardDescription>Sync contact data</CardDescription>
                </div>
              </div>
              {hubspotConnection?.is_active && (
                <span className="flex items-center gap-1 text-sm text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                  Connected
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your HubSpot CRM to automatically sync contact data and populate signature fields with employee information.
            </p>

            {!hubspotConnection?.is_active ? (
              <>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-blue-600 mb-2">Recommended Setup:</p>
                  <ol className="text-xs text-blue-600 space-y-1 list-decimal list-inside">
                    <li>Create a list in HubSpot called "Employees"</li>
                    <li>Add all employee contacts to this list</li>
                    <li>After connecting, select the list to sync from</li>
                  </ol>
                  <p className="text-xs text-blue-600 mt-2">
                    <strong>Note:</strong> HubSpot typically contains customers/leads. We recommend using Google Workspace or Microsoft 365 for employee management.
                  </p>
                </div>
                <Button onClick={connectHubSpot} disabled={connecting === 'hubspot'}>
                  {connecting === 'hubspot' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      Connect HubSpot CRM
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  Connected on {new Date(hubspotConnection.created_at).toLocaleDateString()}
                </div>

                {hubspotLists.length === 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={loadHubSpotLists}
                    disabled={loadingLists}
                  >
                    {loadingLists ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading Lists...
                      </>
                    ) : (
                      'Load HubSpot Lists'
                    )}
                  </Button>
                )}

                {hubspotLists.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Employee List:</label>
                    <select
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      value={selectedListId || ''}
                      onChange={(e) => setSelectedListId(e.target.value || null)}
                    >
                      <option value="">All Contacts (with employee filter)</option>
                      {hubspotLists.map((list) => (
                        <option key={list.id} value={list.id}>
                          {list.name} ({list.size} contacts)
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={syncHubSpot}
                    disabled={syncing === 'hubspot'}
                  >
                    {syncing === 'hubspot' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      'Sync Contacts'
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={connectHubSpot}>
                    Reconnect
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive"
                    onClick={() => handleDisconnectClick('hubspot')}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Calendly */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-background border rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill="#006BFF" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                    <path fill="#006BFF" d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
                    <circle fill="#006BFF" cx="12" cy="12" r="2"/>
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-lg">Calendly</CardTitle>
                  <CardDescription>Meeting scheduling links</CardDescription>
                </div>
              </div>
              {calendlyConnection?.is_active && (
                <span className="flex items-center gap-1 text-sm text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                  Connected
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add your Calendly scheduling links to email signatures, making it easy for recipients to book meetings with you.
            </p>

            {!calendlyConnection?.is_active ? (
              <>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-blue-600 mb-2">How it works:</p>
                  <ol className="text-xs text-blue-600 space-y-1 list-decimal list-inside">
                    <li>Connect your Calendly account</li>
                    <li>We&apos;ll fetch your event types (30 min call, discovery call, etc.)</li>
                    <li>Add Calendly links to your signature templates</li>
                    <li>Recipients can book time with one click</li>
                  </ol>
                </div>
                <Button onClick={connectCalendly} disabled={connecting === 'calendly'}>
                  {connecting === 'calendly' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      Connect Calendly
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  Connected on {new Date(calendlyConnection.created_at).toLocaleDateString()}
                </div>

                {calendlyEventTypes.length === 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={loadCalendlyEventTypes}
                    disabled={loadingCalendlyEvents}
                  >
                    {loadingCalendlyEvents ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading Event Types...
                      </>
                    ) : (
                      'View Event Types'
                    )}
                  </Button>
                )}

                {calendlyEventTypes.length > 0 && (
                  <div className="bg-muted border border-border rounded-lg p-3">
                    <p className="text-xs font-medium text-foreground mb-2">Available Event Types:</p>
                    <div className="space-y-1">
                      {calendlyEventTypes.slice(0, 5).map((eventType: any) => (
                        <div key={eventType.uri} className="text-xs text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          <span className="font-medium">{eventType.name}</span>
                          <span className="text-muted-foreground">({eventType.duration} min)</span>
                        </div>
                      ))}
                      {calendlyEventTypes.length > 5 && (
                        <p className="text-xs text-muted-foreground italic">
                          +{calendlyEventTypes.length - 5} more event types
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-blue-500/10 border border-blue-500/20 rounded p-2 text-xs text-blue-600">
                  <strong>Usage:</strong> Use <code className="bg-blue-500/15 px-1 rounded">{'{{calendly_link}}'}</code> in your signature templates to insert your scheduling link.
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={refreshCalendlyMetadata}
                    disabled={refreshingCalendly}
                  >
                    {refreshingCalendly ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Refreshing...
                      </>
                    ) : (
                      'Refresh Event Types'
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={connectCalendly}>
                    Reconnect
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive"
                    onClick={() => handleDisconnectClick('calendly')}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Prompt Modal */}
      {showUpgradePrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Upgrade Required</CardTitle>
              <CardDescription>
                {upgradeMessage || 'You have reached your plan limit.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3">
              <Button variant="outline" onClick={() => setShowUpgradePrompt(false)}>
                Cancel
              </Button>
              <Button onClick={() => window.location.href = '/settings/billing'}>
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Disconnect Confirmation Modal */}
      {showDisconnectConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Disconnect {showDisconnectConfirm}?</CardTitle>
              <CardDescription>
                Are you sure you want to disconnect this integration? You can reconnect at any time.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3">
              <Button variant="outline" onClick={() => setShowDisconnectConfirm(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => disconnectProvider(showDisconnectConfirm)}>
                Disconnect
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Google Workspace Marketplace Setup Modal */}
      {showMarketplaceSetup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader>
              <CardTitle>Connect Google Workspace</CardTitle>
              <CardDescription>
                Connect your Google Workspace organization for centralized signature management.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-sm text-amber-600">
                  <strong>First time?</strong> You&apos;ll need to{' '}
                  <a 
                    href="/help/google-workspace-setup#org-setup" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline font-medium"
                  >
                    configure domain-wide delegation
                  </a>
                  {' '}in your Google Admin Console (5 min).
                </p>
              </div>

              <div className="space-y-3">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Admin Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    placeholder="admin@yourcompany.com"
                    value={marketplaceAdminEmail}
                    onChange={(e) => setMarketplaceAdminEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Domain</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    placeholder="yourcompany.com"
                    value={marketplaceDomain}
                    onChange={(e) => setMarketplaceDomain(e.target.value)}
                  />
                </div>

                {marketplaceError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-sm text-red-600">{marketplaceError}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowMarketplaceSetup(false);
                    setMarketplaceError(null);
                    setMarketplaceAdminEmail('');
                    setMarketplaceDomain('');
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={verifyMarketplaceInstall}
                  disabled={verifyingMarketplace || !marketplaceAdminEmail || !marketplaceDomain}
                >
                  {verifyingMarketplace ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Connect'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Google OAuth Setup Modal */}
      {showGoogleOAuthSetup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader>
              <CardTitle>Connect Google Workspace via OAuth</CardTitle>
              <CardDescription>
                Connect using your Google Workspace admin account for direct OAuth access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-3">
                <p className="text-sm font-medium text-blue-600">Before you connect:</p>
                <ol className="text-sm text-blue-600 space-y-2 list-decimal list-inside">
                  <li>You must be a <strong>Google Workspace administrator</strong></li>
                  <li>You&apos;ll be asked to grant permissions to manage Gmail signatures</li>
                  <li>The app will only access signature settings, not email content</li>
                </ol>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <p className="text-sm text-amber-600">
                  <strong>Note:</strong> If you see &quot;This app isn&apos;t verified&quot;, click &quot;Advanced&quot; then &quot;Go to Siggly&quot; to continue. 
                  Our app is currently in the verification process with Google.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowGoogleOAuthSetup(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => {
                  setShowGoogleOAuthSetup(false);
                  connectGoogle();
                }}>
                  Continue to Google
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Microsoft 365 Setup Modal */}
      {showMicrosoftSetup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader>
              <CardTitle>Connect Microsoft 365</CardTitle>
              <CardDescription>
                Connect your Microsoft 365 organization to manage Outlook signatures.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-3">
                <p className="text-sm font-medium text-blue-600">Before you connect:</p>
                <ol className="text-sm text-blue-600 space-y-2 list-decimal list-inside">
                  <li>You must be a <strong>Microsoft 365 administrator</strong></li>
                  <li>You&apos;ll be asked to grant permissions to manage mail settings</li>
                  <li>Admin consent may be required for organization-wide access</li>
                </ol>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <p className="text-sm text-amber-600">
                  <strong>Admin Consent:</strong> If prompted, check &quot;Consent on behalf of your organization&quot; to allow 
                  signature management for all users. Without this, only your personal signature can be managed.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-blue-600">Important: Web vs Desktop Clients</p>
                <p className="text-sm text-blue-600">
                  Signatures deployed via Microsoft 365 apply to <strong>Outlook Web (outlook.office.com)</strong> only. 
                  Desktop Outlook apps store signatures locally and cannot be updated remotely.
                </p>
                <p className="text-sm text-blue-600">
                  <strong>For desktop users:</strong> After deployment, users can copy their signature from Outlook Web 
                  or use the &quot;Copy Signature&quot; button in the signature editor to paste into their desktop Outlook settings.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowMicrosoftSetup(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => {
                  setShowMicrosoftSetup(false);
                  connectMicrosoft();
                }}>
                  Continue to Microsoft
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
}
