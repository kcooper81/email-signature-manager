import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { createClient } from '@/lib/supabase/server';

async function isSuperAdmin(supabase: ReturnType<typeof createClient>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: userData } = await supabase
    .from('users')
    .select('is_super_admin')
    .eq('auth_id', user.id)
    .single();

  return userData?.is_super_admin === true;
}

export async function GET() {
  const supabase = createClient();
  
  if (!await isSuperAdmin(supabase)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const adminClient = createServiceClient();
  
  const { data, error } = await adminClient
    .from('help_articles')
    .select('*')
    .order('category')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching help articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }

  return NextResponse.json({ articles: data });
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  
  if (!await isSuperAdmin(supabase)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, content, category, article_type, show_in_marketing, show_in_dashboard, sort_order, is_published } = body;

    if (!title || !slug || !content || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const adminClient = createServiceClient();

    const { data, error } = await adminClient
      .from('help_articles')
      .insert({
        title,
        slug,
        content,
        category,
        article_type: article_type || 'faq',
        show_in_marketing: show_in_marketing ?? true,
        show_in_dashboard: show_in_dashboard ?? true,
        sort_order: sort_order || 0,
        is_published: is_published ?? true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating help article:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ article: data });
  } catch (err: any) {
    console.error('Error creating help article:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
