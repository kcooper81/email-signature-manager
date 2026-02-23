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

    if (recommendation.status !== 'pending') {
      return NextResponse.json(
        { error: `Recommendation is already ${recommendation.status}` },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Update recommendation status
    const { error: updateError } = await supabaseAdmin
      .from('seo_recommendations')
      .update({
        status: 'applied',
        applied_by: 'manual',
        applied_at: now,
      })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Create content override based on recommendation type
    if (recommendation.page_url) {
      const overrideData: Record<string, unknown> = {
        page_url: recommendation.page_url,
        is_active: true,
        recommendation_id: id,
        updated_at: now,
      };

      const suggestedValue = recommendation.suggested_value as Record<string, unknown>;

      switch (recommendation.recommendation_type) {
        case 'meta_title':
          overrideData.meta_title = suggestedValue.title || null;
          break;
        case 'meta_description':
          overrideData.meta_description = suggestedValue.description || null;
          break;
        case 'add_faq':
          overrideData.additional_faqs = suggestedValue.faqs || [];
          break;
        default:
          // Other types don't create content overrides directly
          break;
      }

      // Only upsert if we have something to override
      if (Object.keys(overrideData).length > 2) {
        const { error: upsertError } = await supabaseAdmin
          .from('seo_content_overrides')
          .upsert(overrideData, { onConflict: 'page_url' });

        if (upsertError) {
          return NextResponse.json(
            { error: `Override upsert failed: ${upsertError.message}` },
            { status: 500 }
          );
        }
      }
    }

    // Log the action
    await supabaseAdmin.from('seo_change_log').insert({
      action: 'override_applied',
      page_url: recommendation.page_url,
      details: {
        recommendation_id: id,
        recommendation_type: recommendation.recommendation_type,
        suggested_value: recommendation.suggested_value,
        applied_by_user: userId,
      },
    });

    return NextResponse.json({
      success: true,
      recommendation_id: id,
      type: recommendation.recommendation_type,
      page_url: recommendation.page_url,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
