'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Upload } from 'lucide-react';
import type { SignatureBlock } from './types';

interface QuickFormProps {
  onGenerate: (blocks: SignatureBlock[]) => void;
  onUpdate?: (blocks: SignatureBlock[]) => void;
  initialBlocks?: SignatureBlock[];
}

// Helper function to extract form data from blocks
function blocksToFormData(blocks: SignatureBlock[]) {
  const formData = {
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    photoUrl: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: '',
    disclaimer: '',
  };

  const includeFlags = {
    includePhoto: false,
    includeSocial: false,
    includeDisclaimer: false,
  };

  blocks.forEach((block) => {
    switch (block.type) {
      case 'image':
        const imageContent = block.content as any;
        formData.photoUrl = imageContent.src || '';
        includeFlags.includePhoto = true;
        break;

      case 'text':
        const textContent = block.content as any;
        const text = textContent.text || '';
        
        // Try to identify which field this is based on styling
        if (textContent.fontWeight === 'bold' && textContent.fontSize >= 16) {
          // Likely the name
          if (!formData.name) formData.name = text;
        } else if (textContent.fontWeight === 'bold' && textContent.color?.includes('7c3aed')) {
          // Likely company (purple color)
          formData.company = text;
        } else if (textContent.fontSize <= 14 && !formData.title) {
          // Likely title
          formData.title = text;
        }
        break;

      case 'contact-info':
        const contactContent = block.content as any;
        formData.email = contactContent.email || '';
        formData.phone = contactContent.phone || '';
        formData.website = contactContent.website || '';
        formData.address = contactContent.address || '';
        break;

      case 'social':
        const socialContent = block.content as any;
        includeFlags.includeSocial = socialContent.platforms?.length > 0;
        socialContent.platforms?.forEach((platform: any) => {
          if (platform.type === 'linkedin') formData.linkedin = platform.url;
          if (platform.type === 'twitter') formData.twitter = platform.url;
          if (platform.type === 'facebook') formData.facebook = platform.url;
          if (platform.type === 'instagram') formData.instagram = platform.url;
        });
        break;

      case 'disclaimer':
        const disclaimerContent = block.content as any;
        formData.disclaimer = disclaimerContent.text || '';
        includeFlags.includeDisclaimer = true;
        break;
    }
  });

  return { formData, includeFlags };
}

export function QuickForm({ onGenerate, onUpdate, initialBlocks = [] }: QuickFormProps) {
  // Store block IDs to preserve them across updates
  const blockIdsRef = useRef<Map<string, string>>(new Map());
  
  // Initialize form data from blocks if provided
  const initialData = initialBlocks.length > 0 ? blocksToFormData(initialBlocks) : null;
  
  const [formData, setFormData] = useState(initialData?.formData || {
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    photoUrl: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: '',
    disclaimer: '',
  });

  const [includePhoto, setIncludePhoto] = useState(initialData?.includeFlags.includePhoto || false);
  const [includeSocial, setIncludeSocial] = useState(initialData?.includeFlags.includeSocial || false);
  const [includeDisclaimer, setIncludeDisclaimer] = useState(initialData?.includeFlags.includeDisclaimer || false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to get or create block ID
  const getBlockId = useCallback((key: string, existingBlocks?: SignatureBlock[]) => {
    // Try to find existing block ID from initialBlocks
    if (existingBlocks) {
      const existing = existingBlocks.find(b => {
        if (key === 'photo' && b.type === 'image') return true;
        if (key === 'name' && b.type === 'text' && (b.content as any).fontSize >= 16) return true;
        if (key === 'title' && b.type === 'text' && (b.content as any).fontSize <= 14 && (b.content as any).fontWeight === 'normal') return true;
        if (key === 'company' && b.type === 'text' && (b.content as any).color?.includes('7c3aed')) return true;
        if (key === 'contact' && b.type === 'contact-info') return true;
        if (key === 'social' && b.type === 'social') return true;
        if (key === 'disclaimer' && b.type === 'disclaimer') return true;
        return false;
      });
      if (existing) return existing.id;
    }
    
    // Check if we've created an ID for this key before
    if (blockIdsRef.current.has(key)) {
      return blockIdsRef.current.get(key)!;
    }
    
    // Create new ID and store it
    const newId = crypto.randomUUID();
    blockIdsRef.current.set(key, newId);
    return newId;
  }, []);

  // Memoize block generation function
  const generateBlocksFromFormData = useCallback((): SignatureBlock[] => {
    const blocks: SignatureBlock[] = [];

    // Photo block
    if (includePhoto && formData.photoUrl) {
      blocks.push({
        id: getBlockId('photo', initialBlocks),
        type: 'image',
        content: {
          src: formData.photoUrl,
          alt: formData.name || 'Profile photo',
          width: 80,
          height: 80,
        },
      });
    }

    // Name block
    if (formData.name) {
      blocks.push({
        id: getBlockId('name', initialBlocks),
        type: 'text',
        content: {
          text: formData.name,
          fontSize: 18,
          fontWeight: 'bold' as const,
          color: '#1a1a1a',
        },
      });
    }

    // Title block
    if (formData.title) {
      blocks.push({
        id: getBlockId('title', initialBlocks),
        type: 'text',
        content: {
          text: formData.title,
          fontSize: 14,
          fontWeight: 'normal' as const,
          color: '#666666',
        },
      });
    }

    // Company block
    if (formData.company) {
      blocks.push({
        id: getBlockId('company', initialBlocks),
        type: 'text',
        content: {
          text: formData.company,
          fontSize: 14,
          fontWeight: 'bold' as const,
          color: '#7c3aed',
        },
      });
    }

    // Spacer
    if (blocks.length > 0) {
      blocks.push({
        id: crypto.randomUUID(),
        type: 'spacer',
        content: { height: 12 },
      });
    }

    // Contact info block
    if (formData.email || formData.phone || formData.website || formData.address) {
      blocks.push({
        id: getBlockId('contact', initialBlocks),
        type: 'contact-info',
        content: {
          email: formData.email || undefined,
          phone: formData.phone || undefined,
          website: formData.website || undefined,
          address: formData.address || undefined,
          showIcons: true,
        },
      });
    }

    // Social links
    if (includeSocial) {
      const socialPlatforms: Array<{ type: 'linkedin' | 'twitter' | 'facebook' | 'instagram'; url: string }> = [];
      if (formData.linkedin) socialPlatforms.push({ type: 'linkedin', url: formData.linkedin });
      if (formData.twitter) socialPlatforms.push({ type: 'twitter', url: formData.twitter });
      if (formData.facebook) socialPlatforms.push({ type: 'facebook', url: formData.facebook });
      if (formData.instagram) socialPlatforms.push({ type: 'instagram', url: formData.instagram });

      if (socialPlatforms.length > 0) {
        blocks.push({
          id: crypto.randomUUID(),
          type: 'spacer',
          content: { height: 12 },
        });
        blocks.push({
          id: getBlockId('social', initialBlocks),
          type: 'social',
          content: {
            platforms: socialPlatforms,
            iconSize: 24,
            iconStyle: 'color' as const,
          },
        });
      }
    }

    // Disclaimer
    if (includeDisclaimer && formData.disclaimer) {
      blocks.push({
        id: crypto.randomUUID(),
        type: 'spacer',
        content: { height: 16 },
      });
      blocks.push({
        id: crypto.randomUUID(),
        type: 'divider',
        content: {
          color: '#e5e7eb',
          width: 100,
          style: 'solid' as const,
        },
      });
      blocks.push({
        id: crypto.randomUUID(),
        type: 'spacer',
        content: { height: 12 },
      });
      blocks.push({
        id: getBlockId('disclaimer', initialBlocks),
        type: 'disclaimer',
        content: {
          text: formData.disclaimer,
          template: 'custom' as const,
          fontSize: 10,
          color: '#999999',
        },
      });
    }

    return blocks;
  }, [formData, includePhoto, includeSocial, includeDisclaimer, getBlockId, initialBlocks]);

  // Update form when initialBlocks change (but not on every render)
  useEffect(() => {
    if (initialBlocks.length > 0 && !isInitialLoad) {
      const { formData: newFormData, includeFlags } = blocksToFormData(initialBlocks);
      setFormData(newFormData);
      setIncludePhoto(includeFlags.includePhoto);
      setIncludeSocial(includeFlags.includeSocial);
      setIncludeDisclaimer(includeFlags.includeDisclaimer);
    }
  }, [initialBlocks, isInitialLoad]);

  // Auto-update blocks when form changes (after initial load, with debounce)
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    // Clear existing timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Only auto-update if we have onUpdate callback and initial blocks exist
    if (onUpdate && initialBlocks.length > 0) {
      // Debounce updates to avoid excessive re-renders
      updateTimeoutRef.current = setTimeout(() => {
        const blocks = generateBlocksFromFormData();
        onUpdate(blocks);
      }, 300);
    }

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [formData, includePhoto, includeSocial, includeDisclaimer, onUpdate, initialBlocks.length, generateBlocksFromFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateBlocks = () => {
    // Validate that at least name is provided
    if (!formData.name.trim()) {
      alert('Please enter at least a name for the signature');
      return;
    }
    const blocks = generateBlocksFromFormData();
    onGenerate(blocks);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter your contact details to generate a signature</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Marketing Manager"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Acme Inc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="www.company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optional Elements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="includePhoto"
              checked={includePhoto}
              onChange={(e) => setIncludePhoto(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="includePhoto" className="cursor-pointer">Add profile photo</Label>
          </div>

          {includePhoto && (
            <div className="space-y-2 ml-6">
              <Label htmlFor="photoUrl">Photo URL</Label>
              <div className="flex gap-2">
                <Input
                  id="photoUrl"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                />
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="includeSocial"
              checked={includeSocial}
              onChange={(e) => setIncludeSocial(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="includeSocial" className="cursor-pointer">Add social media links</Label>
          </div>

          {includeSocial && (
            <div className="space-y-3 ml-6">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter/X</Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="https://twitter.com/johndoe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/johndoe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/johndoe"
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="includeDisclaimer"
              checked={includeDisclaimer}
              onChange={(e) => setIncludeDisclaimer(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="includeDisclaimer" className="cursor-pointer">Add legal disclaimer</Label>
          </div>

          {includeDisclaimer && (
            <div className="space-y-2 ml-6">
              <Label htmlFor="disclaimer">Disclaimer Text</Label>
              <Textarea
                id="disclaimer"
                name="disclaimer"
                value={formData.disclaimer}
                onChange={handleChange}
                placeholder="This email and any attachments are confidential..."
                rows={3}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Button onClick={generateBlocks} size="lg" className="w-full">
        <Wand2 className="mr-2 h-5 w-5" />
        {initialBlocks.length > 0 ? 'Update Signature' : 'Generate Signature'}
      </Button>
    </div>
  );
}
