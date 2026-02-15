'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Card, CardContent, Badge } from '@/components/ui';
import { PageHeader } from '@/components/dashboard';
import {
  Upload,
  Trash2,
  Search,
  Grid3X3,
  List,
  Image as ImageIcon,
  Loader2,
  FileImage,
  Pencil,
  Check,
  X,
  User,
  Building2,
  Bell,
  Shield,
  Palette,
  CreditCard,
  Monitor,
} from 'lucide-react';
import Link from 'next/link';

interface BrandAsset {
  id: string;
  file_name: string;
  file_path: string;
  public_url: string;
  mime_type: string;
  file_size: number;
  width: number | null;
  height: number | null;
  display_name: string;
  category: string;
  tags: string[];
  description: string | null;
  usage_count: number;
  created_at: string;
}

const CATEGORIES = ['all', 'logo', 'banner', 'icon', 'photo', 'uncategorized'] as const;

function categorizeByFilename(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('logo') || lower.includes('brand')) return 'logo';
  if (lower.includes('banner') || lower.includes('promo') || lower.includes('campaign')) return 'banner';
  if (lower.includes('icon') || lower.includes('favicon')) return 'icon';
  if (lower.includes('photo') || lower.includes('headshot') || lower.includes('avatar')) return 'photo';
  return 'uncategorized';
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default function BrandAssetsPage() {
  const [assets, setAssets] = useState<BrandAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [dragOver, setDragOver] = useState(false);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ display_name: string; category: string; description: string }>({
    display_name: '',
    category: 'uncategorized',
    description: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    setLoading(true);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data: currentUser } = await supabase
      .from('users')
      .select('id, organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) { setLoading(false); return; }

    setOrgId(currentUser.organization_id);
    setUserId(currentUser.id);

    const { data: assetData } = await supabase
      .from('brand_assets')
      .select('*')
      .eq('organization_id', currentUser.organization_id)
      .order('created_at', { ascending: false });

    setAssets(assetData || []);
    setLoading(false);
  };

  const handleUpload = useCallback(async (files: FileList | File[]) => {
    if (!orgId) return;
    setUploading(true);
    const supabase = createClient();

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large (max 5MB)`);
        continue;
      }

      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `brand-assets/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('signature-assets')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('signature-assets')
          .getPublicUrl(filePath);

        // Get image dimensions
        let width: number | null = null;
        let height: number | null = null;
        try {
          const dims = await getImageDimensions(file);
          width = dims.width;
          height = dims.height;
        } catch {}

        const category = categorizeByFilename(file.name);
        const displayName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

        await supabase.from('brand_assets').insert({
          organization_id: orgId,
          file_name: file.name,
          file_path: filePath,
          public_url: publicUrl,
          mime_type: file.type,
          file_size: file.size,
          width,
          height,
          display_name: displayName,
          category,
          uploaded_by: userId,
        });
      } catch (err) {
        console.error('Failed to upload:', file.name, err);
      }
    }

    await loadAssets();
    setUploading(false);
  }, [orgId, userId]);

  const handleDelete = async (asset: BrandAsset) => {
    if (!confirm(`Delete "${asset.display_name}"? This cannot be undone.`)) return;

    const supabase = createClient();

    // Delete from storage
    await supabase.storage.from('signature-assets').remove([asset.file_path]);

    // Delete from table
    await supabase.from('brand_assets').delete().eq('id', asset.id);

    setAssets((prev) => prev.filter((a) => a.id !== asset.id));
  };

  const startEditing = (asset: BrandAsset) => {
    setEditingId(asset.id);
    setEditForm({
      display_name: asset.display_name,
      category: asset.category,
      description: asset.description || '',
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const supabase = createClient();

    await supabase
      .from('brand_assets')
      .update({
        display_name: editForm.display_name,
        category: editForm.category,
        description: editForm.description || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', editingId);

    setAssets((prev) =>
      prev.map((a) =>
        a.id === editingId
          ? { ...a, display_name: editForm.display_name, category: editForm.category, description: editForm.description || null }
          : a
      )
    );
    setEditingId(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  };

  const filteredAssets = assets.filter((a) => {
    const matchesCategory = activeCategory === 'all' || a.category === activeCategory;
    const matchesSearch = !search ||
      a.display_name.toLowerCase().includes(search.toLowerCase()) ||
      a.file_name.toLowerCase().includes(search.toLowerCase()) ||
      (a.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User, href: '/settings' },
    { id: 'organization', label: 'Organization', icon: Building2, href: '/settings' },
    { id: 'brand-assets', label: 'Brand Assets', icon: ImageIcon, href: '/settings/brand-assets' },
    { id: 'billing', label: 'Billing', icon: CreditCard, href: '/settings/billing' },
    { id: 'notifications', label: 'Notifications', icon: Bell, href: '/settings' },
    { id: 'appearance', label: 'Appearance', icon: Monitor, href: '/settings' },
    { id: 'security', label: 'Security', icon: Shield, href: '/settings' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-56 shrink-0">
          <nav className="space-y-1 lg:sticky lg:top-6">
            {settingsTabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
                  tab.id === 'brand-assets'
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
      <PageHeader
        title="Brand Assets"
        description="Upload and manage images for use across your email signatures"
      />

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-muted-foreground/40'
        } ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
        />
        {uploading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Uploading...</span>
          </div>
        ) : (
          <>
            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">Drop images here or click to upload</p>
            <p className="text-sm text-muted-foreground mt-1">PNG, JPG, GIF, WebP, SVG &bull; Max 5MB each</p>
          </>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="capitalize"
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-[200px]"
            />
          </div>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-l-none"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Assets Display */}
      {filteredAssets.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <FileImage className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
              <p className="font-medium">No assets found</p>
              <p className="text-sm text-muted-foreground mt-1">
                {assets.length === 0
                  ? 'Upload your first image to get started'
                  : 'Try adjusting your search or category filter'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAssets.map((asset) => (
            <Card key={asset.id} className="group overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center p-2 relative">
                <img
                  src={asset.public_url}
                  alt={asset.display_name}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); startEditing(asset); }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); handleDelete(asset); }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {editingId === asset.id ? (
                <CardContent className="p-3 space-y-2">
                  <Input
                    value={editForm.display_name}
                    onChange={(e) => setEditForm({ ...editForm, display_name: e.target.value })}
                    placeholder="Display name"
                    className="h-8 text-sm"
                  />
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full h-8 rounded-md border border-input bg-background px-2 text-sm"
                  >
                    {CATEGORIES.filter((c) => c !== 'all').map((cat) => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                  <Input
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Description (optional)"
                    className="h-8 text-sm"
                  />
                  <div className="flex gap-1">
                    <Button size="sm" className="h-7 flex-1" onClick={saveEdit}>
                      <Check className="h-3 w-3 mr-1" /> Save
                    </Button>
                    <Button size="sm" variant="outline" className="h-7" onClick={cancelEditing}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate">{asset.display_name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant="secondary" className="text-xs capitalize">{asset.category}</Badge>
                    <span className="text-xs text-muted-foreground">{formatFileSize(asset.file_size)}</span>
                  </div>
                  {asset.description && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">{asset.description}</p>
                  )}
                  {asset.width && asset.height && (
                    <p className="text-xs text-muted-foreground mt-1">{asset.width} x {asset.height}</p>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-3 font-medium w-16"></th>
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Category</th>
                  <th className="p-3 font-medium">Dimensions</th>
                  <th className="p-3 font-medium">Size</th>
                  <th className="p-3 font-medium text-right">Uses</th>
                  <th className="p-3 font-medium w-16"></th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="p-3">
                      <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                        <img
                          src={asset.public_url}
                          alt={asset.display_name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </td>
                    <td className="p-3 font-medium">
                      {editingId === asset.id ? (
                        <Input
                          value={editForm.display_name}
                          onChange={(e) => setEditForm({ ...editForm, display_name: e.target.value })}
                          className="h-7 text-sm"
                        />
                      ) : (
                        asset.display_name
                      )}
                    </td>
                    <td className="p-3">
                      {editingId === asset.id ? (
                        <select
                          value={editForm.category}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                          className="h-7 rounded-md border border-input bg-background px-2 text-sm"
                        >
                          {CATEGORIES.filter((c) => c !== 'all').map((cat) => (
                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                          ))}
                        </select>
                      ) : (
                        <Badge variant="secondary" className="capitalize">{asset.category}</Badge>
                      )}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {asset.width && asset.height ? `${asset.width} x ${asset.height}` : '-'}
                    </td>
                    <td className="p-3 text-muted-foreground">{formatFileSize(asset.file_size)}</td>
                    <td className="p-3 text-right">{asset.usage_count}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        {editingId === asset.id ? (
                          <>
                            <Button variant="ghost" size="sm" onClick={saveEdit}>
                              <Check className="h-4 w-4 text-emerald-500" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={cancelEditing}>
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => startEditing(asset)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() => handleDelete(asset)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
        </div>
      </div>
    </div>
  );
}
