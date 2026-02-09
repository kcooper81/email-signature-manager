import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendAdminInviteEmail } from '@/lib/email/resend';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    // Get current user's organization and role
    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id, role, first_name, last_name')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Only owners and admins can invite new admins
    if (currentUser.role !== 'owner' && currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only owners and admins can invite new admins' },
        { status: 403 }
      );
    }

    // Get organization details
    const { data: organization } = await supabase
      .from('organizations')
      .select('name')
      .eq('id', currentUser.organization_id)
      .single();

    // Check if user already exists in the organization
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email, role, auth_id')
      .eq('organization_id', currentUser.organization_id)
      .eq('email', email.toLowerCase())
      .single();

    let targetUserId: string;

    if (existingUser) {
      // User exists - check if they already have an account
      if (existingUser.auth_id) {
        // They have an account, just promote them to admin
        if (existingUser.role === 'admin' || existingUser.role === 'owner') {
          return NextResponse.json(
            { error: 'This user is already an admin' },
            { status: 400 }
          );
        }

        const { error: updateError } = await supabase
          .from('users')
          .update({ role: 'admin', updated_at: new Date().toISOString() })
          .eq('id', existingUser.id);

        if (updateError) {
          return NextResponse.json(
            { error: 'Failed to update user role' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: `${email} has been promoted to admin`,
          promoted: true,
        });
      }

      // User exists but no account - update their role and send invite
      await supabase
        .from('users')
        .update({ role: 'admin', updated_at: new Date().toISOString() })
        .eq('id', existingUser.id);

      targetUserId = existingUser.id;
    } else {
      // Create new user with admin role
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email: email.toLowerCase(),
          first_name: firstName || null,
          last_name: lastName || null,
          organization_id: currentUser.organization_id,
          role: 'admin',
          source: 'manual',
        })
        .select('id')
        .single();

      if (createError || !newUser) {
        console.error('Failed to create user:', createError);
        return NextResponse.json(
          { error: 'Failed to create user' },
          { status: 500 }
        );
      }

      targetUserId = newUser.id;
    }

    // Generate invite token
    const token = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

    // Store invite in database
    const { error: insertError } = await supabase
      .from('user_invites')
      .insert({
        user_id: targetUserId,
        email: email.toLowerCase(),
        token,
        expires_at: expiresAt.toISOString(),
        invited_by: currentUser.organization_id,
      });

    if (insertError) {
      console.error('Failed to create invite:', insertError);
      return NextResponse.json(
        { error: 'Failed to create invite' },
        { status: 500 }
      );
    }

    // Send invite email
    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`;
    const inviterName = `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() || 'Your admin';
    const orgName = organization?.name || 'your organization';

    let emailSent = false;
    try {
      await sendAdminInviteEmail({
        to: email,
        inviterName,
        organizationName: orgName,
        inviteUrl,
        expiresAt: expiresAt.toISOString(),
      });
      emailSent = true;
    } catch (emailError: any) {
      console.error('Failed to send admin invite email:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: emailSent 
        ? `Admin invite sent to ${email}` 
        : `Admin invite created for ${email} but email failed to send. Share this link: ${inviteUrl}`,
      inviteUrl,
      emailSent,
    });

  } catch (error: any) {
    console.error('Admin invite error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send admin invite' },
      { status: 500 }
    );
  }
}
