import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { AdminNav } from '@/components/admin/nav';
import { AdminHeader } from '@/components/admin/header';

export type SuperAdminRole = 'super_admin' | 'support';

// Routes accessible to support role users
const SUPPORT_ALLOWED_ROUTES = ['/admin/tickets', '/admin/testing-guide'];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user has super admin flag in database (platform-level access)
  // is_super_admin = platform admins who can access /admin panel
  // is_admin = organization-level admins who can manage their team
  const { data: userData } = await supabase
    .from('users')
    .select('is_super_admin, super_admin_role')
    .eq('auth_id', user.id)
    .single();

  const isSuperAdmin = userData?.is_super_admin === true;

  if (!isSuperAdmin) {
    redirect('/dashboard');
  }

  const role = (userData?.super_admin_role as SuperAdminRole) || 'super_admin';

  // Block support users from restricted admin routes via direct URL
  if (role === 'support') {
    const headerStore = headers();
    const pathname = headerStore.get('x-pathname') || '';
    const isAllowed = SUPPORT_ALLOWED_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + '/')
    );
    if (!isAllowed) {
      redirect('/admin/tickets');
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader user={user} role={role} />
      <div className="flex">
        <AdminNav role={role} />
        <main className="flex-1 p-3 sm:p-4 md:p-6 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
