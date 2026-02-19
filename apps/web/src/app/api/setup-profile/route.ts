import { createClient, createServiceClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { createUserWithOrganization } from '@/lib/auth/create-user-org';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, organizationName } = await request.json();

    // BUG-16: Validate input length and content
    const trimmedFirst = (firstName || '').trim().substring(0, 100);
    const trimmedLast = (lastName || '').trim().substring(0, 100);
    const trimmedOrg = (organizationName || '').trim().substring(0, 200);

    if (!trimmedFirst || !trimmedLast || !trimmedOrg) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify user is authenticated
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const supabaseAdmin = createServiceClient();

    // Check if user already has a profile by auth_id
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('auth_id', user.id)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Profile already exists' },
        { status: 400 }
      );
    }

    // Check if a user with this email already exists (e.g. synced via Google Workspace)
    // If so, link their auth_id instead of creating a duplicate org
    if (user.email) {
      const { data: emailMatch } = await supabaseAdmin
        .from('users')
        .select('id, organization_id, auth_id, role')
        .eq('email', user.email)
        .is('auth_id', null)
        .maybeSingle();

      if (emailMatch) {
        // BUG-15 fix: Preserve existing role — don't escalate member to owner
        const { error: linkError } = await supabaseAdmin
          .from('users')
          .update({
            auth_id: user.id,
            first_name: trimmedFirst,
            last_name: trimmedLast,
            updated_at: new Date().toISOString(),
          })
          .eq('id', emailMatch.id);

        if (linkError) {
          console.error('Failed to link auth to existing user:', linkError);
          return NextResponse.json(
            { error: 'Failed to link account' },
            { status: 500 }
          );
        }

        return NextResponse.json({ success: true });
      }
    }

    // BUG-17 fix: Use shared utility with proper cleanup on failure
    const result = await createUserWithOrganization({
      supabaseAdmin,
      authId: user.id,
      email: user.email!,
      firstName: trimmedFirst,
      lastName: trimmedLast,
      organizationName: trimmedOrg,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Unexpected error in setup-profile:', error);
    return NextResponse.json(
      { error: 'Failed to complete setup' },
      { status: 500 }
    );
  }
}
