import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { fetchAndBuildMetadata } from '@/lib/calendly/api';
import { refreshCalendlyToken } from '@/lib/calendly/oauth';

export async function POST(request: NextRequest) {
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
        })
        .eq('id', connection.id);
    }

    const metadata = await fetchAndBuildMetadata(accessToken);

    const { error: updateError } = await supabase
      .from('provider_connections')
      .update({
        metadata: metadata,
        updated_at: new Date().toISOString(),
      })
      .eq('id', connection.id);

    if (updateError) {
      throw new Error(`Failed to update metadata: ${updateError.message}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Calendly metadata refreshed successfully',
      metadata 
    });
  } catch (error: any) {
    console.error('Failed to refresh Calendly metadata:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to refresh metadata' },
      { status: 500 }
    );
  }
}
