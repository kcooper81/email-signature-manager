import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: userData } = await supabase
    .from('users')
    .select('is_super_admin, super_admin_role')
    .eq('auth_id', user.id.toString())
    .single();
  if (!userData?.is_super_admin || userData.super_admin_role === 'support') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { data, error } = await supabase
    .from('canned_responses')
    .select('*')
    .order('category')
    .order('title');

  if (error) return NextResponse.json({ error: 'Failed to load' }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: userData } = await supabase
    .from('users')
    .select('id, is_super_admin, super_admin_role')
    .eq('auth_id', user.id.toString())
    .single();
  if (!userData?.is_super_admin || userData.super_admin_role === 'support') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { title, content, category, shortcut } = await request.json();
  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: 'Title and content required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('canned_responses')
    .insert({
      title: title.trim(),
      content: content.trim(),
      category: category?.trim() || 'general',
      shortcut: shortcut?.trim() || null,
      created_by: userData.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  return NextResponse.json({ data });
}
