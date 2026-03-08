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

    // Fetch the recommendation
    const { data: recommendation, error: fetchError } = await supabaseAdmin
      .from('seo_recommendations')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !recommendation) {
      return NextResponse.json({ error: 'Recommendation not found' }, { status: 404 });
    }

    if (recommendation.status !== 'applied') {
      return NextResponse.json(
        { error: `Cannot rollback a recommendation with status "${recommendation.status}". Only applied recommendations can be rolled back.` },
        { status: 400 }
      );
    }

    // Remove or deactivate the content override for this page
    if (recommendation.page_url) {
      const { error: deleteError } = await supabaseAdmin
        .from('seo_content_overrides')
        .delete()
        .eq('page_url', recommendation.page_url);

      if (deleteError) {
        return NextResponse.json(
          { error: `Failed to remove content override: ${deleteError.message}` },
          { status: 500 }
        );
      }
    }

    // Update recommendation status
    const { error: updateError } = await supabaseAdmin
      .from('seo_recommendations')
      .update({
        status: 'rolled_back',
        applied_by: null,
        applied_at: null,
      })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Log the action
    await supabaseAdmin.from('seo_change_log').insert({
      action: 'override_rolled_back',
      page_url: recommendation.page_url,
      details: {
        recommendation_id: id,
        recommendation_type: recommendation.recommendation_type,
        rolled_back_by_user: userId,
      },
    });

    return NextResponse.json({
      success: true,
      recommendation_id: id,
      page_url: recommendation.page_url,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
