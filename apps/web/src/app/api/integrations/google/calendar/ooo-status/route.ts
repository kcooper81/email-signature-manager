import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { 
  checkOutOfOfficeStatus, 
  checkOutOfOfficeStatusWithServiceAccount,
  formatOOODateRange 
} from '@/lib/google/calendar';
import { createAuthenticatedClient } from '@/lib/google/oauth';
import { isServiceAccountConfigured } from '@/lib/google/service-account';
import { logException } from '@/lib/error-logging';

/**
 * GET /api/integrations/google/calendar/ooo-status
 * Checks OOO status for a specific user (used during signature rendering)
 * 
 * Query params:
 * - userId: The user ID to check OOO status for
 * - email: Alternative - the user email to check
 */
export async function GET(request: NextRequest) {
  const supabase = createClient();
  const serviceClient = createServiceClient();

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const email = searchParams.get('email');

  if (!userId && !email) {
    return NextResponse.json(
      { error: 'userId or email is required' },
      { status: 400 }
    );
  }

  try {
    // Get user data
    let userData;
    if (userId) {
      const { data } = await serviceClient
        .from('users')
        .select('id, email, organization_id, ooo_banner_enabled, ooo_custom_message, google_calendar_enabled')
        .eq('id', userId)
        .single();
      userData = data;
    } else {
      const { data } = await serviceClient
        .from('users')
        .select('id, email, organization_id, ooo_banner_enabled, ooo_custom_message, google_calendar_enabled')
        .eq('email', email)
        .single();
      userData = data;
    }

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if OOO banner is enabled for this user
    if (!userData.ooo_banner_enabled) {
      return NextResponse.json({
        isOutOfOffice: false,
        oooEnabled: false,
      });
    }

    // Check if calendar integration is enabled
    if (!userData.google_calendar_enabled) {
      return NextResponse.json({
        isOutOfOffice: false,
        calendarEnabled: false,
      });
    }

    // Get organization's OOO banner settings
    const { data: oooSettings } = await serviceClient
      .from('ooo_banner_settings')
      .select('*')
      .eq('organization_id', userData.organization_id)
      .single();

    // Get Google connection
    const { data: connection } = await serviceClient
      .from('provider_connections')
      .select('*')
      .eq('organization_id', userData.organization_id)
      .eq('provider', 'google')
      .single();

    if (!connection) {
      return NextResponse.json({
        isOutOfOffice: false,
        error: 'Google not connected',
      });
    }

    let oooStatus;

    // Try service account first (for Marketplace installs)
    if (connection.auth_type === 'marketplace' && isServiceAccountConfigured()) {
      oooStatus = await checkOutOfOfficeStatusWithServiceAccount(userData.email);
    } else {
      // Use OAuth tokens
      let accessToken = connection.access_token;
      const expiresAt = connection.token_expires_at ? new Date(connection.token_expires_at) : null;

      if (expiresAt && expiresAt < new Date()) {
        try {
          const auth = createAuthenticatedClient(connection.access_token, connection.refresh_token);
          const { credentials } = await auth.refreshAccessToken();
          
          accessToken = credentials.access_token!;

          await serviceClient
            .from('provider_connections')
            .update({
              access_token: credentials.access_token,
              refresh_token: credentials.refresh_token || connection.refresh_token,
              token_expires_at: credentials.expiry_date 
                ? new Date(credentials.expiry_date).toISOString() 
                : null,
            })
            .eq('id', connection.id);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          return NextResponse.json({
            isOutOfOffice: false,
            error: 'Token refresh failed',
          });
        }
      }

      oooStatus = await checkOutOfOfficeStatus(accessToken, connection.refresh_token);
    }

    // Format response with banner settings
    const response = {
      isOutOfOffice: oooStatus.isOutOfOffice,
      startDate: oooStatus.startDate,
      endDate: oooStatus.endDate,
      dateRange: oooStatus.isOutOfOffice 
        ? formatOOODateRange(oooStatus.startDate, oooStatus.endDate)
        : null,
      eventTitle: oooStatus.eventTitle,
      message: userData.ooo_custom_message || oooStatus.message || oooSettings?.banner_text,
      bannerSettings: oooSettings ? {
        backgroundColor: oooSettings.banner_background_color,
        textColor: oooSettings.banner_text_color,
        showReturnDate: oooSettings.show_return_date,
        bannerImageUrl: oooSettings.banner_image_url,
      } : null,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('OOO status check error:', error);
    
    await logException(error, {
      route: '/api/integrations/google/calendar/ooo-status',
      method: 'GET',
      errorType: 'ooo_status_error',
    });

    // Return not OOO on error to avoid breaking signatures
    return NextResponse.json({
      isOutOfOffice: false,
      error: error.message || 'Failed to check OOO status',
    });
  }
}
