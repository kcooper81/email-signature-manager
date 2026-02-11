import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
  typescript: true,
});

export const STRIPE_PRICE_IDS = {
  starter: process.env.STRIPE_STARTER_PRICE_ID || '',
  professional_base: process.env.STRIPE_PROFESSIONAL_BASE_PRICE_ID || '',
  professional_per_user: process.env.STRIPE_PROFESSIONAL_PER_USER_PRICE_ID || '',
};

export async function createCustomer(email: string, name: string, organizationId: string) {
  return stripe.customers.create({
    email,
    name,
    metadata: {
      organizationId,
    },
  });
}

export async function createCheckoutSession({
  customerId,
  planId,
  quantity,
  successUrl,
  cancelUrl,
  trialDays,
  couponId,
}: {
  customerId: string;
  planId: 'starter' | 'professional';
  quantity: number;
  successUrl: string;
  cancelUrl: string;
  trialDays?: number;
  couponId?: string;
}) {
  // Build line items based on plan
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  if (planId === 'starter') {
    // Starter: $0.50/member/month (per-user only)
    lineItems.push({
      price: STRIPE_PRICE_IDS.starter,
      quantity,
    });
  } else if (planId === 'professional') {
    // Professional: $29/month base (includes first 10 users) + $1/user/month for users beyond 10
    lineItems.push({
      price: STRIPE_PRICE_IDS.professional_base,
      quantity: 1, // Base fee is always 1
    });
    
    // Only charge per-user fee for users beyond the first 10
    const PROFESSIONAL_INCLUDED_USERS = 10;
    const billableUsers = Math.max(0, quantity - PROFESSIONAL_INCLUDED_USERS);
    if (billableUsers > 0) {
      lineItems.push({
        price: STRIPE_PRICE_IDS.professional_per_user,
        quantity: billableUsers,
      });
    }
  }

  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: lineItems,
    subscription_data: trialDays
      ? {
          trial_period_days: trialDays,
        }
      : undefined,
    success_url: successUrl,
    cancel_url: cancelUrl,
    // Apply partner coupon if provided, otherwise allow manual promo codes
    ...(couponId
      ? { discounts: [{ coupon: couponId }] }
      : { allow_promotion_codes: true }),
  });
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

export async function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId);
}

export const PROFESSIONAL_INCLUDED_USERS = 10;

export async function updateSubscriptionQuantity(subscriptionId: string, quantity: number) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  // Find the per-user item (for both Starter and Professional)
  const starterItem = subscription.items.data.find(
    item => item.price.id === STRIPE_PRICE_IDS.starter
  );
  const professionalPerUserItem = subscription.items.data.find(
    item => item.price.id === STRIPE_PRICE_IDS.professional_per_user
  );
  const professionalBaseItem = subscription.items.data.find(
    item => item.price.id === STRIPE_PRICE_IDS.professional_base
  );

  const itemsToUpdate: any[] = [];

  if (starterItem) {
    // Starter plan: charge for all users
    itemsToUpdate.push({
      id: starterItem.id,
      quantity,
    });
  } else if (professionalBaseItem) {
    // Professional plan: first 10 users included in base, then $1/user
    const billableUsers = Math.max(0, quantity - PROFESSIONAL_INCLUDED_USERS);
    
    if (professionalPerUserItem) {
      if (billableUsers > 0) {
        // Update existing per-user item
        itemsToUpdate.push({
          id: professionalPerUserItem.id,
          quantity: billableUsers,
        });
      } else {
        // Remove per-user item if no billable users
        itemsToUpdate.push({
          id: professionalPerUserItem.id,
          deleted: true,
        });
      }
    } else if (billableUsers > 0) {
      // Add per-user item if needed
      itemsToUpdate.push({
        price: STRIPE_PRICE_IDS.professional_per_user,
        quantity: billableUsers,
      });
    }
  } else {
    throw new Error('No recognized subscription item found');
  }

  if (itemsToUpdate.length === 0) {
    return subscription; // No changes needed
  }

  return stripe.subscriptions.update(subscriptionId, {
    items: itemsToUpdate,
    proration_behavior: 'create_prorations',
  });
}

export async function cancelSubscription(subscriptionId: string, cancelAtPeriodEnd = true) {
  if (cancelAtPeriodEnd) {
    return stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
  }
  return stripe.subscriptions.cancel(subscriptionId);
}

export async function reactivateSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
}

export async function getUpcomingInvoice(customerId: string) {
  try {
    return await stripe.invoices.retrieveUpcoming({
      customer: customerId,
    });
  } catch {
    return null;
  }
}

export async function getInvoices(customerId: string, limit = 10) {
  return stripe.invoices.list({
    customer: customerId,
    limit,
  });
}
