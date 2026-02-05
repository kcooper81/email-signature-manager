import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardNav } from '@/components/dashboard/nav';
import { DashboardHeader } from '@/components/dashboard/header';
import { FeedbackWidget } from '@/components/feedback';
import { SubscriptionProvider } from '@/components/providers/subscription-provider';
import { DevBypassIndicator, DevBypassToggle } from '@/components/billing';

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
      <div className="min-h-screen bg-background">
        <DashboardHeader user={user} />
        <div className="flex">
          <DashboardNav />
          <main className="flex-1 p-6 min-w-0 overflow-x-hidden">{children}</main>
        </div>
        <FeedbackWidget />
        <DevBypassIndicator />
        <DevBypassToggle />
      </div>
    </SubscriptionProvider>
  );
}
