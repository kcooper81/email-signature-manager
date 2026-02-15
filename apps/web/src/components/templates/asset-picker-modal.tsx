'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Modal, ModalHeader, ModalTitle, ModalDescription } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2, Image as ImageIcon } from 'lucide-react';

interface BrandAsset {
  id: string;
  public_url: string;
  display_name: string;
  category: string;
  width: number | null;
  height: number | null;
  file_size: number;
  usage_count: number;
}

interface AssetPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (asset: { publicUrl: string; displayName: string; width?: number; height?: number }) => void;
  category?: string;
}

const PICKER_CATEGORIES = ['all', 'logo', 'banner', 'icon', 'photo', 'uncategorized'] as const;

export function AssetPickerModal({ open, onClose, onSelect, category }: AssetPickerModalProps) {
  const [assets, setAssets] = useState<BrandAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(category || 'all');

  useEffect(() => {
    if (open) {
      setActiveCategory(category || 'all');
      loadAssets();
    }
  }, [open]);

  const loadAssets = async () => {
    setLoading(true);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) { setLoading(false); return; }

    const { data } = await supabase
      .from('brand_assets')
      .select('id, public_url, display_name, category, width, height, file_size, usage_count')
      .eq('organization_id', currentUser.organization_id)
      .order('created_at', { ascending: false });

    setAssets(data || []);
    setLoading(false);
  };

  const filteredAssets = assets.filter((a) => {
    const matchesCategory = activeCategory === 'all' || a.category === activeCategory;
    const matchesSearch = !search || a.display_name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelect = async (asset: BrandAsset) => {
    // Increment usage count via direct update
    const supabase = createClient();
    await supabase
      .from('brand_assets')
      .update({ usage_count: (asset.usage_count || 0) + 1 })
      .eq('id', asset.id);

    onSelect({
      publicUrl: asset.public_url,
      displayName: asset.display_name,
      width: asset.width || undefined,
      height: asset.height || undefined,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} className="max-w-2xl">
      <ModalHeader onClose={onClose}>
        <ModalTitle>Asset Library</ModalTitle>
        <ModalDescription>
          Select an image from your brand assets{category ? ` (${category}s)` : ''}
        </ModalDescription>
      </ModalHeader>

      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          {PICKER_CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="capitalize h-7 text-xs"
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
            <p className="font-medium text-sm">No assets found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Upload assets in Settings &gt; Brand Assets
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto">
            {filteredAssets.map((asset) => (
              <button
                key={asset.id}
                className="group border rounded-lg p-2 hover:border-primary hover:bg-primary/5 transition-colors text-left"
                onClick={() => handleSelect(asset)}
              >
                <div className="aspect-square bg-muted rounded flex items-center justify-center mb-2">
                  <img
                    src={asset.public_url}
                    alt={asset.display_name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <p className="text-xs font-medium truncate">{asset.display_name}</p>
                {asset.width && asset.height && (
                  <p className="text-xs text-muted-foreground">{asset.width}x{asset.height}</p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
