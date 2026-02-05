import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminNav } from '@/components/admin/nav';
import { AdminHeader } from '@/components/admin/header';

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

  // Check if user has admin flag in database (secure access control)
  const { data: userData } = await supabase
    .from('users')
    .select('is_admin')
    .eq('auth_id', user.id)
    .single();

  const isAdmin = userData?.is_admin === true;

  if (!isAdmin) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader user={user} />
      <div className="flex">
        <AdminNav />
        <main className="flex-1 p-6 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
