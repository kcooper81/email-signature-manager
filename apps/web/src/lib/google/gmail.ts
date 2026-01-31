import { google } from 'googleapis';
import { createAuthenticatedClient } from './oauth';

export interface GmailUser {
  id: string;
  email: string;
  name: string;
}

export async function setGmailSignature(
  accessToken: string,
  refreshToken: string,
  userEmail: string,
  signatureHtml: string
) {
  const auth = createAuthenticatedClient(accessToken, refreshToken);
  const gmail = google.gmail({ version: 'v1', auth });

  try {
    // Get the user's send-as aliases
    const response = await gmail.users.settings.sendAs.list({
      userId: userEmail,
    });

    const sendAsAddresses = response.data.sendAs || [];
    const primaryAddress = sendAsAddresses.find((addr) => addr.isPrimary);

    if (!primaryAddress || !primaryAddress.sendAsEmail) {
      throw new Error('Could not find primary email address');
    }

    // Update the signature for the primary address
    await gmail.users.settings.sendAs.update({
      userId: userEmail,
      sendAsEmail: primaryAddress.sendAsEmail,
      requestBody: {
        signature: signatureHtml,
      },
    });

    return { success: true, email: primaryAddress.sendAsEmail };
  } catch (error: any) {
    console.error('Failed to set Gmail signature:', error);
    throw new Error(error.message || 'Failed to set signature');
  }
}

export async function getGmailSignature(
  accessToken: string,
  refreshToken: string,
  userEmail: string
) {
  const auth = createAuthenticatedClient(accessToken, refreshToken);
  const gmail = google.gmail({ version: 'v1', auth });

  try {
    const response = await gmail.users.settings.sendAs.list({
      userId: userEmail,
    });

    const sendAsAddresses = response.data.sendAs || [];
    const primaryAddress = sendAsAddresses.find((addr) => addr.isPrimary);

    return primaryAddress?.signature || null;
  } catch (error: any) {
    console.error('Failed to get Gmail signature:', error);
    return null;
  }
}

export async function listWorkspaceUsers(
  accessToken: string,
  refreshToken: string,
  domain: string
) {
  const auth = createAuthenticatedClient(accessToken, refreshToken);
  const admin = google.admin({ version: 'directory_v1', auth });

  try {
    const users: GmailUser[] = [];
    let pageToken: string | undefined;

    do {
      const response = await admin.users.list({
        domain,
        maxResults: 100,
        pageToken,
        orderBy: 'email',
      });

      if (response.data.users) {
        for (const user of response.data.users) {
          if (user.primaryEmail && user.id) {
            users.push({
              id: user.id,
              email: user.primaryEmail,
              name: user.name?.fullName || user.primaryEmail,
            });
          }
        }
      }

      pageToken = response.data.nextPageToken || undefined;
    } while (pageToken);

    return users;
  } catch (error: any) {
    console.error('Failed to list workspace users:', error);
    throw new Error(error.message || 'Failed to list users');
  }
}
