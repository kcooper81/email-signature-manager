import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getHubSpotAuthUrl } from '@/lib/hubspot/oauth';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const state = Buffer.from(
    JSON.stringify({
      userId: user.id,
      timestamp: Date.now(),
    })
  ).toString('base64');

  const authUrl = getHubSpotAuthUrl(state);

  return NextResponse.redirect(authUrl);
}
