import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

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
          const firstName = metadata.first_name || '';
          const lastName = metadata.last_name || '';
          const organizationName = metadata.organization_name || `${firstName}'s Organization`;

          // Create organization
          const { data: newOrg, error: orgError } = await supabase
            .from('organizations')
            .insert({
              name: organizationName,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .select('id')
            .single();

          if (orgError || !newOrg) {
            console.error('Failed to create organization:', orgError);
            return NextResponse.redirect(`${baseUrl}/login?error=setup_failed`);
          }

          // Create user record
          const { error: userError } = await supabase
            .from('users')
            .insert({
              auth_id: user.id,
              email: user.email!,
              first_name: firstName,
              last_name: lastName,
              role: 'owner', // First user in org is owner
              organization_id: newOrg.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });

          if (userError) {
            console.error('Failed to create user record:', userError);
            return NextResponse.redirect(`${baseUrl}/login?error=setup_failed`);
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
