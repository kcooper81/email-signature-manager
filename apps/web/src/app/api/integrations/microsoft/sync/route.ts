import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { listMicrosoftUsers } from '@/lib/microsoft/graph';
import { refreshMicrosoftToken } from '@/lib/microsoft/oauth';

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

    const usersToUpsert = microsoftUsers
      .filter(u => u.mail || u.userPrincipalName)
      .map((msUser) => ({
        email: msUser.mail || msUser.userPrincipalName,
        first_name: msUser.givenName,
        last_name: msUser.surname,
        title: msUser.jobTitle,
        department: msUser.department,
        phone: msUser.businessPhones?.[0] || msUser.mobilePhone,
        mobile: msUser.mobilePhone,
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
      console.error('Failed to sync Microsoft users:', upsertError);
      return NextResponse.json(
        { error: 'Failed to sync users' },
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
