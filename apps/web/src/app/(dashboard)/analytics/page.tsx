'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  BarChart3, 
  Users, 
  FileSignature, 
  Rocket,
  TrendingUp,
  TrendingDown,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
} from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  totalTemplates: number;
  totalDeployments: number;
  successfulDeployments: number;
  failedDeployments: number;
  recentDeployments: {
    id: string;
    status: string;
    total_users: number;
    successful_count: number;
    failed_count: number;
    created_at: string;
    template: { name: string } | null;
  }[];
  deploymentsByDay: { date: string; count: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    const supabase = createClient();
    
    // Get total users
    const { count: userCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Get total templates
    const { count: templateCount } = await supabase
      .from('signature_templates')
      .select('*', { count: 'exact', head: true });

    // Get deployments
    const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);

    const { data: deployments } = await supabase
      .from('signature_deployments')
      .select('id, status, total_users, successful_count, failed_count, created_at, template:signature_templates(name)')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    const successfulDeployments = deployments?.filter(d => d.status === 'completed').length || 0;
    const failedDeployments = deployments?.filter(d => d.status === 'failed').length || 0;

    // Group deployments by day
    const deploymentsByDay: { date: string; count: number }[] = [];
    const dayMap = new Map<string, number>();
    
    deployments?.forEach(d => {
      const date = new Date(d.created_at).toISOString().split('T')[0];
      dayMap.set(date, (dayMap.get(date) || 0) + 1);
    });

    // Fill in missing days
    for (let i = daysAgo; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      deploymentsByDay.push({
        date: dateStr,
        count: dayMap.get(dateStr) || 0,
      });
    }

    setData({
      totalUsers: userCount || 0,
      totalTemplates: templateCount || 0,
      totalDeployments: deployments?.length || 0,
      successfulDeployments,
      failedDeployments,
      recentDeployments: (deployments || []).slice(0, 10) as any,
      deploymentsByDay,
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

  const successRate = data?.totalDeployments 
    ? Math.round((data.successfulDeployments / data.totalDeployments) * 100) 
    : 0;

  const maxDeployments = Math.max(...(data?.deploymentsByDay.map(d => d.count) || [1]));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your signature deployment metrics
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                timeRange === range
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              Synced from Google Workspace
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <FileSignature className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalTemplates || 0}</div>
            <p className="text-xs text-muted-foreground">
              Active signature templates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployments</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalDeployments || 0}</div>
            <p className="text-xs text-muted-foreground">
              In the last {timeRange === '7d' ? '7 days' : timeRange === '30d' ? '30 days' : '90 days'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            {successRate >= 90 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground">
              {data?.successfulDeployments} successful, {data?.failedDeployments} failed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Deployment Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Deployment Activity</CardTitle>
          <CardDescription>
            Number of deployments over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-end gap-1">
            {data?.deploymentsByDay.slice(-30).map((day, i) => (
              <div
                key={day.date}
                className="flex-1 bg-violet-500 rounded-t hover:bg-violet-600 transition-colors relative group"
                style={{
                  height: `${Math.max((day.count / maxDeployments) * 100, 4)}%`,
                }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {day.count} deployment{day.count !== 1 ? 's' : ''}
                  <br />
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{data?.deploymentsByDay[0]?.date ? new Date(data.deploymentsByDay[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Deployments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
          <CardDescription>
            Your latest signature deployments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data?.recentDeployments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No deployments yet. Deploy your first signature!
            </p>
          ) : (
            <div className="space-y-4">
              {data?.recentDeployments.map((deployment) => (
                <div
                  key={deployment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    {deployment.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : deployment.status === 'failed' ? (
                      <XCircle className="h-5 w-5 text-red-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-amber-600" />
                    )}
                    <div>
                      <p className="font-medium">
                        {deployment.template?.name || 'Unknown Template'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {deployment.successful_count}/{deployment.total_users} users successful
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium capitalize">{deployment.status}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(deployment.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
