import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';

// GET /api/admin/platform-admins/search?q=... — search users to add as admin
export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = createServiceClient();

    // Verify super admin
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('id, is_super_admin, super_admin_role')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.is_super_admin || userData.super_admin_role !== 'super_admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const query = request.nextUrl.searchParams.get('q')?.trim();
    if (!query || query.length < 2) {
      return NextResponse.json({ users: [] });
    }

    // Sanitize query to prevent PostgREST filter injection
    const sanitizedQuery = query.replace(/[,%()\\]/g, '');
    if (!sanitizedQuery || sanitizedQuery.length < 2) {
      return NextResponse.json({ users: [] });
    }

    // Search by email, first name, or last name — exclude existing admins
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id, email, first_name, last_name, organization_id')
      .eq('is_super_admin', false)
      .or(`email.ilike.%${sanitizedQuery}%,first_name.ilike.%${sanitizedQuery}%,last_name.ilike.%${sanitizedQuery}%`)
      .limit(20);

    if (error) {
      console.error('User search error:', error);
      return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }

    // Get org names for context
    const orgIds = [...new Set((data || []).map(u => u.organization_id).filter(Boolean))];
    let orgMap: Record<string, string> = {};

    if (orgIds.length > 0) {
      const { data: orgs } = await supabaseAdmin
        .from('organizations')
        .select('id, name')
        .in('id', orgIds);

      orgMap = (orgs || []).reduce((acc, org) => {
        acc[org.id] = org.name;
        return acc;
      }, {} as Record<string, string>);
    }

    const users = (data || []).map(u => ({
      id: u.id,
      email: u.email,
      firstName: u.first_name,
      lastName: u.last_name,
      organizationName: u.organization_id ? orgMap[u.organization_id] || null : null,
    }));

    return NextResponse.json({ users });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
