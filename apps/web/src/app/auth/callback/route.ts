import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next');
  
  // Get base URL - use VERCEL_URL in production or custom domain
  const getBaseUrl = () => {
    // If NEXT_PUBLIC_APP_URL is set, use it
    if (process.env.NEXT_PUBLIC_APP_URL) {
      return process.env.NEXT_PUBLIC_APP_URL;
    }
    // In Vercel production, use VERCEL_URL
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    // Fallback to localhost for development
    return 'http://localhost:3000';
  };
  
  const baseUrl = getBaseUrl();

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // If a specific next URL was provided, use it
      if (next) {
        return NextResponse.redirect(`${baseUrl}${next}`);
      }

      // Otherwise, check user role to determine redirect
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('role, organization_id')
          .eq('auth_id', user.id)
          .maybeSingle();

        // If user record doesn't exist, this is a new signup - create organization and user
        if (!userData) {
          const metadata = user.user_metadata || {};
          // Support both custom signup metadata and Google OAuth metadata
          const firstName = metadata.first_name || metadata.given_name || '';
          const lastName = metadata.last_name || metadata.family_name || '';
          const organizationName = metadata.organization_name || (firstName ? `${firstName}'s Organization` : 'My Organization');

          // If we don't have enough info for auto-setup (e.g., Google OAuth without org name),
          // redirect to setup-profile to collect the missing fields
          if (!metadata.organization_name && !firstName) {
            return NextResponse.redirect(`${baseUrl}/setup-profile`);
          }

          // Generate slug from organization name
          let baseSlug = organizationName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .substring(0, 50);

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
              slug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
              attempts++;
            }
          }

          // Use admin client to bypass RLS policies
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
            return NextResponse.redirect(`${baseUrl}/login?error=setup_failed`);
          }

          // Create user record using admin client
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
            return NextResponse.redirect(`${baseUrl}/login?error=setup_failed`);
          }

          // Create default free subscription
          const { error: subError } = await supabaseAdmin
            .from('subscriptions')
            .insert({
              organization_id: newOrg.id,
              plan: 'free',
              status: 'active',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });

          if (subError) {
            console.error('Failed to create subscription:', subError);
          }

          // Redirect new owner to dashboard
          return NextResponse.redirect(`${baseUrl}/dashboard?welcome=true`);
        }

        // Redirect members to their portal, admins/owners to dashboard
        const destination = userData?.role === 'member' ? '/my-profile' : '/dashboard';
        return NextResponse.redirect(`${baseUrl}${destination}`);
      }

      // Fallback to dashboard if we can't determine role
      return NextResponse.redirect(`${baseUrl}/dashboard`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${baseUrl}/login?error=auth_callback_error`);
}
