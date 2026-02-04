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
} from 'lucide-react';
import { PLANS, getPlan, formatPrice, TRIAL_DAYS } from '@/lib/billing/plans';
import { trackViewItem, trackBeginCheckout, trackAddToCart, trackPurchase, trackSubscriptionEvent } from '@/components/analytics';
import { useSearchParams } from 'next/navigation';

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: User, href: '/settings' },
  { id: 'organization', label: 'Organization', icon: Building2, href: '/settings' },
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
  const [trialEndsAt, setTrialEndsAt] = useState<string | null>(null);
  const [purchaseTracked, setPurchaseTracked] = useState(false);
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());
  const searchParams = useSearchParams();

  useEffect(() => {
    loadBillingData();
  }, []);

  // Reload data after successful checkout
  useEffect(() => {
    const success = searchParams.get('success');
    if (success === 'true') {
      // Wait a bit for webhook to process, then reload
      const timer = setTimeout(() => {
        loadBillingData();
      }, 2000);
      return () => clearTimeout(timer);
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
      const isTrialing = subscription.status === 'trialing';
      trackSubscriptionEvent(
        isTrialing ? 'trial_started' : 'subscription_started',
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

    // Get organization for trial info
    const { data: orgData } = await supabase
      .from('organizations')
      .select('trial_ends_at')
      .eq('id', userData.organization_id)
      .single();

    if (orgData?.trial_ends_at) {
      setTrialEndsAt(orgData.trial_ends_at);
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
    try {
      const response = await fetch('/api/billing/portal', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Failed to open billing portal:', error);
    } finally {
      setLoadingPlanId(null);
    }
  };

  const handleUpgrade = async (planId: string) => {
    setLoadingPlanId(planId);
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
      }
    } catch (error) {
      console.error('Failed to start checkout:', error);
    } finally {
      setLoadingPlanId(null);
    }
  };

  const currentPlan = getPlan(subscription?.plan || 'free');
  const isTrialing = subscription?.status === 'trialing';
  const isCanceled = subscription?.cancel_at_period_end;
  const isPastDue = subscription?.status === 'past_due';

  const trialDaysRemaining = trialEndsAt
    ? Math.max(0, Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

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
                    ? 'bg-violet-100 text-violet-900 font-medium'
                    : 'text-muted-foreground hover:bg-accent'
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

      {/* Trial/Status Banner */}
      {isTrialing && trialDaysRemaining > 0 && (
        <Card className="bg-gradient-to-r from-violet-50 to-blue-50 border-violet-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-violet-600" />
              <div>
                <p className="font-medium text-foreground">
                  You're on a {TRIAL_DAYS}-day free trial
                </p>
                <p className="text-sm text-muted-foreground">
                  {trialDaysRemaining} days remaining. Upgrade now to keep all features.
                </p>
              </div>
            </div>
            <Button onClick={() => handleUpgrade('professional')}>
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      )}

      {isPastDue && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Payment past due</p>
              <p className="text-sm text-red-700">
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
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-900">Subscription canceled</p>
              <p className="text-sm text-amber-700">
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

      <div className="grid gap-6 lg:grid-cols-3">
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
                  {isTrialing && <Badge variant="info">Trial</Badge>}
                  {isCanceled && <Badge variant="warning">Canceling</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{currentPlan.description}</p>
                {currentPlan.pricePerUser > 0 && (
                  <div className="mt-2">
                    {currentPlan.id === 'professional' ? (
                      <div>
                        <p className="text-lg font-medium">$29/month base</p>
                        <p className="text-sm text-muted-foreground">+ $1/user/month</p>
                      </div>
                    ) : (
                      <p className="text-lg font-medium">
                        {formatPrice(currentPlan.pricePerUser)}/user/month
                      </p>
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
              <div className="grid gap-4 sm:grid-cols-2">
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
            {subscription?.stripe_subscription_id ? (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={handleManageBilling}
                  disabled={loadingPlanId === 'billing-portal'}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Update Payment Method
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={handleManageBilling}
                  disabled={loadingPlanId === 'billing-portal'}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.values(PLANS).map((plan) => {
              const isCurrentPlan = currentPlan.id === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`relative p-4 border rounded-lg ${
                    plan.popular ? 'border-violet-300 bg-violet-50/50' : ''
                  } ${isCurrentPlan ? 'ring-2 ring-violet-600' : ''}`}
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
                      <p className="text-2xl font-bold">
                        {plan.id === 'enterprise' ? 'Custom' : 'Free'}
                      </p>
                    ) : plan.id === 'professional' ? (
                      <div>
                        <p className="text-2xl font-bold">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                        <p className="text-sm text-muted-foreground">+ $1/user/mo</p>
                      </div>
                    ) : (
                      <p className="text-2xl font-bold">
                        {formatPrice(plan.pricePerUser)}
                        <span className="text-sm font-normal text-muted-foreground">/user/mo</span>
                      </p>
                    )}
                  </div>
                  <ul className="space-y-2 text-sm mb-4 max-h-64 overflow-y-auto">
                    {(expandedPlans.has(plan.id) ? plan.featureList : plan.featureList.slice(0, 8)).map((feature) => (
                      <li key={feature.text} className="flex items-center gap-2">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-600 shrink-0" />
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
                          className="text-xs text-violet-600 hover:text-violet-700 font-medium pl-6"
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
