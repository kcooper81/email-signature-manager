'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Plus, FileText, Scale, History, Lock } from 'lucide-react';
import { useSubscription, usePayGatesBypass } from '@/hooks/use-subscription';
import { UpgradePrompt } from '@/components/billing/upgrade-prompt';

type Tab = 'templates' | 'rules' | 'presets' | 'audit';

export default function DisclaimersPage() {
  const [activeTab, setActiveTab] = useState<Tab>('templates');
  const [templates, setTemplates] = useState<any[]>([]);
  const [rules, setRules] = useState<any[]>([]);
  const [presets, setPresets] = useState<any[]>([]);
  const [auditLog, setAuditLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { canAccess } = useSubscription();
  const devBypass = usePayGatesBypass();
  const hasPresets = devBypass || canAccess('disclaimerRegulatoryPresets');
  const hasAudit = devBypass || canAccess('disclaimerAuditTrail');

  useEffect(() => {
    loadData();
  }, [activeTab]);

  async function loadData() {
    setLoading(true);
    try {
      if (activeTab === 'templates') {
        const res = await fetch('/api/disclaimers/templates');
        const data = await res.json();
        setTemplates(data.templates || []);
      } else if (activeTab === 'rules') {
        const res = await fetch('/api/disclaimers/rules');
        const data = await res.json();
        setRules(data.rules || []);
      } else if (activeTab === 'presets') {
        const res = await fetch('/api/disclaimers/presets');
        const data = await res.json();
        setPresets(data.presets || []);
      } else if (activeTab === 'audit') {
        const res = await fetch('/api/disclaimers/audit');
        const data = await res.json();
        setAuditLog(data.deployments || []);
      }
    } catch (err) {
      console.error('Failed to load data:', err);
    }
    setLoading(false);
  }

  const tabs = [
    { id: 'templates' as Tab, label: 'Templates', icon: FileText, locked: false },
    { id: 'rules' as Tab, label: 'Rules', icon: Scale, locked: false },
    { id: 'presets' as Tab, label: 'Regulatory Presets', icon: Shield, locked: !hasPresets },
    { id: 'audit' as Tab, label: 'Audit Trail', icon: History, locked: !hasAudit },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Disclaimers & Compliance</h1>
          <p className="text-muted-foreground">Manage email disclaimers, compliance rules, and regulatory templates</p>
        </div>
        {(activeTab === 'templates' || activeTab === 'rules') && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add {activeTab === 'templates' ? 'Template' : 'Rule'}
          </Button>
        )}
      </div>

      <div className="flex gap-1 border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => !tab.locked && setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab.locked
                ? 'border-transparent text-muted-foreground/50 cursor-not-allowed'
                : activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.locked ? <Lock className="h-3.5 w-3.5" /> : <tab.icon className="h-4 w-4" />}
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div>
          {activeTab === 'templates' && (
            <div className="space-y-3">
              {templates.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No disclaimer templates yet. Create one or use a regulatory preset.</p>
                </div>
              ) : (
                templates.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div>
                      <h3 className="font-medium">{t.name}</h3>
                      <p className="text-sm text-muted-foreground">{t.category} {t.regulation_type ? `· ${t.regulation_type.toUpperCase()}` : ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {t.is_system && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">System</span>}
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-3">
              {rules.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Scale className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No disclaimer rules configured. Rules determine which disclaimers are applied to each user.</p>
                </div>
              ) : (
                rules.map(r => (
                  <div key={r.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div>
                      <h3 className="font-medium">{r.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Priority: {r.priority} · {r.is_active ? 'Active' : 'Inactive'}
                        {r._cascaded && ' · MSP Cascaded'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {r._readOnly && <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Read Only</span>}
                      {!r._readOnly && <Button variant="outline" size="sm">Edit</Button>}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {presets.map(p => (
                <div key={p.id} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">{p.name}</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{p.regulationType.toUpperCase()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
                  <Button variant="outline" size="sm">Use This Preset</Button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-3">
              {auditLog.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No disclaimer deployments recorded yet.</p>
                </div>
              ) : (
                auditLog.map(a => (
                  <div key={a.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div>
                      <p className="text-sm font-medium">{a.disclaimer_templates?.name || 'Unknown'}</p>
                      <p className="text-xs text-muted-foreground">
                        Applied to {a.users?.email || 'unknown'} · {new Date(a.applied_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
