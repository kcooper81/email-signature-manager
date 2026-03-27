import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { listWorkspaceUsersWithClient } from '@/lib/google/gmail';
import { createOrgGoogleClient } from '@/lib/google/oauth';
import { listUsersWithServiceAccount } from '@/lib/google/service-account';
import { getPlan } from '@/lib/billing/plans';
import { logException } from '@/lib/error-logging';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id, email, role')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.organization_id) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Only owners and admins can trigger a sync
    if (!['owner', 'admin'].includes(userData.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions. Only owners and admins can sync users.' },
        { status: 403 }
      );
    }

    const { data: connection } = await supabase
      .from('provider_connections')
      .select('*')
      .eq('organization_id', userData.organization_id)
      .eq('provider', 'google')
      .single();

    if (!connection) {
      return NextResponse.json(
        { error: 'Google Workspace not connected' },
        { status: 404 }
      );
    }

    // Extract domain from connection (marketplace) or user's email (oauth)
    const domain = connection.domain || userData.email.split('@')[1];
    if (!domain) {
      return NextResponse.json(
        { error: 'Could not determine workspace domain' },
        { status: 400 }
      );
    }

    let workspaceUsers;

    // Check auth type - Marketplace uses service account, OAuth uses user tokens
    if (connection.auth_type === 'marketplace') {
      // Use service account with domain-wide delegation
      const adminEmail = connection.admin_email || userData.email;
      workspaceUsers = await listUsersWithServiceAccount(adminEmail, domain);
    } else {
      // OAuth flow — use createOrgGoogleClient for automatic token refresh + persistence
      const googleAuth = await createOrgGoogleClient(userData.organization_id);
      workspaceUsers = await listWorkspaceUsersWithClient(googleAuth, domain);
    }

    // Check plan limits before syncing
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('plan')
      .eq('organization_id', userData.organization_id)
      .single();

    const planId = subscription?.plan || 'free';
    const plan = getPlan(planId);
    const maxUsers = plan.features.maxUsers;

    // Count existing users
    const { count: existingUserCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', userData.organization_id);

    const currentCount = existingUserCount || 0;

    // Check if dev bypass is enabled
    const devBypass = process.env.BYPASS_PAY_GATES === 'true';

    // Filter users to only sync up to the limit (unless unlimited or dev bypass)
    let usersToSync = workspaceUsers;
    if (!devBypass && maxUsers !== -1) {
      const availableSlots = maxUsers - currentCount;
      if (availableSlots <= 0) {
        return NextResponse.json(
          { 
            error: 'User limit reached',
            message: `Your ${plan.name} plan allows up to ${maxUsers} users. Please upgrade to add more team members.`,
            limit: maxUsers,
            current: currentCount
          },
          { status: 403 }
        );
      }
      // Only sync users that fit within the limit
      usersToSync = workspaceUsers.slice(0, availableSlots);
    }

    // Get existing users to preserve their roles and auth_ids
    const existingEmails = usersToSync.map(u => u.email);
    const { data: existingUsers } = await supabase
      .from('users')
      .select('email, role, is_admin, auth_id')
      .eq('organization_id', userData.organization_id)
      .in('email', existingEmails);

    const existingUserMap = new Map(
      (existingUsers || []).map(u => [u.email, u])
    );

    const usersToUpsert = usersToSync.map((workspaceUser) => {
      const existing = existingUserMap.get(workspaceUser.email);
      return {
        email: workspaceUser.email,
        first_name: (workspaceUser.name || '').split(' ')[0] || workspaceUser.name || null,
        last_name: (workspaceUser.name || '').split(' ').slice(1).join(' ') || null,
        title: workspaceUser.title,
        department: workspaceUser.department,
        organization_id: userData.organization_id,
        // Preserve existing role/is_admin if user exists, otherwise default to member
        role: existing?.role || 'member' as const,
        is_admin: existing?.is_admin || false,
        source: 'google' as const,
      };
    });

    const { data: upsertedUsers, error: upsertError } = await supabase
      .from('users')
      .upsert(usersToUpsert, {
        onConflict: 'email,organization_id',
        ignoreDuplicates: false,
      })
      .select();

    if (upsertError) {
      console.error('Failed to sync Google Workspace users:', upsertError);
      return NextResponse.json(
        { error: 'Failed to sync users' },
        { status: 500 }
      );
    }

    // Update last_sync_at timestamp
    await supabase
      .from('provider_connections')
      .update({ last_sync_at: new Date().toISOString() })
      .eq('id', connection.id);

    return NextResponse.json({
      success: true,
      count: upsertedUsers?.length || 0,
      total: workspaceUsers.length,
    });
  } catch (error: any) {
    console.error('Google sync error:', error);

    // Handle known Google API errors without logging them as exceptions
    const msg = error.message || '';
    if (msg.includes('Domain not found') || msg.includes('Resource Not Found: domain')) {
      return NextResponse.json(
        { error: 'Google Workspace domain not found. Check your organization domain in Settings.' },
        { status: 400 }
      );
    }
    if (msg.includes('Not Authorized') || msg.includes('insufficient')) {
      return NextResponse.json(
        { error: 'Insufficient permissions. The connected Google account needs Admin Directory access to sync users. Please reconnect with an admin account.' },
        { status: 403 }
      );
    }

    await logException(error, {
      route: '/api/integrations/google/sync',
      method: 'POST',
      errorType: 'sync_error',
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
