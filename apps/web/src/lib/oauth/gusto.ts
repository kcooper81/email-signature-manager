import { encryptToken, decryptToken } from './encryption';

const GUSTO_CLIENT_ID = process.env.GUSTO_CLIENT_ID || '';
const GUSTO_CLIENT_SECRET = process.env.GUSTO_CLIENT_SECRET || '';
const GUSTO_REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL + '/api/oauth/gusto/callback';

export interface GustoOAuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  company_id: string;
}

export function getGustoAuthUrl(state: string, useSandbox: boolean = false): string {
  const baseUrl = useSandbox ? 'https://api.gusto-demo.com' : 'https://api.gusto.com';
  const params = new URLSearchParams({
    client_id: GUSTO_CLIENT_ID,
    redirect_uri: GUSTO_REDIRECT_URI,
    response_type: 'code',
    state: state,
  });
  
  return `${baseUrl}/oauth/authorize?${params.toString()}`;
}

export async function exchangeGustoCode(
  code: string,
  useSandbox: boolean = false
): Promise<GustoOAuthTokens> {
  const baseUrl = useSandbox ? 'https://api.gusto-demo.com' : 'https://api.gusto.com';
  
  const response = await fetch(`${baseUrl}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: GUSTO_CLIENT_ID,
      client_secret: GUSTO_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: GUSTO_REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gusto OAuth error: ${response.status} ${error}`);
  }

  const data = await response.json();
  
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in || 7200,
    token_type: data.token_type,
    company_id: data.company_id || '',
  };
}

export async function refreshGustoToken(
  refreshToken: string,
  useSandbox: boolean = false
): Promise<GustoOAuthTokens> {
  const baseUrl = useSandbox ? 'https://api.gusto-demo.com' : 'https://api.gusto.com';
  
  const response = await fetch(`${baseUrl}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: GUSTO_CLIENT_ID,
      client_secret: GUSTO_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
      redirect_uri: GUSTO_REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gusto token refresh error: ${response.status} ${error}`);
  }

  const data = await response.json();
  
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token || refreshToken,
    expires_in: data.expires_in || 7200,
    token_type: data.token_type,
    company_id: data.company_id || '',
  };
}

export async function createGustoWebhook(
  accessToken: string,
  subscriptionTypes: string[] = ['Employee', 'EmployeeBenefit', 'EmployeeJobCompensation'],
  useSandbox: boolean = false
): Promise<{ id: string; secret: string }> {
  const baseUrl = useSandbox ? 'https://api.gusto-demo.com' : 'https://api.gusto.com';
  const webhookUrl = process.env.NEXT_PUBLIC_APP_URL + '/api/webhooks/gusto';
  
  const response = await fetch(`${baseUrl}/v1/webhook_subscriptions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: webhookUrl,
      subscription_types: subscriptionTypes,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gusto webhook creation error: ${response.status} ${error}`);
  }

  const data = await response.json();
  
  return {
    id: data.uuid || data.id,
    secret: data.secret || '',
  };
}
