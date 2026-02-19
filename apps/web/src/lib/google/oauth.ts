import { google } from 'googleapis';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.settings.basic',
  'https://www.googleapis.com/auth/gmail.settings.sharing',
  'https://www.googleapis.com/auth/admin.directory.user.readonly',
  'https://www.googleapis.com/auth/calendar.readonly',
];

export function getGoogleOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/google/callback`
  );
}

export function getGoogleAuthUrl(state: string) {
  const oauth2Client = getGoogleOAuthClient();

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    state,
    prompt: 'consent',
  });
}

export async function getGoogleTokens(code: string) {
  const oauth2Client = getGoogleOAuthClient();
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

export function createAuthenticatedClient(accessToken: string, refreshToken: string) {
  const oauth2Client = getGoogleOAuthClient();
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  return oauth2Client;
}

/**
 * Creates an authenticated Google OAuth2 client for an organization,
 * automatically refreshing and persisting tokens when they expire.
 * Also returns the connection auth_type so callers can use the service account path.
 */
export async function createOrgGoogleClient(organizationId: string) {
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: connection } = await supabase
    .from('provider_connections')
    .select('access_token, refresh_token, token_expires_at, auth_type, admin_email, domain')
    .eq('provider', 'google')
    .eq('is_active', true)
    .eq('organization_id', organizationId)
    .single();

  if (!connection) {
    throw new Error('Google Workspace not connected');
  }

  // Marketplace connections use service account — no OAuth tokens needed
  if (connection.auth_type === 'marketplace') {
    const error = new Error('MARKETPLACE_AUTH') as any;
    error.authType = 'marketplace';
    error.adminEmail = connection.admin_email;
    error.domain = connection.domain;
    throw error;
  }

  if (!connection.refresh_token) {
    throw new Error('Google refresh token missing — please reconnect Google Workspace');
  }

  const oauth2Client = getGoogleOAuthClient();
  oauth2Client.setCredentials({
    access_token: connection.access_token,
    refresh_token: connection.refresh_token,
  });

  // If token is expired or will expire within 5 minutes, force a refresh now
  const expiresAt = connection.token_expires_at ? new Date(connection.token_expires_at).getTime() : 0;
  const fiveMinFromNow = Date.now() + 5 * 60 * 1000;

  if (!connection.access_token || expiresAt < fiveMinFromNow) {
    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);

      // Persist the refreshed tokens
      await supabase
        .from('provider_connections')
        .update({
          access_token: credentials.access_token,
          token_expires_at: credentials.expiry_date
            ? new Date(credentials.expiry_date).toISOString()
            : null,
          ...(credentials.refresh_token ? { refresh_token: credentials.refresh_token } : {}),
        })
        .eq('organization_id', organizationId)
        .eq('provider', 'google');
    } catch (err: any) {
      throw new Error(
        'Google token refresh failed — please reconnect Google Workspace in Settings > Integrations'
      );
    }
  }

  // Listen for any automatic token refreshes during API calls
  oauth2Client.on('tokens', async (tokens) => {
    const updates: Record<string, any> = {};
    if (tokens.access_token) updates.access_token = tokens.access_token;
    if (tokens.refresh_token) updates.refresh_token = tokens.refresh_token;
    if (tokens.expiry_date) updates.token_expires_at = new Date(tokens.expiry_date).toISOString();

    if (Object.keys(updates).length > 0) {
      await supabase
        .from('provider_connections')
        .update(updates)
        .eq('organization_id', organizationId)
        .eq('provider', 'google');
    }
  });

  return oauth2Client;
}
