'use client';

import { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalFooter, Button, Input, Textarea, Select, Label } from '@/components/ui';
import { Loader2 } from 'lucide-react';

interface DisclaimerTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
  description: string | null;
  regulation_type: string | null;
  locale: string | null;
  is_system: boolean;
  is_active: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  template: DisclaimerTemplate | null;
  onSaved: () => void;
  presetData?: { name: string; content: string; category: string; description: string; regulationType: string } | null;
}

const categoryOptions = [
  { value: 'legal', label: 'Legal' },
  { value: 'confidentiality', label: 'Confidentiality' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'custom', label: 'Custom' },
];

const regulationOptions = [
  { value: '', label: 'None' },
  { value: 'gdpr', label: 'GDPR' },
  { value: 'hipaa', label: 'HIPAA' },
  { value: 'sox', label: 'SOX' },
  { value: 'ccpa', label: 'CCPA' },
  { value: 'finra', label: 'FINRA' },
];

const localeOptions = [
  { value: '', label: 'Default' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'pt', label: 'Portuguese' },
];

export function DisclaimerTemplateModal({ open, onClose, template, onSaved, presetData }: Props) {
  const isEdit = !!template;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: template?.name || presetData?.name || '',
    content: template?.content || presetData?.content || '',
    category: template?.category || presetData?.category || 'legal',
    description: template?.description || presetData?.description || '',
    regulationType: template?.regulation_type || presetData?.regulationType || '',
    locale: template?.locale || '',
  });

  // Reset form when modal opens with different data
  const resetKey = template?.id || presetData?.name || 'new';

  async function handleSave() {
    if (!form.name.trim() || !form.content.trim()) {
      setError('Name and content are required');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const url = isEdit ? `/api/disclaimers/templates/${template.id}` : '/api/disclaimers/templates';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
        <ModalTitle>{isEdit ? 'Edit Template' : presetData ? 'Create from Preset' : 'New Disclaimer Template'}</ModalTitle>
      </ModalHeader>
      <div className="space-y-4 px-4 sm:px-6 py-4 max-h-[65vh] overflow-y-auto">
        {error && (
          <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-600 rounded-md">{error}</div>
        )}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Standard Legal Disclaimer" />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} options={categoryOptions} />
        </div>
        <div className="space-y-2">
          <Label>Content</Label>
          <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Disclaimer text..." rows={5} />
        </div>
        <div className="space-y-2">
          <Label>Description (Optional)</Label>
          <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Internal note about this template" />
        </div>
        <div className="space-y-2">
          <Label>Regulation Type</Label>
          <Select value={form.regulationType} onChange={(e) => setForm({ ...form, regulationType: e.target.value })} options={regulationOptions} />
        </div>
        <div className="space-y-2">
          <Label>Locale</Label>
          <Select value={form.locale} onChange={(e) => setForm({ ...form, locale: e.target.value })} options={localeOptions} />
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
