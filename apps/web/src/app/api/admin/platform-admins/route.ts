import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';

async function verifySuperAdmin(supabaseAdmin: ReturnType<typeof createServiceClient>) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data: userData } = await supabaseAdmin
    .from('users')
    .select('id, is_super_admin, super_admin_role')
    .eq('auth_id', user.id)
    .single();

  if (!userData?.is_super_admin || userData.super_admin_role !== 'super_admin') return null;
  return userData;
}

// GET /api/admin/platform-admins — list all platform admins
export async function GET() {
  try {
    const supabaseAdmin = createServiceClient();
    const admin = await verifySuperAdmin(supabaseAdmin);
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id, email, first_name, last_name, super_admin_role, super_admin_allowed_views, created_at')
      .eq('is_super_admin', true)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Failed to load platform admins:', error);
      return NextResponse.json({ error: 'Failed to load admins' }, { status: 500 });
    }

    return NextResponse.json({ admins: data || [] });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/platform-admins — add a new platform admin
export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = createServiceClient();
    const admin = await verifySuperAdmin(supabaseAdmin);
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { userId, role, allowedViews } = await request.json();

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    if (!role || !['super_admin', 'support'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Check user exists and isn't already admin
    const { data: targetUser } = await supabaseAdmin
      .from('users')
      .select('id, is_super_admin')
      .eq('id', userId)
      .single();

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (targetUser.is_super_admin) {
      return NextResponse.json({ error: 'User is already a platform admin' }, { status: 409 });
    }

    const updateData: Record<string, unknown> = {
      is_super_admin: true,
      super_admin_role: role,
    };

    if (role === 'support' && Array.isArray(allowedViews)) {
      updateData.super_admin_allowed_views = JSON.stringify(allowedViews);
    } else {
      updateData.super_admin_allowed_views = null;
    }

    const { error: updateErr } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', userId);

    if (updateErr) {
      console.error('Failed to add platform admin:', updateErr);
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/admin/platform-admins — update role or views
export async function PATCH(request: NextRequest) {
  try {
    const supabaseAdmin = createServiceClient();
    const admin = await verifySuperAdmin(supabaseAdmin);
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { userId, role, allowedViews } = await request.json();

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};

    if (role) {
      if (!['super_admin', 'support'].includes(role)) {
        return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
      }
      updateData.super_admin_role = role;
      if (role === 'super_admin') {
        updateData.super_admin_allowed_views = null;
      }
    }

    if (Array.isArray(allowedViews)) {
      updateData.super_admin_allowed_views = JSON.stringify(allowedViews);
    }

    const { error: updateErr } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', userId);

    if (updateErr) {
      console.error('Failed to update platform admin:', updateErr);
      return NextResponse.json({ error: 'Failed to update admin' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/platform-admins — remove admin access
export async function DELETE(request: NextRequest) {
  try {
    const supabaseAdmin = createServiceClient();
    const admin = await verifySuperAdmin(supabaseAdmin);
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { userId } = await request.json();

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // Prevent removing yourself
    if (userId === admin.id) {
      return NextResponse.json({ error: 'Cannot remove your own admin access' }, { status: 400 });
    }

    const { error: updateErr } = await supabaseAdmin
      .from('users')
      .update({
        is_super_admin: false,
        super_admin_role: null,
        super_admin_allowed_views: null,
      })
      .eq('id', userId);

    if (updateErr) {
      console.error('Failed to remove platform admin:', updateErr);
      return NextResponse.json({ error: 'Failed to remove admin' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
