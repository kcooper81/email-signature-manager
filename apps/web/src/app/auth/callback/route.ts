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
          .select('role')
          .eq('auth_id', user.id)
          .single();

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
