'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Settings,
  Palette,
  Shield,
  RefreshCw,
  Zap,
  ClipboardCheck,
  CreditCard,
} from 'lucide-react';

interface SettingsTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  mspOnly?: boolean;
}

interface NavSection {
  title: string;
  tabs: SettingsTab[];
}

const sections: NavSection[] = [
  {
    title: 'Account',
    tabs: [
      { id: 'general', label: 'General', icon: Settings, href: '/settings' },
      { id: 'billing', label: 'Billing', icon: CreditCard, href: '/settings/billing' },
    ],
  },
  {
    title: 'Compliance',
    tabs: [
      { id: 'disclaimers', label: 'Disclaimers', icon: Shield, href: '/settings/disclaimers' },
      { id: 'validation-rules', label: 'Validation', icon: ClipboardCheck, href: '/settings/validation-rules' },
      { id: 'branding', label: 'Branding', icon: Palette, href: '/settings/branding', mspOnly: true },
    ],
  },
  {
    title: 'Automation',
    tabs: [
      { id: 'hr-sync', label: 'HR Sync', icon: RefreshCw, href: '/settings/hr-sync' },
      { id: 'automation', label: 'Workflows', icon: Zap, href: '/settings/automation' },
    ],
  },
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

  function isActive(tab: SettingsTab): boolean {
    if (tab.href === '/settings') {
      return pathname === '/settings';
    }
    return pathname.startsWith(tab.href);
  }

  return (
    <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:sticky lg:top-6">
      {sections.map((section) => {
        const visibleTabs = section.tabs.filter(tab => !tab.mspOnly || isMsp);
        if (visibleTabs.length === 0) return null;
        return (
          <div key={section.title} className="lg:mb-3">
            <p className="hidden lg:block text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider px-4 mb-1">
              {section.title}
            </p>
            {visibleTabs.map((tab) => {
              const active = isActive(tab);
              const TabIcon = tab.icon;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors whitespace-nowrap text-sm ${
                    active
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}
