'use client';

import { useState } from 'react';
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
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    title: 'Help & Support',
    href: '/support',
    icon: HelpCircle,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          {mainNavItems.map((item) => renderNavItem(item, true))}
        </div>

        {/* Bottom nav items */}
        <div className="space-y-1.5 pt-4 border-t">
          {bottomNavItems.map((item) => renderNavItem(item, true))}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex w-52 border-r bg-card h-[calc(100vh-3.5rem)] sticky top-14 p-3 flex-col overflow-y-auto shadow-sm">
        {/* Main nav items */}
        <div className="space-y-1.5 flex-1">
          {mainNavItems.map((item) => renderNavItem(item))}
        </div>

        {/* Bottom nav items */}
        <div className="space-y-1.5 pt-4 border-t">
          {bottomNavItems.map((item) => renderNavItem(item))}
        </div>
      </nav>
    </>
  );
}
