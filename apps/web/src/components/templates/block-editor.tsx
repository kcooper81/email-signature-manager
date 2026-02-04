'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
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
} from './types';
import { DYNAMIC_FIELDS, DISCLAIMER_TEMPLATES } from './types';

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
        .from('signatures')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert('Failed to upload image. Make sure the storage bucket exists.');
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('signatures')
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
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs font-medium text-blue-800 mb-1">📐 Recommended Logo Sizes</p>
        <ul className="text-xs text-blue-700 space-y-0.5">
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
            dragOver ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'
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
      <div className="bg-slate-100 rounded p-2 text-center text-sm text-muted-foreground">
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

  const addPlatform = (type: typeof socialPlatforms[number]) => {
    if (content.platforms.some((p) => p.type === type)) return;
    onChange({
      ...content,
      platforms: [...content.platforms, { type, url: '' }],
    });
  };

  const updatePlatformUrl = (type: string, url: string) => {
    onChange({
      ...content,
      platforms: content.platforms.map((p) =>
        p.type === type ? { ...p, url } : p
      ),
    });
  };

  const removePlatform = (type: string) => {
    onChange({
      ...content,
      platforms: content.platforms.filter((p) => p.type !== type),
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
        </div>
      </div>

      {content.platforms.length > 0 && (
        <div className="space-y-3">
          <Label>Platform URLs</Label>
          {content.platforms.map((platform) => (
            <div key={platform.type} className="flex gap-2 items-center">
              <span className="text-sm capitalize w-20">{platform.type}</span>
              <Input
                type="url"
                value={platform.url}
                onChange={(e) => updatePlatformUrl(platform.type, e.target.value)}
                placeholder={`https://${platform.type}.com/...`}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removePlatform(platform.type)}
                className="text-destructive"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}

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

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Custom HTML</Label>
        <textarea
          value={content.html || ''}
          onChange={(e) => onChange({ html: e.target.value })}
          className="w-full min-h-[150px] p-3 border rounded-md text-sm font-mono bg-slate-50"
          placeholder="<table cellpadding='0' cellspacing='0'>&#10;  <tr>&#10;    <td>Your custom HTML here</td>&#10;  </tr>&#10;</table>"
        />
        <p className="text-xs text-muted-foreground">
          Use table-based layouts for best email client compatibility.
        </p>
      </div>

      {warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-sm font-medium text-amber-800 mb-1">Compatibility warnings:</p>
          <ul className="text-xs text-amber-700 space-y-0.5">
            {warnings.map((warning, i) => (
              <li key={i}>• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          <strong>Tips:</strong> Use inline styles, table layouts, and avoid modern CSS. 
          Test in Gmail and Outlook before deploying.
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
  const handleTemplateChange = (template: DisclaimerBlockContent['template']) => {
    const text = template === 'custom' ? content.text : DISCLAIMER_TEMPLATES[template];
    onChange({ ...content, template, text });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Disclaimer Template</Label>
        <select
          value={content.template}
          onChange={(e) => handleTemplateChange(e.target.value as DisclaimerBlockContent['template'])}
          className="w-full h-10 px-3 border rounded-md"
        >
          <option value="confidentiality">Confidentiality</option>
          <option value="legal">Legal / No Contract</option>
          <option value="gdpr">GDPR Privacy</option>
          <option value="hipaa">HIPAA (Healthcare)</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Disclaimer Text</Label>
        <textarea
          value={content.text}
          onChange={(e) => onChange({ ...content, text: e.target.value, template: 'custom' })}
          className="w-full min-h-[100px] p-2 border rounded-md text-sm"
          placeholder="Enter your legal disclaimer..."
        />
      </div>

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

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-xs text-amber-800">
          <strong>Note:</strong> Legal disclaimers should be reviewed by your legal team. 
          These templates are starting points only.
        </p>
      </div>
    </div>
  );
}
