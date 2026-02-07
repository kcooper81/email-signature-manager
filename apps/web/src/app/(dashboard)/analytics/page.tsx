'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { PageHeader, StatCard } from '@/components/dashboard';
import { 
  Users, 
  FileSignature, 
  Rocket,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Lock,
  Sparkles,
  Target,
  BarChart3,
  PieChart,
  Zap,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Shield,
  Lightbulb,
  RefreshCw,
  Monitor,
  UserCheck,
  Megaphone,
  MousePointerClick,
  Eye,
  Image,
  Link2,
  Calendar,
  UserPlus,
  Activity,
  Server,
  AlertCircle,
} from 'lucide-react';
import { useSubscription, usePayGatesBypass } from '@/hooks/use-subscription';
import Link from 'next/link';

interface TemplatePerformance {
  id: string;
  name: string;
  deploymentCount: number;
  usersDeployed: number;
  successRate: number;
  lastDeployed: string | null;
}

interface DepartmentStats {
  department: string;
  totalUsers: number;
  deployedUsers: number;
  adoptionRate: number;
}

interface AnalyticsData {
  // Core metrics
  totalUsers: number;
  totalTemplates: number;
  totalDeployments: number;
  successfulDeployments: number;
  failedDeployments: number;
  
  // Adoption metrics
  usersWithSignatures: number;
  adoptionRate: number;
  
  // Comparison metrics (vs previous period)
  deploymentsChange: number;
  adoptionChange: number;
  
  // Template performance
  templatePerformance: TemplatePerformance[];
  topTemplate: TemplatePerformance | null;
  
  // Department breakdown
  departmentStats: DepartmentStats[];
  
  // Recent activity
  recentDeployments: {
    id: string;
    status: string;
    total_users: number;
    successful_count: number;
    failed_count: number;
    created_at: string;
    template: { name: string } | null;
  }[];
  
  // Trends
  deploymentsByDay: { date: string; count: number; users: number }[];
  
  // Health indicators
  healthScore: number;
  complianceIssues: number;
  pendingDeployments: number;
  
  // IT-focused metrics
  syncStatus: {
    google: { connected: boolean; lastSync: string | null; userCount: number };
    microsoft: { connected: boolean; lastSync: string | null; userCount: number };
  };
  errorRate: number;
  avgDeploymentTime: number; // in seconds
  failedDeploymentReasons: { reason: string; count: number }[];
  
  // HR-focused metrics
  newUsersThisPeriod: number;
  usersWithoutSignatures: number;
  departmentCoverage: number; // % of departments with >50% adoption
  onboardingPending: number; // new users without signatures
  
  // Marketing-focused metrics
  bannersDeployed: number;
  ctaButtonsDeployed: number;
  socialLinksDeployed: number;
  templatesWithBanners: number;
  avgSocialLinksPerSignature: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const { plan } = useSubscription();
  const devBypass = usePayGatesBypass();
  
  // Check analytics access: dev bypass OR plan has analytics feature
  const hasAnalyticsAccess = devBypass || plan.features.analytics;

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    const supabase = createClient();
    const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    const previousStartDate = new Date(startDate);
    previousStartDate.setDate(previousStartDate.getDate() - daysAgo);

    // Get current user's organization
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) {
      setLoading(false);
      return;
    }

    const organizationId = currentUser.organization_id;

    // Get all users with department info - FILTERED BY ORGANIZATION
    const { data: users, count: userCount } = await supabase
      .from('users')
      .select('id, email, department, source, created_at', { count: 'exact' })
      .eq('organization_id', organizationId);

    // Get all templates - FILTERED BY ORGANIZATION
    const { data: templates, count: templateCount } = await supabase
      .from('signature_templates')
      .select('id, name, created_at')
      .eq('organization_id', organizationId);

    // Get deployments for current period - FILTERED BY ORGANIZATION
    const { data: deployments } = await supabase
      .from('signature_deployments')
      .select('id, status, total_users, successful_count, failed_count, created_at, template_id, target_emails, template:signature_templates(id, name)')
      .eq('organization_id', organizationId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    // Get deployments for previous period - FILTERED BY ORGANIZATION
    const { data: previousDeployments } = await supabase
      .from('signature_deployments')
      .select('id, status, successful_count, target_emails')
      .eq('organization_id', organizationId)
      .gte('created_at', previousStartDate.toISOString())
      .lt('created_at', startDate.toISOString());

    // Calculate core metrics
    const successfulDeployments = deployments?.filter(d => d.status === 'completed').length || 0;
    const failedDeployments = deployments?.filter(d => d.status === 'failed').length || 0;
    const pendingDeployments = deployments?.filter(d => d.status === 'pending' || d.status === 'running').length || 0;

    // Calculate adoption metrics using unique emails from successful deployments
    const uniqueDeployedEmails = new Set<string>();
    let estimatedUsersWithoutEmails = 0;
    
    deployments?.forEach(d => {
      if (d.status === 'completed') {
        if (d.target_emails && (d.target_emails as string[]).length > 0) {
          (d.target_emails as string[]).forEach(email => uniqueDeployedEmails.add(email.toLowerCase()));
        } else {
          // Fallback for older deployments without target_emails - use successful_count as estimate
          estimatedUsersWithoutEmails += d.successful_count || 0;
        }
      }
    });
    
    // Combine tracked emails with estimated count, capped at total users
    const usersWithSignatures = Math.min(
      uniqueDeployedEmails.size + estimatedUsersWithoutEmails,
      userCount || 0
    );
    const adoptionRate = userCount ? Math.round((usersWithSignatures / userCount) * 100) : 0;

    // Calculate previous period adoption for comparison
    const previousUniqueEmails = new Set<string>();
    let prevEstimatedUsers = 0;
    
    previousDeployments?.forEach(d => {
      if (d.status === 'completed') {
        if (d.target_emails && (d.target_emails as string[]).length > 0) {
          (d.target_emails as string[]).forEach(email => previousUniqueEmails.add(email.toLowerCase()));
        } else {
          prevEstimatedUsers += d.successful_count || 0;
        }
      }
    });
    const previousUsersWithSignatures = Math.min(
      previousUniqueEmails.size + prevEstimatedUsers,
      userCount || 0
    );
    const previousAdoptionRate = userCount ? Math.round((previousUsersWithSignatures / userCount) * 100) : 0;

    // Calculate comparison metrics
    const currentDeploymentCount = deployments?.length || 0;
    const previousDeploymentCount = previousDeployments?.length || 0;
    const deploymentsChange = previousDeploymentCount > 0 
      ? Math.round(((currentDeploymentCount - previousDeploymentCount) / previousDeploymentCount) * 100)
      : currentDeploymentCount > 0 ? 100 : 0;
    const adoptionChange = adoptionRate - previousAdoptionRate;

    // Calculate template performance
    const templateMap = new Map<string, TemplatePerformance>();
    templates?.forEach(t => {
      templateMap.set(t.id, {
        id: t.id,
        name: t.name,
        deploymentCount: 0,
        usersDeployed: 0,
        successRate: 0,
        lastDeployed: null,
      });
    });

    deployments?.forEach(d => {
      const templateId = d.template_id;
      if (templateId && templateMap.has(templateId)) {
        const perf = templateMap.get(templateId)!;
        perf.deploymentCount++;
        perf.usersDeployed += d.successful_count || 0;
        if (!perf.lastDeployed || new Date(d.created_at) > new Date(perf.lastDeployed)) {
          perf.lastDeployed = d.created_at;
        }
      }
    });

    // Calculate success rates per template
    templateMap.forEach((perf, id) => {
      const templateDeployments = deployments?.filter(d => d.template_id === id) || [];
      const successful = templateDeployments.filter(d => d.status === 'completed').length;
      perf.successRate = templateDeployments.length > 0 
        ? Math.round((successful / templateDeployments.length) * 100) 
        : 0;
    });

    const templatePerformance = Array.from(templateMap.values())
      .sort((a, b) => b.usersDeployed - a.usersDeployed);
    const topTemplate = templatePerformance[0] || null;

    // Calculate department stats using actual deployed emails matched to user data
    const deptMap = new Map<string, { total: number; deployed: number }>();
    const userEmailToDept = new Map<string, string>();
    
    users?.forEach(u => {
      const dept = u.department || 'Unassigned';
      if (!deptMap.has(dept)) {
        deptMap.set(dept, { total: 0, deployed: 0 });
      }
      deptMap.get(dept)!.total++;
      userEmailToDept.set(u.email.toLowerCase(), dept);
    });

    // Count deployed users per department based on actual target_emails
    uniqueDeployedEmails.forEach(email => {
      const dept = userEmailToDept.get(email) || 'Unassigned';
      if (deptMap.has(dept)) {
        deptMap.get(dept)!.deployed++;
      }
    });

    const departmentStats: DepartmentStats[] = Array.from(deptMap.entries())
      .map(([department, stats]) => ({
        department,
        totalUsers: stats.total,
        deployedUsers: stats.deployed,
        adoptionRate: stats.total > 0 ? Math.round((stats.deployed / stats.total) * 100) : 0,
      }))
      .sort((a, b) => b.adoptionRate - a.adoptionRate);

    // Group deployments by day with user counts
    const deploymentsByDay: { date: string; count: number; users: number }[] = [];
    const dayMap = new Map<string, { count: number; users: number }>();
    
    deployments?.forEach(d => {
      const date = new Date(d.created_at).toISOString().split('T')[0];
      const existing = dayMap.get(date) || { count: 0, users: 0 };
      dayMap.set(date, {
        count: existing.count + 1,
        users: existing.users + (d.successful_count || 0),
      });
    });

    for (let i = daysAgo; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayData = dayMap.get(dateStr) || { count: 0, users: 0 };
      deploymentsByDay.push({
        date: dateStr,
        count: dayData.count,
        users: dayData.users,
      });
    }

    // Calculate health score
    const successRate = deployments?.length 
      ? Math.round((successfulDeployments / deployments.length) * 100) 
      : 100;
    const healthScore = Math.round((adoptionRate * 0.4) + (successRate * 0.4) + ((100 - Math.min(failedDeployments * 10, 100)) * 0.2));
    const complianceIssues = failedDeployments + (userCount ? userCount - usersWithSignatures : 0);

    // IT-focused metrics
    const { data: googleIntegration } = await supabase
      .from('integrations')
      .select('last_sync_at, status')
      .eq('organization_id', organizationId)
      .eq('provider', 'google')
      .single();
    
    const { data: microsoftIntegration } = await supabase
      .from('integrations')
      .select('last_sync_at, status')
      .eq('organization_id', organizationId)
      .eq('provider', 'microsoft')
      .single();

    const googleUsers = users?.filter(u => u.source === 'google').length || 0;
    const microsoftUsers = users?.filter(u => u.source === 'microsoft').length || 0;

    const syncStatus = {
      google: {
        connected: googleIntegration?.status === 'active',
        lastSync: googleIntegration?.last_sync_at || null,
        userCount: googleUsers,
      },
      microsoft: {
        connected: microsoftIntegration?.status === 'active',
        lastSync: microsoftIntegration?.last_sync_at || null,
        userCount: microsoftUsers,
      },
    };

    const errorRate = deployments?.length 
      ? Math.round((failedDeployments / deployments.length) * 100) 
      : 0;

    // Calculate average deployment time (mock - would need actual timing data)
    const avgDeploymentTime = 45; // seconds - placeholder

    // Group failed deployments by reason
    const failedDeploymentReasons: { reason: string; count: number }[] = [];
    const reasonMap = new Map<string, number>();
    deployments?.filter(d => d.status === 'failed').forEach(() => {
      // In a real implementation, we'd have error_message field
      const reason = 'API Error';
      reasonMap.set(reason, (reasonMap.get(reason) || 0) + 1);
    });
    reasonMap.forEach((count, reason) => {
      failedDeploymentReasons.push({ reason, count });
    });

    // HR-focused metrics
    const newUsersThisPeriod = users?.filter(u => 
      new Date(u.created_at) >= startDate
    ).length || 0;

    const usersWithoutSignatures = (userCount || 0) - usersWithSignatures;

    // Calculate department coverage (% of departments with >50% adoption)
    const deptsWith50PlusAdoption = departmentStats.filter(d => d.adoptionRate >= 50).length;
    const departmentCoverage = departmentStats.length > 0 
      ? Math.round((deptsWith50PlusAdoption / departmentStats.length) * 100)
      : 0;

    // New users without signatures (onboarding pending)
    const newUserEmails = new Set(
      users?.filter(u => new Date(u.created_at) >= startDate).map(u => u.email.toLowerCase()) || []
    );
    const onboardingPending = Array.from(newUserEmails).filter(
      email => !uniqueDeployedEmails.has(email)
    ).length;

    // Marketing-focused metrics - analyze template blocks
    const { data: allTemplates } = await supabase
      .from('signature_templates')
      .select('id, blocks')
      .eq('organization_id', organizationId);

    let bannersDeployed = 0;
    let ctaButtonsDeployed = 0;
    let socialLinksDeployed = 0;
    let templatesWithBanners = 0;
    let totalSocialLinks = 0;
    let templatesWithSocial = 0;

    allTemplates?.forEach(template => {
      const blocks = template.blocks as any[] || [];
      let hasBanner = false;
      let hasSocial = false;
      
      blocks.forEach(block => {
        if (block.type === 'banner' || (block.type === 'image' && block.content?.width > 400)) {
          bannersDeployed++;
          hasBanner = true;
        }
        if (block.type === 'button') {
          ctaButtonsDeployed++;
        }
        if (block.type === 'social') {
          const platforms = block.content?.platforms || [];
          socialLinksDeployed += platforms.length;
          totalSocialLinks += platforms.length;
          hasSocial = true;
        }
      });
      
      if (hasBanner) templatesWithBanners++;
      if (hasSocial) templatesWithSocial++;
    });

    const avgSocialLinksPerSignature = templatesWithSocial > 0 
      ? Math.round((totalSocialLinks / templatesWithSocial) * 10) / 10 
      : 0;

    setData({
      totalUsers: userCount || 0,
      totalTemplates: templateCount || 0,
      totalDeployments: deployments?.length || 0,
      successfulDeployments,
      failedDeployments,
      usersWithSignatures,
      adoptionRate,
      deploymentsChange,
      adoptionChange,
      templatePerformance,
      topTemplate,
      departmentStats,
      recentDeployments: (deployments || []).slice(0, 5) as any,
      deploymentsByDay,
      healthScore,
      complianceIssues,
      pendingDeployments,
      // IT metrics
      syncStatus,
      errorRate,
      avgDeploymentTime,
      failedDeploymentReasons,
      // HR metrics
      newUsersThisPeriod,
      usersWithoutSignatures,
      departmentCoverage,
      onboardingPending,
      // Marketing metrics
      bannersDeployed,
      ctaButtonsDeployed,
      socialLinksDeployed,
      templatesWithBanners,
      avgSocialLinksPerSignature,
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

  // Show upgrade prompt if user doesn't have analytics access
  if (!hasAnalyticsAccess) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Analytics"
          description="Track your signature deployment metrics"
        />
        <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-white">
          <CardContent className="py-12">
            <div className="text-center max-w-md mx-auto">
              <div className="mx-auto w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unlock Analytics</h3>
              <p className="text-muted-foreground mb-6">
                Get detailed insights into your signature deployments, track success rates, 
                and monitor team adoption with our analytics dashboard.
              </p>
              <Link href="/settings/billing">
                <Button size="lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Starter
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-3">
                Available on Starter plan and above
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const successRate = data?.totalDeployments 
    ? Math.round((data.successfulDeployments / data.totalDeployments) * 100) 
    : 0;

  const maxDeployments = Math.max(...(data?.deploymentsByDay.map(d => d.count) || [1]));
  const maxUsers = Math.max(...(data?.deploymentsByDay.map(d => d.users) || [1]));

  const timeRangeAction = (
    <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
      {(['7d', '30d', '90d'] as const).map((range) => (
        <button
          key={range}
          onClick={() => setTimeRange(range)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            timeRange === range
              ? 'bg-background shadow text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
        </button>
      ))}
    </div>
  );

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const getAdoptionColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-500';
    if (rate >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics Dashboard"
        description="Comprehensive insights into your email signature program"
        action={timeRangeAction}
      />

      {/* Health Score & Key Metrics Row */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
        {/* Health Score */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${getHealthColor(data?.healthScore || 0)}`}>
                <span className="text-xl sm:text-2xl font-bold">{data?.healthScore || 0}</span>
              </div>
              <p className="mt-2 font-semibold">Health Score</p>
              <p className="text-xs text-muted-foreground mt-1">
                {(data?.healthScore || 0) >= 80 ? 'Excellent' : (data?.healthScore || 0) >= 60 ? 'Good' : 'Needs Attention'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-violet-600" />
              Team Adoption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold">{data?.adoptionRate || 0}%</span>
              {data?.adoptionChange !== undefined && data.adoptionChange !== 0 && (
                <span className={`text-sm flex items-center ${data.adoptionChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {data.adoptionChange > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(data.adoptionChange)}%
                </span>
              )}
            </div>
            <div className="mt-3 w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${getAdoptionColor(data?.adoptionRate || 0)}`}
                style={{ width: `${data?.adoptionRate || 0}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {data?.usersWithSignatures || 0} of {data?.totalUsers || 0} users have signatures deployed
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Rocket className="h-4 w-4 text-violet-600" />
              Deployment Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold">{data?.totalDeployments || 0}</span>
              {data?.deploymentsChange !== undefined && data.deploymentsChange !== 0 && (
                <span className={`text-sm flex items-center ${data.deploymentsChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {data.deploymentsChange > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(data.deploymentsChange)}% vs prev
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-3">
              <div className="text-center p-2 bg-green-50 rounded">
                <p className="text-lg font-semibold text-green-700">{data?.successfulDeployments || 0}</p>
                <p className="text-xs text-green-600">Successful</p>
              </div>
              <div className="text-center p-2 bg-red-50 rounded">
                <p className="text-lg font-semibold text-red-700">{data?.failedDeployments || 0}</p>
                <p className="text-xs text-red-600">Failed</p>
              </div>
              <div className="text-center p-2 bg-amber-50 rounded">
                <p className="text-lg font-semibold text-amber-700">{data?.pendingDeployments || 0}</p>
                <p className="text-xs text-amber-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actionable Insights */}
      {(data?.complianceIssues || 0) > 0 && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-amber-900">Recommendations</h4>
                <ul className="mt-2 space-y-1 text-sm text-amber-800">
                  {(data?.totalUsers || 0) - (data?.usersWithSignatures || 0) > 0 && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                      {(data?.totalUsers || 0) - (data?.usersWithSignatures || 0)} team members don't have signatures deployed yet
                    </li>
                  )}
                  {(data?.failedDeployments || 0) > 0 && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                      {data?.failedDeployments} failed deployments need attention
                    </li>
                  )}
                  {(data?.adoptionRate || 0) < 50 && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                      Consider running a company-wide deployment to improve adoption
                    </li>
                  )}
                </ul>
              </div>
              <Link href="/deployments">
                <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                  <Zap className="h-4 w-4 mr-1" />
                  Deploy Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts Row */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Deployment Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-violet-600" />
              Deployment Trend
            </CardTitle>
            <CardDescription>
              Deployments and users affected over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end gap-1">
              {data?.deploymentsByDay.slice(-30).map((day) => (
                <div
                  key={day.date}
                  className="flex-1 flex flex-col justify-end relative group"
                >
                  <div 
                    className="bg-violet-200 rounded-t"
                    style={{ height: `${Math.max((day.users / maxUsers) * 100, 2)}%` }}
                  />
                  <div 
                    className="bg-violet-500 rounded-t -mt-1"
                    style={{ height: `${Math.max((day.count / maxDeployments) * 60, 2)}%` }}
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border z-10">
                    <strong>{day.count}</strong> deployment{day.count !== 1 ? 's' : ''}<br />
                    <strong>{day.users}</strong> users affected<br />
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{data?.deploymentsByDay[0]?.date ? new Date(data.deploymentsByDay[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-violet-500 rounded" /> Deployments</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-violet-200 rounded" /> Users</span>
              </div>
              <span>Today</span>
            </div>
          </CardContent>
        </Card>

        {/* Department Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-violet-600" />
              Adoption by Department
            </CardTitle>
            <CardDescription>
              Signature coverage across your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(data?.departmentStats?.length || 0) === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No department data available. Sync users to see breakdown.
              </p>
            ) : (
              <div className="space-y-3">
                {data?.departmentStats.slice(0, 5).map((dept) => (
                  <div key={dept.department}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium truncate">{dept.department}</span>
                      <span className="text-muted-foreground">{dept.deployedUsers}/{dept.totalUsers} ({dept.adoptionRate}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${getAdoptionColor(dept.adoptionRate)}`}
                        style={{ width: `${dept.adoptionRate}%` }}
                      />
                    </div>
                  </div>
                ))}
                {(data?.departmentStats?.length || 0) > 5 && (
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    +{(data?.departmentStats?.length || 0) - 5} more departments
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Template Performance & Recent Activity */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Template Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-violet-600" />
              Template Performance
            </CardTitle>
            <CardDescription>
              How each template is performing
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(data?.templatePerformance?.length || 0) === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No templates yet. Create your first template to see performance data.
              </p>
            ) : (
              <div className="space-y-3">
                {data?.templatePerformance.map((template, i) => (
                  <div key={template.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    {i === 0 && <Badge className="bg-amber-100 text-amber-700 border-amber-200">Top</Badge>}
                    {i !== 0 && <span className="w-8 text-center text-sm text-muted-foreground">#{i + 1}</span>}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{template.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {template.deploymentCount} deployments • {template.usersDeployed} users
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${template.successRate >= 90 ? 'text-green-600' : template.successRate >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                        {template.successRate}%
                      </div>
                      <p className="text-xs text-muted-foreground">success</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Deployments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-violet-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest signature deployments
                </CardDescription>
              </div>
              <Link href="/deployments">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {data?.recentDeployments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No deployments yet. Deploy your first signature!
              </p>
            ) : (
              <div className="space-y-3">
                {data?.recentDeployments.map((deployment) => (
                  <div
                    key={deployment.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    {deployment.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : deployment.status === 'failed' ? (
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    ) : (
                      <Clock className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {deployment.template?.name || 'Unknown Template'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {deployment.successful_count}/{deployment.total_users} users • {new Date(deployment.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        deployment.status === 'completed' ? 'border-green-200 text-green-700' :
                        deployment.status === 'failed' ? 'border-red-200 text-red-700' :
                        'border-amber-200 text-amber-700'
                      }
                    >
                      {deployment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <Users className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">{data?.totalUsers || 0}</p>
                <p className="text-xs text-muted-foreground">Total Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">{data?.usersWithSignatures || 0}</p>
                <p className="text-xs text-muted-foreground">With Signatures</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileSignature className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">{data?.totalTemplates || 0}</p>
                <p className="text-xs text-muted-foreground">Active Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Shield className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">{successRate}%</p>
                <p className="text-xs text-muted-foreground">Deployment Success</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* IT Team Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-blue-600" />
            IT Operations
          </CardTitle>
          <CardDescription>
            System health and integration status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Sync Status */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Integration Status</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${data?.syncStatus.google.connected ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-sm">Google Workspace</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{data?.syncStatus.google.userCount || 0} users</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${data?.syncStatus.microsoft.connected ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-sm">Microsoft 365</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{data?.syncStatus.microsoft.userCount || 0} users</span>
                </div>
              </div>
            </div>

            {/* Error Rate */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className={`text-2xl font-bold ${(data?.errorRate || 0) > 10 ? 'text-red-600' : (data?.errorRate || 0) > 5 ? 'text-amber-600' : 'text-green-600'}`}>
                {data?.errorRate || 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Error Rate</p>
              {(data?.errorRate || 0) > 10 && (
                <Badge variant="outline" className="mt-2 border-red-200 text-red-700">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Needs attention
                </Badge>
              )}
            </div>

            {/* Avg Deployment Time */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {data?.avgDeploymentTime || 0}s
              </div>
              <p className="text-xs text-muted-foreground mt-1">Avg Deploy Time</p>
            </div>

            {/* Failed Reasons */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Failure Reasons</h4>
              {(data?.failedDeploymentReasons?.length || 0) === 0 ? (
                <p className="text-xs text-muted-foreground p-2 bg-green-50 rounded-lg text-center">
                  <CheckCircle2 className="h-4 w-4 inline mr-1 text-green-600" />
                  No failures
                </p>
              ) : (
                <div className="space-y-1">
                  {data?.failedDeploymentReasons.slice(0, 3).map((reason, i) => (
                    <div key={i} className="flex justify-between text-xs p-2 bg-red-50 rounded">
                      <span className="text-red-700">{reason.reason}</span>
                      <span className="font-medium text-red-800">{reason.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HR Team Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-green-600" />
            HR & People Operations
          </CardTitle>
          <CardDescription>
            Employee adoption and onboarding metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* New Users */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-1">
                <UserPlus className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold">{data?.newUsersThisPeriod || 0}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">New Users ({timeRange})</p>
            </div>

            {/* Users Without Signatures */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className={`text-2xl font-bold ${(data?.usersWithoutSignatures || 0) > 10 ? 'text-amber-600' : 'text-green-600'}`}>
                {data?.usersWithoutSignatures || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Without Signatures</p>
              {(data?.usersWithoutSignatures || 0) > 0 && (
                <Link href="/team-members">
                  <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-1">
                    View list →
                  </Button>
                </Link>
              )}
            </div>

            {/* Department Coverage */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className={`text-2xl font-bold ${(data?.departmentCoverage || 0) >= 80 ? 'text-green-600' : (data?.departmentCoverage || 0) >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                {data?.departmentCoverage || 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Dept Coverage (&gt;50%)</p>
            </div>

            {/* Onboarding Pending */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className={`text-2xl font-bold ${(data?.onboardingPending || 0) > 5 ? 'text-amber-600' : 'text-green-600'}`}>
                {data?.onboardingPending || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Onboarding Pending</p>
              <p className="text-xs text-muted-foreground">New users without signatures</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketing Team Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-pink-600" />
            Marketing & Branding
          </CardTitle>
          <CardDescription>
            Campaign elements and brand consistency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Banners */}
            <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-white rounded-lg border border-pink-100">
              <Image className="h-6 w-6 mx-auto text-pink-600 mb-2" />
              <div className="text-2xl font-bold text-pink-700">{data?.bannersDeployed || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Banners in Use</p>
              <p className="text-xs text-pink-600">{data?.templatesWithBanners || 0} templates</p>
            </div>

            {/* CTA Buttons */}
            <div className="text-center p-4 bg-gradient-to-br from-violet-50 to-white rounded-lg border border-violet-100">
              <MousePointerClick className="h-6 w-6 mx-auto text-violet-600 mb-2" />
              <div className="text-2xl font-bold text-violet-700">{data?.ctaButtonsDeployed || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">CTA Buttons</p>
            </div>

            {/* Social Links */}
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100">
              <Link2 className="h-6 w-6 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-700">{data?.socialLinksDeployed || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Social Links</p>
            </div>

            {/* Avg Social per Signature */}
            <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-white rounded-lg border border-cyan-100">
              <Activity className="h-6 w-6 mx-auto text-cyan-600 mb-2" />
              <div className="text-2xl font-bold text-cyan-700">{data?.avgSocialLinksPerSignature || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Avg Social/Template</p>
            </div>

            {/* Brand Consistency Score */}
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100">
              <Target className="h-6 w-6 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-700">
                {data?.totalTemplates ? Math.round(((data?.templatesWithBanners || 0) / data.totalTemplates) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Templates w/ Branding</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
