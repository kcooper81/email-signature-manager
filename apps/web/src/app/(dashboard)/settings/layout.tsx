'use client';

import { PageHeader } from '@/components/dashboard';
import { SettingsNav } from '@/components/dashboard/settings-nav';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
      />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-56 shrink-0">
          <SettingsNav />
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
