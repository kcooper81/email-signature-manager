import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Reserved subdomains that cannot be used
const RESERVED_SUBDOMAINS = [
  'www', 'app', 'api', 'admin', 'dashboard', 'help', 'support',
  'docs', 'blog', 'mail', 'status', 'cdn', 'static', 'assets',
  'auth', 'login', 'signup', 'account', 'billing', 'payment',
  'test', 'staging', 'dev', 'demo', 'preview', 'beta', 'alpha',
  'siggly', 'signature', 'signatures', 'email', 'msp', 'partner',
];

// GET /api/settings/branding/check-subdomain?subdomain=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subdomain = searchParams.get('subdomain')?.toLowerCase();

    if (!subdomain) {
      return NextResponse.json({ available: false, error: 'Subdomain is required' });
    }

    // Validate format
    if (subdomain.length < 3 || subdomain.length > 63) {
      return NextResponse.json({ available: false, error: 'Subdomain must be 3-63 characters' });
    }

    if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(subdomain) && subdomain.length > 2) {
      return NextResponse.json({ available: false, error: 'Invalid subdomain format' });
    }

    if (subdomain.includes('--')) {
      return NextResponse.json({ available: false, error: 'Cannot contain consecutive hyphens' });
    }

    // Check reserved list
    if (RESERVED_SUBDOMAINS.includes(subdomain)) {
      return NextResponse.json({ available: false, error: 'This subdomain is reserved' });
    }

    const supabase = await createClient();

    // Get current user's org to exclude from check
    const { data: { user } } = await supabase.auth.getUser();
    let currentOrgId: string | null = null;

    if (user) {
      const { data: userData } = await supabase
        .from('users')
        .select('organization_id')
        .eq('auth_id', user.id)
        .single();
      
      currentOrgId = userData?.organization_id || null;
    }

    // Check if subdomain is already taken
    let query = supabase
      .from('organizations')
      .select('id')
      .eq('custom_subdomain', subdomain);

    if (currentOrgId) {
      query = query.neq('id', currentOrgId);
    }

    // Use maybeSingle() instead of single() to avoid error when no rows found
    const { data: existingOrg, error: queryError } = await query.maybeSingle();

    // If there's a real error (not just no rows), return unavailable
    if (queryError) {
      console.error('Subdomain check error:', queryError);
      return NextResponse.json({ available: false, error: queryError.message });
    }

    return NextResponse.json({
      available: !existingOrg,
      subdomain,
    });
  } catch (error: any) {
    console.error('Subdomain check exception:', error);
    return NextResponse.json({ available: false, error: error.message });
  }
}
