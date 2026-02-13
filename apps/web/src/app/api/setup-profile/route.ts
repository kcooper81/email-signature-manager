import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, organizationName } = await request.json();

    if (!firstName || !lastName || !organizationName) {
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

    // Check if user already has a profile
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

    // Create organization using service role (bypasses RLS)
    // Generate slug from organization name
    let baseSlug = organizationName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);
    
    // Ensure slug is unique by appending random string if needed
    let slug = baseSlug;
    let slugExists = true;
    let attempts = 0;
    
    while (slugExists && attempts < 5) {
      const { data: existingOrg } = await supabaseAdmin
        .from('organizations')
        .select('id')
        .eq('slug', slug)
        .maybeSingle();
      
      if (!existingOrg) {
        slugExists = false;
      } else {
        // Append random 4-digit number
        slug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
        attempts++;
      }
    }
    
    const { data: newOrg, error: orgError } = await supabaseAdmin
      .from('organizations')
      .insert({
        name: organizationName,
        slug: slug,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (orgError || !newOrg) {
      console.error('Failed to create organization:', orgError);
      return NextResponse.json(
        { error: 'Failed to create organization' },
        { status: 500 }
      );
    }

    // Create user record using service role (bypasses RLS)
    const { error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        auth_id: user.id,
        email: user.email!,
        first_name: firstName,
        last_name: lastName,
        role: 'owner',
        organization_id: newOrg.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (userError) {
      console.error('Failed to create user record:', userError);
      return NextResponse.json(
        { error: 'Failed to create user profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Unexpected error in setup-profile:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to complete setup' },
      { status: 500 }
    );
  }
}
