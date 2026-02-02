import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardNav } from '@/components/dashboard/nav';
import { DashboardHeader } from '@/components/dashboard/header';
import { FeedbackWidget } from '@/components/feedback';
import { SubscriptionProvider } from '@/components/providers/subscription-provider';
import { DevBypassIndicator } from '@/components/billing';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <SubscriptionProvider>
      <div className="min-h-screen bg-slate-50">
        <DashboardHeader user={user} />
        <div className="flex">
          <DashboardNav />
          <main className="flex-1 p-6">{children}</main>
        </div>
        <FeedbackWidget />
        <DevBypassIndicator />
      </div>
    </SubscriptionProvider>
  );
}
