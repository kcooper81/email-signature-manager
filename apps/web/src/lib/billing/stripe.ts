import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
  typescript: true,
});

export const STRIPE_PRICE_IDS = {
  professional_per_user: process.env.STRIPE_PROFESSIONAL_PER_USER_PRICE_ID || '',
  // Legacy: keep for backward compatibility with existing subscriptions
  starter: process.env.STRIPE_STARTER_PRICE_ID || '',
  professional_base: process.env.STRIPE_PROFESSIONAL_BASE_PRICE_ID || '',
};

// Professional plan: $1.50/user/month, 10-user minimum
export const PROFESSIONAL_MIN_USERS = 10;

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
  planId: 'professional';
  quantity: number;
  successUrl: string;
  cancelUrl: string;
  trialDays?: number;
  couponId?: string;
}) {
  // Professional: $1.50/user/month, enforce 10-user minimum
  const billableUsers = Math.max(PROFESSIONAL_MIN_USERS, quantity);

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price: STRIPE_PRICE_IDS.professional_per_user,
      quantity: billableUsers,
    },
  ];

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

export async function updateSubscriptionQuantity(subscriptionId: string, quantity: number) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Find the per-user item (handles both new and legacy subscriptions)
  const perUserItem = subscription.items.data.find(
    item => item.price.id === STRIPE_PRICE_IDS.professional_per_user
  );
  // Legacy: handle old starter subscriptions
  const starterItem = subscription.items.data.find(
    item => item.price.id === STRIPE_PRICE_IDS.starter
  );
  // Legacy: handle old professional base+per-user subscriptions
  const legacyBaseItem = subscription.items.data.find(
    item => item.price.id === STRIPE_PRICE_IDS.professional_base
  );

  const billableUsers = Math.max(PROFESSIONAL_MIN_USERS, quantity);
  const itemsToUpdate: any[] = [];

  if (perUserItem) {
    // New pricing: just update per-user quantity
    itemsToUpdate.push({
      id: perUserItem.id,
      quantity: billableUsers,
    });
  } else if (starterItem) {
    // Legacy starter: update quantity
    itemsToUpdate.push({
      id: starterItem.id,
      quantity: billableUsers,
    });
  } else if (legacyBaseItem) {
    // Legacy professional with base fee: find per-user item
    const legacyPerUserItem = subscription.items.data.find(
      item => item.price.id !== STRIPE_PRICE_IDS.professional_base
    );
    if (legacyPerUserItem) {
      itemsToUpdate.push({
        id: legacyPerUserItem.id,
        quantity: Math.max(0, quantity - 10), // Legacy: 10 included in base
      });
    }
  } else {
    throw new Error('No recognized subscription item found');
  }

  if (itemsToUpdate.length === 0) {
    return subscription;
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
