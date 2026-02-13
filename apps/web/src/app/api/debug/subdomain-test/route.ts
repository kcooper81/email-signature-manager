import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const parts = hostname.split('.');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // Get subdomain
  let subdomain = null;
  if (parts.length >= 3 && !hostname.includes('localhost')) {
    subdomain = parts[0].toLowerCase();
  }
  
  // Look up org
  let org = null;
  if (subdomain) {
    const { data } = await supabase
      .from('organizations')
      .select('id, name, custom_subdomain, organization_type, branding')
      .eq('custom_subdomain', subdomain)
      .single();
    org = data;
  }
  
  // Get all orgs with custom subdomains
  const { data: allOrgs } = await supabase
    .from('organizations')
    .select('id, name, custom_subdomain, organization_type')
    .not('custom_subdomain', 'is', null);
  
  return NextResponse.json({
    hostname,
    parts,
    detectedSubdomain: subdomain,
    foundOrg: org,
    allOrgsWithSubdomains: allOrgs,
    headers: {
      host: request.headers.get('host'),
      'x-forwarded-host': request.headers.get('x-forwarded-host'),
      'x-forwarded-proto': request.headers.get('x-forwarded-proto'),
    }
  });
}
