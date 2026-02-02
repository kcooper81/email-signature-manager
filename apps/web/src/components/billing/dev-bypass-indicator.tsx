'use client';

import { usePayGatesBypass } from '@/hooks/use-subscription';
import { Badge } from '@/components/ui/badge';
import { ShieldOff } from 'lucide-react';

export function DevBypassIndicator() {
  const devBypass = usePayGatesBypass();

  if (!devBypass) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Badge 
        variant="secondary" 
        className="bg-amber-100 text-amber-800 border-amber-300 flex items-center gap-1.5 px-3 py-1.5 shadow-lg"
      >
        <ShieldOff className="h-3.5 w-3.5" />
        <span className="text-xs font-medium">Pay Gates Bypassed</span>
      </Badge>
    </div>
  );
}
