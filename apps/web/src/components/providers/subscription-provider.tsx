'use client';

import { SubscriptionProvider as Provider } from '@/hooks/use-subscription';

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
