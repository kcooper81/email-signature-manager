import Link from 'next/link';
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
  Plug, 
  Palette, 
  UserPlus, 
  Rocket,
  ArrowRight,
  CheckCircle2,
  Circle,
  Sparkles,
} from 'lucide-react';

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
  const totalSteps = 4;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  const firstName = user?.user_metadata?.first_name || 'there';
  const isNewUser = completedSteps === 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome{isNewUser ? '' : ' back'}, {firstName}! 👋
        </h1>
        <p className="text-muted-foreground">
          {isNewUser 
            ? "Let's get your team's email signatures set up in just a few steps."
            : "Here's an overview of your email signature management."}
        </p>
      </div>

      {/* Getting Started - Prominent when new user */}
      {completedSteps < totalSteps && (
        <Card className={`${isNewUser ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-transparent' : ''}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isNewUser && <Sparkles className="h-6 w-6 text-primary" />}
                <div>
                  <CardTitle className={isNewUser ? 'text-xl' : ''}>
                    {isNewUser ? "Let's get you started!" : 'Getting Started'}
                  </CardTitle>
                  <CardDescription>
                    {isNewUser 
                      ? 'Complete these 4 quick steps to deploy your first signature'
                      : 'Complete these steps to finish setup'}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{progressPercent}%</div>
                <div className="text-xs text-muted-foreground">{completedSteps}/{totalSteps} complete</div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`grid gap-3 ${isNewUser ? 'md:grid-cols-2' : ''}`}>
              <OnboardingStep
                icon={<Plug className="h-5 w-5" />}
                title="Connect your email provider"
                description="Link Google Workspace or Microsoft 365 to manage signatures"
                completed={hasConnection}
                href="/integrations"
                stepNumber={1}
                isNewUser={isNewUser}
              />
              <OnboardingStep
                icon={<Palette className="h-5 w-5" />}
                title="Create your first template"
                description="Design a beautiful signature with our visual editor"
                completed={hasTemplates}
                href="/templates/new"
                stepNumber={2}
                isNewUser={isNewUser}
              />
              <OnboardingStep
                icon={<UserPlus className="h-5 w-5" />}
                title="Import team members"
                description="Sync users from your directory automatically"
                completed={false}
                href="/users"
                stepNumber={3}
                isNewUser={isNewUser}
                comingSoon
              />
              <OnboardingStep
                icon={<Rocket className="h-5 w-5" />}
                title="Deploy signatures"
                description="Push signatures to your entire team in one click"
                completed={hasDeployments}
                href="/deployments"
                stepNumber={4}
                isNewUser={isNewUser}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
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

function OnboardingStep({
  icon,
  title,
  description,
  completed,
  href,
  stepNumber,
  isNewUser,
  comingSoon,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  completed: boolean;
  href: string;
  stepNumber: number;
  isNewUser: boolean;
  comingSoon?: boolean;
}) {
  const content = (
    <div
      className={`relative flex items-start gap-4 p-4 rounded-xl border transition-all ${
        completed
          ? 'bg-green-50 border-green-200'
          : comingSoon
          ? 'bg-slate-50 border-slate-200 opacity-60'
          : isNewUser
          ? 'bg-white border-slate-200 hover:border-primary hover:shadow-md cursor-pointer'
          : 'bg-white border-slate-200 hover:bg-slate-50 cursor-pointer'
      }`}
    >
      {/* Step number badge */}
      <div
        className={`absolute -top-2 -left-2 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
          completed
            ? 'bg-green-500 text-white'
            : 'bg-slate-200 text-slate-600'
        }`}
      >
        {completed ? <CheckCircle2 className="h-4 w-4" /> : stepNumber}
      </div>

      {/* Icon */}
      <div
        className={`shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
          completed
            ? 'bg-green-100 text-green-600'
            : comingSoon
            ? 'bg-slate-100 text-slate-400'
            : 'bg-primary/10 text-primary'
        }`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`font-semibold ${completed ? 'text-green-700' : ''}`}>
            {title}
          </p>
          {comingSoon && (
            <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
              Coming soon
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        
        {/* Action hint for new users */}
        {isNewUser && !completed && !comingSoon && (
          <div className="flex items-center gap-1 mt-2 text-xs font-medium text-primary">
            Get started <ArrowRight className="h-3 w-3" />
          </div>
        )}
      </div>
    </div>
  );

  if (comingSoon || completed) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}
