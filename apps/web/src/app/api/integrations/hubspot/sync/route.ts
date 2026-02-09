import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { refreshHubSpotToken } from '@/lib/hubspot/oauth';
import { getContactsFromList, listHubSpotContacts } from '@/lib/hubspot/crm';
import { getPlan } from '@/lib/billing/plans';
import { logException } from '@/lib/error-logging';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get optional listId from request body
    const body = await request.json().catch(() => ({}));
    const listId = body.listId;

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
      .eq('provider', 'hubspot')
      .single();

    if (!connection) {
      return NextResponse.json(
        { error: 'HubSpot not connected' },
        { status: 404 }
      );
    }

    let accessToken = connection.access_token;
    const expiresAt = new Date(connection.token_expires_at);

    if (expiresAt < new Date()) {
      const tokens = await refreshHubSpotToken(connection.refresh_token);
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

    // Sync from specific list or all contacts with employee filter
    const contacts = listId 
      ? await getContactsFromList(accessToken, listId)
      : await listHubSpotContacts(accessToken);

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

    // Filter contacts to only sync up to the limit (unless unlimited or dev bypass)
    let contactsToSync = contacts;
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
      // Only sync contacts that fit within the limit
      contactsToSync = contacts.slice(0, availableSlots);
    }

    // Get existing users to preserve their roles and auth_ids
    const existingEmails = contactsToSync.map(c => c.email);
    const { data: existingUsers } = await supabase
      .from('users')
      .select('email, role, is_admin, auth_id')
      .eq('organization_id', userData.organization_id)
      .in('email', existingEmails);

    const existingUserMap = new Map(
      (existingUsers || []).map(u => [u.email, u])
    );

    const usersToUpsert = contactsToSync.map((contact) => {
      const existing = existingUserMap.get(contact.email);
      return {
        email: contact.email,
        first_name: contact.firstName,
        last_name: contact.lastName,
        title: contact.jobTitle,
        department: contact.department,
        phone: contact.phone,
        mobile: contact.mobilePhone,
        organization_id: userData.organization_id,
        // Preserve existing role/is_admin if user exists, otherwise default to member
        role: existing?.role || 'member' as const,
        is_admin: existing?.is_admin || false,
        source: 'hubspot' as const,
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
      console.error('Failed to sync HubSpot contacts:', upsertError);
      return NextResponse.json(
        { error: 'Failed to sync contacts' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      count: upsertedUsers?.length || 0,
      total: contacts.length,
    });
  } catch (error: any) {
    console.error('HubSpot sync error:', error);
    
    await logException(error, {
      route: '/api/integrations/hubspot/sync',
      method: 'POST',
      errorType: 'sync_error',
      metadata: { provider: 'hubspot' },
    });

    return NextResponse.json(
      { error: error.message || 'Sync failed' },
      { status: 500 }
    );
  }
}
