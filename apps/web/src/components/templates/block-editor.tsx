'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Modal, ModalHeader, ModalTitle, ModalDescription } from '@/components/ui';
import { Upload, Plus, Trash2, Link as LinkIcon, Library, Image as ImageIcon } from 'lucide-react';
import type {
  SignatureBlock,
  TextBlockContent,
  ImageBlockContent,
  DividerBlockContent,
  SpacerBlockContent,
  ContactInfoBlockContent,
  ButtonBlockContent,
  SocialBlockContent,
  HtmlBlockContent,
  DisclaimerBlockContent,
  ComplianceBlockContent,
  BannerBlockContent,
} from './types';
import { DYNAMIC_FIELDS, DISCLAIMER_TEMPLATES } from './types';
import { ComplianceBlockEditor } from './compliance-block';
import { AssetPickerModal } from './asset-picker-modal';

interface BlockEditorProps {
  block: SignatureBlock;
  onChange: (content: SignatureBlock['content']) => void;
}

export function BlockEditor({ block, onChange }: BlockEditorProps) {
  switch (block.type) {
    case 'text':
      return <TextEditor content={block.content as TextBlockContent} onChange={onChange} />;
    case 'image':
      return <ImageEditor content={block.content as ImageBlockContent} onChange={onChange} />;
    case 'divider':
      return <DividerEditor content={block.content as DividerBlockContent} onChange={onChange} />;
    case 'spacer':
      return <SpacerEditor content={block.content as SpacerBlockContent} onChange={onChange} />;
    case 'contact-info':
      return <ContactInfoEditor content={block.content as ContactInfoBlockContent} onChange={onChange} />;
    case 'button':
      return <ButtonEditor content={block.content as ButtonBlockContent} onChange={onChange} />;
    case 'social':
      return <SocialEditor content={block.content as SocialBlockContent} onChange={onChange} />;
    case 'html':
      return <HtmlEditor content={block.content as HtmlBlockContent} onChange={onChange} />;
    case 'disclaimer':
      return <DisclaimerEditor content={block.content as DisclaimerBlockContent} onChange={onChange} />;
    case 'compliance':
      return <ComplianceBlockEditor content={block.content as ComplianceBlockContent} onChange={onChange} />;
    case 'banner':
      return <BannerEditor content={block.content as BannerBlockContent} onChange={onChange} />;
    default:
      return <div className="text-muted-foreground">No editor for this block type</div>;
  }
}

function TextEditor({
  content,
  onChange,
}: {
  content: TextBlockContent;
  onChange: (content: TextBlockContent) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Text Content</Label>
        <textarea
          value={content.text}
          onChange={(e) => onChange({ ...content, text: e.target.value })}
          className="w-full min-h-[80px] p-2 border rounded-md text-sm"
          placeholder="Enter text..."
        />
        <div className="flex flex-wrap gap-1">
          {DYNAMIC_FIELDS.slice(0, 6).map((field) => (
            <Button
              key={field.key}
              variant="outline"
              size="sm"
              className="text-xs h-6"
              onClick={() => onChange({ ...content, text: content.text + ' ' + field.key })}
            >
              {field.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Font Size</Label>
          <Input
            type="number"
            value={content.fontSize}
            onChange={(e) => onChange({ ...content, fontSize: parseInt(e.target.value) || 14 })}
            min={10}
            max={32}
          />
        </div>
        <div className="space-y-2">
          <Label>Font Weight</Label>
          <select
            value={content.fontWeight}
            onChange={(e) => onChange({ ...content, fontWeight: e.target.value as 'normal' | 'bold' })}
            className="w-full h-10 px-3 border rounded-md"
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Text Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={content.color}
            onChange={(e) => onChange({ ...content, color: e.target.value })}
            className="w-12 h-10 p-1"
          />
          <Input
            type="text"
            value={content.color}
            onChange={(e) => onChange({ ...content, color: e.target.value })}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}

function ImageEditor({
  content,
  onChange,
}: {
  content: ImageBlockContent;
  onChange: (content: ImageBlockContent) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showAssetPicker, setShowAssetPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be less than 2MB');
      return;
    }

    setUploading(true);
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('signature-assets')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert('Failed to upload image. Make sure the storage bucket exists.');
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('signature-assets')
        .getPublicUrl(filePath);

      onChange({ ...content, src: publicUrl });
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div className="space-y-4">
      {/* Recommended sizes info */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
        <p className="text-xs font-medium text-blue-600 mb-1">📐 Recommended Logo Sizes</p>
        <ul className="text-xs text-blue-600 space-y-0.5">
          <li>• <strong>Width:</strong> 100-200px (max 300px)</li>
          <li>• <strong>Height:</strong> 40-80px for best fit</li>
          <li>• <strong>Format:</strong> PNG (transparent) or JPG</li>
          <li>• <strong>File size:</strong> Under 100KB ideal</li>
        </ul>
      </div>

      {/* Upload area */}
      <div className="space-y-2">
        <Label>Upload Image</Label>
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/40'
          } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          {content.src ? (
            <div className="space-y-2">
              <img
                src={content.src}
                alt={content.alt}
                className="max-h-20 mx-auto object-contain"
              />
              <p className="text-xs text-muted-foreground">
                Click or drag to replace
              </p>
            </div>
          ) : (
            <div className="py-4">
              {uploading ? (
                <p className="text-sm text-muted-foreground">Uploading...</p>
              ) : (
                <>
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Drop image here or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF, WebP • Max 2MB</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Asset Library */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => setShowAssetPicker(true)}
      >
        <ImageIcon className="mr-2 h-4 w-4" />
        Choose from Asset Library
      </Button>
      <AssetPickerModal
        open={showAssetPicker}
        onClose={() => setShowAssetPicker(false)}
        category="logo"
        onSelect={(asset) => {
          onChange({ ...content, src: asset.publicUrl, alt: asset.displayName || content.alt });
        }}
      />

      {/* Or use URL */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or use URL</span>
        </div>
      </div>

      <div className="space-y-2">
        <Input
          type="url"
          value={content.src}
          onChange={(e) => onChange({ ...content, src: e.target.value })}
          placeholder="https://example.com/logo.png"
        />
      </div>

      <div className="space-y-2">
        <Label>Alt Text</Label>
        <Input
          type="text"
          value={content.alt}
          onChange={(e) => onChange({ ...content, alt: e.target.value })}
          placeholder="Company Logo"
        />
      </div>

      {/* Quick size presets */}
      <div className="space-y-2">
        <Label>Size Preset</Label>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Small', width: 80, height: 30 },
            { label: 'Medium', width: 150, height: 50 },
            { label: 'Large', width: 200, height: 70 },
            { label: 'Wide', width: 250, height: 50 },
          ].map((preset) => (
            <Button
              key={preset.label}
              variant="outline"
              size="sm"
              className={`text-xs ${
                content.width === preset.width ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => onChange({ ...content, width: preset.width, height: preset.height })}
            >
              {preset.label}
              <span className="text-muted-foreground ml-1">
                {preset.width}×{preset.height}
              </span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Width (px)</Label>
          <Input
            type="number"
            value={content.width}
            onChange={(e) => onChange({ ...content, width: parseInt(e.target.value) || 150 })}
            min={20}
            max={300}
          />
        </div>
        <div className="space-y-2">
          <Label>Height (px)</Label>
          <Input
            type="number"
            value={content.height || ''}
            onChange={(e) => onChange({ ...content, height: parseInt(e.target.value) || undefined })}
            placeholder="Auto"
            min={20}
            max={150}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        💡 Tip: Keep logos under 300px wide for best email compatibility
      </p>

      <div className="space-y-2">
        <Label>Link URL (optional)</Label>
        <Input
          type="url"
          value={content.link || ''}
          onChange={(e) => onChange({ ...content, link: e.target.value })}
          placeholder="https://company.com"
        />
      </div>
    </div>
  );
}

function DividerEditor({
  content,
  onChange,
}: {
  content: DividerBlockContent;
  onChange: (content: DividerBlockContent) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Line Style</Label>
        <select
          value={content.style}
          onChange={(e) => onChange({ ...content, style: e.target.value as 'solid' | 'dashed' | 'dotted' })}
          className="w-full h-10 px-3 border rounded-md"
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Width (%)</Label>
        <Input
          type="number"
          value={content.width}
          onChange={(e) => onChange({ ...content, width: parseInt(e.target.value) || 100 })}
          min={10}
          max={100}
        />
      </div>

      <div className="space-y-2">
        <Label>Thickness (px)</Label>
        <Input
          type="number"
          value={content.thickness}
          onChange={(e) => onChange({ ...content, thickness: parseInt(e.target.value) || 1 })}
          min={1}
          max={10}
        />
      </div>

      <div className="space-y-2">
        <Label>Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={content.color}
            onChange={(e) => onChange({ ...content, color: e.target.value })}
            className="w-12 h-10 p-1"
          />
          <Input
            type="text"
            value={content.color}
            onChange={(e) => onChange({ ...content, color: e.target.value })}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}

function SpacerEditor({
  content,
  onChange,
}: {
  content: SpacerBlockContent;
  onChange: (content: SpacerBlockContent) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Height (px)</Label>
        <Input
          type="number"
          value={content.height}
          onChange={(e) => onChange({ ...content, height: parseInt(e.target.value) || 16 })}
          min={4}
          max={100}
        />
      </div>
      <div className="bg-muted rounded p-2 text-center text-sm text-muted-foreground">
        Preview: {content.height}px spacing
      </div>
    </div>
  );
}

function ContactInfoEditor({
  content,
  onChange,
}: {
  content: ContactInfoBlockContent;
  onChange: (content: ContactInfoBlockContent) => void;
}) {
  const iconOptions = [
    { value: 'none', label: 'None' },
    { value: 'mail', label: 'Mail' },
    { value: 'phone', label: 'Phone' },
    { value: 'globe', label: 'Globe' },
    { value: 'map-pin', label: 'Location' },
    { value: 'calendar', label: 'Calendar' },
    { value: 'briefcase', label: 'Briefcase' },
    { value: 'user', label: 'User' },
    { value: 'building', label: 'Building' },
  ];

  const addCustomField = () => {
    const customFields = content.customFields || [];
    onChange({
      ...content,
      customFields: [...customFields, { label: '', value: '', icon: 'none' }],
    });
  };

  const updateCustomField = (index: number, updates: Partial<NonNullable<ContactInfoBlockContent['customFields']>[0]>) => {
    const customFields = content.customFields || [];
    onChange({
      ...content,
      customFields: customFields.map((f, i) => i === index ? { ...f, ...updates } : f),
    });
  };

  const removeCustomField = (index: number) => {
    const customFields = content.customFields || [];
    onChange({
      ...content,
      customFields: customFields.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="text"
          value={content.email || ''}
          onChange={(e) => onChange({ ...content, email: e.target.value })}
          placeholder="{{email}}"
        />
      </div>

      <div className="space-y-2">
        <Label>Phone</Label>
        <Input
          type="text"
          value={content.phone || ''}
          onChange={(e) => onChange({ ...content, phone: e.target.value })}
          placeholder="{{phone}}"
        />
      </div>

      <div className="space-y-2">
        <Label>Website</Label>
        <Input
          type="text"
          value={content.website || ''}
          onChange={(e) => onChange({ ...content, website: e.target.value })}
          placeholder="{{website}}"
        />
      </div>

      <div className="space-y-2">
        <Label>Address</Label>
        <Input
          type="text"
          value={content.address || ''}
          onChange={(e) => onChange({ ...content, address: e.target.value })}
          placeholder="{{address}}"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showIcons"
          checked={content.showIcons ?? true}
          onChange={(e) => onChange({ ...content, showIcons: e.target.checked })}
          className="h-4 w-4"
        />
        <Label htmlFor="showIcons">Show icons</Label>
      </div>

      {/* Custom Fields Section */}
      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <Label>Custom Fields</Label>
          <Button variant="outline" size="sm" onClick={addCustomField}>
            <Plus className="h-3 w-3 mr-1" />
            Add Field
          </Button>
        </div>

        {(content.customFields || []).map((field, index) => (
          <div key={index} className="p-3 border rounded-lg bg-muted space-y-2">
            <div className="flex gap-2">
              <Input
                type="text"
                value={field.label}
                onChange={(e) => updateCustomField(index, { label: e.target.value })}
                placeholder="Label (e.g., Fax, Extension)"
                className="w-1/3"
              />
              <Input
                type="text"
                value={field.value}
                onChange={(e) => updateCustomField(index, { value: e.target.value })}
                placeholder="Value or {{variable}}"
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCustomField(index)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 items-center">
              <Label className="text-xs w-12">Icon:</Label>
              <select
                value={field.icon || 'none'}
                onChange={(e) => updateCustomField(index, { icon: e.target.value as any })}
                className="h-8 px-2 text-sm border rounded-md"
              >
                {iconOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className="flex-1" />
              <div className="flex flex-wrap gap-1">
                {DYNAMIC_FIELDS.slice(0, 4).map((df) => (
                  <Button
                    key={df.key}
                    variant="ghost"
                    size="sm"
                    className="text-xs h-6 px-2"
                    onClick={() => updateCustomField(index, { value: field.value + df.key })}
                  >
                    {df.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {(content.customFields?.length || 0) === 0 && (
          <p className="text-xs text-muted-foreground text-center py-2">
            Add custom fields like Fax, Extension, Booking Link, etc.
          </p>
        )}
      </div>
    </div>
  );
}

function ButtonEditor({
  content,
  onChange,
}: {
  content: ButtonBlockContent;
  onChange: (content: ButtonBlockContent) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Button Text</Label>
        <Input
          type="text"
          value={content.text}
          onChange={(e) => onChange({ ...content, text: e.target.value })}
          placeholder="Click Here"
        />
      </div>

      <div className="space-y-2">
        <Label>Link URL</Label>
        <Input
          type="url"
          value={content.url}
          onChange={(e) => onChange({ ...content, url: e.target.value })}
          placeholder="https://example.com"
        />
      </div>

      <div className="space-y-2">
        <Label>Background Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={content.backgroundColor}
            onChange={(e) => onChange({ ...content, backgroundColor: e.target.value })}
            className="w-12 h-10 p-1"
          />
          <Input
            type="text"
            value={content.backgroundColor}
            onChange={(e) => onChange({ ...content, backgroundColor: e.target.value })}
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Text Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={content.textColor}
            onChange={(e) => onChange({ ...content, textColor: e.target.value })}
            className="w-12 h-10 p-1"
          />
          <Input
            type="text"
            value={content.textColor}
            onChange={(e) => onChange({ ...content, textColor: e.target.value })}
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Border Radius (px)</Label>
        <Input
          type="number"
          value={content.borderRadius}
          onChange={(e) => onChange({ ...content, borderRadius: parseInt(e.target.value) || 4 })}
          min={0}
          max={50}
        />
      </div>
    </div>
  );
}

function SocialEditor({
  content,
  onChange,
}: {
  content: SocialBlockContent;
  onChange: (content: SocialBlockContent) => void;
}) {
  const socialPlatforms = ['linkedin', 'twitter', 'facebook', 'instagram', 'youtube', 'github'] as const;
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customLabel, setCustomLabel] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customIcon, setCustomIcon] = useState('');

  const addPlatform = (type: typeof socialPlatforms[number]) => {
    if (content.platforms.some((p) => p.type === type)) return;
    onChange({
      ...content,
      platforms: [...content.platforms, { type, url: '' }],
    });
  };

  const addCustomPlatform = () => {
    if (!customLabel.trim()) return;
    onChange({
      ...content,
      platforms: [...content.platforms, { 
        type: 'custom', 
        url: customUrl, 
        label: customLabel,
        icon: customIcon || undefined,
      }],
    });
    setCustomLabel('');
    setCustomUrl('');
    setCustomIcon('');
    setShowCustomForm(false);
  };

  const updatePlatform = (index: number, updates: Partial<SocialBlockContent['platforms'][0]>) => {
    onChange({
      ...content,
      platforms: content.platforms.map((p, i) =>
        i === index ? { ...p, ...updates } : p
      ),
    });
  };

  const removePlatform = (index: number) => {
    onChange({
      ...content,
      platforms: content.platforms.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Add Platform</Label>
        <div className="flex flex-wrap gap-1">
          {socialPlatforms.map((platform) => (
            <Button
              key={platform}
              variant="outline"
              size="sm"
              className="text-xs capitalize"
              onClick={() => addPlatform(platform)}
              disabled={content.platforms.some((p) => p.type === platform)}
            >
              {platform}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => setShowCustomForm(!showCustomForm)}
          >
            <Plus className="h-3 w-3 mr-1" />
            Custom
          </Button>
        </div>
      </div>

      {showCustomForm && (
        <div className="p-3 border rounded-lg bg-muted space-y-3">
          <Label className="text-sm font-medium">Add Custom Social Link</Label>
          <div className="space-y-2">
            <Input
              type="text"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              placeholder="Platform name (e.g., TikTok, Threads)"
            />
            <Input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://..."
            />
            <Input
              type="url"
              value={customIcon}
              onChange={(e) => setCustomIcon(e.target.value)}
              placeholder="Icon URL (optional)"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={addCustomPlatform} disabled={!customLabel.trim()}>
              Add
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowCustomForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Display Mode</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={content.displayMode === 'icons' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange({ ...content, displayMode: 'icons' })}
            className="flex-1"
          >
            Icons
          </Button>
          <Button
            type="button"
            variant={content.displayMode === 'text' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange({ ...content, displayMode: 'text' })}
            className="flex-1"
          >
            Text
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {content.displayMode === 'icons' 
            ? 'Social links will display as icons' 
            : 'Social links will display as text names'}
        </p>
      </div>

      {content.platforms.length > 0 && (
        <div className="space-y-3">
          <Label>Platform URLs</Label>
          {content.platforms.map((platform, index) => (
            <div key={index} className="space-y-2 p-2 border rounded-lg">
              <div className="flex gap-2 items-center">
                <span className="text-sm capitalize w-20 font-medium">
                  {platform.type === 'custom' ? platform.label : platform.type}
                </span>
                <Input
                  type="url"
                  value={platform.url}
                  onChange={(e) => updatePlatform(index, { url: e.target.value })}
                  placeholder={platform.type === 'custom' ? 'https://...' : `https://${platform.type}.com/...`}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePlatform(index)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {platform.type === 'custom' && (
                <div className="flex gap-2 items-center pl-20">
                  <Input
                    type="text"
                    value={platform.label || ''}
                    onChange={(e) => updatePlatform(index, { label: e.target.value })}
                    placeholder="Label"
                    className="w-32"
                  />
                  <Input
                    type="url"
                    value={platform.icon || ''}
                    onChange={(e) => updatePlatform(index, { icon: e.target.value })}
                    placeholder="Icon URL (optional)"
                    className="flex-1"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {content.displayMode === 'icons' && (
        <>
          <div className="space-y-2">
            <Label>Icon Size (px)</Label>
            <Input
              type="number"
              value={content.iconSize}
              onChange={(e) => onChange({ ...content, iconSize: parseInt(e.target.value) || 24 })}
              min={16}
              max={48}
            />
          </div>
          <div className="space-y-2">
            <Label>Icon Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={content.iconColor || '#666666'}
                onChange={(e) => onChange({ ...content, iconColor: e.target.value })}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={content.iconColor || '#666666'}
                onChange={(e) => onChange({ ...content, iconColor: e.target.value })}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Color for text links and fallback icons. Standard platform icons use their brand colors.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// HTML Block Editor with sanitization warnings
function HtmlEditor({
  content,
  onChange,
}: {
  content: HtmlBlockContent;
  onChange: (content: HtmlBlockContent) => void;
}) {
  // List of potentially unsafe HTML patterns
  const getWarnings = (html: string): string[] => {
    const warnings: string[] = [];
    
    if (/<script/i.test(html)) {
      warnings.push('Scripts will be removed - not supported in email');
    }
    if (/<style/i.test(html)) {
      warnings.push('Style tags may not work - use inline styles instead');
    }
    if (/position\s*:/i.test(html)) {
      warnings.push('CSS position property not supported in most email clients');
    }
    if (/display\s*:\s*flex/i.test(html)) {
      warnings.push('Flexbox not supported in email clients');
    }
    if (/display\s*:\s*grid/i.test(html)) {
      warnings.push('CSS Grid not supported in email clients');
    }
    if (/<form/i.test(html)) {
      warnings.push('Forms not supported in email signatures');
    }
    if (/javascript:/i.test(html)) {
      warnings.push('JavaScript URLs will be removed');
    }
    if (/<iframe/i.test(html)) {
      warnings.push('iframes not supported in email');
    }
    
    return warnings;
  };

  const warnings = getWarnings(content.html || '');

  const insertVariable = (variable: string) => {
    onChange({ html: (content.html || '') + variable });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Custom HTML</Label>
        <textarea
          value={content.html || ''}
          onChange={(e) => onChange({ html: e.target.value })}
          className="w-full min-h-[150px] p-3 border rounded-md text-sm font-mono bg-muted"
          placeholder="<table cellpadding='0' cellspacing='0'>&#10;  <tr>&#10;    <td>Your custom HTML here</td>&#10;  </tr>&#10;</table>"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Insert Dynamic Field</Label>
        <div className="flex flex-wrap gap-1">
          {DYNAMIC_FIELDS.map((field) => (
            <Button
              key={field.key}
              variant="outline"
              size="sm"
              className="text-xs h-6"
              onClick={() => insertVariable(field.key)}
            >
              {field.label}
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Use table-based layouts for best email client compatibility.
        </p>
      </div>

      {warnings.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
          <p className="text-sm font-medium text-amber-600 mb-1">Compatibility warnings:</p>
          <ul className="text-xs text-amber-600 space-y-0.5">
            {warnings.map((warning, i) => (
              <li key={i}>• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
        <p className="text-xs text-blue-600">
          <strong>Tips:</strong> Use inline styles, table layouts, and avoid modern CSS.
          Test in Gmail and Outlook before deploying.
        </p>
      </div>
    </div>
  );
}

function BannerEditor({
  content,
  onChange,
}: {
  content: BannerBlockContent;
  onChange: (content: BannerBlockContent) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [showAssetPicker, setShowAssetPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `banner-${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('signature-assets')
        .upload(fileName, file, { upsert: true });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('signature-assets')
        .getPublicUrl(fileName);

      onChange({ ...content, src: urlData.publicUrl });
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Banner Image */}
      <div className="space-y-2">
        <Label>Banner Image</Label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={content.src}
            onChange={(e) => onChange({ ...content, src: e.target.value })}
            placeholder="https://example.com/banner.png"
            className="flex-1"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : <Upload className="h-4 w-4" />}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAssetPicker(true)}
            title="Asset Library"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
        <AssetPickerModal
          open={showAssetPicker}
          onClose={() => setShowAssetPicker(false)}
          category="banner"
          onSelect={(asset) => {
            onChange({ ...content, src: asset.publicUrl, alt: asset.displayName || content.alt });
          }}
        />
        {content.src && (
          <div className="border rounded-lg p-2 bg-muted">
            <img src={content.src} alt={content.alt || 'Banner preview'} className="max-h-32 mx-auto" />
          </div>
        )}
        {/* Scheduling status badge */}
        {(content.startDate || content.endDate) && (() => {
          const today = new Date().toISOString().split('T')[0];
          if (content.startDate && today < content.startDate) {
            return (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Scheduled: starts {content.startDate}
              </div>
            );
          }
          if (content.endDate && today > content.endDate) {
            return (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/15 text-red-600">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Expired: ended {content.endDate}
              </div>
            );
          }
          return (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Currently active
            </div>
          );
        })()}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Alt Text</Label>
          <Input
            type="text"
            value={content.alt}
            onChange={(e) => onChange({ ...content, alt: e.target.value })}
            placeholder="Banner description"
          />
        </div>
        <div className="space-y-2">
          <Label>Width (px)</Label>
          <Input
            type="number"
            value={content.width}
            onChange={(e) => onChange({ ...content, width: parseInt(e.target.value) || 600 })}
            min={100}
            max={800}
          />
        </div>
      </div>

      {/* Link & Click Tracking */}
      <div className="space-y-2">
        <Label>Click-through URL</Label>
        <Input
          type="url"
          value={content.link || ''}
          onChange={(e) => onChange({ ...content, link: e.target.value })}
          placeholder="https://example.com/landing-page"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="trackClicks"
          checked={content.trackClicks ?? true}
          onChange={(e) => onChange({ ...content, trackClicks: e.target.checked })}
          className="h-4 w-4 rounded border-input"
        />
        <Label htmlFor="trackClicks" className="font-normal">Enable click tracking</Label>
      </div>

      {/* Campaign Scheduling */}
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-sm mb-3">Campaign Scheduling (Optional)</h4>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Campaign Name</Label>
            <Input
              type="text"
              value={content.campaignName || ''}
              onChange={(e) => onChange({ ...content, campaignName: e.target.value })}
              placeholder="e.g., Q1 Promo, Holiday Sale"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={content.startDate || ''}
                onChange={(e) => onChange({ ...content, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={content.endDate || ''}
                onChange={(e) => onChange({ ...content, endDate: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* UTM Parameters */}
      {content.trackClicks && (
        <div className="border-t pt-4 mt-4">
          <h4 className="font-medium text-sm mb-3">UTM Parameters (Optional)</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">Source</Label>
              <Input
                type="text"
                value={content.utmSource || ''}
                onChange={(e) => onChange({ ...content, utmSource: e.target.value })}
                placeholder="email"
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Medium</Label>
              <Input
                type="text"
                value={content.utmMedium || ''}
                onChange={(e) => onChange({ ...content, utmMedium: e.target.value })}
                placeholder="signature"
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Campaign</Label>
              <Input
                type="text"
                value={content.utmCampaign || ''}
                onChange={(e) => onChange({ ...content, utmCampaign: e.target.value })}
                placeholder="q1-promo"
                className="text-sm"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
        <p className="text-xs text-blue-600">
          <strong>Tip:</strong> Banners with scheduled dates will only appear during the campaign period.
          Click tracking helps measure ROI.
        </p>
      </div>
    </div>
  );
}

function DisclaimerEditor({
  content,
  onChange,
}: {
  content: DisclaimerBlockContent;
  onChange: (content: DisclaimerBlockContent) => void;
}) {
  const [showLibrary, setShowLibrary] = useState(false);
  const [libraryDisclaimers, setLibraryDisclaimers] = useState<{id: string; name: string; content: string; category: string}[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [disclaimerSearch, setDisclaimerSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const loadLibraryDisclaimers = async () => {
    setLoadingLibrary(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('disclaimer_templates')
        .select('id, name, content, category')
        .eq('is_system', true)
        .order('category', { ascending: true });
      setLibraryDisclaimers(data || []);
    } catch (err) {
      console.error('Failed to load disclaimers:', err);
    } finally {
      setLoadingLibrary(false);
    }
  };

  const handleOpenLibrary = () => {
    setShowLibrary(true);
    loadLibraryDisclaimers();
  };

  const handleSelectFromLibrary = (disclaimerContent: string) => {
    onChange({ ...content, text: disclaimerContent, template: 'custom' });
    setShowLibrary(false);
  };

  const handleTemplateChange = (template: DisclaimerBlockContent['template']) => {
    const text = template === 'custom' ? content.text : DISCLAIMER_TEMPLATES[template];
    onChange({ ...content, template, text });
  };

  return (
    <div className="space-y-4">
      {/* Browse Library Button */}
      <Button
        type="button"
        variant="outline"
        onClick={handleOpenLibrary}
        className="w-full"
      >
        <Library className="mr-2 h-4 w-4" />
        Browse Disclaimer Library (15+ templates)
      </Button>

      <div className="space-y-2">
        <Label>Disclaimer Text</Label>
        <textarea
          value={content.text}
          onChange={(e) => onChange({ ...content, text: e.target.value, template: 'custom' })}
          className="w-full min-h-[100px] p-2 border rounded-md text-sm"
          placeholder="Enter your legal disclaimer..."
        />
      </div>

      {/* Library Modal */}
      <Modal open={showLibrary} onClose={() => { setShowLibrary(false); setDisclaimerSearch(''); setSelectedCategory('all'); }}>
        <ModalHeader>
          <ModalTitle>Disclaimer Library</ModalTitle>
          <ModalDescription>
            Choose from 15+ pre-written legal disclaimers
          </ModalDescription>
        </ModalHeader>
        <div className="py-4 space-y-3">
          {/* Search and Filter */}
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search disclaimers..."
              value={disclaimerSearch}
              onChange={(e) => setDisclaimerSearch(e.target.value)}
              className="flex-1"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm bg-background"
            >
              <option value="all">All Categories</option>
              <option value="legal">Legal</option>
              <option value="gdpr">GDPR</option>
              <option value="hipaa">HIPAA</option>
              <option value="confidentiality">Confidentiality</option>
              <option value="finance">Finance</option>
              <option value="real_estate">Real Estate</option>
            </select>
          </div>

          {/* Disclaimer List */}
          <div className="max-h-[350px] overflow-y-auto space-y-2">
            {loadingLibrary ? (
              <p className="text-center text-muted-foreground py-4">Loading...</p>
            ) : libraryDisclaimers.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No disclaimers found. Run the database migration first.
              </p>
            ) : (
              libraryDisclaimers
                .filter((d) => {
                  const matchesSearch = !disclaimerSearch || 
                    d.name.toLowerCase().includes(disclaimerSearch.toLowerCase()) ||
                    d.content.toLowerCase().includes(disclaimerSearch.toLowerCase());
                  const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
                  return matchesSearch && matchesCategory;
                })
                .map((d) => (
                  <div
                    key={d.id}
                    className="p-3 border rounded-lg hover:bg-muted cursor-pointer"
                    onClick={() => handleSelectFromLibrary(d.content)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{d.name}</span>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded capitalize">{d.category}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{d.content}</p>
                  </div>
                ))
            )}
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Font Size</Label>
          <Input
            type="number"
            value={content.fontSize}
            onChange={(e) => onChange({ ...content, fontSize: parseInt(e.target.value) || 10 })}
            min={8}
            max={14}
          />
        </div>
        <div className="space-y-2">
          <Label>Text Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={content.color}
              onChange={(e) => onChange({ ...content, color: e.target.value })}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={content.color}
              onChange={(e) => onChange({ ...content, color: e.target.value })}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
        <p className="text-xs text-amber-600">
          <strong>Note:</strong> Legal disclaimers should be reviewed by your legal team.
          These templates are starting points only.
        </p>
      </div>
    </div>
  );
}
