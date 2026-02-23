import { NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';

/**
 * Verify super admin access for SEO admin API routes.
 * Returns { supabaseAdmin, userId } on success, or a NextResponse error.
 */
export async function verifySuperAdmin(): Promise<
  | { supabaseAdmin: ReturnType<typeof createServiceClient>; userId: string }
  | NextResponse
> {
  const supabase = await createClient();
  const supabaseAdmin = createServiceClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: userData } = await supabaseAdmin
    .from('users')
    .select('id, is_super_admin')
    .eq('auth_id', user.id)
    .single();

  if (!userData?.is_super_admin) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  return { supabaseAdmin, userId: userData.id };
}
