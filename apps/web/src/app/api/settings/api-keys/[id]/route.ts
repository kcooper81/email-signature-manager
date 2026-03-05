import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logException } from '@/lib/error-logging';

/** DELETE — revoke an API key */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id, role')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    if (!['owner', 'admin'].includes(currentUser.role)) {
      return NextResponse.json({ error: 'Only admins can revoke API keys' }, { status: 403 });
    }

    // Revoke the key (soft delete) — scoped to org for security
    const { error } = await supabase
      .from('api_keys')
      .update({ is_revoked: true })
      .eq('id', params.id)
      .eq('organization_id', currentUser.organization_id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    await logException(error, {
      route: '/api/settings/api-keys/[id]',
      method: 'DELETE',
      errorType: 'api_error',
    });
    return NextResponse.json({ error: 'Failed to revoke API key' }, { status: 500 });
  }
}
