'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { X, Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface BulkAction {
  label: string;
  icon: LucideIcon;
  onClick: () => Promise<void>;
  destructive?: boolean;
  confirmMessage?: string;
}

interface BulkActionBarProps {
  selectedCount: number;
  onClear: () => void;
  actions: BulkAction[];
}

export function BulkActionBar({ selectedCount, onClear, actions }: BulkActionBarProps) {
  const [confirmAction, setConfirmAction] = useState<BulkAction | null>(null);
  const [loading, setLoading] = useState(false);

  if (selectedCount === 0) return null;

  const handleAction = async (action: BulkAction) => {
    if (action.destructive && action.confirmMessage) {
      setConfirmAction(action);
      return;
    }
    await executeAction(action);
  };

  const executeAction = async (action: BulkAction) => {
    setLoading(true);
    try {
      await action.onClick();
    } finally {
      setLoading(false);
      setConfirmAction(null);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white shadow-lg animate-in slide-in-from-bottom duration-200">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">
                {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
              </span>
              <Button variant="ghost" size="sm" onClick={onClear} disabled={loading}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.label}
                    variant={action.destructive ? 'destructive' : 'outline'}
                    size="sm"
                    onClick={() => handleAction(action)}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Icon className="h-4 w-4 mr-1" />
                    )}
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => confirmAction && executeAction(confirmAction)}
        title={confirmAction?.label || ''}
        description={confirmAction?.confirmMessage || 'Are you sure?'}
        confirmText={confirmAction?.label || 'Confirm'}
        variant="destructive"
        loading={loading}
      />
    </>
  );
}
