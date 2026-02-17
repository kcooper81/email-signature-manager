import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { enforceGuidelines } from '@/lib/brand-governance/enforcer';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: userData } = await supabase
      .from('users').select('id, organization_id').eq('auth_id', user.id).single();
    if (!userData?.organization_id) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Verify template belongs to this org
    const { data: existing } = await supabase
      .from('signature_templates')
      .select('id')
      .eq('id', id)
      .eq('organization_id', userData.organization_id)
      .single();

    if (!existing) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    const body = await request.json();
    const { name, description, blocks, industry } = body;

    if (!name || !blocks) {
      return NextResponse.json({ error: 'Name and blocks are required' }, { status: 400 });
    }

    // Enforce brand guidelines before saving
    const enforcement = await enforceGuidelines(userData.organization_id, blocks);
    if (!enforcement.allowed) {
      return NextResponse.json(
        { error: 'Brand guideline violations', violations: enforcement.violations },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('signature_templates')
      .update({
        name,
        description: description || null,
        blocks,
        industry: industry || 'general',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('organization_id', userData.organization_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
