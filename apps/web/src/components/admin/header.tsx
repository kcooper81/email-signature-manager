'use client';

import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { Shield, ArrowLeft } from 'lucide-react';

interface AdminHeaderProps {
  user: User;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to App</span>
        </Link>
        <div className="h-6 w-px bg-slate-700" />
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-amber-500" />
          <span className="font-semibold text-white">Siggly Admin</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-400">{user.email}</span>
        <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-medium text-sm">
          {user.email?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
