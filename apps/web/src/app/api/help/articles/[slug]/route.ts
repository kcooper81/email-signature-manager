import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const supabase = createClient();

  const { data, error } = await supabase
    .from('help_articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: 'Article not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ article: data });
}
