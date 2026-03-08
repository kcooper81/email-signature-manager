import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdmin } from '@/lib/seo/admin-auth';
import { mergeConfig } from '@/lib/seo/config';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin } = auth;

    const { data, error } = await supabaseAdmin
      .from('seo_settings')
      .select('*')
      .single();

    if (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    // Return algorithm_config merged with defaults so UI always sees full config
    return NextResponse.json({
      ...data,
      algorithm_config: mergeConfig(data?.algorithm_config),
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

const ALLOWED_FIELDS = [
  'claude_api_enabled',
  'auto_run_enabled',
  'auto_run_min_confidence',
  'competitors',
  'daily_serp_query_limit',
  'auto_run_types',
  'algorithm_config',
] as const;

export async function PUT(request: NextRequest) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin } = auth;

    const body = await request.json();

    // Only allow updating known fields
    const updateData: Record<string, unknown> = {};
    for (const field of ALLOWED_FIELDS) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Fetch the existing settings row to get its id
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from('seo_settings')
      .select('id')
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: 'Settings not found' }, { status: 404 });
    }

    const { data, error } = await supabaseAdmin
      .from('seo_settings')
      .update(updateData)
      .eq('id', existing.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
