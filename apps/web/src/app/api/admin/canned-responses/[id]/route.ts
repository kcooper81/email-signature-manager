import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: userData } = await supabase
    .from('users')
    .select('is_super_admin')
    .eq('auth_id', user.id.toString())
    .single();
  if (!userData?.is_super_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { title, content, category, shortcut } = await request.json();
  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: 'Title and content required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('canned_responses')
    .update({
      title: title.trim(),
      content: content.trim(),
      category: category?.trim() || 'general',
      shortcut: shortcut?.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: userData } = await supabase
    .from('users')
    .select('is_super_admin')
    .eq('auth_id', user.id.toString())
    .single();
  if (!userData?.is_super_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { error } = await supabase
    .from('canned_responses')
    .delete()
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  return NextResponse.json({ success: true });
}
