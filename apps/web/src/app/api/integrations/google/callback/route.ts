import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getGoogleTokens } from '@/lib/google/oauth';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect(
      new URL('/integrations?error=oauth_denied', request.url)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL('/integrations?error=missing_params', request.url)
    );
  }

  try {
    // Decode and verify state
    const stateData = JSON.parse(Buffer.from(state, 'base64').toString());
    const { userId, timestamp } = stateData;

    // Check if state is not too old (5 minutes)
    if (Date.now() - timestamp > 5 * 60 * 1000) {
      return NextResponse.redirect(
        new URL('/integrations?error=state_expired', request.url)
      );
    }

    // Exchange code for tokens
    const tokens = await getGoogleTokens(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error('Missing tokens from Google');
    }

    // Store the connection in the database
    const supabase = createClient();

    // Get user's organization
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', userId)
      .single();

    if (!userData?.organization_id) {
      // Create a default organization if none exists
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data: newOrg } = await supabase
        .from('organizations')
        .insert({
          name: user?.user_metadata?.organization_name || 'My Organization',
          slug: user?.email?.split('@')[0] || 'org',
        })
        .select('id')
        .single();

      if (newOrg) {
        await supabase
          .from('users')
          .upsert({
            auth_id: userId,
            organization_id: newOrg.id,
            email: user?.email || '',
            role: 'admin',
          });
      }
    }

    // Get the organization ID again
    const { data: userDataFinal } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', userId)
      .single();

    // Upsert the provider connection
    const { error: upsertError } = await supabase
      .from('provider_connections')
      .upsert({
        organization_id: userDataFinal?.organization_id,
        provider: 'google',
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: tokens.expiry_date 
          ? new Date(tokens.expiry_date).toISOString() 
          : null,
        scopes: tokens.scope?.split(' ') || [],
        is_active: true,
      }, {
        onConflict: 'organization_id,provider',
      });

    if (upsertError) {
      console.error('Failed to save connection:', upsertError);
      throw new Error('Failed to save connection');
    }

    return NextResponse.redirect(
      new URL('/integrations?success=google_connected', request.url)
    );
  } catch (err) {
    console.error('Google callback error:', err);
    return NextResponse.redirect(
      new URL('/integrations?error=callback_failed', request.url)
    );
  }
}
