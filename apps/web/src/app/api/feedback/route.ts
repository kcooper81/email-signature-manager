import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { logException } from '@/lib/error-logging';

// Use service role for feedback inserts to bypass RLS (allows anonymous submissions)
function getSupabaseAdmin() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  try {
    const { type, message, pageUrl } = await request.json();

    // Validate required fields
    if (!type || !message?.trim()) {
      return NextResponse.json(
        { error: 'Type and message are required' },
        { status: 400 }
      );
    }

    // Validate feedback type
    const validTypes = ['bug', 'feature', 'question', 'other'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid feedback type' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const supabaseAdmin = getSupabaseAdmin();
    
    // Get current user if authenticated
    const { data: { user } } = await supabase.auth.getUser();

    // Insert feedback using service role to bypass RLS (supports anonymous users)
    const { error: insertError } = await supabaseAdmin
      .from('feedback')
      .insert({
        user_id: user?.id || null,
        user_email: user?.email || null,
        type,
        message: message.trim(),
        page_url: pageUrl || null,
        user_agent: request.headers.get('user-agent') || null,
        metadata: {
          submitted_at: new Date().toISOString(),
        },
        status: 'new',
      });

    if (insertError) {
      console.error('Feedback insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to submit feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    
    await logException(error, {
      route: '/api/feedback',
      method: 'POST',
      errorType: 'api_error',
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
