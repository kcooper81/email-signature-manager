import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { revokeCalendlyToken } from '@/lib/calendly/oauth';

export async function POST(request: NextRequest) {
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

  const { data: connection } = await supabase
    .from('provider_connections')
    .select('*')
    .eq('organization_id', userData.organization_id)
    .eq('provider', 'calendly')
    .single();

  if (!connection) {
    return NextResponse.json({ error: 'Calendly not connected' }, { status: 404 });
  }

  try {
    await revokeCalendlyToken(connection.access_token);

    const { error: deleteError } = await supabase
      .from('provider_connections')
      .delete()
      .eq('id', connection.id);

    if (deleteError) {
      throw new Error(`Failed to delete connection: ${deleteError.message}`);
    }

    return NextResponse.json({ success: true, message: 'Calendly disconnected successfully' });
  } catch (error: any) {
    console.error('Failed to disconnect Calendly:', error);
    
    const { error: updateError } = await supabase
      .from('provider_connections')
      .update({ is_active: false })
      .eq('id', connection.id);

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to disconnect Calendly' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Calendly disconnected (marked inactive)' });
  }
}
