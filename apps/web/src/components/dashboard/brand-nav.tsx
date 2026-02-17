'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Palette, Shield, Image, LayoutDashboard } from 'lucide-react';

const tabs = [
  { label: 'Overview', icon: LayoutDashboard, href: '/brand' },
  { label: 'Guidelines', icon: Palette, href: '/brand/guidelines' },
  { label: 'Audit', icon: Shield, href: '/brand/audit' },
  { label: 'Assets', icon: Image, href: '/brand/assets' },
];

export function BrandNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 border-b mb-6 overflow-x-auto">
      {tabs.map((tab) => {
        const active = tab.href === '/brand'
          ? pathname === '/brand'
          : pathname.startsWith(tab.href);
        const TabIcon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${
              active
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <TabIcon className="h-4 w-4" />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
