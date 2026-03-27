import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();

    // Authenticate the user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
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

    const { id: deploymentId } = params;

    // Fetch the deployment record filtered by org for security
    const serviceClient = createServiceClient();
    const { data: deployment, error } = await serviceClient
      .from('signature_deployments')
      .select('id, status, total_users, successful_count, failed_count, created_at, completed_at')
      .eq('id', deploymentId)
      .eq('organization_id', userData.organization_id)
      .single();

    if (error || !deployment) {
      return NextResponse.json(
        { error: 'Deployment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: deployment.id,
      status: deployment.status,
      total_users: deployment.total_users,
      successful_count: deployment.successful_count,
      failed_count: deployment.failed_count,
      created_at: deployment.created_at,
      completed_at: deployment.completed_at,
    });
  } catch (err: any) {
    console.error('Deployment status error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch deployment status' },
      { status: 500 }
    );
  }
}
