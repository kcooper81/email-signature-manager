import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendTeamInviteEmail } from '@/lib/email/resend';

export async function POST(request: NextRequest) {
  try {
    const { userIds } = await request.json();

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: 'User IDs are required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get current user's organization
    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id, first_name, last_name')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Get organization details
    const { data: organization } = await supabase
      .from('organizations')
      .select('name')
      .eq('id', currentUser.organization_id)
      .single();

    // Get the users to invite (must be in same organization)
    const { data: usersToInvite, error: fetchError } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, auth_id')
      .eq('organization_id', currentUser.organization_id)
      .in('id', userIds);

    if (fetchError) {
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      );
    }

    if (!usersToInvite || usersToInvite.length === 0) {
      return NextResponse.json(
        { error: 'No valid users found' },
        { status: 404 }
      );
    }

    // Filter out users who already have auth_id (already have accounts)
    const usersWithoutAccounts = usersToInvite.filter(u => !u.auth_id);

    if (usersWithoutAccounts.length === 0) {
      return NextResponse.json(
        { error: 'All selected users already have accounts' },
        { status: 400 }
      );
    }

    // Generate invite tokens and send emails
    const invites = [];
    for (const inviteUser of usersWithoutAccounts) {
      // Generate a secure invite token
      const token = crypto.randomUUID();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

      // Store invite in database
      const { error: insertError } = await supabase
        .from('user_invites')
        .insert({
          user_id: inviteUser.id,
          email: inviteUser.email,
          token,
          expires_at: expiresAt.toISOString(),
          invited_by: currentUser.organization_id,
        });

      if (insertError) {
        console.error('Failed to create invite:', insertError);
        continue;
      }

      // Send invite email
      const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`;
      const inviterName = `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() || 'Your admin';
      const orgName = organization?.name || 'your organization';

      try {
        await sendTeamInviteEmail({
          to: inviteUser.email,
          inviterName,
          organizationName: orgName,
          inviteUrl,
          expiresAt: expiresAt.toISOString(),
        });
        
        console.log(`Invite email sent to ${inviteUser.email}`);
      } catch (emailError) {
        console.error(`Failed to send invite email to ${inviteUser.email}:`, emailError);
        // Continue with other invites even if one fails
      }

      invites.push({
        email: inviteUser.email,
        token,
        inviteUrl,
      });
    }

    return NextResponse.json({
      success: true,
      invitedCount: invites.length,
      invites: invites.map(i => ({ email: i.email, inviteUrl: i.inviteUrl })),
      message: `Sent ${invites.length} invite${invites.length !== 1 ? 's' : ''}. Users will receive an email to set up their account.`,
    });

  } catch (error: any) {
    console.error('Invite error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send invites' },
      { status: 500 }
    );
  }
}
