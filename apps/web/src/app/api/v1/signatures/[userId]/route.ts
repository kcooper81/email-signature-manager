import { NextRequest, NextResponse } from 'next/server';
import { authenticateApiKey, type ApiKeyAuth } from '@/lib/api-keys';
import { createServiceClient } from '@/lib/supabase/server';
import { renderSignatureToHtml } from '@/lib/signature-renderer';
import { resolveDisclaimersForUser } from '@/lib/disclaimer-engine';
import { logException } from '@/lib/error-logging';

export const dynamic = 'force-dynamic';

// UUID v4 pattern
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * GET /api/v1/signatures/[userId]
 * Returns rendered signature HTML for a single user.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  // Authenticate
  const authResult = await authenticateApiKey(request);
  if (authResult instanceof NextResponse) return authResult;
  const auth: ApiKeyAuth = authResult;

  const { userId } = params;

  // Validate UUID format
  if (!UUID_RE.test(userId)) {
    return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
  }

  try {
    const supabase = createServiceClient();

    // Fetch user — scoped to the API key's org
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .eq('organization_id', auth.organizationId)
      .is('deleted_at', null)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get the org's default template
    let template;
    const { data: defaultTemplate } = await supabase
      .from('signature_templates')
      .select('*')
      .eq('organization_id', auth.organizationId)
      .eq('is_default', true)
      .single();

    template = defaultTemplate;

    if (!template) {
      const { data: fallback } = await supabase
        .from('signature_templates')
        .select('*')
        .eq('organization_id', auth.organizationId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      template = fallback;
    }

    if (!template) {
      return NextResponse.json(
        { error: 'No signature template found for this organization' },
        { status: 404 },
      );
    }

    const blocks = (template.blocks as any[]) || [];

    const context = {
      user: {
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email,
        title: user.title || '',
        department: user.department || '',
        phone: user.phone || '',
        mobile: user.mobile || '',
        calendlyUrl: user.calendly_url || '',
        linkedinUrl: user.linkedin_url || '',
        twitterUrl: user.twitter_url || '',
        githubUrl: user.github_url || '',
        personalWebsite: user.personal_website || '',
        instagramUrl: user.instagram_url || '',
        facebookUrl: user.facebook_url || '',
        youtubeUrl: user.youtube_url || '',
        googleBookingUrl: user.google_booking_url || '',
      },
      organization: { name: auth.orgName },
    };

    const { html } = await renderSignatureToHtml(blocks, context);

    // Append disclaimers
    let finalHtml = html;
    try {
      const disclaimerResult = await resolveDisclaimersForUser(
        {
          userId: user.id,
          userEmail: user.email,
          userDepartment: user.department || undefined,
          userSource: user.source || undefined,
          organizationId: auth.organizationId,
          organizationDomain: auth.orgDomain || undefined,
          organizationIndustry: auth.orgIndustry || undefined,
        },
        auth.parentOrganizationId,
        supabase,
      );
      if (disclaimerResult.combinedHtml) {
        finalHtml += disclaimerResult.combinedHtml;
      }
    } catch {
      // Disclaimer failure shouldn't break the response
    }

    return NextResponse.json(
      {
        data: {
          userId: user.id,
          email: user.email,
          name: [user.first_name, user.last_name].filter(Boolean).join(' ') || user.email,
          templateName: template.name,
          html: finalHtml,
        },
      },
      {
        headers: { 'Cache-Control': 'public, max-age=300' },
      },
    );
  } catch (error) {
    await logException(error, {
      route: '/api/v1/signatures/[userId]',
      method: 'GET',
      organizationId: auth.organizationId,
      errorType: 'api_error',
      metadata: { apiKeyId: auth.keyId, userId },
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
