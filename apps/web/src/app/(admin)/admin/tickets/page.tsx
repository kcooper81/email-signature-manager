'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Button, Textarea } from '@/components/ui';
import { 
  Search, 
  Ticket,
  Loader2,
  Filter,
  Bug,
  Lightbulb,
  HelpCircle,
  MessageSquare,
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
} from 'lucide-react';

interface TicketNote {
  id: string;
  content: string;
  authorEmail: string;
  isInternal: boolean;
  createdAt: string;
}

interface FeedbackEntry {
  id: string;
  userEmail: string | null;
  type: 'bug' | 'feature' | 'question' | 'other';
  message: string;
  pageUrl: string | null;
  status: 'new' | 'reviewed' | 'resolved' | 'archived';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string | null;
  notes: TicketNote[];
}

const PAGE_SIZE = 20;

const typeIcons = {
  bug: Bug,
  feature: Lightbulb,
  question: HelpCircle,
  other: MessageSquare,
};

const typeColors = {
  bug: 'bg-red-100 text-red-700',
  feature: 'bg-blue-100 text-blue-700',
  question: 'bg-amber-100 text-amber-700',
  other: 'bg-slate-100 text-slate-700',
};

const statusIcons = {
  new: Clock,
  reviewed: Eye,
  resolved: CheckCircle,
  archived: Archive,
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
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState<FeedbackEntry | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isInternalNote, setIsInternalNote] = useState(false);

  useEffect(() => {
    loadTickets();
    loadCurrentUser();
  }, [page, typeFilter, statusFilter, priorityFilter]);

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
      .select('*', { count: 'exact' })
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

    const { data, count, error } = await query;

    if (error) {
      console.error('Error loading tickets:', error);
      setLoading(false);
      return;
    }

    setTotalCount(count || 0);

    const mapped: FeedbackEntry[] = (data || []).map((item) => ({
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

    // Get author emails
    const authorIds = [...new Set(notes.map(n => n.author_id))];
    const { data: authors } = await supabase
      .from('users')
      .select('id, email')
      .in('id', authorIds);

    const authorMap = new Map(authors?.map(a => [a.id, a.email]) || []);

    return notes.map(n => ({
      id: n.id,
      content: n.content,
      authorEmail: authorMap.get(n.author_id) || 'Unknown',
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

  const filteredTickets = tickets.filter(ticket => {
    if (search === '') return true;
    const searchLower = search.toLowerCase();
    return (
      ticket.message.toLowerCase().includes(searchLower) ||
      (ticket.userEmail?.toLowerCase().includes(searchLower) ?? false)
    );
  });

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const stats = {
    new: tickets.filter(t => t.status === 'new').length,
    urgent: tickets.filter(t => t.priority === 'urgent').length,
    total: totalCount,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Support Tickets</h1>
        <p className="text-slate-500">Manage feedback and support requests from users</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-violet-100 p-2">
                <Ticket className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalCount}</p>
                <p className="text-sm text-slate-500">Total Tickets</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-100 p-2">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.new}</p>
                <p className="text-sm text-slate-500">New</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2">
                <Bug className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tickets.filter(t => t.type === 'bug').length}</p>
                <p className="text-sm text-slate-500">Bug Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Lightbulb className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tickets.filter(t => t.type === 'feature').length}</p>
                <p className="text-sm text-slate-500">Feature Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by message or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setPage(0);
                }}
                className="px-3 py-2 border rounded-lg text-sm bg-white"
              >
                <option value="all">All Types</option>
                <option value="bug">Bug Reports</option>
                <option value="feature">Feature Requests</option>
                <option value="question">Questions</option>
                <option value="other">Other</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(0);
                }}
                className="px-3 py-2 border rounded-lg text-sm bg-white"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="resolved">Resolved</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => {
                  setPriorityFilter(e.target.value);
                  setPage(0);
                }}
                className="px-3 py-2 border rounded-lg text-sm bg-white"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Tickets
          </CardTitle>
          <CardDescription>
            Showing {filteredTickets.length} of {totalCount} tickets
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No tickets found.
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {filteredTickets.map((ticket) => {
                  const TypeIcon = typeIcons[ticket.type];
                  const StatusIcon = statusIcons[ticket.status];
                  const PriorityIcon = priorityIcons[ticket.priority];

                  return (
                    <div
                      key={ticket.id}
                      onClick={() => openTicketDetail(ticket)}
                      className="border rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <PriorityIcon className={`h-4 w-4 ${priorityColors[ticket.priority]}`} />
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[ticket.type]}`}>
                              <TypeIcon className="h-3 w-3" />
                              {ticket.type}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                              <StatusIcon className="h-3 w-3" />
                              {ticket.status}
                            </span>
                            <span className="text-xs text-slate-400">
                              {new Date(ticket.createdAt).toLocaleString()}
                            </span>
                          </div>
                          
                          <p className="text-sm text-slate-700 line-clamp-2">
                            {ticket.message}
                          </p>
                          
                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                            {ticket.userEmail && (
                              <span>From: {ticket.userEmail}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          {ticket.status === 'new' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateStatus(ticket.id, 'reviewed')}
                              disabled={updating === ticket.id}
                              title="Mark as Reviewed"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          {(ticket.status === 'new' || ticket.status === 'reviewed') && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateStatus(ticket.id, 'resolved')}
                              disabled={updating === ticket.id}
                              title="Mark as Resolved"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <p className="text-sm text-slate-500">
                    Page {page + 1} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.max(0, p - 1))}
                      disabled={page === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                      disabled={page >= totalPages - 1}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Ticket Detail Slide-out Panel */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-black/20" 
            onClick={() => setSelectedTicket(null)}
          />
          <div className="relative w-full max-w-xl bg-white shadow-xl overflow-y-auto animate-in slide-in-from-right">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-semibold">Ticket Details</h2>
              <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Ticket Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {(() => {
                    const TypeIcon = typeIcons[selectedTicket.type];
                    const StatusIcon = statusIcons[selectedTicket.status];
                    const PriorityIcon = priorityIcons[selectedTicket.priority];
                    return (
                      <>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${typeColors[selectedTicket.type]}`}>
                          <TypeIcon className="h-3 w-3" />
                          {selectedTicket.type}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedTicket.status]}`}>
                          <StatusIcon className="h-3 w-3" />
                          {selectedTicket.status}
                        </span>
                        <span className={`inline-flex items-center gap-1 ${priorityColors[selectedTicket.priority]}`}>
                          <PriorityIcon className="h-4 w-4" />
                          <span className="text-xs font-medium capitalize">{selectedTicket.priority}</span>
                        </span>
                      </>
                    );
                  })()}
                </div>

                <div className="text-sm text-slate-500">
                  <p>From: <span className="text-slate-700">{selectedTicket.userEmail || 'Anonymous'}</span></p>
                  <p>Submitted: {new Date(selectedTicket.createdAt).toLocaleString()}</p>
                  {selectedTicket.pageUrl && (
                    <a
                      href={selectedTicket.pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline mt-1"
                    >
                      View page <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedTicket.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-slate-700">Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={selectedTicket.status}
                    onChange={(e) => updateStatus(selectedTicket.id, e.target.value as FeedbackEntry['status'])}
                    disabled={updating === selectedTicket.id}
                    className="px-3 py-2 border rounded-lg text-sm bg-white"
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
                    className="px-3 py-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="low">Low Priority</option>
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <StickyNote className="h-4 w-4" />
                  Internal Notes ({selectedTicket.notes.length})
                </h3>

                {selectedTicket.notes.length > 0 && (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedTicket.notes.map((note) => (
                      <div 
                        key={note.id} 
                        className={note.isInternal 
                          ? "bg-amber-50 border border-amber-200 rounded-lg p-3" 
                          : "bg-blue-50 border border-blue-200 rounded-lg p-3"
                        }
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className={`text-xs font-medium ${
                            note.isInternal ? 'text-amber-700' : 'text-blue-700'
                          }`}>
                            {note.isInternal ? '🔒 Internal Note' : '📧 Sent to User'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{note.content}</p>
                        <p className="text-xs text-slate-500 mt-2">
                          {note.authorEmail} • {new Date(note.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <Textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder={isInternalNote 
                      ? "Add an internal note (not visible to user)..." 
                      : "Write a response to send to the user via email..."
                    }
                    className="min-h-[80px] resize-none"
                  />
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isInternalNote}
                      onChange={(e) => setIsInternalNote(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="text-sm text-slate-700">
                      � Internal note only (not sent to user)
                    </span>
                  </label>
                  {selectedTicket.userEmail && !isInternalNote && (
                    <p className="text-xs text-blue-600">
                      📧 Response will be sent to {selectedTicket.userEmail}
                    </p>
                  )}
                  
                  <Button
                    onClick={addNote}
                    disabled={!newNote.trim() || addingNote}
                    className={isInternalNote 
                      ? "w-full" 
                      : "w-full bg-blue-600 hover:bg-blue-700"
                    }
                  >
                    {addingNote ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {isInternalNote ? 'Add Internal Note' : (selectedTicket.userEmail ? 'Send Email Response' : 'Add Note')}
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
