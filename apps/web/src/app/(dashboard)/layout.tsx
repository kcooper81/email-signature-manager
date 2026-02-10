import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardNav } from '@/components/dashboard/nav';
import { DashboardHeader } from '@/components/dashboard/header';
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

  // Check user role and super admin status
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('is_super_admin, email, role')
    .eq('auth_id', user.id)
    .single();

  // If user not found in users table, or is a member (not owner/admin), redirect to employee portal
  // This prevents users who exist in auth but not in users table from accessing the dashboard
  if (!userData || userData.role === 'member' || (userData.role !== 'owner' && userData.role !== 'admin')) {
    redirect('/my-profile');
  }

  const isSuperAdmin = userData?.is_super_admin === true;

  return (
    <EnsureUserProvider>
      <ImpersonationProvider>
        <SubscriptionProvider>
          <ImpersonationBanner />
          <div className="min-h-screen bg-background">
            <DashboardHeader user={user} isAdmin={isSuperAdmin} />
            <div className="flex">
              <DashboardNav />
              <main className="flex-1 p-3 sm:p-4 md:p-6 min-w-0 overflow-x-hidden">{children}</main>
            </div>
            <DevBypassIndicator />
            <DevBypassToggle />
          </div>
        </SubscriptionProvider>
      </ImpersonationProvider>
    </EnsureUserProvider>
  );
}
