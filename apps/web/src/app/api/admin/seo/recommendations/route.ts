import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdmin } from '@/lib/seo/admin-auth';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin } = auth;

    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status') || 'pending';
    const type = searchParams.get('type');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '20', 10)));
    const minConfidence = searchParams.get('minConfidence');
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('seo_recommendations')
      .select('*', { count: 'exact' })
      .eq('status', status)
      .order('confidence', { ascending: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (type) {
      query = query.eq('recommendation_type', type);
    }

    if (minConfidence) {
      const confidence = parseFloat(minConfidence);
      if (!isNaN(confidence)) {
        query = query.gte('confidence', confidence);
      }
    }

    const { data, count, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [], total: count || 0 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
