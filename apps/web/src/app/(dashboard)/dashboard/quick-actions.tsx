'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Plus,
  Rocket,
  RefreshCw,
  BarChart3,
} from 'lucide-react';

const actions = [
  {
    label: 'Create Template',
    href: '/templates/new',
    icon: Plus,
    color: 'bg-violet-100 text-violet-600 hover:bg-violet-200',
  },
  {
    label: 'Deploy Signatures',
    href: '/deployments',
    icon: Rocket,
    color: 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200',
  },
  {
    label: 'Sync Users',
    href: '/integrations',
    icon: RefreshCw,
    color: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
  },
  {
    label: 'View Analytics',
    href: '/analytics',
    icon: BarChart3,
    color: 'bg-amber-100 text-amber-600 hover:bg-amber-200',
  },
];

export function QuickActionsPanel() {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {actions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Button
                variant="ghost"
                className={`${action.color} gap-2 transition-colors`}
              >
                <action.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{action.label}</span>
                <span className="sm:hidden">{action.label.split(' ')[0]}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
