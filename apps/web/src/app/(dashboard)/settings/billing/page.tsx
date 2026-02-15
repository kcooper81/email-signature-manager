'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from '@/components/ui';
import { PageHeader } from '@/components/dashboard';
import {
  CreditCard,
  Check,
  X,
  Loader2,
  ExternalLink,
  Users,
  FileSignature,
  Calendar,
  AlertTriangle,
  Sparkles,
  User,
  Building2,
  Bell,
  Palette,
  Shield,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';
import { PLANS, getPlan, formatPrice } from '@/lib/billing/plans';
import { trackViewItem, trackBeginCheckout, trackAddToCart, trackPurchase, trackSubscriptionEvent } from '@/components/analytics';
import { useSearchParams } from 'next/navigation';

// Note: billing page can't know MSP status without extra fetch, so we always show Brand Assets
// and skip the conditional Branding tab (users navigate there from the main settings page).
const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: User, href: '/settings' },
  { id: 'organization', label: 'Organization', icon: Building2, href: '/settings' },
  { id: 'brand-assets', label: 'Brand Assets', icon: ImageIcon, href: '/settings/brand-assets' },
  { id: 'billing', label: 'Billing', icon: CreditCard, href: '/settings/billing' },
  { id: 'notifications', label: 'Notifications', icon: Bell, href: '/settings' },
  { id: 'appearance', label: 'Appearance', icon: Palette, href: '/settings' },
  { id: 'security', label: 'Security', icon: Shield, href: '/settings' },
];

interface Subscription {
  id: string;
  plan: string;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  stripe_customer_id: string;
  stripe_subscription_id: string | null;
}

interface UsageStats {
  templateCount: number;
  userCount: number;
}

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usage, setUsage] = useState<UsageStats>({ templateCount: 0, userCount: 0 });
  const [loading, setLoading] = useState(true);
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
    const [purchaseTracked, setPurchaseTracked] = useState(false);
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());
  const [isSyncing, setIsSyncing] = useState(false);
  const [billingError, setBillingError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    loadBillingData();
  }, []);

  // Sync and reload data after successful checkout
  useEffect(() => {
    const success = searchParams.get('success');
    if (success === 'true') {
      setIsSyncing(true);
      // Sync subscription from Stripe and poll until updated
      const syncSubscription = async (attempts = 0): Promise<void> => {
        try {
          const response = await fetch('/api/billing/sync', { method: 'POST' });
          const data = await response.json();
          
          if (data.success && data.plan !== 'free') {
            // Subscription synced successfully
            await loadBillingData();
            setIsSyncing(false);
            return;
          }
          
          // Retry up to 5 times with increasing delay
          if (attempts < 5) {
            const delay = Math.min(1000 * Math.pow(2, attempts), 8000);
            setTimeout(() => syncSubscription(attempts + 1), delay);
          } else {
            // Final attempt - just reload data
            await loadBillingData();
            setIsSyncing(false);
          }
        } catch (error) {
          console.error('Sync error:', error);
          if (attempts < 5) {
            setTimeout(() => syncSubscription(attempts + 1), 2000);
          } else {
            setIsSyncing(false);
          }
        }
      };
      
      syncSubscription();
    }
  }, [searchParams]);

  // Track successful checkout/purchase
  useEffect(() => {
    const success = searchParams.get('success');
    if (success === 'true' && subscription && !purchaseTracked) {
      const plan = getPlan(subscription.plan);
      const priceInDollars = plan.pricePerUser / 100;
      const estimatedValue = priceInDollars * usage.userCount;
      
      // Track the purchase
      trackPurchase(
        subscription.stripe_subscription_id || `sub_${Date.now()}`,
        [{
          item_id: subscription.plan,
          item_name: plan.name,
          price: priceInDollars,
          quantity: usage.userCount,
          item_category: 'subscription',
        }],
        estimatedValue
      );

      // Track subscription event
      trackSubscriptionEvent(
        'subscription_started',
        plan.name,
        estimatedValue
      );

      setPurchaseTracked(true);
    }
  }, [searchParams, subscription, usage, purchaseTracked]);

  const loadBillingData = async () => {
    const supabase = createClient();
    
    // Get current user's organization
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.organization_id) {
      setLoading(false);
      return;
    }

    // Get subscription
    const { data: subData } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('organization_id', userData.organization_id)
      .single();

    if (subData) {
      setSubscription(subData);
    }

    // Get usage stats
    const { count: templateCount } = await supabase
      .from('signature_templates')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', userData.organization_id);

    const { count: userCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', userData.organization_id);

    setUsage({
      templateCount: templateCount || 0,
      userCount: userCount || 0,
    });

    setLoading(false);
  };

  const handleManageBilling = async () => {
    setLoadingPlanId('billing-portal');
    setBillingError(null);
    try {
      const response = await fetch('/api/billing/portal', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        setBillingError(data.error === 'No billing account found' 
          ? 'No active subscription found. Please upgrade to a paid plan first.'
          : data.error);
      }
    } catch (error) {
      console.error('Failed to open billing portal:', error);
      setBillingError('Failed to open billing portal. Please try again.');
    } finally {
      setLoadingPlanId(null);
    }
  };

  const handleUpgrade = async (planId: string) => {
    setLoadingPlanId(planId);
    setBillingError(null);
    try {
      // Track plan selection and checkout start
      const selectedPlan = getPlan(planId);
      const priceInDollars = selectedPlan.pricePerUser / 100; // Convert cents to dollars
      const estimatedValue = priceInDollars * usage.userCount;
      
      trackAddToCart({
        item_id: planId,
        item_name: selectedPlan.name,
        price: priceInDollars,
        quantity: usage.userCount,
        item_category: 'subscription',
      });
      
      trackBeginCheckout(
        [{
          item_id: planId,
          item_name: selectedPlan.name,
          price: priceInDollars,
          quantity: usage.userCount,
          item_category: 'subscription',
        }],
        estimatedValue
      );

      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        setBillingError(data.error);
      } else {
        setBillingError('Failed to start checkout. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Failed to start checkout:', error);
      setBillingError('Failed to connect to payment provider. Please check your connection and try again.');
    } finally {
      setLoadingPlanId(null);
    }
  };

  const currentPlan = getPlan(subscription?.plan || 'free');
  const isCanceled = subscription?.cancel_at_period_end;
  const isPastDue = subscription?.status === 'past_due';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-56 shrink-0">
          <nav className="space-y-1 lg:sticky lg:top-6">
            {settingsTabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
                  tab.id === 'billing'
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Billing & Subscription</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadBillingData()}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

      {/* Syncing Banner */}
      {isSyncing && (
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            <div>
              <p className="font-medium text-blue-600">Syncing your subscription...</p>
              <p className="text-sm text-blue-600">
                Please wait while we confirm your purchase with Stripe.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      
      {isPastDue && (
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-600">Payment past due</p>
              <p className="text-sm text-red-600">
                Please update your payment method to avoid service interruption.
              </p>
            </div>
            <Button variant="destructive" onClick={handleManageBilling} className="ml-auto">
              Update Payment
            </Button>
          </CardContent>
        </Card>
      )}

      {isCanceled && (
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-600">Subscription canceled</p>
              <p className="text-sm text-amber-600">
                Your subscription will end on {subscription?.current_period_end 
                  ? new Date(subscription.current_period_end).toLocaleDateString() 
                  : 'the end of the billing period'}.
              </p>
            </div>
            <Button variant="outline" onClick={handleManageBilling} className="ml-auto">
              Reactivate
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Current Plan */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Plan
            </CardTitle>
            <CardDescription>
              Your current subscription and usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">{currentPlan.name}</h3>
                                    {isCanceled && <Badge variant="warning">Canceling</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{currentPlan.description}</p>
                {currentPlan.pricePerUser > 0 && (
                  <div className="mt-2">
                    <p className="text-lg font-medium">
                      {formatPrice(currentPlan.pricePerUser)}/user/month
                    </p>
                    {currentPlan.id === 'professional' && (
                      <p className="text-sm text-muted-foreground">10-user minimum ($15/mo)</p>
                    )}
                  </div>
                )}
              </div>
              {subscription?.stripe_subscription_id && (
                <Button variant="outline" onClick={handleManageBilling} disabled={loadingPlanId === 'billing-portal'}>
                  {loadingPlanId === 'billing-portal' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Manage Subscription'}
                </Button>
              )}
            </div>

            {/* Usage */}
            <div>
              <h4 className="font-medium mb-3">Current Usage</h4>
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileSignature className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Templates</span>
                  </div>
                  <span className="font-medium">
                    {usage.templateCount} / {currentPlan.features.maxTemplates === -1 ? '∞' : currentPlan.features.maxTemplates}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Team Members</span>
                  </div>
                  <span className="font-medium">
                    {usage.userCount} / {currentPlan.features.maxUsers === -1 ? '∞' : currentPlan.features.maxUsers}
                  </span>
                </div>
              </div>
            </div>

            {/* Billing Period */}
            {subscription?.current_period_end && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {isCanceled ? 'Access until' : 'Next billing date'}:{' '}
                  {new Date(subscription.current_period_end).toLocaleDateString()}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {billingError && (
              <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-600 rounded-md flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{billingError}</span>
              </div>
            )}
            {subscription?.stripe_subscription_id ? (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={handleManageBilling}
                  disabled={loadingPlanId === 'billing-portal'}
                >
                  {loadingPlanId === 'billing-portal' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
                  Update Payment Method
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={handleManageBilling}
                  disabled={loadingPlanId === 'billing-portal'}
                >
                  {loadingPlanId === 'billing-portal' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                  View Invoices
                </Button>
              </>
            ) : (
              <Button 
                className="w-full" 
                onClick={() => handleUpgrade('professional')}
                disabled={loadingPlanId === 'professional'}
              >
                {loadingPlanId === 'professional' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Upgrade to Pro
              </Button>
            )}
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground" 
              onClick={async () => {
                setIsSyncing(true);
                setBillingError(null);
                try {
                  const res = await fetch('/api/billing/sync', { method: 'POST' });
                  const data = await res.json();
                  if (data.success) {
                    await loadBillingData();
                  } else if (data.error || data.message) {
                    setBillingError(data.error || data.message);
                  }
                } catch (e) {
                  setBillingError('Failed to sync subscription');
                } finally {
                  setIsSyncing(false);
                }
              }}
              disabled={isSyncing}
            >
              {isSyncing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Sync Subscription
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Choose the plan that best fits your team's needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {billingError && (
            <div className="mb-4 p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-600 rounded-md flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{billingError}</span>
            </div>
          )}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(PLANS).map((plan) => {
              const isCurrentPlan = currentPlan.id === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`relative p-4 border rounded-lg ${
                    plan.popular ? 'border-primary/30 bg-primary/5' : ''
                  } ${isCurrentPlan ? 'ring-2 ring-primary' : ''}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-2 left-1/2 -translate-x-1/2" variant="default">
                      Most Popular
                    </Badge>
                  )}
                  <h3 className="font-semibold text-lg mt-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                  <div className="mb-4">
                    {plan.pricePerUser === 0 ? (
                      <p className="text-xl sm:text-2xl font-bold">
                        {plan.id === 'enterprise' ? 'Custom' : 'Free'}
                      </p>
                    ) : (
                      <div>
                        <p className="text-xl sm:text-2xl font-bold">
                          {formatPrice(plan.pricePerUser)}
                          <span className="text-sm font-normal text-muted-foreground">/user/mo</span>
                        </p>
                        {plan.id === 'professional' && (
                          <p className="text-sm text-muted-foreground">10-user minimum</p>
                        )}
                      </div>
                    )}
                  </div>
                  <ul className="space-y-2 text-sm mb-4 max-h-64 overflow-y-auto">
                    {(expandedPlans.has(plan.id) ? plan.featureList : plan.featureList.slice(0, 8)).map((feature) => (
                      <li key={feature.text} className="flex items-center gap-2">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                        )}
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                    {plan.featureList.length > 8 && (
                      <li>
                        <button
                          onClick={() => {
                            const newExpanded = new Set(expandedPlans);
                            if (expandedPlans.has(plan.id)) {
                              newExpanded.delete(plan.id);
                            } else {
                              newExpanded.add(plan.id);
                            }
                            setExpandedPlans(newExpanded);
                          }}
                          className="text-xs text-primary hover:text-primary font-medium pl-6"
                        >
                          {expandedPlans.has(plan.id) 
                            ? '− Show less' 
                            : `+ ${plan.featureList.length - 8} more features`}
                        </button>
                      </li>
                    )}
                  </ul>
                  {isCurrentPlan ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : plan.id === 'enterprise' ? (
                    <Button variant="outline" className="w-full" asChild>
                      <a href="mailto:sales@siggly.io">Contact Sales</a>
                    </Button>
                  ) : plan.id === 'free' ? (
                    <Button variant="outline" className="w-full" disabled>
                      Downgrade
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={loadingPlanId === plan.id}
                    >
                      {loadingPlanId === plan.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Upgrade'}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  );
}
