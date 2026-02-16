import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', user.id)
      .single();

    if (!userData) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ profile: userData });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: userData } = await supabase
      .from('users')
      .select('id, organization_id, self_manage_enabled')
      .eq('auth_id', user.id)
      .single();

    if (!userData) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Check if org requires approval for profile changes
    const { data: settings } = await supabase
      .from('organization_settings')
      .select('allow_employee_self_manage')
      .eq('organization_id', userData.organization_id)
      .single();

    const body = await request.json();
    const allowedFields = ['first_name', 'last_name', 'title', 'phone', 'mobile', 'linkedin_url', 'twitter_url', 'github_url', 'personal_website', 'instagram_url', 'facebook_url', 'youtube_url', 'calendly_url'];
    const updates: Record<string, any> = {};
    const fieldChanges: any[] = [];

    for (const [key, value] of Object.entries(body)) {
      if (allowedFields.includes(key)) {
        updates[key] = value;
        fieldChanges.push({ field: key, oldValue: (userData as any)[key] || null, newValue: value });
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    if (!settings?.allow_employee_self_manage) {
      // Create a profile request for admin approval
      await supabase.from('user_profile_requests').insert({
        organization_id: userData.organization_id,
        user_id: userData.id,
        field_changes: fieldChanges,
        status: 'pending',
        requires_approval: true,
      });
      return NextResponse.json({ success: true, pending: true, message: 'Changes submitted for admin approval' });
    }

    // Direct update
    await supabase.from('users').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', userData.id);
    return NextResponse.json({ success: true, pending: false });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
