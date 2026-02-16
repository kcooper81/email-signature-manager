'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, CheckCircle2 } from 'lucide-react';

export default function HrSyncChangesPage() {
  const [changes, setChanges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChanges();
  }, []);

  async function loadChanges() {
    setLoading(true);
    try {
      const res = await fetch('/api/hr-sync/changes?status=pending');
      const data = await res.json();
      setChanges(data.changes || []);
    } catch (err) {
      console.error('Failed to load changes:', err);
    }
    setLoading(false);
  }

  async function approveChange(id: string) {
    await fetch(`/api/hr-sync/changes/${id}/approve`, { method: 'POST' });
    setChanges(prev => prev.filter(c => c.id !== id));
  }

  async function rejectChange(id: string) {
    await fetch(`/api/hr-sync/changes/${id}/reject`, { method: 'POST' });
    setChanges(prev => prev.filter(c => c.id !== id));
  }

  async function bulkApprove() {
    const ids = changes.map(c => c.id);
    await fetch('/api/hr-sync/changes/bulk-approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ changeIds: ids }),
    });
    setChanges([]);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pending Changes</h1>
          <p className="text-muted-foreground">Review and approve sync changes before they are applied</p>
        </div>
        {changes.length > 0 && (
          <Button onClick={bulkApprove}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Approve All ({changes.length})
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : changes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No pending changes to review.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {changes.map(change => (
            <div key={change.id} className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    change.change_type === 'create' ? 'bg-green-100 text-green-700' :
                    change.change_type === 'update' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {change.change_type}
                  </span>
                  <span className="ml-2 font-medium">{change.user_email}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => rejectChange(change.id)}>
                    <X className="h-3.5 w-3.5 mr-1" /> Reject
                  </Button>
                  <Button size="sm" onClick={() => approveChange(change.id)}>
                    <Check className="h-3.5 w-3.5 mr-1" /> Approve
                  </Button>
                </div>
              </div>
              {change.field_changes?.length > 0 && (
                <div className="space-y-1">
                  {change.field_changes.map((fc: any, i: number) => (
                    <div key={i} className="text-sm flex gap-2">
                      <span className="text-muted-foreground w-32">{fc.field}:</span>
                      {fc.oldValue && <span className="text-red-600 line-through">{fc.oldValue}</span>}
                      <span className="text-green-600">{fc.newValue}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
