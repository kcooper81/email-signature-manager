import { NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { logException } from '@/lib/error-logging';
import { createUserWithOrganization } from '@/lib/auth/create-user-org';

export async function POST() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // BUG-33 fix: Use service client for all DB operations to bypass RLS
    const supabaseAdmin = createServiceClient();

    // Check if user record already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id, organization_id, first_name, last_name')
      .eq('auth_id', user.id)
      .maybeSingle();

    if (existingUser?.organization_id) {
      // User and organization already exist
      return NextResponse.json({
        success: true,
        userId: existingUser.id,
        organizationId: existingUser.organization_id,
        created: false,
      });
    }

    // BUG-32 fix: Check for existing email match (stub record from GWS sync)
    // before creating a new org, to prevent race condition duplicates
    if (user.email && !existingUser) {
      const { data: emailMatch } = await supabaseAdmin
        .from('users')
        .select('id, organization_id, auth_id')
        .eq('email', user.email)
        .is('auth_id', null)
        .maybeSingle();

      if (emailMatch) {
        // Link auth to existing stub record
        await supabaseAdmin
          .from('users')
          .update({
            auth_id: user.id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', emailMatch.id);

        return NextResponse.json({
          success: true,
          userId: emailMatch.id,
          organizationId: emailMatch.organization_id,
          created: false,
        });
      }
    }

    // If user exists but has no org, or user doesn't exist at all — create org + user
    const metadata = user.user_metadata || {};
    const email = user.email || '';
    const firstName = metadata.first_name || metadata.given_name || email.split('@')[0] || '';
    const lastName = metadata.last_name || metadata.family_name || '';
    const organizationName = metadata.organization_name || `${firstName}'s Organization`;

    // If user record exists without an org (shouldn't happen, but safety net)
    if (existingUser && !existingUser.organization_id) {
      const result = await createUserWithOrganization({
        supabaseAdmin,
        authId: user.id,
        email,
        firstName: existingUser.first_name || firstName,
        lastName: existingUser.last_name || lastName,
        organizationName,
      });

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }

      // BUG-34 fix: Only update organization_id, don't overwrite existing name
      await supabaseAdmin
        .from('users')
        .update({ organization_id: result.organizationId })
        .eq('id', existingUser.id);

      // Clean up the duplicate user record created by createUserWithOrganization
      await supabaseAdmin
        .from('users')
        .delete()
        .eq('auth_id', user.id)
        .neq('id', existingUser.id);

      return NextResponse.json({
        success: true,
        userId: existingUser.id,
        organizationId: result.organizationId,
        created: true,
      });
    }

    // No user record at all — create everything
    const result = await createUserWithOrganization({
      supabaseAdmin,
      authId: user.id,
      email,
      firstName,
      lastName,
      organizationName,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // Fetch the created user to return its ID
    const { data: newUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('auth_id', user.id)
      .maybeSingle();

    return NextResponse.json({
      success: true,
      userId: newUser?.id,
      organizationId: result.organizationId,
      created: true,
    });
  } catch (error: any) {
    console.error('Ensure user error:', error);

    await logException(error, {
      route: '/api/users/ensure',
      method: 'POST',
      errorType: 'auth_error',
    });

    return NextResponse.json(
      { error: 'Failed to ensure user record' },
      { status: 500 }
    );
  }
}
