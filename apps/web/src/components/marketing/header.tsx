'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MarketingHeaderProps {
  transparent?: boolean;
}

export function MarketingHeader({ transparent = true }: MarketingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm'
          : transparent
          ? 'bg-transparent border-b border-transparent'
          : 'bg-white border-b border-gray-200'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">Siggly</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/features" 
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            Features
          </Link>
          <Link 
            href="/pricing" 
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            Pricing
          </Link>
          <Link 
            href="/use-cases" 
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            Use Cases
          </Link>
          <Link 
            href="/blog" 
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
              Sign in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
