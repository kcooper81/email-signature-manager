import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdmin } from '@/lib/seo/admin-auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin, userId } = auth;

    const { id } = await params;

    const { data: recommendation, error: fetchError } = await supabaseAdmin
      .from('seo_recommendations')
      .select('id, status, recommendation_type, page_url')
      .eq('id', id)
      .single();

    if (fetchError || !recommendation) {
      return NextResponse.json({ error: 'Recommendation not found' }, { status: 404 });
    }

    if (recommendation.status !== 'dismissed') {
      return NextResponse.json(
        { error: `Cannot restore a recommendation with status "${recommendation.status}". Only dismissed recommendations can be restored.` },
        { status: 400 }
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from('seo_recommendations')
      .update({ status: 'pending' })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    await supabaseAdmin.from('seo_change_log').insert({
      action: 'recommendation_restored',
      page_url: recommendation.page_url,
      details: {
        recommendation_id: id,
        recommendation_type: recommendation.recommendation_type,
        restored_by_user: userId,
      },
    });

    return NextResponse.json({
      success: true,
      recommendation_id: id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
