import type Stripe from 'stripe';

// Partner tier discount percentages
export const PARTNER_DISCOUNTS = {
  registered: 15,  // 15% margin
  authorized: 20,  // 20% margin
  premier: 25,     // 25% margin
} as const;

// Stripe coupon IDs - these should be created in Stripe Dashboard
// Format: PARTNER_{TIER} with percentage off forever
export const PARTNER_COUPON_IDS = {
  registered: 'PARTNER_REGISTERED_15',
  authorized: 'PARTNER_AUTHORIZED_20',
  premier: 'PARTNER_PREMIER_25',
} as const;

export type PartnerTier = keyof typeof PARTNER_DISCOUNTS;

/**
 * Get or create a partner coupon in Stripe.
 * Creates the coupon if it doesn't exist.
 */
export async function getOrCreatePartnerCoupon(
  stripe: Stripe,
  tier: PartnerTier
): Promise<string> {
  const couponId = PARTNER_COUPON_IDS[tier];
  const discountPercent = PARTNER_DISCOUNTS[tier];

  try {
    // Try to retrieve existing coupon
    await stripe.coupons.retrieve(couponId);
    return couponId;
  } catch (error: any) {
    // Coupon doesn't exist, create it
    if (error.code === 'resource_missing') {
      await stripe.coupons.create({
        id: couponId,
        percent_off: discountPercent,
        duration: 'forever',
        name: `Partner ${tier.charAt(0).toUpperCase() + tier.slice(1)} - ${discountPercent}% Off`,
        metadata: {
          partner_tier: tier,
          description: `MSP Partner ${tier} tier discount`,
        },
      });
      return couponId;
    }
    throw error;
  }
}

/**
 * Apply partner coupon to a Stripe customer.
 * This will apply to all future invoices.
 */
export async function applyPartnerCouponToCustomer(
  stripe: Stripe,
  customerId: string,
  tier: PartnerTier
): Promise<void> {
  const couponId = await getOrCreatePartnerCoupon(stripe, tier);

  await stripe.customers.update(customerId, {
    coupon: couponId,
  });
}

/**
 * Apply partner coupon to an existing subscription.
 */
export async function applyPartnerCouponToSubscription(
  stripe: Stripe,
  subscriptionId: string,
  tier: PartnerTier
): Promise<void> {
  const couponId = await getOrCreatePartnerCoupon(stripe, tier);

  await stripe.subscriptions.update(subscriptionId, {
    coupon: couponId,
  });
}

/**
 * Remove partner coupon from a customer.
 */
export async function removePartnerCoupon(
  stripe: Stripe,
  customerId: string
): Promise<void> {
  await stripe.customers.update(customerId, {
    coupon: '',
  });
}

/**
 * Update partner tier (change coupon).
 */
export async function updatePartnerTier(
  stripe: Stripe,
  customerId: string,
  newTier: PartnerTier
): Promise<void> {
  // Remove old coupon and apply new one
  await applyPartnerCouponToCustomer(stripe, customerId, newTier);
}
