import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

/**
 * Returns the most recent "running" deployment for the current user's organization.
 * Used by the client to discover the deployment ID for polling progress.
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.organization_id) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    const serviceClient = createServiceClient();
    const { data: deployments } = await serviceClient
      .from('signature_deployments')
      .select('id, status, total_users, successful_count, failed_count')
      .eq('organization_id', userData.organization_id)
      .eq('status', 'running')
      .order('created_at', { ascending: false })
      .limit(1);

    const deployment = deployments?.[0] || null;
    return NextResponse.json({ deployment });
  } catch (err: any) {
    console.error('Active deployment lookup error:', err);
    return NextResponse.json({ deployment: null });
  }
}
