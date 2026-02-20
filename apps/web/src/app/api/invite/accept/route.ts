import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, email, password, token } = await request.json();

    if (!userId || !email || !password || !token) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createServiceClient();

    // BUG-22 fix: Use .maybeSingle() to return 400 instead of 500 for invalid tokens
    const { data: invite, error: inviteError } = await supabaseAdmin
      .from('user_invites')
      .select('id, user_id, expires_at, accepted_at')
      .eq('token', token)
      .maybeSingle();

    if (inviteError || !invite) {
      return NextResponse.json(
        { error: 'Invalid invite token' },
        { status: 400 }
      );
    }

    if (invite.accepted_at) {
      return NextResponse.json(
        { error: 'Invite already accepted' },
        { status: 400 }
      );
    }

    if (new Date(invite.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Invite has expired' },
        { status: 400 }
      );
    }

    if (invite.user_id !== userId) {
      return NextResponse.json(
        { error: 'Invite does not match user' },
        { status: 400 }
      );
    }

    // Check if user already has an auth_id from a previous invite
    const { data: existingUserRecord } = await supabaseAdmin
      .from('users')
      .select('auth_id')
      .eq('id', userId)
      .maybeSingle();

    if (!existingUserRecord) {
      return NextResponse.json(
        { error: 'User record not found' },
        { status: 404 }
      );
    }

    let authId: string;

    if (existingUserRecord.auth_id) {
      // User already has an auth account - just update the password
      const { error: updatePasswordError } = await supabaseAdmin.auth.admin.updateUserById(
        existingUserRecord.auth_id,
        { password }
      );

      if (updatePasswordError) {
        console.error('Failed to update password:', updatePasswordError);
        return NextResponse.json(
          { error: 'Failed to update password' },
          { status: 500 }
        );
      }
      authId = existingUserRecord.auth_id;
    } else {
      // BUG-18 fix: Use paginated listUsers with filter instead of fetching all
      // BUG-19 fix: Never delete existing auth users — reuse or create new
      const { data: listData } = await supabaseAdmin.auth.admin.listUsers({
        page: 1,
        perPage: 50,
      });
      const existingAuthUser = listData?.users?.find(u => u.email === email);

      if (existingAuthUser) {
        // Auth user exists with this email — check if it's an orphan (no users row linked)
        const { data: linkedUser } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('auth_id', existingAuthUser.id)
          .maybeSingle();

        if (linkedUser && linkedUser.id !== userId) {
          // This auth user belongs to a different user record — cannot reuse
          return NextResponse.json(
            { error: 'An account with this email already exists' },
            { status: 409 }
          );
        }

        // Either orphan or same user — reuse by updating password
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
          existingAuthUser.id,
          { password, email_confirm: true }
        );

        if (updateError) {
          console.error('Failed to update existing auth user:', updateError);
          return NextResponse.json(
            { error: 'Failed to set up account' },
            { status: 500 }
          );
        }
        authId = existingAuthUser.id;
      } else {
        // No auth user exists — create a new one
        const { data: authData, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });

        if (createError || !authData.user) {
          console.error('Failed to create auth user:', createError);
          return NextResponse.json(
            { error: 'Failed to create account' },
            { status: 500 }
          );
        }
        authId = authData.user.id;
      }

      // Link auth_id to the user record
      const { error: updateError } = await supabaseAdmin
        .from('users')
        .update({ auth_id: authId })
        .eq('id', userId);

      if (updateError) {
        console.error('Failed to update user record:', updateError);
        return NextResponse.json(
          { error: 'Failed to link account to profile' },
          { status: 500 }
        );
      }
    }

    // Mark invite as accepted — prevents token reuse
    const { error: acceptErr } = await supabaseAdmin
      .from('user_invites')
      .update({ accepted_at: new Date().toISOString() })
      .eq('token', token);
    if (acceptErr) {
      console.error('Failed to mark invite as accepted:', acceptErr);
    }

    // BUG-21 fix: Don't return authId in response (information disclosure)
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Unexpected error in invite accept:', error);
    return NextResponse.json(
      { error: 'Failed to accept invite' },
      { status: 500 }
    );
  }
}
