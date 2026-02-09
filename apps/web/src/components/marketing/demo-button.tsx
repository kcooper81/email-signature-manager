'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sparkles, Play, Loader2 } from 'lucide-react';

const SUPADEMO_ID = 'cmlbpojgx46fhvhwzml7s51i5';

interface DemoButtonProps {
  variant?: 'primary' | 'secondary' | 'minimal' | 'light';
  className?: string;
}

export function DemoButton({ variant = 'secondary', className = '' }: DemoButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if Supademo is already loaded
    if (typeof window !== 'undefined' && (window as any).Supademo) {
      setIsReady(true);
      return;
    }

    // Poll for Supademo to be ready (script loads async)
    const checkInterval = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).Supademo) {
        setIsReady(true);
        clearInterval(checkInterval);
      }
    }, 100);

    // Cleanup after 10 seconds if not loaded
    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, []);

  const openDemo = useCallback(() => {
    if (typeof window === 'undefined') return;

    // If already ready, open immediately
    if ((window as any).Supademo) {
      (window as any).Supademo.open(SUPADEMO_ID);
      return;
    }

    // Show loading state and wait for script
    setIsLoading(true);
    
    const checkInterval = setInterval(() => {
      if ((window as any).Supademo) {
        clearInterval(checkInterval);
        setIsLoading(false);
        (window as any).Supademo.open(SUPADEMO_ID);
      }
    }, 100);

    // Timeout after 5 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
      setIsLoading(false);
      // Fallback: navigate to demo page
      window.location.href = '/demo';
    }, 5000);
  }, []);

  if (variant === 'minimal') {
    return (
      <button
        onClick={openDemo}
        disabled={isLoading}
        className={`inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors disabled:opacity-50 ${className}`}
      >
        {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
        {isLoading ? 'Loading...' : 'Watch demo'}
      </button>
    );
  }

  if (variant === 'primary') {
    return (
      <button
        onClick={openDemo}
        disabled={isLoading}
        className={`group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 px-6 md:px-8 py-3.5 md:py-4 text-base font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 transition-all active:scale-[0.98] disabled:opacity-70 ${className}`}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
        {isLoading ? 'Loading...' : 'Watch demo'}
      </button>
    );
  }

  if (variant === 'light') {
    return (
      <button
        onClick={openDemo}
        disabled={isLoading}
        className={`group inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur px-6 md:px-8 py-3.5 md:py-4 text-base font-semibold text-white hover:bg-white/20 hover:border-white/40 transition-all active:scale-[0.98] disabled:opacity-70 ${className}`}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
        {isLoading ? 'Loading...' : 'Watch demo'}
      </button>
    );
  }

  return (
    <button
      onClick={openDemo}
      disabled={isLoading}
      className={`group inline-flex items-center justify-center rounded-full border-2 border-gray-200 bg-white px-6 md:px-8 py-3.5 md:py-4 text-base font-semibold text-gray-700 hover:border-violet-300 hover:text-violet-600 transition-all active:scale-[0.98] disabled:opacity-70 ${className}`}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      {isLoading ? 'Loading...' : 'Watch demo'}
    </button>
  );
}
