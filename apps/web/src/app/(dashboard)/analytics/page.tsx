'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, Button } from '@/components/ui';
import { PageHeader } from '@/components/dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Loader2,
  Lock,
  Sparkles,
  LayoutDashboard,
  Rocket,
  FileSignature,
  Megaphone,
  TrendingUp,
  UserCheck,
  Monitor,
} from 'lucide-react';
import { useSubscription, usePayGatesBypass } from '@/hooks/use-subscription';
import Link from 'next/link';
import { AnalyticsData, EmployeeSignatureStatus } from './types';
import { OverviewTab, DeploymentsTab, TemplatesTab, MarketingTab, SalesTab, HRTab, ITTab } from './tabs';

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [employeeData, setEmployeeData] = useState<EmployeeSignatureStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeTab, setActiveTab] = useState('overview');
  const { plan } = useSubscription();
  const devBypass = usePayGatesBypass();
  
  const hasAnalyticsAccess = devBypass || plan.features.analytics;

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    const supabase = createClient();
    const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    const previousStartDate = new Date(startDate);
    previousStartDate.setDate(previousStartDate.getDate() - daysAgo);

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

    // Get all users with department info
    const { data: users, count: userCount } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, department, source, created_at', { count: 'exact' })
      .eq('organization_id', organizationId);

    // Get all templates
    const { data: templates, count: templateCount } = await supabase
      .from('signature_templates')
      .select('id, name, created_at')
      .eq('organization_id', organizationId);

    // Get deployments for current period
    const { data: deployments } = await supabase
      .from('signature_deployments')
      .select('id, status, total_users, successful_count, failed_count, created_at, template_id, target_emails, template:signature_templates(id, name)')
      .eq('organization_id', organizationId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    // Get deployments for previous period
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

    // Get user deployment history for accurate per-user signature status
    const { data: userDeploymentHistory } = await supabase
      .from('user_deployment_history')
      .select('user_id, template_id, status, deployed_at, template:signature_templates(name)')
      .eq('organization_id', organizationId)
      .eq('status', 'completed')
      .order('deployed_at', { ascending: false });

    // Build a map of user_id to their latest successful deployment
    const userIdToDeployment = new Map<string, { templateName: string; deployedAt: string }>();
    userDeploymentHistory?.forEach(h => {
      if (!userIdToDeployment.has(h.user_id)) {
        userIdToDeployment.set(h.user_id, {
          templateName: (h.template as any)?.name || 'Unknown',
          deployedAt: h.deployed_at,
        });
      }
    });

    // Also check target_emails from signature_deployments as fallback
    const uniqueDeployedEmails = new Set<string>();
    const emailToDeployment = new Map<string, { templateName: string; deployedAt: string }>();
    
    const { data: allDeployments } = await supabase
      .from('signature_deployments')
      .select('target_emails, successful_count, status, created_at, template:signature_templates(name)')
      .eq('organization_id', organizationId)
      .eq('status', 'completed')
      .order('created_at', { ascending: false });
    
    allDeployments?.forEach(d => {
      if (d.target_emails && (d.target_emails as string[]).length > 0) {
        (d.target_emails as string[]).forEach(email => {
          const lowerEmail = email.toLowerCase();
          uniqueDeployedEmails.add(lowerEmail);
          if (!emailToDeployment.has(lowerEmail)) {
            emailToDeployment.set(lowerEmail, {
              templateName: (d.template as any)?.name || 'Unknown',
              deployedAt: d.created_at,
            });
          }
        });
      }
    });

    // Build employee signature status - use user_deployment_history first, then fallback to target_emails
    const employeeStatuses: EmployeeSignatureStatus[] = (users || []).map(u => {
      const email = u.email.toLowerCase();
      const historyInfo = userIdToDeployment.get(u.id);
      const emailInfo = emailToDeployment.get(email);
      const hasSignature = !!historyInfo || uniqueDeployedEmails.has(email);
      const deployInfo = historyInfo || emailInfo;
      
      return {
        email: u.email,
        name: [u.first_name, u.last_name].filter(Boolean).join(' ') || u.email.split('@')[0],
        department: u.department || 'Unassigned',
        hasSignature,
        templateName: deployInfo?.templateName || null,
        lastDeployedAt: deployInfo?.deployedAt || null,
      };
    });
    setEmployeeData(employeeStatuses);

    // Calculate users with signatures
    const usersWithSignatures = employeeStatuses.filter(e => e.hasSignature).length;
    const adoptionRate = userCount ? Math.round((usersWithSignatures / userCount) * 100) : 0;

    // Calculate previous period adoption
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
    const templateMap = new Map<string, any>();
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

    // Calculate department stats
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

    // Count deployed users per department using both user_deployment_history and target_emails
    employeeStatuses.forEach(emp => {
      if (emp.hasSignature && deptMap.has(emp.department)) {
        deptMap.get(emp.department)!.deployed++;
      }
    });

    const departmentStats = Array.from(deptMap.entries())
      .map(([department, stats]) => ({
        department,
        totalUsers: stats.total,
        deployedUsers: stats.deployed,
        adoptionRate: stats.total > 0 ? Math.round((stats.deployed / stats.total) * 100) : 0,
      }))
      .sort((a, b) => b.adoptionRate - a.adoptionRate);

    // Group deployments by day
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

    // IT-focused metrics - use provider_connections table
    const { data: providerConnections } = await supabase
      .from('provider_connections')
      .select('provider, is_active, last_sync_at')
      .eq('organization_id', organizationId);

    const googleConnection = providerConnections?.find(c => c.provider === 'google' && c.is_active);
    const microsoftConnection = providerConnections?.find(c => c.provider === 'microsoft' && c.is_active);

    const googleUsers = users?.filter(u => u.source === 'google').length || 0;
    const microsoftUsers = users?.filter(u => u.source === 'microsoft').length || 0;

    const syncStatus = {
      google: {
        connected: !!googleConnection,
        lastSync: googleConnection?.last_sync_at || null,
        userCount: googleUsers,
      },
      microsoft: {
        connected: !!microsoftConnection,
        lastSync: microsoftConnection?.last_sync_at || null,
        userCount: microsoftUsers,
      },
    };

    const errorRate = deployments?.length 
      ? Math.round((failedDeployments / deployments.length) * 100) 
      : 0;

    // Calculate average deployment time from actual data
    // For now, estimate based on user count (larger deployments take longer)
    const avgUsersPerDeployment = deployments?.length 
      ? Math.round(deployments.reduce((sum, d) => sum + (d.total_users || 0), 0) / deployments.length)
      : 0;
    const avgDeploymentTime = avgUsersPerDeployment > 0 ? Math.min(avgUsersPerDeployment * 2 + 10, 120) : 0;

    // Categorize failed deployment reasons based on actual failure patterns
    const failedDeploymentReasons: { reason: string; count: number }[] = [];
    const reasonMap = new Map<string, number>();
    deployments?.filter(d => d.status === 'failed').forEach(d => {
      // Categorize failures based on context
      let reason = 'Unknown Error';
      const failedCount = d.failed_count || 0;
      const totalUsers = d.total_users || 0;
      
      if (failedCount === totalUsers && totalUsers > 0) {
        reason = 'Complete Failure - API/Auth Issue';
      } else if (failedCount > 0 && failedCount < totalUsers) {
        reason = 'Partial Failure - Some Users Failed';
      } else {
        reason = 'Deployment Error';
      }
      reasonMap.set(reason, (reasonMap.get(reason) || 0) + 1);
    });
    reasonMap.forEach((count, reason) => {
      failedDeploymentReasons.push({ reason, count });
    });
    failedDeploymentReasons.sort((a, b) => b.count - a.count);

    // HR-focused metrics
    const newUsersThisPeriod = users?.filter(u => 
      new Date(u.created_at) >= startDate
    ).length || 0;

    const usersWithoutSignatures = (userCount || 0) - usersWithSignatures;

    const deptsWith50PlusAdoption = departmentStats.filter(d => d.adoptionRate >= 50).length;
    const departmentCoverage = departmentStats.length > 0 
      ? Math.round((deptsWith50PlusAdoption / departmentStats.length) * 100)
      : 0;

    const newUserEmails = new Set(
      users?.filter(u => new Date(u.created_at) >= startDate).map(u => u.email.toLowerCase()) || []
    );
    const onboardingPending = Array.from(newUserEmails).filter(
      email => !uniqueDeployedEmails.has(email)
    ).length;

    // Marketing-focused metrics
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
      recentDeployments: (deployments || []).slice(0, 10) as any,
      deploymentsByDay,
      healthScore,
      complianceIssues,
      pendingDeployments,
      syncStatus,
      errorRate,
      avgDeploymentTime,
      failedDeploymentReasons,
      newUsersThisPeriod,
      usersWithoutSignatures,
      departmentCoverage,
      onboardingPending,
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

  if (!data) return null;

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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics Dashboard"
        description="Comprehensive insights into your email signature program"
        action={timeRangeAction}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-7 h-auto gap-1 p-1">
          <TabsTrigger value="overview" className="flex items-center gap-2 py-2">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="marketing" className="flex items-center gap-2 py-2">
            <Megaphone className="h-4 w-4" />
            <span className="hidden sm:inline">Marketing</span>
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-2 py-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Sales</span>
          </TabsTrigger>
          <TabsTrigger value="hr" className="flex items-center gap-2 py-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">HR</span>
          </TabsTrigger>
          <TabsTrigger value="it" className="flex items-center gap-2 py-2">
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">IT</span>
          </TabsTrigger>
          <TabsTrigger value="deployments" className="flex items-center gap-2 py-2">
            <Rocket className="h-4 w-4" />
            <span className="hidden sm:inline">Deployments</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2 py-2">
            <FileSignature className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab data={data} />
        </TabsContent>

        <TabsContent value="marketing">
          <MarketingTab data={data} employeeData={employeeData} />
        </TabsContent>

        <TabsContent value="sales">
          <SalesTab data={data} employeeData={employeeData} />
        </TabsContent>

        <TabsContent value="hr">
          <HRTab data={data} employeeData={employeeData} timeRange={timeRange} />
        </TabsContent>

        <TabsContent value="it">
          <ITTab data={data} timeRange={timeRange} />
        </TabsContent>

        <TabsContent value="deployments">
          <DeploymentsTab data={data} />
        </TabsContent>

        <TabsContent value="templates">
          <TemplatesTab data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
