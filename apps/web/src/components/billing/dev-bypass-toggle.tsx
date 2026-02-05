'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export function DevBypassToggle() {
  const [bypassEnabled, setBypassEnabled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if bypass is currently enabled
    const currentValue = localStorage.getItem('dev_bypass_pay_gates') === 'true';
    setBypassEnabled(currentValue);
  }, []);

  const handleToggle = (checked: boolean) => {
    setBypassEnabled(checked);
    localStorage.setItem('dev_bypass_pay_gates', checked.toString());
    
    // Auto-refresh page for changes to take effect
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development' || !isClient) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 shadow-lg border-amber-500 bg-amber-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <div className="flex items-center gap-3">
            <Label htmlFor="dev-bypass" className="text-sm font-medium text-amber-900 cursor-pointer">
              Bypass Pay Gates (Dev)
            </Label>
            <Switch
              id="dev-bypass"
              checked={bypassEnabled}
              onCheckedChange={handleToggle}
            />
          </div>
        </div>
        {bypassEnabled && (
          <p className="text-xs text-amber-700 mt-2">
            All subscription limits disabled
          </p>
        )}
      </CardContent>
    </Card>
  );
}
