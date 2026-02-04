import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { exchangeMicrosoftCode } from '@/lib/microsoft/oauth';
import { getMicrosoftProfile } from '@/lib/microsoft/graph';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    console.error('Microsoft OAuth error:', error);
    let errorType = 'oauth_denied';
    if (error === 'access_denied') {
      errorType = 'oauth_denied';
    }
    return NextResponse.redirect(
      new URL(`/integrations?error=${errorType}`, request.url)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL('/integrations?error=missing_params', request.url)
    );
  }

  try {
    const stateData = JSON.parse(Buffer.from(state, 'base64').toString());
    const { userId, timestamp } = stateData;

    if (Date.now() - timestamp > 5 * 60 * 1000) {
      return NextResponse.redirect(
        new URL('/integrations?error=state_expired', request.url)
      );
    }

    const tokens = await exchangeMicrosoftCode(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error('Missing tokens from Microsoft');
    }

    const profile = await getMicrosoftProfile(tokens.access_token);

    const supabase = createClient();

    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', userId)
      .single();

    if (!userData?.organization_id) {
      return NextResponse.redirect(
        new URL('/integrations?error=no_organization', request.url)
      );
    }

    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

    const { error: upsertError } = await supabase
      .from('provider_connections')
      .upsert({
        organization_id: userData.organization_id,
        provider: 'microsoft',
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: expiresAt.toISOString(),
        is_active: true,
        metadata: {
          tenant_id: profile.id,
          user_principal_name: profile.userPrincipalName,
        },
      }, {
        onConflict: 'organization_id,provider',
      });

    if (upsertError) {
      console.error('Failed to store Microsoft connection:', upsertError);
      return NextResponse.redirect(
        new URL('/integrations?error=storage_failed', request.url)
      );
    }

    return NextResponse.redirect(
      new URL('/integrations?success=microsoft_connected', request.url)
    );
  } catch (err: any) {
    console.error('Microsoft OAuth callback error:', err);
    return NextResponse.redirect(
      new URL(`/integrations?error=oauth_failed&message=${encodeURIComponent(err.message)}`, request.url)
    );
  }
}
