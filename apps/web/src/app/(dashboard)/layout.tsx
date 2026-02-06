import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardNav } from '@/components/dashboard/nav';
import { DashboardHeader } from '@/components/dashboard/header';
import { FeedbackWidget } from '@/components/feedback';
import { EnsureUserProvider } from '@/components/providers/ensure-user-provider';
import { SubscriptionProvider } from '@/components/providers/subscription-provider';
import { DevBypassIndicator, DevBypassToggle } from '@/components/billing';
import { ImpersonationBanner } from '@/components/admin/impersonation-banner';
import { ImpersonationProvider } from '@/hooks/use-impersonation';

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

  // Check if user is an admin
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('is_admin, email')
    .eq('email', user.email)
    .single();

  console.log('Admin check:', { email: user.email, userData, userError });
  const isAdmin = userData?.is_admin === true;

  return (
    <EnsureUserProvider>
      <ImpersonationProvider>
        <SubscriptionProvider>
          <ImpersonationBanner />
          <div className="min-h-screen bg-background">
            <DashboardHeader user={user} isAdmin={isAdmin} />
            <div className="flex">
              <DashboardNav />
              <main className="flex-1 p-3 sm:p-4 md:p-6 min-w-0 overflow-x-hidden">{children}</main>
            </div>
            <FeedbackWidget />
            <DevBypassIndicator />
            <DevBypassToggle />
          </div>
        </SubscriptionProvider>
      </ImpersonationProvider>
    </EnsureUserProvider>
  );
}
