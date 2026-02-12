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

// DEBUG VERSION - GET /api/debug/check-subdomain?subdomain=xxx
export async function GET(request: NextRequest) {
  const debugLog: any[] = [];
  
  try {
    const { searchParams } = new URL(request.url);
    const subdomain = searchParams.get('subdomain')?.toLowerCase();

    debugLog.push({ step: 'Input received', subdomain });

    if (!subdomain) {
      debugLog.push({ step: 'Validation failed', reason: 'No subdomain provided' });
      return NextResponse.json({ available: false, error: 'Subdomain is required', debug: debugLog });
    }

    // Validate format
    if (subdomain.length < 3 || subdomain.length > 63) {
      debugLog.push({ step: 'Validation failed', reason: 'Length check', length: subdomain.length });
      return NextResponse.json({ available: false, error: 'Subdomain must be 3-63 characters', debug: debugLog });
    }

    const formatRegex = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;
    if (!formatRegex.test(subdomain) && subdomain.length > 2) {
      debugLog.push({ step: 'Validation failed', reason: 'Format check', subdomain });
      return NextResponse.json({ available: false, error: 'Invalid subdomain format', debug: debugLog });
    }

    if (subdomain.includes('--')) {
      debugLog.push({ step: 'Validation failed', reason: 'Consecutive hyphens' });
      return NextResponse.json({ available: false, error: 'Cannot contain consecutive hyphens', debug: debugLog });
    }

    // Check reserved list
    if (RESERVED_SUBDOMAINS.includes(subdomain)) {
      debugLog.push({ step: 'Validation failed', reason: 'Reserved subdomain', subdomain });
      return NextResponse.json({ available: false, error: 'This subdomain is reserved', debug: debugLog });
    }

    debugLog.push({ step: 'Validation passed' });

    const supabase = await createClient();

    // Get current user's org to exclude from check
    const { data: { user } } = await supabase.auth.getUser();
    let currentOrgId: string | null = null;

    debugLog.push({ step: 'Auth check', hasUser: !!user, userId: user?.id });

    if (user) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('organization_id')
        .eq('auth_id', user.id)
        .single();
      
      currentOrgId = userData?.organization_id || null;
      debugLog.push({ step: 'User org lookup', currentOrgId, error: userError?.message });
    }

    // Check if subdomain is already taken
    debugLog.push({ step: 'Starting DB query', subdomain, excludingOrgId: currentOrgId });

    let query = supabase
      .from('organizations')
      .select('id, name, custom_subdomain')
      .eq('custom_subdomain', subdomain);

    if (currentOrgId) {
      query = query.neq('id', currentOrgId);
    }

    const { data: existingOrg, error: queryError } = await query.maybeSingle();

    debugLog.push({ 
      step: 'DB query result', 
      foundOrg: !!existingOrg,
      orgData: existingOrg,
      queryError: queryError?.message,
      errorCode: queryError?.code
    });

    // If there's a real error (not just no rows), return unavailable
    if (queryError) {
      debugLog.push({ step: 'Query error occurred', error: queryError });
      return NextResponse.json({ 
        available: false, 
        error: queryError.message,
        debug: debugLog 
      });
    }

    const isAvailable = !existingOrg;
    debugLog.push({ step: 'Final result', available: isAvailable });

    return NextResponse.json({
      available: isAvailable,
      subdomain,
      debug: debugLog
    });
  } catch (error: any) {
    debugLog.push({ step: 'Exception caught', error: error.message, stack: error.stack });
    return NextResponse.json({ 
      available: false, 
      error: error.message,
      debug: debugLog 
    });
  }
}
