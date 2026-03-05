'use client';

import { useState, useEffect } from 'react';
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
import { Key, Plus, Copy, Check, Trash2, Loader2, AlertTriangle } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  is_revoked: boolean;
  created_at: string;
  last_used_at: string | null;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('member');
  const [planHasAccess, setPlanHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    loadKeys();
    checkAccess();
  }, []);

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
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                API key created! Copy it now — you won{"'"}t be able to see it again.
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-3 bg-white dark:bg-gray-900 rounded border text-sm font-mono break-all">
                  {revealedKey}
                </code>
                <Button variant="outline" size="sm" onClick={copyKey}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRevealedKey(null)}
                className="text-green-700 dark:text-green-300"
              >
                Dismiss
              </Button>
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
                placeholder="e.g. Exchange Server, Custom SMTP"
                value={newKeyName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewKeyName(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && createKey()}
                maxLength={100}
              />
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

      {/* API usage docs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">How it works</CardTitle>
          <CardDescription>
            The Signature API lets you pull rendered HTML signatures for any mail system —
            Exchange, custom SMTP, or your own tools. Create a key above, then use it to
            fetch ready-to-use signature HTML for your team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-1">Step 1 — Get all signatures</p>
            <p className="text-xs text-muted-foreground mb-2">
              Returns rendered HTML for every active user in your organization.
            </p>
            <pre className="p-3 rounded-lg bg-secondary text-xs overflow-x-auto">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://siggly.com/api/v1/signatures`}
            </pre>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Step 2 — Get a single user{"'"}s signature</p>
            <p className="text-xs text-muted-foreground mb-2">
              Pass the user{"'"}s ID to get just their signature. Useful for per-mailbox deployment scripts.
            </p>
            <pre className="p-3 rounded-lg bg-secondary text-xs overflow-x-auto">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://siggly.com/api/v1/signatures/USER_ID`}
            </pre>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Response format</p>
            <p className="text-xs text-muted-foreground mb-2">
              Each signature includes the user{"'"}s info and ready-to-use HTML (with disclaimers already appended).
            </p>
            <pre className="p-3 rounded-lg bg-secondary text-xs overflow-x-auto">
{`{
  "data": [{
    "userId": "abc-123",
    "email": "jane@example.com",
    "name": "Jane Smith",
    "templateName": "Company Default",
    "html": "<table>...rendered signature...</table>"
  }],
  "meta": { "count": 1 }
}`}
            </pre>
          </div>
          <div className="p-3 rounded-lg border bg-secondary/20 space-y-2">
            <p className="text-sm font-medium">Good to know</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
              <li>Keys are scoped to your organization — they can only access your team{"'"}s signatures</li>
              <li>The raw key is shown once when created. Store it somewhere safe (e.g. a secrets manager)</li>
              <li>Rate limit: 60 requests per minute per key</li>
              <li>Responses are cached for 5 minutes to keep things fast</li>
              <li>Revoked keys stop working immediately — no grace period</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
