import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdmin } from '@/lib/seo/admin-auth';
import { enhanceRecommendation } from '@/lib/seo/ai-enhancer';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin } = auth;

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

    // Check if Claude API is enabled in settings
    const { data: settings } = await supabaseAdmin
      .from('seo_settings')
      .select('claude_api_enabled')
      .single();

    if (!settings?.claude_api_enabled) {
      return NextResponse.json(
        { error: 'Claude API enhancement is not enabled. Enable it in SEO settings.' },
        { status: 400 }
      );
    }

    // Enhance the recommendation using AI
    const enhancedValue = await enhanceRecommendation(
      recommendation.recommendation_type,
      recommendation.current_value,
      recommendation.suggested_value,
      recommendation.data_basis
    );

    // Save the enhanced value
    const { error: updateError } = await supabaseAdmin
      .from('seo_recommendations')
      .update({ ai_enhanced_value: enhancedValue })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      recommendation_id: id,
      ai_enhanced_value: enhancedValue,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
