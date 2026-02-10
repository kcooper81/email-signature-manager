import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role to bypass RLS for updating user auth_id
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { userId, authId, token } = await request.json();

    if (!userId || !authId || !token) {
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

    // Update user record with auth_id using service role (bypasses RLS)
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ auth_id: authId })
      .eq('id', userId);

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update user record' },
        { status: 500 }
      );
    }

    // Mark invite as accepted
    await supabaseAdmin
      .from('user_invites')
      .update({ accepted_at: new Date().toISOString() })
      .eq('token', token);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to accept invite' },
      { status: 500 }
    );
  }
}
