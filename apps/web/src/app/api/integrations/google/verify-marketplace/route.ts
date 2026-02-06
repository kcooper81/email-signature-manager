import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { 
  verifyMarketplaceInstallation, 
  isServiceAccountConfigured 
} from '@/lib/google/service-account';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if service account is configured
  if (!isServiceAccountConfigured()) {
    return NextResponse.json(
      { error: 'Service account not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { adminEmail, domain } = body;

    if (!adminEmail || !domain) {
      return NextResponse.json(
        { error: 'Admin email and domain are required' },
        { status: 400 }
      );
    }

    // Verify the marketplace installation
    const result = await verifyMarketplaceInstallation(adminEmail, domain);

    if (!result.installed) {
      return NextResponse.json(
        { 
          installed: false, 
          error: result.error,
          marketplaceUrl: 'https://workspace.google.com/marketplace/app/siggly/YOUR_APP_ID'
        },
        { status: 200 }
      );
    }

    // Get user's organization
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.organization_id) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Store the connection with marketplace auth type
    const { error: upsertError } = await supabase
      .from('provider_connections')
      .upsert({
        organization_id: userData.organization_id,
        provider: 'google',
        auth_type: 'marketplace', // Distinguish from OAuth
        admin_email: adminEmail,
        domain: domain,
        is_active: true,
        // No tokens needed - using service account
        access_token: null,
        refresh_token: null,
      }, {
        onConflict: 'organization_id,provider',
      });

    if (upsertError) {
      console.error('Failed to save marketplace connection:', upsertError);
      return NextResponse.json(
        { error: 'Failed to save connection' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      installed: true,
      message: 'Marketplace app verified and connected successfully',
    });
  } catch (error: any) {
    console.error('Marketplace verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}
