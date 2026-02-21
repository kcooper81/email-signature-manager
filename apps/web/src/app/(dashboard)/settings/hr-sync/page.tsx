'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Select, Switch, Label, Modal, ModalHeader, ModalTitle, ModalFooter, ConfirmDialog, useToast } from '@/components/ui';
import { RefreshCw, Plus, Settings2, Loader2, Trash2 } from 'lucide-react';
import { FeatureGate } from '@/components/billing/upgrade-prompt';

interface SyncConfiguration {
  id: string;
  provider: string;
  schedule_type: string;
  conflict_resolution: string;
  auto_apply_changes: boolean;
  sync_new_users: boolean;
  sync_deactivated: boolean;
  api_url: string | null;
  last_sync_at: string | null;
  last_sync_status: string | null;
  is_active: boolean;
}

interface ConfigForm {
  provider: string;
  scheduleType: string;
  conflictResolution: string;
  autoApplyChanges: boolean;
  syncNewUsers: boolean;
  syncDeactivated: boolean;
  apiKey: string;
  apiUrl: string;
}

const emptyForm: ConfigForm = {
  provider: 'bamboohr',
  scheduleType: 'daily',
  conflictResolution: 'hr_wins',
  autoApplyChanges: true,
  syncNewUsers: true,
  syncDeactivated: true,
  apiKey: '',
  apiUrl: '',
};

const providerOptions = [
  { value: 'bamboohr', label: 'BambooHR' },
  { value: 'gusto', label: 'Gusto' },
  { value: 'rippling', label: 'Rippling' },
  { value: 'google', label: 'Google Directory' },
  { value: 'microsoft', label: 'Microsoft Directory' },
];

const scheduleOptions = [
  { value: 'manual', label: 'Manual Only' },
  { value: 'hourly', label: 'Hourly' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
];

const conflictOptions = [
  { value: 'hr_wins', label: 'HR System Wins' },
  { value: 'siggly_wins', label: 'Siggly Wins' },
  { value: 'manual', label: 'Manual Resolution' },
];

const providerLabels: Record<string, string> = {
  bamboohr: 'BambooHR',
  gusto: 'Gusto',
  rippling: 'Rippling',
  google: 'Google Directory',
  microsoft: 'Microsoft Directory',
};

function getApiKeyPlaceholder(provider: string): string {
  switch (provider) {
    case 'bamboohr': return 'Enter your BambooHR API key';
    case 'gusto': return 'Enter OAuth access token';
    case 'rippling': return 'Enter OAuth access token';
    default: return 'Enter API key';
  }
}

function getApiKeyHint(provider: string): string {
  switch (provider) {
    case 'bamboohr': return 'Get from: Settings → API Keys in your BambooHR account';
    case 'gusto': return 'OAuth token from Gusto developer portal (expires in ~2 hours)';
    case 'rippling': return 'OAuth token from Rippling (contact support for access)';
    case 'google': return 'Uses existing Google Workspace connection - no key needed';
    case 'microsoft': return 'Uses existing Microsoft 365 connection - no key needed';
    default: return '';
  }
}

function getApiUrlLabel(provider: string): string {
  switch (provider) {
    case 'bamboohr': return 'Subdomain';
    case 'gusto': return 'Company ID';
    case 'rippling': return 'API URL (Optional)';
    default: return 'API URL (Optional)';
  }
}

function getApiUrlPlaceholder(provider: string): string {
  switch (provider) {
    case 'bamboohr': return 'yourcompany (just the subdomain)';
    case 'gusto': return 'demo/1234567890 (for sandbox) or 1234567890 (production)';
    case 'rippling': return 'Leave blank to use default';
    default: return '';
  }
}

function getApiUrlHint(provider: string): string {
  switch (provider) {
    case 'bamboohr': return 'Enter just the subdomain from yourcompany.bamboohr.com';
    case 'gusto': return 'Include "demo/" prefix for sandbox testing';
    case 'rippling': return 'Custom API endpoint (optional)';
    default: return '';
  }
}

export default function HrSyncPage() {
  const [configurations, setConfigurations] = useState<SyncConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ConfigForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [syncing, setSyncing] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    loadConfigurations();
  }, []);

  async function loadConfigurations() {
    setLoading(true);
    try {
      const res = await fetch('/api/hr-sync/configurations');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load');
      setConfigurations(data.configurations || []);
    } catch (err: any) {
      toast.error('Failed to load configurations', err.message);
    }
    setLoading(false);
  }

  async function triggerSync(configId: string) {
    setSyncing(configId);
    try {
      const res = await fetch('/api/hr-sync/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ syncConfigurationId: configId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sync failed');
      toast.success('Sync triggered successfully');
      await loadConfigurations();
    } catch (err: any) {
      toast.error('Sync failed', err.message);
    }
    setSyncing(null);
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(config: SyncConfiguration) {
    setEditingId(config.id);
    setForm({
      provider: config.provider,
      scheduleType: config.schedule_type,
      conflictResolution: config.conflict_resolution,
      autoApplyChanges: config.auto_apply_changes,
      syncNewUsers: config.sync_new_users,
      syncDeactivated: config.sync_deactivated,
      apiKey: '', // Don't prefill secret
      apiUrl: config.api_url || '',
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.provider) {
      toast.error('Validation error', 'Provider is required');
      return;
    }
    if (!editingId && !form.apiKey) {
      toast.error('Validation error', 'API key is required for new integrations');
      return;
    }
    setSaving(true);
    try {
      const payload: any = { ...form };
      if (editingId && !payload.apiKey) delete payload.apiKey; // Don't overwrite if not changed

      const url = editingId
        ? `/api/hr-sync/configurations/${editingId}`
        : '/api/hr-sync/configurations';
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      toast.success(editingId ? 'Configuration updated' : 'Integration added');
      setModalOpen(false);
      await loadConfigurations();
    } catch (err: any) {
      toast.error('Failed to save', err.message);
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/hr-sync/configurations/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      toast.success('Integration removed');
      setDeleteId(null);
      await loadConfigurations();
    } catch (err: any) {
      toast.error('Failed to delete', err.message);
    }
    setDeleting(false);
  }

  return (
    <FeatureGate feature="hrIntegrations">
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">HR &amp; Directory Sync</h2>
          <p className="text-sm text-muted-foreground">Sync employee data from HR providers and directories</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : configurations.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="h-8 w-8 text-teal-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No HR integrations connected yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-2">
            HR &amp; Directory Sync keeps your signature data in sync with your HR system.
            When employees are added, updated, or offboarded, their signature data updates automatically.
          </p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Supports BambooHR, Gusto, Rippling, Google Directory, and Microsoft Directory.
            Choose a sync schedule and conflict resolution strategy that fits your workflow.
          </p>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Connect Your First Integration
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {configurations.map(config => (
            <div key={config.id} className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{providerLabels[config.provider] || config.provider}</h3>
                  <p className="text-sm text-muted-foreground">
                    Schedule: {config.schedule_type} · Conflict: {config.conflict_resolution}
                    {config.last_sync_at && ` · Last sync: ${new Date(config.last_sync_at).toLocaleDateString()}`}
                  </p>
                  {config.last_sync_status && (
                    <span className={`text-xs px-2 py-0.5 rounded mt-1 inline-block ${
                      config.last_sync_status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {config.last_sync_status}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => triggerSync(config.id)} disabled={syncing === config.id}>
                    <RefreshCw className={`h-3.5 w-3.5 mr-1 ${syncing === config.id ? 'animate-spin' : ''}`} />
                    Sync Now
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openEdit(config)}>
                    <Settings2 className="h-3.5 w-3.5 mr-1" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setDeleteId(config.id)} className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalHeader onClose={() => setModalOpen(false)}>
          <ModalTitle>{editingId ? 'Configure Integration' : 'Add Integration'}</ModalTitle>
        </ModalHeader>
        <div className="space-y-4 px-4 sm:px-6 py-4 max-h-[65vh] overflow-y-auto">
          <div className="space-y-2">
            <Label>Provider</Label>
            <Select value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} options={providerOptions} disabled={!!editingId} />
          </div>
          <div className="space-y-2">
            <Label>Schedule</Label>
            <Select value={form.scheduleType} onChange={(e) => setForm({ ...form, scheduleType: e.target.value })} options={scheduleOptions} />
          </div>
          <div className="space-y-2">
            <Label>Conflict Resolution</Label>
            <Select value={form.conflictResolution} onChange={(e) => setForm({ ...form, conflictResolution: e.target.value })} options={conflictOptions} />
          </div>
          <div className="space-y-2">
            <Label>{editingId ? 'API Key (leave blank to keep current)' : 'API Key'}</Label>
            <Input type="password" value={form.apiKey} onChange={(e) => setForm({ ...form, apiKey: e.target.value })} placeholder={editingId ? '••••••••' : getApiKeyPlaceholder(form.provider)} />
            <p className="text-xs text-muted-foreground">{getApiKeyHint(form.provider)}</p>
          </div>
          <div className="space-y-2">
            <Label>{getApiUrlLabel(form.provider)}</Label>
            <Input type="text" value={form.apiUrl} onChange={(e) => setForm({ ...form, apiUrl: e.target.value })} placeholder={getApiUrlPlaceholder(form.provider)} />
            <p className="text-xs text-muted-foreground">{getApiUrlHint(form.provider)}</p>
          </div>
          <div className="flex items-center justify-between">
            <Label>Auto-apply Changes</Label>
            <Switch checked={form.autoApplyChanges} onCheckedChange={(c) => setForm({ ...form, autoApplyChanges: c })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Sync New Users</Label>
            <Switch checked={form.syncNewUsers} onCheckedChange={(c) => setForm({ ...form, syncNewUsers: c })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Sync Deactivated Users</Label>
            <Switch checked={form.syncDeactivated} onCheckedChange={(c) => setForm({ ...form, syncDeactivated: c })} />
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {editingId ? 'Update' : 'Add'}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove Integration"
        description="Are you sure? This will remove the HR sync integration and all its configuration."
        confirmText="Remove"
        variant="destructive"
        loading={deleting}
      />
    </div>
    </FeatureGate>
  );
}
