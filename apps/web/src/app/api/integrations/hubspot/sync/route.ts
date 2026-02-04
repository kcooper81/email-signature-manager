import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { listHubSpotContacts } from '@/lib/hubspot/crm';
import { refreshHubSpotToken } from '@/lib/hubspot/oauth';

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

    const contacts = await listHubSpotContacts(accessToken);

    const usersToUpsert = contacts.map((contact) => ({
      email: contact.email,
      first_name: contact.firstName,
      last_name: contact.lastName,
      title: contact.jobTitle,
      department: contact.department,
      phone: contact.phone,
      mobile: contact.mobilePhone,
      organization_id: userData.organization_id,
      role: 'member' as const,
    }));

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
      synced: upsertedUsers?.length || 0,
      total: contacts.length,
    });
  } catch (error: any) {
    console.error('HubSpot sync error:', error);
    return NextResponse.json(
      { error: error.message || 'Sync failed' },
      { status: 500 }
    );
  }
}
