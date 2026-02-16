import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { resolveDisclaimersForUser } from '@/lib/disclaimer-engine';

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
      .select('id, organization_id, role, department, source')
      .eq('auth_id', user.id)
      .single();

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { userId, recipients } = body;

    // If a specific user is provided, load their data
    let targetUser = userData;
    if (userId && userId !== userData.id) {
      const { data: target } = await supabase
        .from('users')
        .select('id, organization_id, role, email, department, source')
        .eq('id', userId)
        .eq('organization_id', userData.organization_id)
        .single();
      if (target) targetUser = target;
    }

    const { data: org } = await supabase
      .from('organizations')
      .select('domain, industry, parent_organization_id')
      .eq('id', userData.organization_id)
      .single();

    const resolution = await resolveDisclaimersForUser(
      {
        userId: targetUser.id,
        userEmail: (targetUser as any).email || user.email!,
        userDepartment: targetUser.department || undefined,
        userSource: targetUser.source || undefined,
        organizationId: userData.organization_id,
        organizationDomain: org?.domain || undefined,
        organizationIndustry: org?.industry || undefined,
        recipients: recipients || [],
      },
      org?.parent_organization_id || null
    );

    return NextResponse.json({
      disclaimers: resolution.disclaimers,
      combinedHtml: resolution.combinedHtml,
      totalMatched: resolution.disclaimers.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
