import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getGustoAuthUrl } from '@/lib/oauth/gusto';
import { getBambooHRAuthUrl } from '@/lib/oauth/bamboohr';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userData } = await supabase
      .from('users')
      .select('id, organization_id, role')
      .eq('auth_id', user.id)
      .single();

    if (!userData || !['owner', 'admin'].includes(userData.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { provider, subdomain, useSandbox } = body;

    if (!provider) {
      return NextResponse.json({ error: 'Provider is required' }, { status: 400 });
    }

    // Create a placeholder sync configuration to get an ID
    const { data: config, error: configError } = await supabase
      .from('sync_configurations')
      .insert({
        organization_id: userData.organization_id,
        provider: provider,
        schedule_type: 'manual',
        is_active: false, // Will be activated after OAuth completes
      })
      .select()
      .single();

    if (configError || !config) {
      return NextResponse.json({ error: 'Failed to create configuration' }, { status: 500 });
    }

    // Generate state parameter with config ID
    const stateData = {
      configId: config.id,
      subdomain: subdomain,
      useSandbox: useSandbox || false,
    };
    const state = Buffer.from(JSON.stringify(stateData)).toString('base64');

    // Generate OAuth URL based on provider
    let authUrl: string;
    
    switch (provider) {
      case 'gusto':
        authUrl = getGustoAuthUrl(state, useSandbox);
        break;
      
      case 'bamboohr':
        if (!subdomain) {
          return NextResponse.json({ error: 'Subdomain is required for BambooHR' }, { status: 400 });
        }
        authUrl = getBambooHRAuthUrl(state, subdomain);
        break;
      
      default:
        return NextResponse.json({ error: 'Unsupported provider' }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      authUrl: authUrl,
      configId: config.id,
    });
  } catch (err: any) {
    console.error('OAuth initiate error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
