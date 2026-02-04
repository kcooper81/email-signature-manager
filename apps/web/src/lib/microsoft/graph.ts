export interface MicrosoftUser {
  id: string;
  userPrincipalName: string;
  displayName: string;
  givenName?: string;
  surname?: string;
  mail?: string;
  jobTitle?: string;
  department?: string;
  mobilePhone?: string;
  businessPhones?: string[];
}

export async function getMicrosoftProfile(accessToken: string): Promise<MicrosoftUser> {
  const response = await fetch('https://graph.microsoft.com/v1.0/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get profile: ${error}`);
  }

  return response.json();
}

export async function listMicrosoftUsers(accessToken: string): Promise<MicrosoftUser[]> {
  const users: MicrosoftUser[] = [];
  let nextLink: string | null = 'https://graph.microsoft.com/v1.0/users?$select=id,userPrincipalName,displayName,givenName,surname,mail,jobTitle,department,mobilePhone,businessPhones';

  while (nextLink) {
    const response: Response = await fetch(nextLink, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to list users: ${error}`);
    }

    const data: { value?: MicrosoftUser[]; '@odata.nextLink'?: string } = await response.json();
    users.push(...(data.value || []));
    nextLink = data['@odata.nextLink'] || null;
  }

  return users;
}

export async function deploySignatureToUser(
  accessToken: string,
  userId: string,
  signatureHtml: string
): Promise<void> {
  // Note: Microsoft Graph API doesn't have a direct "signature" endpoint
  // We need to use the mailboxSettings endpoint
  // This is a limitation - signatures set this way may not appear in all scenarios
  
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${userId}/mailboxSettings`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Note: This sets the automatic reply message, not a true signature
        // Microsoft Graph API doesn't support setting signatures directly
        // This is a known limitation as of 2025
        automaticRepliesSetting: {
          status: 'disabled',
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to deploy signature: ${error}`);
  }
}

export async function getMailboxSettings(
  accessToken: string,
  userId: string
): Promise<any> {
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${userId}/mailboxSettings`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get mailbox settings: ${error}`);
  }

  return response.json();
}
