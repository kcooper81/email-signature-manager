import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { EmployeeHeader } from '@/components/employee/header';

export default async function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get user data including role
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id, email, first_name, last_name, role, organization_id, organizations!users_organization_id_organizations_id_fk(name)')
    .eq('auth_id', user.id)
    .maybeSingle();

  if (userError || !userData) {
    console.error('Failed to fetch user data in employee layout:', {
      auth_id: user.id,
      error: userError,
      hasData: !!userData
    });
    // User exists in auth but not in users table - redirect to setup
    redirect('/setup-profile');
  }

  // If user is owner or admin, redirect to full dashboard
  if (userData.role === 'owner' || userData.role === 'admin') {
    redirect('/dashboard');
  }

  const orgName = (userData.organizations as any)?.name || 'Your Organization';

  return (
    <div className="min-h-screen bg-background">
      <EmployeeHeader 
        user={user} 
        userName={`${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.email}
        orgName={orgName}
      />
      <main className="container max-w-4xl mx-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
