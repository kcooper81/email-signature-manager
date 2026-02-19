import { createClient, createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { createUserWithOrganization, sanitizeRedirectUrl } from '@/lib/auth/create-user-org';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  // BUG-08 fix: Validate redirect URL to prevent open redirects
  const next = sanitizeRedirectUrl(searchParams.get('next'));

  // Get base URL
  const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_APP_URL) {
      return process.env.NEXT_PUBLIC_APP_URL;
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return 'http://localhost:3000';
  };

  const baseUrl = getBaseUrl();

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // If a specific next URL was provided (and it's not the default), use it
      if (next !== '/dashboard') {
        return NextResponse.redirect(`${baseUrl}${next}`);
      }

      // Otherwise, check user role to determine redirect
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const supabaseAdmin = createServiceClient();

        const { data: userData } = await supabaseAdmin
          .from('users')
          .select('role, organization_id')
          .eq('auth_id', user.id)
          .maybeSingle();

        // If user record doesn't exist, this is a new signup - create organization and user
        if (!userData) {
          // Check if a stub record exists for this email (e.g., from Google Workspace sync)
          if (user.email) {
            const { data: emailMatch } = await supabaseAdmin
              .from('users')
              .select('id, organization_id, role, auth_id')
              .eq('email', user.email)
              .is('auth_id', null)
              .maybeSingle();

            if (emailMatch) {
              // Link auth to existing stub record — preserve existing role
              await supabaseAdmin
                .from('users')
                .update({
                  auth_id: user.id,
                  updated_at: new Date().toISOString(),
                })
                .eq('id', emailMatch.id);

              const destination = emailMatch.role === 'member' ? '/my-profile' : '/dashboard';
              return NextResponse.redirect(`${baseUrl}${destination}`);
            }
          }

          const metadata = user.user_metadata || {};
          const firstName = metadata.first_name || metadata.given_name || '';
          const lastName = metadata.last_name || metadata.family_name || '';
          const organizationName = metadata.organization_name || (firstName ? `${firstName}'s Organization` : 'My Organization');

          // BUG-12 fix: Redirect to setup-profile if org name OR first name is missing
          if (!metadata.organization_name || !firstName) {
            return NextResponse.redirect(`${baseUrl}/setup-profile`);
          }

          // BUG-09 fix: Use shared utility with cleanup on failure
          const result = await createUserWithOrganization({
            supabaseAdmin,
            authId: user.id,
            email: user.email!,
            firstName,
            lastName,
            organizationName,
          });

          if (!result.success) {
            console.error('Auth callback org creation failed:', result.error);
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
