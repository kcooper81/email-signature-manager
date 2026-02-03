'use client';

import { useEffect } from 'react';
import { trackViewItem, trackBeginCheckout, trackEvent } from './google-analytics';

interface PricingPlan {
  id: string;
  name: string;
  pricePerUser: number; // in cents
}

// Track when pricing page is viewed
export function usePricingPageView(plans: PricingPlan[]) {
  useEffect(() => {
    // Track view of all pricing plans
    plans.forEach((plan) => {
      if (plan.pricePerUser > 0) {
        trackViewItem({
          item_id: plan.id,
          item_name: plan.name,
          price: plan.pricePerUser / 100, // Convert cents to dollars
          item_category: 'subscription',
        });
      }
    });
    
    // Track pricing page view as an event
    trackEvent('view_pricing', 'engagement', 'pricing_page');
  }, [plans]);
}

// Track when user clicks on a plan CTA
export function trackPlanClick(plan: PricingPlan, userCount: number = 1) {
  const priceInDollars = plan.pricePerUser / 100;
  
  trackBeginCheckout(
    [{
      item_id: plan.id,
      item_name: plan.name,
      price: priceInDollars,
      quantity: userCount,
      item_category: 'subscription',
    }],
    priceInDollars * userCount
  );
}

// Component to track pricing page view
export function PricingPageTracker({ plans }: { plans: PricingPlan[] }) {
  usePricingPageView(plans);
  return null;
}
