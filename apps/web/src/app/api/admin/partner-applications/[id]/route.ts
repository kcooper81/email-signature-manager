import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

// Use service role for admin operations
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Reserved subdomains
const RESERVED_SUBDOMAINS = [
  'www', 'app', 'api', 'admin', 'dashboard', 'help', 'support',
  'docs', 'blog', 'mail', 'status', 'cdn', 'static', 'assets',
  'auth', 'login', 'signup', 'account', 'billing', 'payment',
  'test', 'staging', 'dev', 'demo', 'preview', 'beta', 'alpha',
  'siggly', 'signature', 'signatures', 'email', 'msp', 'partner',
];

interface ApproveRequest {
  action: 'approve';
  subdomain: string;
  partnerTier?: 'registered' | 'authorized' | 'premier';
  reviewNotes?: string;
}

interface RejectRequest {
  action: 'reject';
  reviewNotes?: string;
}

type ActionRequest = ApproveRequest | RejectRequest;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Verify user is platform admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('id, is_super_admin')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.is_super_admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get the application
    const { data: application, error: appError } = await supabaseAdmin
      .from('partner_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (appError || !application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (!['pending', 'under_review'].includes(application.status)) {
      return NextResponse.json(
        { error: 'Application has already been processed' },
        { status: 400 }
      );
    }

    const body: ActionRequest = await request.json();

    if (body.action === 'approve') {
      return handleApprove(id, body, application, userData.id);
    } else if (body.action === 'reject') {
      return handleReject(id, body, userData.id);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handleApprove(
  applicationId: string,
  body: ApproveRequest,
  application: any,
  reviewerId: string
) {
  const { subdomain, partnerTier = 'registered', reviewNotes } = body;

  // Validate subdomain
  if (!subdomain || subdomain.length < 3 || subdomain.length > 63) {
    return NextResponse.json({ error: 'Invalid subdomain' }, { status: 400 });
  }

  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');

  if (RESERVED_SUBDOMAINS.includes(sanitizedSubdomain)) {
    return NextResponse.json({ error: 'This subdomain is reserved' }, { status: 400 });
  }

  // Check subdomain availability
  const { data: existingOrg } = await supabaseAdmin
    .from('organizations')
    .select('id')
    .eq('custom_subdomain', sanitizedSubdomain)
    .single();

  if (existingOrg) {
    return NextResponse.json({ error: 'Subdomain is already taken' }, { status: 400 });
  }

  // Generate slug from company name
  const slug = application.company_name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50) + '-' + Date.now().toString(36);

  // Create the MSP organization
  const { data: newOrg, error: orgError } = await supabaseAdmin
    .from('organizations')
    .insert({
      name: application.company_name,
      slug,
      domain: application.website ? new URL(application.website).hostname : null,
      organization_type: 'msp',
      partner_tier: partnerTier,
      custom_subdomain: sanitizedSubdomain,
      branding: {},
    })
    .select('id')
    .single();

  if (orgError || !newOrg) {
    return NextResponse.json(
      { error: 'Failed to create organization: ' + orgError?.message },
      { status: 500 }
    );
  }

  // Update the application
  const { error: updateError } = await supabaseAdmin
    .from('partner_applications')
    .update({
      status: 'approved',
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
      review_notes: reviewNotes || null,
      organization_id: newOrg.id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', applicationId);

  if (updateError) {
    // Rollback org creation
    await supabaseAdmin.from('organizations').delete().eq('id', newOrg.id);
    return NextResponse.json(
      { error: 'Failed to update application: ' + updateError.message },
      { status: 500 }
    );
  }

  // Create audit log
  await supabaseAdmin.from('audit_logs').insert({
    organization_id: newOrg.id,
    user_id: reviewerId,
    action: 'partner_application_approved',
    resource_type: 'partner_application',
    resource_id: applicationId,
    metadata: {
      company_name: application.company_name,
      subdomain: sanitizedSubdomain,
      partner_tier: partnerTier,
    },
  });

  // TODO: Send approval email to partner with:
  // - Login instructions
  // - Subdomain URL
  // - Next steps

  return NextResponse.json({
    success: true,
    message: 'Application approved',
    organizationId: newOrg.id,
    subdomain: sanitizedSubdomain,
    portalUrl: `https://${sanitizedSubdomain}.siggly.io`,
  });
}

async function handleReject(
  applicationId: string,
  body: RejectRequest,
  reviewerId: string
) {
  const { reviewNotes } = body;

  const { error: updateError } = await supabaseAdmin
    .from('partner_applications')
    .update({
      status: 'rejected',
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
      review_notes: reviewNotes || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', applicationId);

  if (updateError) {
    return NextResponse.json(
      { error: 'Failed to update application: ' + updateError.message },
      { status: 500 }
    );
  }

  // TODO: Optionally send rejection email

  return NextResponse.json({
    success: true,
    message: 'Application rejected',
  });
}
