'use client';

import { useBranding } from '@/lib/branding/branding-context';

export function PoweredByFooter() {
  const { isWhiteLabeled } = useBranding();

  // Hide "Powered by Siggly" for white-labeled MSP portals
  if (isWhiteLabeled) {
    return null;
  }

  return (
    <div className="text-center text-xs text-muted-foreground py-4 border-t mt-auto">
      Powered by{' '}
      <a
        href="https://siggly.io"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        Siggly
      </a>
    </div>
  );
}
