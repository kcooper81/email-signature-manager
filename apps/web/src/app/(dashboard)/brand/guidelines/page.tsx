'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Plus } from 'lucide-react';
import { FeatureGate } from '@/components/billing/upgrade-prompt';

export default function BrandGuidelinesPage() {
  const [guidelines, setGuidelines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuidelines();
  }, []);

  async function loadGuidelines() {
    setLoading(true);
    try {
      const res = await fetch('/api/brand/guidelines');
      const data = await res.json();
      setGuidelines(data.guidelines || []);
    } catch (err) {
      console.error('Failed to load guidelines:', err);
    }
    setLoading(false);
  }

  return (
    <FeatureGate feature="brandGovernance">
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Brand Guidelines</h1>
          <p className="text-muted-foreground">Define colors, fonts, logos, and rules for your brand</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Guideline
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
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
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${g.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {g.is_active ? 'Active' : 'Inactive'}
                  </span>
                  {!g._readOnly && <Button variant="outline" size="sm">Edit</Button>}
                </div>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                {g.primary_colors?.length > 0 && (
                  <div className="flex items-center gap-1">
                    Colors: {g.primary_colors.map((c: string, i: number) => (
                      <span key={i} className="w-4 h-4 rounded-full inline-block border" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                )}
                {g.allowed_fonts?.length > 0 && <span>Fonts: {g.allowed_fonts.join(', ')}</span>}
                {g.locked_colors && <span className="text-orange-600">Colors locked</span>}
                {g.locked_fonts && <span className="text-orange-600">Fonts locked</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </FeatureGate>
  );
}
