import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { submitToIndexNow, getAllSitemapUrls } from '@/lib/seo/indexnow';

// POST: Submit URLs to IndexNow
// Body: { urls?: string[], submitAll?: boolean }
export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check super admin
  const { data: userData } = await supabase
    .from('users')
    .select('is_super_admin, super_admin_role')
    .eq('auth_id', user.id)
    .single();

  if (!userData?.is_super_admin || userData.super_admin_role === 'support') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  let urls: string[] = [];

  if (body.submitAll) {
    // Submit all sitemap URLs
    urls = await getAllSitemapUrls();
  } else if (body.urls && Array.isArray(body.urls)) {
    urls = body.urls;
  } else {
    return NextResponse.json({ error: 'Provide urls array or submitAll: true' }, { status: 400 });
  }

  const result = await submitToIndexNow(urls);

  return NextResponse.json(result);
}
