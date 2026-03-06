import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { AdminNav } from '@/components/admin/nav';
import { AdminHeader } from '@/components/admin/header';
import { ADMIN_VIEW_ROUTES, DEFAULT_SUPPORT_VIEWS } from '@/lib/admin/views';
import type { SuperAdminRole } from '@/lib/admin/views';

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

  const { data: userData } = await supabase
    .from('users')
    .select('is_super_admin, super_admin_role, super_admin_allowed_views')
    .eq('auth_id', user.id)
    .single();

  const isSuperAdmin = userData?.is_super_admin === true;

  if (!isSuperAdmin) {
    redirect('/dashboard');
  }

  const role = (userData?.super_admin_role as SuperAdminRole) || 'super_admin';

  // Parse allowed views for support users
  let allowedViews: string[] | null = null;
  if (role === 'support') {
    try {
      allowedViews = userData?.super_admin_allowed_views
        ? JSON.parse(userData.super_admin_allowed_views)
        : DEFAULT_SUPPORT_VIEWS;
    } catch {
      allowedViews = DEFAULT_SUPPORT_VIEWS;
    }

    // Build allowed route prefixes from view keys
    const allowedRoutes = allowedViews!.map(key => ADMIN_VIEW_ROUTES[key]).filter(Boolean);

    const headerStore = headers();
    const pathname = headerStore.get('x-pathname') || '';

    const isAllowed = allowedRoutes.some(route => {
      if (route === '/admin') return pathname === '/admin';
      return pathname === route || pathname.startsWith(route + '/');
    });

    if (!isAllowed) {
      const firstRoute = allowedRoutes[0] || '/admin/tickets';
      redirect(firstRoute);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader user={user} role={role} />
      <div className="flex">
        <AdminNav role={role} allowedViews={allowedViews} />
        <main className="flex-1 p-3 sm:p-4 md:p-6 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
