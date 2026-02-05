'use client';

import { X, Eye } from 'lucide-react';
import { Button } from '@/components/ui';
import { useImpersonation } from '@/hooks/use-impersonation';

export function ImpersonationBanner() {
  const { isImpersonating, impersonatedOrg, stopImpersonation } = useImpersonation();

  const handleExit = () => {
    stopImpersonation();
    window.location.href = '/admin/accounts';
  };

  if (!isImpersonating || !impersonatedOrg) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-amber-950 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span className="font-medium">
            Viewing as: <strong>{impersonatedOrg.name}</strong>
          </span>
          <span className="text-amber-800 text-sm">
            (Read-only mode - actions are disabled)
          </span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleExit}
          className="text-amber-950 hover:bg-amber-400"
        >
          <X className="h-4 w-4 mr-1" />
          Exit
        </Button>
      </div>
    </div>
  );
}
