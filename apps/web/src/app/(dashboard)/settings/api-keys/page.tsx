'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Label,
} from '@/components/ui';
import { Key, Plus, Copy, Check, Trash2, Loader2, AlertTriangle, Eye, EyeOff, Shield, ExternalLink } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  is_revoked: boolean;
  created_at: string;
  last_used_at: string | null;
}

const AUTO_DISMISS_MS = 120_000; // 2 minutes

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [keyVisible, setKeyVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('member');
  const [planHasAccess, setPlanHasAccess] = useState<boolean | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    loadKeys();
    checkAccess();
  }, []);

  // Auto-dismiss the revealed key after 2 minutes for security
  useEffect(() => {
    if (revealedKey) {
      dismissTimer.current = setTimeout(() => {
        setRevealedKey(null);
        setKeyVisible(false);
      }, AUTO_DISMISS_MS);
    }
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [revealedKey]);

  async function checkAccess() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('auth_id', user.id)
      .single();
    if (userData) setUserRole(userData.role);
  }

  async function loadKeys() {
    try {
      const res = await fetch('/api/settings/api-keys');
      const data = await res.json();
      if (res.ok) {
        setKeys(data.keys);
        setPlanHasAccess(true);
      } else if (res.status === 403 && data.upgradeRequired) {
        setPlanHasAccess(false);
      } else {
        setError(data.error);
      }
    } catch {
      setError('Failed to load API keys');
    } finally {
      setLoading(false);
    }
  }

  async function createKey() {
    if (!newKeyName.trim()) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch('/api/settings/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      setRevealedKey(data.key.rawKey);
      setKeyVisible(true);
      setNewKeyName('');
      setShowCreate(false);
      await loadKeys();
    } catch {
      setError('Failed to create API key');
    } finally {
      setCreating(false);
    }
  }

  async function revokeKey(id: string) {
    if (!confirm('Revoke this API key? Any systems using it will immediately lose access.')) return;
    setRevokingId(id);
    try {
      const res = await fetch(`/api/settings/api-keys/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error);
        return;
      }
      await loadKeys();
    } catch {
      setError('Failed to revoke API key');
    } finally {
      setRevokingId(null);
    }
  }

  function copyKey() {
    if (!revealedKey) return;
    navigator.clipboard.writeText(revealedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function maskKey(key: string): string {
    // Show first 12 chars and last 4 chars, mask the rest
    if (key.length <= 20) return key;
    return key.slice(0, 12) + '\u2022'.repeat(24) + key.slice(-4);
  }

  function dismissKey() {
    setRevealedKey(null);
    setKeyVisible(false);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
  }

  const isAdmin = ['owner', 'admin'].includes(userRole);
  const activeKeys = keys.filter((k) => !k.is_revoked);
  const revokedKeys = keys.filter((k) => k.is_revoked);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (planHasAccess === false) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys
          </CardTitle>
          <CardDescription>
            Access the public Signature API to deploy signatures server-side
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium">Professional plan required</p>
              <p className="text-sm mt-1">
                The public Signature API is available on Professional and Enterprise plans.
                Upgrade to create API keys and pull signature HTML for any mail system.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Newly created key reveal */}
      {revealedKey && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 text-green-700 dark:text-green-300 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    API key created — copy it now
                  </p>
                  <p className="text-xs text-green-700/80 dark:text-green-300/80 mt-0.5">
                    This is the only time the full key will be shown. It cannot be retrieved
                    later. Store it in a secure location like a password manager or secrets vault.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-3 bg-white dark:bg-gray-900 rounded border text-sm font-mono break-all select-all">
                  {keyVisible ? revealedKey : maskKey(revealedKey)}
                </code>
                <div className="flex flex-col gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setKeyVisible(!keyVisible)}
                    title={keyVisible ? 'Hide key' : 'Show key'}
                  >
                    {keyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={copyKey} title="Copy to clipboard">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-green-700/60 dark:text-green-300/60">
                  This key will be hidden automatically after 2 minutes.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={dismissKey}
                  className="text-green-700 dark:text-green-300"
                >
                  I{"'"}ve saved it — dismiss
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
              <CardDescription className="mt-1.5">
                Use API keys to pull rendered signature HTML via the public API.
                Keys are scoped to your organization.
              </CardDescription>
            </div>
            {isAdmin && !showCreate && (
              <Button size="sm" onClick={() => setShowCreate(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Create Key
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>
          )}

          {/* Create form */}
          {showCreate && (
            <div className="mb-6 p-4 rounded-lg border bg-secondary/30 space-y-3">
              <Label htmlFor="keyName">Key name</Label>
              <Input
                id="keyName"
                placeholder="e.g. Exchange Server, Custom SMTP, Deploy Script"
                value={newKeyName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewKeyName(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && createKey()}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                Give it a descriptive name so you know where it{"'"}s used later.
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={createKey} disabled={creating || !newKeyName.trim()}>
                  {creating && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                  Create
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => { setShowCreate(false); setNewKeyName(''); }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Active keys */}
          {activeKeys.length === 0 && !showCreate ? (
            <p className="text-sm text-muted-foreground py-4">
              No API keys yet. Create one to start using the public Signature API.
            </p>
          ) : (
            <div className="space-y-3">
              {activeKeys.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{key.name}</span>
                      <Badge variant="outline" className="text-xs">Active</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <code>{key.key_prefix}...</code>
                      <span>Created {new Date(key.created_at).toLocaleDateString()}</span>
                      {key.last_used_at && (
                        <span>Last used {new Date(key.last_used_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => revokeKey(key.id)}
                      disabled={revokingId === key.id}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      {revokingId === key.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Revoked keys */}
          {revokedKeys.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Revoked
              </p>
              <div className="space-y-2">
                {revokedKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-3 rounded-lg border opacity-50"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm line-through">{key.name}</span>
                        <Badge variant="secondary" className="text-xs">Revoked</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <code>{key.key_prefix}...</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li><strong>Keys are hashed.</strong> We store a SHA-256 hash of your key, not the key itself. If our database were ever compromised, your raw keys stay safe.</li>
            <li><strong>Shown once.</strong> The full key is only displayed at creation time. After you dismiss it, there is no way to retrieve it — you{"'"}d need to create a new key.</li>
            <li><strong>Org-scoped.</strong> Each key can only read signatures for its own organization. It cannot access other orgs or modify any data.</li>
            <li><strong>Instant revocation.</strong> Revoking a key takes effect immediately. Any system using that key will get a 401 error on its next request.</li>
            <li><strong>Rate limited.</strong> 60 requests per minute per key to prevent abuse.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Deployment guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">How to deploy signatures with the API</CardTitle>
          <CardDescription>
            Use the Signature API to pull rendered HTML for any mail system that Siggly
            doesn{"'"}t connect to directly — Exchange on-premise, custom SMTP servers,
            internal tools, or anything else.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-1">1. Fetch all signatures for your org</p>
            <p className="text-xs text-muted-foreground mb-2">
              Returns rendered HTML for every active user. Each entry includes the user{"'"}s
              email, name, and ready-to-use signature HTML with disclaimers already appended.
            </p>
            <pre className="p-3 rounded-lg bg-secondary text-xs overflow-x-auto">
{`curl -H "Authorization: Bearer sk_live_YOUR_KEY" \\
  https://siggly.com/api/v1/signatures`}
            </pre>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">2. Or fetch a single user{"'"}s signature</p>
            <p className="text-xs text-muted-foreground mb-2">
              Pass the user{"'"}s ID (from the list response) to get just their signature.
            </p>
            <pre className="p-3 rounded-lg bg-secondary text-xs overflow-x-auto">
{`curl -H "Authorization: Bearer sk_live_YOUR_KEY" \\
  https://siggly.com/api/v1/signatures/USER_ID`}
            </pre>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">Response format</p>
            <pre className="p-3 rounded-lg bg-secondary text-xs overflow-x-auto">
{`{
  "data": [
    {
      "userId": "abc-123",
      "email": "jane@example.com",
      "name": "Jane Smith",
      "templateName": "Company Default",
      "html": "<table>...rendered signature...</table>"
    }
  ],
  "meta": { "count": 1 }
}`}
            </pre>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-3">Example: Deploy to Exchange / Microsoft 365 (PowerShell)</p>
            <p className="text-xs text-muted-foreground mb-2">
              Pull signatures from Siggly and set them in Exchange mailboxes. Run this as a
              scheduled task (e.g. daily) to keep signatures in sync.
            </p>
            <pre className="p-3 rounded-lg bg-secondary text-xs overflow-x-auto">
{`# Pull signatures from Siggly
$headers = @{ Authorization = "Bearer sk_live_YOUR_KEY" }
$response = Invoke-RestMethod ` + '`' + `
  -Uri "https://siggly.com/api/v1/signatures" ` + '`' + `
  -Headers $headers

# Apply to each mailbox
foreach ($sig in $response.data) {
    Set-MailboxMessageConfiguration ` + '`' + `
      -Identity $sig.email ` + '`' + `
      -SignatureHtml $sig.html ` + '`' + `
      -AutoAddSignature $true
    Write-Host "Updated: $($sig.email)"
}`}
            </pre>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-3">Example: Simple fetch with JavaScript / Node.js</p>
            <pre className="p-3 rounded-lg bg-secondary text-xs overflow-x-auto">
{`const res = await fetch("https://siggly.com/api/v1/signatures", {
  headers: { Authorization: "Bearer sk_live_YOUR_KEY" },
});
const { data } = await res.json();

for (const sig of data) {
  console.log(sig.email, sig.html);
  // Deploy to your mail system here
}`}
            </pre>
          </div>

          <div className="p-3 rounded-lg border bg-secondary/20 space-y-2">
            <p className="text-sm font-medium">Good to know</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
              <li>Responses are cached for 5 minutes — safe to poll frequently</li>
              <li>Rate limit: 60 requests per minute per key</li>
              <li>When you update a template in Siggly, the next API call returns the new version</li>
              <li>The API is read-only — keys cannot modify signatures, users, or settings</li>
              <li>Store your key in environment variables or a secrets manager, never in source code</li>
            </ul>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ExternalLink className="h-3 w-3" />
            <a href="/help/signature-api" className="underline hover:text-foreground">
              Full documentation in the Help Center
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
