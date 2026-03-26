import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/billing/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { logException } from '@/lib/error-logging';
import { notifyAdminsOfSubscriptionEvent } from '@/lib/email/resend';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  // Validate required environment variables
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!webhookSecret) {
    console.error('[Webhook] STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'Webhook not configured: missing STRIPE_WEBHOOK_SECRET' },
      { status: 500 }
    );
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('[Webhook] Supabase credentials not configured');
    return NextResponse.json(
      { error: 'Webhook not configured: missing Supabase credentials' },
      { status: 500 }
    );
  }

  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    console.error('[Webhook] Missing stripe-signature header');
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('[Webhook] Signature verification failed:', err.message);
    
    await logException(err, {
      route: '/api/billing/webhook',
      method: 'POST',
      errorType: 'billing_error',
      metadata: { 
        reason: 'signature_verification_failed',
        hasSignature: !!signature,
        signatureLength: signature?.length,
      },
    });

    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    // Idempotency check: skip if this event was already processed
    const supabaseIdempotency = getSupabaseAdmin();
    const { data: existingEvent } = await supabaseIdempotency
      .from('subscription_events')
      .select('id')
      .eq('stripe_event_id', event.id)
      .maybeSingle();

    if (existingEvent) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session, event.id);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription, event.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription, event.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice, event.id);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error(`Webhook handler error [${event?.type || 'unknown'}]:`, error);
    
    await logException(error, {
      route: '/api/billing/webhook',
      method: 'POST',
      errorType: 'billing_error',
      metadata: { eventType: event?.type },
    });

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session, stripeEventId: string) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  if (!subscriptionId) {
    return;
  }

  // Get the subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Determine plan from all line items (handles multi-item subscriptions)
  const plan = getPlanFromSubscription(subscription);

  // Update our database
  const supabase = getSupabaseAdmin();
  
  // First check if subscription exists
  const { data: existingSub, error: fetchError } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('stripe_customer_id', customerId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('[Webhook] Error fetching subscription:', fetchError);
    return;
  }

  if (existingSub) {
    const oldPlan = existingSub.plan;
    
    // Update existing subscription
    const { error } = await supabase
      .from('subscriptions')
      .update({
        stripe_subscription_id: subscriptionId,
        plan,
        status: subscription.status === 'trialing' ? 'trialing' : 'active',
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_customer_id', customerId);

    if (error) {
      console.error('[Webhook] Failed to update subscription after checkout:', error);
    } else {
      // Log the subscription event
      const eventType = oldPlan === 'free' ? 'created' : 
                        getPlanRank(plan) > getPlanRank(oldPlan) ? 'upgraded' : 'downgraded';
      
      await logSubscriptionEvent(supabase, {
        organizationId: existingSub.organization_id,
        subscriptionId: existingSub.id,
        eventType,
        fromPlan: oldPlan,
        toPlan: plan,
        fromStatus: existingSub.status,
        toStatus: subscription.status === 'trialing' ? 'trialing' : 'active',
        stripeEventId,
      });

      // Notify admins of new/upgraded subscription
      await sendSubscriptionNotification(
        supabase,
        existingSub.organization_id,
        eventType as 'created' | 'upgraded' | 'downgraded',
        plan,
        oldPlan !== plan ? oldPlan : undefined
      );
    }
  } else {
    console.error('[Webhook] No subscription record found for customer:', customerId);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription, stripeEventId: string) {
  const customerId = subscription.customer as string;

  const status = mapStripeStatus(subscription.status);
  const plan = getPlanFromSubscription(subscription);

  const supabase = getSupabaseAdmin();
  
  // Get existing subscription to compare
  const { data: existingSub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('stripe_customer_id', customerId)
    .single();

  const { error } = await supabase
    .from('subscriptions')
    .update({
      stripe_subscription_id: subscription.id,
      plan,
      status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId);

  if (error) {
    console.error('[Webhook] Failed to update subscription:', error);
  } else {
    // Log event if plan or status changed
    if (existingSub && (existingSub.plan !== plan || existingSub.status !== status)) {
      let eventType = 'updated';
      if (existingSub.plan !== plan) {
        eventType = getPlanRank(plan) > getPlanRank(existingSub.plan) ? 'upgraded' : 'downgraded';
      }

      await logSubscriptionEvent(supabase, {
        organizationId: existingSub.organization_id,
        subscriptionId: existingSub.id,
        eventType,
        fromPlan: existingSub.plan,
        toPlan: plan,
        fromStatus: existingSub.status,
        toStatus: status,
        stripeEventId,
      });

      // Notify admins of plan changes
      if (existingSub.plan !== plan) {
        await sendSubscriptionNotification(
          supabase,
          existingSub.organization_id,
          eventType as 'upgraded' | 'downgraded',
          plan,
          existingSub.plan
        );
      }
    }
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription, stripeEventId: string) {
  const customerId = subscription.customer as string;

  const supabase = getSupabaseAdmin();
  
  // Get existing subscription first
  const { data: existingSub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('stripe_customer_id', customerId)
    .single();

  const { error } = await supabase
    .from('subscriptions')
    .update({
      plan: 'free',
      status: 'canceled',
      stripe_subscription_id: null,
      cancel_at_period_end: false,
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId);

  if (error) {
    console.error('Failed to handle subscription deletion:', error);
  } else if (existingSub) {
    await logSubscriptionEvent(supabase, {
      organizationId: existingSub.organization_id,
      subscriptionId: existingSub.id,
      eventType: 'canceled',
      fromPlan: existingSub.plan,
      toPlan: 'free',
      fromStatus: existingSub.status,
      toStatus: 'canceled',
      stripeEventId,
    });

    await sendSubscriptionNotification(
      supabase,
      existingSub.organization_id,
      'canceled',
      'free',
      existingSub.plan
    );
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice, stripeEventId: string) {
  const customerId = invoice.customer as string;

  const supabase = getSupabaseAdmin();
  
  const { data: existingSub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('stripe_customer_id', customerId)
    .single();

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId);

  if (error) {
    console.error('Failed to update subscription status to past_due:', error);
  } else if (existingSub) {
    await logSubscriptionEvent(supabase, {
      organizationId: existingSub.organization_id,
      subscriptionId: existingSub.id,
      eventType: 'payment_failed',
      fromStatus: existingSub.status,
      toStatus: 'past_due',
      stripeEventId,
    });

    await sendSubscriptionNotification(
      supabase,
      existingSub.organization_id,
      'payment_failed',
      existingSub.plan
    );
  }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  // Only update if currently past_due
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId)
    .eq('status', 'past_due');

  if (error) {
    console.error('Failed to update subscription status after payment:', error);
  }
}

function getPlanFromSubscription(subscription: Stripe.Subscription): string {
  // Check all line items in the subscription to determine the plan
  const priceIds = subscription.items.data.map(item => item.price.id);

  const professionalPerUserPriceId = process.env.STRIPE_PROFESSIONAL_PER_USER_PRICE_ID;
  // Legacy price IDs for backward compatibility
  const starterPriceId = process.env.STRIPE_STARTER_PRICE_ID;
  const professionalBasePriceId = process.env.STRIPE_PROFESSIONAL_BASE_PRICE_ID;

  // Check if any price ID matches professional plan (new or legacy)
  if (priceIds.includes(professionalPerUserPriceId!) ||
      priceIds.includes(professionalBasePriceId!)) {
    return 'professional';
  }

  // Legacy starter customers are migrated to professional
  if (priceIds.includes(starterPriceId!)) {
    return 'professional';
  }

  return 'free';
}

function getPlanFromPriceId(priceId: string | undefined): string {
  if (!priceId) return 'free';

  const professionalPerUserPriceId = process.env.STRIPE_PROFESSIONAL_PER_USER_PRICE_ID;
  const professionalBasePriceId = process.env.STRIPE_PROFESSIONAL_BASE_PRICE_ID;
  const starterPriceId = process.env.STRIPE_STARTER_PRICE_ID;

  if (priceId === professionalPerUserPriceId || priceId === professionalBasePriceId) return 'professional';
  // Legacy starter customers migrate to professional
  if (priceId === starterPriceId) return 'professional';

  return 'free';
}

function mapStripeStatus(status: Stripe.Subscription.Status): string {
  switch (status) {
    case 'active':
      return 'active';
    case 'trialing':
      return 'trialing';
    case 'past_due':
      return 'past_due';
    case 'canceled':
    case 'unpaid':
    case 'incomplete_expired':
      return 'canceled';
    default:
      return 'active';
  }
}

function getPlanRank(plan: string): number {
  switch (plan) {
    case 'free': return 0;
    case 'starter': return 1; // Legacy, maps to professional
    case 'professional': return 2;
    case 'enterprise': return 3;
    default: return 0;
  }
}

async function sendSubscriptionNotification(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  organizationId: string,
  eventType: 'created' | 'upgraded' | 'downgraded' | 'canceled' | 'payment_failed',
  plan: string,
  fromPlan?: string
) {
  try {
    // Look up org name and owner email
    const { data: org } = await supabase
      .from('organizations')
      .select('name')
      .eq('id', organizationId)
      .single();

    const { data: owner } = await supabase
      .from('organization_members')
      .select('users(email)')
      .eq('organization_id', organizationId)
      .eq('role', 'owner')
      .single();

    const ownerEmail = (owner as any)?.users?.email || 'unknown';

    await notifyAdminsOfSubscriptionEvent({
      organizationName: org?.name || 'Unknown Organization',
      ownerEmail,
      plan,
      eventType,
      fromPlan,
    });
  } catch (error) {
    console.error('[Webhook] Failed to send subscription notification email:', error);
  }
}

interface SubscriptionEventData {
  organizationId: string;
  subscriptionId: string;
  eventType: string;
  fromPlan?: string;
  toPlan?: string;
  fromStatus?: string;
  toStatus?: string;
  stripeEventId?: string;
  metadata?: Record<string, unknown>;
}

async function logSubscriptionEvent(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  data: SubscriptionEventData
) {
  const { error } = await supabase
    .from('subscription_events')
    .insert({
      organization_id: data.organizationId,
      subscription_id: data.subscriptionId,
      event_type: data.eventType,
      from_plan: data.fromPlan,
      to_plan: data.toPlan,
      from_status: data.fromStatus,
      to_status: data.toStatus,
      stripe_event_id: data.stripeEventId,
      metadata: data.metadata,
    });

  if (error) {
    console.error('[Webhook] Failed to log subscription event:', error);
  }
}
