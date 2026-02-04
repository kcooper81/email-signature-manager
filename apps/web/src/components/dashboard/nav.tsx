'use client';

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
} from 'lucide-react';

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

  const renderNavItem = (item: typeof mainNavItems[0]) => {
    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-violet-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        )}
      >
        <item.icon className="h-4 w-4" />
        {item.title}
      </Link>
    );
  };

  return (
    <nav className="w-52 border-r bg-white h-[calc(100vh-3.5rem)] sticky top-14 p-3 flex flex-col overflow-y-auto">
      {/* Main nav items */}
      <div className="space-y-1.5 flex-1">
        {mainNavItems.map(renderNavItem)}
      </div>

      {/* Bottom nav items */}
      <div className="space-y-1.5 pt-4 border-t border-gray-100">
        {bottomNavItems.map(renderNavItem)}
      </div>
    </nav>
  );
}
