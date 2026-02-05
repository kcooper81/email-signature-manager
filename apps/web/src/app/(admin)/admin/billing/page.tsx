'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Button, Badge } from '@/components/ui';
import { 
  Search, 
  CreditCard,
  Loader2,
  ExternalLink,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  PlayCircle,
  History,
  Building2,
} from 'lucide-react';
import { PLANS } from '@/lib/billing/plans';

interface SubscriptionEntry {
  id: string;
  orgId: string;
  orgName: string;
  plan: string;
  status: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string | null;
  currentPeriodEnd: string | null;
  userCount: number;
  mrr: number;
}

interface SubscriptionEvent {
  id: string;
  organizationId: string;
  orgName: string;
  eventType: string;
  fromPlan: string | null;
  toPlan: string | null;
  fromStatus: string | null;
  toStatus: string | null;
  createdAt: string;
}

interface BillingMetrics {
  totalMrr: number;
  activeSubscriptions: number;
  trialingSubscriptions: number;
  pastDueSubscriptions: number;
  canceledThisMonth: number;
  upgradesThisMonth: number;
  downgradesThisMonth: number;
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionEntry[]>([]);
  const [events, setEvents] = useState<SubscriptionEvent[]>([]);
  const [metrics, setMetrics] = useState<BillingMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'events'>('subscriptions');

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    const supabase = createClient();

    // Get all subscriptions with org info
    const { data: subs } = await supabase
      .from('subscriptions')
      .select('id, organization_id, plan, status, stripe_customer_id, stripe_subscription_id, current_period_end')
      .order('created_at', { ascending: false });

    if (!subs) {
      setLoading(false);
      return;
    }

    // Get org names
    const orgIds = subs.map(s => s.organization_id);
    const { data: orgs } = await supabase
      .from('organizations')
      .select('id, name')
      .in('id', orgIds);

    const orgMap = new Map(orgs?.map(o => [o.id, o.name]) || []);

    // Get user counts per org
    const { data: users } = await supabase
      .from('users')
      .select('organization_id')
      .in('organization_id', orgIds);

    const userCountByOrg = new Map<string, number>();
    users?.forEach(u => {
      const count = userCountByOrg.get(u.organization_id) || 0;
      userCountByOrg.set(u.organization_id, count + 1);
    });

    // Get subscription events from this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: eventData } = await supabase
      .from('subscription_events')
      .select('*')
      .gte('created_at', startOfMonth.toISOString())
      .order('created_at', { ascending: false });

    // Get all events for display (last 50)
    const { data: recentEvents } = await supabase
      .from('subscription_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    // Map events with org names
    const allOrgIds = [...new Set([...orgIds, ...(recentEvents?.map(e => e.organization_id) || [])])];
    const { data: allOrgs } = await supabase
      .from('organizations')
      .select('id, name')
      .in('id', allOrgIds);

    const allOrgMap = new Map(allOrgs?.map(o => [o.id, o.name]) || []);

    const mappedEvents: SubscriptionEvent[] = (recentEvents || []).map(e => ({
      id: e.id,
      organizationId: e.organization_id,
      orgName: allOrgMap.get(e.organization_id) || 'Unknown',
      eventType: e.event_type,
      fromPlan: e.from_plan,
      toPlan: e.to_plan,
      fromStatus: e.from_status,
      toStatus: e.to_status,
      createdAt: e.created_at,
    }));

    setEvents(mappedEvents);

    // Count upgrades and downgrades this month
    const upgradesThisMonth = eventData?.filter(e => e.event_type === 'upgraded').length || 0;
    const downgradesThisMonth = eventData?.filter(e => e.event_type === 'downgraded').length || 0;

    // Calculate MRR and build subscription list
    let totalMrr = 0;
    let activeCount = 0;
    let trialingCount = 0;
    let pastDueCount = 0;

    const enrichedSubs: SubscriptionEntry[] = subs.map(sub => {
      const userCount = userCountByOrg.get(sub.organization_id) || 0;
      const plan = PLANS[sub.plan];
      
      let mrr = 0;
      if (sub.status === 'active' || sub.status === 'trialing') {
        if (sub.plan === 'starter') {
          mrr = (plan?.pricePerUser || 0) * userCount / 100;
        } else if (sub.plan === 'professional') {
          const baseUsers = 10;
          const extraUsers = Math.max(0, userCount - baseUsers);
          mrr = (plan?.priceMonthly || 0) + ((plan?.pricePerUser || 0) * extraUsers) / 100;
        }
      }

      totalMrr += mrr;
      if (sub.status === 'active') activeCount++;
      if (sub.status === 'trialing') trialingCount++;
      if (sub.status === 'past_due') pastDueCount++;

      return {
        id: sub.id,
        orgId: sub.organization_id,
        orgName: orgMap.get(sub.organization_id) || 'Unknown',
        plan: sub.plan,
        status: sub.status,
        stripeCustomerId: sub.stripe_customer_id,
        stripeSubscriptionId: sub.stripe_subscription_id,
        currentPeriodEnd: sub.current_period_end,
        userCount,
        mrr,
      };
    });

    setSubscriptions(enrichedSubs);
    setMetrics({
      totalMrr,
      activeSubscriptions: activeCount,
      trialingSubscriptions: trialingCount,
      pastDueSubscriptions: pastDueCount,
      canceledThisMonth: subs.filter(s => s.status === 'canceled').length,
      upgradesThisMonth,
      downgradesThisMonth,
    });
    setLoading(false);
  };

  const filteredSubs = subscriptions.filter(sub => {
    const matchesSearch = search === '' ||
      sub.orgName.toLowerCase().includes(search.toLowerCase()) ||
      sub.stripeCustomerId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case 'trialing':
        return <Badge className="bg-blue-100 text-blue-700">Trialing</Badge>;
      case 'past_due':
        return <Badge className="bg-amber-100 text-amber-700">Past Due</Badge>;
      case 'canceled':
        return <Badge className="bg-red-100 text-red-700">Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'starter':
        return <Badge className="bg-blue-100 text-blue-700">Starter</Badge>;
      case 'professional':
        return <Badge className="bg-violet-100 text-violet-700">Professional</Badge>;
      case 'enterprise':
        return <Badge className="bg-amber-100 text-amber-700">Enterprise</Badge>;
      default:
        return <Badge variant="outline">Free</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'upgraded':
        return <ArrowUpCircle className="h-5 w-5 text-green-600" />;
      case 'downgraded':
        return <ArrowDownCircle className="h-5 w-5 text-orange-600" />;
      case 'canceled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'created':
        return <PlayCircle className="h-5 w-5 text-blue-600" />;
      case 'payment_failed':
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case 'reactivated':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      default:
        return <History className="h-5 w-5 text-slate-400" />;
    }
  };

  const getEventDescription = (event: SubscriptionEvent) => {
    switch (event.eventType) {
      case 'upgraded':
        return `Upgraded from ${event.fromPlan || 'free'} to ${event.toPlan}`;
      case 'downgraded':
        return `Downgraded from ${event.fromPlan} to ${event.toPlan || 'free'}`;
      case 'canceled':
        return `Subscription canceled`;
      case 'created':
        return `Started ${event.toPlan} subscription`;
      case 'payment_failed':
        return `Payment failed`;
      case 'reactivated':
        return `Subscription reactivated`;
      default:
        return event.eventType.replace(/_/g, ' ');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subscriptions</h1>
          <p className="text-slate-500">Subscription management and revenue tracking</p>
        </div>
        <a
          href="https://dashboard.stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Open Stripe
        </a>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">${metrics?.totalMrr.toFixed(0)}</p>
                <p className="text-xs text-slate-500">MRR</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.activeSubscriptions}</p>
                <p className="text-xs text-slate-500">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <Clock className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.trialingSubscriptions}</p>
                <p className="text-xs text-slate-500">Trialing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.pastDueSubscriptions}</p>
                <p className="text-xs text-slate-500">Past Due</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <ArrowUpCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.upgradesThisMonth || 0}</p>
                <p className="text-xs text-slate-500">Upgrades</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ArrowDownCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.downgradesThisMonth || 0}</p>
                <p className="text-xs text-slate-500">Downgrades</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'subscriptions'
              ? 'border-violet-600 text-violet-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <CreditCard className="h-4 w-4 inline mr-2" />
          Subscriptions
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'events'
              ? 'border-violet-600 text-violet-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <History className="h-4 w-4 inline mr-2" />
          Activity ({events.length})
        </button>
      </div>

      {/* Subscriptions Tab Content */}
      {activeTab === 'subscriptions' && (
        <>
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by organization or Stripe customer ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['all', 'active', 'trialing', 'past_due', 'canceled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                        statusFilter === status
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {status === 'all' ? 'All' : status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscriptions Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscriptions
              </CardTitle>
              <CardDescription>
                {filteredSubs.length} subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredSubs.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  No subscriptions found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-3 font-medium text-slate-500">Organization</th>
                        <th className="pb-3 font-medium text-slate-500">Plan</th>
                        <th className="pb-3 font-medium text-slate-500">Status</th>
                        <th className="pb-3 font-medium text-slate-500">Users</th>
                        <th className="pb-3 font-medium text-slate-500">MRR</th>
                        <th className="pb-3 font-medium text-slate-500">Period End</th>
                        <th className="pb-3 font-medium text-slate-500">Stripe</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredSubs.map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-50">
                          <td className="py-3">
                            <a 
                              href={`/admin/accounts/${sub.orgId}`}
                              className="font-medium text-blue-600 hover:underline"
                            >
                              {sub.orgName}
                            </a>
                          </td>
                          <td className="py-3">
                            {getPlanBadge(sub.plan)}
                          </td>
                          <td className="py-3">
                            {getStatusBadge(sub.status)}
                          </td>
                          <td className="py-3 text-slate-600">
                            {sub.userCount}
                          </td>
                          <td className="py-3 font-medium text-slate-900">
                            ${sub.mrr.toFixed(2)}
                          </td>
                          <td className="py-3 text-slate-500">
                            {sub.currentPeriodEnd 
                              ? new Date(sub.currentPeriodEnd).toLocaleDateString()
                              : '-'}
                          </td>
                          <td className="py-3">
                            <a
                              href={`https://dashboard.stripe.com/customers/${sub.stripeCustomerId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              View
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Events Tab Content */}
      {activeTab === 'events' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Subscription Activity
            </CardTitle>
            <CardDescription>
              Recent subscription changes and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                No subscription events yet.
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-slate-50">
                    <div className="mt-0.5">
                      {getEventIcon(event.eventType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <a 
                          href={`/admin/accounts/${event.organizationId}`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {event.orgName}
                        </a>
                        <span className="text-slate-700">{getEventDescription(event)}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(event.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {event.fromPlan && (
                        <Badge variant="outline" className="text-xs">{event.fromPlan}</Badge>
                      )}
                      {event.fromPlan && event.toPlan && (
                        <span className="text-slate-400">→</span>
                      )}
                      {event.toPlan && (
                        <Badge className="bg-violet-100 text-violet-700 text-xs">{event.toPlan}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
