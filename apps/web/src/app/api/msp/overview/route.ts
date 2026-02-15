import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userData } = await supabase
      .from('users')
      .select('id, organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { data: orgData } = await supabase
      .from('organizations')
      .select('id, organization_type')
      .eq('id', userData.organization_id)
      .single();

    if (!orgData || orgData.organization_type !== 'msp') {
      return NextResponse.json({ error: 'Not an MSP organization' }, { status: 403 });
    }

    // Get all client org IDs
    const { data: clientOrgs } = await supabase
      .from('organizations')
      .select('id')
      .eq('parent_organization_id', userData.organization_id)
      .eq('organization_type', 'msp_client');

    const clientIds = (clientOrgs || []).map(c => c.id);

    if (clientIds.length === 0) {
      return NextResponse.json({
        totalDeployments: 0,
        totalTemplates: 0,
        totalSignatureClicks: 0,
        clientsWithNoDeployments: 0,
        recentActivity: [],
      });
    }

    // Run all queries in parallel
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      { count: totalDeployments },
      { count: totalTemplates },
      { count: totalSignatureClicks },
      { data: deploymentsPerClient },
      { data: recentActivity },
    ] = await Promise.all([
      supabase
        .from('signature_deployments')
        .select('*', { count: 'exact', head: true })
        .in('organization_id', clientIds),
      supabase
        .from('signature_templates')
        .select('*', { count: 'exact', head: true })
        .in('organization_id', clientIds),
      supabase
        .from('signature_clicks')
        .select('*', { count: 'exact', head: true })
        .in('organization_id', clientIds)
        .gte('created_at', thirtyDaysAgo.toISOString()),
      supabase
        .from('signature_deployments')
        .select('organization_id')
        .in('organization_id', clientIds),
      supabase
        .from('audit_logs')
        .select('id, action, resource_type, resource_id, created_at, organization_id')
        .in('organization_id', clientIds)
        .order('created_at', { ascending: false })
        .limit(15),
    ]);

    // Calculate clients with no deployments
    const clientsWithDeployments = new Set(
      (deploymentsPerClient || []).map(d => d.organization_id)
    );
    const clientsWithNoDeployments = clientIds.filter(
      id => !clientsWithDeployments.has(id)
    ).length;

    // Enrich activity with org names
    const activityOrgIds = [...new Set(
      (recentActivity || []).map(a => a.organization_id).filter(Boolean)
    )];
    const { data: activityOrgs } = activityOrgIds.length > 0
      ? await supabase.from('organizations').select('id, name').in('id', activityOrgIds)
      : { data: [] };
    const orgNameMap = new Map((activityOrgs || []).map(o => [o.id, o.name]));

    const enrichedActivity = (recentActivity || []).map(a => ({
      id: a.id,
      action: a.action,
      resourceType: a.resource_type,
      createdAt: a.created_at,
      orgName: orgNameMap.get(a.organization_id) || 'Unknown',
    }));

    return NextResponse.json({
      totalDeployments: totalDeployments || 0,
      totalTemplates: totalTemplates || 0,
      totalSignatureClicks: totalSignatureClicks || 0,
      clientsWithNoDeployments,
      recentActivity: enrichedActivity,
    });
  } catch (error: any) {
    console.error('MSP overview error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
