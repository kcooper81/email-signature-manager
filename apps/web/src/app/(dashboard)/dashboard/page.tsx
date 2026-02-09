import { createClient } from '@/lib/supabase/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Users, 
  FileSignature, 
  Send, 
  Activity, 
  CheckCircle2,
  X,
} from 'lucide-react';
import { GettingStartedCard } from './getting-started';
import { QuickActionsPanel } from './quick-actions';
import { IntegrationStatusWidget } from './integration-status';
import { PendingActionsWidget } from './pending-actions';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get current user's organization
  const { data: currentUser } = await supabase
    .from('users')
    .select('organization_id')
    .eq('auth_id', user?.id)
    .single();

  const organizationId = currentUser?.organization_id;

  // Fetch actual counts for dashboard stats - FILTERED BY ORGANIZATION
  const { count: templateCount } = await supabase
    .from('signature_templates')
    .select('*', { count: 'exact', head: true })
    .eq('organization_id', organizationId);

  const { count: teamMemberCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('organization_id', organizationId);
  
  const { data: connections } = await supabase
    .from('provider_connections')
    .select('id')
    .eq('organization_id', organizationId)
    .eq('is_active', true)
    .limit(1);

  // Fetch integration status for all providers
  const { data: allConnections } = await supabase
    .from('provider_connections')
    .select('provider, is_active, created_at')
    .eq('organization_id', organizationId);

  // Build integration status map from provider_connections only
  const integrationStatus = {
    google: {
      connected: allConnections?.some(c => c.provider === 'google' && c.is_active) || false,
      connectedAt: allConnections?.find(c => c.provider === 'google' && c.is_active)?.created_at || null,
    },
    microsoft: {
      connected: allConnections?.some(c => c.provider === 'microsoft' && c.is_active) || false,
      connectedAt: allConnections?.find(c => c.provider === 'microsoft' && c.is_active)?.created_at || null,
    },
    hubspot: {
      connected: allConnections?.some(c => c.provider === 'hubspot' && c.is_active) || false,
      connectedAt: allConnections?.find(c => c.provider === 'hubspot' && c.is_active)?.created_at || null,
    },
  };

  // Get deployments from this month - FILTERED BY ORGANIZATION
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { data: deployments, count: deploymentCount } = await supabase
    .from('signature_deployments')
    .select('id, status, successful_count, failed_count, total_users, created_at, template:signature_templates(name)', { count: 'exact' })
    .eq('organization_id', organizationId)
    .gte('created_at', startOfMonth.toISOString())
    .order('created_at', { ascending: false })
    .limit(5);

  // Calculate success rate from actual deployment data
  const successfulDeployments = deployments?.filter(d => d.status === 'completed').length || 0;
  const totalDeployments = deployments?.length || 0;
  const successRate = totalDeployments > 0 
    ? Math.round((successfulDeployments / totalDeployments) * 100) 
    : 0;

  // Get users with signatures - use user_deployment_history for accuracy, fallback to target_emails
  // Check for both 'completed' and 'success' status for backwards compatibility
  const { data: userDeploymentHistory } = await supabase
    .from('user_deployment_history')
    .select('user_id')
    .eq('organization_id', organizationId)
    .in('status', ['completed', 'success']);

  const usersWithHistoryDeployment = new Set(userDeploymentHistory?.map(h => h.user_id) || []);

  // Also check target_emails from signature_deployments as fallback
  const { data: allDeployments } = await supabase
    .from('signature_deployments')
    .select('target_emails, successful_count, status')
    .eq('organization_id', organizationId)
    .eq('status', 'completed');
  
  const uniqueUsersWithSignatures = new Set<string>();
  allDeployments?.forEach(d => {
    if (d.target_emails && (d.target_emails as string[]).length > 0) {
      (d.target_emails as string[]).forEach(email => uniqueUsersWithSignatures.add(email.toLowerCase()));
    }
  });

  // Get all users to map emails to user IDs
  const { data: allUsers } = await supabase
    .from('users')
    .select('id, email')
    .eq('organization_id', organizationId);

  // Count users with signatures from either source
  let usersWithSignatures = 0;
  allUsers?.forEach(u => {
    if (usersWithHistoryDeployment.has(u.id) || uniqueUsersWithSignatures.has(u.email.toLowerCase())) {
      usersWithSignatures++;
    }
  });

  // Calculate pending actions
  const usersWithoutSignatures = (teamMemberCount || 0) - usersWithSignatures;
  const failedDeploymentsCount = deployments?.filter(d => d.status === 'failed').length || 0;
  
  // Stale syncs tracking - currently not implemented as last_sync_at column doesn't exist
  const staleSyncs: string[] = [];

  // Get new users added in last 7 days without signatures
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const { data: recentUsers } = await supabase
    .from('users')
    .select('id, email, created_at')
    .eq('organization_id', organizationId)
    .gte('created_at', sevenDaysAgo.toISOString());
  
  const newUsersWithoutSignatures = recentUsers?.filter(
    u => !usersWithHistoryDeployment.has(u.id) && !uniqueUsersWithSignatures.has(u.email.toLowerCase())
  ).length || 0;

  const hasTemplates = (templateCount || 0) > 0;
  const hasConnection = (connections?.length || 0) > 0;
  const hasDeployments = (deploymentCount || 0) > 0;

  const completedSteps = [hasConnection, hasTemplates, hasDeployments].filter(Boolean).length;
  const totalSteps = 3;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  const firstName = user?.user_metadata?.first_name || 'there';
  const isNewUser = completedSteps === 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome{isNewUser ? '' : ' back'}, {firstName}!
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          {isNewUser 
            ? "Let's get your team's email signatures set up in just a few steps."
            : "Here's an overview of your email signature management."}
        </p>
      </div>

      {/* Getting Started - Dismissible */}
      <GettingStartedCard
        hasConnection={hasConnection}
        hasTemplates={hasTemplates}
        hasDeployments={hasDeployments}
        completedSteps={completedSteps}
        totalSteps={totalSteps}
        progressPercent={progressPercent}
        isNewUser={isNewUser}
      />

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Team Members"
          value={`${usersWithSignatures}/${teamMemberCount || 0}`}
          description="Team members with signatures"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Templates"
          value={String(templateCount || 0)}
          description="Active signature templates"
          icon={<FileSignature className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Deployments"
          value={String(deploymentCount || 0)}
          description="Signatures deployed this month"
          icon={<Send className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Success Rate"
          value={hasDeployments ? `${successRate}%` : '--'}
          description="Deployment success rate"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Quick Actions Panel */}
      <QuickActionsPanel />

      {/* Integration Status & Pending Actions Row */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
        <IntegrationStatusWidget
          google={integrationStatus.google}
          microsoft={integrationStatus.microsoft}
          hubspot={integrationStatus.hubspot}
        />
        <PendingActionsWidget
          usersWithoutSignatures={usersWithoutSignatures}
          newUsersWithoutSignatures={newUsersWithoutSignatures}
          failedDeployments={failedDeploymentsCount}
          staleSyncs={staleSyncs}
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest signature deployments and changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {deployments && deployments.length > 0 ? (
            <div className="space-y-4">
              {deployments.map((deployment: any) => (
                <div key={deployment.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {deployment.status === 'completed' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : deployment.status === 'failed' ? (
                      <X className="h-4 w-4 text-red-600" />
                    ) : (
                      <Activity className="h-4 w-4 text-amber-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {deployment.template?.name || 'Deployment'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {deployment.successful_count || 0}/{deployment.total_users || 0} users
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(deployment.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground text-center py-8">
              No recent activity yet.
              <br />
              Start by creating a template!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
