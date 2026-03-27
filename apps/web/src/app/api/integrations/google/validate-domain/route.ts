import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createOrgGoogleClient } from '@/lib/google/oauth';
import {
  createAdminClient,
  isServiceAccountConfigured,
} from '@/lib/google/service-account';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { domain } = body;

    if (!domain || typeof domain !== 'string') {
      return NextResponse.json(
        { error: 'Domain is required' },
        { status: 400 }
      );
    }

    // Get user's organization and role
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id, role')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.organization_id) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    if (!['owner', 'admin'].includes(userData.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions. Only admins can validate domains.' },
        { status: 403 }
      );
    }

    // Try to list 1 user from the domain to validate it
    try {
      const client = await createOrgGoogleClient(userData.organization_id);

      // OAuth path — use the OAuth client to list users
      const admin = google.admin({ version: 'directory_v1', auth: client });
      const response = await admin.users.list({
        domain,
        maxResults: 1,
      });

      const userCount = response.data.users?.length ?? 0;
      if (userCount === 0) {
        return NextResponse.json({
          valid: false,
          error: `No users found for domain "${domain}". Make sure this matches your Google Workspace domain.`,
        });
      }

      return NextResponse.json({ valid: true });
    } catch (error: any) {
      // Marketplace auth — use service account instead
      if (error.message === 'MARKETPLACE_AUTH') {
        if (!isServiceAccountConfigured()) {
          return NextResponse.json(
            { valid: false, error: 'Service account not configured' },
            { status: 500 }
          );
        }

        try {
          const admin = createAdminClient(error.adminEmail);
          const response = await admin.users.list({
            domain,
            maxResults: 1,
          });

          const userCount = response.data.users?.length ?? 0;
          if (userCount === 0) {
            return NextResponse.json({
              valid: false,
              error: `No users found for domain "${domain}". Make sure this matches your Google Workspace domain.`,
            });
          }

          return NextResponse.json({ valid: true });
        } catch (saError: any) {
          return NextResponse.json({
            valid: false,
            error: friendlyErrorMessage(saError),
          });
        }
      }

      // OAuth error — return friendly message
      return NextResponse.json({
        valid: false,
        error: friendlyErrorMessage(error),
      });
    }
  } catch (error: any) {
    console.error('Domain validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function friendlyErrorMessage(error: any): string {
  const message = error.message || '';
  const code = error.code;

  if (code === 404 || message.includes('Domain not found')) {
    return 'Domain not found. Please check the domain name and try again.';
  }

  if (code === 403 || message.includes('Not Authorized')) {
    return 'Not authorized to access this domain. Ensure the app has admin directory permissions for this domain.';
  }

  if (message.includes('refresh token')) {
    return 'Google authentication expired. Please reconnect Google Workspace in Settings.';
  }

  return `Unable to validate domain: ${message || 'Unknown error'}`;
}
