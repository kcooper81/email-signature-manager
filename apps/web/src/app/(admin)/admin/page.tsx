'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { 
  Building2, 
  Users, 
  CreditCard, 
  TrendingUp,
  FileSignature,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { PLANS } from '@/lib/billing/plans';

interface DashboardMetrics {
  totalOrganizations: number;
  totalUsers: number;
  totalTemplates: number;
  totalDeployments: number;
  planDistribution: Record<string, number>;
  signupsLast30Days: number;
  signupsLast7Days: number;
  mrr: number;
  mrrGrowth: number;
  recentOrgs: Array<{
    id: string;
    name: string;
    plan: string;
    userCount: number;
    createdAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    const supabase = createClient();
    
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Get all organizations with their subscriptions
    const { data: orgs, count: orgCount } = await supabase
      .from('organizations')
      .select('id, name, created_at', { count: 'exact' });

    // Get subscriptions for plan distribution
    const { data: subscriptions } = await supabase
      .from('subscriptions')
      .select('organization_id, plan, status');

    // Get user counts
    const { count: userCount } = await supabase
      .from('users')
      .select('id', { count: 'exact' });

    // Get template counts
    const { count: templateCount } = await supabase
      .from('signature_templates')
      .select('id', { count: 'exact' });

    // Get deployment counts
    const { count: deploymentCount } = await supabase
      .from('signature_deployments')
      .select('id', { count: 'exact' });

    // Calculate signups in last 30 days
    const signupsLast30Days = orgs?.filter(o => 
      new Date(o.created_at) >= thirtyDaysAgo
    ).length || 0;

    // Calculate signups in last 7 days
    const signupsLast7Days = orgs?.filter(o => 
      new Date(o.created_at) >= sevenDaysAgo
    ).length || 0;

    // Calculate plan distribution
    const planDistribution: Record<string, number> = {
      free: 0,
      starter: 0,
      professional: 0,
      enterprise: 0,
    };

    const subsByOrg = new Map(subscriptions?.map(s => [s.organization_id, s]) || []);
    
    orgs?.forEach(org => {
      const sub = subsByOrg.get(org.id);
      const plan = sub?.plan || 'free';
      planDistribution[plan] = (planDistribution[plan] || 0) + 1;
    });

    // Calculate MRR (Monthly Recurring Revenue)
    // Get user counts per org for accurate MRR calculation
    const { data: usersByOrg } = await supabase
      .from('users')
      .select('organization_id');

    const userCountByOrg = new Map<string, number>();
    usersByOrg?.forEach(u => {
      const count = userCountByOrg.get(u.organization_id) || 0;
      userCountByOrg.set(u.organization_id, count + 1);
    });

    let mrr = 0;
    subscriptions?.forEach(sub => {
      if (sub.status === 'active' || sub.status === 'trialing') {
        const plan = PLANS[sub.plan];
        if (plan) {
          const userCount = userCountByOrg.get(sub.organization_id) || 0;
          if (sub.plan === 'starter') {
            mrr += (plan.pricePerUser * userCount) / 100;
          } else if (sub.plan === 'professional') {
            const baseUsers = 10;
            const extraUsers = Math.max(0, userCount - baseUsers);
            mrr += plan.priceMonthly + (plan.pricePerUser * extraUsers) / 100;
          }
        }
      }
    });

    // Calculate MRR growth (vs previous 30 days - simplified)
    const previousPeriodOrgs = orgs?.filter(o => 
      new Date(o.created_at) >= sixtyDaysAgo && new Date(o.created_at) < thirtyDaysAgo
    ).length || 0;
    
    const mrrGrowth = previousPeriodOrgs > 0 
      ? Math.round(((signupsLast30Days - previousPeriodOrgs) / previousPeriodOrgs) * 100)
      : signupsLast30Days > 0 ? 100 : 0;

    // Get recent organizations with user counts
    const recentOrgs = (orgs || [])
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10)
      .map(org => ({
        id: org.id,
        name: org.name,
        plan: subsByOrg.get(org.id)?.plan || 'free',
        userCount: userCountByOrg.get(org.id) || 0,
        createdAt: org.created_at,
      }));

    setMetrics({
      totalOrganizations: orgCount || 0,
      totalUsers: userCount || 0,
      totalTemplates: templateCount || 0,
      totalDeployments: deploymentCount || 0,
      planDistribution,
      signupsLast30Days,
      signupsLast7Days,
      mrr,
      mrrGrowth,
      recentOrgs,
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  const planColors: Record<string, string> = {
    free: 'bg-slate-200',
    starter: 'bg-blue-500',
    professional: 'bg-violet-500',
    enterprise: 'bg-amber-500',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500">Platform-wide metrics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.totalOrganizations}</p>
                <p className="text-xs text-slate-500">Total Organizations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.totalUsers}</p>
                <p className="text-xs text-slate-500">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-violet-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">${metrics?.mrr.toFixed(0)}</p>
                {metrics?.mrrGrowth !== 0 && (
                  <span className={`text-xs flex items-center ${metrics?.mrrGrowth! > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metrics?.mrrGrowth! > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(metrics?.mrrGrowth || 0)}%
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">MRR</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.signupsLast30Days}</p>
                <p className="text-xs text-slate-500">New Orgs (30d)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <FileSignature className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.totalTemplates}</p>
                <p className="text-xs text-slate-500">Templates Created</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.totalDeployments}</p>
                <p className="text-xs text-slate-500">Total Deployments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Building2 className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.signupsLast7Days}</p>
                <p className="text-xs text-slate-500">New Orgs (7d)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Breakdown of organizations by plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(metrics?.planDistribution || {}).map(([plan, count]) => {
                const total = metrics?.totalOrganizations || 1;
                const percentage = Math.round((count / total) * 100);
                return (
                  <div key={plan}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium capitalize">{plan}</span>
                      <span className="text-slate-500">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${planColors[plan]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Signups */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
            <CardDescription>Latest organizations to join</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics?.recentOrgs.map((org) => (
                <a
                  key={org.id}
                  href={`/admin/accounts/${org.id}`}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{org.name}</p>
                    <p className="text-xs text-slate-500">
                      {org.userCount} users • {new Date(org.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                    org.plan === 'free' ? 'bg-slate-100 text-slate-700' :
                    org.plan === 'starter' ? 'bg-blue-100 text-blue-700' :
                    org.plan === 'professional' ? 'bg-violet-100 text-violet-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {org.plan}
                  </span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
