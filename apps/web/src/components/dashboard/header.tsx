'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, User, Shield } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface DashboardHeaderProps {
  user: SupabaseUser;
  isAdmin?: boolean;
}

export function DashboardHeader({ user, isAdmin = false }: DashboardHeaderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const initials = [
    user.user_metadata?.first_name?.[0],
    user.user_metadata?.last_name?.[0],
  ]
    .filter(Boolean)
    .join('')
    .toUpperCase() || user.email?.[0]?.toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900 backdrop-blur-sm shadow-md">
      <div className="flex h-14 items-center justify-between px-3 sm:px-4 md:px-6">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image 
            src="/siggly-logo.png" 
            alt="Siggly Logo" 
            width={32} 
            height={32}
            className="h-7 w-auto sm:h-8"
          />
          <span className="font-semibold text-base sm:text-lg text-white">Siggly</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          {/* User menu */}
          <div className="flex items-center gap-2">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-white">
                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
              </p>
              <p className="text-xs text-gray-300">{user.email}</p>
            </div>
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white flex items-center justify-center text-xs font-medium">
              {initials}
            </div>
          </div>

          {/* Admin link - only visible to admins */}
          {isAdmin && (
            <Link href="/admin" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="text-amber-400 hover:text-amber-300 hover:bg-slate-800" title="Admin Panel">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          )}

          {/* Settings */}
          <Link href="/settings" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-slate-800">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>

          {/* Sign out */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            disabled={loading}
            className="text-gray-300 hover:text-white hover:bg-slate-800 hidden sm:flex"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
