import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');
  const userId = searchParams.get('u');
  const templateId = searchParams.get('t');
  const linkType = searchParams.get('type');
  const campaign = searchParams.get('campaign');

  if (!url) {
    return NextResponse.json({ error: 'URL required' }, { status: 400 });
  }

  try {
    const supabase = createClient();

    // Get user's organization if userId provided
    let organizationId = null;
    if (userId) {
      const { data: user } = await supabase
        .from('users')
        .select('organization_id')
        .eq('id', userId)
        .single();
      
      organizationId = user?.organization_id;
    }

    // Extract UTM parameters from URL
    const targetUrl = new URL(url);
    const utmSource = targetUrl.searchParams.get('utm_source');
    const utmMedium = targetUrl.searchParams.get('utm_medium');
    const utmCampaign = targetUrl.searchParams.get('utm_campaign');
    const utmContent = targetUrl.searchParams.get('utm_content');

    // Log the click
    if (organizationId) {
      await supabase.from('signature_clicks').insert({
        organization_id: organizationId,
        user_id: userId || null,
        template_id: templateId || null,
        link_url: url,
        link_type: linkType || 'custom',
        campaign_name: campaign || null,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        user_agent: request.headers.get('user-agent'),
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        referrer: request.headers.get('referer'),
      });
    }

    // Redirect to the actual URL
    return NextResponse.redirect(url);
  } catch (error) {
    console.error('Click tracking error:', error);
    // Still redirect even if tracking fails
    return NextResponse.redirect(url);
  }
}
