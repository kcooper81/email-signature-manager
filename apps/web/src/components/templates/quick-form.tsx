'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Upload } from 'lucide-react';
import type { SignatureBlock } from './types';

interface QuickFormProps {
  onGenerate: (blocks: SignatureBlock[]) => void;
}

export function QuickForm({ onGenerate }: QuickFormProps) {
  const [formData, setFormData] = useState({
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

  const [includePhoto, setIncludePhoto] = useState(false);
  const [includeSocial, setIncludeSocial] = useState(false);
  const [includeDisclaimer, setIncludeDisclaimer] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateBlocks = () => {
    const blocks: SignatureBlock[] = [];

    // Photo block
    if (includePhoto && formData.photoUrl) {
      blocks.push({
        id: crypto.randomUUID(),
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
        id: crypto.randomUUID(),
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
        id: crypto.randomUUID(),
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
        id: crypto.randomUUID(),
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
        id: crypto.randomUUID(),
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
          id: crypto.randomUUID(),
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
        id: crypto.randomUUID(),
        type: 'disclaimer',
        content: {
          text: formData.disclaimer,
          template: 'custom' as const,
          fontSize: 10,
          color: '#999999',
        },
      });
    }

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
        Generate Signature
      </Button>
    </div>
  );
}
