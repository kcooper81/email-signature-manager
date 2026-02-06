import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logException } from '@/lib/error-logging';

export async function POST() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user record already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, organization_id')
      .eq('auth_id', user.id)
      .single();

    if (existingUser?.organization_id) {
      // User and organization already exist
      return NextResponse.json({ 
        success: true, 
        userId: existingUser.id,
        organizationId: existingUser.organization_id,
        created: false 
      });
    }

    // Extract user metadata from auth
    const metadata = user.user_metadata || {};
    const email = user.email || '';
    const firstName = metadata.first_name || metadata.given_name || email.split('@')[0] || '';
    const lastName = metadata.last_name || metadata.family_name || '';
    const organizationName = metadata.organization_name || `${firstName}'s Organization`;

    let organizationId = existingUser?.organization_id;

    // Create organization if needed
    if (!organizationId) {
      const { data: newOrg, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: organizationName,
        })
        .select('id')
        .single();

      if (orgError) {
        console.error('Failed to create organization:', orgError);
        return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 });
      }

      organizationId = newOrg.id;

      // Create free subscription for the organization
      const { error: subError } = await supabase
        .from('subscriptions')
        .insert({
          organization_id: organizationId,
          plan: 'free',
          status: 'active',
        });

      if (subError) {
        console.error('Failed to create subscription:', subError);
        // Continue anyway - subscription can be created later
      }
    }

    // Create or update user record
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .upsert({
        auth_id: user.id,
        email: email,
        first_name: firstName,
        last_name: lastName,
        organization_id: organizationId,
      }, {
        onConflict: 'auth_id',
      })
      .select('id')
      .single();

    if (userError) {
      console.error('Failed to create user:', userError);
      return NextResponse.json({ error: 'Failed to create user record' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      userId: newUser.id,
      organizationId: organizationId,
      created: true 
    });
  } catch (error: any) {
    console.error('Ensure user error:', error);
    
    await logException(error, {
      route: '/api/users/ensure',
      method: 'POST',
      errorType: 'auth_error',
    });

    return NextResponse.json(
      { error: error.message || 'Failed to ensure user record' },
      { status: 500 }
    );
  }
}
