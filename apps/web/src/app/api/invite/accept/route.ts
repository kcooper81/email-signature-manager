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

    if (!userId || !email || !password || !token) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify the invite token is valid and matches the user
    const { data: invite, error: inviteError } = await supabaseAdmin
      .from('user_invites')
      .select('id, user_id, expires_at, accepted_at')
      .eq('token', token)
      .single();

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

    // Check if an auth user already exists with this email (from previous invite)
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users.find(u => u.email === email);
    
    if (existingUser) {
      // Delete the old auth account
      await supabaseAdmin.auth.admin.deleteUser(existingUser.id);
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

    // Update user record with auth_id using service role (bypasses RLS)
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ auth_id: authData.user.id })
      .eq('id', userId);

    if (updateError) {
      console.error('Failed to update user record:', updateError);
      return NextResponse.json(
        { error: 'Failed to link account to profile' },
        { status: 500 }
      );
    }

    // Mark invite as accepted
    await supabaseAdmin
      .from('user_invites')
      .update({ accepted_at: new Date().toISOString() })
      .eq('token', token);

    return NextResponse.json({ success: true, authId: authData.user.id });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to accept invite' },
      { status: 500 }
    );
  }
}
