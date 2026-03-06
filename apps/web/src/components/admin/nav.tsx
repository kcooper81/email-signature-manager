'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Building2,
  ScrollText,
  CreditCard,
  AlertTriangle,
  Ticket,
  Menu,
  X,
  BookOpen,
  UserPlus,
  Cog,
  MousePointerClick,
  Search,
  ClipboardCheck,
  Shield,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SuperAdminRole } from '@/app/(admin)/layout';

interface NavBadgeCounts {
  newTickets: number;
  unresolvedErrors: number;
  pendingPartners: number;
  pendingSEO: number;
}

type BadgeKey = keyof NavBadgeCounts;

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  badgeKey: BadgeKey | null;
  supportVisible: boolean;
}

interface NavGroup {
  label: string;
  supportVisible: boolean;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: '',
    supportVisible: true,
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, badgeKey: null, supportVisible: false },
    ],
  },
  {
    label: 'Support',
    supportVisible: true,
    items: [
      { href: '/admin/tickets', label: 'Tickets', icon: Ticket, badgeKey: 'newTickets', supportVisible: true },
      { href: '/admin/inbox-settings', label: 'Inbox Settings', icon: Settings, badgeKey: null, supportVisible: false },
      { href: '/admin/help', label: 'Help Articles', icon: BookOpen, badgeKey: null, supportVisible: false },
    ],
  },
  {
    label: 'Customers',
    supportVisible: false,
    items: [
      { href: '/admin/accounts', label: 'Accounts', icon: Building2, badgeKey: null, supportVisible: false },
      { href: '/admin/partner-applications', label: 'Partners', icon: UserPlus, badgeKey: 'pendingPartners', supportVisible: false },
      { href: '/admin/billing', label: 'Subscriptions', icon: CreditCard, badgeKey: null, supportVisible: false },
    ],
  },
  {
    label: 'Growth',
    supportVisible: false,
    items: [
      { href: '/admin/analytics', label: 'Analytics', icon: MousePointerClick, badgeKey: null, supportVisible: false },
      { href: '/admin/seo', label: 'SEO Engine', icon: Search, badgeKey: 'pendingSEO', supportVisible: false },
    ],
  },
  {
    label: 'System',
    supportVisible: false,
    items: [
      { href: '/admin/jobs', label: 'Jobs', icon: Cog, badgeKey: null, supportVisible: false },
      { href: '/admin/activity', label: 'Activity Logs', icon: ScrollText, badgeKey: null, supportVisible: false },
      { href: '/admin/errors', label: 'Error Logs', icon: AlertTriangle, badgeKey: 'unresolvedErrors', supportVisible: false },
      { href: '/admin/platform-admins', label: 'Platform Admins', icon: Shield, badgeKey: null, supportVisible: false },
      { href: '/admin/testing-guide', label: 'Testing Guide', icon: ClipboardCheck, badgeKey: null, supportVisible: true },
    ],
  },
];

interface AdminNavProps {
  role: SuperAdminRole;
}

export function AdminNav({ role }: AdminNavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badges, setBadges] = useState<NavBadgeCounts>({
    newTickets: 0,
    unresolvedErrors: 0,
    pendingPartners: 0,
    pendingSEO: 0,
  });

  const isSupport = role === 'support';

  useEffect(() => {
    loadBadgeCounts();
    const interval = setInterval(loadBadgeCounts, 60000);

    const supabase = createClient();
    const channel = supabase
      .channel('admin-nav-badges')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'feedback' },
        () => {
          loadBadgeCounts();
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'feedback' },
        () => {
          loadBadgeCounts();
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'error_logs' },
        () => {
          loadBadgeCounts();
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'error_logs' },
        () => {
          loadBadgeCounts();
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBadgeCounts = async () => {
    const supabase = createClient();

    if (isSupport) {
      const ticketsResult = await supabase
        .from('feedback')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');

      setBadges({
        newTickets: ticketsResult.count || 0,
        unresolvedErrors: 0,
        pendingPartners: 0,
        pendingSEO: 0,
      });
      return;
    }

    const [ticketsResult, errorsResult, partnersResult, seoResult] = await Promise.all([
      supabase.from('feedback').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('error_logs').select('*', { count: 'exact', head: true }).eq('resolved', false),
      supabase.from('partner_applications').select('*', { count: 'exact', head: true }).in('status', ['pending', 'under_review']),
      supabase.from('seo_recommendations').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    ]);

    setBadges({
      newTickets: ticketsResult.count || 0,
      unresolvedErrors: errorsResult.count || 0,
      pendingPartners: partnersResult.count || 0,
      pendingSEO: seoResult.count || 0,
    });
  };

  const renderNavItem = (item: NavItem, mobile?: boolean) => {
    const isActive = pathname === item.href ||
      (item.href !== '/admin' && pathname.startsWith(item.href));

    const badgeCount = item.badgeKey ? badges[item.badgeKey] : 0;

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => mobile && setMobileMenuOpen(false)}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-slate-800 text-white'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        }`}
      >
        <item.icon className="h-4 w-4" />
        <span className="flex-1">{item.label}</span>
        {badgeCount > 0 && (
          <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
            {badgeCount > 99 ? '99+' : badgeCount}
          </span>
        )}
      </Link>
    );
  };

  const renderNavGroups = (mobile?: boolean) => {
    return navGroups.map((group, idx) => {
      // Filter items for support role
      const items = isSupport
        ? group.items.filter((item) => item.supportVisible)
        : group.items;

      // Hide entire group if no visible items
      if (items.length === 0) return null;
      // Hide group if support and group isn't support-visible (except if it has visible items)
      if (isSupport && !group.supportVisible && items.length === 0) return null;

      return (
        <div key={group.label || idx}>
          {group.label && (
            <p className="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {group.label}
            </p>
          )}
          <div className="space-y-0.5">
            {items.map((item) => renderNavItem(item, mobile))}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-amber-500 text-slate-900 shadow-lg hover:bg-amber-600"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sliding Menu */}
      <nav
        className={cn(
          'lg:hidden fixed top-16 left-0 bottom-0 w-64 bg-slate-900 text-white p-4 z-40 shadow-xl transition-transform duration-300',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {renderNavGroups(true)}
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:block w-64 min-h-[calc(100vh-64px)] bg-slate-900 text-white p-4">
        {renderNavGroups()}
      </nav>
    </>
  );
}
