'use client';

import { useEffect } from 'react';
import { trackViewItem } from './google-analytics';

interface Plan {
  id: string;
  name: string;
  price: number;
}

export function TrackPricingView({ plans }: { plans: Plan[] }) {
  useEffect(() => {
    // Track view of all pricing plans
    plans.forEach((plan) => {
      trackViewItem({
        item_id: plan.id,
        item_name: plan.name,
        price: plan.price,
        item_category: 'subscription',
      });
    });
  }, [plans]);

  return null;
}
