'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { SignaturePreview } from '@/components/templates/preview';
import type { SignatureBlock } from '@/components/templates/types';
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
  ChevronRight,
  ChevronLeft,
  Search,
  Building2,
  User as UserIcon,
  PartyPopper,
  X,
  Mail,
  Copy,
  Download,
  Check,
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string | null;
  blocks: SignatureBlock[];
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

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  department: string | null;
  company: string | null;
  office_location: string | null;
  title: string | null;
  created_at: string;
  source: 'manual' | 'google' | 'microsoft' | 'hubspot' | null;
}

interface UserDeploymentHistory {
  id: string;
  user_id: string;
  template_id: string;
  status: string;
  deployed_at: string;
  user: {
    email: string;
    first_name: string | null;
    last_name: string | null;
    department: string | null;
  };
  template: {
    name: string;
  };
}

export default function DeploymentsPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Wizard state
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [deployTarget, setDeployTarget] = useState<'all' | 'selected' | 'me'>('me');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [deploying, setDeploying] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [deploymentResult, setDeploymentResult] = useState<{ successCount: number; failCount: number } | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [userDeploymentHistory, setUserDeploymentHistory] = useState<UserDeploymentHistory[]>([]);
  const [showTeamDeployments, setShowTeamDeployments] = useState(true);
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  const [deployError, setDeployError] = useState<string | null>(null);
  
  // Manual copy state (for users without integrations)
  const [showManualCopy, setShowManualCopy] = useState(false);
  const [generatedSignatures, setGeneratedSignatures] = useState<Array<{ userId: string; userName: string; email: string; html: string }>>([]);
  const [generating, setGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const supabase = createClient();
    
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

    // Load templates with blocks for preview - FILTERED BY ORGANIZATION
    const { data: templatesData } = await supabase
      .from('signature_templates')
      .select('id, name, description, blocks')
      .eq('organization_id', organizationId)
      .order('name');
    
    if (templatesData) setTemplates(templatesData);

    // Load recent deployments - FILTERED BY ORGANIZATION
    const { data: deploymentsData, error: deploymentsError } = await supabase
      .from('signature_deployments')
      .select('id, status, total_users, successful_count, failed_count, created_at, completed_at, template:signature_templates(name)')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })
      .limit(20);
    
    if (deploymentsData) setDeployments(deploymentsData as any);

    // Load connections - FILTERED BY ORGANIZATION
    const { data: connectionsData } = await supabase
      .from('provider_connections')
      .select('provider, is_active')
      .eq('organization_id', organizationId);
    
    if (connectionsData) setConnections(connectionsData);

    // Load users with all fields - FILTERED BY ORGANIZATION
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, department, title, created_at')
      .eq('organization_id', organizationId)
      .order('email');
    
    if (usersError) {
      console.error('Failed to load users:', usersError);
    }
    
    if (usersData) {
      // Map to include null values for missing fields
      const mappedUsers = usersData.map(u => ({
        ...u,
        company: null,
        office_location: null,
        source: null,
      }));
      setUsers(mappedUsers as any);
    }

    // Load user deployment history - FILTERED BY ORGANIZATION (via user relation)
    const { data: historyData } = await supabase
      .from('user_deployment_history')
      .select(`
        id,
        user_id,
        template_id,
        status,
        deployed_at,
        user:users!inner(email, first_name, last_name, department, organization_id),
        template:signature_templates(name)
      `)
      .eq('user.organization_id', organizationId)
      .order('deployed_at', { ascending: false })
      .limit(100);
    
    if (historyData) {
      setUserDeploymentHistory(historyData as any);
    }

    setLoading(false);
  };

  // Get unique departments
  const departments = useMemo(() => {
    const depts = new Set<string>();
    users.forEach(u => {
      if (u.department) depts.add(u.department);
    });
    return Array.from(depts).sort();
  }, [users]);

  // Filter users by search and department
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = searchQuery === '' || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDepartment === 'all' || user.department === selectedDepartment;
      return matchesSearch && matchesDept;
    });
  }, [users, searchQuery, selectedDepartment]);

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllFiltered = () => {
    const filteredIds = filteredUsers.map(u => u.id);
    setSelectedUsers(prev => [...new Set([...prev, ...filteredIds])]);
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  const selectByDepartment = (dept: string) => {
    const deptUsers = users.filter(u => u.department === dept).map(u => u.id);
    setSelectedUsers(prev => [...new Set([...prev, ...deptUsers])]);
  };

  const startDeployment = async () => {
    setDeploying(true);

    try {
      const response = await fetch('/api/deployments/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          templateId: selectedTemplate,
          target: deployTarget,
          userIds: deployTarget === 'selected' ? selectedUsers : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Deployment failed');
      }

      // Show success modal
      setDeploymentResult({
        successCount: data.successCount || 0,
        failCount: data.failCount || 0,
      });
      setShowSuccessModal(true);

      // Reset wizard and reload
      setStep(1);
      setSelectedTemplate('');
      setDeployTarget('me');
      setSelectedUsers([]);
      await loadData();
    } catch (err: any) {
      setDeployError(err.message || 'Failed to start deployment');
    } finally {
      setDeploying(false);
    }
  };

  const canProceedToStep2 = selectedTemplate !== '';
  const canProceedToStep3 = deployTarget === 'me' || deployTarget === 'all' || (deployTarget === 'selected' && selectedUsers.length > 0);
  
  const getSelectedTemplate = () => templates.find(t => t.id === selectedTemplate);
  
  const getTargetSummary = () => {
    if (deployTarget === 'me') return 'Just yourself';
    if (deployTarget === 'all') return `All ${users.length} users`;
    return `${selectedUsers.length} selected user${selectedUsers.length !== 1 ? 's' : ''}`;
  };

  // Manual copy functions
  const generateSignaturesManually = async () => {
    if (!selectedTemplate) {
      setDeployError('Please select a template first');
      return;
    }

    setGenerating(true);
    setDeployError(null);

    try {
      // Get target user IDs
      let targetUserIds: string[] = [];
      if (deployTarget === 'me') {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: userData } = await supabase
            .from('users')
            .select('id')
            .eq('auth_id', user.id)
            .single();
          if (userData) targetUserIds = [userData.id];
        }
      } else if (deployTarget === 'all') {
        targetUserIds = users.map(u => u.id);
      } else {
        targetUserIds = selectedUsers;
      }

      const response = await fetch('/api/signatures/generate-for-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplate,
          userIds: targetUserIds,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate signatures');
      }

      setGeneratedSignatures(data.signatures);
      setShowManualCopy(true);
    } catch (err: any) {
      setDeployError(err.message || 'Failed to generate signatures');
    } finally {
      setGenerating(false);
    }
  };

  const copySignature = async (html: string, userId: string) => {
    try {
      await navigator.clipboard.writeText(html);
      setCopiedId(userId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      setDeployError('Failed to copy to clipboard');
    }
  };

  const downloadSignature = (html: string, userName: string) => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `signature-${userName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAllSignatures = () => {
    generatedSignatures.forEach(sig => {
      downloadSignature(sig.html, sig.userName);
    });
  };

  const closeManualCopyModal = () => {
    setShowManualCopy(false);
    setGeneratedSignatures([]);
  };

  const googleConnected = connections.some(c => c.provider === 'google' && c.is_active);
  const microsoftConnected = connections.some(c => c.provider === 'microsoft' && c.is_active);
  const hasEmailProvider = googleConnected || microsoftConnected;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
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
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl shadow-2xl p-8 max-w-md mx-4 text-center relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-6">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <PartyPopper className="h-10 w-10 text-emerald-500" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Signatures Deployed!
              </h2>
              <p className="text-muted-foreground">
                Your email signatures have been successfully deployed.
              </p>
            </div>

            {deploymentResult && (
              <div className="bg-muted rounded-lg p-4 mb-6">
                <div className="flex justify-center gap-8">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-500">
                      {deploymentResult.successCount}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Successful</div>
                  </div>
                  {deploymentResult.failCount > 0 && (
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-red-600">
                        {deploymentResult.failCount}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Failed</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Manual Copy Modal */}
      {showManualCopy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl shadow-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">Copy Signatures Manually</h2>
                <p className="text-sm text-muted-foreground">
                  Copy the HTML signature and paste it into your email client settings
                </p>
              </div>
              <button
                onClick={closeManualCopyModal}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {generatedSignatures.length > 0 && (
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium">
                  {generatedSignatures.length} signature{generatedSignatures.length !== 1 ? 's' : ''} generated
                </p>
                <Button variant="outline" size="sm" onClick={downloadAllSignatures}>
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto space-y-3">
              {generatedSignatures.map((sig) => (
                <div key={sig.userId} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium">{sig.userName}</p>
                      <p className="text-sm text-muted-foreground">{sig.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copySignature(sig.html, sig.userId)}
                      >
                        {copiedId === sig.userId ? (
                          <>
                            <Check className="mr-2 h-4 w-4 text-emerald-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy HTML
                          </>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadSignature(sig.html, sig.userName)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-muted border rounded p-3 max-h-32 overflow-auto">
                    <div dangerouslySetInnerHTML={{ __html: sig.html }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <Button onClick={closeManualCopyModal} className="w-full">
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error message */}
      {deployError && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p>{deployError}</p>
          </div>
          <button onClick={() => setDeployError(null)} className="text-destructive hover:text-destructive/80">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Deployments</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Deploy email signatures to your team
        </p>
      </div>

      {/* Connection warning with manual option */}
      {!hasEmailProvider && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-amber-600 font-medium">
                No email provider connected
              </p>
              <p className="text-amber-600 text-sm mt-1">
                Connect Google Workspace or Microsoft 365 to auto-deploy signatures, or copy them manually.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href="/integrations">
                <Button variant="outline" size="sm">
                  Connect Provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* New deployment wizard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            New Deployment
          </CardTitle>
          <CardDescription>
            Follow the steps to deploy signatures to your team
          </CardDescription>
          {/* Step indicator */}
          <div className="flex items-center justify-between pt-6 pb-2">
            {[
              { num: 1, label: 'Select Template' },
              { num: 2, label: 'Choose Recipients' },
              { num: 3, label: 'Review & Deploy' }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step === s.num 
                      ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20'
                      : step > s.num
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-muted text-muted-foreground border-2 border-border'
                  }`}>
                    {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
                  </div>
                  <div>
                    <p className={`text-xs sm:text-sm font-medium ${
                      step === s.num ? 'text-primary' : step > s.num ? 'text-emerald-600' : 'text-muted-foreground'
                    }`}>
                      <span className="hidden sm:inline">{s.label}</span>
                      <span className="sm:hidden">{s.label.split(' ')[0]}</span>
                    </p>
                  </div>
                </div>
                {idx < 2 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-1 rounded-full transition-all ${
                      step > s.num ? 'bg-emerald-500' : 'bg-muted'
                    }`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {/* Step 1: Select Template */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="border-b pb-3 mb-4">
                <h3 className="text-lg font-semibold text-foreground">Select Template</h3>
                <p className="text-sm text-muted-foreground mt-1">Choose which signature template to deploy</p>
              </div>
              
              {templates.length === 0 ? (
                <div className="text-center py-8 border rounded-lg">
                  <FileSignature className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No templates yet</p>
                  <Link href="/templates/new">
                    <Button variant="outline" className="mt-4">Create Template</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {templates.map((template) => (
                    <label
                      key={template.id}
                      className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all shadow-sm ${
                        selectedTemplate === template.id
                          ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/30 hover:bg-secondary hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <input
                          type="radio"
                          name="template"
                          value={template.id}
                          checked={selectedTemplate === template.id}
                          onChange={(e) => setSelectedTemplate(e.target.value)}
                          className="h-4 w-4 mt-1"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{template.name}</p>
                          {template.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
                          )}
                        </div>
                      </div>
                      {/* Template preview */}
                      <div className="bg-card border rounded overflow-hidden" style={{ maxHeight: '200px' }}>
                        <div className="scale-50 origin-top-left" style={{ width: '200%', height: '200%' }}>
                          <SignaturePreview blocks={template.blocks || []} />
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-4">
                {!hasEmailProvider && (
                  <Button 
                    variant="outline" 
                    onClick={generateSignaturesManually} 
                    disabled={!canProceedToStep2 || generating}
                  >
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Manually
                      </>
                    )}
                  </Button>
                )}
                <Button onClick={() => setStep(2)} disabled={!canProceedToStep2 || !hasEmailProvider}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Select Recipients */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="border-b pb-3 mb-4">
                <h3 className="text-lg font-semibold text-foreground">Select Recipients</h3>
                <p className="text-sm text-muted-foreground mt-1">Choose who should receive this signature</p>
              </div>
              
              {/* Target type selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <button
                  onClick={() => { setDeployTarget('me'); setSelectedUsers([]); }}
                  className={`p-4 border-2 rounded-lg text-center transition-all shadow-sm ${
                    deployTarget === 'me' ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20' : 'border-border hover:border-primary/30 hover:bg-secondary hover:shadow-md'
                  }`}
                >
                  <UserIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">Just Me</p>
                  <p className="text-xs text-muted-foreground">Test on yourself</p>
                </button>
                <button
                  onClick={() => setDeployTarget('selected')}
                  className={`p-4 border-2 rounded-lg text-center transition-all shadow-sm ${
                    deployTarget === 'selected' ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20' : 'border-border hover:border-primary/30 hover:bg-secondary hover:shadow-md'
                  }`}
                  disabled={users.length === 0}
                >
                  <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">Select Users</p>
                  <p className="text-xs text-muted-foreground">Pick specific people</p>
                </button>
                <button
                  onClick={() => { setDeployTarget('all'); setSelectedUsers([]); }}
                  className={`p-4 border-2 rounded-lg text-center transition-all shadow-sm ${
                    deployTarget === 'all' ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20' : 'border-border hover:border-primary/30 hover:bg-secondary hover:shadow-md'
                  }`}
                  disabled={users.length === 0}
                >
                  <Building2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">All Users</p>
                  <p className="text-xs text-muted-foreground">{users.length} people</p>
                </button>
              </div>

              {/* User selection panel */}
              {deployTarget === 'selected' && (
                <div className="border rounded-lg">
                  <div className="p-3 border-b bg-muted space-y-3">
                    {/* Search and filter row */}
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search users..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full h-9 pl-9 pr-3 border rounded-md text-sm"
                        />
                      </div>
                      <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="h-9 px-3 border rounded-md text-sm"
                      >
                        <option value="all">All Departments</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    {/* Quick actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {selectedUsers.length} selected of {filteredUsers.length} shown
                      </span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={selectAllFiltered}>
                          Select Visible
                        </Button>
                        <Button variant="ghost" size="sm" onClick={clearSelection}>
                          Clear All
                        </Button>
                      </div>
                    </div>
                    {/* Department quick select */}
                    {departments.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-muted-foreground py-1">Quick select:</span>
                        {departments.map(dept => (
                          <button
                            key={dept}
                            onClick={() => selectByDepartment(dept)}
                            className="text-xs px-2 py-1 bg-background border rounded hover:bg-secondary"
                          >
                            {dept}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* User table - matches team page format */}
                  <div className="max-h-96 overflow-y-auto overflow-x-auto">
                    {filteredUsers.length === 0 ? (
                      <p className="text-sm text-muted-foreground p-4 text-center">
                        {users.length === 0 ? (
                          <>No users synced. <Link href="/team" className="text-primary hover:underline">Sync users first</Link></>
                        ) : (
                          'No users match your search'
                        )}
                      </p>
                    ) : (
                      <table className="w-full min-w-[600px]">
                        <thead className="bg-muted/50 border-b sticky top-0">
                          <tr>
                            <th className="w-12 p-2 text-left">
                              <input
                                type="checkbox"
                                checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                onChange={selectAllFiltered}
                                className="h-4 w-4 rounded"
                              />
                            </th>
                            <th className="p-2 text-left text-xs font-medium">Name</th>
                            <th className="p-2 text-left text-xs font-medium">Email</th>
                            <th className="p-2 text-left text-xs font-medium">Department</th>
                            <th className="p-2 text-left text-xs font-medium hidden md:table-cell">Company</th>
                            <th className="p-2 text-left text-xs font-medium hidden md:table-cell">Office</th>
                            <th className="p-2 text-left text-xs font-medium hidden md:table-cell">Title</th>
                            <th className="p-2 text-left text-xs font-medium hidden md:table-cell">Added</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-secondary/50 transition-colors">
                              <td className="p-2">
                                <input
                                  type="checkbox"
                                  checked={selectedUsers.includes(user.id)}
                                  onChange={() => toggleUserSelection(user.id)}
                                  className="h-4 w-4 rounded"
                                />
                              </td>
                              <td className="p-2 text-sm font-medium">
                                {user.first_name && user.last_name
                                  ? `${user.first_name} ${user.last_name}`
                                  : user.email.split('@')[0]}
                              </td>
                              <td className="p-2 text-sm text-muted-foreground">{user.email}</td>
                              <td className="p-2 text-sm">{user.department || '-'}</td>
                              <td className="p-2 text-sm hidden md:table-cell">{user.company || '-'}</td>
                              <td className="p-2 text-sm text-muted-foreground hidden md:table-cell">{user.office_location || '-'}</td>
                              <td className="p-2 text-sm text-muted-foreground hidden md:table-cell">{user.title || '-'}</td>
                              <td className="p-2 text-sm text-muted-foreground hidden md:table-cell">
                                {new Date(user.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={!canProceedToStep3}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Deploy */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="border-b pb-3 mb-4">
                <h3 className="text-lg font-semibold text-foreground">Review & Deploy</h3>
                <p className="text-sm text-muted-foreground mt-1">Confirm your deployment settings</p>
              </div>
              
              <div className="border rounded-lg divide-y">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Template</p>
                    <p className="font-medium">{getSelectedTemplate()?.name}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setStep(1)}>Change</Button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Recipients</p>
                    <p className="font-medium">{getTargetSummary()}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setStep(2)}>Change</Button>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <p className="text-sm text-amber-600">
                  <strong>Note:</strong> This will update the email signature for {getTargetSummary().toLowerCase()}. 
                  The change will take effect immediately.
                </p>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={startDeployment} disabled={deploying}>
                  {deploying ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deploying...</>
                  ) : (
                    <><Rocket className="mr-2 h-4 w-4" /> Deploy Now</>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View deployment history button */}
      {deployments.length > 0 && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setShowHistory(!showHistory)}>
            <FileSignature className="mr-2 h-4 w-4" />
            {showHistory ? 'Hide' : 'View'} Deployment History ({deployments.length})
          </Button>
        </div>
      )}

      {/* Recent deployments - collapsible */}
      {showHistory && (
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
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex items-center justify-between">
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
                      <div className="flex items-center gap-2 sm:gap-6 flex-wrap">
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {getStatusText(deployment.status)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {deployment.successful_count}/{deployment.total_users} users
                          </p>
                        </div>
                        {deployment.failed_count > 0 && (
                          <span className="text-xs bg-red-500/10 text-red-600 px-2 py-1 rounded">
                            {deployment.failed_count} failed
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Deployment summary */}
                    <div className="mt-3 pt-3 border-t flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {deployment.total_users} user{deployment.total_users !== 1 ? 's' : ''} targeted
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Team Deployment Status Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Deployment Status
              </CardTitle>
              <CardDescription>
                See which team members have received signature deployments
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowTeamDeployments(!showTeamDeployments)}
            >
              {showTeamDeployments ? 'Hide' : 'Show'}
            </Button>
          </div>
        </CardHeader>
        {showTeamDeployments && (
          <CardContent>
            {/* Search filter */}
            <div className="mb-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={teamSearchQuery}
                  onChange={(e) => setTeamSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 border rounded-md text-sm"
                />
              </div>
            </div>

            {users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No team members yet</p>
                <p className="text-sm">
                  <Link href="/team" className="text-primary hover:underline">Add team members</Link> to see their deployment status
                </p>
              </div>
            ) : (
              <div className="border rounded-lg">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead className="bg-muted/50 border-b">
                      <tr>
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground">Team Member</th>
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground">Email</th>
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground">Department</th>
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground hidden sm:table-cell">Current Signature</th>
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground hidden sm:table-cell">Last Deployed</th>
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter(user => {
                          if (!teamSearchQuery) return true;
                          const search = teamSearchQuery.toLowerCase();
                          return (
                            user.email.toLowerCase().includes(search) ||
                            `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase().includes(search)
                          );
                        })
                        .map((user) => {
                          // Find the most recent deployment for this user
                          const userHistory = userDeploymentHistory.find(h => h.user_id === user.id);
                          
                          return (
                            <tr key={user.id} className="border-b last:border-b-0 hover:bg-secondary/50 transition-colors">
                              <td className="p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-sm font-medium text-primary">
                                      {(user.first_name?.[0] || user.email[0]).toUpperCase()}
                                    </span>
                                  </div>
                                  <span className="font-medium text-sm">
                                    {user.first_name && user.last_name
                                      ? `${user.first_name} ${user.last_name}`
                                      : user.email.split('@')[0]}
                                  </span>
                                </div>
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">{user.email}</td>
                              <td className="p-3 text-sm">{user.department || '-'}</td>
                              <td className="p-3 text-sm hidden sm:table-cell">
                                {userHistory?.template?.name ? (
                                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                                    <FileSignature className="h-3 w-3" />
                                    {userHistory.template.name}
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground">No signature</span>
                                )}
                              </td>
                              <td className="p-3 text-sm text-muted-foreground hidden sm:table-cell">
                                {userHistory?.deployed_at
                                  ? new Date(userHistory.deployed_at).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })
                                  : '-'}
                              </td>
                              <td className="p-3">
                                {userHistory ? (
                                  userHistory.status === 'completed' ? (
                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                                      <CheckCircle2 className="h-3 w-3" />
                                      Deployed
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-500/10 px-2 py-1 rounded">
                                      <XCircle className="h-3 w-3" />
                                      Failed
                                    </span>
                                  )
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                                    <Clock className="h-3 w-3" />
                                    Not deployed
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
