'use client';

import { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalFooter, Button, Input, Switch, Label, Textarea, Select } from '@/components/ui';
import { Loader2, Plus, X } from 'lucide-react';

interface BrandGuideline {
  id: string;
  name: string;
  description: string | null;
  primary_colors: string[] | null;
  secondary_colors: string[] | null;
  accent_colors: string[] | null;
  allowed_fonts: string[] | null;
  locked_colors: boolean;
  locked_fonts: boolean;
  required_disclaimer: boolean;
  required_social_links: string[] | null;
  cascade_to_clients: boolean;
  is_active: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  guideline: BrandGuideline | null;
  onSaved: () => void;
}

function ColorListInput({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState('');
  const [pickerColor, setPickerColor] = useState('#000000');
  function add() {
    const hex = input.trim();
    if (hex && /^#[0-9a-fA-F]{3,8}$/.test(hex) && !value.includes(hex)) {
      onChange([...value, hex]);
      setInput('');
    }
  }
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type="color"
          value={pickerColor}
          onChange={(e) => {
            setPickerColor(e.target.value);
            setInput(e.target.value);
          }}
          className="w-12 h-10 p-1 cursor-pointer"
        />
        <Input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
              setPickerColor(e.target.value);
            }
          }}
          placeholder="#FF5733"
          className="flex-1"
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
        />
        <Button type="button" variant="outline" size="sm" onClick={add}><Plus className="h-3.5 w-3.5" /></Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((c, i) => (
            <span key={i} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border">
              <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: c }} />
              {c}
              <button onClick={() => onChange(value.filter((_, j) => j !== i))} className="ml-0.5 hover:text-red-500"><X className="h-3 w-3" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

const EMAIL_SAFE_FONTS = [
  'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Verdana',
  'Trebuchet MS', 'Tahoma', 'Courier New', 'Lucida Sans',
  'Palatino', 'Garamond', 'Comic Sans MS', 'Impact',
];

function FontSelector({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [selected, setSelected] = useState('');
  const [customMode, setCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const availableFonts = EMAIL_SAFE_FONTS.filter((f) => !value.includes(f));

  function addFromSelect() {
    if (selected && !value.includes(selected)) {
      onChange([...value, selected]);
      setSelected('');
    }
  }

  function addCustom() {
    const val = customInput.trim();
    if (val && !value.includes(val)) {
      onChange([...value, val]);
      setCustomInput('');
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <button
          type="button"
          onClick={() => setCustomMode(!customMode)}
          className="text-xs text-muted-foreground hover:text-foreground underline"
        >
          {customMode ? 'Use preset list' : 'Add custom font'}
        </button>
      </div>
      {customMode ? (
        <div className="flex gap-2">
          <Input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Custom font name"
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustom())}
          />
          <Button type="button" variant="outline" size="sm" onClick={addCustom}><Plus className="h-3.5 w-3.5" /></Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            placeholder="Select a font"
            options={availableFonts.map((f) => ({ value: f, label: f }))}
            className="flex-1"
          />
          <Button type="button" variant="outline" size="sm" onClick={addFromSelect}><Plus className="h-3.5 w-3.5" /></Button>
        </div>
      )}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((v, i) => (
            <span key={i} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border bg-muted">
              <span style={{ fontFamily: v }}>{v}</span>
              <button onClick={() => onChange(value.filter((_, j) => j !== i))} className="ml-0.5 hover:text-red-500"><X className="h-3 w-3" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

const SOCIAL_PLATFORMS = [
  'linkedin', 'twitter', 'facebook', 'instagram', 'youtube',
  'github', 'tiktok', 'website',
];

function SocialLinkSelector({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [selected, setSelected] = useState('');
  const availablePlatforms = SOCIAL_PLATFORMS.filter((p) => !value.includes(p));

  function addFromSelect() {
    if (selected && !value.includes(selected)) {
      onChange([...value, selected]);
      setSelected('');
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          placeholder="Select platform"
          options={availablePlatforms.map((p) => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1) }))}
          className="flex-1"
        />
        <Button type="button" variant="outline" size="sm" onClick={addFromSelect}><Plus className="h-3.5 w-3.5" /></Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((v, i) => (
            <span key={i} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border bg-muted capitalize">
              {v}
              <button onClick={() => onChange(value.filter((_, j) => j !== i))} className="ml-0.5 hover:text-red-500"><X className="h-3 w-3" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function GuidelineModal({ open, onClose, guideline, onSaved }: Props) {
  const isEdit = !!guideline;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: guideline?.name || '',
    description: guideline?.description || '',
    primaryColors: guideline?.primary_colors || [],
    secondaryColors: guideline?.secondary_colors || [],
    accentColors: guideline?.accent_colors || [],
    allowedFonts: guideline?.allowed_fonts || [],
    lockedColors: guideline?.locked_colors ?? false,
    lockedFonts: guideline?.locked_fonts ?? false,
    requiredDisclaimer: guideline?.required_disclaimer ?? false,
    requiredSocialLinks: guideline?.required_social_links || [],
    cascadeToClients: guideline?.cascade_to_clients ?? false,
    isActive: guideline?.is_active ?? true,
  });

  async function handleSave() {
    if (!form.name.trim()) {
      setError('Name is required');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const url = isEdit ? `/api/brand/guidelines/${guideline.id}` : '/api/brand/guidelines';
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
    <Modal open={open} onClose={onClose} className="max-w-2xl">
      <ModalHeader onClose={onClose}>
        <ModalTitle>{isEdit ? 'Edit Brand Guideline' : 'New Brand Guideline'}</ModalTitle>
      </ModalHeader>
      <div className="space-y-4 px-4 sm:px-6 py-4 max-h-[65vh] overflow-y-auto">
        {error && (
          <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-600 rounded-md">{error}</div>
        )}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Primary Brand Guidelines" />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe these brand guidelines" rows={2} />
        </div>

        <ColorListInput label="Primary Colors" value={form.primaryColors} onChange={(v) => setForm({ ...form, primaryColors: v })} />
        <ColorListInput label="Secondary Colors" value={form.secondaryColors} onChange={(v) => setForm({ ...form, secondaryColors: v })} />
        <ColorListInput label="Accent Colors" value={form.accentColors} onChange={(v) => setForm({ ...form, accentColors: v })} />
        <FontSelector label="Allowed Fonts" value={form.allowedFonts} onChange={(v) => setForm({ ...form, allowedFonts: v })} />
        <SocialLinkSelector label="Required Social Links" value={form.requiredSocialLinks} onChange={(v) => setForm({ ...form, requiredSocialLinks: v })} />

        <div className="space-y-3 pt-3 border-t">
          <div className="flex items-center justify-between">
            <Label>Lock Colors</Label>
            <Switch checked={form.lockedColors} onCheckedChange={(c) => setForm({ ...form, lockedColors: c })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Lock Fonts</Label>
            <Switch checked={form.lockedFonts} onCheckedChange={(c) => setForm({ ...form, lockedFonts: c })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Require Disclaimer</Label>
            <Switch checked={form.requiredDisclaimer} onCheckedChange={(c) => setForm({ ...form, requiredDisclaimer: c })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Cascade to Clients (MSP)</Label>
            <Switch checked={form.cascadeToClients} onCheckedChange={(c) => setForm({ ...form, cascadeToClients: c })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Active</Label>
            <Switch checked={form.isActive} onCheckedChange={(c) => setForm({ ...form, isActive: c })} />
          </div>
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
