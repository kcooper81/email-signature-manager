'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Rocket, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  Loader2,
  Users,
  FileSignature,
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
}

interface Deployment {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  total_users: number;
  successful_count: number;
  failed_count: number;
  created_at: string;
  completed_at: string | null;
  template: { name: string } | null;
}

interface Connection {
  provider: string;
  is_active: boolean;
}

export default function DeploymentsPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [deploying, setDeploying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const supabase = createClient();
    
    // Load templates
    const { data: templatesData } = await supabase
      .from('signature_templates')
      .select('id, name')
      .order('name');
    
    if (templatesData) setTemplates(templatesData);

    // Load recent deployments
    const { data: deploymentsData } = await supabase
      .from('signature_deployments')
      .select('id, status, total_users, successful_count, failed_count, created_at, completed_at, template:signature_templates(name)')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (deploymentsData) setDeployments(deploymentsData as any);

    // Load connections
    const { data: connectionsData } = await supabase
      .from('provider_connections')
      .select('provider, is_active');
    
    if (connectionsData) setConnections(connectionsData);

    setLoading(false);
  };

  const startDeployment = async () => {
    if (!selectedTemplate) {
      alert('Please select a template');
      return;
    }

    setDeploying(true);

    try {
      const response = await fetch('/api/deployments/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: selectedTemplate }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Deployment failed');
      }

      // Reload deployments
      await loadData();
      setSelectedTemplate('');
    } catch (err: any) {
      alert(err.message || 'Failed to start deployment');
    } finally {
      setDeploying(false);
    }
  };

  const googleConnected = connections.some(c => c.provider === 'google' && c.is_active);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'running':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-amber-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      case 'running':
        return 'In Progress';
      default:
        return 'Pending';
    }
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
        <h1 className="text-3xl font-bold tracking-tight">Deployments</h1>
        <p className="text-muted-foreground">
          Deploy email signatures to your team
        </p>
      </div>

      {/* Connection warning */}
      {!googleConnected && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <div className="flex-1">
            <p className="text-amber-800">
              Connect Google Workspace to deploy signatures to Gmail.
            </p>
          </div>
          <Link href="/integrations">
            <Button variant="outline" size="sm">
              Connect Now
            </Button>
          </Link>
        </div>
      )}

      {/* New deployment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            New Deployment
          </CardTitle>
          <CardDescription>
            Select a template and deploy it to all users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                Select Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full h-10 px-3 border rounded-md"
                disabled={!googleConnected}
              >
                <option value="">Choose a template...</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            <Button 
              onClick={startDeployment} 
              disabled={!googleConnected || !selectedTemplate || deploying}
            >
              {deploying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Deploy Now
                </>
              )}
            </Button>
          </div>

          {templates.length === 0 && (
            <p className="text-sm text-muted-foreground mt-4">
              No templates yet.{' '}
              <Link href="/templates/new" className="text-primary hover:underline">
                Create one first
              </Link>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Recent deployments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
          <CardDescription>
            History of signature deployments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {deployments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileSignature className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No deployments yet</p>
              <p className="text-sm">Deploy your first signature above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {deployments.map((deployment) => (
                <div
                  key={deployment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(deployment.status)}
                    <div>
                      <p className="font-medium">
                        {deployment.template?.name || 'Unknown Template'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(deployment.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {getStatusText(deployment.status)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {deployment.successful_count}/{deployment.total_users} users
                      </p>
                    </div>
                    {deployment.failed_count > 0 && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                        {deployment.failed_count} failed
                      </span>
                    )}
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
