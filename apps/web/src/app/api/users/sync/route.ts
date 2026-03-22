import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { listWorkspaceUsersWithClient } from '@/lib/google/gmail';
import { createOrgGoogleClient } from '@/lib/google/oauth';
import { logException } from '@/lib/error-logging';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's organization - REQUIRED for security
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.organization_id) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    const organizationId = userData.organization_id;

    // Get the org's configured domain, fall back to user's email domain
    const { data: orgData } = await supabase
      .from('organizations')
      .select('domain')
      .eq('id', organizationId)
      .single();

    const domain = orgData?.domain || user.email?.split('@')[1];
    if (!domain) {
      return NextResponse.json(
        { error: 'Could not determine domain' },
        { status: 400 }
      );
    }

    // Create Google client with automatic token refresh
    let googleAuth;
    try {
      googleAuth = await createOrgGoogleClient(organizationId);
    } catch (err: any) {
      return NextResponse.json(
        { error: 'Google Workspace is not connected. Please reconnect in Settings.' },
        { status: 400 }
      );
    }

    // Fetch users from Google Directory
    const googleUsers = await listWorkspaceUsersWithClient(googleAuth, domain);

    // Use service client to bypass RLS for upsert operations
    const serviceClient = createServiceClient();

    // Look up existing users to preserve their roles
    const googleEmails = googleUsers.map(u => u.email);
    const { data: existingUsers } = googleEmails.length > 0
      ? await serviceClient
          .from('users')
          .select('email, role')
          .eq('organization_id', organizationId)
          .in('email', googleEmails)
      : { data: [] };

    const existingUserMap = new Map(
      (existingUsers || []).map(u => [u.email, u])
    );

    // Upsert users into database
    let syncedCount = 0;
    let errorCount = 0;

    for (const googleUser of googleUsers) {
      const nameParts = googleUser.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      const existing = existingUserMap.get(googleUser.email);

      const { error } = await serviceClient
        .from('users')
        .upsert({
          email: googleUser.email,
          first_name: firstName,
          last_name: lastName,
          title: googleUser.title || null,
          department: googleUser.department || null,
          organization_id: organizationId,
          role: existing?.role || 'member',
          source: 'google',
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'email,organization_id',
          ignoreDuplicates: false,
        });

      if (error) {
        console.error(`Failed to sync user ${googleUser.email}:`, error);
        errorCount++;
      } else {
        syncedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      synced: syncedCount,
      errors: errorCount,
      total: googleUsers.length,
    });
  } catch (err: any) {
    console.error('User sync error:', err);

    await logException(err, {
      route: '/api/users/sync',
      method: 'POST',
      errorType: 'sync_error',
    });

    // Surface actionable messages for known Google API errors
    const msg = err.message || '';
    if (msg.includes('Domain not found') || msg.includes('Resource Not Found: domain')) {
      return NextResponse.json(
        { error: 'Google Workspace domain not found. Check your organization domain settings.' },
        { status: 400 }
      );
    }
    if (msg.includes('Not Authorized') || msg.includes('insufficient')) {
      return NextResponse.json(
        { error: 'Insufficient permissions. Admin directory access is required to sync users.' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to sync users. Please try again.' },
      { status: 500 }
    );
  }
}
