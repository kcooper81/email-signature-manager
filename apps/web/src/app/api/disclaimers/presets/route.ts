import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { DISCLAIMER_PRESETS } from '@/lib/disclaimer-engine/presets';
import { getOrgPlan, checkFeature, planDenied } from '@/lib/billing/plan-guard';

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
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();
    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const orgPlan = await getOrgPlan(supabase, userData.organization_id);
    if (!checkFeature(orgPlan, 'disclaimerRegulatoryPresets')) {
      return planDenied('Regulatory presets', 'professional');
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const regulationType = searchParams.get('regulationType');

    let presets = DISCLAIMER_PRESETS;
    if (category) {
      presets = presets.filter(p => p.category === category);
    }
    if (regulationType) {
      presets = presets.filter(p => p.regulationType === regulationType);
    }

    return NextResponse.json({ presets });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
