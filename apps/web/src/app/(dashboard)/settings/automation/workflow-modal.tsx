'use client';

import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalFooter, Button, Input, Select, Switch, Label } from '@/components/ui';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface SignatureTemplate {
  id: string;
  name: string;
}

interface WorkflowAction {
  type: string;
  config: Record<string, string>;
}

interface Workflow {
  id: string;
  name: string;
  description: string | null;
  event_type: string;
  priority: number;
  department_filter: string[] | null;
  source_filter: string[] | null;
  is_active: boolean;
  cascade_to_clients: boolean;
  actions: WorkflowAction[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  workflow: Workflow | null;
  onSaved: () => void;
}

const eventTypeOptions = [
  { value: 'user_joined', label: 'User Joined' },
  { value: 'user_left', label: 'User Left' },
  { value: 'user_moved', label: 'User Moved Department' },
  { value: 'user_updated', label: 'User Updated' },
  { value: 'invite_accepted', label: 'Invite Accepted' },
];

const actionTypeOptions = [
  { value: 'assign_template', label: 'Assign Template' },
  { value: 'deploy_signature', label: 'Deploy Signature' },
  { value: 'send_notification', label: 'Send Notification' },
  { value: 'webhook', label: 'Call Webhook' },
];

export function WorkflowModal({ open, onClose, workflow, onSaved }: Props) {
  const isEdit = !!workflow;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [templates, setTemplates] = useState<SignatureTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);

  useEffect(() => {
    async function loadTemplates() {
      setLoadingTemplates(true);
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data: userData } = await supabase
          .from('users')
          .select('organization_id')
          .eq('auth_id', user.id)
          .single();
        if (!userData?.organization_id) return;
        const { data } = await supabase
          .from('signature_templates')
          .select('id, name')
          .eq('organization_id', userData.organization_id)
          .order('name');
        setTemplates(data || []);
      } finally {
        setLoadingTemplates(false);
      }
    }
    if (open) loadTemplates();
  }, [open]);

  const [form, setForm] = useState({
    name: workflow?.name || '',
    description: workflow?.description || '',
    eventType: workflow?.event_type || 'user_joined',
    priority: workflow?.priority || 10,
    departmentFilter: (workflow?.department_filter || []).join(', '),
    sourceFilter: (workflow?.source_filter || []).join(', '),
    isActive: workflow?.is_active ?? true,
    cascadeToClients: workflow?.cascade_to_clients ?? false,
  });
  const [actions, setActions] = useState<WorkflowAction[]>(
    workflow?.actions || [{ type: 'assign_template', config: {} }]
  );

  // Reset form state when switching between create/edit or different workflows
  useEffect(() => {
    setForm({
      name: workflow?.name || '',
      description: workflow?.description || '',
      eventType: workflow?.event_type || 'user_joined',
      priority: workflow?.priority || 10,
      departmentFilter: (workflow?.department_filter || []).join(', '),
      sourceFilter: (workflow?.source_filter || []).join(', '),
      isActive: workflow?.is_active ?? true,
      cascadeToClients: workflow?.cascade_to_clients ?? false,
    });
    setActions(workflow?.actions || [{ type: 'assign_template', config: {} }]);
    setError('');
  }, [workflow, open]);

  function addAction() {
    setActions([...actions, { type: 'assign_template', config: {} }]);
  }

  function removeAction(index: number) {
    setActions(actions.filter((_, i) => i !== index));
  }

  function updateAction(index: number, field: string, value: string) {
    const updated = [...actions];
    if (field === 'type') {
      updated[index] = { type: value, config: {} };
    } else {
      updated[index] = { ...updated[index], config: { ...updated[index].config, [field]: value } };
    }
    setActions(updated);
  }

  function isTemplateAction(actionType: string): boolean {
    return actionType === 'assign_template' || actionType === 'remove_template';
  }

  interface ConfigField {
    key: string;
    label: string;
    placeholder: string;
    type?: 'text' | 'select';
    options?: { value: string; label: string }[];
  }

  function getConfigFields(actionType: string): ConfigField[] {
    switch (actionType) {
      case 'assign_template':
      case 'remove_template':
        return []; // Handled separately with Select
      case 'deploy_signature':
        return [{
          key: 'method', label: 'Deploy Method', placeholder: '',
          type: 'select',
          options: [
            { value: 'google_api', label: 'Google Workspace API' },
            { value: 'microsoft_api', label: 'Microsoft Graph API' },
          ],
        }];
      case 'send_notification':
        return [
          {
            key: 'to', label: 'Recipient', placeholder: 'email@example.com',
            type: 'select',
            options: [
              { value: 'admin', label: 'Admin' },
              { value: 'user', label: 'Triggering User' },
              { value: '__custom__', label: 'Custom Email Address' },
            ],
          },
          { key: 'message', label: 'Message', placeholder: 'Notification message' },
        ];
      case 'add_to_group':
      case 'remove_from_group':
        return [{ key: 'groupName', label: 'Group Name', placeholder: 'Engineering' }];
      case 'set_field':
        return [
          { key: 'field', label: 'Field Name', placeholder: 'department' },
          { key: 'value', label: 'Value', placeholder: 'New value' },
        ];
      case 'webhook':
        return [
          { key: 'url', label: 'Webhook URL', placeholder: 'https://example.com/webhook' },
          {
            key: 'method', label: 'HTTP Method', placeholder: '',
            type: 'select',
            options: [
              { value: 'POST', label: 'POST' },
              { value: 'GET', label: 'GET' },
              { value: 'PUT', label: 'PUT' },
              { value: 'PATCH', label: 'PATCH' },
              { value: 'DELETE', label: 'DELETE' },
            ],
          },
        ];
      default:
        return [];
    }
  }

  async function handleSave() {
    if (!form.name.trim()) {
      setError('Name is required');
      return;
    }
    if (actions.length === 0) {
      setError('At least one action is required');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        priority: Number(form.priority),
        departmentFilter: form.departmentFilter ? form.departmentFilter.split(',').map(s => s.trim()).filter(Boolean) : null,
        sourceFilter: form.sourceFilter ? form.sourceFilter.split(',').map(s => s.trim()).filter(Boolean) : null,
        actions,
      };
      const url = isEdit ? `/api/lifecycle/workflows/${workflow.id}` : '/api/lifecycle/workflows';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
    setSaving(false);
  }

  const templateOptions = templates.map(t => ({ value: t.id, label: t.name }));

  return (
    <Modal open={open} onClose={onClose} className="max-w-2xl">
      <ModalHeader onClose={onClose}>
        <ModalTitle>{isEdit ? 'Edit Workflow' : 'Create Workflow'}</ModalTitle>
      </ModalHeader>
      <div className="space-y-4 px-4 sm:px-6 py-4 max-h-[65vh] overflow-y-auto">
        {error && (
          <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-600 rounded-md">{error}</div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 col-span-2">
            <Label>Workflow Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Onboarding — assign default signature" />
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Description (Optional)</Label>
            <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What this workflow does" />
          </div>
          <div className="space-y-2">
            <Label>Event Trigger</Label>
            <Select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} options={eventTypeOptions} />
          </div>
          <div className="space-y-2">
            <Label>Priority</Label>
            <Input type="number" value={form.priority} onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })} min={1} />
            <p className="text-xs text-muted-foreground">Lower numbers run first (1 = highest priority)</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Department Filter (comma-separated)</Label>
            <Input value={form.departmentFilter} onChange={(e) => setForm({ ...form, departmentFilter: e.target.value })} placeholder="Sales, Engineering" />
            <p className="text-xs text-muted-foreground">Must match exact department names in your organization</p>
          </div>
          <div className="space-y-2">
            <Label>Source Filter</Label>
            <Select
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  const current = form.sourceFilter ? form.sourceFilter.split(',').map(s => s.trim()).filter(Boolean) : [];
                  if (!current.includes(e.target.value)) {
                    setForm({ ...form, sourceFilter: [...current, e.target.value].join(', ') });
                  }
                }
              }}
              placeholder="Add source filter"
              options={[
                { value: 'google', label: 'Google Workspace' },
                { value: 'microsoft', label: 'Microsoft 365' },
                { value: 'manual', label: 'Manual' },
                { value: 'api', label: 'API' },
                { value: 'csv', label: 'CSV Import' },
              ]}
            />
            {form.sourceFilter && (
              <div className="flex flex-wrap gap-1">
                {form.sourceFilter.split(',').map(s => s.trim()).filter(Boolean).map((source, idx) => (
                  <span key={idx} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border bg-muted">
                    {source}
                    <button
                      type="button"
                      onClick={() => {
                        const updated = form.sourceFilter.split(',').map(s => s.trim()).filter((s, j) => j !== idx).join(', ');
                        setForm({ ...form, sourceFilter: updated });
                      }}
                      className="hover:text-red-500"
                    >
                      <Trash2 className="h-2.5 w-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label>Active</Label>
          <Switch checked={form.isActive} onCheckedChange={(c) => setForm({ ...form, isActive: c })} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Cascade to Clients (MSP)</Label>
          <Switch checked={form.cascadeToClients} onCheckedChange={(c) => setForm({ ...form, cascadeToClients: c })} />
        </div>

        {/* Action Builder */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Actions</Label>
            <Button variant="outline" size="sm" onClick={addAction}>
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Action
            </Button>
          </div>
          {actions.map((action, i) => (
            <div key={i} className="p-3 rounded-lg border bg-muted/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Action {i + 1}</span>
                {actions.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeAction(i)} className="h-6 w-6 p-0 text-red-500">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
              <Select
                value={action.type}
                onChange={(e) => updateAction(i, 'type', e.target.value)}
                options={actionTypeOptions}
              />
              {/* Template selector for assign/remove template actions */}
              {isTemplateAction(action.type) && (
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Signature Template</label>
                  {loadingTemplates ? (
                    <p className="text-xs text-muted-foreground italic py-1">
                      Loading templates...
                    </p>
                  ) : templates.length > 0 ? (
                    <Select
                      value={action.config.templateId || ''}
                      onChange={(e) => updateAction(i, 'templateId', e.target.value)}
                      options={[
                        { value: '', label: 'Select a template...' },
                        ...templateOptions,
                      ]}
                    />
                  ) : (
                    <p className="text-xs text-muted-foreground italic py-1">
                      No templates found. Create a signature template first.
                    </p>
                  )}
                </div>
              )}
              {/* Other config fields */}
              {getConfigFields(action.type).map(field => (
                <div key={field.key} className="space-y-1">
                  <label className="text-xs text-muted-foreground">{field.label}</label>
                  {field.type === 'select' ? (
                    <>
                      <Select
                        value={
                          field.key === 'to' && action.config[field.key] && !field.options?.some(o => o.value === action.config[field.key])
                            ? '__custom__'
                            : action.config[field.key] || ''
                        }
                        onChange={(e) => {
                          if (e.target.value === '__custom__') {
                            updateAction(i, field.key, '');
                          } else {
                            updateAction(i, field.key, e.target.value);
                          }
                        }}
                        options={field.options || []}
                        placeholder={`Select ${field.label.toLowerCase()}`}
                        className="h-8 text-sm"
                      />
                      {field.key === 'to' && (
                        action.config[field.key] === '' || (action.config[field.key] && !['admin', 'user'].includes(action.config[field.key]))
                      ) && action.config[field.key] !== undefined && (
                        <Input
                          value={action.config[field.key] || ''}
                          onChange={(e) => updateAction(i, field.key, e.target.value)}
                          placeholder="email@example.com"
                          className="h-8 text-sm mt-1"
                        />
                      )}
                    </>
                  ) : (
                    <Input
                      value={action.config[field.key] || ''}
                      onChange={(e) => updateAction(i, field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="h-8 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
