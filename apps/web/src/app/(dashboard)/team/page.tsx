'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Avatar, EmptyState, Input, Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter, Label } from '@/components/ui';
import { PageHeader } from '@/components/dashboard';
import { EditMemberModal } from './edit-member-modal';
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
  FileSignature,
  Copy,
  Download,
  X,
  Shield,
  UserPlus,
} from 'lucide-react';
import { useSubscription, usePayGatesBypass } from '@/hooks/use-subscription';
import { useMspContext } from '@/hooks/use-msp-context';

interface TeamMember {
  id: string;
  email: string;
  auth_id: string | null;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  department: string | null;
  company: string | null;
  office_location: string | null;
  role: string;
  source: 'manual' | 'google' | 'microsoft' | 'hubspot' | null;
  calendly_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  github_url: string | null;
  personal_website: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  youtube_url: string | null;
  google_calendar_enabled: boolean | null;
  google_booking_url: string | null;
  ooo_banner_enabled: boolean | null;
  ooo_custom_message: string | null;
  created_at: string;
  updated_at: string;
}

interface Connection {
  provider: string;
  is_active: boolean;
}

interface Template {
  id: string;
  name: string;
  description: string | null;
}

interface GeneratedSignature {
  userId: string;
  userName: string;
  email: string;
  html: string;
}

type SortField = 'name' | 'email' | 'department' | 'company' | 'office_location' | 'title' | 'created_at' | 'source' | 'role';
type SortOrder = 'asc' | 'desc';
type SourceFilter = 'all' | 'manual' | 'synced';

export default function TeamMembersPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ synced: number; errors: number } | null>(null);
  const { plan, usage, limits, refresh } = useSubscription();
  const devBypass = usePayGatesBypass();
  
  // Check if user can add more team members
  const canAddTeamMember = () => devBypass || limits.maxTeamMembers === -1 || usage.teamMemberCount < limits.maxTeamMembers;
  
  // Signature sharing state
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [generatedSignatures, setGeneratedSignatures] = useState<GeneratedSignature[]>([]);
  const [generating, setGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
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
    calendly_url: '',
    linkedin_url: '',
    twitter_url: '',
    github_url: '',
    personal_website: '',
    instagram_url: '',
    facebook_url: '',
    youtube_url: '',
  });
  const [adding, setAdding] = useState(false);
  
  // Edit team member modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editForm, setEditForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    title: '',
    department: '',
    calendly_url: '',
    linkedin_url: '',
    twitter_url: '',
    github_url: '',
    personal_website: '',
    instagram_url: '',
    facebook_url: '',
    youtube_url: '',
    self_manage_enabled: true,
    google_calendar_enabled: false,
    google_booking_url: '',
    ooo_banner_enabled: true,
    ooo_custom_message: '',
  });
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // Invite state
  const [inviting, setInviting] = useState(false);
  
  // Admin invite modal state
  const [showAdminInviteModal, setShowAdminInviteModal] = useState(false);
  const [adminInviteForm, setAdminInviteForm] = useState({ email: '', first_name: '', last_name: '' });
  const [invitingAdmin, setInvitingAdmin] = useState(false);
  
  // Role change state
  const [changingRole, setChangingRole] = useState<string | null>(null);
  
  // Current user role (to check permissions)
  const [currentUserRole, setCurrentUserRole] = useState<string>('member');
  
  // Organization settings for calendar integration
  const [orgCalendarEnabled, setOrgCalendarEnabled] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { currentClientOrg } = useMspContext();

  useEffect(() => {
    loadData();
    loadTemplates();
  }, [currentClientOrg]); // Reload when MSP context changes

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

    // Use MSP client org if viewing a client, otherwise use user's own org
    const effectiveOrgId = currentClientOrg?.id || currentUser.organization_id;

    // Load members - ONLY for effective organization
    const { data: membersData } = await supabase
      .from('users')
      .select('*')
      .eq('organization_id', effectiveOrgId)
      .order('email');
    
    if (membersData) {
      setMembers(membersData);
      // Find current user's role
      const currentUserData = membersData.find(m => m.auth_id === user.id);
      if (currentUserData) {
        setCurrentUserRole(currentUserData.role);
      }
    }

    // Load connections - ONLY for effective organization
    const { data: connectionsData } = await supabase
      .from('provider_connections')
      .select('provider, is_active')
      .eq('organization_id', effectiveOrgId);
    
    if (connectionsData) setConnections(connectionsData);

    // Load organization settings for calendar integration
    const { data: orgSettingsData } = await supabase
      .from('organization_settings')
      .select('google_calendar_enabled')
      .eq('organization_id', effectiveOrgId)
      .maybeSingle();
    
    if (orgSettingsData) {
      setOrgCalendarEnabled(orgSettingsData.google_calendar_enabled ?? false);
    }

    setLoading(false);
  };

  const loadTemplates = async () => {
    const supabase = createClient();
    
    // Get current user's organization
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) return;

    // Load templates - ONLY for current organization
    const { data } = await supabase
      .from('signature_templates')
      .select('id, name, description')
      .eq('organization_id', currentUser.organization_id)
      .order('name');
    
    if (data) setTemplates(data);
  };

  const toggleMemberSelection = (memberId: string) => {
    const newSelection = new Set(selectedMembers);
    if (newSelection.has(memberId)) {
      newSelection.delete(memberId);
    } else {
      newSelection.add(memberId);
    }
    setSelectedMembers(newSelection);
  };

  const selectAllMembers = () => {
    if (selectedMembers.size === filteredMembers.length) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(filteredMembers.map(m => m.id)));
    }
  };

  const generateSignatures = async () => {
    if (!selectedTemplate || selectedMembers.size === 0) {
      setErrorMessage('Please select a template and at least one team member');
      return;
    }
    setErrorMessage(null);

    setGenerating(true);
    try {
      const response = await fetch('/api/signatures/generate-for-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplate,
          userIds: Array.from(selectedMembers),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate signatures');
      }

      setGeneratedSignatures(data.signatures);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to generate signatures');
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
      setErrorMessage('Failed to copy to clipboard');
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

  const closeShareModal = () => {
    setShowShareModal(false);
    setSelectedTemplate('');
    setGeneratedSignatures([]);
    setSelectedMembers(new Set());
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
      // Refresh subscription usage counts
      refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to sync users');
    } finally {
      setSyncing(false);
    }
  };

  const addMember = async () => {
    if (!newMember.email) {
      setErrorMessage('Email is required');
      return;
    }

    // Check if user can add more team members
    if (!canAddTeamMember()) {
      setErrorMessage(`Team member limit reached! Your ${plan.name} plan allows up to ${limits.maxTeamMembers} team members. You currently have ${usage.teamMemberCount}. Please upgrade your plan to add more team members.`);
      setShowAddModal(false);
      return;
    }
    setErrorMessage(null);

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
        title: newMember.title || null,
        department: newMember.department || null,
        calendly_url: newMember.calendly_url || null,
        linkedin_url: newMember.linkedin_url || null,
        twitter_url: newMember.twitter_url || null,
        github_url: newMember.github_url || null,
        personal_website: newMember.personal_website || null,
        instagram_url: newMember.instagram_url || null,
        facebook_url: newMember.facebook_url || null,
        youtube_url: newMember.youtube_url || null,
        organization_id: currentUser.organization_id,
        role: 'member',
        source: 'manual',
      });

      if (error) throw error;

      setShowAddModal(false);
      setNewMember({ 
        email: '', 
        first_name: '', 
        last_name: '', 
        title: '', 
        department: '',
        calendly_url: '',
        linkedin_url: '',
        twitter_url: '',
        github_url: '',
        personal_website: '',
        instagram_url: '',
        facebook_url: '',
        youtube_url: '',
      });
      await loadData();
      // Refresh subscription usage counts
      refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to add team member');
    } finally {
      setAdding(false);
    }
  };

  const startEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setEditForm({
      email: member.email || '',
      first_name: member.first_name || '',
      last_name: member.last_name || '',
      title: member.title || '',
      department: member.department || '',
      calendly_url: member.calendly_url || '',
      linkedin_url: member.linkedin_url || '',
      twitter_url: member.twitter_url || '',
      github_url: member.github_url || '',
      personal_website: member.personal_website || '',
      instagram_url: member.instagram_url || '',
      facebook_url: member.facebook_url || '',
      youtube_url: member.youtube_url || '',
      self_manage_enabled: (member as any).self_manage_enabled !== false,
      google_calendar_enabled: member.google_calendar_enabled || false,
      google_booking_url: member.google_booking_url || '',
      ooo_banner_enabled: member.ooo_banner_enabled !== false,
      ooo_custom_message: member.ooo_custom_message || '',
    });
    setShowEditModal(true);
  };

  // Check if member can have email edited
  const canEditMemberEmail = (member: TeamMember | null) => {
    if (!member) return false;
    // Can only edit email for manually added users who don't have an auth account
    // Synced users (google/microsoft/hubspot) should have their email managed at the source
    // Users with auth_id have claimed their account and email is tied to their login
    const isSynced = member.source === 'google' || member.source === 'microsoft' || member.source === 'hubspot';
    return !member.auth_id && !isSynced;
  };

  const updateMember = async () => {
    if (!editingMember) return;
    
    setErrorMessage(null);
    setUpdating(true);
    
    try {
      const supabase = createClient();
      
      // Check if user is synced (from Google/Microsoft/HubSpot)
      const isSynced = editingMember.source === 'google' || 
                       editingMember.source === 'microsoft' || 
                       editingMember.source === 'hubspot';

      // Personal links and calendar settings are always editable
      const updateData: Record<string, any> = {
        calendly_url: editForm.calendly_url || null,
        linkedin_url: editForm.linkedin_url || null,
        twitter_url: editForm.twitter_url || null,
        github_url: editForm.github_url || null,
        personal_website: editForm.personal_website || null,
        instagram_url: editForm.instagram_url || null,
        facebook_url: editForm.facebook_url || null,
        youtube_url: editForm.youtube_url || null,
        self_manage_enabled: editForm.self_manage_enabled,
        google_calendar_enabled: editForm.google_calendar_enabled,
        google_booking_url: editForm.google_booking_url || null,
        ooo_banner_enabled: editForm.ooo_banner_enabled,
        ooo_custom_message: editForm.ooo_custom_message || null,
      };

      // Only update basic info for manual users (synced users get these from their provider)
      if (!isSynced) {
        updateData.first_name = editForm.first_name || null;
        updateData.last_name = editForm.last_name || null;
        updateData.title = editForm.title || null;
        updateData.department = editForm.department || null;
      }

      // Only update email for manually added users without auth account
      const canEdit = canEditMemberEmail(editingMember);
      
      if (canEdit && editForm.email) {
        updateData.email = editForm.email;
      }

      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', editingMember.id);

      if (error) throw error;

      setSuccessMessage('Team member updated successfully');
      setShowEditModal(false);
      setEditingMember(null);
      await loadData();
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update team member');
    } finally {
      setUpdating(false);
    }
  };

  const deleteMember = async () => {
    if (!editingMember) return;
    
    setErrorMessage(null);
    setDeleting(true);
    
    try {
      const supabase = createClient();
      
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', editingMember.id);

      if (error) throw error;

      setSuccessMessage('Team member deleted successfully');
      setShowEditModal(false);
      setEditingMember(null);
      await loadData();
      // Refresh subscription usage counts
      refresh();
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Delete failed:', err);
      setErrorMessage(err.message || 'Failed to delete team member');
    } finally {
      setDeleting(false);
    }
  };

  const inviteMembers = async () => {
    if (selectedMembers.size === 0) {
      setErrorMessage('Please select team members to invite');
      return;
    }

    setInviting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userIds: Array.from(selectedMembers),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send invites');
      }

      // Show appropriate message based on email send results
      if (data.emailsFailed > 0) {
        const errorDetails = data.errors?.join('; ') || 'Check server logs for details';
        setErrorMessage(`${data.emailsFailed} email${data.emailsFailed !== 1 ? 's' : ''} failed to send. ${errorDetails}`);
        if (data.emailsSent > 0) {
          setSuccessMessage(`${data.emailsSent} invite${data.emailsSent !== 1 ? 's' : ''} sent successfully`);
        }
      } else {
        setSuccessMessage(`Successfully sent ${data.invitedCount} invite${data.invitedCount !== 1 ? 's' : ''}`);
      }
      setSelectedMembers(new Set());
      
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send invites');
    } finally {
      setInviting(false);
    }
  };

  const inviteAdmin = async () => {
    if (!adminInviteForm.email) {
      setErrorMessage('Email is required');
      return;
    }

    setInvitingAdmin(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/team/invite-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminInviteForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to invite admin');
      }

      setSuccessMessage(data.message);
      setShowAdminInviteModal(false);
      setAdminInviteForm({ email: '', first_name: '', last_name: '' });
      await loadData();
      
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to invite admin');
    } finally {
      setInvitingAdmin(false);
    }
  };

  const changeUserRole = async (userId: string, newRole: 'admin' | 'member') => {
    setChangingRole(userId);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/team/role', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change role');
      }

      setSuccessMessage(data.message);
      await loadData();
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to change role');
    } finally {
      setChangingRole(null);
    }
  };

  const canChangeRole = (member: TeamMember) => {
    // Only owners and admins can change roles
    if (currentUserRole !== 'owner' && currentUserRole !== 'admin') return false;
    // Cannot change owner's role
    if (member.role === 'owner') return false;
    // Admins can only promote members, not demote other admins
    if (currentUserRole === 'admin' && member.role === 'admin') return false;
    return true;
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
        case 'company':
          aVal = a.company || '';
          bVal = b.company || '';
          break;
        case 'office_location':
          aVal = a.office_location || '';
          bVal = b.office_location || '';
          break;
        case 'title':
          aVal = a.title || '';
          bVal = b.title || '';
          break;
        case 'created_at':
          aVal = a.created_at;
          bVal = b.created_at;
          break;
        case 'source':
          aVal = a.source || 'manual';
          bVal = b.source || 'manual';
          break;
        case 'role':
          aVal = a.role;
          bVal = b.role;
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

  const canInviteAdmin = currentUserRole === 'owner' || currentUserRole === 'admin';

  const actionButtons = (
    <div className="flex items-center gap-2">
      {canInviteAdmin && (
        <Button variant="outline" onClick={() => setShowAdminInviteModal(true)}>
          <Shield className="mr-2 h-4 w-4" />
          Invite Admin
        </Button>
      )}
      {memberLimitReached ? (
        <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5" asChild>
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

      {/* Success message */}
      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 p-4 rounded-lg flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5 text-emerald-600" />
          <div className="flex-1">
            <p>{successMessage}</p>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-600 hover:text-emerald-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p>{errorMessage}</p>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-destructive hover:text-destructive/80">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

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
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <p className="text-emerald-600">
            Synced {syncResult.synced} members
            {syncResult.errors > 0 && ` (${syncResult.errors} errors)`}
          </p>
        </div>
      )}

      {/* Sticky selection action bar */}
      {selectedMembers.size > 0 && (
        <div className="sticky top-16 z-20 bg-primary/5 border border-primary/20 rounded-lg p-3 shadow-md backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-primary">
              {selectedMembers.size} member{selectedMembers.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <Button onClick={inviteMembers} variant="outline" size="sm" disabled={inviting}>
                {inviting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Invite to Self-Manage
                  </>
                )}
              </Button>
              <Button onClick={() => setShowShareModal(true)} size="sm">
                <FileSignature className="mr-2 h-4 w-4" />
                Share Signatures
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMembers(new Set())}
                className="text-primary hover:text-primary/80"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
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

          {/* Bulk actions */}
          {members.length > 0 && (
            <div className="flex items-center gap-2 pb-2 border-b">
              <input
                type="checkbox"
                checked={selectedMembers.size === filteredMembers.length && filteredMembers.length > 0}
                onChange={selectAllMembers}
                className="h-4 w-4 rounded border-border"
              />
              <span className="text-sm text-muted-foreground">
                {selectedMembers.size > 0 ? `${selectedMembers.size} selected` : 'Select all'}
              </span>
              {selectedMembers.size > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMembers(new Set())}
                  className="ml-2"
                >
                  Clear
                </Button>
              )}
            </div>
          )}

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
                      ? 'bg-primary text-primary-foreground shadow-sm'
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
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-hidden relative">
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
            <div className="border rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px]">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="w-12 p-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedMembers.size === filteredMembers.length && filteredMembers.length > 0}
                        onChange={selectAllMembers}
                        className="h-4 w-4 rounded border-border"
                      />
                    </th>
                    <th className="p-3 text-left">
                      <button
                        onClick={() => {
                          if (sortField === 'name') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('name');
                            setSortOrder('asc');
                          }
                        }}
                        className="flex items-center gap-1 font-medium text-sm hover:text-primary"
                      >
                        Name
                        <ArrowUpDown className={`h-3 w-3 ${sortField === 'name' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button
                        onClick={() => {
                          if (sortField === 'email') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('email');
                            setSortOrder('asc');
                          }
                        }}
                        className="flex items-center gap-1 font-medium text-sm hover:text-primary"
                      >
                        Email
                        <ArrowUpDown className={`h-3 w-3 ${sortField === 'email' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button
                        onClick={() => {
                          if (sortField === 'department') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('department');
                            setSortOrder('asc');
                          }
                        }}
                        className="flex items-center gap-1 font-medium text-sm hover:text-primary"
                      >
                        Department
                        <ArrowUpDown className={`h-3 w-3 ${sortField === 'department' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button
                        onClick={() => {
                          if (sortField === 'company') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('company');
                            setSortOrder('asc');
                          }
                        }}
                        className="flex items-center gap-1 font-medium text-sm hover:text-primary"
                      >
                        Company
                        <ArrowUpDown className={`h-3 w-3 ${sortField === 'company' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button
                        onClick={() => {
                          if (sortField === 'office_location') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('office_location');
                            setSortOrder('asc');
                          }
                        }}
                        className="flex items-center gap-1 font-medium text-sm hover:text-primary"
                      >
                        Office
                        <ArrowUpDown className={`h-3 w-3 ${sortField === 'office_location' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button
                        onClick={() => {
                          if (sortField === 'title') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('title');
                            setSortOrder('asc');
                          }
                        }}
                        className="flex items-center gap-1 font-medium text-sm hover:text-primary"
                      >
                        Title
                        <ArrowUpDown className={`h-3 w-3 ${sortField === 'title' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button
                        onClick={() => {
                          if (sortField === 'created_at') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('created_at');
                            setSortOrder('asc');
                          }
                        }}
                        className="flex items-center gap-1 font-medium text-sm hover:text-primary"
                      >
                        Date Added
                        <ArrowUpDown className={`h-3 w-3 ${sortField === 'created_at' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button
                        onClick={() => {
                          if (sortField === 'source') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('source');
                            setSortOrder('asc');
                          }
                        }}
                        className="flex items-center gap-1 font-medium text-sm hover:text-primary"
                      >
                        Source
                        <ArrowUpDown className={`h-3 w-3 ${sortField === 'source' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button
                        onClick={() => {
                          if (sortField === 'role') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('role');
                            setSortOrder('asc');
                          }
                        }}
                        className="flex items-center gap-1 font-medium text-sm hover:text-primary"
                      >
                        Role
                        <ArrowUpDown className={`h-3 w-3 ${sortField === 'role' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </button>
                    </th>
                    <th className="p-3 text-left font-medium text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((emp) => (
                    <tr key={emp.id} className="border-b hover:bg-secondary/50 transition-colors">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedMembers.has(emp.id)}
                          onChange={() => toggleMemberSelection(emp.id)}
                          className="h-4 w-4 rounded border-border"
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar 
                            alt={`${emp.first_name || ''} ${emp.last_name || ''}`}
                            fallback={`${(emp.first_name?.[0] || emp.email[0]).toUpperCase()}${emp.last_name?.[0]?.toUpperCase() || ''}`}
                          />
                          <span className="font-medium">
                            {emp.first_name && emp.last_name 
                              ? `${emp.first_name} ${emp.last_name}`
                              : emp.email}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{emp.email}</td>
                      <td className="p-3 text-sm">{emp.department || '-'}</td>
                      <td className="p-3 text-sm">{emp.company || '-'}</td>
                      <td className="p-3 text-sm text-muted-foreground">{emp.office_location || '-'}</td>
                      <td className="p-3 text-sm text-muted-foreground">{emp.title || '-'}</td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {new Date(emp.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <Badge variant={emp.source === 'google' || emp.source === 'microsoft' || emp.source === 'hubspot' ? 'info' : 'outline'} className="text-xs">
                          {emp.source === 'google' || emp.source === 'microsoft' || emp.source === 'hubspot' ? (
                            <><Cloud className="h-3 w-3 mr-1" />Synced</>
                          ) : (
                            <><UserIcon className="h-3 w-3 mr-1" />Manual</>
                          )}
                        </Badge>
                      </td>
                      <td className="p-3">
                        {canChangeRole(emp) ? (
                          <div className="relative group">
                            <select
                              value={emp.role}
                              onChange={(e) => changeUserRole(emp.id, e.target.value as 'admin' | 'member')}
                              disabled={changingRole === emp.id}
                              className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer appearance-none pr-6 ${
                                emp.role === 'admin' 
                                  ? 'bg-blue-500/15 text-blue-500'
                                  : 'bg-muted text-foreground'
                              } ${changingRole === emp.id ? 'opacity-50' : 'hover:ring-2 hover:ring-primary/30'}`}
                            >
                              <option value="member">member</option>
                              <option value="admin">admin</option>
                            </select>
                            {changingRole === emp.id && (
                              <Loader2 className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 animate-spin" />
                            )}
                          </div>
                        ) : (
                          <Badge variant={
                            emp.role === 'owner' 
                              ? 'default'
                              : emp.role === 'admin'
                              ? 'info'
                              : 'secondary'
                          } className="text-xs">
                            {emp.role}
                          </Badge>
                        )}
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditMember(emp)}
                          className="h-8 px-2"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

          {/* Personal Links Section */}
          <div className="space-y-4 pt-4 border-t">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Personal Links (Optional)</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Add personal URLs that can be used in signature templates
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="calendly_url">Calendly URL</Label>
              <Input
                id="calendly_url"
                type="url"
                value={newMember.calendly_url}
                onChange={(e) => setNewMember({ ...newMember, calendly_url: e.target.value })}
                placeholder="https://calendly.com/yourname"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
              <Input
                id="linkedin_url"
                type="url"
                value={newMember.linkedin_url}
                onChange={(e) => setNewMember({ ...newMember, linkedin_url: e.target.value })}
                placeholder="https://linkedin.com/in/yourname"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter_url">Twitter/X Profile</Label>
              <Input
                id="twitter_url"
                type="url"
                value={newMember.twitter_url}
                onChange={(e) => setNewMember({ ...newMember, twitter_url: e.target.value })}
                placeholder="https://twitter.com/yourname"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="personal_website">Personal Website</Label>
              <Input
                id="personal_website"
                type="url"
                value={newMember.personal_website}
                onChange={(e) => setNewMember({ ...newMember, personal_website: e.target.value })}
                placeholder="https://yourwebsite.com"
              />
            </div>
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

      {/* Edit Member Modal */}
      <EditMemberModal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingMember(null);
        }}
        memberName={editingMember ? `${editingMember.first_name || ''} ${editingMember.last_name || ''}`.trim() || editingMember.email : ''}
        memberEmail={editingMember?.email || ''}
        canEditEmail={canEditMemberEmail(editingMember)}
        isSyncedUser={editingMember?.source === 'google' || editingMember?.source === 'microsoft' || editingMember?.source === 'hubspot'}
        editForm={editForm}
        setEditForm={setEditForm}
        onSave={updateMember}
        onDelete={deleteMember}
        updating={updating}
        deleting={deleting}
        orgCalendarEnabled={orgCalendarEnabled}
      />

      {/* Share Signatures Modal */}
      <Modal open={showShareModal} onClose={closeShareModal}>
        <ModalHeader>
          <ModalTitle>Share Signatures</ModalTitle>
          <ModalDescription>
            Generate personalized signatures for {selectedMembers.size} team member{selectedMembers.size !== 1 ? 's' : ''}
          </ModalDescription>
        </ModalHeader>
        <div className="space-y-4 py-4">
          {generatedSignatures.length === 0 ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="template">Select Template</Label>
                <select
                  id="template"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full text-sm border rounded-lg px-3 py-2 bg-background"
                >
                  <option value="">Choose a template...</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-muted rounded-lg p-3 text-sm">
                <p className="font-medium mb-1">Selected Members:</p>
                <ul className="list-disc list-inside text-muted-foreground">
                  {Array.from(selectedMembers).slice(0, 5).map(id => {
                    const member = members.find(m => m.id === id);
                    return member ? (
                      <li key={id}>
                        {member.first_name && member.last_name 
                          ? `${member.first_name} ${member.last_name}`
                          : member.email}
                      </li>
                    ) : null;
                  })}
                  {selectedMembers.size > 5 && (
                    <li className="text-xs">...and {selectedMembers.size - 5} more</li>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">
                  {generatedSignatures.length} signature{generatedSignatures.length !== 1 ? 's' : ''} generated
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadAllSignatures}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {generatedSignatures.map((sig) => (
                  <div key={sig.userId} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{sig.userName}</p>
                        <p className="text-xs text-muted-foreground">{sig.email}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copySignature(sig.html, sig.userId)}
                        >
                          {copiedId === sig.userId ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
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
                    <div className="bg-muted rounded p-2 text-xs max-h-32 overflow-auto">
                      <div dangerouslySetInnerHTML={{ __html: sig.html }} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={closeShareModal}>
            {generatedSignatures.length > 0 ? 'Done' : 'Cancel'}
          </Button>
          {generatedSignatures.length === 0 && (
            <Button onClick={generateSignatures} disabled={generating || !selectedTemplate}>
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileSignature className="mr-2 h-4 w-4" />
                  Generate Signatures
                </>
              )}
            </Button>
          )}
        </ModalFooter>
      </Modal>

      {/* Invite Admin Modal */}
      <Modal open={showAdminInviteModal} onClose={() => setShowAdminInviteModal(false)}>
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Invite Admin
          </ModalTitle>
          <ModalDescription>
            Invite someone to help manage your organization's email signatures. They'll have full admin access.
          </ModalDescription>
        </ModalHeader>
        <div className="space-y-4 py-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-sm text-blue-600">
              <strong>Admins can:</strong> Create templates, deploy signatures, manage integrations, and invite team members.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="admin_first_name">First Name</Label>
              <Input
                id="admin_first_name"
                value={adminInviteForm.first_name}
                onChange={(e) => setAdminInviteForm({ ...adminInviteForm, first_name: e.target.value })}
                placeholder="Jane"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin_last_name">Last Name</Label>
              <Input
                id="admin_last_name"
                value={adminInviteForm.last_name}
                onChange={(e) => setAdminInviteForm({ ...adminInviteForm, last_name: e.target.value })}
                placeholder="Smith"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin_email">Email *</Label>
            <Input
              id="admin_email"
              type="email"
              value={adminInviteForm.email}
              onChange={(e) => setAdminInviteForm({ ...adminInviteForm, email: e.target.value })}
              placeholder="jane@company.com"
              required
            />
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setShowAdminInviteModal(false)}>
            Cancel
          </Button>
          <Button onClick={inviteAdmin} disabled={invitingAdmin || !adminInviteForm.email}>
            {invitingAdmin ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Invite...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Send Admin Invite
              </>
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
