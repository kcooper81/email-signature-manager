import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getOrgPlan, checkFeature, checkLimit, planDenied, limitDenied } from '@/lib/billing/plan-guard';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
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

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { data: templates } = await supabase
      .from('disclaimer_templates')
      .select('*')
      .or(`organization_id.eq.${userData.organization_id},is_system.eq.true`)
      .order('created_at', { ascending: false });

    return NextResponse.json({ templates: templates || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

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

    const orgPlan = await getOrgPlan(supabase, userData.organization_id);

    // Count existing templates (excluding system ones)
    const { count } = await supabase
      .from('disclaimer_templates')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', userData.organization_id)
      .eq('is_system', false);
    if (!checkLimit(orgPlan, 'maxDisclaimerTemplates', count || 0)) {
      return limitDenied('Disclaimer templates', count || 0, orgPlan.plan.features.maxDisclaimerTemplates);
    }

    const body = await request.json();
    const { name, category, content, description, regulationType, locale } = body;

    if (!name || !category || !content) {
      return NextResponse.json({ error: 'Name, category, and content are required' }, { status: 400 });
    }

    if (regulationType && !checkFeature(orgPlan, 'disclaimerRegulatoryPresets')) {
      return planDenied('Regulatory presets', 'professional');
    }
    if (locale && locale !== 'en' && !checkFeature(orgPlan, 'disclaimerMultiLanguage')) {
      return planDenied('Multi-language disclaimers', 'enterprise');
    }

    const { data: template, error } = await supabase
      .from('disclaimer_templates')
      .insert({
        name,
        category,
        content,
        description: description || null,
        organization_id: userData.organization_id,
        regulation_type: regulationType || null,
        locale: locale || 'en',
        is_system: false,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, template });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
