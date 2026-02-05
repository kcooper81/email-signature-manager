'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { 
  ArrowLeft,
  Building2, 
  Users,
  FileSignature,
  CreditCard,
  Loader2,
  Mail,
  Calendar,
  Globe,
  Eye,
  ScrollText,
  Rocket,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { PLANS } from '@/lib/billing/plans';

interface OrgDetails {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  industry: string | null;
  createdAt: string;
}

interface Subscription {
  plan: string;
  status: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string | null;
  currentPeriodEnd: string | null;
}

interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  department: string | null;
  createdAt: string;
}

interface Template {
  id: string;
  name: string;
  isDefault: boolean;
  createdAt: string;
}

interface Deployment {
  id: string;
  status: string;
  totalUsers: number;
  successfulCount: number;
  failedCount: number;
  createdAt: string;
  templateName: string | null;
}

interface AuditLog {
  id: string;
  action: string;
  resourceType: string;
  createdAt: string;
  userEmail: string | null;
}

export default function OrgDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orgId = params.orgId as string;

  const [loading, setLoading] = useState(true);
  const [org, setOrg] = useState<OrgDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    loadOrgDetails();
  }, [orgId]);

  const loadOrgDetails = async () => {
    const supabase = createClient();

    // Get organization
    const { data: orgData } = await supabase
      .from('organizations')
      .select('id, name, slug, domain, industry, created_at')
      .eq('id', orgId)
      .single();

    if (!orgData) {
      router.push('/admin/accounts');
      return;
    }

    setOrg({
      id: orgData.id,
      name: orgData.name,
      slug: orgData.slug,
      domain: orgData.domain,
      industry: orgData.industry,
      createdAt: orgData.created_at,
    });

    // Get subscription
    const { data: subData } = await supabase
      .from('subscriptions')
      .select('plan, status, stripe_customer_id, stripe_subscription_id, current_period_end')
      .eq('organization_id', orgId)
      .single();

    if (subData) {
      setSubscription({
        plan: subData.plan,
        status: subData.status,
        stripeCustomerId: subData.stripe_customer_id,
        stripeSubscriptionId: subData.stripe_subscription_id,
        currentPeriodEnd: subData.current_period_end,
      });
    }

    // Get users
    const { data: userData } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, role, department, created_at')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false });

    setUsers(
      userData?.map(u => ({
        id: u.id,
        email: u.email,
        firstName: u.first_name,
        lastName: u.last_name,
        role: u.role,
        department: u.department,
        createdAt: u.created_at,
      })) || []
    );

    // Get templates
    const { data: templateData } = await supabase
      .from('signature_templates')
      .select('id, name, is_default, created_at')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false });

    setTemplates(
      templateData?.map(t => ({
        id: t.id,
        name: t.name,
        isDefault: t.is_default,
        createdAt: t.created_at,
      })) || []
    );

    // Get recent deployments
    const { data: deploymentData } = await supabase
      .from('signature_deployments')
      .select('id, status, total_users, successful_count, failed_count, created_at, template:signature_templates(name)')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false })
      .limit(10);

    setDeployments(
      deploymentData?.map((d: any) => ({
        id: d.id,
        status: d.status,
        totalUsers: d.total_users,
        successfulCount: d.successful_count,
        failedCount: d.failed_count,
        createdAt: d.created_at,
        templateName: d.template?.name || null,
      })) || []
    );

    // Get recent audit logs with user info
    const { data: auditData } = await supabase
      .from('audit_logs')
      .select('id, action, resource_type, created_at, user_id')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false })
      .limit(20);

    // Get user emails for audit logs
    const userIds = [...new Set(auditData?.map(a => a.user_id) || [])];
    const { data: auditUsers } = await supabase
      .from('users')
      .select('id, email')
      .in('id', userIds);

    const userEmailMap = new Map(auditUsers?.map(u => [u.id, u.email]) || []);

    setAuditLogs(
      auditData?.map(a => ({
        id: a.id,
        action: a.action,
        resourceType: a.resource_type,
        createdAt: a.created_at,
        userEmail: userEmailMap.get(a.user_id) || null,
      })) || []
    );

    setLoading(false);
  };

  const startImpersonation = () => {
    if (org) {
      localStorage.setItem('admin_impersonate_org', JSON.stringify({
        id: org.id,
        name: org.name,
      }));
      window.location.href = '/dashboard';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!org) {
    return null;
  }

  const plan = PLANS[subscription?.plan || 'free'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/accounts"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{org.name}</h1>
            <p className="text-slate-500">{org.slug}</p>
          </div>
        </div>
        <Button onClick={startImpersonation} variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          View as Customer
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-lg font-bold capitalize">{subscription?.plan || 'Free'}</p>
                <p className="text-xs text-slate-500">
                  {subscription?.status === 'active' ? 'Active' : subscription?.status || 'No subscription'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-bold">{users.length}</p>
                <p className="text-xs text-slate-500">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileSignature className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-bold">{templates.length}</p>
                <p className="text-xs text-slate-500">Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Rocket className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-lg font-bold">{deployments.length}</p>
                <p className="text-xs text-slate-500">Deployments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organization Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Organization Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-slate-400" />
                <span className="text-slate-500">Domain:</span>
                <span className="font-medium">{org.domain || 'Not set'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-slate-400" />
                <span className="text-slate-500">Industry:</span>
                <span className="font-medium capitalize">{org.industry || 'General'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-slate-500">Created:</span>
                <span className="font-medium">{new Date(org.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {subscription && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-500">Stripe Customer:</span>
                  <a 
                    href={`https://dashboard.stripe.com/customers/${subscription.stripeCustomerId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {subscription.stripeCustomerId}
                  </a>
                </div>
                {subscription.currentPeriodEnd && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-500">Period End:</span>
                    <span className="font-medium">
                      {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members
            </CardTitle>
            <CardDescription>{users.length} users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="capitalize">{user.role}</Badge>
                    {user.department && (
                      <p className="text-xs text-slate-500 mt-1">{user.department}</p>
                    )}
                  </div>
                </div>
              ))}
              {users.length === 0 && (
                <p className="text-center text-slate-500 py-4">No users found</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSignature className="h-5 w-5" />
              Templates
            </CardTitle>
            <CardDescription>{templates.length} templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {templates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{template.name}</p>
                    <p className="text-xs text-slate-500">
                      Created {new Date(template.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {template.isDefault && (
                    <Badge className="bg-green-100 text-green-700">Default</Badge>
                  )}
                </div>
              ))}
              {templates.length === 0 && (
                <p className="text-center text-slate-500 py-4">No templates created</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Deployments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              Recent Deployments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {deployments.map((deployment) => (
                <div key={deployment.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {deployment.status === 'completed' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : deployment.status === 'failed' ? (
                      <XCircle className="h-4 w-4 text-red-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-amber-600" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{deployment.templateName || 'Unknown'}</p>
                      <p className="text-xs text-slate-500">
                        {deployment.successfulCount}/{deployment.totalUsers} users
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    {new Date(deployment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {deployments.length === 0 && (
                <p className="text-center text-slate-500 py-4">No deployments yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScrollText className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-2 hover:bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm capitalize">
                      {log.action.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">
                    {log.resourceType} • {log.userEmail || 'Unknown user'}
                  </p>
                </div>
              ))}
              {auditLogs.length === 0 && (
                <p className="text-center text-slate-500 py-4">No activity recorded</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
