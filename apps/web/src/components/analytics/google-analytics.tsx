'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-W560DSBFEE';

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Ecommerce event types
interface EcommerceItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity?: number;
  item_category?: string;
  item_variant?: string;
}

// Track page views (for client-side navigation)
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

// Track custom events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Ecommerce: View item (pricing page view)
export function trackViewItem(item: EcommerceItem) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'USD',
      value: item.price,
      items: [item],
    });
  }
}

// Ecommerce: Begin checkout (start trial/signup click)
export function trackBeginCheckout(items: EcommerceItem[], value: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: value,
      items: items,
    });
  }
}

// Ecommerce: Purchase complete (subscription activated)
export function trackPurchase(transactionId: string, items: EcommerceItem[], value: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      currency: 'USD',
      value: value,
      items: items,
    });
  }
}

// Ecommerce: Add to cart (plan selection)
export function trackAddToCart(item: EcommerceItem) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: item.price,
      items: [item],
    });
  }
}

// Lead generation: Sign up started
export function trackSignUpStart() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'sign_up', {
      method: 'email',
    });
  }
}

// Lead generation: Sign up completed
export function trackSignUpComplete(method: string = 'email') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'sign_up_complete', {
      method: method,
    });
  }
}

// Lead generation: Demo request
export function trackDemoRequest() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'USD',
      value: 50, // Estimated lead value
    });
  }
}

// Feature usage tracking
export function trackFeatureUsage(featureName: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'feature_used', {
      feature_name: featureName,
    });
  }
}

// Subscription events
export function trackSubscriptionEvent(
  eventType: 'trial_started' | 'trial_ended' | 'subscription_started' | 'subscription_cancelled' | 'subscription_upgraded',
  planName: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventType, {
      plan_name: planName,
      currency: 'USD',
      value: value,
    });
  }
}

// Deployment tracking
export function trackDeployment(userCount: number, platform: 'google' | 'microsoft') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'deployment_complete', {
      user_count: userCount,
      platform: platform,
    });
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
