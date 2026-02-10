import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { OrganizationBranding } from '@/lib/db/schema';

// GET /api/settings/branding - Get current branding settings
export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's organization
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('organization_id, role')
      .eq('auth_id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Only owners and admins can view branding settings
    if (!['owner', 'admin'].includes(userData.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Get organization branding
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .select('branding, custom_subdomain, organization_type')
      .eq('id', userData.organization_id)
      .single();

    if (orgError || !org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    return NextResponse.json({
      branding: org.branding || {},
      customSubdomain: org.custom_subdomain,
      organizationType: org.organization_type || 'standard',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/settings/branding - Update branding settings
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { branding, customSubdomain } = body as {
      branding: OrganizationBranding;
      customSubdomain: string | null;
    };

    // Get user's organization
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, organization_id, role')
      .eq('auth_id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Only owners can update branding settings
    if (userData.role !== 'owner') {
      return NextResponse.json({ error: 'Only organization owners can update branding settings' }, { status: 403 });
    }

    // Validate subdomain if provided
    if (customSubdomain) {
      const validationResult = validateSubdomain(customSubdomain);
      if (!validationResult.valid) {
        return NextResponse.json({ error: validationResult.error }, { status: 400 });
      }

      // Check if subdomain is already taken by another org
      const { data: existingOrg } = await supabase
        .from('organizations')
        .select('id')
        .eq('custom_subdomain', customSubdomain)
        .neq('id', userData.organization_id)
        .single();

      if (existingOrg) {
        return NextResponse.json({ error: 'This subdomain is already taken' }, { status: 400 });
      }
    }

    // Sanitize branding data
    const sanitizedBranding: OrganizationBranding = {
      primaryColor: sanitizeColor(branding.primaryColor),
      secondaryColor: sanitizeColor(branding.secondaryColor),
      accentColor: sanitizeColor(branding.accentColor),
      logoUrl: sanitizeUrl(branding.logoUrl),
      logoIconUrl: sanitizeUrl(branding.logoIconUrl),
      logoDarkUrl: sanitizeUrl(branding.logoDarkUrl),
      faviconUrl: sanitizeUrl(branding.faviconUrl),
      companyName: branding.companyName?.trim().slice(0, 100),
      supportEmail: branding.supportEmail?.trim().slice(0, 255),
      supportUrl: sanitizeUrl(branding.supportUrl),
      hideSigglyBranding: Boolean(branding.hideSigglyBranding),
      hideHelpLinks: Boolean(branding.hideHelpLinks),
    };

    // Update organization
    const { error: updateError } = await supabase
      .from('organizations')
      .update({
        branding: sanitizedBranding,
        custom_subdomain: customSubdomain || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userData.organization_id);

    if (updateError) {
      throw updateError;
    }

    // Log the action
    await supabase.from('audit_logs').insert({
      organization_id: userData.organization_id,
      user_id: userData.id,
      action: 'branding_updated',
      resource_type: 'organization',
      resource_id: userData.organization_id,
      metadata: {
        subdomain_changed: Boolean(customSubdomain),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Helper functions
function validateSubdomain(subdomain: string): { valid: boolean; error?: string } {
  if (subdomain.length < 3) {
    return { valid: false, error: 'Subdomain must be at least 3 characters' };
  }
  if (subdomain.length > 63) {
    return { valid: false, error: 'Subdomain must be 63 characters or less' };
  }
  if (!/^[a-z0-9]/.test(subdomain)) {
    return { valid: false, error: 'Subdomain must start with a letter or number' };
  }
  if (!/[a-z0-9]$/.test(subdomain)) {
    return { valid: false, error: 'Subdomain must end with a letter or number' };
  }
  if (!/^[a-z0-9-]+$/.test(subdomain)) {
    return { valid: false, error: 'Subdomain can only contain lowercase letters, numbers, and hyphens' };
  }
  if (subdomain.includes('--')) {
    return { valid: false, error: 'Subdomain cannot contain consecutive hyphens' };
  }

  const reserved = [
    'www', 'app', 'api', 'admin', 'dashboard', 'help', 'support',
    'docs', 'blog', 'mail', 'status', 'cdn', 'static', 'assets',
    'auth', 'login', 'signup', 'account', 'billing', 'payment',
    'test', 'staging', 'dev', 'demo', 'preview', 'beta', 'alpha',
  ];

  if (reserved.includes(subdomain)) {
    return { valid: false, error: 'This subdomain is reserved' };
  }

  return { valid: true };
}

function sanitizeColor(color?: string): string | undefined {
  if (!color) return undefined;
  // Accept valid hex colors
  if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
    return color.toLowerCase();
  }
  return undefined;
}

function sanitizeUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (['http:', 'https:'].includes(parsed.protocol)) {
      return url;
    }
  } catch {
    // Invalid URL
  }
  return undefined;
}
