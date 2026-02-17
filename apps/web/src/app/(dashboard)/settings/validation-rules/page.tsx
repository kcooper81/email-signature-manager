'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Select, Switch, Modal, ModalHeader, ModalTitle, ModalFooter, ConfirmDialog, useToast } from '@/components/ui';
import { ShieldCheck, Plus, Loader2, Pencil, Trash2 } from 'lucide-react';
import { FeatureGate } from '@/components/billing/upgrade-prompt';

interface ValidationRule {
  id: string;
  field_name: string;
  validation_type: string;
  validation_value: string | null;
  error_message: string | null;
  is_active: boolean;
  created_at: string;
}

interface RuleForm {
  fieldName: string;
  validationType: string;
  validationValue: string;
  errorMessage: string;
  isActive: boolean;
}

const emptyForm: RuleForm = {
  fieldName: 'email',
  validationType: 'required',
  validationValue: '',
  errorMessage: '',
  isActive: true,
};

const fieldOptions = [
  { value: 'email', label: 'Email' },
  { value: 'first_name', label: 'First Name' },
  { value: 'last_name', label: 'Last Name' },
  { value: 'title', label: 'Job Title' },
  { value: 'department', label: 'Department' },
  { value: 'phone', label: 'Phone' },
  { value: 'linkedin_url', label: 'LinkedIn URL' },
  { value: 'calendly_url', label: 'Calendly URL' },
];

const validationTypeOptions = [
  { value: 'required', label: 'Required' },
  { value: 'regex', label: 'Regex Pattern' },
  { value: 'min_length', label: 'Min Length' },
  { value: 'max_length', label: 'Max Length' },
  { value: 'url', label: 'Valid URL' },
  { value: 'email', label: 'Valid Email' },
];

export default function ValidationRulesPage() {
  const [rules, setRules] = useState<ValidationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<RuleForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    loadRules();
  }, []);

  async function loadRules() {
    setLoading(true);
    try {
      const res = await fetch('/api/profile/validation-rules');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load');
      setRules(data.rules || []);
    } catch (err: any) {
      toast.error('Failed to load rules', err.message);
    }
    setLoading(false);
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(rule: ValidationRule) {
    setEditingId(rule.id);
    setForm({
      fieldName: rule.field_name,
      validationType: rule.validation_type,
      validationValue: rule.validation_value || '',
      errorMessage: rule.error_message || '',
      isActive: rule.is_active,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.fieldName || !form.validationType) {
      toast.error('Validation error', 'Field name and type are required');
      return;
    }
    setSaving(true);
    try {
      const url = editingId
        ? `/api/profile/validation-rules/${editingId}`
        : '/api/profile/validation-rules';
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      toast.success(editingId ? 'Rule updated' : 'Rule created');
      setModalOpen(false);
      await loadRules();
    } catch (err: any) {
      toast.error('Failed to save rule', err.message);
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/profile/validation-rules/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      toast.success('Rule deleted');
      setDeleteId(null);
      await loadRules();
    } catch (err: any) {
      toast.error('Failed to delete rule', err.message);
    }
    setDeleting(false);
  }

  return (
    <FeatureGate feature="selfServiceAdminApproval">
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Data Validation Rules</h2>
          <p className="text-sm text-muted-foreground">Define validation rules for user profile fields</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : rules.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <ShieldCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No validation rules configured yet.</p>
          <p className="text-sm mt-1">Add rules to ensure data quality across your organization.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rules.map(rule => (
            <div key={rule.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div>
                <h3 className="font-medium">{rule.field_name}</h3>
                <p className="text-sm text-muted-foreground">
                  Type: {rule.validation_type}
                  {rule.validation_value && ` · Value: ${rule.validation_value}`}
                </p>
                {rule.error_message && (
                  <p className="text-xs text-muted-foreground mt-1">Error: {rule.error_message}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded ${rule.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {rule.is_active ? 'Active' : 'Inactive'}
                </span>
                <Button variant="outline" size="sm" onClick={() => openEdit(rule)}>
                  <Pencil className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => setDeleteId(rule.id)} className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalHeader onClose={() => setModalOpen(false)}>
          <ModalTitle>{editingId ? 'Edit Rule' : 'Add Validation Rule'}</ModalTitle>
        </ModalHeader>
        <div className="space-y-4 px-4 sm:px-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Field</label>
            <Select
              value={form.fieldName}
              onChange={(e) => setForm({ ...form, fieldName: e.target.value })}
              options={fieldOptions}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Validation Type</label>
            <Select
              value={form.validationType}
              onChange={(e) => setForm({ ...form, validationType: e.target.value })}
              options={validationTypeOptions}
            />
          </div>
          {['regex', 'min_length', 'max_length'].includes(form.validationType) && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Validation Value</label>
              <Input
                type={form.validationType === 'regex' ? 'text' : 'number'}
                value={form.validationValue}
                onChange={(e) => setForm({ ...form, validationValue: e.target.value })}
                placeholder={form.validationType === 'regex' ? '^[A-Z].*' : '5'}
                {...(form.validationType !== 'regex' ? { min: 1 } : {})}
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium">Error Message (Optional)</label>
            <Input
              value={form.errorMessage}
              onChange={(e) => setForm({ ...form, errorMessage: e.target.value })}
              placeholder="This field is required"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Active</label>
            <Switch
              checked={form.isActive}
              onCheckedChange={(checked) => setForm({ ...form, isActive: checked })}
            />
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            {editingId ? 'Update' : 'Create'}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Validation Rule"
        description="Are you sure? This rule will be permanently removed."
        confirmText="Delete"
        variant="destructive"
        loading={deleting}
      />
    </div>
    </FeatureGate>
  );
}
