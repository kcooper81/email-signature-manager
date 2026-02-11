'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileSignature,
  Users,
  Send,
  Link2,
  BarChart3,
  Settings,
  BookOpen,
  Menu,
  X,
  Headphones,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeedbackWidget } from '@/components/feedback';
import { createClient } from '@/lib/supabase/client';

const mainNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Templates',
    href: '/templates',
    icon: FileSignature,
  },
  {
    title: 'Team Members',
    href: '/team',
    icon: Users,
  },
  {
    title: 'Deployments',
    href: '/deployments',
    icon: Send,
  },
  {
    title: 'Integrations',
    href: '/integrations',
    icon: Link2,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
];

const bottomNavItems = [
  {
    title: 'Documentation',
    href: '/support',
    icon: BookOpen,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

const feedbackItem = {
  title: 'Help & Support',
  icon: Headphones,
};

export function DashboardNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [isMspOrg, setIsMspOrg] = useState(false);

  useEffect(() => {
    const checkMspStatus = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: userData } = await supabase
        .from('users')
        .select('organization_id')
        .eq('auth_id', user.id)
        .single();

      if (userData?.organization_id) {
        const { data: orgData } = await supabase
          .from('organizations')
          .select('organization_type')
          .eq('id', userData.organization_id)
          .single();

        setIsMspOrg(orgData?.organization_type === 'msp');
      }
    };
    checkMspStatus();
  }, []);

  // Build nav items dynamically based on org type
  const navItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { title: 'Templates', href: '/templates', icon: FileSignature },
    { title: 'Team Members', href: '/team', icon: Users },
    ...(isMspOrg ? [{ title: 'Clients', href: '/clients', icon: Building2 }] : []),
    { title: 'Deployments', href: '/deployments', icon: Send },
    { title: 'Integrations', href: '/integrations', icon: Link2 },
    { title: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  const renderNavItem = (item: typeof mainNavItems[0], mobile = false) => {
    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => mobile && setMobileMenuOpen(false)}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-violet-600 text-white shadow-sm'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
        )}
      >
        <item.icon className="h-4 w-4" />
        {item.title}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-violet-600 text-white shadow-lg hover:bg-violet-700"
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
          'lg:hidden fixed top-14 left-0 bottom-0 w-64 bg-card border-r z-40 p-3 flex flex-col overflow-y-auto shadow-xl transition-transform duration-300',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Main nav items */}
        <div className="space-y-1.5 flex-1">
          {navItems.map((item) => renderNavItem(item, true))}
        </div>

        {/* Bottom nav items */}
        <div className="space-y-1.5 pt-4 border-t">
          {bottomNavItems.map((item) => renderNavItem(item, true))}
          <button
            onClick={() => {
              setFeedbackOpen(true);
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 text-muted-foreground hover:bg-accent hover:text-foreground w-full"
          >
            <feedbackItem.icon className="h-4 w-4" />
            {feedbackItem.title}
          </button>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex w-52 border-r bg-card h-[calc(100vh-3.5rem)] sticky top-14 p-3 flex-col overflow-y-auto shadow-sm">
        {/* Main nav items */}
        <div className="space-y-1.5 flex-1">
          {navItems.map((item) => renderNavItem(item))}
        </div>

        {/* Bottom nav items */}
        <div className="space-y-1.5 pt-4 border-t">
          {bottomNavItems.map((item) => renderNavItem(item))}
          <button
            onClick={() => setFeedbackOpen(true)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 text-muted-foreground hover:bg-accent hover:text-foreground w-full text-left"
          >
            <feedbackItem.icon className="h-4 w-4" />
            {feedbackItem.title}
          </button>
        </div>
      </nav>

      {/* Feedback Modal */}
      <FeedbackWidget isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </>
  );
}
