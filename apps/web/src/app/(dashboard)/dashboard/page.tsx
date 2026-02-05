import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileSignature, 
  Send, 
  Activity, 
  ArrowRight,
  CheckCircle2,
  Link2,
  Paintbrush,
  UserPlus,
  Rocket,
  X,
} from 'lucide-react';
import { GettingStartedCard } from './getting-started';

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

  // Get users with signatures (from successful deployments) - FILTERED BY ORGANIZATION
  const { data: allDeployments } = await supabase
    .from('signature_deployments')
    .select('target_emails, successful_count, status')
    .eq('organization_id', organizationId)
    .eq('status', 'completed');
  
  const uniqueUsersWithSignatures = new Set<string>();
  let estimatedUsers = 0;
  allDeployments?.forEach(d => {
    if (d.target_emails && (d.target_emails as string[]).length > 0) {
      (d.target_emails as string[]).forEach(email => uniqueUsersWithSignatures.add(email.toLowerCase()));
    } else {
      estimatedUsers += d.successful_count || 0;
    }
  });
  const usersWithSignatures = Math.min(
    uniqueUsersWithSignatures.size + estimatedUsers,
    teamMemberCount || 0
  );

  const hasTemplates = (templateCount || 0) > 0;
  const hasConnection = (connections?.length || 0) > 0;
  const hasDeployments = (deploymentCount || 0) > 0;

  const completedSteps = [hasConnection, hasTemplates, hasDeployments].filter(Boolean).length;
  const totalSteps = 3;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  const firstName = user?.user_metadata?.first_name || 'there';
  const isNewUser = completedSteps === 0;
  const allComplete = completedSteps === totalSteps;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome{isNewUser ? '' : ' back'}, {firstName}!
        </h1>
        <p className="text-muted-foreground">
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
