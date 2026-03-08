import { NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { createUserWithOrganization } from '@/lib/auth/create-user-org';
import type { User } from '@supabase/supabase-js';

/**
 * GET: List auth users who don't have a corresponding users/organizations record.
 * These are "orphaned" signups — typically from Google SSO where setup-profile was never completed.
 */
export async function GET() {
  try {
    const supabase = createClient();
    const supabaseAdmin = createServiceClient();

    // Verify super admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: adminCheck } = await supabaseAdmin
      .from('users')
      .select('is_super_admin')
      .eq('auth_id', user.id)
      .single();

    if (!adminCheck?.is_super_admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // --- Orphaned auth users ---
    const { data: authData, error: listError } = await supabaseAdmin.auth.admin.listUsers({
      perPage: 1000,
    });

    if (listError) {
      return NextResponse.json({ error: 'Failed to list auth users' }, { status: 500 });
    }

    const authUsers = authData?.users || [];

    // Get all auth_ids that have user records
    const { data: allUsers } = await supabaseAdmin
      .from('users')
      .select('auth_id');

    const linkedAuthIds = new Set(
      allUsers?.map((u: { auth_id: string | null }) => u.auth_id).filter(Boolean) || []
    );

    const orphaned = authUsers
      .filter((au: User) => !linkedAuthIds.has(au.id))
      .map((au: User) => ({
        authId: au.id,
        email: au.email || '',
        provider: au.app_metadata?.provider || 'unknown',
        firstName: au.user_metadata?.first_name || au.user_metadata?.given_name || '',
        lastName: au.user_metadata?.last_name || au.user_metadata?.family_name || '',
        createdAt: au.created_at,
      }));

    return NextResponse.json({ orphaned });
  } catch (error: any) {
    console.error('Orphaned users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST: Fix an orphaned user by creating their organization + user record.
 * Body: { authId: string }
 */
export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const supabaseAdmin = createServiceClient();

    // Verify super admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: adminCheck } = await supabaseAdmin
      .from('users')
      .select('is_super_admin')
      .eq('auth_id', user.id)
      .single();

    if (!adminCheck?.is_super_admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { authId } = await request.json();
    if (!authId) {
      return NextResponse.json({ error: 'authId is required' }, { status: 400 });
    }

    // Fetch the auth user
    const { data: authUser, error: fetchError } = await supabaseAdmin.auth.admin.getUserById(authId);
    if (fetchError || !authUser?.user) {
      return NextResponse.json({ error: 'Auth user not found' }, { status: 404 });
    }

    const au = authUser.user;
    const metadata = au.user_metadata || {};
    const email = au.email || '';
    const firstName = metadata.first_name || metadata.given_name || email.split('@')[0] || 'User';
    const lastName = metadata.last_name || metadata.family_name || '';
    const organizationName = metadata.organization_name || `${firstName}'s Organization`;

    // Check if a users record already exists (race condition guard)
    const { data: existing } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('auth_id', authId)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'User record already exists', userId: existing.id }, { status: 409 });
    }

    const result = await createUserWithOrganization({
      supabaseAdmin,
      authId,
      email,
      firstName,
      lastName,
      organizationName,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      organizationId: result.organizationId,
    });
  } catch (error: any) {
    console.error('Fix orphaned user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
