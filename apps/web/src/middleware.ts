import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { createClient } from '@supabase/supabase-js';

const publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/reset-password', '/partners/apply'];
const authRoutes = ['/login', '/signup', '/forgot-password'];

// Reserved subdomains that cannot be used by MSPs
const RESERVED_SUBDOMAINS = ['www', 'app', 'api', 'admin', 'dashboard', 'help', 'support', 'docs', 'blog', 'mail', 'status'];

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
  const response = await updateSession(request);
  
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Check for custom subdomain (white-label)
  const subdomain = getSubdomain(hostname);
  
  if (subdomain) {
    // Look up the organization by subdomain
    // We use a lightweight Supabase client here (no auth needed for this lookup)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseAnonKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        
        const { data: org } = await supabase
          .from('organizations')
          .select('id, name, branding, organization_type')
          .eq('custom_subdomain', subdomain)
          .single();
        
        if (org) {
          // Set headers for downstream components to read branding
          response.headers.set('x-msp-org-id', org.id);
          response.headers.set('x-msp-org-name', org.name);
          response.headers.set('x-msp-branding', JSON.stringify(org.branding || {}));
          response.headers.set('x-msp-org-type', org.organization_type || 'standard');
        }
      } catch {
        // Subdomain lookup failed, continue without branding
      }
    }
  }
  
  // Allow public routes and static files
  if (publicRoutes.includes(pathname) || pathname.startsWith('/auth/')) {
    return response;
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
