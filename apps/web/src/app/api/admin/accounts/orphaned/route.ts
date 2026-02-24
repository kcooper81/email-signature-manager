import { NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { createUserWithOrganization } from '@/lib/auth/create-user-org';
import type { User } from '@supabase/supabase-js';

interface ProfileIssue {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  organizationId: string | null;
  organizationName: string | null;
  authId: string | null;
  isActive: boolean;
  createdAt: string;
  issues: string[];
}

/**
 * GET: List orphaned auth users AND users with profile/setup issues.
 * Orphaned = exists in auth.users but no users record.
 * Profile issues = users record exists but has incomplete data or missing links.
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

    // Get ALL user records for cross-referencing
    const { data: allUsers } = await supabaseAdmin
      .from('users')
      .select('id, auth_id, email, first_name, last_name, role, organization_id, is_active, created_at');

    const linkedAuthIds = new Set(
      allUsers?.map((u: any) => u.auth_id).filter(Boolean) || []
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

    // --- Profile issues: users with incomplete/broken records ---
    // Get org names for users that have an org
    const orgIds = [...new Set(
      (allUsers || []).map((u: any) => u.organization_id).filter(Boolean)
    )];

    let orgNameMap = new Map<string, string>();
    if (orgIds.length > 0) {
      const { data: orgs } = await supabaseAdmin
        .from('organizations')
        .select('id, name')
        .in('id', orgIds);
      orgs?.forEach((o: any) => orgNameMap.set(o.id, o.name));
    }

    // Check which orgs have subscriptions
    let orgSubMap = new Map<string, boolean>();
    if (orgIds.length > 0) {
      const { data: subs } = await supabaseAdmin
        .from('subscriptions')
        .select('organization_id')
        .in('organization_id', orgIds);
      subs?.forEach((s: any) => orgSubMap.set(s.organization_id, true));
    }

    const profileIssues: ProfileIssue[] = [];

    for (const u of (allUsers || []) as any[]) {
      const issues: string[] = [];

      if (!u.organization_id) {
        issues.push('No organization');
      }
      if (!u.auth_id) {
        issues.push('No auth link (cannot sign in)');
      }
      if (!u.first_name?.trim()) {
        issues.push('Missing first name');
      }
      if (!u.last_name?.trim()) {
        issues.push('Missing last name');
      }
      if (!u.email?.trim()) {
        issues.push('Missing email');
      }
      if (u.is_active === false) {
        issues.push('Account deactivated');
      }
      // Check if their org actually exists (dangling FK)
      if (u.organization_id && !orgNameMap.has(u.organization_id)) {
        issues.push('Organization not found (dangling reference)');
      }
      // Check if org is missing a subscription
      if (u.organization_id && u.role === 'owner' && !orgSubMap.has(u.organization_id)) {
        issues.push('Organization has no subscription');
      }

      if (issues.length > 0) {
        profileIssues.push({
          userId: u.id,
          email: u.email || '',
          firstName: u.first_name,
          lastName: u.last_name,
          role: u.role || 'unknown',
          organizationId: u.organization_id,
          organizationName: u.organization_id ? (orgNameMap.get(u.organization_id) || null) : null,
          authId: u.auth_id,
          isActive: u.is_active !== false,
          createdAt: u.created_at,
          issues,
        });
      }
    }

    return NextResponse.json({ orphaned, profileIssues });
  } catch (error: any) {
    console.error('Orphaned users error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
