import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { stripe } from '@/lib/billing/stripe';
import { getOrCreatePartnerCoupon, type PartnerTier } from '@/lib/billing/partner-coupons';
import { sendPartnerApprovalEmail, sendPartnerRejectionEmail } from '@/lib/email/resend';

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
  sendNotification?: boolean;
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
      return handleReject(id, body, application, userData.id);
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

  // Check if subdomain is already taken (but allow if it's the existing org being converted)
  if (existingOrg && existingOrg.id !== application.existing_organization_id) {
    return NextResponse.json({ error: 'Subdomain is already taken' }, { status: 400 });
  }

  let finalOrgId: string;

  // Check if this is a conversion of an existing organization
  if (application.existing_organization_id) {
    // Convert existing organization to MSP
    const { error: convertError } = await supabaseAdmin
      .from('organizations')
      .update({
        organization_type: 'msp',
        partner_tier: partnerTier,
        custom_subdomain: sanitizedSubdomain,
        branding: {},
        updated_at: new Date().toISOString(),
      })
      .eq('id', application.existing_organization_id);

    if (convertError) {
      return NextResponse.json(
        { error: 'Failed to convert organization: ' + convertError.message },
        { status: 500 }
      );
    }

    finalOrgId = application.existing_organization_id;
  } else {
    // Generate slug from company name
    const slug = application.company_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 50) + '-' + Date.now().toString(36);

    // Create new MSP organization
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

    finalOrgId = newOrg.id;

    // Link the applicant's user account to the new organization
    try {
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('id, auth_id, organization_id')
        .eq('email', application.contact_email.toLowerCase())
        .single();

      if (existingUser) {
        // User exists - update their organization and role
        await supabaseAdmin
          .from('users')
          .update({
            organization_id: finalOrgId,
            role: 'owner',
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingUser.id);
      } else {
        // No user record exists - create one and send invite
        const nameParts = application.contact_name.split(' ');
        const { data: newUser } = await supabaseAdmin
          .from('users')
          .insert({
            email: application.contact_email.toLowerCase(),
            first_name: nameParts[0] || null,
            last_name: nameParts.slice(1).join(' ') || null,
            organization_id: finalOrgId,
            role: 'owner',
          })
          .select('id')
          .single();

        if (newUser) {
          const inviteToken = crypto.randomUUID();
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 14);

          await supabaseAdmin
            .from('user_invites')
            .insert({
              user_id: newUser.id,
              email: application.contact_email.toLowerCase(),
              token: inviteToken,
              expires_at: expiresAt.toISOString(),
              invited_by: finalOrgId,
            });
        }
      }
    } catch (linkError) {
      console.error('Failed to link user to organization:', linkError);
    }
  }

  // Create organization_settings record
  const { error: settingsError } = await supabaseAdmin
    .from('organization_settings')
    .insert({
      organization_id: finalOrgId,
      allow_employee_self_manage: true,
      require_manager_approval: false,
      google_calendar_enabled: false,
    });

  if (settingsError && settingsError.code !== '23505') { // Ignore duplicate key errors
    console.error('Failed to create organization settings:', settingsError);
  }

  // Create Stripe customer for the organization
  let stripeCustomerId: string;
  try {
    const customer = await stripe.customers.create({
      name: application.company_name,
      email: application.contact_email,
      metadata: {
        organization_id: finalOrgId,
        partner_tier: partnerTier,
      },
    });
    stripeCustomerId = customer.id;
  } catch (stripeError: any) {
    console.error('Failed to create Stripe customer:', stripeError);
    // Rollback org creation
    if (!application.existing_organization_id) {
      await supabaseAdmin.from('organizations').delete().eq('id', finalOrgId);
    }
    return NextResponse.json(
      { error: 'Failed to create billing account: ' + stripeError.message },
      { status: 500 }
    );
  }

  // Create subscriptions record (free plan by default)
  const { error: subscriptionError } = await supabaseAdmin
    .from('subscriptions')
    .insert({
      organization_id: finalOrgId,
      stripe_customer_id: stripeCustomerId,
      plan: 'free',
      status: 'active',
    });

  if (subscriptionError && subscriptionError.code !== '23505') { // Ignore duplicate key errors
    console.error('Failed to create subscription record:', subscriptionError);
  }

  // Update the application
  const { error: updateError } = await supabaseAdmin
    .from('partner_applications')
    .update({
      status: 'approved',
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
      review_notes: reviewNotes || null,
      organization_id: finalOrgId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', applicationId);

  if (updateError) {
    // Rollback org creation only if we created a new one (not converted)
    if (!application.existing_organization_id) {
      await supabaseAdmin.from('organizations').delete().eq('id', finalOrgId);
      await stripe.customers.del(stripeCustomerId);
    }
    return NextResponse.json(
      { error: 'Failed to update application: ' + updateError.message },
      { status: 500 }
    );
  }

  // Create audit log
  await supabaseAdmin.from('audit_logs').insert({
    organization_id: finalOrgId,
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

  // Ensure partner coupon exists in Stripe for this tier
  // The coupon will be applied when the partner subscribes
  try {
    await getOrCreatePartnerCoupon(stripe, partnerTier as PartnerTier);
  } catch (stripeError: any) {
    // Log but don't fail - coupon can be created later
    console.error('Failed to create partner coupon:', stripeError.message);
  }

  // Store the partner tier coupon ID in the org for later use during checkout
  await supabaseAdmin
    .from('organizations')
    .update({
      metadata: {
        partner_coupon_tier: partnerTier,
      },
    })
    .eq('id', finalOrgId);

  // Send approval email to partner (non-blocking)
  try {
    await sendPartnerApprovalEmail({
      to: application.contact_email,
      contactName: application.contact_name,
      companyName: application.company_name,
      portalUrl: `https://${sanitizedSubdomain}.siggly.io`,
      partnerTier,
    });
  } catch (emailError) {
    console.error('Failed to send partner approval email:', emailError);
  }

  return NextResponse.json({
    success: true,
    message: 'Application approved',
    organizationId: finalOrgId,
    subdomain: sanitizedSubdomain,
    portalUrl: `https://${sanitizedSubdomain}.siggly.io`,
  });
}

async function handleReject(
  applicationId: string,
  body: RejectRequest,
  application: any,
  reviewerId: string
) {
  const { reviewNotes, sendNotification } = body;

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

  // Send rejection email if admin opted in (defaults to true)
  if (sendNotification !== false) {
    try {
      await sendPartnerRejectionEmail({
        to: application.contact_email,
        contactName: application.contact_name,
        companyName: application.company_name,
      });
    } catch (emailError) {
      console.error('Failed to send partner rejection email:', emailError);
    }
  }

  return NextResponse.json({
    success: true,
    message: 'Application rejected',
  });
}
