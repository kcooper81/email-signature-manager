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
      .select('id, provider, is_active, created_at, token_expires_at')
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

  const googleConnection = connections.find((c) => c.provider === 'google');
  const microsoftConnection = connections.find((c) => c.provider === 'microsoft');
  const hubspotConnection = connections.find((c) => c.provider === 'hubspot');

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

      {success === 'microsoft_connected' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <p className="text-green-800">Microsoft 365 connected successfully!</p>
        </div>
      )}

      {success === 'hubspot_connected' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <p className="text-green-800">HubSpot CRM connected successfully!</p>
        </div>
      )}

      {syncSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <p className="text-green-800">{syncSuccess}</p>
        </div>
      )}

      {syncError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <XCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-800">{syncError}</p>
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
                {error === 'no_organization' && 'Organization not found'}
                {error === 'storage_failed' && 'Failed to save connection'}
                {error === 'oauth_failed' && 'OAuth failed'}
              </p>
              <p className="text-sm text-amber-700 mt-1">
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

      <div className="grid gap-6 md:grid-cols-2">
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
                  <Button variant="outline" size="sm" onClick={connectGoogle}>
                    Reconnect
                  </Button>
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
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Connected
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your Microsoft 365 to automatically deploy email signatures to Outlook users.
            </p>
            
            {microsoftConnection?.is_active ? (
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  Connected on {new Date(microsoftConnection.created_at).toLocaleDateString()}
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
              <Button onClick={connectMicrosoft} disabled={connecting === 'microsoft'}>
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
                <span className="flex items-center gap-1 text-sm text-green-600">
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

            {!hubspotConnection?.is_active && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-blue-900 mb-2">Recommended Setup:</p>
                <ol className="text-xs text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Create a list in HubSpot called "Employees"</li>
                  <li>Add all employee contacts to this list</li>
                  <li>After connecting, select the list to sync from</li>
                </ol>
                <p className="text-xs text-blue-700 mt-2">
                  <strong>Note:</strong> HubSpot typically contains customers/leads. We recommend using Google Workspace or Microsoft 365 for employee management.
                </p>
              </div>
            )}
            
            {hubspotConnection?.is_active ? (
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
            ) : (
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
