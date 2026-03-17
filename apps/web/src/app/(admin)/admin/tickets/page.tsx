'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Input, Button, Checkbox } from '@/components/ui';
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
  PenSquare,
  ShieldBan,
  ShieldCheck,
  Trash2,
  Forward,
  MailOpen,
  CircleDot,
} from 'lucide-react';
import { useSortableTable } from '@/hooks/use-sortable-table';
import { SortButton } from '@/components/admin/sortable-header';
import { SafeHtmlViewer } from '@/components/admin/safe-html-viewer';

interface TicketNote {
  id: string;
  content: string;
  htmlBody: string | null;
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
  htmlBody: string | null;
  pageUrl: string | null;
  status: 'new' | 'reviewed' | 'resolved' | 'archived' | 'spam';
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

const statusColors: Record<string, string> = {
  new: 'bg-violet-100 text-violet-700',
  reviewed: 'bg-blue-100 text-blue-700',
  resolved: 'bg-green-100 text-green-700',
  archived: 'bg-slate-100 text-slate-700',
  spam: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  new: 'New',
  reviewed: 'In Progress',
  resolved: 'Resolved',
  archived: 'Closed',
  spam: 'Spam',
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
  // Compose modal state
  const [showCompose, setShowCompose] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeSendAs, setComposeSendAs] = useState('support@siggly.io');
  const [composeSending, setComposeSending] = useState(false);
  const [composeSuccess, setComposeSuccess] = useState<string | null>(null);
  const [composeError, setComposeError] = useState<string | null>(null);
  const composeEditorRef = useRef<RichTextEditorRef>(null);
  const [userSuggestions, setUserSuggestions] = useState<{ email: string; name: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchingUsers, setSearchingUsers] = useState(false);
  const [composeCc, setComposeCc] = useState('');
  const [composeBcc, setComposeBcc] = useState('');
  const [showCcBcc, setShowCcBcc] = useState(false);
  // Reply CC/BCC
  const [replyCc, setReplyCc] = useState('');
  const [replyBcc, setReplyBcc] = useState('');
  const [showReplyCcBcc, setShowReplyCcBcc] = useState(false);
  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  // Toast notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();
  const sort = useSortableTable<FeedbackEntry>('createdAt', 'desc');
  const ticketListRef = useRef<HTMLDivElement>(null);
  const initialLoadDone = useRef(false);

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
    loadCurrentUser();
    loadCannedResponses();
    loadAdminUsers();
  }, []);

  useEffect(() => {
    loadTickets();
  }, [page, typeFilter, statusFilter, priorityFilter, partnerFilter, currentUserId]);

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
            htmlBody: item.html_body || null,
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
          const isOpen = ['new', 'reviewed'].includes(item.status);
          const matchesStatus = statusFilter === 'all'
            || (statusFilter === 'open' && isOpen)
            || (statusFilter === 'mine' && isOpen && item.assigned_to === currentUserId)
            || (statusFilter === 'unassigned' && isOpen && !item.assigned_to)
            || (statusFilter === 'done' && ['resolved', 'archived'].includes(item.status));
          const matchesPriority = priorityFilter === 'all' || (item.priority || 'normal') === priorityFilter;

          if (matchesType && matchesStatus && matchesPriority) {
            if (page === 0) {
              setTickets(prev => [newEntry, ...prev]);
            }
            setTotalCount(prev => prev + 1);
          }

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
          const updates: Partial<FeedbackEntry> = {
            status: item.status,
            priority: item.priority || 'normal',
            updatedAt: item.updated_at,
            assignedTo: item.assigned_to || null,
            snoozedUntil: item.snoozed_until || null,
          };
          // Look up assigned email from the current ticket list
          if (item.assigned_to) {
            setTickets(prev => {
              const existing = prev.find(t => t.id === item.id);
              if (existing && existing.assignedTo !== item.assigned_to) {
                // Will be resolved on next full load; keep existing email if same assignee
                updates.assignedEmail = null;
              }
              return prev;
            });
          } else {
            updates.assignedEmail = null;
          }
          setTickets(prev => prev.map(t => t.id === item.id ? { ...t, ...updates } : t));
          setSelectedTicket(prev => {
            if (!prev || prev.id !== item.id) return prev;
            return { ...prev, ...updates };
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'feedback' },
        (payload) => {
          const id = (payload.old as any)?.id;
          if (id) {
            setTickets(prev => prev.filter(t => t.id !== id));
            setSelectedTicket(prev => prev?.id === id ? null : prev);
            setTotalCount(prev => Math.max(0, prev - 1));
          }
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
  }, [page, typeFilter, statusFilter, priorityFilter, notificationsEnabled, currentUserId]);

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

    if (statusFilter === 'spam') {
      query = query.eq('status', 'spam');
    } else if (statusFilter === 'open') {
      query = query.in('status', ['new', 'reviewed']);
    } else if (statusFilter === 'mine') {
      if (!currentUserId) {
        setTickets([]);
        setTotalCount(0);
        setLoading(false);
        return;
      }
      query = query.in('status', ['new', 'reviewed']).eq('assigned_to', currentUserId);
    } else if (statusFilter === 'unassigned') {
      query = query.in('status', ['new', 'reviewed']);
      query = query.is('assigned_to', null);
    } else if (statusFilter === 'sent') {
      query = query.contains('metadata', { source: 'admin_compose' });
      query = query.neq('status', 'spam');
    } else if (statusFilter === 'done') {
      query = query.in('status', ['resolved', 'archived']);
    } else if (statusFilter === 'all') {
      query = query.neq('status', 'spam');
    } else {
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
      htmlBody: item.html_body || null,
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

    // Auto-select first ticket on initial load (desktop only)
    if (!initialLoadDone.current && mapped.length > 0 && window.innerWidth >= 1024) {
      initialLoadDone.current = true;
      openTicketDetail(mapped[0]);
    } else if (!initialLoadDone.current) {
      initialLoadDone.current = true;
    }
  };

  const loadTicketNotes = async (ticketId: string) => {
    const supabase = createClient();
    const { data: notes } = await supabase
      .from('ticket_notes')
      .select('id, content, html_body, is_internal, created_at, author_id')
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
      htmlBody: n.html_body || null,
      authorEmail: n.author_id ? (authorMap.get(n.author_id) || 'Unknown') : 'External Reply',
      isInternal: n.is_internal,
      createdAt: n.created_at,
    }));
  };

  const openTicketDetail = async (ticket: FeedbackEntry) => {
    const notes = await loadTicketNotes(ticket.id);
    setSelectedTicket({ ...ticket, notes });

    // Auto-mark as read: transition "new" → "reviewed" on open
    if (ticket.status === 'new') {
      const supabase = createClient();
      await supabase
        .from('feedback')
        .update({ status: 'reviewed', updated_at: new Date().toISOString() })
        .eq('id', ticket.id);

      setTickets(prev => prev.map(t =>
        t.id === ticket.id ? { ...t, status: 'reviewed' as const } : t
      ));
      setSelectedTicket(prev => prev ? { ...prev, status: 'reviewed' as const } : prev);
    }
  };

  const updateStatus = async (id: string, newStatus: FeedbackEntry['status']) => {
    setUpdating(id);
    const supabase = createClient();

    // Find the ticket to check assignedTo for filter matching
    const ticket = tickets.find(t => t.id === id);

    const { error } = await supabase
      .from('feedback')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error);
      showToast('Failed to update status', 'error');
    } else {
      const shouldRemove = !matchesCurrentFilter(newStatus, ticket?.assignedTo || null);
      if (shouldRemove) {
        removeAndAdvance(id);
      } else {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
        if (selectedTicket?.id === id) {
          setSelectedTicket(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
      showToast(`Ticket marked as ${statusLabels[newStatus] || newStatus}`);
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
      showToast('Failed to update priority', 'error');
    } else {
      setTickets(prev => prev.map(t => t.id === id ? { ...t, priority: newPriority } : t));
      if (selectedTicket?.id === id) {
        setSelectedTicket(prev => prev ? { ...prev, priority: newPriority } : null);
      }
      showToast(`Priority set to ${newPriority}`);
    }

    setUpdating(null);
  };

  const addNoteRef = useRef(false);
  const addNote = async () => {
    const htmlContent = editorRef.current?.getHTML() || '';
    const textContent = editorRef.current?.getText()?.trim() || '';
    if (!selectedTicket || !textContent || addNoteRef.current) return;

    addNoteRef.current = true;
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
          cc: replyCc || undefined,
          bcc: replyBcc || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add note');
      }

      const result = await response.json();

      if (result.success) {
        // Clear the form — the realtime subscription will add the note to the UI
        setNewNote('');
        editorRef.current?.clear();
        setIsInternalNote(false);
        setReplyCc('');
        setReplyBcc('');
        setShowReplyCcBcc(false);

        if (result.warning) {
          showToast(result.warning, 'error');
        } else {
          showToast(isInternalNote ? 'Internal note added' : 'Reply sent');
        }
      }
    } catch (error) {
      console.error('Error adding note:', error);
      showToast('Failed to send reply', 'error');
    }

    setAddingNote(false);
    addNoteRef.current = false;
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

  // Search users and ticket contacts for the To field
  const searchRecipients = async (query: string) => {
    if (query.length < 2) {
      setUserSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setSearchingUsers(true);
    const supabase = createClient();

    // Sanitize query for Supabase filter safety
    const sanitizedQuery = query.replace(/[,%()\\]/g, '');

    // Search users by email or name
    const { data: users } = await supabase
      .from('users')
      .select('email, first_name, last_name')
      .or(`email.ilike.%${sanitizedQuery}%,first_name.ilike.%${sanitizedQuery}%,last_name.ilike.%${sanitizedQuery}%`)
      .limit(8);

    // Also search recent ticket contacts
    const { data: contacts } = await supabase
      .from('feedback')
      .select('user_email')
      .ilike('user_email', `%${sanitizedQuery}%`)
      .not('user_email', 'is', null)
      .limit(5);

    const results = new Map<string, string>();

    // Add users
    (users || []).forEach(u => {
      const name = [u.first_name, u.last_name].filter(Boolean).join(' ');
      if (u.email) results.set(u.email, name || u.email);
    });

    // Add ticket contacts (dedup)
    (contacts || []).forEach(c => {
      if (c.user_email && !results.has(c.user_email)) {
        results.set(c.user_email, c.user_email);
      }
    });

    setUserSuggestions(
      Array.from(results.entries()).map(([email, name]) => ({ email, name }))
    );
    setShowSuggestions(true);
    setSearchingUsers(false);
  };

  const sendComposeEmail = async () => {
    const htmlContent = composeEditorRef.current?.getHTML() || '';
    const textContent = composeEditorRef.current?.getText()?.trim() || '';
    if (!composeTo.trim() || !composeSubject.trim() || !textContent) return;

    setComposeSending(true);
    setComposeError(null);
    setComposeSuccess(null);

    try {
      const res = await fetch('/api/admin/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: composeTo.trim(),
          subject: composeSubject.trim(),
          body: htmlContent,
          sendAs: composeSendAs,
          cc: composeCc || undefined,
          bcc: composeBcc || undefined,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setComposeError(result.error || 'Failed to send email');
      } else {
        setComposeSuccess(result.warning || `Email sent to ${composeTo.trim()}`);
        // Reset form after brief delay
        setTimeout(() => {
          setComposeTo('');
          setComposeSubject('');
          setComposeCc('');
          setComposeBcc('');
          setShowCcBcc(false);
          composeEditorRef.current?.clear();
          setComposeSuccess(null);
          setShowCompose(false);
        }, 2000);
      }
    } catch {
      setComposeError('Failed to send email');
    }

    setComposeSending(false);
  };

  const markAsSpam = async (ticketId: string) => {
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'spam' }),
      });
      if (res.ok) {
        const shouldRemove = !matchesCurrentFilter('spam', tickets.find(t => t.id === ticketId)?.assignedTo || null);
        if (shouldRemove) {
          removeAndAdvance(ticketId);
        } else {
          setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'spam' as const } : t));
          if (selectedTicket?.id === ticketId) {
            setSelectedTicket(prev => prev ? { ...prev, status: 'spam' as const } : null);
          }
        }
        showToast('Marked as spam');
      }
    } catch { console.error('Failed to mark spam'); }
  };

  const markNotSpam = async (ticketId: string) => {
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'not_spam' }),
      });
      if (res.ok) {
        const shouldRemove = !matchesCurrentFilter('new', tickets.find(t => t.id === ticketId)?.assignedTo || null);
        if (shouldRemove) {
          removeAndAdvance(ticketId);
        } else {
          setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'new' as const } : t));
          if (selectedTicket?.id === ticketId) {
            setSelectedTicket(prev => prev ? { ...prev, status: 'new' as const } : null);
          }
        }
        showToast('Removed from spam');
      }
    } catch { console.error('Failed to unmark spam'); }
  };

  const markUnread = async (ticketId: string) => {
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_unread' }),
      });
      if (res.ok) {
        setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'new' as const } : t));
        if (selectedTicket?.id === ticketId) {
          setSelectedTicket(prev => prev ? { ...prev, status: 'new' as const } : null);
        }
        showToast('Marked as unread');
      }
    } catch { console.error('Failed to mark unread'); }
  };

  const deleteTicket = async (ticketId: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, { method: 'DELETE' });
      if (res.ok) {
        removeAndAdvance(ticketId);
        showToast('Ticket deleted');
      }
    } catch { console.error('Failed to delete ticket'); }
    setDeleting(false);
    setDeleteConfirmId(null);
  };

  const forwardTicket = (ticket: FeedbackEntry) => {
    // Pre-fill compose modal with forwarded content
    const fwdSubject = `Fwd: ${(ticket as any).metadata?.original_subject || ticket.message.split('\n')[0]?.replace(/^(From|Subject):\s*/i, '') || 'Ticket #' + ticket.id.slice(0, 8)}`;
    const fwdBody = ticket.htmlBody || `<p>${ticket.message.replace(/\n/g, '<br>')}</p>`;
    setComposeSubject(fwdSubject);
    setComposeTo('');
    composeEditorRef.current?.setContent(
      `<br><br><div style="border-left: 3px solid #ccc; padding-left: 12px; margin-left: 4px; color: #666;">` +
      `<p><strong>---------- Forwarded message ----------</strong><br>` +
      `From: ${ticket.userEmail || 'Unknown'}<br>` +
      `Date: ${new Date(ticket.createdAt).toLocaleString()}<br>` +
      `Subject: ${fwdSubject.replace('Fwd: ', '')}</p>` +
      `${fwdBody}</div>`
    );
    setShowCompose(true);
  };

  const assignTicket = async (ticketId: string, userId: string | null) => {
    const supabase = createClient();
    const ticket = tickets.find(t => t.id === ticketId);
    const { error } = await supabase
      .from('feedback')
      .update({ assigned_to: userId, updated_at: new Date().toISOString() })
      .eq('id', ticketId);
    if (!error) {
      const assignedEmail = adminUsers.find(a => a.id === userId)?.email || null;
      const shouldRemove = !matchesCurrentFilter(ticket?.status || 'new', userId);
      if (shouldRemove) {
        removeAndAdvance(ticketId);
      } else {
        setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, assignedTo: userId, assignedEmail: assignedEmail } : t));
        if (selectedTicket?.id === ticketId) {
          setSelectedTicket(prev => prev ? { ...prev, assignedTo: userId, assignedEmail: assignedEmail } : null);
        }
      }
      showToast(userId ? `Assigned to ${assignedEmail?.split('@')[0] || 'user'}` : 'Unassigned');
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
        showToast('Ticket snoozed');
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
        showToast('Ticket unsnoozed');
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
    // Pin unread (new) tickets to top, then sort by most recent activity
    const unread = sorted.filter(t => t.status === 'new').sort((a, b) =>
      new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
    );
    const read = sorted.filter(t => t.status !== 'new').sort((a, b) =>
      new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
    );
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

  const openTickets = tickets.filter(t => t.status === 'new' || t.status === 'reviewed');
  const stats = {
    new: tickets.filter(t => t.status === 'new').length,
    mine: openTickets.filter(t => t.assignedTo === currentUserId).length,
    unassigned: openTickets.filter(t => !t.assignedTo).length,
  };

  const bulkUpdateStatus = async (newStatus: FeedbackEntry['status']) => {
    const ids = [...bulk.selectedIds];
    const supabase = createClient();
    const { error } = await supabase
      .from('feedback')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .in('id', ids);
    if (!error) {
      // Check if any of the updated tickets should be removed from current view
      const idsToRemove = ids.filter(id => {
        const ticket = tickets.find(t => t.id === id);
        return !matchesCurrentFilter(newStatus, ticket?.assignedTo || null);
      });
      if (idsToRemove.length > 0) {
        setTickets(prev => prev.filter(t => !idsToRemove.includes(t.id)));
        setTotalCount(prev => Math.max(0, prev - idsToRemove.length));
        if (selectedTicket && idsToRemove.includes(selectedTicket.id)) setSelectedTicket(null);
      }
      // Update remaining tickets that still match
      const idsToUpdate = ids.filter(id => !idsToRemove.includes(id));
      if (idsToUpdate.length > 0) {
        setTickets(prev => prev.map(t => idsToUpdate.includes(t.id) ? { ...t, status: newStatus } : t));
      }
      bulk.clearSelection();
      showToast(`${ids.length} ticket(s) marked as ${statusLabels[newStatus] || newStatus}`);
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
      showToast(`${ids.length} ticket(s) priority set to ${newPriority}`);
    }
  };

  const bulkAssignToMe = async () => {
    if (!currentUserId) return;
    const supabase = createClient();
    const ids = Array.from(bulk.selectedIds);
    const myEmail = adminUsers.find(a => a.id === currentUserId)?.email || null;
    const { error } = await supabase.from('feedback').update({ assigned_to: currentUserId, updated_at: new Date().toISOString() }).in('id', ids);
    if (!error) {
      setTickets(prev => prev.map(t => ids.includes(t.id) ? { ...t, assignedTo: currentUserId, assignedEmail: myEmail } : t));
      bulk.clearSelection();
      showToast(`${ids.length} ticket(s) assigned to you`);
    }
  };

  const bulkDeleteTickets = async () => {
    const ids = [...bulk.selectedIds];
    const supabase = createClient();
    const { error } = await supabase.from('feedback').delete().in('id', ids);
    if (!error) {
      setTickets(prev => prev.filter(t => !ids.includes(t.id)));
      setTotalCount(prev => Math.max(0, prev - ids.length));
      if (selectedTicket && ids.includes(selectedTicket.id)) setSelectedTicket(null);
      bulk.clearSelection();
      showToast(`${ids.length} ticket(s) deleted`);
    }
  };

  const bulkActions: BulkAction[] = [
    { label: 'Assign to me', icon: UserCheck, onClick: bulkAssignToMe },
    { label: 'Mark Unread', icon: CircleDot, onClick: () => bulkUpdateStatus('new') },
    { label: 'In Progress', icon: Eye, onClick: () => bulkUpdateStatus('reviewed') },
    { label: 'Resolve', icon: CheckCircle, onClick: () => bulkUpdateStatus('resolved') },
    { label: 'Priority: High', icon: ArrowUp, onClick: () => bulkUpdatePriority('high') },
    { label: 'Priority: Low', icon: ArrowDown, onClick: () => bulkUpdatePriority('low') },
    ...(statusFilter === 'spam'
      ? [{ label: 'Not Spam', icon: ShieldCheck, onClick: () => bulkUpdateStatus('new') } as BulkAction]
      : [{ label: 'Spam', icon: ShieldBan, onClick: () => bulkUpdateStatus('spam'), destructive: true, confirmMessage: `Mark ${bulk.selectedCount} ticket(s) as spam?` } as BulkAction]
    ),
    { label: 'Close', icon: Archive, onClick: () => bulkUpdateStatus('archived'), destructive: true, confirmMessage: `Close ${bulk.selectedCount} ticket(s)?` },
    { label: 'Delete', icon: Trash2, onClick: bulkDeleteTickets, destructive: true, confirmMessage: `Permanently delete ${bulk.selectedCount} ticket(s)? This cannot be undone.` },
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

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  /** Check if a ticket with the given status still belongs in the current filter view */
  const matchesCurrentFilter = (status: FeedbackEntry['status'], assignedTo: string | null) => {
    if (statusFilter === 'open') return ['new', 'reviewed'].includes(status);
    if (statusFilter === 'mine') return ['new', 'reviewed'].includes(status) && assignedTo === currentUserId;
    if (statusFilter === 'unassigned') return ['new', 'reviewed'].includes(status) && !assignedTo;
    if (statusFilter === 'done') return ['resolved', 'archived'].includes(status);
    if (statusFilter === 'spam') return status === 'spam';
    if (statusFilter === 'all') return status !== 'spam';
    return true;
  };

  /** Remove ticket from list and auto-advance to next one */
  const removeAndAdvance = (ticketId: string) => {
    const idx = filteredTickets.findIndex(t => t.id === ticketId);
    const nextTicket = filteredTickets[idx + 1] || filteredTickets[idx - 1] || null;
    setTickets(prev => prev.filter(t => t.id !== ticketId));
    setTotalCount(prev => Math.max(0, prev - 1));
    if (selectedTicket?.id === ticketId) {
      if (nextTicket && nextTicket.id !== ticketId) {
        openTicketDetail(nextTicket);
      } else {
        setSelectedTicket(null);
      }
    }
  };

  const STATUS_TABS = [
    { key: 'open', label: 'Open' },
    { key: 'mine', label: 'Mine' },
    { key: 'unassigned', label: 'Unassigned' },
    { key: 'sent', label: 'Sent' },
    { key: 'done', label: 'Done' },
    { key: 'spam', label: 'Spam' },
    { key: 'all', label: 'All' },
  ];

  return (
    <div className="space-y-4">
      {/* Header row — title + actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Inbox className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Inbox</h1>
            <p className="text-sm text-muted-foreground">{totalCount} ticket{totalCount !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            onClick={() => setShowCompose(true)}
            size="sm"
            className="h-9 gap-1.5"
          >
            <PenSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Compose</span>
          </Button>
          <button onClick={() => setHideSnoozed(!hideSnoozed)} className={`p-2 rounded-lg transition-colors ${!hideSnoozed ? 'bg-amber-100 text-amber-700' : 'text-muted-foreground hover:bg-muted'}`} title={hideSnoozed ? 'Snoozed hidden' : 'Showing snoozed'}>
            <AlarmClock className="h-4 w-4" />
          </button>
          <button onClick={toggleNotifications} className={`p-2 rounded-lg transition-colors ${notificationsEnabled ? 'bg-blue-100 text-blue-700' : 'text-muted-foreground hover:bg-muted'}`} title={notificationsEnabled ? 'Notifications on' : 'Enable notifications'}>
            {notificationsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
          </button>
          <div className="hidden lg:flex items-center gap-1.5 ml-2 text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 bg-muted border rounded text-[10px] font-mono">j</kbd><span>/</span><kbd className="px-1.5 py-0.5 bg-muted border rounded text-[10px] font-mono">k</kbd>
            <kbd className="px-1.5 py-0.5 bg-muted border rounded text-[10px] font-mono">r</kbd>
            <kbd className="px-1.5 py-0.5 bg-muted border rounded text-[10px] font-mono">e</kbd>
          </div>
        </div>
      </div>

      {/* Status tabs — own row, scrollable on mobile */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none border-b">
        {STATUS_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => { setStatusFilter(tab.key); setPage(0); }}
            className={`px-3 py-2 text-sm font-medium rounded-t-md transition-colors whitespace-nowrap border-b-2 ${
              statusFilter === tab.key
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {tab.label}
            {tab.key === 'open' && stats.new > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">{stats.new}</span>
            )}
            {tab.key === 'mine' && stats.mine > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">{stats.mine}</span>
            )}
            {tab.key === 'unassigned' && stats.unassigned > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold">{stats.unassigned}</span>
            )}
          </button>
        ))}
      </div>

      {/* Split pane: list left, detail right on desktop */}
      <div className={`flex gap-0 rounded-lg border bg-card overflow-hidden ${selectedTicket ? 'lg:flex-row' : ''}`} style={selectedTicket ? { height: 'calc(100vh - 140px)' } : undefined}>
        {/* Ticket list — inbox style */}
        <div className={`${selectedTicket ? 'hidden lg:flex lg:flex-col lg:w-[400px] lg:min-w-[400px] lg:max-w-[400px] lg:shrink-0' : 'w-full'}`}>
          {/* Search + filter inside the list pane */}
          <div className="flex items-center gap-2 px-3 py-3 border-b bg-muted/30">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-9 text-sm"
              />
            </div>
            {/* Filter popover button */}
            <div className="relative">
              <button
                onClick={() => setShowFilterPopover(!showFilterPopover)}
                className={`h-9 px-2.5 border rounded-md text-sm flex items-center gap-1.5 transition-colors ${
                  hasActiveFilters ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-background text-muted-foreground hover:bg-muted'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
              {showFilterPopover && (
                <div className="absolute right-0 top-10 bg-popover border rounded-lg shadow-lg p-4 z-30 w-60 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Type</label>
                    <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(0); }} className="w-full h-9 px-2.5 border rounded-md text-sm bg-background">
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
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Priority</label>
                    <select value={priorityFilter} onChange={(e) => { setPriorityFilter(e.target.value); setPage(0); }} className="w-full h-9 px-2.5 border rounded-md text-sm bg-background">
                      <option value="all">All priorities</option>
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="normal">Normal</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Source</label>
                    <select value={partnerFilter} onChange={(e) => { setPartnerFilter(e.target.value); setPage(0); }} className="w-full h-9 px-2.5 border rounded-md text-sm bg-background">
                      <option value="all">All sources</option>
                      <option value="escalations">Escalations</option>
                      <option value="partner">Partners</option>
                    </select>
                  </div>
                  {hasActiveFilters && (
                    <button onClick={() => { setTypeFilter('all'); setPriorityFilter('all'); setPartnerFilter('all'); setPage(0); setShowFilterPopover(false); }} className="w-full h-8 text-xs text-red-600 hover:bg-red-50 rounded-md border border-red-200 font-medium">
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sort bar */}
          {filteredTickets.length > 0 && (
            <div className="flex items-center justify-between text-xs text-muted-foreground px-3 py-2 bg-muted/40 border-b">
              <div className="flex items-center gap-3">
                <Checkbox checked={bulk.allSelected} onCheckedChange={bulk.toggleAll} aria-label="Select all" />
                <span className="font-medium">{filteredTickets.length} tickets</span>
                <SortButton field="createdAt" label="Date" currentSort={sort.sortField} currentDir={sort.sortDir} onToggle={sort.toggleSort} />
                <SortButton field="priority" label="Priority" currentSort={sort.sortField} currentDir={sort.sortDir} onToggle={sort.toggleSort} />
              </div>
              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">{page + 1}/{totalPages}</span>
                  <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="p-1 hover:bg-muted rounded disabled:opacity-30"><ChevronLeft className="h-3.5 w-3.5" /></button>
                  <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-1 hover:bg-muted rounded disabled:opacity-30"><ChevronRight className="h-3.5 w-3.5" /></button>
                </div>
              )}
            </div>
          )}

          <div className={`flex-1 overflow-y-auto ${selectedTicket ? 'lg:border-r' : ''}`}>
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <Inbox className="h-10 w-10 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium">No tickets found</p>
                  <p className="text-xs mt-1">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredTickets.map((ticket) => {
                    const TypeIcon = typeIcons[ticket.type];
                    const PriorityIcon = priorityIcons[ticket.priority];
                    const isUnread = ticket.status === 'new';

                    const isCompact = !!selectedTicket;

                    return (
                      <div
                        key={ticket.id}
                        onClick={() => openTicketDetail(ticket)}
                        className={`flex items-start gap-3 px-4 py-4 cursor-pointer transition-all ${
                          selectedTicket?.id === ticket.id
                            ? 'bg-primary/5 border-l-[3px] border-l-primary'
                            : isUnread
                              ? 'bg-blue-50/40 border-l-[3px] border-l-blue-400 hover:bg-blue-50/70'
                              : 'border-l-[3px] border-l-transparent hover:bg-muted/50'
                        }`}
                      >
                        <div onClick={(e) => e.stopPropagation()} className="pt-0.5">
                          <Checkbox
                            checked={bulk.isSelected(ticket.id)}
                            onCheckedChange={() => bulk.toggle(ticket.id)}
                            aria-label={`Select ticket`}
                          />
                        </div>

                        <PriorityIcon className={`h-4 w-4 shrink-0 mt-0.5 ${priorityColors[ticket.priority]}`} />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${typeColors[ticket.type]}`}>
                              <TypeIcon className="h-2.5 w-2.5" />
                              {ticket.type}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${statusColors[ticket.status]}`}>
                              {statusLabels[ticket.status] || ticket.status}
                            </span>
                            {ticket.receivedAtMailbox && (
                              <span className="text-[10px] text-emerald-600 font-medium">
                                → {ticket.receivedAtMailbox.split('@')[0]}
                              </span>
                            )}
                          </div>
                          <p className={`truncate text-sm mb-1 ${isUnread ? 'font-bold text-foreground' : 'text-foreground/80'}`}>
                            {ticket.userEmail || 'Anonymous'}
                          </p>
                          <p className={`truncate text-xs ${isUnread ? 'text-foreground/70 font-medium' : 'text-muted-foreground'}`}>
                            {ticket.message.replace(/^From:.*?\n(Subject:.*?\n)?(\n)?/s, '')}
                          </p>
                          {/* Metadata row */}
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            {ticket.assignedEmail && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium flex items-center gap-0.5 max-w-[120px] truncate">
                                <UserCheck className="h-2.5 w-2.5 shrink-0" />
                                {ticket.assignedEmail.split('@')[0]}
                              </span>
                            )}
                            {ticket.snoozedUntil && new Date(ticket.snoozedUntil) > new Date() && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium flex items-center gap-0.5">
                                <AlarmClock className="h-2.5 w-2.5" />
                                {timeAgo(ticket.snoozedUntil)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span className={`text-xs whitespace-nowrap ${isUnread ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>{timeAgo(ticket.createdAt)}</span>
                          {ticket.updatedAt && ticket.updatedAt !== ticket.createdAt && (
                            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                              <Reply className="h-2.5 w-2.5" />
                              {timeAgo(ticket.updatedAt)}
                            </span>
                          )}
                          {!isCompact && ticket.isPartnerEscalation && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">Partner</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
          </div>

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
          <div className="hidden lg:flex lg:flex-col flex-1 min-w-0 border-l overflow-hidden">

            {/* Header — ticket identity + close */}
            <div className="bg-card border-b px-5 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                {(() => {
                  const TypeIcon = typeIcons[selectedTicket.type];
                  return (
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${typeColors[selectedTicket.type]}`}>
                      <TypeIcon className="h-3.5 w-3.5" />
                      {selectedTicket.type}
                    </span>
                  );
                })()}
                <span className="text-xs font-mono text-muted-foreground shrink-0">#{selectedTicket.id.slice(0, 8)}</span>
                <span className="text-sm font-semibold text-foreground truncate">
                  {selectedTicket.userEmail || 'Anonymous'}
                </span>
                {selectedTicket.receivedAtMailbox && (
                  <span className="text-xs text-emerald-600 font-medium shrink-0">→ {selectedTicket.receivedAtMailbox}</span>
                )}
              </div>
              {/* Quick action buttons */}
              <div className="flex items-center gap-1.5 ml-auto shrink-0">
                {selectedTicket.status !== 'resolved' && (
                  <button
                    onClick={() => updateStatus(selectedTicket.id, 'resolved')}
                    disabled={updating === selectedTicket.id}
                    className="h-8 px-3 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
                    title="Resolve (e)"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    Resolve
                  </button>
                )}
                {selectedTicket.status !== 'archived' && (
                  <button
                    onClick={() => updateStatus(selectedTicket.id, 'archived')}
                    disabled={updating === selectedTicket.id}
                    className="h-8 px-3 rounded-md text-sm font-medium bg-slate-600 text-white hover:bg-slate-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
                    title="Close ticket"
                  >
                    <Archive className="h-3.5 w-3.5" />
                    Close
                  </button>
                )}
              </div>
              <button onClick={() => setSelectedTicket(null)} className="p-1.5 hover:bg-muted rounded-md shrink-0 ml-2" title="Close panel (Esc)">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Controls bar — grouped: status+priority | assignee | snooze */}
            <div className="bg-muted/30 border-b px-5 py-2.5 flex items-center gap-4 shrink-0 flex-wrap">
              {/* Status & Priority group */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</span>
                <select value={selectedTicket.status} onChange={(e) => updateStatus(selectedTicket.id, e.target.value as FeedbackEntry['status'])} disabled={updating === selectedTicket.id} className="h-8 px-2 border rounded-md text-sm bg-background font-medium">
                  <option value="new">New</option>
                  <option value="reviewed">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="archived">Closed</option>
                  <option value="spam">Spam</option>
                </select>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Priority</span>
                <select value={selectedTicket.priority} onChange={(e) => updatePriority(selectedTicket.id, e.target.value as FeedbackEntry['priority'])} disabled={updating === selectedTicket.id} className="h-8 px-2 border rounded-md text-sm bg-background font-medium">
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="w-px h-6 bg-border" />

              {/* Assignee */}
              <div className="flex items-center gap-2">
                <UserCheck className="h-3.5 w-3.5 text-muted-foreground" />
                <select value={selectedTicket.assignedTo || ''} onChange={(e) => assignTicket(selectedTicket.id, e.target.value || null)} className="h-8 px-2 border rounded-md text-sm bg-background">
                  <option value="">Unassigned</option>
                  {adminUsers.map(admin => (<option key={admin.id} value={admin.id}>{admin.email}</option>))}
                </select>
              </div>

              <div className="w-px h-6 bg-border" />

              {/* Snooze */}
              <div className="relative">
                {selectedTicket.snoozedUntil && new Date(selectedTicket.snoozedUntil) > new Date() ? (
                  <button onClick={() => unsnoozeTicket(selectedTicket.id)} className="h-8 px-3 border rounded-md text-sm bg-amber-50 text-amber-700 hover:bg-amber-100 flex items-center gap-1.5 font-medium" title="Click to unsnooze">
                    <AlarmClock className="h-3.5 w-3.5" /> Snoozed
                  </button>
                ) : (
                  <button onClick={() => setShowSnoozeMenu(!showSnoozeMenu)} className="h-8 px-3 border rounded-md text-sm text-muted-foreground hover:bg-muted flex items-center gap-1.5" title="Snooze">
                    <AlarmClock className="h-3.5 w-3.5" /> Snooze
                  </button>
                )}
                {showSnoozeMenu && (
                  <div className="absolute left-0 top-9 bg-popover border rounded-lg shadow-lg py-1 z-20 w-40">
                    {[{ label: '1 hour', hours: 1 }, { label: '4 hours', hours: 4 }, { label: 'Tomorrow', hours: 24 }, { label: '3 days', hours: 72 }, { label: '1 week', hours: 168 }].map(opt => (
                      <button key={opt.hours} onClick={() => snoozeTicket(selectedTicket.id, opt.hours)} className="w-full text-left px-3 py-2 text-sm hover:bg-muted">{opt.label}</button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px h-6 bg-border" />

              {/* Quick actions */}
              <div className="flex items-center gap-1">
                <button onClick={() => forwardTicket(selectedTicket)} className="h-8 px-2.5 border rounded-md text-sm text-muted-foreground hover:bg-muted flex items-center gap-1.5" title="Forward">
                  <Forward className="h-3.5 w-3.5" /> <span className="hidden xl:inline">Forward</span>
                </button>
                {selectedTicket.status !== 'new' && (
                  <button onClick={() => markUnread(selectedTicket.id)} className="h-8 px-2.5 border rounded-md text-sm text-muted-foreground hover:bg-muted flex items-center gap-1.5" title="Mark unread">
                    <MailOpen className="h-3.5 w-3.5" /> <span className="hidden xl:inline">Unread</span>
                  </button>
                )}
                {selectedTicket.status === 'spam' ? (
                  <button onClick={() => markNotSpam(selectedTicket.id)} className="h-8 px-2.5 border rounded-md text-sm text-green-600 hover:bg-green-50 flex items-center gap-1.5" title="Not spam">
                    <ShieldCheck className="h-3.5 w-3.5" /> Not Spam
                  </button>
                ) : (
                  <button onClick={() => markAsSpam(selectedTicket.id)} className="h-8 px-2.5 border rounded-md text-sm text-muted-foreground hover:bg-muted flex items-center gap-1.5" title="Spam">
                    <ShieldBan className="h-3.5 w-3.5" />
                  </button>
                )}
                <button onClick={() => setDeleteConfirmId(selectedTicket.id)} className="h-8 px-2.5 border rounded-md text-sm text-muted-foreground hover:bg-red-50 hover:text-red-600 flex items-center gap-1.5" title="Delete">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2 ml-auto text-xs text-muted-foreground">
                <span>{new Date(selectedTicket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                {selectedTicket.organizationName && (
                  <><span>·</span><span className="font-medium">{selectedTicket.organizationName}</span></>
                )}
                {selectedTicket.pageUrl && (
                  <a href={selectedTicket.pageUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-0.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Scrollable conversation area */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-0 bg-muted/20">
              {/* Original message — prominent */}
              <div className="relative">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original Message</div>
                <div className="bg-card rounded-lg border shadow-sm p-5">
                  {selectedTicket.htmlBody ? (
                    <SafeHtmlViewer html={selectedTicket.htmlBody} />
                  ) : (
                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{selectedTicket.message.replace(/^From:.*?\n(Subject:.*?\n)?(\n)?/s, '')}</p>
                  )}
                </div>
              </div>

              {/* Timeline thread */}
              {selectedTicket.notes.length > 0 && (
                <div className="relative ml-5 mt-5">
                  {/* Timeline line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

                  {selectedTicket.notes.map((note, idx) => {
                    const isCustomer = note.authorEmail === 'External Reply';
                    const isInternal = note.isInternal;
                    return (
                      <div key={note.id} className="relative pl-7 pb-5 last:pb-0">
                        {/* Timeline dot */}
                        <div className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full -translate-x-[5px] ring-2 ring-background ${
                          isCustomer ? 'bg-slate-400' : isInternal ? 'bg-amber-400' : 'bg-blue-500'
                        }`} />

                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-xs font-semibold ${
                            isCustomer ? 'text-foreground/70' : isInternal ? 'text-amber-600' : 'text-blue-600'
                          }`}>
                            {isCustomer ? 'Customer' : isInternal ? 'Internal Note' : note.authorEmail.split('@')[0]}
                          </span>
                          <span className="text-xs text-muted-foreground">{timeAgo(note.createdAt)}</span>
                        </div>

                        <div className={`rounded-lg p-4 ${
                          isCustomer
                            ? 'bg-card border'
                            : isInternal
                            ? 'bg-amber-50/70 border border-amber-200/50'
                            : 'bg-blue-50/70 border border-blue-200/50'
                        }`}>
                          {note.htmlBody ? (
                            <SafeHtmlViewer html={note.htmlBody} />
                          ) : note.content.startsWith('<') ? (
                            <SafeHtmlViewer html={note.content} />
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sticky reply composer — polished */}
            <div className="bg-card border-t-2 px-5 py-4 shrink-0 space-y-3">
              <div className="flex items-center gap-2">
                {cannedResponses.length > 0 && !isInternalNote && (
                  <div className="relative">
                    <button onClick={() => setShowCannedPicker(!showCannedPicker)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-md hover:bg-muted border border-transparent hover:border-border font-medium">
                      <Zap className="h-3.5 w-3.5" /> Templates <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showCannedPicker ? 'rotate-180' : ''}`} />
                    </button>
                    {showCannedPicker && (
                      <div className="absolute left-0 bottom-9 bg-popover border rounded-lg shadow-lg py-1 z-20 w-80 max-h-52 overflow-y-auto">
                        {cannedResponses.map(cr => (
                          <button key={cr.id} onClick={() => { setNewNote(cr.content); editorRef.current?.setContent(cr.content); setShowCannedPicker(false); }} className="w-full text-left px-4 py-2.5 hover:bg-muted border-b last:border-0">
                            <p className="text-sm font-medium">{cr.title}</p>
                            <p className="text-xs text-muted-foreground truncate mt-0.5">{cr.content.slice(0, 80)}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <label className="flex items-center gap-1.5 cursor-pointer text-sm text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-md hover:bg-muted font-medium">
                  <input type="checkbox" checked={isInternalNote} onChange={(e) => setIsInternalNote(e.target.checked)} className="w-3.5 h-3.5 rounded" />
                  Internal
                </label>
                {!isInternalNote && (
                  <button onClick={() => setShowReplyCcBcc(!showReplyCcBcc)} className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted font-medium">
                    Cc/Bcc
                  </button>
                )}
                {selectedTicket.userEmail && !isInternalNote && selectedTicket.receivedAtMailbox && (
                  <span className="text-xs text-primary flex items-center gap-1 ml-auto font-medium">
                    <Reply className="h-3.5 w-3.5" /> Reply via {selectedTicket.receivedAtMailbox}
                  </span>
                )}
              </div>

              {/* CC/BCC fields for reply */}
              {showReplyCcBcc && !isInternalNote && (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Cc (comma-separated)"
                      value={replyCc}
                      onChange={(e) => setReplyCc(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Bcc (comma-separated)"
                      value={replyBcc}
                      onChange={(e) => setReplyBcc(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
              )}

              <RichTextEditor ref={editorRef} placeholder={isInternalNote ? "Internal note (not visible to user)..." : "Write a reply..."} onChange={(html) => setNewNote(html)} initialContent={newNote} />

              <Button onClick={addNote} disabled={(!newNote || newNote === '<p></p>') || addingNote} className={`w-full h-10 text-sm font-medium ${isInternalNote ? 'bg-amber-600 hover:bg-amber-700' : ''}`}>
                {addingNote ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                {isInternalNote ? 'Add Internal Note' : (selectedTicket.userEmail ? 'Send Reply' : 'Add Note')}
                {!addingNote && <span className="ml-2 text-xs opacity-70">⌘↵</span>}
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
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedTicket(null)} />
          <div className="relative w-full max-w-2xl bg-background shadow-xl flex flex-col animate-in slide-in-from-right">
            {/* Header */}
            <div className="bg-card border-b px-4 py-3 flex items-center justify-between z-10 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <button onClick={() => setSelectedTicket(null)} className="p-1.5 hover:bg-muted rounded-md shrink-0">
                  <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                </button>
                {(() => {
                  const TypeIcon = typeIcons[selectedTicket.type];
                  return (
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${typeColors[selectedTicket.type]}`}>
                      <TypeIcon className="h-3.5 w-3.5" />
                      {selectedTicket.type}
                    </span>
                  );
                })()}
                <span className="text-xs font-mono text-muted-foreground shrink-0">#{selectedTicket.id.slice(0, 8)}</span>
                <span className="text-sm font-semibold truncate">
                  {selectedTicket.userEmail || 'Anonymous'}
                </span>
              </div>
              {/* Mobile quick action buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                {selectedTicket.status !== 'resolved' && (
                  <button
                    onClick={() => updateStatus(selectedTicket.id, 'resolved')}
                    disabled={updating === selectedTicket.id}
                    className="h-8 px-2.5 rounded-md text-xs font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    Resolve
                  </button>
                )}
                {selectedTicket.status !== 'archived' && (
                  <button
                    onClick={() => updateStatus(selectedTicket.id, 'archived')}
                    disabled={updating === selectedTicket.id}
                    className="h-8 px-2.5 rounded-md text-xs font-medium bg-slate-600 text-white hover:bg-slate-700 disabled:opacity-50 flex items-center gap-1 transition-colors"
                  >
                    <Archive className="h-3.5 w-3.5" />
                    Close
                  </button>
                )}
              </div>
            </div>

            {/* Controls bar */}
            <div className="bg-muted/30 border-b px-4 py-2.5 shrink-0">
              <div className="flex items-center gap-2 flex-wrap">
                <select value={selectedTicket.status} onChange={(e) => updateStatus(selectedTicket.id, e.target.value as FeedbackEntry['status'])} disabled={updating === selectedTicket.id} className="h-8 px-2 border rounded-md text-sm bg-background font-medium">
                  <option value="new">New</option>
                  <option value="reviewed">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="archived">Closed</option>
                  <option value="spam">Spam</option>
                </select>
                <select value={selectedTicket.priority} onChange={(e) => updatePriority(selectedTicket.id, e.target.value as FeedbackEntry['priority'])} disabled={updating === selectedTicket.id} className="h-8 px-2 border rounded-md text-sm bg-background font-medium">
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                <select value={selectedTicket.assignedTo || ''} onChange={(e) => assignTicket(selectedTicket.id, e.target.value || null)} className="h-8 px-2 border rounded-md text-sm bg-background">
                  <option value="">Unassigned</option>
                  {adminUsers.map(admin => (<option key={admin.id} value={admin.id}>{admin.email}</option>))}
                </select>
                <span className="ml-auto text-xs text-muted-foreground">{new Date(selectedTicket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
              </div>
            </div>

            {/* Scrollable conversation */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-muted/20">
              {/* Original message */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original Message</div>
                <div className="bg-card rounded-lg border shadow-sm p-4">
                  {selectedTicket.htmlBody ? (
                    <SafeHtmlViewer html={selectedTicket.htmlBody} />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{selectedTicket.message.replace(/^From:.*?\n(Subject:.*?\n)?(\n)?/s, '')}</p>
                  )}
                </div>
              </div>

              {/* Timeline thread */}
              {selectedTicket.notes.length > 0 && (
                <div className="relative ml-3">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
                  {selectedTicket.notes.map((note) => {
                    const isCustomer = note.authorEmail === 'External Reply';
                    const isInternal = note.isInternal;
                    return (
                      <div key={note.id} className="relative pl-6 pb-4 last:pb-0">
                        <div className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full -translate-x-[5px] ring-2 ring-background ${
                          isCustomer ? 'bg-slate-400' : isInternal ? 'bg-amber-400' : 'bg-blue-500'
                        }`} />
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-xs font-semibold ${
                            isCustomer ? 'text-foreground/70' : isInternal ? 'text-amber-600' : 'text-blue-600'
                          }`}>
                            {isCustomer ? 'Customer' : isInternal ? 'Internal Note' : note.authorEmail.split('@')[0]}
                          </span>
                          <span className="text-xs text-muted-foreground">{timeAgo(note.createdAt)}</span>
                        </div>
                        <div className={`rounded-lg p-4 ${
                          isCustomer ? 'bg-card border'
                            : isInternal ? 'bg-amber-50/70 border border-amber-200/50'
                            : 'bg-blue-50/70 border border-blue-200/50'
                        }`}>
                          {note.htmlBody ? (
                            <SafeHtmlViewer html={note.htmlBody} />
                          ) : note.content.startsWith('<') ? (
                            <SafeHtmlViewer html={note.content} />
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sticky reply composer */}
            <div className="bg-card border-t-2 px-4 py-3 shrink-0 space-y-2.5">
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 cursor-pointer text-sm text-muted-foreground font-medium">
                  <input type="checkbox" checked={isInternalNote} onChange={(e) => setIsInternalNote(e.target.checked)} className="w-3.5 h-3.5 rounded" />
                  Internal
                </label>
                {selectedTicket.userEmail && !isInternalNote && selectedTicket.receivedAtMailbox && (
                  <span className="text-xs text-primary flex items-center gap-1 ml-auto font-medium">
                    <Reply className="h-3.5 w-3.5" /> via {selectedTicket.receivedAtMailbox}
                  </span>
                )}
              </div>
              <RichTextEditor ref={editorRef} placeholder={isInternalNote ? "Internal note..." : "Write a reply..."} onChange={(html) => setNewNote(html)} initialContent={newNote} />
              <Button onClick={addNote} disabled={(!newNote || newNote === '<p></p>') || addingNote} className={`w-full h-10 text-sm font-medium ${isInternalNote ? 'bg-amber-600 hover:bg-amber-700' : ''}`}>
                {addingNote ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                {isInternalNote ? 'Add Note' : (selectedTicket.userEmail ? 'Send Reply' : 'Add Note')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirmId(null)} />
          <div className="relative bg-background rounded-xl shadow-2xl border w-full max-w-sm mx-4 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold">Delete Ticket</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setDeleteConfirmId(null)} disabled={deleting}>Cancel</Button>
              <Button variant="destructive" onClick={() => deleteTicket(deleteConfirmId)} disabled={deleting}>
                {deleting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Trash2 className="h-4 w-4 mr-1" />}
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Compose Email Modal */}
      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { if (!composeSending) setShowCompose(false); }} />
          <div className="relative bg-background rounded-xl shadow-2xl border w-full max-w-2xl mx-4 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <PenSquare className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">New Email</h2>
              </div>
              <button
                onClick={() => { if (!composeSending) setShowCompose(false); }}
                className="p-1.5 hover:bg-muted rounded-md"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {/* To field with autocomplete */}
              <div className="relative">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">To</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="recipient@example.com"
                    value={composeTo}
                    onChange={(e) => {
                      setComposeTo(e.target.value);
                      searchRecipients(e.target.value);
                    }}
                    onFocus={() => { if (userSuggestions.length > 0) setShowSuggestions(true); }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="pl-10 h-10"
                  />
                  {searchingUsers && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
                {showSuggestions && userSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-popover border rounded-lg shadow-lg py-1 z-30 max-h-48 overflow-y-auto">
                    {userSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.email}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setComposeTo(suggestion.email);
                          setShowSuggestions(false);
                          setUserSuggestions([]);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-muted flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">
                            {suggestion.name.charAt(0).toUpperCase() || suggestion.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          {suggestion.name !== suggestion.email && (
                            <p className="text-sm font-medium truncate">{suggestion.name}</p>
                          )}
                          <p className="text-xs text-muted-foreground truncate">{suggestion.email}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CC/BCC toggle + fields */}
              <div className="flex items-center gap-2">
                <button onClick={() => setShowCcBcc(!showCcBcc)} className="text-xs text-primary hover:underline font-medium">
                  {showCcBcc ? 'Hide' : 'Add'} Cc/Bcc
                </button>
              </div>
              {showCcBcc && (
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Cc</label>
                    <Input
                      placeholder="cc@example.com, ..."
                      value={composeCc}
                      onChange={(e) => setComposeCc(e.target.value)}
                      className="h-10"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Bcc</label>
                    <Input
                      placeholder="bcc@example.com, ..."
                      value={composeBcc}
                      onChange={(e) => setComposeBcc(e.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>
              )}

              {/* Subject */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Subject</label>
                <Input
                  placeholder="Email subject"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="h-10"
                />
              </div>

              {/* Send As */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Send As</label>
                <select
                  value={composeSendAs}
                  onChange={(e) => setComposeSendAs(e.target.value)}
                  className="w-full h-10 px-3 border rounded-md text-sm bg-background"
                >
                  <option value="support@siggly.io">Siggly Support (support@)</option>
                  <option value="sales@siggly.io">Siggly Sales (sales@)</option>
                  <option value="help@siggly.io">Siggly Help (help@)</option>
                  <option value="team@siggly.io">Siggly Team (team@)</option>
                  <option value="kade@siggly.io">Kade (kade@)</option>
                  <option value="contact@siggly.io">Siggly (contact@)</option>
                  <option value="info@siggly.io">Siggly (info@)</option>
                </select>
              </div>

              {/* Body */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Message</label>
                <RichTextEditor
                  ref={composeEditorRef}
                  placeholder="Write your email..."
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t space-y-3">
              {composeError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  {composeError}
                </div>
              )}
              {composeSuccess && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  {composeSuccess}
                </div>
              )}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => { if (!composeSending) setShowCompose(false); }}
                  disabled={composeSending}
                  className="flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
                <Button
                  onClick={sendComposeEmail}
                  disabled={composeSending || !composeTo.trim() || !composeSubject.trim()}
                  className="flex-1 sm:flex-none gap-2"
                >
                  {composeSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {composeSending ? 'Sending...' : 'Send Email'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium ${
            toast.type === 'success'
              ? 'bg-foreground text-background'
              : 'bg-red-600 text-white'
          }`}>
            {toast.type === 'success' ? (
              <CheckCircle className="h-4 w-4 shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 shrink-0" />
            )}
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}
