import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdmin } from '@/lib/seo/admin-auth';
import { scoreAllPages } from '@/lib/seo/content-scoring';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin } = auth;

    const scores = await scoreAllPages(supabaseAdmin);

    const totalPages = scores.length;
    const avgScore =
      totalPages > 0
        ? Math.round(scores.reduce((sum, s) => sum + s.score.overall, 0) / totalPages)
        : 0;
    const excellent = scores.filter((s) => s.score.overall >= 80).length;
    const good = scores.filter((s) => s.score.overall >= 60 && s.score.overall < 80).length;
    const needsWork = scores.filter((s) => s.score.overall >= 40 && s.score.overall < 60).length;
    const poor = scores.filter((s) => s.score.overall < 40).length;

    return NextResponse.json({
      summary: { totalPages, avgScore, excellent, good, needsWork, poor },
      pages: scores,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
