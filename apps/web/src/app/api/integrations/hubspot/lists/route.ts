import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getHubSpotLists } from '@/lib/hubspot/crm';
import { refreshHubSpotToken } from '@/lib/hubspot/oauth';
import { logException } from '@/lib/error-logging';

export async function GET(request: NextRequest) {
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

      const { error: tokenErr } = await supabase
        .from('provider_connections')
        .update({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          token_expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
        })
        .eq('id', connection.id);
      if (tokenErr) console.error('Failed to persist refreshed HubSpot token:', tokenErr);
    }

    const lists = await getHubSpotLists(accessToken);

    return NextResponse.json({
      success: true,
      lists,
    });
  } catch (error: any) {
    console.error('Failed to fetch HubSpot lists:', error);
    
    await logException(error, {
      route: '/api/integrations/hubspot/lists',
      method: 'GET',
      errorType: 'integration_error',
      metadata: { provider: 'hubspot' },
    });

    return NextResponse.json(
      { error: error.message || 'Failed to fetch lists' },
      { status: 500 }
    );
  }
}
