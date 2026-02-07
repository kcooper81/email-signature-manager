'use client';

import { Sparkles, Play } from 'lucide-react';

const SUPADEMO_ID = 'cmlbpojgx46fhvhwzml7s51i5';

interface DemoButtonProps {
  variant?: 'primary' | 'secondary' | 'minimal';
  className?: string;
}

export function DemoButton({ variant = 'secondary', className = '' }: DemoButtonProps) {
  const openDemo = () => {
    if (typeof window !== 'undefined' && (window as any).Supademo) {
      (window as any).Supademo.open(SUPADEMO_ID);
    }
  };

  if (variant === 'minimal') {
    return (
      <button
        onClick={openDemo}
        className={`inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors ${className}`}
      >
        <Play className="h-3.5 w-3.5" />
        Watch demo
      </button>
    );
  }

  if (variant === 'primary') {
    return (
      <button
        onClick={openDemo}
        className={`group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 px-6 md:px-8 py-3.5 md:py-4 text-base font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 transition-all active:scale-[0.98] ${className}`}
      >
        <Play className="mr-2 h-4 w-4" />
        Watch demo
      </button>
    );
  }

  return (
    <button
      onClick={openDemo}
      className={`group inline-flex items-center justify-center rounded-full border-2 border-gray-200 bg-white px-6 md:px-8 py-3.5 md:py-4 text-base font-semibold text-gray-700 hover:border-violet-300 hover:text-violet-600 transition-all active:scale-[0.98] ${className}`}
    >
      <Sparkles className="mr-2 h-4 w-4" />
      Watch demo
    </button>
  );
}
