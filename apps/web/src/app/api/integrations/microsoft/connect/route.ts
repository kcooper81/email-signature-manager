import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getMicrosoftAuthUrl } from '@/lib/microsoft/oauth';
import { getPlan } from '@/lib/billing/plans';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check plan — Microsoft 365 requires Professional or above
  const { data: userData } = await supabase
    .from('users')
    .select('organization_id')
    .eq('auth_id', user.id)
    .single();

  if (userData?.organization_id) {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('plan')
      .eq('organization_id', userData.organization_id)
      .single();

    const plan = getPlan(subscription?.plan || 'free');
    if (!plan.features.microsoft365) {
      return NextResponse.redirect(new URL('/integrations?error=upgrade_required', request.url));
    }
  }

  const state = Buffer.from(JSON.stringify({
    userId: user.id,
    timestamp: Date.now(),
  })).toString('base64');

  const authUrl = getMicrosoftAuthUrl(state);

  return NextResponse.redirect(authUrl);
}
