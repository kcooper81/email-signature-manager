import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { listWorkspaceUsers } from '@/lib/google/gmail';
import { createAuthenticatedClient } from '@/lib/google/oauth';
import { getPlan } from '@/lib/billing/plans';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id, email')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.organization_id) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
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

    // Extract domain from user's email
    const domain = userData.email.split('@')[1];
    if (!domain) {
      return NextResponse.json(
        { error: 'Could not determine workspace domain' },
        { status: 400 }
      );
    }

    // Check if token is expired and refresh if needed
    let accessToken = connection.access_token;
    const expiresAt = connection.token_expires_at ? new Date(connection.token_expires_at) : null;

    if (expiresAt && expiresAt < new Date()) {
      const auth = createAuthenticatedClient(connection.access_token, connection.refresh_token);
      const { credentials } = await auth.refreshAccessToken();
      
      accessToken = credentials.access_token!;

      await supabase
        .from('provider_connections')
        .update({
          access_token: credentials.access_token,
          refresh_token: credentials.refresh_token || connection.refresh_token,
          token_expires_at: credentials.expiry_date 
            ? new Date(credentials.expiry_date).toISOString() 
            : null,
        })
        .eq('id', connection.id);
    }

    const workspaceUsers = await listWorkspaceUsers(
      accessToken,
      connection.refresh_token,
      domain
    );

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
    const devBypass = process.env.NEXT_PUBLIC_BYPASS_PAY_GATES === 'true';

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

    const usersToUpsert = usersToSync.map((workspaceUser) => ({
      email: workspaceUser.email,
      first_name: workspaceUser.name.split(' ')[0] || workspaceUser.name,
      last_name: workspaceUser.name.split(' ').slice(1).join(' ') || undefined,
      title: workspaceUser.title,
      department: workspaceUser.department,
      organization_id: userData.organization_id,
      role: 'member' as const,
      source: 'google' as const,
    }));

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

    return NextResponse.json({
      success: true,
      count: upsertedUsers?.length || 0,
      total: workspaceUsers.length,
    });
  } catch (error: any) {
    console.error('Google sync error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { error: error.message || 'Sync failed' },
      { status: 500 }
    );
  }
}
