import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  checkOutOfOfficeStatusWithClient,
  getAppointmentSchedulesWithClient,
  getUpcomingOOOEventsWithClient,
  formatOOODateRange
} from '@/lib/google/calendar';
import { createOrgGoogleClient } from '@/lib/google/oauth';
import { logException } from '@/lib/error-logging';

/**
 * GET /api/integrations/google/calendar
 * Fetches calendar data including OOO status and booking links
 */
export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get user data
    const { data: userData } = await supabase
      .from('users')
      .select('id, organization_id, email, google_calendar_enabled, ooo_banner_enabled')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.organization_id) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Get Google connection
    const { data: connection } = await supabase
      .from('provider_connections')
      .select('*')
      .eq('organization_id', userData.organization_id)
      .eq('provider', 'google')
      .single();

    if (!connection) {
      return NextResponse.json(
        { error: 'Google Workspace not connected' },
        { status: 404 }
      );
    }

    // Check if calendar scope is available
    const scopes = connection.scopes || [];
    const hasCalendarScope = scopes.some((s: string) => 
      s.includes('calendar.readonly') || s.includes('calendar')
    );

    if (!hasCalendarScope) {
      return NextResponse.json(
        { 
          error: 'Calendar access not granted',
          message: 'Please reconnect Google Workspace to grant calendar access',
          needsReconnect: true
        },
        { status: 403 }
      );
    }

    // Create Google client with automatic token refresh
    let googleAuth;
    try {
      googleAuth = await createOrgGoogleClient(userData.organization_id);
    } catch (err: any) {
      return NextResponse.json(
        { error: err.message || 'Google Workspace not connected', needsReconnect: true },
        { status: 400 }
      );
    }

    // Fetch calendar data
    const [oooStatus, bookingLinks, upcomingOOO] = await Promise.all([
      checkOutOfOfficeStatusWithClient(googleAuth),
      getAppointmentSchedulesWithClient(googleAuth).catch(() => []),
      getUpcomingOOOEventsWithClient(googleAuth, 30),
    ]);

    // Format OOO date range for display
    const oooDateRange = oooStatus.isOutOfOffice 
      ? formatOOODateRange(oooStatus.startDate, oooStatus.endDate)
      : null;

    return NextResponse.json({
      success: true,
      calendarEnabled: userData.google_calendar_enabled,
      oooStatus: {
        ...oooStatus,
        dateRange: oooDateRange,
      },
      bookingLinks,
      upcomingOOO: upcomingOOO.map(event => ({
        ...event,
        dateRange: formatOOODateRange(event.start, event.end),
      })),
    });
  } catch (error: any) {
    console.error('Calendar API error:', error);
    
    await logException(error, {
      route: '/api/integrations/google/calendar',
      method: 'GET',
      errorType: 'calendar_error',
    });

    return NextResponse.json(
      { error: error.message || 'Failed to fetch calendar data' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/integrations/google/calendar
 * Updates user's calendar settings (enable/disable, set booking URL)
 */
export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { 
      calendarEnabled, 
      bookingUrl, 
      oooEnabled, 
      oooCustomMessage,
      calendarSyncEnabled 
    } = body;

    // Get user data
    const { data: userData } = await supabase
      .from('users')
      .select('id, organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Build update object
    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (typeof calendarEnabled === 'boolean') {
      updates.google_calendar_enabled = calendarEnabled;
    }
    if (typeof bookingUrl === 'string') {
      updates.google_booking_url = bookingUrl || null;
    }
    if (typeof oooEnabled === 'boolean') {
      updates.ooo_banner_enabled = oooEnabled;
    }
    if (typeof oooCustomMessage === 'string') {
      updates.ooo_custom_message = oooCustomMessage || null;
    }
    if (typeof calendarSyncEnabled === 'boolean') {
      updates.calendar_sync_enabled = calendarSyncEnabled;
    }

    // Update user
    const { error: updateError } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userData.id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      success: true,
      message: 'Calendar settings updated',
    });
  } catch (error: any) {
    console.error('Calendar settings update error:', error);
    
    await logException(error, {
      route: '/api/integrations/google/calendar',
      method: 'POST',
      errorType: 'calendar_settings_error',
    });

    return NextResponse.json(
      { error: error.message || 'Failed to update calendar settings' },
      { status: 500 }
    );
  }
}
