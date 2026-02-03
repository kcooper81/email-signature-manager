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

  // Fetch actual data for progress tracking
  const { data: templates } = await supabase
    .from('signature_templates')
    .select('id')
    .limit(1);
  
  const { data: connections } = await supabase
    .from('provider_connections')
    .select('id')
    .eq('is_active', true)
    .limit(1);

  const { data: deployments } = await supabase
    .from('signature_deployments')
    .select('id')
    .limit(1);

  const hasTemplates = (templates?.length || 0) > 0;
  const hasConnection = (connections?.length || 0) > 0;
  const hasDeployments = (deployments?.length || 0) > 0;

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
          value="0"
          description="Team members with signatures"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Templates"
          value={String(templates?.length || 0)}
          description="Active signature templates"
          icon={<FileSignature className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Deployments"
          value={String(deployments?.length || 0)}
          description="Signatures deployed this month"
          icon={<Send className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Success Rate"
          value={hasDeployments ? '100%' : '--'}
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
          <div className="text-sm text-muted-foreground text-center py-8">
            No recent activity yet.
            <br />
            Start by creating a template!
          </div>
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
