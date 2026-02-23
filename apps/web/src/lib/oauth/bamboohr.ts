import { encryptToken, decryptToken } from './encryption';

const BAMBOOHR_CLIENT_ID = process.env.BAMBOOHR_CLIENT_ID || '';
const BAMBOOHR_CLIENT_SECRET = process.env.BAMBOOHR_CLIENT_SECRET || '';
const BAMBOOHR_REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL + '/api/oauth/bamboohr/callback';

export interface BambooHROAuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  companyDomain: string;
}

export function getBambooHRAuthUrl(state: string, subdomain: string): string {
  const params = new URLSearchParams({
    client_id: BAMBOOHR_CLIENT_ID,
    redirect_uri: BAMBOOHR_REDIRECT_URI,
    response_type: 'code',
    state: state,
    scope: 'employees:read offline_access',
  });
  
  return `https://${subdomain}.bamboohr.com/authorize.php?request=authorize&${params.toString()}`;
}

export async function exchangeBambooHRCode(
  code: string,
  subdomain: string
): Promise<BambooHROAuthTokens> {
  const response = await fetch(`https://${subdomain}.bamboohr.com/token.php?request=token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: BAMBOOHR_CLIENT_ID,
      client_secret: BAMBOOHR_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: BAMBOOHR_REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`BambooHR OAuth error: ${response.status} ${error}`);
  }

  const data = await response.json();
  
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token || '',
    expires_in: data.expires_in || 3600,
    token_type: data.token_type,
    companyDomain: data.companyDomain || subdomain,
  };
}

export async function refreshBambooHRToken(
  refreshToken: string,
  subdomain: string
): Promise<BambooHROAuthTokens> {
  const response = await fetch(`https://${subdomain}.bamboohr.com/token.php?request=token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: BAMBOOHR_CLIENT_ID,
      client_secret: BAMBOOHR_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
      redirect_uri: BAMBOOHR_REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`BambooHR token refresh error: ${response.status} ${error}`);
  }

  const data = await response.json();
  
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token || refreshToken,
    expires_in: data.expires_in || 3600,
    token_type: data.token_type,
    companyDomain: data.companyDomain || subdomain,
  };
}
