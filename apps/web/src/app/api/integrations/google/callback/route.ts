import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getGoogleTokens, SCOPES } from '@/lib/google/oauth';
import { logException } from '@/lib/error-logging';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    console.error('Google OAuth error:', error);
    // Map Google error codes to user-friendly error types
    let errorType = 'oauth_denied';
    if (error === 'access_denied') {
      errorType = 'oauth_denied';
    } else if (error === 'access_not_configured') {
      errorType = 'access_not_configured';
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
    // Decode and verify state with HMAC signature
    const stateRaw = Buffer.from(state, 'base64').toString();
    const dotIndex = stateRaw.lastIndexOf('.');
    if (dotIndex === -1) {
      return NextResponse.redirect(
        new URL('/integrations?error=invalid_state', request.url)
      );
    }
    const statePayload = stateRaw.substring(0, dotIndex);
    const stateSig = stateRaw.substring(dotIndex + 1);
    const hmacSecret = process.env.NEXTAUTH_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    if (!hmacSecret) {
      return NextResponse.redirect(
        new URL('/integrations?error=callback_failed', request.url)
      );
    }
    const expectedSig = crypto.createHmac('sha256', hmacSecret).update(statePayload).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(stateSig), Buffer.from(expectedSig))) {
      return NextResponse.redirect(
        new URL('/integrations?error=invalid_state', request.url)
      );
    }
    const stateData = JSON.parse(statePayload);
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

    // Determine actually-granted scopes and check for missing ones
    const grantedScopes = tokens.scope?.split(' ').filter(Boolean) || [];
    const missingScopes = SCOPES.filter(
      (required) => !grantedScopes.includes(required)
    );
    // Extract short scope names for the redirect URL (e.g. "admin.directory.user.readonly")
    const missingScopeNames = missingScopes.map((s) =>
      s.replace('https://www.googleapis.com/auth/', '')
    );

    // Store the connection in the database
    const supabase = createClient();

    // Verify state userId matches the currently authenticated user
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser || authUser.id !== userId) {
      return NextResponse.redirect(
        new URL('/integrations?error=auth_mismatch', request.url)
      );
    }

    // Get user's organization
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', userId)
      .single();

    if (!userData?.organization_id) {
      // Create a default organization if none exists
      const { data: newOrg } = await supabase
        .from('organizations')
        .insert({
          name: authUser.user_metadata?.organization_name || 'My Organization',
          slug: authUser.email?.split('@')[0] || 'org',
        })
        .select('id')
        .single();

      if (newOrg) {
        // Link user to org
        await supabase
          .from('users')
          .upsert({
            auth_id: userId,
            organization_id: newOrg.id,
            email: authUser.email || '',
            role: 'admin',
          });

        // Create default subscription (free plan) so billing checks work
        await supabase
          .from('subscriptions')
          .insert({
            organization_id: newOrg.id,
            plan: 'free',
            status: 'active',
          });

        // Create default organization settings so settings lookups don't fail
        await supabase
          .from('organization_settings')
          .insert({
            organization_id: newOrg.id,
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
        scopes: grantedScopes,
        is_active: true,
      }, {
        onConflict: 'organization_id,provider',
      });

    if (upsertError) {
      console.error('Failed to save connection:', upsertError);
      throw new Error('Failed to save connection');
    }

    const redirectUrl = new URL('/integrations?success=google_connected', request.url);
    if (missingScopeNames.length > 0) {
      redirectUrl.searchParams.set('missingScopes', missingScopeNames.join(','));
    }
    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error('Google callback error:', err);
    
    await logException(err, {
      route: '/api/integrations/google/callback',
      method: 'GET',
      errorType: 'integration_error',
      metadata: { provider: 'google' },
    });

    return NextResponse.redirect(
      new URL('/integrations?error=callback_failed', request.url)
    );
  }
}
