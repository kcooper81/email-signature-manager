import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardNav } from '@/components/dashboard/nav';
import { DashboardHeader } from '@/components/dashboard/header';
import { EnsureUserProvider } from '@/components/providers/ensure-user-provider';
import { SubscriptionProvider } from '@/components/providers/subscription-provider';
import { BrandingProviderWrapper } from '@/components/providers/branding-provider-wrapper';
import { DevBypassIndicator, DevBypassToggle } from '@/components/billing';
import { ImpersonationBanner } from '@/components/admin/impersonation-banner';
import { ImpersonationProvider } from '@/hooks/use-impersonation';
import { PoweredByFooter } from '@/components/dashboard/powered-by-footer';
import { MspContextProvider } from '@/hooks/use-msp-context';
import { MspContextBanner } from '@/components/msp/msp-context-banner';
import { ThemeProvider } from '@/components/providers/theme-provider';

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

  // If user not found in users table, redirect to setup
  if (!userData) {
    redirect('/setup-profile');
  }
  
  // If user is a member (not owner/admin), redirect to employee portal
  if (userData.role === 'member' || (userData.role !== 'owner' && userData.role !== 'admin')) {
    redirect('/my-profile');
  }

  const isSuperAdmin = userData?.is_super_admin === true;

  return (
    <ThemeProvider>
    <EnsureUserProvider>
      <ImpersonationProvider>
        <MspContextProvider>
          <SubscriptionProvider>
            <BrandingProviderWrapper>
              <ImpersonationBanner />
              <MspContextBanner />
              <div className="h-screen bg-background flex flex-col">
                <DashboardHeader user={user} isAdmin={isSuperAdmin} />
                <div className="flex flex-1 min-h-0">
                  <DashboardNav />
                  <main className="flex-1 p-3 sm:p-4 md:p-6 min-w-0 overflow-x-hidden overflow-y-auto">{children}</main>
                </div>
                <PoweredByFooter />
                <DevBypassIndicator />
                <DevBypassToggle />
              </div>
            </BrandingProviderWrapper>
          </SubscriptionProvider>
        </MspContextProvider>
      </ImpersonationProvider>
    </EnsureUserProvider>
    </ThemeProvider>
  );
}
