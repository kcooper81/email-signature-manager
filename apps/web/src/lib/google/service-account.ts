import { google } from 'googleapis';

/**
 * Google Workspace Marketplace Service Account Authentication
 * 
 * This module handles domain-wide delegation using a service account,
 * which is required for Marketplace apps to manage users across the org.
 * 
 * Required env vars:
 * - GOOGLE_SERVICE_ACCOUNT_EMAIL: The service account email
 * - GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: The private key (with \n line breaks)
 */

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.settings.basic',
  'https://www.googleapis.com/auth/gmail.settings.sharing',
  'https://www.googleapis.com/auth/admin.directory.user.readonly',
  'https://www.googleapis.com/auth/calendar.readonly',
];

export interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
}

/**
 * Get service account credentials from environment variables
 * Supports multiple formats: plain text, base64, and JSON-escaped
 */
export function getServiceAccountCredentials(): ServiceAccountCredentials | null {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    return null;
  }

  // Method 1: Try JSON.parse if it looks like a JSON string (starts with ")
  if (privateKey.startsWith('"')) {
    try {
      privateKey = JSON.parse(privateKey) as string;
    } catch (e) {
      console.error('Failed to JSON parse private key:', e);
    }
  }
  
  // Method 2: Try base64 decode if not starting with -----BEGIN
  if (privateKey && !privateKey.startsWith('-----BEGIN')) {
    try {
      const decoded = Buffer.from(privateKey, 'base64').toString('utf-8');
      if (decoded.startsWith('-----BEGIN')) {
        privateKey = decoded;
      }
    } catch (e) {
      // Not valid base64, continue with escape handling
    }
  }

  if (!privateKey) {
    return null;
  }

  // Method 3: Handle escape sequences from env var sources
  privateKey = privateKey
    .replace(/\\\\n/g, '\n')  // Double-escaped \\n
    .replace(/\\n/g, '\n');    // Single-escaped \n

  return {
    client_email: clientEmail,
    private_key: privateKey,
  };
}

/**
 * Create a JWT auth client for domain-wide delegation
 * This allows the service account to impersonate users in the domain
 */
export function createServiceAccountClient(subjectEmail: string) {
  const credentials = getServiceAccountCredentials();
  
  if (!credentials) {
    throw new Error('Service account credentials not configured');
  }

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
    subject: subjectEmail, // Impersonate this user
  });

  return auth;
}

/**
 * Create an admin client for listing users (impersonates admin)
 */
export function createAdminClient(adminEmail: string) {
  const auth = createServiceAccountClient(adminEmail);
  return google.admin({ version: 'directory_v1', auth });
}

/**
 * Create a Gmail client for a specific user (impersonates that user)
 */
export function createGmailClientForUser(userEmail: string) {
  const auth = createServiceAccountClient(userEmail);
  return google.gmail({ version: 'v1', auth });
}

/**
 * Check if service account auth is available
 */
export function isServiceAccountConfigured(): boolean {
  return getServiceAccountCredentials() !== null;
}

/**
 * List all users in a domain using service account
 */
export async function listUsersWithServiceAccount(adminEmail: string, domain: string) {
  const admin = createAdminClient(adminEmail);

  const users: Array<{
    id: string;
    email: string;
    name: string;
    title?: string;
    department?: string;
    orgUnitPath?: string;
  }> = [];

  let pageToken: string | undefined;

  do {
    const response = await admin.users.list({
      domain,
      maxResults: 100,
      pageToken,
      orderBy: 'email',
      projection: 'full',
    });

    if (response.data.users) {
      for (const user of response.data.users) {
        if (user.primaryEmail && user.id) {
          const primaryOrg = user.organizations?.find((org: any) => org.primary) || user.organizations?.[0];
          
          users.push({
            id: user.id,
            email: user.primaryEmail,
            name: user.name?.fullName || user.primaryEmail,
            title: primaryOrg?.title || undefined,
            department: primaryOrg?.department || undefined,
            orgUnitPath: user.orgUnitPath || undefined,
          });
        }
      }
    }

    pageToken = response.data.nextPageToken || undefined;
  } while (pageToken);

  return users;
}

/**
 * Set Gmail signature for a user using service account (domain-wide delegation)
 */
export async function setSignatureWithServiceAccount(
  userEmail: string,
  signatureHtml: string
) {
  const gmail = createGmailClientForUser(userEmail);

  const response = await gmail.users.settings.sendAs.list({
    userId: 'me', // 'me' works because we're impersonating the user
  });

  const sendAsAddresses = response.data.sendAs || [];
  const primaryAddress = sendAsAddresses.find((addr) => addr.isPrimary);

  if (!primaryAddress || !primaryAddress.sendAsEmail) {
    throw new Error(`Could not find primary email for ${userEmail}`);
  }

  await gmail.users.settings.sendAs.update({
    userId: 'me',
    sendAsEmail: primaryAddress.sendAsEmail,
    requestBody: {
      signature: signatureHtml,
    },
  });

  return { success: true, email: primaryAddress.sendAsEmail };
}

/**
 * Verify that the Marketplace app is installed for a domain
 * by attempting to list users with the service account
 */
export async function verifyMarketplaceInstallation(
  adminEmail: string,
  domain: string
): Promise<{ installed: boolean; error?: string }> {
  try {
    const admin = createAdminClient(adminEmail);
    
    // Try to list just 1 user to verify access
    await admin.users.list({
      domain,
      maxResults: 1,
    });

    return { installed: true };
  } catch (error: any) {
    console.error('Marketplace verification failed:', error);
    
    if (error.code === 403) {
      return { 
        installed: false, 
        error: 'Domain-wide delegation not configured or app not installed from Marketplace' 
      };
    }
    
    return { 
      installed: false, 
      error: error.message || 'Failed to verify installation' 
    };
  }
}
