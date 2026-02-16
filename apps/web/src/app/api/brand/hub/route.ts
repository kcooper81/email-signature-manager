import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getOrgPlan, checkFeature, planDenied } from '@/lib/billing/plan-guard';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: userData } = await supabase
      .from('users').select('id, organization_id').eq('auth_id', user.id).single();
    if (!userData) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const orgPlan = await getOrgPlan(supabase, userData.organization_id);
    if (!checkFeature(orgPlan, 'brandGovernance')) {
      return planDenied('Brand governance', 'enterprise');
    }

    const orgId = userData.organization_id;

    // Fetch all brand hub data in parallel
    const [guidelines, assets, auditResults, docTemplates] = await Promise.all([
      supabase.from('brand_guidelines').select('id, name, is_active, version').eq('organization_id', orgId).eq('is_active', true),
      supabase.from('brand_assets').select('id, display_name, category, approved_status, public_url').eq('organization_id', orgId).order('created_at', { ascending: false }).limit(20),
      supabase.from('brand_audit_results').select('compliance_score, audited_at').eq('organization_id', orgId).order('audited_at', { ascending: false }).limit(50),
      supabase.from('brand_document_templates').select('id, name, template_type').eq('organization_id', orgId).eq('is_active', true),
    ]);

    const scores = (auditResults.data || []).map(r => r.compliance_score);
    const avgScore = scores.length > 0
      ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length)
      : 0;

    return NextResponse.json({
      guidelines: guidelines.data || [],
      assets: assets.data || [],
      documentTemplates: docTemplates.data || [],
      complianceScore: avgScore,
      totalAudits: scores.length,
      assetCounts: {
        approved: (assets.data || []).filter(a => a.approved_status === 'approved').length,
        pending: (assets.data || []).filter(a => a.approved_status === 'pending').length,
        deprecated: (assets.data || []).filter(a => a.approved_status === 'deprecated').length,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
