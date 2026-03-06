'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, Input, Button, Checkbox } from '@/components/ui';
import { RichTextEditor, type RichTextEditorRef } from '@/components/admin/rich-text-editor';
import { useBulkSelection } from '@/hooks/use-bulk-selection';
import { BulkActionBar, type BulkAction } from '@/components/admin/bulk-action-bar';
import {
  Search,
  Ticket,
  Loader2,
  Bug,
  Lightbulb,
  HelpCircle,
  MessageSquare,
  Mail,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  Clock,
  Archive,
  Eye,
  X,
  Send,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Minus,
  StickyNote,
  Bell,
  BellOff,
  Inbox,
  Reply,
  AlarmClock,
  Zap,
  ChevronDown,
  UserCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { useSortableTable } from '@/hooks/use-sortable-table';
import { SortButton } from '@/components/admin/sortable-header';

interface TicketNote {
  id: string;
  content: string;
  authorEmail: string;
  isInternal: boolean;
  createdAt: string;
}

interface CannedResponse {
  id: string;
  title: string;
  content: string;
  category: string;
  shortcut: string | null;
}

type TicketType = 'bug' | 'feature' | 'question' | 'email' | 'sales' | 'other';

interface FeedbackEntry {
  id: string;
  userEmail: string | null;
  type: TicketType;
  message: string;
  pageUrl: string | null;
  status: 'new' | 'reviewed' | 'resolved' | 'archived';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string | null;
  notes: TicketNote[];
  organizationId: string | null;
  organizationName: string | null;
  partnerOrganizationId: string | null;
  partnerOrganizationName: string | null;
  isPartnerEscalation: boolean;
  receivedAtMailbox: string | null;
  snoozedUntil: string | null;
  assignedTo: string | null;
  assignedEmail: string | null;
}

const PAGE_SIZE = 20;

const typeIcons: Record<TicketType, typeof Bug> = {
  bug: Bug,
  feature: Lightbulb,
  question: HelpCircle,
  email: Mail,
  sales: DollarSign,
  other: MessageSquare,
};

const typeColors: Record<TicketType, string> = {
  bug: 'bg-red-100 text-red-700',
  feature: 'bg-blue-100 text-blue-700',
  question: 'bg-amber-100 text-amber-700',
  email: 'bg-emerald-100 text-emerald-700',
  sales: 'bg-orange-100 text-orange-700',
  other: 'bg-slate-100 text-slate-700',
};

const statusColors = {
  new: 'bg-violet-100 text-violet-700',
  reviewed: 'bg-blue-100 text-blue-700',
  resolved: 'bg-green-100 text-green-700',
  archived: 'bg-slate-100 text-slate-700',
};

const priorityIcons = {
  low: ArrowDown,
  normal: Minus,
  high: ArrowUp,
  urgent: AlertTriangle,
};

const priorityColors = {
  low: 'text-slate-400',
  normal: 'text-blue-500',
  high: 'text-orange-500',
  urgent: 'text-red-600',
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('open');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [partnerFilter, setPartnerFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState<FeedbackEntry | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const editorRef = useRef<RichTextEditorRef>(null);
  const [addingNote, setAddingNote] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [cannedResponses, setCannedResponses] = useState<CannedResponse[]>([]);
  const [showCannedPicker, setShowCannedPicker] = useState(false);
  const [showSnoozeMenu, setShowSnoozeMenu] = useState(false);
  const [hideSnoozed, setHideSnoozed] = useState(true);
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [adminUsers, setAdminUsers] = useState<{ id: string; email: string }[]>([]);
  const sort = useSortableTable<FeedbackEntry>('createdAt', 'desc');
  const ticketListRef = useRef<HTMLDivElement>(null);

  const filteredTicketIds = useMemo(() => {
    const searchLower = search.toLowerCase();
    return tickets
      .filter(ticket => {
        if (search === '') return true;
        return (
          ticket.message.toLowerCase().includes(searchLower) ||
          (ticket.userEmail?.toLowerCase().includes(searchLower) ?? false)
        );
      })
      .map(t => t.id);
  }, [tickets, search]);

  const bulk = useBulkSelection({ itemIds: filteredTicketIds });

  useEffect(() => {
    bulk.clearSelection();
  }, [page, typeFilter, statusFilter, priorityFilter, partnerFilter]);

  useEffect(() => {
    loadTickets();
    loadCurrentUser();
    loadCannedResponses();
    loadAdminUsers();
  }, [page, typeFilter, statusFilter, priorityFilter, partnerFilter]);

  // Real-time subscription for new tickets
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel('admin-tickets')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'feedback' },
        (payload) => {
          const item = payload.new as any;
          const newEntry: FeedbackEntry = {
            id: item.id,
            userEmail: item.user_email,
            type: item.type,
            message: item.message,
            pageUrl: item.page_url,
            status: item.status,
            priority: item.priority || 'normal',
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            notes: [],
            organizationId: item.organization_id,
            organizationName: null,
            partnerOrganizationId: item.partner_organization_id,
            partnerOrganizationName: null,
            isPartnerEscalation: item.is_partner_escalation || false,
            receivedAtMailbox: item.inbox_email || null,
            snoozedUntil: item.snoozed_until || null,
            assignedTo: item.assigned_to || null,
            assignedEmail: null,
          };

          const matchesType = typeFilter === 'all' || item.type === typeFilter;
          const matchesStatus = statusFilter === 'all'
            || (statusFilter === 'open' && ['new', 'reviewed'].includes(item.status))
            || item.status === statusFilter;
          const matchesPriority = priorityFilter === 'all' || (item.priority || 'normal') === priorityFilter;

          if (page === 0 && matchesType && matchesStatus && matchesPriority) {
            setTickets(prev => [newEntry, ...prev]);
          }
          setTotalCount(prev => prev + 1);

          if (notificationsEnabled && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            new Notification('New Support Ticket', {
              body: `${item.type} from ${item.user_email || 'anonymous'}: ${item.message?.slice(0, 100)}`,
              icon: '/favicon.ico',
            });
          }

          try {
            const audio = new Audio('/sounds/notification.wav');
            audio.volume = 0.3;
            audio.play().catch(() => {});
          } catch {
            // Audio not available
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'feedback' },
        (payload) => {
          const item = payload.new as any;
          setTickets(prev => prev.map(t => t.id === item.id ? {
            ...t,
            status: item.status,
            priority: item.priority || t.priority,
            updatedAt: item.updated_at,
          } : t));
          setSelectedTicket(prev => {
            if (!prev || prev.id !== item.id) return prev;
            return { ...prev, status: item.status, priority: item.priority || prev.priority, updatedAt: item.updated_at };
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'ticket_notes' },
        (payload) => {
          const note = payload.new as any;
          setSelectedTicket(prev => {
            if (!prev || prev.id !== note.ticket_id) return prev;
            loadTicketNotes(note.ticket_id).then(notes => {
              setSelectedTicket(p => p && p.id === note.ticket_id ? { ...p, notes } : p);
            });
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [page, typeFilter, statusFilter, priorityFilter, notificationsEnabled]);

  const toggleNotifications = async () => {
    if (!notificationsEnabled && typeof Notification !== 'undefined') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
      }
    } else {
      setNotificationsEnabled(!notificationsEnabled);
    }
  };

  const loadCurrentUser = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', user.id)
        .single();
      if (userData) {
        setCurrentUserId(userData.id);
      }
    }
  };

  const loadTickets = async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase
      .from('feedback')
      .select(`
        *,
        organization:organization_id(id, name),
        partner_organization:partner_organization_id(id, name),
        assigned_user:assigned_to(id, email)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (typeFilter !== 'all') {
      query = query.eq('type', typeFilter);
    }

    if (statusFilter === 'open') {
      query = query.in('status', ['new', 'reviewed']);
    } else if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    if (priorityFilter !== 'all') {
      query = query.eq('priority', priorityFilter);
    }

    if (partnerFilter === 'escalations') {
      query = query.eq('is_partner_escalation', true);
    } else if (partnerFilter === 'partner') {
      query = query.not('partner_organization_id', 'is', null);
    }

    const { data, count, error } = await query;

    if (error) {
      console.error('Error loading tickets:', error);
      setLoading(false);
      return;
    }

    setTotalCount(count || 0);

    const mapped: FeedbackEntry[] = (data || []).map((item: any) => ({
      id: item.id,
      userEmail: item.user_email,
      type: item.type,
      message: item.message,
      pageUrl: item.page_url,
      status: item.status,
      priority: item.priority || 'normal',
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      notes: [],
      organizationId: item.organization_id,
      organizationName: item.organization?.name || null,
      partnerOrganizationId: item.partner_organization_id,
      partnerOrganizationName: item.partner_organization?.name || null,
      isPartnerEscalation: item.is_partner_escalation || false,
      receivedAtMailbox: item.inbox_email || null,
      snoozedUntil: item.snoozed_until || null,
      assignedTo: item.assigned_to || null,
      assignedEmail: item.assigned_user?.email || null,
    }));

    setTickets(mapped);
    setLoading(false);
  };

  const loadTicketNotes = async (ticketId: string) => {
    const supabase = createClient();
    const { data: notes } = await supabase
      .from('ticket_notes')
      .select('id, content, is_internal, created_at, author_id')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });

    if (!notes) return [];

    const authorIds = [...new Set(notes.map(n => n.author_id).filter(Boolean))];
    let authorMap = new Map<string, string>();
    if (authorIds.length > 0) {
      const { data: authors } = await supabase
        .from('users')
        .select('id, email')
        .in('id', authorIds);
      authorMap = new Map(authors?.map(a => [a.id, a.email]) || []);
    }

    return notes.map(n => ({
      id: n.id,
      content: n.content,
      authorEmail: n.author_id ? (authorMap.get(n.author_id) || 'Unknown') : 'External Reply',
      isInternal: n.is_internal,
      createdAt: n.created_at,
    }));
  };

  const openTicketDetail = async (ticket: FeedbackEntry) => {
    const notes = await loadTicketNotes(ticket.id);
    setSelectedTicket({ ...ticket, notes });
  };

  const updateStatus = async (id: string, newStatus: FeedbackEntry['status']) => {
    setUpdating(id);
    const supabase = createClient();

    const { error } = await supabase
      .from('feedback')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error);
    } else {
      setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
      if (selectedTicket?.id === id) {
        setSelectedTicket(prev => prev ? { ...prev, status: newStatus } : null);
      }
    }

    setUpdating(null);
  };

  const updatePriority = async (id: string, newPriority: FeedbackEntry['priority']) => {
    setUpdating(id);
    const supabase = createClient();

    const { error } = await supabase
      .from('feedback')
      .update({ priority: newPriority, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating priority:', error);
    } else {
      setTickets(prev => prev.map(t => t.id === id ? { ...t, priority: newPriority } : t));
      if (selectedTicket?.id === id) {
        setSelectedTicket(prev => prev ? { ...prev, priority: newPriority } : null);
      }
    }

    setUpdating(null);
  };

  const addNote = async () => {
    const htmlContent = editorRef.current?.getHTML() || '';
    const textContent = editorRef.current?.getText()?.trim() || '';
    if (!selectedTicket || !textContent) return;

    setAddingNote(true);

    try {
      const response = await fetch(`/api/admin/tickets/${selectedTicket.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: htmlContent,
          isInternal: isInternalNote,
          isHtml: true,
          replyAs: selectedTicket.receivedAtMailbox || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add note');
      }

      const result = await response.json();

      if (result.success && result.note) {
        const newNoteEntry: TicketNote = {
          id: result.note.id,
          content: result.note.content,
          authorEmail: result.note.authorEmail,
          isInternal: result.note.is_internal,
          createdAt: result.note.created_at,
        };
        setSelectedTicket(prev => prev ? {
          ...prev,
          notes: [...prev.notes, newNoteEntry],
        } : null);
        setNewNote('');
        editorRef.current?.clear();
        setIsInternalNote(false);

        if (result.warning) {
          console.warn(result.warning);
        }
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }

    setAddingNote(false);
  };

  const loadCannedResponses = async () => {
    try {
      const res = await fetch('/api/admin/canned-responses');
      if (res.ok) {
        const { data } = await res.json();
        setCannedResponses(data || []);
      }
    } catch {
      // Not critical
    }
  };

  const loadAdminUsers = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('users')
      .select('id, email')
      .eq('is_super_admin', true)
      .order('email');
    setAdminUsers(data || []);
  };

  const assignTicket = async (ticketId: string, userId: string | null) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('feedback')
      .update({ assigned_to: userId, updated_at: new Date().toISOString() })
      .eq('id', ticketId);
    if (!error) {
      const assignedEmail = adminUsers.find(a => a.id === userId)?.email || null;
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, assignedTo: userId, assignedEmail: assignedEmail } : t));
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(prev => prev ? { ...prev, assignedTo: userId, assignedEmail: assignedEmail } : null);
      }
    }
  };

  const snoozeTicket = async (ticketId: string, hours: number) => {
    const until = new Date(Date.now() + hours * 3600000).toISOString();
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'snooze', until }),
      });
      if (res.ok) {
        setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, snoozedUntil: until } : t));
        if (selectedTicket?.id === ticketId) {
          setSelectedTicket(prev => prev ? { ...prev, snoozedUntil: until } : null);
        }
        setShowSnoozeMenu(false);
      }
    } catch {
      console.error('Snooze failed');
    }
  };

  const unsnoozeTicket = async (ticketId: string) => {
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'unsnooze' }),
      });
      if (res.ok) {
        setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, snoozedUntil: null } : t));
        if (selectedTicket?.id === ticketId) {
          setSelectedTicket(prev => prev ? { ...prev, snoozedUntil: null } : null);
        }
      }
    } catch {
      console.error('Unsnooze failed');
    }
  };

  const filteredTickets = useMemo(() => {
    const filtered = tickets.filter(ticket => {
      if (hideSnoozed && ticket.snoozedUntil && new Date(ticket.snoozedUntil) > new Date()) return false;
      if (search === '') return true;
      const searchLower = search.toLowerCase();
      return (
        ticket.message.toLowerCase().includes(searchLower) ||
        (ticket.userEmail?.toLowerCase().includes(searchLower) ?? false)
      );
    });
    const sorted = sort.sortData(filtered);
    // Pin unread (new) tickets to top
    const unread = sorted.filter(t => t.status === 'new');
    const read = sorted.filter(t => t.status !== 'new');
    return [...unread, ...read];
  }, [tickets, hideSnoozed, search, sort.sortField, sort.sortDir]);

  // Keyboard shortcuts: j/k navigate, r reply, e resolve, Escape close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' ||
          target.isContentEditable || target.closest('.tiptap')) return;

      if (e.key === 'Escape' && selectedTicket) {
        setSelectedTicket(null);
        return;
      }

      if (e.key === 'j' || e.key === 'k') {
        e.preventDefault();
        const currentIdx = selectedTicket
          ? filteredTickets.findIndex(t => t.id === selectedTicket.id)
          : -1;
        const nextIdx = e.key === 'j'
          ? Math.min(currentIdx + 1, filteredTickets.length - 1)
          : Math.max(currentIdx - 1, 0);
        if (filteredTickets[nextIdx]) {
          openTicketDetail(filteredTickets[nextIdx]);
        }
        return;
      }

      if (selectedTicket) {
        if (e.key === 'r') {
          e.preventDefault();
          editorRef.current?.focus?.();
          return;
        }
        if (e.key === 'e') {
          e.preventDefault();
          updateStatus(selectedTicket.id, 'resolved');
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTicket, filteredTickets]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const stats = {
    new: tickets.filter(t => t.status === 'new').length,
    urgent: tickets.filter(t => t.priority === 'urgent' || t.priority === 'high').length,
    email: tickets.filter(t => t.type === 'email' || t.type === 'sales').length,
  };

  const bulkUpdateStatus = async (newStatus: FeedbackEntry['status']) => {
    const ids = [...bulk.selectedIds];
    const supabase = createClient();
    const { error } = await supabase
      .from('feedback')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .in('id', ids);
    if (!error) {
      setTickets(prev => prev.map(t => ids.includes(t.id) ? { ...t, status: newStatus } : t));
      bulk.clearSelection();
    }
  };

  const bulkUpdatePriority = async (newPriority: FeedbackEntry['priority']) => {
    const ids = [...bulk.selectedIds];
    const supabase = createClient();
    const { error } = await supabase
      .from('feedback')
      .update({ priority: newPriority, updated_at: new Date().toISOString() })
      .in('id', ids);
    if (!error) {
      setTickets(prev => prev.map(t => ids.includes(t.id) ? { ...t, priority: newPriority } : t));
      bulk.clearSelection();
    }
  };

  const bulkActions: BulkAction[] = [
    { label: 'Mark Reviewed', icon: Eye, onClick: () => bulkUpdateStatus('reviewed') },
    { label: 'Mark Resolved', icon: CheckCircle, onClick: () => bulkUpdateStatus('resolved') },
    { label: 'Priority: High', icon: ArrowUp, onClick: () => bulkUpdatePriority('high') },
    { label: 'Priority: Low', icon: ArrowDown, onClick: () => bulkUpdatePriority('low') },
    { label: 'Archive', icon: Archive, onClick: () => bulkUpdateStatus('archived'), destructive: true, confirmMessage: `Archive ${bulk.selectedCount} ticket(s)?` },
  ];

  /** Friendly time-ago label */
  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d`;
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const hasActiveFilters = typeFilter !== 'all' || priorityFilter !== 'all' || partnerFilter !== 'all';

  const STATUS_TABS = [
    { key: 'open', label: 'Open' },
    { key: 'all', label: 'All' },
    { key: 'resolved', label: 'Resolved' },
    { key: 'archived', label: 'Archived' },
  ];

  return (
    <div className="space-y-2">
      {/* Header row — title, tabs, actions */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Inbox className="h-5 w-5 text-slate-700" />
          <h1 className="text-lg font-bold text-slate-900">Inbox</h1>
          <span className="text-xs text-slate-400 font-medium">{totalCount}</span>
        </div>

        {/* Status tabs inline with header */}
        <div className="flex items-center gap-0.5 ml-2">
          {STATUS_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setStatusFilter(tab.key); setPage(0); }}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                statusFilter === tab.key
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.label}
              {tab.key === 'open' && stats.new > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">{stats.new}</span>
              )}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button onClick={() => setHideSnoozed(!hideSnoozed)} className={`p-1.5 rounded-md transition-colors ${!hideSnoozed ? 'bg-amber-100 text-amber-700' : 'text-slate-400 hover:bg-slate-100'}`} title={hideSnoozed ? 'Snoozed hidden' : 'Showing snoozed'}>
            <AlarmClock className="h-3.5 w-3.5" />
          </button>
          <button onClick={toggleNotifications} className={`p-1.5 rounded-md transition-colors ${notificationsEnabled ? 'bg-blue-100 text-blue-700' : 'text-slate-400 hover:bg-slate-100'}`} title={notificationsEnabled ? 'Notifications on' : 'Enable notifications'}>
            {notificationsEnabled ? <Bell className="h-3.5 w-3.5" /> : <BellOff className="h-3.5 w-3.5" />}
          </button>
          <div className="hidden lg:flex items-center gap-1 ml-2 text-[10px] text-slate-400">
            <kbd className="px-1 py-0.5 bg-slate-100 rounded text-[9px]">j</kbd>/<kbd className="px-1 py-0.5 bg-slate-100 rounded text-[9px]">k</kbd>
            <kbd className="px-1 py-0.5 bg-slate-100 rounded text-[9px]">r</kbd>
            <kbd className="px-1 py-0.5 bg-slate-100 rounded text-[9px]">e</kbd>
          </div>
        </div>
      </div>

      {/* Split pane: list left, detail right on desktop */}
      <div className={`flex gap-0 ${selectedTicket ? 'lg:flex-row' : ''}`}>
        {/* Ticket list — inbox style */}
        <div className={`${selectedTicket ? 'hidden lg:flex lg:flex-col lg:w-[320px] lg:min-w-[320px] lg:max-w-[320px] lg:shrink-0' : 'w-full'}`}>
          {/* Search + filter inside the list pane */}
          <div className="flex items-center gap-1.5 px-2 py-2 bg-white border border-b-0 border-slate-200 rounded-t-lg">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-xs"
              />
            </div>
            {/* Filter popover button */}
            <div className="relative">
              <button
                onClick={() => setShowFilterPopover(!showFilterPopover)}
                className={`h-8 px-2 border rounded-md text-xs flex items-center gap-1 transition-colors ${
                  hasActiveFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white text-slate-500 hover:bg-slate-50'
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
              </button>
              {showFilterPopover && (
                <div className="absolute right-0 top-9 bg-white border rounded-lg shadow-lg p-3 z-30 w-56 space-y-3">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Type</label>
                    <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(0); }} className="w-full h-8 px-2 border rounded text-xs bg-white text-slate-700">
                      <option value="all">All types</option>
                      <option value="bug">Bug</option>
                      <option value="feature">Feature</option>
                      <option value="question">Question</option>
                      <option value="email">Email</option>
                      <option value="sales">Sales</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Priority</label>
                    <select value={priorityFilter} onChange={(e) => { setPriorityFilter(e.target.value); setPage(0); }} className="w-full h-8 px-2 border rounded text-xs bg-white text-slate-700">
                      <option value="all">All priorities</option>
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="normal">Normal</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Source</label>
                    <select value={partnerFilter} onChange={(e) => { setPartnerFilter(e.target.value); setPage(0); }} className="w-full h-8 px-2 border rounded text-xs bg-white text-slate-700">
                      <option value="all">All sources</option>
                      <option value="escalations">Escalations</option>
                      <option value="partner">Partners</option>
                    </select>
                  </div>
                  {hasActiveFilters && (
                    <button onClick={() => { setTypeFilter('all'); setPriorityFilter('all'); setPartnerFilter('all'); setPage(0); setShowFilterPopover(false); }} className="w-full h-7 text-xs text-red-600 hover:bg-red-50 rounded border border-red-200">
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sort bar */}
          {filteredTickets.length > 0 && (
            <div className="flex items-center justify-between text-[10px] text-slate-400 px-3 py-1.5 bg-slate-50 border-x border-slate-200">
              <div className="flex items-center gap-2">
                {!selectedTicket && (
                  <Checkbox checked={bulk.allSelected} onCheckedChange={bulk.toggleAll} aria-label="Select all" />
                )}
                <span>{filteredTickets.length} tickets</span>
                <SortButton field="createdAt" label="Date" currentSort={sort.sortField} currentDir={sort.sortDir} onToggle={sort.toggleSort} />
                <SortButton field="priority" label="Pri" currentSort={sort.sortField} currentDir={sort.sortDir} onToggle={sort.toggleSort} />
              </div>
              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <span>{page + 1}/{totalPages}</span>
                  <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="p-0.5 hover:bg-slate-200 rounded disabled:opacity-30"><ChevronLeft className="h-3 w-3" /></button>
                  <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-0.5 hover:bg-slate-200 rounded disabled:opacity-30"><ChevronRight className="h-3 w-3" /></button>
                </div>
              )}
            </div>
          )}

          <Card className={`overflow-hidden rounded-t-none border-t-0 ${selectedTicket ? 'lg:rounded-r-none lg:border-r-0' : ''}`}>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <Inbox className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No tickets found</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredTickets.map((ticket) => {
                    const TypeIcon = typeIcons[ticket.type];
                    const PriorityIcon = priorityIcons[ticket.priority];
                    const isUnread = ticket.status === 'new';

                    const isCompact = !!selectedTicket;

                    return (
                      <div
                        key={ticket.id}
                        onClick={() => openTicketDetail(ticket)}
                        className={`flex items-center gap-2 ${isCompact ? 'px-2 py-2' : 'px-3 py-2.5'} cursor-pointer transition-all border-b border-slate-200 ${
                          selectedTicket?.id === ticket.id
                            ? 'bg-blue-50 border-l-[3px] border-l-blue-600 shadow-sm'
                            : isUnread
                              ? 'bg-gradient-to-r from-blue-50/60 to-white border-l-[3px] border-l-blue-400 hover:bg-blue-50/80'
                              : 'border-l-[3px] border-l-transparent hover:bg-slate-50'
                        }`}
                      >
                        {!isCompact && (
                          <div onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={bulk.isSelected(ticket.id)}
                              onCheckedChange={() => bulk.toggle(ticket.id)}
                              aria-label={`Select ticket`}
                            />
                          </div>
                        )}

                        <PriorityIcon className={`h-3.5 w-3.5 shrink-0 ${priorityColors[ticket.priority]}`} />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${typeColors[ticket.type]}`}>
                              <TypeIcon className="h-2.5 w-2.5" />
                              {!isCompact && ticket.type}
                            </span>
                            {!isCompact && (
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${statusColors[ticket.status]}`}>
                                {ticket.status}
                              </span>
                            )}
                            <span className={`truncate ${isCompact ? 'text-xs' : 'text-sm'} ${isUnread ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                              {ticket.userEmail || 'Anonymous'}
                            </span>
                            {!isCompact && ticket.receivedAtMailbox && (
                              <span className="hidden md:inline text-[10px] text-emerald-600 font-medium">
                                → {ticket.receivedAtMailbox}
                              </span>
                            )}
                          </div>
                          <p className={`truncate mt-0.5 ${isCompact ? 'text-[11px]' : 'text-xs'} ${isUnread ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                            {ticket.message.replace(/^From:.*?\n(Subject:.*?\n)?(\n)?/s, '')}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-0.5 shrink-0">
                          <span className={`${isCompact ? 'text-[10px]' : 'text-[11px]'} whitespace-nowrap ${isUnread ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}>{timeAgo(ticket.createdAt)}</span>
                          {!isCompact && ticket.updatedAt && ticket.updatedAt !== ticket.createdAt && (
                            <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                              <Reply className="h-2.5 w-2.5" />
                              {timeAgo(ticket.updatedAt)}
                            </span>
                          )}
                          {!isCompact && ticket.assignedEmail && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-medium flex items-center gap-0.5 max-w-[120px] truncate">
                              <UserCheck className="h-2.5 w-2.5 shrink-0" />
                              {ticket.assignedEmail.split('@')[0]}
                            </span>
                          )}
                          {!isCompact && ticket.snoozedUntil && new Date(ticket.snoozedUntil) > new Date() && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium flex items-center gap-0.5">
                              <AlarmClock className="h-2.5 w-2.5" />
                              {timeAgo(ticket.snoozedUntil)}
                            </span>
                          )}
                          {!isCompact && ticket.isPartnerEscalation && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-medium">Partner</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bottom pagination (mobile) */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between sm:hidden text-sm mt-4">
              <span className="text-slate-500">Page {page + 1} of {totalPages}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop detail panel — inline right side */}
        {selectedTicket && (
          <div className="hidden lg:flex lg:flex-col flex-1 min-w-0 border-l border-slate-200" style={{ maxHeight: 'calc(100vh - 260px)' }}>

            {/* Header — ticket identity + close */}
            <div className="bg-white border-b px-4 py-2.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                {(() => {
                  const TypeIcon = typeIcons[selectedTicket.type];
                  return (
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${typeColors[selectedTicket.type]}`}>
                      <TypeIcon className="h-3 w-3" />
                      {selectedTicket.type}
                    </span>
                  );
                })()}
                <span className="text-xs font-mono text-slate-400 shrink-0">#{selectedTicket.id.slice(0, 8)}</span>
                <span className="text-sm font-medium text-slate-800 truncate">
                  {selectedTicket.userEmail || 'Anonymous'}
                </span>
                {selectedTicket.receivedAtMailbox && (
                  <span className="text-[10px] text-emerald-600 font-medium shrink-0">→ {selectedTicket.receivedAtMailbox}</span>
                )}
              </div>
              <button onClick={() => setSelectedTicket(null)} className="p-1 hover:bg-slate-100 rounded shrink-0 ml-2" title="Close (Esc)">
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </div>

            {/* Controls bar — grouped: status+priority | assignee | snooze */}
            <div className="bg-slate-50 border-b px-4 py-2 flex items-center gap-3 shrink-0 flex-wrap">
              {/* Status & Priority group */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Status</span>
                <select value={selectedTicket.status} onChange={(e) => updateStatus(selectedTicket.id, e.target.value as FeedbackEntry['status'])} disabled={updating === selectedTicket.id} className="h-7 px-1.5 border rounded-md text-xs bg-white text-slate-700 font-medium">
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="resolved">Resolved</option>
                  <option value="archived">Archived</option>
                </select>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider ml-1">Priority</span>
                <select value={selectedTicket.priority} onChange={(e) => updatePriority(selectedTicket.id, e.target.value as FeedbackEntry['priority'])} disabled={updating === selectedTicket.id} className="h-7 px-1.5 border rounded-md text-xs bg-white text-slate-700 font-medium">
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="w-px h-5 bg-slate-300" />

              {/* Assignee */}
              <div className="flex items-center gap-1.5">
                <UserCheck className="h-3 w-3 text-slate-400" />
                <select value={selectedTicket.assignedTo || ''} onChange={(e) => assignTicket(selectedTicket.id, e.target.value || null)} className="h-7 px-1.5 border rounded-md text-xs bg-white text-slate-700">
                  <option value="">Unassigned</option>
                  {adminUsers.map(admin => (<option key={admin.id} value={admin.id}>{admin.email}</option>))}
                </select>
              </div>

              <div className="w-px h-5 bg-slate-300" />

              {/* Snooze */}
              <div className="relative">
                {selectedTicket.snoozedUntil && new Date(selectedTicket.snoozedUntil) > new Date() ? (
                  <button onClick={() => unsnoozeTicket(selectedTicket.id)} className="h-7 px-2 border rounded-md text-xs bg-amber-50 text-amber-700 hover:bg-amber-100 flex items-center gap-1 font-medium" title="Click to unsnooze">
                    <AlarmClock className="h-3 w-3" /> Snoozed
                  </button>
                ) : (
                  <button onClick={() => setShowSnoozeMenu(!showSnoozeMenu)} className="h-7 px-2 border rounded-md text-xs text-slate-500 hover:bg-white flex items-center gap-1" title="Snooze">
                    <AlarmClock className="h-3 w-3" /> Snooze
                  </button>
                )}
                {showSnoozeMenu && (
                  <div className="absolute left-0 top-8 bg-white border rounded-lg shadow-lg py-1 z-20 w-36">
                    {[{ label: '1 hour', hours: 1 }, { label: '4 hours', hours: 4 }, { label: 'Tomorrow', hours: 24 }, { label: '3 days', hours: 72 }, { label: '1 week', hours: 168 }].map(opt => (
                      <button key={opt.hours} onClick={() => snoozeTicket(selectedTicket.id, opt.hours)} className="w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 text-slate-700">{opt.label}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="flex items-center gap-1.5 ml-auto text-[10px] text-slate-400">
                <span>{new Date(selectedTicket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                {selectedTicket.organizationName && (
                  <><span>·</span><span>{selectedTicket.organizationName}</span></>
                )}
                {selectedTicket.pageUrl && (
                  <a href={selectedTicket.pageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-0.5">
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Scrollable conversation area */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-0">
              {/* Original message — prominent */}
              <div className="relative">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Original Message</div>
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedTicket.message}</p>
                </div>
              </div>

              {/* Timeline thread */}
              {selectedTicket.notes.length > 0 && (
                <div className="relative ml-4 mt-4">
                  {/* Timeline line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" />

                  {selectedTicket.notes.map((note, idx) => {
                    const isCustomer = note.authorEmail === 'External Reply';
                    const isInternal = note.isInternal;
                    return (
                      <div key={note.id} className="relative pl-6 pb-4 last:pb-0">
                        {/* Timeline dot */}
                        <div className={`absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-[3.5px] ring-2 ring-white ${
                          isCustomer ? 'bg-slate-400' : isInternal ? 'bg-amber-400' : 'bg-blue-500'
                        }`} />

                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[11px] font-semibold ${
                            isCustomer ? 'text-slate-600' : isInternal ? 'text-amber-600' : 'text-blue-600'
                          }`}>
                            {isCustomer ? 'Customer' : isInternal ? 'Internal Note' : note.authorEmail.split('@')[0]}
                          </span>
                          <span className="text-[10px] text-slate-400">{timeAgo(note.createdAt)}</span>
                        </div>

                        <div className={`rounded-lg p-3 ${
                          isCustomer
                            ? 'bg-white border border-slate-200'
                            : isInternal
                            ? 'bg-amber-50/70 border border-amber-100'
                            : 'bg-blue-50/70 border border-blue-100'
                        }`}>
                          {note.content.startsWith('<') ? (
                            <div className="text-sm text-slate-700 prose prose-sm max-w-none [&_a]:text-blue-600 [&_a]:underline" dangerouslySetInnerHTML={{ __html: note.content }} />
                          ) : (
                            <p className="text-sm text-slate-700 whitespace-pre-wrap">{note.content}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sticky reply composer — polished */}
            <div className="bg-white border-t-2 border-slate-200 px-4 py-3 shrink-0 space-y-2.5">
              <div className="flex items-center gap-2 mb-1">
                {cannedResponses.length > 0 && !isInternalNote && (
                  <div className="relative">
                    <button onClick={() => setShowCannedPicker(!showCannedPicker)} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 px-2 py-1 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-200">
                      <Zap className="h-3 w-3" /> Templates <ChevronDown className={`h-3 w-3 transition-transform ${showCannedPicker ? 'rotate-180' : ''}`} />
                    </button>
                    {showCannedPicker && (
                      <div className="absolute left-0 bottom-8 bg-white border rounded-lg shadow-lg py-1 z-20 w-72 max-h-48 overflow-y-auto">
                        {cannedResponses.map(cr => (
                          <button key={cr.id} onClick={() => { setNewNote(cr.content); editorRef.current?.setContent(cr.content); setShowCannedPicker(false); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 border-b border-slate-50 last:border-0">
                            <p className="text-xs font-medium text-slate-700">{cr.title}</p>
                            <p className="text-[10px] text-slate-400 truncate">{cr.content.slice(0, 80)}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-500 hover:text-slate-700 px-2 py-1 rounded-md hover:bg-slate-50">
                  <input type="checkbox" checked={isInternalNote} onChange={(e) => setIsInternalNote(e.target.checked)} className="w-3.5 h-3.5 rounded" />
                  Internal
                </label>
                {selectedTicket.userEmail && !isInternalNote && selectedTicket.receivedAtMailbox && (
                  <span className="text-[10px] text-blue-600 flex items-center gap-1 ml-auto font-medium">
                    <Reply className="h-3 w-3" /> Reply via {selectedTicket.receivedAtMailbox}
                  </span>
                )}
              </div>

              <RichTextEditor ref={editorRef} placeholder={isInternalNote ? "Internal note (not visible to user)..." : "Write a reply..."} onChange={(html) => setNewNote(html)} initialContent={newNote} />

              <Button onClick={addNote} disabled={(!newNote || newNote === '<p></p>') || addingNote} className={`w-full h-9 ${isInternalNote ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {addingNote ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                {isInternalNote ? 'Add Internal Note' : (selectedTicket.userEmail ? 'Send Reply' : 'Add Note')}
                {!addingNote && <span className="ml-2 text-[10px] opacity-70">⌘↵</span>}
              </Button>
            </div>

          </div>
        )}
      </div>

      <BulkActionBar
        selectedCount={bulk.selectedCount}
        onClear={bulk.clearSelection}
        actions={bulkActions}
      />

      {/* Mobile flyout detail panel */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setSelectedTicket(null)} />
          <div className="relative w-full max-w-2xl bg-white shadow-xl overflow-y-auto animate-in slide-in-from-right">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-5 py-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                {(() => {
                  const TypeIcon = typeIcons[selectedTicket.type];
                  return (
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[selectedTicket.type]}`}>
                      <TypeIcon className="h-3 w-3" />
                      {selectedTicket.type}
                    </span>
                  );
                })()}
                <span className="text-sm font-medium text-slate-700 truncate">
                  #{selectedTicket.id.slice(0, 8)}
                </span>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="p-1 hover:bg-slate-100 rounded">
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Meta info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {(() => {
                    const StatusIcon = { new: Clock, reviewed: Eye, resolved: CheckCircle, archived: Archive }[selectedTicket.status];
                    const PriorityIcon = priorityIcons[selectedTicket.priority];
                    return (
                      <>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedTicket.status]}`}>
                          <StatusIcon className="h-3 w-3" />
                          {selectedTicket.status}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${priorityColors[selectedTicket.priority]}`}>
                          <PriorityIcon className="h-3.5 w-3.5" />
                          {selectedTicket.priority}
                        </span>
                        <div className="ml-auto flex items-center gap-1">
                          <select value={selectedTicket.status} onChange={(e) => updateStatus(selectedTicket.id, e.target.value as FeedbackEntry['status'])} disabled={updating === selectedTicket.id} className="h-7 px-1.5 border rounded text-xs bg-white text-slate-600">
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="resolved">Resolved</option>
                            <option value="archived">Archived</option>
                          </select>
                          <select value={selectedTicket.priority} onChange={(e) => updatePriority(selectedTicket.id, e.target.value as FeedbackEntry['priority'])} disabled={updating === selectedTicket.id} className="h-7 px-1.5 border rounded text-xs bg-white text-slate-600">
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-400 text-xs flex items-center gap-1"><UserCheck className="h-3 w-3" /> Assigned</span>
                  <select value={selectedTicket.assignedTo || ''} onChange={(e) => assignTicket(selectedTicket.id, e.target.value || null)} className="h-7 px-1.5 border rounded text-xs bg-white text-slate-600 min-w-[140px]">
                    <option value="">Unassigned</option>
                    {adminUsers.map(admin => (<option key={admin.id} value={admin.id}>{admin.email}</option>))}
                  </select>
                </div>

                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 w-12 text-xs">From</span>
                    <span className="font-medium text-slate-800">{selectedTicket.userEmail || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 w-12 text-xs">Date</span>
                    <span className="text-slate-600 text-xs">{new Date(selectedTicket.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedTicket.message}</p>
              </div>

              {/* Thread */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <StickyNote className="h-3.5 w-3.5" /> Thread ({selectedTicket.notes.length})
                </h3>
                {selectedTicket.notes.length > 0 && (
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {selectedTicket.notes.map((note) => (
                      <div key={note.id} className={`rounded-lg p-3 ${note.authorEmail === 'External Reply' ? 'bg-slate-50 border border-slate-200' : note.isInternal ? 'bg-amber-50 border border-amber-100' : 'bg-blue-50 border border-blue-100'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-semibold uppercase tracking-wider ${note.authorEmail === 'External Reply' ? 'text-slate-500' : note.isInternal ? 'text-amber-600' : 'text-blue-600'}`}>
                            {note.authorEmail === 'External Reply' ? 'Customer Reply' : note.isInternal ? 'Internal' : 'Sent'}
                          </span>
                          <span className="text-[10px] text-slate-400">{timeAgo(note.createdAt)}</span>
                        </div>
                        {note.content.startsWith('<') ? (
                          <div className="text-sm text-slate-700 prose prose-sm max-w-none [&_a]:text-blue-600 [&_a]:underline" dangerouslySetInnerHTML={{ __html: note.content }} />
                        ) : (
                          <p className="text-sm text-slate-700 whitespace-pre-wrap">{note.content}</p>
                        )}
                        <p className="text-[10px] text-slate-400 mt-1.5">{note.authorEmail}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply */}
                <div className="space-y-2 pt-2 border-t">
                  <RichTextEditor ref={editorRef} placeholder={isInternalNote ? "Internal note..." : "Write a reply..."} onChange={(html) => setNewNote(html)} initialContent={newNote} />
                  <div className="flex items-center justify-between gap-2">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-600">
                      <input type="checkbox" checked={isInternalNote} onChange={(e) => setIsInternalNote(e.target.checked)} className="w-3.5 h-3.5 rounded" />
                      Internal only
                    </label>
                  </div>
                  <Button onClick={addNote} disabled={(!newNote || newNote === '<p></p>') || addingNote} size="sm" className={`w-full ${isInternalNote ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                    {addingNote ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : <Send className="h-3.5 w-3.5 mr-1.5" />}
                    {isInternalNote ? 'Add Note' : (selectedTicket.userEmail ? 'Send Reply' : 'Add Note')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
