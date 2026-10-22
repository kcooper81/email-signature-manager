import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/admin/tickets/[ticketId]/context
 * Returns who the ticket is from — plan, org, tenure, prior-ticket counts — so the
 * agent doesn't have to re-derive the customer on every ticket. Super-admin only.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: me } = await supabase
      .from('users')
      .select('is_super_admin')
      .eq('auth_id', user.id.toString())
      .single();
    if (!me?.is_super_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { data: ticket } = await supabase
      .from('feedback')
      .select('user_id, user_email, organization_id')
      .eq('id', params.ticketId)
      .single();
    if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });

    const email: string | null = ticket.user_email || null;

    // Resolve the customer's user record (by id, else by email).
    let userRow: any = null;
    if (ticket.user_id) {
      userRow = (await supabase
        .from('users')
        .select('first_name, last_name, role, organization_id, created_at, is_active')
        .eq('id', ticket.user_id)
        .maybeSingle()).data;
    }
    if (!userRow && email) {
      userRow = (await supabase
        .from('users')
        .select('first_name, last_name, role, organization_id, created_at, is_active')
        .eq('email', email)
        .maybeSingle()).data;
    }

    const orgId = ticket.organization_id || userRow?.organization_id || null;
    let orgName: string | null = null;
    let orgType: string | null = null;
    let plan: string | null = null;
    let planStatus: string | null = null;
    if (orgId) {
      const org = (await supabase
        .from('organizations')
        .select('name, organization_type')
        .eq('id', orgId)
        .maybeSingle()).data;
      orgName = org?.name || null;
      orgType = org?.organization_type || null;
      const sub = (await supabase
        .from('subscriptions')
        .select('plan, status')
        .eq('organization_id', orgId)
        .maybeSingle()).data;
      plan = sub?.plan || null;
      planStatus = sub?.status || null;
    }

    // Prior-ticket counts for this sender.
    let totalTickets = 0;
    let openTickets = 0;
    if (email) {
      const { count: total } = await supabase
        .from('feedback')
        .select('*', { count: 'exact', head: true })
        .eq('user_email', email);
      const { count: open } = await supabase
        .from('feedback')
        .select('*', { count: 'exact', head: true })
        .eq('user_email', email)
        .in('status', ['new', 'reviewed']);
      totalTickets = total || 0;
      openTickets = open || 0;
    }

    return NextResponse.json({
      email,
      name: userRow ? ([userRow.first_name, userRow.last_name].filter(Boolean).join(' ') || null) : null,
      isUser: !!userRow,
      role: userRow?.role || null,
      isActive: userRow?.is_active ?? null,
      memberSince: userRow?.created_at || null,
      orgName,
      orgType,
      plan,
      planStatus,
      totalTickets,
      openTickets,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to load context' }, { status: 500 });
  }
}
