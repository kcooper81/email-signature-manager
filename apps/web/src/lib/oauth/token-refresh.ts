import { createClient } from '@/lib/supabase/server';
import { refreshGustoToken } from './gusto';
import { refreshBambooHRToken } from './bamboohr';
import { encryptToken, decryptToken } from './encryption';

interface SyncConfig {
  id: string;
  provider: string;
  oauth_access_token: string | null;
  oauth_refresh_token: string | null;
  oauth_token_expires_at: string | null;
  oauth_company_id: string | null;
  oauth_subdomain: string | null;
  api_url: string | null;
}

export async function getValidAccessToken(config: SyncConfig): Promise<string> {
  // If no OAuth tokens, fall back to legacy API key
  if (!config.oauth_access_token || !config.oauth_refresh_token) {
    throw new Error('No OAuth tokens configured. Please reconnect your integration.');
  }

  const expiresAt = config.oauth_token_expires_at ? new Date(config.oauth_token_expires_at) : null;
  const now = new Date();
  
  // Add 5 minute buffer - refresh if token expires within 5 minutes
  const bufferMs = 5 * 60 * 1000;
  const needsRefresh = !expiresAt || (expiresAt.getTime() - now.getTime()) < bufferMs;

  if (!needsRefresh) {
    // Token is still valid, decrypt and return
    return decryptToken(config.oauth_access_token);
  }

  // Token needs refresh
  console.log(`Refreshing OAuth token for ${config.provider} config ${config.id}`);
  
  const refreshToken = decryptToken(config.oauth_refresh_token);
  let newTokens;

  try {
    switch (config.provider) {
      case 'gusto': {
        const useSandbox = config.api_url?.includes('gusto-demo.com') || false;
        newTokens = await refreshGustoToken(refreshToken, useSandbox);
        break;
      }
      
      case 'bamboohr': {
        if (!config.oauth_subdomain) {
          throw new Error('Missing subdomain for BambooHR token refresh');
        }
        newTokens = await refreshBambooHRToken(refreshToken, config.oauth_subdomain);
        break;
      }
      
      default:
        throw new Error(`Token refresh not implemented for provider: ${config.provider}`);
    }
  } catch (err: any) {
    console.error(`Failed to refresh token for ${config.provider}:`, err);
    throw new Error(`Token refresh failed: ${err.message}. Please reconnect your integration.`);
  }

  // Encrypt new tokens
  const encryptedAccessToken = encryptToken(newTokens.access_token);
  const encryptedRefreshToken = encryptToken(newTokens.refresh_token);
  const newExpiresAt = new Date(now.getTime() + newTokens.expires_in * 1000);

  // Update database
  const supabase = createClient();
  const { error: updateError } = await supabase
    .from('sync_configurations')
    .update({
      oauth_access_token: encryptedAccessToken,
      oauth_refresh_token: encryptedRefreshToken,
      oauth_token_expires_at: newExpiresAt.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', config.id);

  if (updateError) {
    console.error('Failed to update refreshed tokens:', updateError);
    // Still return the new token even if DB update failed
  }

  return newTokens.access_token;
}

export async function ensureValidToken(configId: string, organizationId: string): Promise<string> {
  const supabase = createClient();
  
  const { data: config, error } = await supabase
    .from('sync_configurations')
    .select('*')
    .eq('id', configId)
    .eq('organization_id', organizationId)
    .single();

  if (error || !config) {
    throw new Error('Sync configuration not found');
  }

  return getValidAccessToken(config as SyncConfig);
}
