'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Building2,
  Users,
  FileSignature,
  Rocket,
  TrendingUp,
  Loader2,
  DollarSign,
  AlertTriangle,
  Ticket,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  CreditCard,
  Activity,
  MousePointerClick,
} from 'lucide-react';
import { PLANS } from '@/lib/billing/plans';

interface DashboardStats {
  totalOrganizations: number;
  totalUsers: number;
  totalTemplates: number;
  totalDeployments: number;
  newOrgsThisWeek: number;
  newOrgsLastWeek: number;
  newOrgsThisMonth: number;
  totalClicks: number;
  totalImpressions: number;
  mrr: number;
  planDistribution: {
    free: number;
    starter: number;
    professional: number;
    enterprise: number;
  };
}

interface AlertItem {
  type: 'tickets' | 'errors' | 'partners' | 'pastdue';
  count: number;
  label: string;
  href: string;
  color: string;
  icon: React.ElementType;
}

interface RecentActivityItem {
  id: string;
  action: string;
  resourceType: string;
  orgName: string;
  orgId: string;
  userEmail: string;
  createdAt: string;
}

interface RecentSignup {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  plan: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>([]);
  const [recentSignups, setRecentSignups] = useState<RecentSignup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const supabase = createClient();

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Parallel data fetching
    const [
      orgsResult,
      usersResult,
      templatesResult,
      deploymentsResult,
      subsResult,
      orgsThisWeekResult,
      orgsLastWeekResult,
      orgsThisMonthResult,
      clicksResult,
      impressionsResult,
      newTicketsResult,
      unresolvedErrorsResult,
      pendingPartnersResult,
      recentActivityResult,
      recentOrgsResult,
    ] = await Promise.all([
      supabase.from('organizations').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('signature_templates').select('*', { count: 'exact', head: true }),
      supabase.from('signature_deployments').select('*', { count: 'exact', head: true }),
      supabase.from('subscriptions').select('plan, status, organization_id'),
      supabase.from('organizations').select('*', { count: 'exact', head: true }).gte('created_at', startOfWeek.toISOString()),
      supabase.from('organizations').select('*', { count: 'exact', head: true }).gte('created_at', startOfLastWeek.toISOString()).lt('created_at', startOfWeek.toISOString()),
      supabase.from('organizations').select('*', { count: 'exact', head: true }).gte('created_at', startOfMonth.toISOString()),
      supabase.from('signature_clicks').select('*', { count: 'exact', head: true }),
      supabase.from('signature_impressions').select('*', { count: 'exact', head: true }),
      supabase.from('feedback').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('error_logs').select('*', { count: 'exact', head: true }).eq('resolved', false),
      supabase.from('partner_applications').select('*', { count: 'exact', head: true }).in('status', ['pending', 'under_review']),
      supabase.from('audit_logs').select('id, action, resource_type, organization_id, user_id, created_at').order('created_at', { ascending: false }).limit(10),
      supabase.from('organizations').select('id, name, slug, created_at').order('created_at', { ascending: false }).limit(5),
    ]);

    // Calculate plan distribution and MRR
    const planDistribution = { free: 0, starter: 0, professional: 0, enterprise: 0 };
    let pastDueCount = 0;

    // Get user counts for MRR calculation
    const orgIds = subsResult.data?.map(s => s.organization_id) || [];
    const { data: usersByOrg } = await supabase
      .from('users')
      .select('organization_id')
      .in('organization_id', orgIds);

    const userCountByOrg = new Map<string, number>();
    usersByOrg?.forEach(u => {
      userCountByOrg.set(u.organization_id, (userCountByOrg.get(u.organization_id) || 0) + 1);
    });

    let totalMrr = 0;
    subsResult.data?.forEach((sub: any) => {
      const plan = sub.plan || 'free';
      if (plan in planDistribution) {
        planDistribution[plan as keyof typeof planDistribution]++;
      }
      if (sub.status === 'past_due') pastDueCount++;

      if ((sub.status === 'active' || sub.status === 'trialing') &&
          (plan === 'professional' || plan === 'starter')) {
        const userCount = userCountByOrg.get(sub.organization_id) || 0;
        const billableUsers = Math.max(10, userCount);
        const planData = PLANS[plan];
        totalMrr += ((planData?.pricePerUser || 0) * billableUsers) / 100;
      }
    });

    // Get subscription plans for recent signups
    const recentOrgIds = recentOrgsResult.data?.map(o => o.id) || [];
    const { data: recentSubs } = await supabase
      .from('subscriptions')
      .select('organization_id, plan')
      .in('organization_id', recentOrgIds);

    const recentSubMap = new Map(recentSubs?.map(s => [s.organization_id, s.plan]) || []);

    // Enrich recent activity
    const activityOrgIds = [...new Set(recentActivityResult.data?.map(l => l.organization_id) || [])];
    const activityUserIds = [...new Set(recentActivityResult.data?.map(l => l.user_id) || [])];

    const [{ data: activityOrgs }, { data: activityUsers }] = await Promise.all([
      supabase.from('organizations').select('id, name').in('id', activityOrgIds),
      supabase.from('users').select('id, email').in('id', activityUserIds),
    ]);

    const orgNameMap = new Map(activityOrgs?.map(o => [o.id, o.name]) || []);
    const userEmailMap = new Map(activityUsers?.map(u => [u.id, u.email]) || []);

    setStats({
      totalOrganizations: orgsResult.count || 0,
      totalUsers: usersResult.count || 0,
      totalTemplates: templatesResult.count || 0,
      totalDeployments: deploymentsResult.count || 0,
      newOrgsThisWeek: orgsThisWeekResult.count || 0,
      newOrgsLastWeek: orgsLastWeekResult.count || 0,
      newOrgsThisMonth: orgsThisMonthResult.count || 0,
      totalClicks: clicksResult.count || 0,
      totalImpressions: impressionsResult.count || 0,
      mrr: totalMrr,
      planDistribution,
    });

    // Build alerts
    const alertItems: AlertItem[] = [];
    const newTicketCount = newTicketsResult.count || 0;
    const unresolvedErrorCount = unresolvedErrorsResult.count || 0;
    const pendingPartnerCount = pendingPartnersResult.count || 0;

    if (newTicketCount > 0) {
      alertItems.push({
        type: 'tickets', count: newTicketCount, label: 'new support tickets',
        href: '/admin/tickets', color: 'bg-amber-50 border-amber-200 text-amber-800', icon: Ticket,
      });
    }
    if (unresolvedErrorCount > 0) {
      alertItems.push({
        type: 'errors', count: unresolvedErrorCount, label: 'unresolved errors',
        href: '/admin/errors', color: 'bg-red-50 border-red-200 text-red-800', icon: AlertTriangle,
      });
    }
    if (pendingPartnerCount > 0) {
      alertItems.push({
        type: 'partners', count: pendingPartnerCount, label: 'pending partner applications',
        href: '/admin/partner-applications', color: 'bg-blue-50 border-blue-200 text-blue-800', icon: UserPlus,
      });
    }
    if (pastDueCount > 0) {
      alertItems.push({
        type: 'pastdue', count: pastDueCount, label: 'past-due subscriptions',
        href: '/admin/billing', color: 'bg-orange-50 border-orange-200 text-orange-800', icon: CreditCard,
      });
    }
    setAlerts(alertItems);

    setRecentActivity(
      (recentActivityResult.data || []).map(log => ({
        id: log.id,
        action: log.action,
        resourceType: log.resource_type,
        orgName: orgNameMap.get(log.organization_id) || 'Unknown',
        orgId: log.organization_id,
        userEmail: userEmailMap.get(log.user_id) || 'Unknown',
        createdAt: log.created_at,
      }))
    );

    setRecentSignups(
      (recentOrgsResult.data || []).map(org => ({
        id: org.id,
        name: org.name,
        slug: org.slug,
        createdAt: org.created_at,
        plan: recentSubMap.get(org.id) || 'free',
      }))
    );

    setLoading(false);
  };

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getActionColor = (action: string) => {
    if (action.includes('create') || action.includes('add')) return 'bg-green-100 text-green-700';
    if (action.includes('delete') || action.includes('remove')) return 'bg-red-100 text-red-700';
    if (action.includes('update') || action.includes('edit')) return 'bg-blue-100 text-blue-700';
    if (action.includes('deploy')) return 'bg-violet-100 text-violet-700';
    return 'bg-slate-100 text-slate-700';
  };

  const weekOverWeekChange = stats
    ? stats.newOrgsLastWeek > 0
      ? Math.round(((stats.newOrgsThisWeek - stats.newOrgsLastWeek) / stats.newOrgsLastWeek) * 100)
      : stats.newOrgsThisWeek > 0 ? 100 : 0
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Platform overview and key metrics
        </p>
      </div>

      {/* Attention Needed Alerts */}
      {alerts.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {alerts.map((alert) => (
            <Link key={alert.type} href={alert.href}>
              <div className={`rounded-lg border p-4 ${alert.color} hover:opacity-80 transition-opacity cursor-pointer`}>
                <div className="flex items-center gap-3">
                  <alert.icon className="h-5 w-5" />
                  <div>
                    <p className="text-2xl font-bold">{alert.count}</p>
                    <p className="text-sm">{alert.label}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.mrr.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              ${((stats?.mrr || 0) * 12).toFixed(0)} ARR
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalOrganizations || 0}</div>
            <div className="flex items-center gap-1 mt-1">
              {weekOverWeekChange >= 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-600" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-600" />
              )}
              <p className={`text-xs ${weekOverWeekChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats?.newOrgsThisWeek} this week ({weekOverWeekChange >= 0 ? '+' : ''}{weekOverWeekChange}%)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.totalOrganizations ? (stats.totalUsers / stats.totalOrganizations).toFixed(1) : '0'} avg per org
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Signature Engagement</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats?.totalClicks || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {(stats?.totalImpressions || 0).toLocaleString()} impressions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <FileSignature className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalTemplates || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.totalOrganizations ? (stats.totalTemplates / stats.totalOrganizations).toFixed(1) : '0'} avg per org
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployments</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalDeployments || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.newOrgsThisMonth || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">organizations signed up</p>
          </CardContent>
        </Card>
      </div>

      {/* Plan Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Plan Distribution
          </CardTitle>
          <CardDescription>Breakdown of subscriptions by plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-slate-100 rounded-lg">
              <div className="text-2xl font-bold">{stats?.planDistribution.free || 0}</div>
              <div className="text-sm text-muted-foreground">Free</div>
            </div>
            <div className="text-center p-4 bg-blue-100 rounded-lg">
              <div className="text-2xl font-bold">{stats?.planDistribution.starter || 0}</div>
              <div className="text-sm text-muted-foreground">Starter (Legacy)</div>
            </div>
            <div className="text-center p-4 bg-violet-100 rounded-lg">
              <div className="text-2xl font-bold">{stats?.planDistribution.professional || 0}</div>
              <div className="text-sm text-muted-foreground">Professional</div>
            </div>
            <div className="text-center p-4 bg-amber-100 rounded-lg">
              <div className="text-2xl font-bold">{stats?.planDistribution.enterprise || 0}</div>
              <div className="text-sm text-muted-foreground">Enterprise</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <Link href="/admin/activity" className="text-sm text-blue-600 hover:underline">
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No recent activity</p>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="mt-1">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getActionColor(item.action)}`}>
                        {item.action.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 truncate">
                        <Link href={`/admin/accounts/${item.orgId}`} className="font-medium text-blue-600 hover:underline">
                          {item.orgName}
                        </Link>
                        {' '}<span className="text-slate-500">•</span>{' '}
                        <span className="text-slate-500">{item.resourceType}</span>
                      </p>
                      <p className="text-xs text-slate-400">{item.userEmail} • {getTimeAgo(item.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Signups */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Recent Signups
              </CardTitle>
              <Link href="/admin/accounts" className="text-sm text-blue-600 hover:underline">
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentSignups.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No recent signups</p>
            ) : (
              <div className="space-y-3">
                {recentSignups.map((org) => (
                  <Link key={org.id} href={`/admin/accounts/${org.id}`} className="flex items-center justify-between hover:bg-slate-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{org.name}</p>
                      <p className="text-xs text-slate-500">{org.slug}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge variant="outline" className="capitalize text-xs">
                        {org.plan}
                      </Badge>
                      <span className="text-xs text-slate-400">{getTimeAgo(org.createdAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
