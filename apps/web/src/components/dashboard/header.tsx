'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, User, Shield } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { useBranding } from '@/lib/branding/branding-context';

interface DashboardHeaderProps {
  user: SupabaseUser;
  isAdmin?: boolean;
}

export function DashboardHeader({ user, isAdmin = false }: DashboardHeaderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { branding, mspOrgId } = useBranding();

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

  // Partners use their branding primaryColor for the header; everyone else gets dark slate
  const headerBg = mspOrgId && branding.primaryColor ? branding.primaryColor : undefined;

  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900 backdrop-blur-sm shadow-md"
      style={headerBg ? { backgroundColor: headerBg, borderColor: 'rgba(0,0,0,0.15)' } : undefined}
    >
      <div className="flex h-14 items-center justify-between px-3 sm:px-4 md:px-6">
        {/* Logo - uses custom branding for MSP white-label */}
        <Link href="/dashboard" className="flex items-center gap-2">
          {mspOrgId && branding.logoUrl ? (
            <>
              <img
                src={branding.logoUrl}
                alt={branding.companyName || 'Logo'}
                className="h-7 w-auto sm:h-8 object-contain"
              />
              {branding.companyName && (
                <span className="font-semibold text-base sm:text-lg text-white">
                  {branding.companyName}
                </span>
              )}
            </>
          ) : (
            <>
              <Image
                src="/siggly-logo-header.png"
                alt="Siggly Logo"
                width={32}
                height={32}
                className="h-7 w-auto sm:h-8"
              />
              <span className="font-semibold text-base sm:text-lg text-white">Siggly</span>
            </>
          )}
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 relative">
          {/* User menu */}
          <div className="flex items-center gap-2">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-white">
                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
              </p>
              <p className="text-xs text-gray-300">{user.email}</p>
            </div>
            <button
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-xs font-medium sm:pointer-events-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {initials}
            </button>
          </div>

          {/* Mobile user dropdown */}
          {mobileMenuOpen && (
            <div className="absolute top-full right-2 mt-1 w-48 bg-card border rounded-lg shadow-lg py-1 sm:hidden z-50">
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              {isAdmin && (
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-amber-400 hover:bg-secondary">
                  <Shield className="h-4 w-4" />
                  Admin Panel
                </Link>
              )}
              <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button
                onClick={() => { setMobileMenuOpen(false); handleSignOut(); }}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}

          {/* Admin link - only visible to admins */}
          {isAdmin && (
            <Link href="/admin" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="text-amber-400 hover:text-amber-300 hover:bg-white/10" title="Admin Panel">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          )}

          {/* Settings */}
          <Link href="/settings" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>

          {/* Sign out */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            disabled={loading}
            className="text-gray-300 hover:text-white hover:bg-white/10 hidden sm:flex"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
