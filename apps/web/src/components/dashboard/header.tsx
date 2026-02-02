'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Mail, LogOut, Settings, User } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface DashboardHeaderProps {
  user: SupabaseUser;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-violet-600" />
          <span className="font-semibold text-lg">Siggly</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* User menu */}
          <div className="flex items-center gap-2.5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white flex items-center justify-center text-xs font-medium">
              {initials}
            </div>
          </div>

          {/* Settings */}
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>

          {/* Sign out */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            disabled={loading}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
