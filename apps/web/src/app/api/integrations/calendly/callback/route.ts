import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCalendlyTokens } from '@/lib/calendly/oauth';
import { fetchAndBuildMetadata } from '@/lib/calendly/api';
import { logException } from '@/lib/error-logging';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    console.error('Calendly OAuth error:', error);
    return NextResponse.redirect(
      new URL(`/integrations?error=oauth_denied`, request.url)
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

    const tokens = await getCalendlyTokens(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error('Missing tokens from Calendly');
    }

    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data: userData } = await supabase
      .from('users')
      .select('organization_id, id')
      .eq('auth_id', user.id)
      .single();

    let organizationId = userData?.organization_id;
    let dbUserId = userData?.id;

    if (!organizationId) {
      const baseSlug = user.email?.split('@')[0] || 'org';
      const uniqueSlug = `${baseSlug}-${Date.now()}`;
      
      const { data: newOrg, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: user.user_metadata?.organization_name || user.email?.split('@')[1] || 'My Organization',
          slug: uniqueSlug,
        })
        .select('id')
        .single();

      if (orgError) {
        throw new Error(`Failed to create organization: ${orgError.message}`);
      }

      if (newOrg) {
        organizationId = newOrg.id;
        
        const { data: newUser } = await supabase
          .from('users')
          .upsert({
            auth_id: user.id,
            organization_id: organizationId,
            email: user.email || '',
            role: 'admin',
          })
          .select('id')
          .single();
        
        if (newUser) {
          dbUserId = newUser.id;
        }
      }
    }

    if (!organizationId) {
      throw new Error('Failed to get or create organization');
    }

    if (!dbUserId) {
      throw new Error('Failed to get or create user record');
    }

    const metadata = await fetchAndBuildMetadata(tokens.access_token);

    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

    const { error: upsertError } = await supabase
      .from('provider_connections')
      .upsert({
        organization_id: organizationId,
        provider: 'calendly',
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: expiresAt.toISOString(),
        scopes: tokens.scope?.split(' ') || [],
        metadata: metadata,
        connected_by: dbUserId,
        is_active: true,
      }, {
        onConflict: 'organization_id,provider',
      });

    if (upsertError) {
      console.error('Failed to save Calendly connection:', upsertError);
      throw new Error('Failed to save connection');
    }

    return NextResponse.redirect(
      new URL('/integrations?success=calendly_connected', request.url)
    );
  } catch (err) {
    console.error('Calendly callback error:', err);
    
    await logException(err, {
      route: '/api/integrations/calendly/callback',
      method: 'GET',
      errorType: 'integration_error',
      metadata: { provider: 'calendly' },
    });

    return NextResponse.redirect(
      new URL('/integrations?error=callback_failed', request.url)
    );
  }
}
