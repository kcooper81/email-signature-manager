'use client';

import { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalFooter, Button, Input, Select, Switch, Label } from '@/components/ui';
import { Loader2 } from 'lucide-react';

interface DisclaimerTemplate {
  id: string;
  name: string;
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
}

interface Props {
  open: boolean;
  onClose: () => void;
  rule: DisclaimerRule | null;
  templates: DisclaimerTemplate[];
  onSaved: () => void;
}

const conditionOptions = [
  { value: '', label: 'No filter' },
  { value: 'include', label: 'Include' },
  { value: 'exclude', label: 'Exclude' },
];

export function DisclaimerRuleModal({ open, onClose, rule, templates, onSaved }: Props) {
  const isEdit = !!rule;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: rule?.name || '',
    priority: rule?.priority || 10,
    disclaimerTemplateId: rule?.disclaimer_template_id || (templates[0]?.id || ''),
    departmentCondition: rule?.department_condition || '',
    departments: (rule?.departments || []).join(', '),
    regionCondition: rule?.region_condition || '',
    regions: (rule?.regions || []).join(', '),
    recipientCondition: rule?.recipient_condition || '',
    recipientDomains: (rule?.recipient_domains || []).join(', '),
    startDate: rule?.start_date || '',
    endDate: rule?.end_date || '',
    isActive: rule?.is_active ?? true,
    cascadeToClients: rule?.cascade_to_clients ?? false,
  });

  const templateOptions = templates.map(t => ({ value: t.id, label: t.name }));

  async function handleSave() {
    if (!form.name.trim()) {
      setError('Name is required');
      return;
    }
    if (!form.disclaimerTemplateId) {
      setError('Please select a template');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        priority: Number(form.priority),
        departments: form.departments ? form.departments.split(',').map(s => s.trim()).filter(Boolean) : null,
        regions: form.regions ? form.regions.split(',').map(s => s.trim()).filter(Boolean) : null,
        recipientDomains: form.recipientDomains ? form.recipientDomains.split(',').map(s => s.trim()).filter(Boolean) : null,
        departmentCondition: form.departmentCondition || null,
        regionCondition: form.regionCondition || null,
        recipientCondition: form.recipientCondition || null,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
      };
      const url = isEdit ? `/api/disclaimers/rules/${rule.id}` : '/api/disclaimers/rules';
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
    <Modal open={open} onClose={onClose} className="max-w-xl">
      <ModalHeader onClose={onClose}>
        <ModalTitle>{isEdit ? 'Edit Rule' : 'New Disclaimer Rule'}</ModalTitle>
      </ModalHeader>
      <div className="space-y-4 px-4 sm:px-6 py-4 max-h-[65vh] overflow-y-auto">
        {error && (
          <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-600 rounded-md">{error}</div>
        )}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. GDPR EU users rule" />
        </div>
        <div className="space-y-2">
          <Label>Disclaimer Template</Label>
          {templateOptions.length > 0 ? (
            <Select value={form.disclaimerTemplateId} onChange={(e) => setForm({ ...form, disclaimerTemplateId: e.target.value })} options={templateOptions} />
          ) : (
            <p className="text-sm text-muted-foreground">Create a template first before adding rules.</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Priority</Label>
          <Input type="number" value={form.priority} onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Department Filter</Label>
            <Select value={form.departmentCondition} onChange={(e) => setForm({ ...form, departmentCondition: e.target.value })} options={conditionOptions} />
          </div>
          {form.departmentCondition && (
            <div className="space-y-2">
              <Label>Departments</Label>
              <Input value={form.departments} onChange={(e) => setForm({ ...form, departments: e.target.value })} placeholder="Sales, Marketing" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Region Filter</Label>
            <Select value={form.regionCondition} onChange={(e) => setForm({ ...form, regionCondition: e.target.value })} options={conditionOptions} />
          </div>
          {form.regionCondition && (
            <div className="space-y-2">
              <Label>Regions</Label>
              <Input value={form.regions} onChange={(e) => setForm({ ...form, regions: e.target.value })} placeholder="EU, US, APAC" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Recipient Filter</Label>
            <Select value={form.recipientCondition} onChange={(e) => setForm({ ...form, recipientCondition: e.target.value })} options={conditionOptions} />
          </div>
          {form.recipientCondition && (
            <div className="space-y-2">
              <Label>Domains</Label>
              <Input value={form.recipientDomains} onChange={(e) => setForm({ ...form, recipientDomains: e.target.value })} placeholder="example.com, corp.com" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label>Active</Label>
          <Switch checked={form.isActive} onCheckedChange={(checked) => setForm({ ...form, isActive: checked })} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Cascade to Clients (MSP)</Label>
          <Switch checked={form.cascadeToClients} onCheckedChange={(checked) => setForm({ ...form, cascadeToClients: checked })} />
        </div>
      </div>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={saving || templateOptions.length === 0}>
          {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
