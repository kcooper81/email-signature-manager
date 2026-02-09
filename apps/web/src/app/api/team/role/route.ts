import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(request: NextRequest) {
  try {
    const { userId, role } = await request.json();

    if (!userId || !role) {
      return NextResponse.json(
        { error: 'User ID and role are required' },
        { status: 400 }
      );
    }

    if (!['admin', 'member'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be "admin" or "member"' },
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
      .select('organization_id, role')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Only owners and admins can change roles
    if (currentUser.role !== 'owner' && currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only owners and admins can change user roles' },
        { status: 403 }
      );
    }

    // Get the target user
    const { data: targetUser } = await supabase
      .from('users')
      .select('id, organization_id, role, email')
      .eq('id', userId)
      .single();

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Ensure target user is in the same organization
    if (targetUser.organization_id !== currentUser.organization_id) {
      return NextResponse.json(
        { error: 'User not in your organization' },
        { status: 403 }
      );
    }

    // Cannot change owner's role
    if (targetUser.role === 'owner') {
      return NextResponse.json(
        { error: 'Cannot change the owner\'s role' },
        { status: 403 }
      );
    }

    // Admins cannot demote other admins (only owners can)
    if (currentUser.role === 'admin' && targetUser.role === 'admin' && role === 'member') {
      return NextResponse.json(
        { error: 'Only the owner can demote admins' },
        { status: 403 }
      );
    }

    // Update the user's role
    const { error: updateError } = await supabase
      .from('users')
      .update({ role, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (updateError) {
      console.error('Failed to update role:', updateError);
      return NextResponse.json(
        { error: 'Failed to update role' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${targetUser.email} is now ${role === 'admin' ? 'an admin' : 'a member'}`,
    });

  } catch (error: any) {
    console.error('Role update error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update role' },
      { status: 500 }
    );
  }
}
