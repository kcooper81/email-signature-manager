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
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !generatedPage) {
      return NextResponse.json({ error: 'Generated page not found' }, { status: 404 });
    }

    if (generatedPage.status === 'published') {
      return NextResponse.json(
        { error: 'Page is already published' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Update status to published and set published_at
    const { data: updatedPage, error: updateError } = await supabaseAdmin
      .from('seo_generated_pages')
      .update({
        status: 'published',
        published_at: now,
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Log to seo_change_log
    await supabaseAdmin.from('seo_change_log').insert({
      action: 'page_published',
      page_url: generatedPage.page_url || generatedPage.slug,
      details: {
        generated_page_id: id,
        published_by_user: userId,
        published_at: now,
      },
    });

    return NextResponse.json(updatedPage);
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
