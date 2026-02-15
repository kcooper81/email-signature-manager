import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params;
    const supabase = await createClient();
    const supabaseAdmin = createServiceClient();

    // Verify super admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('id, is_super_admin')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.is_super_admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { is_suspended } = await request.json();

    if (typeof is_suspended !== 'boolean') {
      return NextResponse.json({ error: 'is_suspended must be a boolean' }, { status: 400 });
    }

    // Update organization
    const { error: updateError } = await supabaseAdmin
      .from('organizations')
      .update({
        is_suspended,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orgId);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update organization: ' + updateError.message }, { status: 500 });
    }

    // Audit log
    await supabaseAdmin.from('audit_logs').insert({
      organization_id: orgId,
      user_id: userData.id,
      action: is_suspended ? 'organization_suspended' : 'organization_reactivated',
      resource_type: 'organization',
      resource_id: orgId,
    });

    return NextResponse.json({ success: true, is_suspended });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
