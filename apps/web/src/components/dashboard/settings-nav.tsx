'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  User,
  Building2,
  Palette,
  Image as ImageIcon,
  Shield,
  RefreshCw,
  Zap,
  ClipboardCheck,
  CreditCard,
  Bell,
  Monitor,
} from 'lucide-react';

interface SettingsTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  mspOnly?: boolean;
}

const allTabs: SettingsTab[] = [
  { id: 'profile', label: 'Profile', icon: User, href: '/settings' },
  { id: 'organization', label: 'Organization', icon: Building2, href: '/settings' },
  { id: 'branding', label: 'Branding', icon: Palette, href: '/settings/branding', mspOnly: true },
  { id: 'brand-assets', label: 'Brand Assets', icon: ImageIcon, href: '/settings/brand-assets' },
  { id: 'disclaimers', label: 'Disclaimers', icon: Shield, href: '/settings/disclaimers' },
  { id: 'hr-sync', label: 'HR Sync', icon: RefreshCw, href: '/settings/hr-sync' },
  { id: 'automation', label: 'Automation', icon: Zap, href: '/settings/automation' },
  { id: 'validation-rules', label: 'Validation', icon: ClipboardCheck, href: '/settings/validation-rules' },
  { id: 'billing', label: 'Billing', icon: CreditCard, href: '/settings/billing' },
  { id: 'notifications', label: 'Notifications', icon: Bell, href: '/settings' },
  { id: 'appearance', label: 'Appearance', icon: Monitor, href: '/settings' },
  { id: 'security', label: 'Security', icon: Shield, href: '/settings' },
];

export function SettingsNav() {
  const pathname = usePathname();
  const [isMsp, setIsMsp] = useState(false);

  useEffect(() => {
    async function checkOrgType() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: userData } = await supabase
        .from('users')
        .select('organization_id')
        .eq('auth_id', user.id)
        .single();
      if (!userData?.organization_id) return;
      const { data: org } = await supabase
        .from('organizations')
        .select('organization_type')
        .eq('id', userData.organization_id)
        .single();
      if (org?.organization_type === 'msp') setIsMsp(true);
    }
    checkOrgType();
  }, []);

  const tabs = allTabs.filter(tab => !tab.mspOnly || isMsp);

  function isActive(tab: SettingsTab): boolean {
    // For sub-route tabs, check startsWith
    if (tab.href !== '/settings') {
      return pathname.startsWith(tab.href);
    }
    // For /settings tabs (profile, org, notifications, appearance, security),
    // only active when we're exactly on /settings
    return pathname === '/settings';
  }

  return (
    <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:sticky lg:top-6">
      {tabs.map((tab) => {
        const active = isActive(tab);
        const TabIcon = tab.icon;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors whitespace-nowrap ${
              active
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            <TabIcon className="h-5 w-5" />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
