const CALENDLY_SCOPES = [
  // Calendly uses a simple scope model - default scope provides access to user info and event types
];

export function getCalendlyAuthUrl(state: string) {
  const clientId = process.env.CALENDLY_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/calendly/callback`;
  
  const params = new URLSearchParams({
    client_id: clientId!,
    redirect_uri: redirectUri,
    response_type: 'code',
    state,
  });

  return `https://auth.calendly.com/oauth/authorize?${params.toString()}`;
}

export async function getCalendlyTokens(code: string) {
  const clientId = process.env.CALENDLY_CLIENT_ID;
  const clientSecret = process.env.CALENDLY_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/calendly/callback`;

  const response = await fetch('https://auth.calendly.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId!,
      client_secret: clientSecret!,
      redirect_uri: redirectUri,
      code,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get Calendly tokens: ${error}`);
  }

  return response.json();
}

export async function refreshCalendlyToken(refreshToken: string) {
  const clientId = process.env.CALENDLY_CLIENT_ID;
  const clientSecret = process.env.CALENDLY_CLIENT_SECRET;

  const response = await fetch('https://auth.calendly.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: clientId!,
      client_secret: clientSecret!,
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to refresh Calendly token: ${error}`);
  }

  return response.json();
}

export async function revokeCalendlyToken(token: string) {
  const clientId = process.env.CALENDLY_CLIENT_ID;
  const clientSecret = process.env.CALENDLY_CLIENT_SECRET;

  const response = await fetch('https://auth.calendly.com/oauth/token/revoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId!,
      client_secret: clientSecret!,
      token,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to revoke Calendly token: ${error}`);
  }

  return true;
}
