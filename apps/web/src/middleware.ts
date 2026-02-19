import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { createClient } from '@supabase/supabase-js';

// Routes that don't require authentication
const publicRoutes = [
  '/', '/partners/apply', '/guide', '/suspended',
  '/pricing', '/features', '/about', '/contact', '/demo',
  '/blog', '/terms', '/privacy', '/help', '/compare', '/for',
  '/tools', '/use-cases', '/google-workspace', '/microsoft-365',
  '/industries', '/integrations', '/alternatives', '/platforms',
  '/email-signature-templates', '/email-signatures', '/guides',
  '/glossary', '/migrate-from', '/examples', '/case-studies',
  '/checklists', '/compliance', '/careers', '/security',
  '/support', '/resources', '/media-assets',
];

// Routes that authenticated users should NOT see (redirect to dashboard)
const authRoutes = ['/login', '/signup', '/forgot-password'];

// BUG-29 fix: Routes that should be accessible regardless of auth state
// reset-password needs a session from callback but should show error if expired
// setup-profile needs auth but handles its own redirect if not authenticated
const flexRoutes = ['/reset-password', '/setup-profile'];

// Reserved subdomains that cannot be used by MSPs
const RESERVED_SUBDOMAINS = ['www', 'app', 'api', 'admin', 'dashboard', 'help', 'support', 'docs', 'blog', 'mail', 'status'];

function isPublicRoute(pathname: string): boolean {
  // Exact match or prefix match for nested marketing routes
  return publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))
    || pathname.startsWith('/auth/')
    || pathname.startsWith('/invite/');
}

function isAuthRoute(pathname: string): boolean {
  return authRoutes.some(route => pathname === route);
}

// Extract subdomain from hostname
function getSubdomain(hostname: string): string | null {
  // Handle localhost development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return null;
  }

  // Expected format: subdomain.siggly.io or subdomain.domain.com
  const parts = hostname.split('.');

  // Need at least 3 parts for a subdomain (sub.domain.tld)
  if (parts.length >= 3) {
    const subdomain = parts[0];
    // Check if it's not a reserved subdomain
    if (!RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase())) {
      return subdomain.toLowerCase();
    }
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);

  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Check for custom subdomain (white-label)
  const subdomain = getSubdomain(hostname);

  if (subdomain) {
    // BUG-31 fix: Use service role key for subdomain lookup to bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        const { data: org } = await supabase
          .from('organizations')
          .select('id, name, branding, organization_type')
          .eq('custom_subdomain', subdomain)
          .single();

        if (org) {
          // BUG-30 fix: Sanitize header values to prevent header injection
          const safeName = (org.name || '').replace(/[\r\n]/g, '');
          const safeType = (org.organization_type || 'standard').replace(/[\r\n]/g, '');
          response.headers.set('x-msp-org-id', org.id);
          response.headers.set('x-msp-org-name', safeName);
          response.headers.set('x-msp-branding', JSON.stringify(org.branding || {}));
          response.headers.set('x-msp-org-type', safeType);
        }
      } catch {
        // Subdomain lookup failed, continue without branding
      }
    }
  }

  // Auth gating: redirect authenticated users away from auth routes
  if (user && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Auth gating: redirect unauthenticated users to login for protected routes
  // (skip public routes, auth routes, flex routes, static files, and API routes)
  const isFlexRoute = flexRoutes.some(route => pathname === route);
  if (!user && !isPublicRoute(pathname) && !isAuthRoute(pathname) && !isFlexRoute && !pathname.startsWith('/api/')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
