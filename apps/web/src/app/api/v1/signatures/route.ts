import { NextRequest, NextResponse } from 'next/server';
import { authenticateApiKey, type ApiKeyAuth } from '@/lib/api-keys';
import { createServiceClient } from '@/lib/supabase/server';
import { renderSignatureToHtml } from '@/lib/signature-renderer';
import { resolveDisclaimersForUser } from '@/lib/disclaimer-engine';
import { logException } from '@/lib/error-logging';

export const dynamic = 'force-dynamic';

/**
 * GET /api/v1/signatures
 * Returns rendered signature HTML for all active users in the org.
 */
export async function GET(request: NextRequest) {
  // Authenticate
  const authResult = await authenticateApiKey(request);
  if (authResult instanceof NextResponse) return authResult;
  const auth: ApiKeyAuth = authResult;

  try {
    const supabase = createServiceClient();

    // Get the org's default template
    const { data: template, error: templateError } = await supabase
      .from('signature_templates')
      .select('*')
      .eq('organization_id', auth.organizationId)
      .eq('is_default', true)
      .single();

    if (templateError || !template) {
      // Fall back to any template
      const { data: fallback } = await supabase
        .from('signature_templates')
        .select('*')
        .eq('organization_id', auth.organizationId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!fallback) {
        return NextResponse.json(
          { error: 'No signature template found for this organization' },
          { status: 404 },
        );
      }

      return buildSignaturesResponse(supabase, fallback, auth, request);
    }

    return buildSignaturesResponse(supabase, template, auth, request);
  } catch (error) {
    await logException(error, {
      route: '/api/v1/signatures',
      method: 'GET',
      organizationId: auth.organizationId,
      errorType: 'api_error',
      metadata: { apiKeyId: auth.keyId },
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function buildSignaturesResponse(
  supabase: ReturnType<typeof createServiceClient>,
  template: any,
  auth: ApiKeyAuth,
  request?: NextRequest,
) {
  // Pagination parameters
  const url = request ? new URL(request.url) : null;
  const pageParam = url?.searchParams.get('page');
  const limitParam = url?.searchParams.get('limit');
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(limitParam || '50', 10) || 50));
  const offset = (page - 1) * limit;

  // Get total count
  const { count: totalCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('organization_id', auth.organizationId)
    .is('deleted_at', null)
    .eq('is_active', true);

  // Fetch paginated active users
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')
    .eq('organization_id', auth.organizationId)
    .is('deleted_at', null)
    .eq('is_active', true)
    .order('created_at', { ascending: true })
    .range(offset, offset + limit - 1);

  if (usersError) throw usersError;
  if (!users || users.length === 0) {
    return NextResponse.json(
      { data: [], meta: { count: 0, total: totalCount || 0, page, limit } },
      { headers: cacheHeaders() },
    );
  }

  const blocks = (template.blocks as any[]) || [];
  const signatures = await Promise.all(
    users.map((user) => renderUserSignature(supabase, user, blocks, template.name, auth)),
  );

  return NextResponse.json(
    {
      data: signatures,
      meta: { count: signatures.length, total: totalCount || 0, page, limit },
    },
    { headers: cacheHeaders() },
  );
}

async function renderUserSignature(
  supabase: any,
  user: any,
  blocks: any[],
  templateName: string,
  auth: ApiKeyAuth,
) {
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

  return {
    userId: user.id,
    email: user.email,
    name: [user.first_name, user.last_name].filter(Boolean).join(' ') || user.email,
    templateName,
    html: finalHtml,
  };
}

function cacheHeaders(): Record<string, string> {
  return {
    'Cache-Control': 'public, max-age=300',
  };
}
