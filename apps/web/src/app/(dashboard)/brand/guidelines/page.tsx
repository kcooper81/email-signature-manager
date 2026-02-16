'use client';

import { useState, useEffect } from 'react';
import { Button, ConfirmDialog, useToast } from '@/components/ui';
import { Palette, Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { FeatureGate } from '@/components/billing/upgrade-prompt';
import { GuidelineModal } from './guideline-modal';

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
  version: number;
  _cascaded?: boolean;
  _readOnly?: boolean;
}

export default function BrandGuidelinesPage() {
  const [guidelines, setGuidelines] = useState<BrandGuideline[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGuideline, setEditingGuideline] = useState<BrandGuideline | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    loadGuidelines();
  }, []);

  async function loadGuidelines() {
    setLoading(true);
    try {
      const res = await fetch('/api/brand/guidelines');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load');
      setGuidelines(data.guidelines || []);
    } catch (err: any) {
      toast.error('Failed to load guidelines', err.message);
    }
    setLoading(false);
  }

  function openCreate() {
    setEditingGuideline(null);
    setModalOpen(true);
  }

  function openEdit(g: BrandGuideline) {
    setEditingGuideline(g);
    setModalOpen(true);
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/brand/guidelines/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      toast.success('Guideline deleted');
      setDeleteId(null);
      await loadGuidelines();
    } catch (err: any) {
      toast.error('Failed to delete', err.message);
    }
    setDeleting(false);
  }

  return (
    <FeatureGate feature="brandGovernance">
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Brand Guidelines</h1>
          <p className="text-muted-foreground">Define colors, fonts, logos, and rules for your brand</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          New Guideline
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : guidelines.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No brand guidelines defined yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {guidelines.map(g => (
            <div key={g.id} className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{g.name}</h3>
                    {g._cascaded && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">MSP</span>}
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">v{g.version}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{g.description || 'No description'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${g.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {g.is_active ? 'Active' : 'Inactive'}
                  </span>
                  {!g._readOnly && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => openEdit(g)}>
                        <Pencil className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setDeleteId(g.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                {g.primary_colors && g.primary_colors.length > 0 && (
                  <div className="flex items-center gap-1">
                    Colors: {g.primary_colors.map((c: string, i: number) => (
                      <span key={i} className="w-4 h-4 rounded-full inline-block border" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                )}
                {g.allowed_fonts && g.allowed_fonts.length > 0 && <span>Fonts: {g.allowed_fonts.join(', ')}</span>}
                {g.locked_colors && <span className="text-orange-600">Colors locked</span>}
                {g.locked_fonts && <span className="text-orange-600">Fonts locked</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Guideline Modal */}
      {modalOpen && (
        <GuidelineModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditingGuideline(null); }}
          guideline={editingGuideline}
          onSaved={() => { toast.success(editingGuideline ? 'Guideline updated' : 'Guideline created'); loadGuidelines(); }}
        />
      )}

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Brand Guideline"
        description="Are you sure? This guideline will be permanently removed."
        confirmText="Delete"
        variant="destructive"
        loading={deleting}
      />
    </div>
    </FeatureGate>
  );
}
