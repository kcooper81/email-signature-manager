import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role to bypass RLS for updating user auth_id
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { userId, email, password, token } = await request.json();
    console.log('Invite accept request:', { userId, email, token });

    if (!userId || !email || !password || !token) {
      console.error('Missing required fields:', { userId: !!userId, email: !!email, password: !!password, token: !!token });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify the invite token is valid and matches the user
    console.log('Verifying invite token...');
    const { data: invite, error: inviteError } = await supabaseAdmin
      .from('user_invites')
      .select('id, user_id, expires_at, accepted_at')
      .eq('token', token)
      .single();

    if (inviteError || !invite) {
      console.error('Invalid invite token:', inviteError);
      return NextResponse.json(
        { error: 'Invalid invite token' },
        { status: 400 }
      );
    }
    console.log('Invite found:', { inviteId: invite.id, userId: invite.user_id });

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
    console.log('Checking if user already has auth_id...');
    const { data: existingUserRecord } = await supabaseAdmin
      .from('users')
      .select('auth_id')
      .eq('id', userId)
      .single();

    let authId: string;

    if (existingUserRecord?.auth_id) {
      // User already has an auth account - just update the password
      console.log('User already has auth_id, updating password:', existingUserRecord.auth_id);
      const { error: updatePasswordError } = await supabaseAdmin.auth.admin.updateUserById(
        existingUserRecord.auth_id,
        { password: password }
      );

      if (updatePasswordError) {
        console.error('Failed to update password:', updatePasswordError);
        return NextResponse.json(
          { error: `Failed to update password: ${updatePasswordError.message}` },
          { status: 500 }
        );
      }
      authId = existingUserRecord.auth_id;
      console.log('Password updated successfully');
    } else {
      // No auth account exists - create a new one
      console.log('No auth_id found, creating new auth user...');
      
      // Check if an auth user already exists with this email (orphaned from deletion)
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
      const existingAuthUser = existingUsers?.users.find(u => u.email === email);
      
      if (existingAuthUser) {
        console.log('Found orphaned auth user, deleting:', existingAuthUser.id);
        await supabaseAdmin.auth.admin.deleteUser(existingAuthUser.id);
      }

      // Create auth user with admin API (auto-confirmed since they were invited)
      const { data: authData, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true, // Auto-confirm since they were invited
      });

      if (createError || !authData.user) {
        console.error('Failed to create auth user:', createError);
        return NextResponse.json(
          { error: `Failed to create account: ${createError?.message || 'Unknown error'}` },
          { status: 500 }
        );
      }
      authId = authData.user.id;
      console.log('Auth user created:', authId);

      // Update user record with auth_id using service role (bypasses RLS)
      console.log('Updating user record with auth_id...');
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
      console.log('User record updated successfully');
    }

    // Mark invite as accepted
    console.log('Marking invite as accepted...');
    await supabaseAdmin
      .from('user_invites')
      .update({ accepted_at: new Date().toISOString() })
      .eq('token', token);

    console.log('Invite acceptance complete');
    return NextResponse.json({ success: true, authId: authId });
  } catch (error: any) {
    console.error('Unexpected error in invite accept:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to accept invite' },
      { status: 500 }
    );
  }
}
