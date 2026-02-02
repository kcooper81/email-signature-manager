import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { listWorkspaceUsers } from '@/lib/google/gmail';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Try to get user's organization from users table first
    let organizationId: string | null = null;
    
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (userData?.organization_id) {
      organizationId = userData.organization_id;
    }

    // Get Google connection - if no org from user, get it from connection
    const connectionQuery = supabase
      .from('provider_connections')
      .select('*')
      .eq('provider', 'google')
      .eq('is_active', true);

    if (organizationId) {
      connectionQuery.eq('organization_id', organizationId);
    }

    const { data: connection } = await connectionQuery.single();

    if (!connection) {
      return NextResponse.json(
        { error: 'Google Workspace not connected' },
        { status: 400 }
      );
    }

    // Use organization from connection if we didn't have it
    if (!organizationId) {
      organizationId = connection.organization_id;
    }

    if (!organizationId) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Get the domain from the user's email
    const domain = user.email?.split('@')[1];
    if (!domain) {
      return NextResponse.json(
        { error: 'Could not determine domain' },
        { status: 400 }
      );
    }

    // Fetch users from Google Directory
    const googleUsers = await listWorkspaceUsers(
      connection.access_token,
      connection.refresh_token,
      domain
    );

    // Upsert users into database
    let syncedCount = 0;
    let errorCount = 0;

    for (const googleUser of googleUsers) {
      const nameParts = googleUser.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const { error } = await supabase
        .from('users')
        .upsert({
          email: googleUser.email,
          first_name: firstName,
          last_name: lastName,
          organization_id: organizationId,
          role: 'member',
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'email',
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
    return NextResponse.json(
      { error: err.message || 'Failed to sync users' },
      { status: 500 }
    );
  }
}
