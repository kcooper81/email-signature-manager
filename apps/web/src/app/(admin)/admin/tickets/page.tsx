'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, Input, Button, Textarea, Checkbox } from '@/components/ui';
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
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [partnerFilter, setPartnerFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState<FeedbackEntry | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const sort = useSortableTable<FeedbackEntry>('createdAt', 'desc');

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
          };

          const matchesType = typeFilter === 'all' || item.type === typeFilter;
          const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
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
            const audio = new Audio('/sounds/notification.mp3');
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
        partner_organization:partner_organization_id(id, name)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (typeFilter !== 'all') {
      query = query.eq('type', typeFilter);
    }

    if (statusFilter !== 'all') {
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
    if (!selectedTicket || !newNote.trim()) return;

    setAddingNote(true);

    try {
      const response = await fetch(`/api/admin/tickets/${selectedTicket.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newNote.trim(),
          isInternal: isInternalNote,
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

  const filteredTickets = sort.sortData(tickets.filter(ticket => {
    if (search === '') return true;
    const searchLower = search.toLowerCase();
    return (
      ticket.message.toLowerCase().includes(searchLower) ||
      (ticket.userEmail?.toLowerCase().includes(searchLower) ?? false)
    );
  }));

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

  const hasActiveFilters = typeFilter !== 'all' || statusFilter !== 'all' || priorityFilter !== 'all' || partnerFilter !== 'all';

  return (
    <div className="space-y-4">
      {/* Compact header with stats inline */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Inbox className="h-5 w-5 text-slate-700" />
            <h1 className="text-xl font-bold text-slate-900">Inbox</h1>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-violet-100 text-violet-700 font-medium">
              {totalCount} total
            </span>
            {stats.new > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">
                {stats.new} new
              </span>
            )}
            {stats.urgent > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                {stats.urgent} urgent
              </span>
            )}
            {stats.email > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                {stats.email} email
              </span>
            )}
          </div>
        </div>
        <button
          onClick={toggleNotifications}
          className={`p-2 rounded-lg transition-colors ${
            notificationsEnabled
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
          }`}
          title={notificationsEnabled ? 'Live notifications on' : 'Enable live notifications'}
        >
          {notificationsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
        </button>
      </div>

      {/* Search + filters in one row */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <select
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setPage(0); }}
            className="h-9 px-2 border rounded-lg text-xs bg-white text-slate-700"
          >
            <option value="all">Type</option>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
            <option value="question">Question</option>
            <option value="email">Email</option>
            <option value="sales">Sales</option>
            <option value="other">Other</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
            className="h-9 px-2 border rounded-lg text-xs bg-white text-slate-700"
          >
            <option value="all">Status</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="resolved">Resolved</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => { setPriorityFilter(e.target.value); setPage(0); }}
            className="h-9 px-2 border rounded-lg text-xs bg-white text-slate-700"
          >
            <option value="all">Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
          <select
            value={partnerFilter}
            onChange={(e) => { setPartnerFilter(e.target.value); setPage(0); }}
            className="h-9 px-2 border rounded-lg text-xs bg-white text-slate-700"
          >
            <option value="all">Source</option>
            <option value="escalations">Escalations</option>
            <option value="partner">Partners</option>
          </select>
          {hasActiveFilters && (
            <button
              onClick={() => { setTypeFilter('all'); setStatusFilter('all'); setPriorityFilter('all'); setPartnerFilter('all'); setPage(0); }}
              className="h-9 px-2 text-xs text-slate-500 hover:text-slate-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Sort bar + select all */}
      {filteredTickets.length > 0 && (
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={bulk.allSelected}
              onCheckedChange={bulk.toggleAll}
              aria-label="Select all"
            />
            <span>{filteredTickets.length} of {totalCount}</span>
            <span className="text-slate-300">|</span>
            <SortButton field="createdAt" label="Date" currentSort={sort.sortField} currentDir={sort.sortDir} onToggle={sort.toggleSort} />
            <SortButton field="priority" label="Priority" currentSort={sort.sortField} currentDir={sort.sortDir} onToggle={sort.toggleSort} />
            <SortButton field="type" label="Type" currentSort={sort.sortField} currentDir={sort.sortDir} onToggle={sort.toggleSort} />
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <span>{page + 1}/{totalPages}</span>
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="p-1 hover:bg-slate-100 rounded disabled:opacity-30">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-1 hover:bg-slate-100 rounded disabled:opacity-30">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Ticket list — inbox style */}
      <Card className="overflow-hidden">
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

                return (
                  <div
                    key={ticket.id}
                    onClick={() => openTicketDetail(ticket)}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                      isUnread ? 'bg-blue-50/40' : ''
                    } ${selectedTicket?.id === ticket.id ? 'bg-blue-50' : ''}`}
                  >
                    <div onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={bulk.isSelected(ticket.id)}
                        onCheckedChange={() => bulk.toggle(ticket.id)}
                        aria-label={`Select ticket`}
                      />
                    </div>

                    <PriorityIcon className={`h-3.5 w-3.5 shrink-0 ${priorityColors[ticket.priority]}`} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${typeColors[ticket.type]}`}>
                          <TypeIcon className="h-2.5 w-2.5" />
                          {ticket.type}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${statusColors[ticket.status]}`}>
                          {ticket.status}
                        </span>
                        <span className={`truncate text-sm ${isUnread ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
                          {ticket.userEmail || 'Anonymous'}
                        </span>
                        {ticket.receivedAtMailbox && (
                          <span className="hidden md:inline text-[10px] text-emerald-600 font-medium">
                            → {ticket.receivedAtMailbox}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm truncate mt-0.5 ${isUnread ? 'text-slate-700' : 'text-slate-500'}`}>
                        {ticket.message.replace(/^From:.*?\n(Subject:.*?\n)?(\n)?/s, '')}
                      </p>
                    </div>

                    <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[11px] text-slate-400 whitespace-nowrap">{timeAgo(ticket.createdAt)}</span>
                      {ticket.isPartnerEscalation && (
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
        <div className="flex items-center justify-between sm:hidden text-sm">
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

      <BulkActionBar
        selectedCount={bulk.selectedCount}
        onClear={bulk.clearSelection}
        actions={bulkActions}
      />

      {/* Detail panel */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setSelectedTicket(null)} />
          <div className="relative w-full max-w-lg bg-white shadow-xl overflow-y-auto animate-in slide-in-from-right">
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
              {/* Meta info - compact */}
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
                        {/* Inline status/priority dropdowns */}
                        <div className="ml-auto flex items-center gap-1">
                          <select
                            value={selectedTicket.status}
                            onChange={(e) => updateStatus(selectedTicket.id, e.target.value as FeedbackEntry['status'])}
                            disabled={updating === selectedTicket.id}
                            className="h-7 px-1.5 border rounded text-xs bg-white text-slate-600"
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="resolved">Resolved</option>
                            <option value="archived">Archived</option>
                          </select>
                          <select
                            value={selectedTicket.priority}
                            onChange={(e) => updatePriority(selectedTicket.id, e.target.value as FeedbackEntry['priority'])}
                            disabled={updating === selectedTicket.id}
                            className="h-7 px-1.5 border rounded text-xs bg-white text-slate-600"
                          >
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

                {/* Email routing info */}
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 w-12 text-xs">From</span>
                    <span className="font-medium text-slate-800">{selectedTicket.userEmail || 'Anonymous'}</span>
                  </div>
                  {selectedTicket.receivedAtMailbox && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 w-12 text-xs">To</span>
                      <span className="font-medium text-emerald-700">{selectedTicket.receivedAtMailbox}</span>
                    </div>
                  )}
                  {selectedTicket.receivedAtMailbox && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 w-12 text-xs">Reply</span>
                      <span className="flex items-center gap-1 text-blue-600 text-xs font-medium">
                        <Reply className="h-3 w-3" />
                        {selectedTicket.receivedAtMailbox}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 w-12 text-xs">Date</span>
                    <span className="text-slate-600 text-xs">{new Date(selectedTicket.createdAt).toLocaleString()}</span>
                  </div>
                  {selectedTicket.organizationName && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 w-12 text-xs">Org</span>
                      <span className="text-slate-600 text-xs">{selectedTicket.organizationName}</span>
                    </div>
                  )}
                  {selectedTicket.pageUrl && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 w-12 text-xs">Page</span>
                      <a href={selectedTicket.pageUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Message body */}
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedTicket.message}</p>
              </div>

              {/* Conversation thread */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <StickyNote className="h-3.5 w-3.5" />
                  Thread ({selectedTicket.notes.length})
                </h3>

                {selectedTicket.notes.length > 0 && (
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {selectedTicket.notes.map((note) => (
                      <div
                        key={note.id}
                        className={`rounded-lg p-3 ${
                          note.authorEmail === 'External Reply'
                            ? 'bg-slate-50 border border-slate-200'
                            : note.isInternal
                            ? 'bg-amber-50 border border-amber-100'
                            : 'bg-blue-50 border border-blue-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                            note.authorEmail === 'External Reply'
                              ? 'text-slate-500'
                              : note.isInternal ? 'text-amber-600' : 'text-blue-600'
                          }`}>
                            {note.authorEmail === 'External Reply'
                              ? 'Customer Reply'
                              : note.isInternal ? 'Internal' : 'Sent'}
                          </span>
                          <span className="text-[10px] text-slate-400">{timeAgo(note.createdAt)}</span>
                        </div>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{note.content}</p>
                        <p className="text-[10px] text-slate-400 mt-1.5">{note.authorEmail}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply composer */}
                <div className="space-y-2 pt-2 border-t">
                  <Textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder={isInternalNote
                      ? "Internal note (not visible to user)..."
                      : "Write a reply..."
                    }
                    className="min-h-[80px] resize-none text-sm"
                  />

                  <div className="flex items-center justify-between gap-2">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={isInternalNote}
                        onChange={(e) => setIsInternalNote(e.target.checked)}
                        className="w-3.5 h-3.5 rounded"
                      />
                      Internal only
                    </label>

                    {selectedTicket.userEmail && !isInternalNote && selectedTicket.receivedAtMailbox && (
                      <span className="text-[10px] text-blue-600 flex items-center gap-1">
                        <Reply className="h-3 w-3" />
                        via {selectedTicket.receivedAtMailbox}
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={addNote}
                    disabled={!newNote.trim() || addingNote}
                    size="sm"
                    className={`w-full ${
                      isInternalNote
                        ? 'bg-amber-600 hover:bg-amber-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {addingNote ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                    ) : (
                      <Send className="h-3.5 w-3.5 mr-1.5" />
                    )}
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
