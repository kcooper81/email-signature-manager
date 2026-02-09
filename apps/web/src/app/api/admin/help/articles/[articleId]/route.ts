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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  const supabase = createClient();
  
  if (!await isSuperAdmin(supabase)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { articleId } = await params;
  const adminClient = createServiceClient();

  const { data, error } = await adminClient
    .from('help_articles')
    .select('*')
    .eq('id', articleId)
    .single();

  if (error) {
    console.error('Error fetching help article:', error);
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json({ article: data });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  const supabase = createClient();
  
  if (!await isSuperAdmin(supabase)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { articleId } = await params;

  try {
    const body = await request.json();
    const adminClient = createServiceClient();

    const { data, error } = await adminClient
      .from('help_articles')
      .update(body)
      .eq('id', articleId)
      .select()
      .single();

    if (error) {
      console.error('Error updating help article:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ article: data });
  } catch (err: any) {
    console.error('Error updating help article:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  const supabase = createClient();
  
  if (!await isSuperAdmin(supabase)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { articleId } = await params;
  const adminClient = createServiceClient();

  const { error } = await adminClient
    .from('help_articles')
    .delete()
    .eq('id', articleId);

  if (error) {
    console.error('Error deleting help article:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
