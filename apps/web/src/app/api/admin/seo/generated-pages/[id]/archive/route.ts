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

    // Fetch the generated page to verify it exists
    const { data: generatedPage, error: fetchError } = await supabaseAdmin
      .from('seo_generated_pages')
      .select('id, status, page_url, slug')
      .eq('id', id)
      .single();

    if (fetchError || !generatedPage) {
      return NextResponse.json({ error: 'Generated page not found' }, { status: 404 });
    }

    if (generatedPage.status === 'archived') {
      return NextResponse.json(
        { error: 'Page is already archived' },
        { status: 400 }
      );
    }

    // Update status to archived
    const { error: updateError } = await supabaseAdmin
      .from('seo_generated_pages')
      .update({ status: 'archived' })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Log to seo_change_log
    await supabaseAdmin.from('seo_change_log').insert({
      action: 'page_archived',
      page_url: generatedPage.page_url || generatedPage.slug,
      details: {
        generated_page_id: id,
        archived_by_user: userId,
      },
    });

    return NextResponse.json({
      success: true,
      generated_page_id: id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
