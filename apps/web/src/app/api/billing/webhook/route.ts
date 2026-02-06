import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/billing/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { logException } from '@/lib/error-logging';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  const body = await request.text();
  const signature = headers().get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    
    await logException(err, {
      route: '/api/billing/webhook',
      method: 'POST',
      errorType: 'billing_error',
      metadata: { reason: 'signature_verification_failed' },
    });

    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    
    await logException(error, {
      route: '/api/billing/webhook',
      method: 'POST',
      errorType: 'billing_error',
      metadata: { eventType: event?.type },
    });

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  console.log('[Webhook] Checkout completed:', { customerId, subscriptionId });

  if (!subscriptionId) {
    console.log('[Webhook] No subscription ID in session');
    return;
  }

  // Get the subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Determine plan from all line items (handles multi-item subscriptions)
  const plan = getPlanFromSubscription(subscription);
  console.log('[Webhook] Detected plan:', plan);

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
      console.log('[Webhook] Successfully updated subscription to plan:', plan);
      
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
      });
    }
  } else {
    console.error('[Webhook] No subscription record found for customer:', customerId);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  const status = mapStripeStatus(subscription.status);
  const plan = getPlanFromSubscription(subscription);

  console.log('[Webhook] Subscription updated:', { customerId, subscriptionId: subscription.id, plan, status });

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
    console.log('[Webhook] Successfully updated subscription');
    
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
      });
    }
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
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
    });
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
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
    });
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
  
  const starterPriceId = process.env.STRIPE_STARTER_PRICE_ID;
  const professionalBasePriceId = process.env.STRIPE_PROFESSIONAL_BASE_PRICE_ID;
  const professionalPerUserPriceId = process.env.STRIPE_PROFESSIONAL_PER_USER_PRICE_ID;

  // Check if any price ID matches professional plan
  if (priceIds.includes(professionalBasePriceId!) || priceIds.includes(professionalPerUserPriceId!)) {
    return 'professional';
  }
  
  // Check if any price ID matches starter plan
  if (priceIds.includes(starterPriceId!)) {
    return 'starter';
  }
  
  return 'free';
}

function getPlanFromPriceId(priceId: string | undefined): string {
  if (!priceId) return 'free';
  
  const starterPriceId = process.env.STRIPE_STARTER_PRICE_ID;
  const professionalBasePriceId = process.env.STRIPE_PROFESSIONAL_BASE_PRICE_ID;
  const professionalPerUserPriceId = process.env.STRIPE_PROFESSIONAL_PER_USER_PRICE_ID;

  if (priceId === starterPriceId) return 'starter';
  if (priceId === professionalBasePriceId || priceId === professionalPerUserPriceId) return 'professional';
  
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
    case 'starter': return 1;
    case 'professional': return 2;
    case 'enterprise': return 3;
    default: return 0;
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
  } else {
    console.log('[Webhook] Logged subscription event:', data.eventType);
  }
}
