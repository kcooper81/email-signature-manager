import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendTeamInviteEmail } from '@/lib/email/resend';

// GET /api/msp/clients - List all clients for the MSP organization
export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's organization and verify it's an MSP
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, organization_id, role')
      .eq('auth_id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user's org is an MSP
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .select('id, name, organization_type')
      .eq('id', userData.organization_id)
      .single();

    if (orgError || !orgData) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    if (orgData.organization_type !== 'msp') {
      return NextResponse.json({ error: 'Not an MSP organization' }, { status: 403 });
    }

    // Get all client organizations
    const { data: clients, error: clientsError } = await supabase
      .from('organizations')
      .select(`
        id,
        name,
        domain,
        created_at,
        updated_at
      `)
      .eq('parent_organization_id', userData.organization_id)
      .eq('organization_type', 'msp_client')
      .order('name');

    if (clientsError) {
      throw clientsError;
    }

    // Get user counts for each client
    const clientsWithCounts = await Promise.all(
      (clients || []).map(async (client) => {
        const { count } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('organization_id', client.id);

        return {
          ...client,
          userCount: count || 0,
        };
      })
    );

    return NextResponse.json({ clients: clientsWithCounts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/msp/clients - Create a new client organization
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, domain, adminEmail, adminFirstName, adminLastName } = body;

    if (!name || !adminEmail) {
      return NextResponse.json({ error: 'Name and admin email are required' }, { status: 400 });
    }

    // Get user's organization and verify it's an MSP
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, organization_id, role, first_name, last_name')
      .eq('auth_id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Only owners and admins can create clients
    if (!['owner', 'admin'].includes(userData.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Check if user's org is an MSP
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .select('id, name, organization_type')
      .eq('id', userData.organization_id)
      .single();

    if (orgError || !orgData) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    if (orgData.organization_type !== 'msp') {
      return NextResponse.json({ error: 'Not an MSP organization' }, { status: 403 });
    }

    // Generate slug from organization name
    const generateSlug = (name: string) => {
      return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 63);
    };

    const slug = generateSlug(name);

    // Create the client organization
    const { data: newClient, error: createError } = await supabase
      .from('organizations')
      .insert({
        name,
        slug,
        domain: domain || null,
        parent_organization_id: userData.organization_id,
        organization_type: 'msp_client',
      })
      .select()
      .single();

    if (createError) {
      throw createError;
    }

    // Create organization_settings record
    const { error: settingsError } = await supabase
      .from('organization_settings')
      .insert({
        organization_id: newClient.id,
        allow_employee_self_manage: true,
        allow_employee_personal_links: true,
        allow_employee_calendar_integration: true,
        allow_employee_ooo_banners: true,
        google_calendar_enabled: true,
      });

    if (settingsError) {
      console.error('Failed to create organization_settings:', settingsError);
      // Don't fail the whole operation, but log it
    }

    // Create subscriptions record (free plan by default)
    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .insert({
        organization_id: newClient.id,
        plan: 'free',
        status: 'active',
      });

    if (subscriptionError && subscriptionError.code !== '23505') {
      console.error('Failed to create subscription record:', subscriptionError);
      // Don't fail the whole operation, but log it
    }

    // Create an invite for the client admin
    const inviteToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 day expiry

    const { error: inviteError } = await supabase
      .from('invites')
      .insert({
        organization_id: newClient.id,
        email: adminEmail.toLowerCase(),
        role: 'owner',
        token: inviteToken,
        expires_at: expiresAt.toISOString(),
        invited_by: userData.id,
        first_name: adminFirstName || null,
        last_name: adminLastName || null,
      });

    if (inviteError) {
      // Rollback: delete the org if invite fails
      await supabase.from('organizations').delete().eq('id', newClient.id);
      throw inviteError;
    }

    // Grant MSP user full access to this client
    const { error: accessError } = await supabase
      .from('msp_client_access')
      .insert({
        msp_user_id: userData.id,
        msp_organization_id: userData.organization_id,
        client_organization_id: newClient.id,
        access_level: 'full',
        granted_by: userData.id,
      });

    if (accessError) {
      console.error('Failed to grant MSP access:', accessError);
      // Don't fail the whole operation for this
    }

    // Log the action
    await supabase.from('audit_logs').insert({
      organization_id: userData.organization_id,
      user_id: userData.id,
      action: 'msp_client_created',
      resource_type: 'organization',
      resource_id: newClient.id,
      metadata: {
        client_name: name,
        admin_email: adminEmail,
      },
    });

    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io'}/invite/${inviteToken}`;

    // Send invite email to client admin (non-blocking)
    try {
      const inviterName = `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || orgData.name;
      await sendTeamInviteEmail({
        to: adminEmail.toLowerCase(),
        inviterName,
        organizationName: name,
        inviteUrl,
        expiresAt: expiresAt.toISOString(),
      });
    } catch (emailError) {
      console.error('Failed to send client invite email:', emailError);
    }

    return NextResponse.json({
      success: true,
      client: newClient,
      inviteUrl,
      message: `Client created. Invite sent to ${adminEmail}`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
