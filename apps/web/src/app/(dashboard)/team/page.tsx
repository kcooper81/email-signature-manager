'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Avatar, EmptyState, Input, Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter, Label } from '@/components/ui';
import { PageHeader } from '@/components/dashboard';
import { 
  Users as UsersIcon, 
  RefreshCw, 
  Loader2, 
  CheckCircle2,
  AlertCircle,
  Mail,
  Building2,
  Plus,
  Search,
  ArrowUpDown,
  Cloud,
  User as UserIcon,
  Lock,
} from 'lucide-react';
import { useSubscription } from '@/hooks/use-subscription';

interface TeamMember {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  department: string | null;
  role: string;
  source: 'manual' | 'google' | 'microsoft' | null;
  created_at: string;
  updated_at: string;
}

interface Connection {
  provider: string;
  is_active: boolean;
}

type SortField = 'name' | 'email' | 'department' | 'created_at';
type SortOrder = 'asc' | 'desc';
type SourceFilter = 'all' | 'manual' | 'synced';

export default function TeamMembersPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ synced: number; errors: number } | null>(null);
  const { canAddTeamMember, plan, usage, limits } = useSubscription();
  
  // Search, sort, filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  
  // Add team member modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    email: '',
    first_name: '',
    last_name: '',
    title: '',
    department: '',
  });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const supabase = createClient();
    
    // Load members
    const { data: membersData } = await supabase
      .from('users')
      .select('*')
      .order('email');
    
    if (membersData) {
      setMembers(membersData);
    }

    // Load connections
    const { data: connectionsData } = await supabase
      .from('provider_connections')
      .select('provider, is_active');
    
    if (connectionsData) setConnections(connectionsData);

    setLoading(false);
  };

  const syncUsers = async () => {
    setSyncing(true);
    setSyncResult(null);

    try {
      const response = await fetch('/api/users/sync', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sync failed');
      }

      setSyncResult({ synced: data.synced, errors: data.errors });
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to sync users');
    } finally {
      setSyncing(false);
    }
  };

  const addMember = async () => {
    if (!newMember.email) {
      alert('Email is required');
      return;
    }

    setAdding(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get organization_id from current user
      const { data: currentUser } = await supabase
        .from('users')
        .select('organization_id')
        .eq('auth_id', user?.id)
        .single();

      if (!currentUser?.organization_id) {
        throw new Error('Organization not found');
      }

      const { error } = await supabase.from('users').insert({
        email: newMember.email,
        first_name: newMember.first_name || null,
        last_name: newMember.last_name || null,
        organization_id: currentUser.organization_id,
        role: 'member',
        source: 'manual',
      });

      if (error) throw error;

      setShowAddModal(false);
      setNewMember({ email: '', first_name: '', last_name: '', title: '', department: '' });
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to add team member');
    } finally {
      setAdding(false);
    }
  };

  const googleConnected = connections.some(c => c.provider === 'google' && c.is_active);

  // Get unique departments for filter
  const departments = useMemo(() => {
    const depts = new Set<string>();
    members.forEach(e => {
      if (e.department) depts.add(e.department);
    });
    return Array.from(depts).sort();
  }, [members]);

  // Filtered and sorted members
  const filteredMembers = useMemo(() => {
    let result = [...members];

    // Filter by source
    if (sourceFilter === 'manual') {
      result = result.filter(e => e.source === 'manual' || e.source === null);
    } else if (sourceFilter === 'synced') {
      result = result.filter(e => e.source === 'google' || e.source === 'microsoft');
    }

    // Filter by department
    if (departmentFilter !== 'all') {
      result = result.filter(e => e.department === departmentFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.email.toLowerCase().includes(query) ||
        (e.first_name?.toLowerCase() || '').includes(query) ||
        (e.last_name?.toLowerCase() || '').includes(query) ||
        (e.department?.toLowerCase() || '').includes(query) ||
        (e.title?.toLowerCase() || '').includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      let aVal: string = '';
      let bVal: string = '';

      switch (sortField) {
        case 'name':
          aVal = `${a.first_name || ''} ${a.last_name || ''}`.trim() || a.email;
          bVal = `${b.first_name || ''} ${b.last_name || ''}`.trim() || b.email;
          break;
        case 'email':
          aVal = a.email;
          bVal = b.email;
          break;
        case 'department':
          aVal = a.department || '';
          bVal = b.department || '';
          break;
        case 'created_at':
          aVal = a.created_at;
          bVal = b.created_at;
          break;
      }

      const comparison = aVal.localeCompare(bVal);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [members, searchQuery, sortField, sortOrder, sourceFilter, departmentFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const canAdd = canAddTeamMember();
  const memberLimitReached = !canAdd;

  const actionButtons = (
    <div className="flex items-center gap-2">
      {memberLimitReached ? (
        <Button variant="outline" className="border-violet-300 text-violet-700 hover:bg-violet-50" asChild>
          <a href="/settings/billing">
            <Lock className="mr-2 h-4 w-4" />
            Upgrade to Add More
          </a>
        </Button>
      ) : (
        <Button variant="outline" onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      )}
      {googleConnected && (
        <Button onClick={syncUsers} disabled={syncing || memberLimitReached}>
          {syncing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Syncing...
            </>
          ) : memberLimitReached ? (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Limit Reached
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync from Google
            </>
          )}
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Members"
        description="Manage team members and their email signatures"
        action={actionButtons}
      />

      {/* Usage indicator */}
      {limits.maxTeamMembers !== -1 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {usage.teamMemberCount} / {limits.maxTeamMembers} team members
          </span>
          {memberLimitReached && (
            <Badge variant="secondary" className="text-xs">
              Limit reached
            </Badge>
          )}
        </div>
      )}

      {/* Sync result */}
      {syncResult && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <p className="text-emerald-800">
            Synced {syncResult.synced} members
            {syncResult.errors > 0 && ` (${syncResult.errors} errors)`}
          </p>
        </div>
      )}

      {/* Employees list */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                Team Members
              </CardTitle>
              <CardDescription>
                {filteredMembers.length} of {members.length} member{members.length !== 1 ? 's' : ''}
              </CardDescription>
            </div>
          </div>

          {/* Search and filters */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Source filter */}
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              {(['all', 'manual', 'synced'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSourceFilter(filter)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    sourceFilter === filter
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {filter === 'all' ? 'All' : filter === 'manual' ? 'Manual' : 'Synced'}
                </button>
              ))}
            </div>

            {/* Department filter */}
            {departments.length > 0 && (
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="text-sm border rounded-lg px-2 py-1.5 bg-background"
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Sort dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort:</span>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="text-sm border rounded-lg px-2 py-1.5 bg-background"
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="department">Department</option>
                <option value="created_at">Date Added</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded"
              >
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <EmptyState
              icon={UsersIcon}
              title="No members yet"
              description="Add members manually or sync from Google Workspace"
              action={
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Member
                </Button>
              }
            />
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No members match your search or filters.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMembers.map((emp) => (
                <div
                  key={emp.id}
                  className="flex items-center justify-between p-4 border rounded-xl hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar 
                      alt={`${emp.first_name || ''} ${emp.last_name || ''}`}
                      fallback={`${(emp.first_name?.[0] || emp.email[0]).toUpperCase()}${emp.last_name?.[0]?.toUpperCase() || ''}`}
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        {emp.first_name && emp.last_name 
                          ? `${emp.first_name} ${emp.last_name}`
                          : emp.email}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {emp.email}
                        </span>
                        {emp.department && (
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {emp.department}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {emp.title && (
                      <span className="text-sm text-muted-foreground">
                        {emp.title}
                      </span>
                    )}
                    {/* Source badge */}
                    <Badge variant={emp.source === 'google' || emp.source === 'microsoft' ? 'info' : 'outline'}>
                      {emp.source === 'google' || emp.source === 'microsoft' ? (
                        <><Cloud className="h-3 w-3 mr-1" />Synced</>
                      ) : (
                        <><UserIcon className="h-3 w-3 mr-1" />Manual</>
                      )}
                    </Badge>
                    <Badge variant={
                      emp.role === 'owner' 
                        ? 'default'
                        : emp.role === 'admin'
                        ? 'info'
                        : 'secondary'
                    }>
                      {emp.role}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Employee Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalHeader>
          <ModalTitle>Add Employee</ModalTitle>
          <ModalDescription>
            Add a team member manually. They will be available for signature deployments.
          </ModalDescription>
        </ModalHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={newMember.first_name}
                onChange={(e) => setNewMember({ ...newMember, first_name: e.target.value })}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={newMember.last_name}
                onChange={(e) => setNewMember({ ...newMember, last_name: e.target.value })}
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              placeholder="john@company.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={newMember.title}
              onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
              placeholder="Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={newMember.department}
              onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
              placeholder="Engineering"
            />
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button onClick={addMember} disabled={adding}>
            {adding ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </>
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
