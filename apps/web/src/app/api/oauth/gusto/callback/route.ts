import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { exchangeGustoCode, createGustoWebhook } from '@/lib/oauth/gusto';
import { encryptToken } from '@/lib/oauth/encryption';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        new URL(`/settings/hr-sync?error=${encodeURIComponent(error)}`, request.url)
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        new URL('/settings/hr-sync?error=missing_code', request.url)
      );
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const { data: userData } = await supabase
      .from('users')
      .select('id, organization_id, role')
      .eq('auth_id', user.id)
      .single();

    if (!userData || !['owner', 'admin'].includes(userData.role)) {
      return NextResponse.redirect(
        new URL('/settings/hr-sync?error=insufficient_permissions', request.url)
      );
    }

    // Parse state to get config ID and sandbox flag
    const stateData = JSON.parse(Buffer.from(state, 'base64').toString());
    const { configId, useSandbox } = stateData;

    // Exchange code for tokens
    const tokens = await exchangeGustoCode(code, useSandbox);

    // Calculate token expiration
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

    // Encrypt tokens before storing
    const encryptedAccessToken = encryptToken(tokens.access_token);
    const encryptedRefreshToken = encryptToken(tokens.refresh_token);

    // Try to create webhook automatically
    let webhookSecret = null;
    try {
      const webhook = await createGustoWebhook(tokens.access_token, undefined, useSandbox);
      webhookSecret = webhook.secret;
    } catch (err) {
      console.error('Failed to create Gusto webhook:', err);
      // Continue without webhook - user can set up manually later
    }

    // Update sync configuration with OAuth tokens
    const { error: updateError } = await supabase
      .from('sync_configurations')
      .update({
        oauth_access_token: encryptedAccessToken,
        oauth_refresh_token: encryptedRefreshToken,
        oauth_token_expires_at: expiresAt.toISOString(),
        oauth_company_id: tokens.company_id,
        webhook_secret: webhookSecret,
        is_active: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', configId)
      .eq('organization_id', userData.organization_id);

    if (updateError) {
      console.error('Failed to update sync configuration:', updateError);
      return NextResponse.redirect(
        new URL('/settings/hr-sync?error=update_failed', request.url)
      );
    }

    // Redirect back to HR sync page with success
    return NextResponse.redirect(
      new URL('/settings/hr-sync?success=gusto_connected', request.url)
    );
  } catch (err: any) {
    console.error('Gusto OAuth callback error:', err);
    return NextResponse.redirect(
      new URL('/settings/hr-sync?error=Connection+failed', request.url)
    );
  }
}
