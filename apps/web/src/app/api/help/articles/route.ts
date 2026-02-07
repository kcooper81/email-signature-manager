import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const type = searchParams.get('type');
  const location = searchParams.get('location'); // 'marketing' or 'dashboard'

  const supabase = createClient();

  let query = supabase
    .from('help_articles')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (category) {
    query = query.eq('category', category);
  }

  if (type) {
    query = query.eq('article_type', type);
  }

  if (location === 'marketing') {
    query = query.eq('show_in_marketing', true);
  } else if (location === 'dashboard') {
    query = query.eq('show_in_dashboard', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching help articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }

  return NextResponse.json({ articles: data });
}
