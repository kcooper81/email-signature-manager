import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { listMicrosoftUsers } from '@/lib/microsoft/graph';
import { refreshMicrosoftToken } from '@/lib/microsoft/oauth';
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
      .select('organization_id')
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
      .eq('provider', 'microsoft')
      .single();

    if (!connection) {
      return NextResponse.json(
        { error: 'Microsoft 365 not connected' },
        { status: 404 }
      );
    }

    let accessToken = connection.access_token;
    const expiresAt = new Date(connection.token_expires_at);

    if (expiresAt < new Date()) {
      const tokens = await refreshMicrosoftToken(connection.refresh_token);
      accessToken = tokens.access_token;

      await supabase
        .from('provider_connections')
        .update({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          token_expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
        })
        .eq('id', connection.id);
    }

    const microsoftUsers = await listMicrosoftUsers(accessToken);

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
    let usersToSync = microsoftUsers;
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
      usersToSync = microsoftUsers.slice(0, availableSlots);
    }

    // Get existing users to preserve their roles and auth_ids
    const filteredUsers = usersToSync.filter(u => u.mail || u.userPrincipalName);
    const existingEmails = filteredUsers.map(u => u.mail || u.userPrincipalName);
    const { data: existingUsers } = await supabase
      .from('users')
      .select('email, role, is_admin, auth_id')
      .eq('organization_id', userData.organization_id)
      .in('email', existingEmails);

    const existingUserMap = new Map(
      (existingUsers || []).map(u => [u.email, u])
    );

    const usersToUpsert = filteredUsers.map((msUser) => {
      const email = msUser.mail || msUser.userPrincipalName;
      const existing = existingUserMap.get(email);
      return {
        email,
        first_name: msUser.givenName || null,
        last_name: msUser.surname || null,
        title: msUser.jobTitle || null,
        department: msUser.department || null,
        company: msUser.companyName || null,
        office_location: msUser.officeLocation || null,
        phone: msUser.businessPhones?.[0] || msUser.mobilePhone || null,
        mobile: msUser.mobilePhone || null,
        organization_id: userData.organization_id,
        // Preserve existing role/is_admin if user exists, otherwise default to member
        role: existing?.role || 'member' as const,
        is_admin: existing?.is_admin || false,
        source: 'microsoft' as const,
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
      console.error('Failed to sync Microsoft users:', upsertError);
      console.error('Upsert error details:', JSON.stringify(upsertError, null, 2));
      return NextResponse.json(
        { error: 'Failed to sync users', details: upsertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      count: upsertedUsers?.length || 0,
      total: microsoftUsers.length,
    });
  } catch (error: any) {
    console.error('Microsoft sync error:', error);
    
    await logException(error, {
      route: '/api/integrations/microsoft/sync',
      method: 'POST',
      errorType: 'sync_error',
    });

    return NextResponse.json(
      { error: error.message || 'Sync failed' },
      { status: 500 }
    );
  }
}
