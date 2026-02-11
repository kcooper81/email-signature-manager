'use client';

import { useState, useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, Check, X, ExternalLink, Palette, Image, Type, Globe, Eye } from 'lucide-react';
import type { OrganizationBranding } from '@/lib/db/schema';

interface BrandingFormData extends OrganizationBranding {
  customSubdomain?: string;
}

export default function BrandingSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [organizationType, setOrganizationType] = useState<string>('standard');
  
  const [formData, setFormData] = useState<BrandingFormData>({
    primaryColor: '#0066cc',
    secondaryColor: '#f8fafc',
    accentColor: '#10b981',
    logoUrl: '',
    logoIconUrl: '',
    logoDarkUrl: '',
    faviconUrl: '',
    companyName: '',
    supportEmail: '',
    supportUrl: '',
    hideSigglyBranding: false,
    hideHelpLinks: false,
    customSubdomain: '',
  });

  useEffect(() => {
    fetchBrandingSettings();
  }, []);

  const fetchBrandingSettings = async () => {
    try {
      const response = await fetch('/api/settings/branding');
      if (!response.ok) throw new Error('Failed to fetch branding settings');
      
      const data = await response.json();
      
      // Redirect non-MSP orgs - branding is only for MSP partners
      if (data.organizationType !== 'msp') {
        router.push('/settings');
        return;
      }
      
      setFormData({
        ...formData,
        ...data.branding,
        customSubdomain: data.customSubdomain || '',
      });
      setOrganizationType(data.organizationType || 'standard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkSubdomainAvailability = async (subdomain: string) => {
    if (!subdomain || subdomain.length < 3) {
      setSubdomainAvailable(null);
      return;
    }

    setCheckingSubdomain(true);
    try {
      const response = await fetch(`/api/settings/branding/check-subdomain?subdomain=${encodeURIComponent(subdomain)}`);
      const data = await response.json();
      setSubdomainAvailable(data.available);
    } catch {
      setSubdomainAvailable(null);
    } finally {
      setCheckingSubdomain(false);
    }
  };

  const handleSubdomainChange = (value: string) => {
    const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData({ ...formData, customSubdomain: sanitized });
    setSubdomainAvailable(null);
    
    // Debounce the availability check
    const timeoutId = setTimeout(() => {
      checkSubdomainAvailability(sanitized);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/settings/branding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branding: {
            primaryColor: formData.primaryColor,
            secondaryColor: formData.secondaryColor,
            accentColor: formData.accentColor,
            logoUrl: formData.logoUrl,
            logoIconUrl: formData.logoIconUrl,
            logoDarkUrl: formData.logoDarkUrl,
            faviconUrl: formData.faviconUrl,
            companyName: formData.companyName,
            supportEmail: formData.supportEmail,
            supportUrl: formData.supportUrl,
            hideSigglyBranding: formData.hideSigglyBranding,
            hideHelpLinks: formData.hideHelpLinks,
          },
          customSubdomain: formData.customSubdomain || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save branding settings');
      }

      setSuccess('Branding settings saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isMsp = organizationType === 'msp';

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Branding Settings</h1>
        <p className="text-muted-foreground mt-2">
          Customize the look and feel of your email signature portal
          {isMsp && ' for your clients'}
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 border-green-500 bg-green-50 text-green-700">
          <Check className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="logos" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Logos
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Text & Support
          </TabsTrigger>
          <TabsTrigger value="domain" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Domain
          </TabsTrigger>
        </TabsList>

        {/* Colors Tab */}
        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
              <CardDescription>
                Set your brand colors to customize the portal appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      placeholder="#0066cc"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Buttons, links, accents</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      placeholder="#f8fafc"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Backgrounds, borders</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      placeholder="#10b981"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Success states, highlights</p>
                </div>
              </div>

              {/* Color Preview */}
              <div className="mt-6 p-6 border rounded-lg bg-background">
                <h4 className="font-medium mb-4">Preview</h4>
                <div className="flex flex-wrap gap-4">
                  <Button style={{ backgroundColor: formData.primaryColor }}>
                    Primary Button
                  </Button>
                  <Button variant="outline" style={{ borderColor: formData.primaryColor, color: formData.primaryColor }}>
                    Outline Button
                  </Button>
                  <div 
                    className="px-4 py-2 rounded-md text-sm"
                    style={{ backgroundColor: formData.secondaryColor }}
                  >
                    Secondary Background
                  </div>
                  <div 
                    className="px-4 py-2 rounded-md text-sm text-white"
                    style={{ backgroundColor: formData.accentColor }}
                  >
                    Accent Color
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logos Tab */}
        <TabsContent value="logos">
          <Card>
            <CardHeader>
              <CardTitle>Logo & Images</CardTitle>
              <CardDescription>
                Upload your brand logos and favicon
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Main Logo</Label>
                  <Input
                    id="logoUrl"
                    type="url"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                  <p className="text-xs text-muted-foreground">Recommended: 200x50px, PNG or SVG</p>
                  {formData.logoUrl && (
                    <div className="mt-2 p-4 border rounded-lg bg-muted/50">
                      <img 
                        src={formData.logoUrl} 
                        alt="Logo preview" 
                        className="h-8 object-contain"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoIconUrl">Square Icon</Label>
                  <Input
                    id="logoIconUrl"
                    type="url"
                    value={formData.logoIconUrl}
                    onChange={(e) => setFormData({ ...formData, logoIconUrl: e.target.value })}
                    placeholder="https://example.com/icon.png"
                  />
                  <p className="text-xs text-muted-foreground">Recommended: 64x64px, PNG</p>
                  {formData.logoIconUrl && (
                    <div className="mt-2 p-4 border rounded-lg bg-muted/50">
                      <img 
                        src={formData.logoIconUrl} 
                        alt="Icon preview" 
                        className="h-8 w-8 object-contain"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoDarkUrl">Logo (Dark Mode)</Label>
                  <Input
                    id="logoDarkUrl"
                    type="url"
                    value={formData.logoDarkUrl}
                    onChange={(e) => setFormData({ ...formData, logoDarkUrl: e.target.value })}
                    placeholder="https://example.com/logo-dark.png"
                  />
                  <p className="text-xs text-muted-foreground">Optional: For dark backgrounds</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="faviconUrl">Favicon</Label>
                  <Input
                    id="faviconUrl"
                    type="url"
                    value={formData.faviconUrl}
                    onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                    placeholder="https://example.com/favicon.ico"
                  />
                  <p className="text-xs text-muted-foreground">Browser tab icon, 32x32px</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Text & Support Tab */}
        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Text & Support</CardTitle>
              <CardDescription>
                Customize display text and support contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Display Name</Label>
                  <Input
                    id="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Your Company Name"
                  />
                  <p className="text-xs text-muted-foreground">Shown in headers and titles</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={formData.supportEmail}
                    onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                    placeholder="support@yourcompany.com"
                  />
                  <p className="text-xs text-muted-foreground">Shown to users for help</p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="supportUrl">Support/Help URL</Label>
                  <Input
                    id="supportUrl"
                    type="url"
                    value={formData.supportUrl}
                    onChange={(e) => setFormData({ ...formData, supportUrl: e.target.value })}
                    placeholder="https://yourcompany.com/help"
                  />
                  <p className="text-xs text-muted-foreground">Link to your help documentation</p>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h4 className="font-medium">Visibility Options</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="hideSigglyBranding">Hide Siggly Branding</Label>
                    <p className="text-xs text-muted-foreground">
                      Remove "Powered by Siggly" from the footer
                    </p>
                  </div>
                  <Switch
                    id="hideSigglyBranding"
                    checked={formData.hideSigglyBranding}
                    onCheckedChange={(checked) => setFormData({ ...formData, hideSigglyBranding: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="hideHelpLinks">Hide Siggly Help Links</Label>
                    <p className="text-xs text-muted-foreground">
                      Remove links to Siggly documentation
                    </p>
                  </div>
                  <Switch
                    id="hideHelpLinks"
                    checked={formData.hideHelpLinks}
                    onCheckedChange={(checked) => setFormData({ ...formData, hideHelpLinks: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Domain Tab */}
        <TabsContent value="domain">
          <Card>
            <CardHeader>
              <CardTitle>Custom Subdomain</CardTitle>
              <CardDescription>
                Set up a custom subdomain for your branded portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customSubdomain">Subdomain</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="customSubdomain"
                    type="text"
                    value={formData.customSubdomain}
                    onChange={(e) => handleSubdomainChange(e.target.value)}
                    placeholder="your-company"
                    className="max-w-xs"
                  />
                  <span className="text-muted-foreground">.siggly.io</span>
                  {checkingSubdomain && (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                  {!checkingSubdomain && subdomainAvailable === true && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                  {!checkingSubdomain && subdomainAvailable === false && (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  3-63 characters, lowercase letters, numbers, and hyphens only
                </p>
                {subdomainAvailable === false && (
                  <p className="text-xs text-red-500">
                    This subdomain is not available or is reserved
                  </p>
                )}
              </div>

              {formData.customSubdomain && subdomainAvailable && (
                <Alert>
                  <ExternalLink className="h-4 w-4" />
                  <AlertDescription>
                    Your portal will be accessible at:{' '}
                    <a 
                      href={`https://${formData.customSubdomain}.siggly.io`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      https://{formData.customSubdomain}.siggly.io
                    </a>
                  </AlertDescription>
                </Alert>
              )}

              <div className="border-t pt-6">
                <h4 className="font-medium mb-2">Custom Domain (Coming Soon)</h4>
                <p className="text-sm text-muted-foreground">
                  Use your own domain like <code className="bg-muted px-1 rounded">signatures.yourcompany.com</code>.
                  This feature is coming in a future update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  );
}
