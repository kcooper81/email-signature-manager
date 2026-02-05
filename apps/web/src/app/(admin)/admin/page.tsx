'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, 
  Users, 
  FileSignature, 
  Rocket,
  TrendingUp,
  Loader2,
} from 'lucide-react';

interface Stats {
  totalOrganizations: number;
  totalUsers: number;
  totalTemplates: number;
  totalDeployments: number;
  planDistribution: {
    free: number;
    starter: number;
    professional: number;
    enterprise: number;
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const supabase = createClient();

    // Get counts
    const [orgsResult, usersResult, templatesResult, deploymentsResult, subsResult] = await Promise.all([
      supabase.from('organizations').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('signature_templates').select('*', { count: 'exact', head: true }),
      supabase.from('signature_deployments').select('*', { count: 'exact', head: true }),
      supabase.from('subscriptions').select('plan'),
    ]);

    // Calculate plan distribution
    const planDistribution = { free: 0, starter: 0, professional: 0, enterprise: 0 };
    subsResult.data?.forEach((sub: any) => {
      const plan = sub.plan || 'free';
      if (plan in planDistribution) {
        planDistribution[plan as keyof typeof planDistribution]++;
      }
    });

    setStats({
      totalOrganizations: orgsResult.count || 0,
      totalUsers: usersResult.count || 0,
      totalTemplates: templatesResult.count || 0,
      totalDeployments: deploymentsResult.count || 0,
      planDistribution,
    });

    setLoading(false);
  };

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
          Platform overview and statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalOrganizations || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <FileSignature className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalTemplates || 0}</div>
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
      </div>

      {/* Plan Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
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
              <div className="text-sm text-muted-foreground">Starter</div>
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
    </div>
  );
}
