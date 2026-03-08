import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdmin } from '@/lib/seo/admin-auth';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin } = auth;

    const { searchParams } = request.nextUrl;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(200, parseInt(searchParams.get('limit') || '50', 10)));
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('seo_snapshots')
      .select('*', { count: 'exact' })
      .order('snapshot_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (startDate) {
      query = query.gte('snapshot_date', startDate);
    }
    if (endDate) {
      query = query.lte('snapshot_date', endDate);
    }

    const { data, count, error } = await query;

    if (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    return NextResponse.json({ data: data || [], total: count || 0 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
