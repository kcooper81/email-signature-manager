import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdmin } from '@/lib/seo/admin-auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin } = auth;

    const { id } = await params;

    // Fetch the issue to verify it exists
    const { data: issue, error: fetchError } = await supabaseAdmin
      .from('seo_issues')
      .select('id, status')
      .eq('id', id)
      .single();

    if (fetchError || !issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    if (issue.status === 'dismissed') {
      return NextResponse.json(
        { error: 'Issue is already dismissed' },
        { status: 400 }
      );
    }

    // Update status to dismissed
    const { error: updateError } = await supabaseAdmin
      .from('seo_issues')
      .update({ status: 'dismissed' })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      issue_id: id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
