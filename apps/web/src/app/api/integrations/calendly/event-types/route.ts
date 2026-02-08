import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getAllEventTypes } from '@/lib/calendly/api';
import { refreshCalendlyToken } from '@/lib/calendly/oauth';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: userData } = await supabase
    .from('users')
    .select('organization_id')
    .eq('auth_id', user.id)
    .single();

  if (!userData?.organization_id) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
  }

  const { data: connection } = await supabase
    .from('provider_connections')
    .select('*')
    .eq('organization_id', userData.organization_id)
    .eq('provider', 'calendly')
    .eq('is_active', true)
    .single();

  if (!connection) {
    return NextResponse.json({ error: 'Calendly not connected' }, { status: 404 });
  }

  try {
    let accessToken = connection.access_token;
    const expiresAt = new Date(connection.token_expires_at);

    if (expiresAt < new Date()) {
      const tokens = await refreshCalendlyToken(connection.refresh_token);
      accessToken = tokens.access_token;

      const newExpiresAt = new Date(Date.now() + tokens.expires_in * 1000);

      await supabase
        .from('provider_connections')
        .update({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token || connection.refresh_token,
          token_expires_at: newExpiresAt.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', connection.id);
    }

    const metadata = connection.metadata as any;
    const userUri = metadata?.calendly_user_uri;

    if (!userUri) {
      return NextResponse.json({ error: 'User URI not found in metadata' }, { status: 400 });
    }

    const eventTypes = await getAllEventTypes(accessToken, userUri, true);

    return NextResponse.json({ event_types: eventTypes });
  } catch (error: any) {
    console.error('Failed to fetch Calendly event types:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch event types' },
      { status: 500 }
    );
  }
}
