'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus, Settings2 } from 'lucide-react';
import { FeatureGate } from '@/components/billing/upgrade-prompt';

export default function HrSyncPage() {
  const [configurations, setConfigurations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConfigurations();
  }, []);

  async function loadConfigurations() {
    setLoading(true);
    try {
      const res = await fetch('/api/hr-sync/configurations');
      const data = await res.json();
      setConfigurations(data.configurations || []);
    } catch (err) {
      console.error('Failed to load configurations:', err);
    }
    setLoading(false);
  }

  async function triggerSync(configId: string) {
    try {
      await fetch('/api/hr-sync/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ syncConfigurationId: configId }),
      });
      await loadConfigurations();
    } catch (err) {
      console.error('Failed to trigger sync:', err);
    }
  }

  const providerLabels: Record<string, string> = {
    bamboohr: 'BambooHR',
    gusto: 'Gusto',
    rippling: 'Rippling',
    google: 'Google Directory',
    microsoft: 'Microsoft Directory',
  };

  return (
    <FeatureGate feature="hrIntegrations">
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">HR & Directory Sync</h1>
          <p className="text-muted-foreground">Sync employee data from HR providers and directories</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : configurations.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No sync integrations configured yet.</p>
          <p className="text-sm mt-1">Connect BambooHR, Gusto, or Rippling to automatically sync employee data.</p>
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
                  <Button variant="outline" size="sm" onClick={() => triggerSync(config.id)}>
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Sync Now
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings2 className="h-3.5 w-3.5 mr-1" />
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </FeatureGate>
  );
}
