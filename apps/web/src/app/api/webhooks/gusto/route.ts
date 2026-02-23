import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

interface GustoWebhookEvent {
  event_type: string;
  resource_type: string;
  resource_id: string;
  company_id: string;
  timestamp: string;
  data?: {
    employee?: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      jobs?: Array<{
        title: string;
        location?: {
          id: string;
        };
      }>;
      department?: {
        title: string;
      };
      home_phone?: string;
      date_of_hire?: string;
      terminated?: boolean;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-gusto-signature');
    
    // Parse the webhook payload
    let event: GustoWebhookEvent;
    try {
      event = JSON.parse(body);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Find the sync configuration for this company
    const { data: config } = await supabase
      .from('sync_configurations')
      .select('*')
      .eq('provider', 'gusto')
      .eq('api_url', event.company_id)
      .eq('is_active', true)
      .maybeSingle();

    if (!config) {
      // No active Gusto configuration for this company - return 200 to avoid retries
      return NextResponse.json({ message: 'No active configuration found' }, { status: 200 });
    }

    // Verify webhook signature if webhook_secret is configured
    if (config.webhook_secret) {
      if (!signature) {
        return NextResponse.json({ error: 'Missing signature header' }, { status: 401 });
      }
      const isValid = verifyGustoSignature(body, signature, config.webhook_secret);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    // Handle employee events
    if (event.resource_type === 'Employee' && event.data?.employee) {
      await handleEmployeeEvent(supabase, config.organization_id, event);
    }

    // Return 200 to acknowledge receipt
    return NextResponse.json({ success: true, event_type: event.event_type });
  } catch (err: any) {
    console.error('Gusto webhook error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function verifyGustoSignature(payload: string, signature: string, secret: string): boolean {
  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload);
    const expectedSignature = hmac.digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (err) {
    return false;
  }
}

async function handleEmployeeEvent(
  supabase: any,
  organizationId: string,
  event: GustoWebhookEvent
) {
  const employee = event.data?.employee;
  if (!employee) return;

  const email = employee.email?.toLowerCase();
  if (!email) return;

  // Check if user exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('email', email)
    .maybeSingle();

  if (event.event_type === 'employee.created' || event.event_type === 'employee.updated') {
    const userData = {
      first_name: employee.first_name || '',
      last_name: employee.last_name || '',
      email: email,
      title: employee.jobs?.[0]?.title || '',
      department: employee.department?.title || '',
      phone: employee.home_phone || '',
      hire_date: employee.date_of_hire || null,
      is_active: !employee.terminated,
      last_enrichment_at: new Date().toISOString(),
      last_enrichment_source: 'gusto_webhook',
    };

    if (existingUser) {
      // Update existing user
      await supabase
        .from('users')
        .update(userData)
        .eq('id', existingUser.id);
    } else {
      // Create new user
      await supabase
        .from('users')
        .insert({
          organization_id: organizationId,
          ...userData,
          source: 'gusto_webhook',
        });
    }
  } else if (event.event_type === 'employee.terminated' && existingUser) {
    // Deactivate user
    await supabase
      .from('users')
      .update({
        is_active: false,
        last_enrichment_at: new Date().toISOString(),
        last_enrichment_source: 'gusto_webhook',
      })
      .eq('id', existingUser.id);
  }

  // Update sync configuration last sync time
  await supabase
    .from('sync_configurations')
    .update({
      last_sync_at: new Date().toISOString(),
      last_sync_status: 'success',
    })
    .eq('organization_id', organizationId)
    .eq('provider', 'gusto');
}
