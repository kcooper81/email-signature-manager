'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  ScrollText,
  CreditCard,
  Users,
  AlertTriangle,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/accounts', label: 'Accounts', icon: Building2 },
  { href: '/admin/activity', label: 'Activity Logs', icon: ScrollText },
  { href: '/admin/errors', label: 'Error Logs', icon: AlertTriangle },
  { href: '/admin/billing', label: 'Billing', icon: CreditCard },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 min-h-[calc(100vh-64px)] bg-slate-900 text-white p-4">
      <div className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
