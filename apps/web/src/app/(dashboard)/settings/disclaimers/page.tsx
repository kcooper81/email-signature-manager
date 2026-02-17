'use client';

import { useState, useEffect } from 'react';
import { Button, ConfirmDialog, useToast } from '@/components/ui';
import { Shield, Plus, FileText, Scale, History, Lock, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useSubscription, usePayGatesBypass } from '@/hooks/use-subscription';
import { DisclaimerTemplateModal } from './disclaimer-template-modal';
import { DisclaimerRuleModal } from './disclaimer-rule-modal';

type Tab = 'templates' | 'rules' | 'presets' | 'audit';

interface DisclaimerTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
  description: string | null;
  is_system: boolean;
}

interface DisclaimerRule {
  id: string;
  name: string;
  priority: number;
  disclaimer_template_id: string;
  department_condition: string | null;
  departments: string[] | null;
  region_condition: string | null;
  regions: string[] | null;
  recipient_condition: string | null;
  recipient_domains: string[] | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  cascade_to_clients: boolean;
  _cascaded?: boolean;
  _readOnly?: boolean;
}

interface Preset {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
}

interface AuditEntry {
  id: string;
  applied_at: string;
  disclaimer_templates: { name: string } | null;
  users: { email: string } | null;
}

export default function DisclaimersPage() {
  const [activeTab, setActiveTab] = useState<Tab>('templates');
  const [templates, setTemplates] = useState<DisclaimerTemplate[]>([]);
  const [rules, setRules] = useState<DisclaimerRule[]>([]);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { canAccess } = useSubscription();
  const devBypass = usePayGatesBypass();
  const hasPresets = devBypass || canAccess('disclaimerRegulatoryPresets');
  const hasAudit = devBypass || canAccess('disclaimerAuditTrail');
  const toast = useToast();

  // Modal state
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<DisclaimerTemplate | null>(null);
  const [presetData, setPresetData] = useState<Preset | null>(null);
  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<DisclaimerRule | null>(null);
  const [deleteType, setDeleteType] = useState<'template' | 'rule' | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

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
        // Also load templates for the rule modal's template selector
        const tRes = await fetch('/api/disclaimers/templates');
        const tData = await tRes.json();
        setTemplates(tData.templates || []);
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
      toast.error('Failed to load data');
    }
    setLoading(false);
  }

  function openCreateTemplate() {
    setEditingTemplate(null);
    setPresetData(null);
    setTemplateModalOpen(true);
  }

  function openEditTemplate(t: DisclaimerTemplate) {
    setEditingTemplate(t);
    setPresetData(null);
    setTemplateModalOpen(true);
  }

  function openPresetTemplate(p: Preset) {
    setEditingTemplate(null);
    setPresetData(p);
    setTemplateModalOpen(true);
  }

  function openCreateRule() {
    setEditingRule(null);
    setRuleModalOpen(true);
  }

  function openEditRule(r: DisclaimerRule) {
    setEditingRule(r);
    setRuleModalOpen(true);
  }

  async function handleDelete() {
    if (!deleteId || !deleteType) return;
    setDeleting(true);
    try {
      const url = deleteType === 'template'
        ? `/api/disclaimers/templates/${deleteId}`
        : `/api/disclaimers/rules/${deleteId}`;
      const res = await fetch(url, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      toast.success(`${deleteType === 'template' ? 'Template' : 'Rule'} deleted`);
      setDeleteId(null);
      setDeleteType(null);
      await loadData();
    } catch (err: any) {
      toast.error('Failed to delete', err.message);
    }
    setDeleting(false);
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
          <h2 className="text-xl font-semibold">Disclaimers &amp; Compliance</h2>
          <p className="text-sm text-muted-foreground">Manage email disclaimers, compliance rules, and regulatory templates</p>
        </div>
        {activeTab === 'templates' && (
          <Button onClick={openCreateTemplate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Template
          </Button>
        )}
        {activeTab === 'rules' && (
          <Button onClick={openCreateRule}>
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
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
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
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
                      <p className="text-sm text-muted-foreground">{t.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {t.is_system && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">System</span>}
                      <Button variant="outline" size="sm" onClick={() => openEditTemplate(t)}>
                        <Pencil className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                      {!t.is_system && (
                        <Button variant="outline" size="sm" onClick={() => { setDeleteType('template'); setDeleteId(t.id); }} className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
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
                      {!r._readOnly && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => openEditRule(r)}>
                            <Pencil className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => { setDeleteType('rule'); setDeleteId(r.id); }} className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
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
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{p.category.toUpperCase()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
                  <Button variant="outline" size="sm" onClick={() => openPresetTemplate(p)}>Use This Preset</Button>
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

      {/* Template Modal */}
      {templateModalOpen && (
        <DisclaimerTemplateModal
          open={templateModalOpen}
          onClose={() => { setTemplateModalOpen(false); setEditingTemplate(null); setPresetData(null); }}
          template={editingTemplate}
          presetData={presetData}
          onSaved={() => { toast.success(editingTemplate ? 'Template updated' : 'Template created'); loadData(); }}
        />
      )}

      {/* Rule Modal */}
      {ruleModalOpen && (
        <DisclaimerRuleModal
          open={ruleModalOpen}
          onClose={() => { setRuleModalOpen(false); setEditingRule(null); }}
          rule={editingRule}
          templates={templates.map(t => ({ id: t.id, name: t.name }))}
          onSaved={() => { toast.success(editingRule ? 'Rule updated' : 'Rule created'); loadData(); }}
        />
      )}

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => { setDeleteId(null); setDeleteType(null); }}
        onConfirm={handleDelete}
        title={`Delete ${deleteType === 'template' ? 'Template' : 'Rule'}`}
        description="Are you sure? This will be permanently removed."
        confirmText="Delete"
        variant="destructive"
        loading={deleting}
      />
    </div>
  );
}
