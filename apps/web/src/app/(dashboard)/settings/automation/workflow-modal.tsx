'use client';

import { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalFooter, Button, Input, Select, Switch, Label } from '@/components/ui';
import { Loader2, Plus, Trash2 } from 'lucide-react';

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
  { value: 'remove_template', label: 'Remove Template' },
  { value: 'deploy_signature', label: 'Deploy Signature' },
  { value: 'send_notification', label: 'Send Notification' },
  { value: 'add_to_group', label: 'Add to Group' },
  { value: 'remove_from_group', label: 'Remove from Group' },
  { value: 'set_field', label: 'Set Field Value' },
  { value: 'webhook', label: 'Call Webhook' },
];

export function WorkflowModal({ open, onClose, workflow, onSaved }: Props) {
  const isEdit = !!workflow;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
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

  function getConfigFields(actionType: string): { key: string; label: string; placeholder: string }[] {
    switch (actionType) {
      case 'assign_template':
      case 'remove_template':
        return [{ key: 'templateId', label: 'Template ID', placeholder: 'Template UUID' }];
      case 'deploy_signature':
        return [{ key: 'method', label: 'Deploy Method', placeholder: 'google_api / microsoft_api' }];
      case 'send_notification':
        return [
          { key: 'to', label: 'Recipient', placeholder: 'admin / user / email@example.com' },
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
          { key: 'method', label: 'HTTP Method', placeholder: 'POST' },
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
            <Input type="number" value={form.priority} onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Department Filter (comma-separated)</Label>
            <Input value={form.departmentFilter} onChange={(e) => setForm({ ...form, departmentFilter: e.target.value })} placeholder="Sales, Engineering" />
          </div>
          <div className="space-y-2">
            <Label>Source Filter (comma-separated)</Label>
            <Input value={form.sourceFilter} onChange={(e) => setForm({ ...form, sourceFilter: e.target.value })} placeholder="google, manual" />
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
              {getConfigFields(action.type).map(field => (
                <div key={field.key} className="space-y-1">
                  <label className="text-xs text-muted-foreground">{field.label}</label>
                  <Input
                    value={action.config[field.key] || ''}
                    onChange={(e) => updateAction(i, field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="h-8 text-sm"
                  />
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
