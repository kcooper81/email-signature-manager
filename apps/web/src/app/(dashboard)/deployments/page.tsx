'use client';

import { useState, useEffect, useMemo } from 'react';
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
  ChevronRight,
  ChevronLeft,
  Search,
  Building2,
  User as UserIcon,
  PartyPopper,
  X,
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string | null;
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const supabase = createClient();
    
    // Load templates
    const { data: templatesData } = await supabase
      .from('signature_templates')
      .select('id, name, description')
      .order('name');
    
    if (templatesData) setTemplates(templatesData);

    // Load recent deployments
    const { data: deploymentsData, error: deploymentsError } = await supabase
      .from('signature_deployments')
      .select('id, status, total_users, successful_count, failed_count, created_at, completed_at, template:signature_templates(name)')
      .order('created_at', { ascending: false })
      .limit(20);
    
    console.log('Deployments loaded:', deploymentsData, deploymentsError);
    if (deploymentsData) setDeployments(deploymentsData as any);

    // Load connections
    const { data: connectionsData } = await supabase
      .from('provider_connections')
      .select('provider, is_active');
    
    if (connectionsData) setConnections(connectionsData);

    // Load users with department
    const { data: usersData } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, department')
      .order('email');
    
    if (usersData) setUsers(usersData);

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
      alert(err.message || 'Failed to start deployment');
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
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4 text-center relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PartyPopper className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Signatures Deployed!
              </h2>
              <p className="text-gray-600">
                Your email signatures have been successfully deployed.
              </p>
            </div>

            {deploymentResult && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-center gap-8">
                  <div>
                    <div className="text-3xl font-bold text-green-600">
                      {deploymentResult.successCount}
                    </div>
                    <div className="text-sm text-gray-500">Successful</div>
                  </div>
                  {deploymentResult.failCount > 0 && (
                    <div>
                      <div className="text-3xl font-bold text-red-600">
                        {deploymentResult.failCount}
                      </div>
                      <div className="text-sm text-gray-500">Failed</div>
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
          <div className="flex items-center gap-2 pt-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === s 
                    ? 'bg-primary text-primary-foreground' 
                    : step > s 
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 mx-1 ${step > s ? 'bg-green-500' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {/* Step 1: Select Template */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium">Step 1: Select Template</h3>
              <p className="text-sm text-muted-foreground">Choose which signature template to deploy</p>
              
              {templates.length === 0 ? (
                <div className="text-center py-8 border rounded-lg">
                  <FileSignature className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No templates yet</p>
                  <Link href="/templates/new">
                    <Button variant="outline" className="mt-4">Create Template</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-3">
                  {templates.map((template) => (
                    <label
                      key={template.id}
                      className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedTemplate === template.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="template"
                        value={template.id}
                        checked={selectedTemplate === template.id}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        className="h-4 w-4"
                      />
                      <div>
                        <p className="font-medium">{template.name}</p>
                        {template.description && (
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
              
              <div className="flex justify-end pt-4">
                <Button onClick={() => setStep(2)} disabled={!canProceedToStep2 || !googleConnected}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Select Recipients */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium">Step 2: Select Recipients</h3>
              <p className="text-sm text-muted-foreground">Choose who should receive this signature</p>
              
              {/* Target type selection */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => { setDeployTarget('me'); setSelectedUsers([]); }}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    deployTarget === 'me' ? 'border-primary bg-primary/5' : 'hover:bg-slate-50'
                  }`}
                >
                  <UserIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">Just Me</p>
                  <p className="text-xs text-muted-foreground">Test on yourself</p>
                </button>
                <button
                  onClick={() => setDeployTarget('selected')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    deployTarget === 'selected' ? 'border-primary bg-primary/5' : 'hover:bg-slate-50'
                  }`}
                  disabled={users.length === 0}
                >
                  <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">Select Users</p>
                  <p className="text-xs text-muted-foreground">Pick specific people</p>
                </button>
                <button
                  onClick={() => { setDeployTarget('all'); setSelectedUsers([]); }}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    deployTarget === 'all' ? 'border-primary bg-primary/5' : 'hover:bg-slate-50'
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
                  <div className="p-3 border-b bg-slate-50 space-y-3">
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
                            className="text-xs px-2 py-1 bg-white border rounded hover:bg-slate-100"
                          >
                            {dept}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* User list - grid layout for better visibility */}
                  <div className="max-h-64 overflow-y-auto p-2">
                    {filteredUsers.length === 0 ? (
                      <p className="text-sm text-muted-foreground p-4 text-center">
                        {users.length === 0 ? (
                          <>No users synced. <Link href="/team" className="text-primary hover:underline">Sync users first</Link></>
                        ) : (
                          'No users match your search'
                        )}
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {filteredUsers.map((user) => (
                          <label
                            key={user.id}
                            className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                              selectedUsers.includes(user.id) 
                                ? 'bg-primary/10 border border-primary/30' 
                                : 'hover:bg-slate-50 border border-transparent'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => toggleUserSelection(user.id)}
                              className="h-4 w-4 rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {user.first_name && user.last_name
                                  ? `${user.first_name} ${user.last_name}`
                                  : user.email.split('@')[0]}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {user.department || user.email}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
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
              <h3 className="font-medium">Step 3: Review & Deploy</h3>
              <p className="text-sm text-muted-foreground">Confirm your deployment settings</p>
              
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

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> This will update the Gmail signature for {getTargetSummary().toLowerCase()}. 
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
    </div>
  );
}
