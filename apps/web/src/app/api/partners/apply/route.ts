import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase/server';

// Use service role to bypass RLS for inserting applications
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Reserved subdomains that cannot be used
const RESERVED_SUBDOMAINS = [
  'www', 'app', 'api', 'admin', 'dashboard', 'help', 'support',
  'docs', 'blog', 'mail', 'status', 'cdn', 'static', 'assets',
  'auth', 'login', 'signup', 'account', 'billing', 'payment',
  'test', 'staging', 'dev', 'demo', 'preview', 'beta', 'alpha',
  'siggly', 'signature', 'signatures', 'email', 'msp', 'partner',
];

interface PartnerApplicationRequest {
  companyName: string;
  website?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  numberOfClients?: number;
  primaryServices?: string[];
  howHeardAboutUs?: string;
  additionalNotes?: string;
  preferredSubdomain?: string;
  convertExistingOrg?: boolean; // If true, convert user's current org to MSP
}

export async function POST(request: NextRequest) {
  try {
    const body: PartnerApplicationRequest = await request.json();

    // Check if user is logged in and wants to convert their existing org
    let existingOrgId: string | null = null;
    let existingOrgName: string | null = null;
    
    if (body.convertExistingOrg) {
      const supabase = await createServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: userData } = await supabaseAdmin
          .from('users')
          .select('organization_id, organizations(id, name, organization_type)')
          .eq('auth_id', user.id)
          .single();
        
        if (userData?.organization_id) {
          const org = userData.organizations as any;
          // Only allow conversion from standard orgs (not already MSP or MSP client)
          if (org?.organization_type === 'standard') {
            existingOrgId = userData.organization_id;
            existingOrgName = org.name;
          } else if (org?.organization_type === 'msp') {
            return NextResponse.json(
              { error: 'Your organization is already an MSP partner' },
              { status: 400 }
            );
          } else if (org?.organization_type === 'msp_client') {
            return NextResponse.json(
              { error: 'MSP client organizations cannot apply to become partners' },
              { status: 400 }
            );
          }
        }
      }
    }

    // Validate required fields
    if (!body.companyName?.trim()) {
      return NextResponse.json({ error: 'Company name is required' }, { status: 400 });
    }
    if (!body.contactName?.trim()) {
      return NextResponse.json({ error: 'Contact name is required' }, { status: 400 });
    }
    if (!body.contactEmail?.trim()) {
      return NextResponse.json({ error: 'Contact email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.contactEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check for existing application with same email
    const { data: existingApp } = await supabaseAdmin
      .from('partner_applications')
      .select('id, status')
      .eq('contact_email', body.contactEmail.toLowerCase().trim())
      .in('status', ['pending', 'under_review'])
      .single();

    if (existingApp) {
      return NextResponse.json(
        { error: 'An application with this email is already pending review' },
        { status: 400 }
      );
    }

    // Validate preferred subdomain if provided
    let preferredSubdomain = body.preferredSubdomain?.toLowerCase().trim();
    if (preferredSubdomain) {
      // Sanitize
      preferredSubdomain = preferredSubdomain.replace(/[^a-z0-9-]/g, '');
      
      // Check length
      if (preferredSubdomain.length < 3 || preferredSubdomain.length > 63) {
        return NextResponse.json(
          { error: 'Subdomain must be 3-63 characters' },
          { status: 400 }
        );
      }

      // Check reserved
      if (RESERVED_SUBDOMAINS.includes(preferredSubdomain)) {
        return NextResponse.json(
          { error: 'This subdomain is reserved. Please choose another.' },
          { status: 400 }
        );
      }

      // Check if already taken
      const { data: existingOrg } = await supabaseAdmin
        .from('organizations')
        .select('id')
        .eq('custom_subdomain', preferredSubdomain)
        .single();

      if (existingOrg) {
        return NextResponse.json(
          { error: 'This subdomain is already taken. Please choose another.' },
          { status: 400 }
        );
      }
    }

    // Insert application
    const { data: application, error: insertError } = await supabaseAdmin
      .from('partner_applications')
      .insert({
        company_name: existingOrgName || body.companyName.trim(),
        website: body.website?.trim() || null,
        contact_name: body.contactName.trim(),
        contact_email: body.contactEmail.toLowerCase().trim(),
        contact_phone: body.contactPhone?.trim() || null,
        number_of_clients: body.numberOfClients || null,
        primary_services: body.primaryServices || [],
        how_heard_about_us: body.howHeardAboutUs?.trim() || null,
        additional_notes: body.additionalNotes?.trim() || null,
        existing_organization_id: existingOrgId, // Link to existing org for conversion
        status: 'pending',
        submitted_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (insertError) {
      throw insertError;
    }

    // Store preferred subdomain in additional_notes if provided
    // (We'll use it during approval)
    if (preferredSubdomain && application) {
      await supabaseAdmin
        .from('partner_applications')
        .update({
          additional_notes: body.additionalNotes 
            ? `${body.additionalNotes}\n\n[Preferred Subdomain: ${preferredSubdomain}]`
            : `[Preferred Subdomain: ${preferredSubdomain}]`,
        })
        .eq('id', application.id);
    }

    // TODO: Send confirmation email to applicant
    // TODO: Send notification email to Siggly team

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application?.id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
