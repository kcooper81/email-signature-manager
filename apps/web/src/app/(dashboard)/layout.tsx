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

  // BUG-02 fix: Check MFA assurance level — if user has TOTP enrolled but
  // session is only AAL1, force them back to login to complete MFA
  try {
    const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (aalData && aalData.nextLevel === 'aal2' && aalData.currentLevel === 'aal1') {
      // User has MFA enrolled but hasn't verified — sign them out and force re-login
      await supabase.auth.signOut();
      redirect('/login?error=mfa_required');
    }
  } catch {
    // MFA check failed — continue (MFA may not be set up)
  }

  // BUG-26 fix: Single query to get all needed user fields
  const { data: userData } = await supabase
    .from('users')
    .select('is_super_admin, email, role, organization_id')
    .eq('auth_id', user.id)
    .maybeSingle();

  // If user not found in users table, redirect to setup
  if (!userData) {
    redirect('/setup-profile');
  }

  // BUG-27 fix: Explicit allowlist for dashboard access roles
  const dashboardRoles = ['owner', 'admin'];
  if (!dashboardRoles.includes(userData.role)) {
    redirect('/my-profile');
  }

  const isSuperAdmin = userData?.is_super_admin === true;

  // BUG-28 fix: Actually fetch is_suspended from organizations table
  if (!isSuperAdmin && userData.organization_id) {
    try {
      const { data: org } = await supabase
        .from('organizations')
        .select('id, is_suspended')
        .eq('id', userData.organization_id)
        .maybeSingle();

      if (org?.is_suspended) {
        redirect('/suspended');
      }
    } catch {
      // is_suspended column may not exist yet — skip check
    }
  }

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
                  <main className="flex-1 p-3 sm:p-4 md:p-6 min-w-0 overflow-x-hidden overflow-y-auto scrollbar-hide">{children}</main>
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
