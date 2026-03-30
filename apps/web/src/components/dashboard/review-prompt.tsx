'use client';

import { useState, useEffect } from 'react';
import { Star, X, ExternalLink } from 'lucide-react';

const STORAGE_KEY = 'siggly-review-prompt-dismissed';

export function ReviewPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable, don't show
    }
  }, []);

  function handleDismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
  }

  if (!visible) return null;

  return (
    <div className="relative rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 flex items-center gap-3 text-sm">
      <div className="flex items-center gap-0.5 flex-shrink-0">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 flex-1 min-w-0">
        Enjoying Siggly? Help other teams find us &mdash;{' '}
        <a
          href="https://www.g2.com/products/siggly/reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-violet-700 hover:text-violet-900 underline underline-offset-2 inline-flex items-center gap-1"
        >
          leave a quick review on G2
          <ExternalLink className="h-3 w-3" />
        </a>
      </p>
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-violet-100 transition-colors"
        aria-label="Dismiss review prompt"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
