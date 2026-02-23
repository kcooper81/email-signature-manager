import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdmin } from '@/lib/seo/admin-auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin } = auth;

    const { id } = await params;

    // Parse request body
    const body = await request.json();
    const { notes } = body;

    if (typeof notes !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request body. "notes" must be a string.' },
        { status: 400 }
      );
    }

    // Verify the recommendation exists
    const { data: recommendation, error: fetchError } = await supabaseAdmin
      .from('seo_recommendations')
      .select('id')
      .eq('id', id)
      .single();

    if (fetchError || !recommendation) {
      return NextResponse.json({ error: 'Recommendation not found' }, { status: 404 });
    }

    // Update admin notes
    const { error: updateError } = await supabaseAdmin
      .from('seo_recommendations')
      .update({ admin_notes: notes })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      recommendation_id: id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
