import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logException } from '@/lib/error-logging';

export async function POST(request: NextRequest) {
  try {
    const { email, source, metadata } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Check if email already exists
    const { data: existing } = await supabase
      .from('email_subscribers')
      .select('id, is_active')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      // If already subscribed and active, return success
      if (existing.is_active) {
        return NextResponse.json({
          success: true,
          message: 'Already subscribed',
        });
      }
      
      // If previously unsubscribed, reactivate
      const { error: updateError } = await supabase
        .from('email_subscribers')
        .update({ is_active: true, subscribed_at: new Date().toISOString() })
        .eq('id', existing.id);

      if (updateError) {
        console.error('Reactivation error:', updateError);
        return NextResponse.json(
          { error: 'Failed to reactivate subscription' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Subscription reactivated',
      });
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from('email_subscribers')
      .insert({
        email: email.toLowerCase(),
        source: source || 'unknown',
        metadata: metadata || {},
        is_active: true,
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    await logException(error, {
      route: '/api/newsletter/subscribe',
      method: 'POST',
      errorType: 'api_error',
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
