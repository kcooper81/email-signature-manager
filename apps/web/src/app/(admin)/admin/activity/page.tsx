'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Button } from '@/components/ui';
import {
  Search,
  ScrollText,
  Loader2,
  Filter,
  Building2,
  User,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Download,
} from 'lucide-react';
import { exportToCSV, type CSVColumn } from '@/lib/admin/export-csv';

interface AuditLogEntry {
  id: string;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata: Record<string, unknown> | null;
  changes: Record<string, unknown> | null;
  createdAt: string;
  orgName: string;
  orgId: string;
  userEmail: string;
  userId: string;
}

type DateRange = '24h' | '7d' | '30d' | '90d' | 'all';

const PAGE_SIZE = 50;

const DATE_RANGE_OPTIONS: { value: DateRange; label: string }[] = [
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'all', label: 'All time' },
];

export default function ActivityPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [actions, setActions] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Debounce search for server-side filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    loadLogs();
  }, [page, actionFilter, dateRange, debouncedSearch]);

  const getDateRangeStart = (range: DateRange): string | null => {
    if (range === 'all') return null;
    const now = new Date();
    switch (range) {
      case '24h': now.setHours(now.getHours() - 24); break;
      case '7d': now.setDate(now.getDate() - 7); break;
      case '30d': now.setDate(now.getDate() - 30); break;
      case '90d': now.setDate(now.getDate() - 90); break;
    }
    return now.toISOString();
  };

  const loadLogs = async () => {
    setLoading(true);
    const supabase = createClient();

    // Build query with server-side search
    let query = supabase
      .from('audit_logs')
      .select('id, action, resource_type, resource_id, metadata, changes, created_at, organization_id, user_id', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (actionFilter !== 'all') {
      query = query.eq('action', actionFilter);
    }

    const rangeStart = getDateRangeStart(dateRange);
    if (rangeStart) {
      query = query.gte('created_at', rangeStart);
    }

    // Server-side search by action
    if (debouncedSearch) {
      query = query.ilike('action', `%${debouncedSearch}%`);
    }

    const { data: logsData, count } = await query;

    if (!logsData) {
      setLoading(false);
      return;
    }

    setTotalCount(count || 0);

    // Get unique org IDs and user IDs
    const orgIds = [...new Set(logsData.map(l => l.organization_id).filter(Boolean))];
    const userIds = [...new Set(logsData.map(l => l.user_id).filter(Boolean))];

    // Fetch org names and user emails in parallel
    const [{ data: orgs }, { data: users }] = await Promise.all([
      orgIds.length > 0
        ? supabase.from('organizations').select('id, name').in('id', orgIds)
        : Promise.resolve({ data: [] }),
      userIds.length > 0
        ? supabase.from('users').select('id, email').in('id', userIds)
        : Promise.resolve({ data: [] }),
    ]);

    const orgMap = new Map(orgs?.map(o => [o.id, o.name]) || []);
    const userMap = new Map(users?.map(u => [u.id, u.email]) || []);

    // Get distinct actions for filter (only once)
    if (actions.length === 0) {
      const { data: distinctActions } = await supabase
        .from('audit_logs')
        .select('action')
        .order('action');

      const uniqueActions = [...new Set(distinctActions?.map(a => a.action) || [])];
      setActions(uniqueActions);
    }

    const enrichedLogs: AuditLogEntry[] = logsData.map(log => ({
      id: log.id,
      action: log.action,
      resourceType: log.resource_type,
      resourceId: log.resource_id,
      metadata: log.metadata as Record<string, unknown> | null,
      changes: (log as any).changes as Record<string, unknown> | null,
      createdAt: log.created_at,
      orgName: orgMap.get(log.organization_id) || 'Unknown',
      orgId: log.organization_id,
      userEmail: userMap.get(log.user_id) || 'Unknown',
      userId: log.user_id,
    }));

    setLogs(enrichedLogs);
    setLoading(false);
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleExport = () => {
    const columns: CSVColumn<AuditLogEntry>[] = [
      { label: 'Timestamp', accessor: (r) => new Date(r.createdAt).toLocaleString() },
      { label: 'Action', accessor: (r) => r.action },
      { label: 'Resource', accessor: (r) => r.resourceType },
      { label: 'Resource ID', accessor: (r) => r.resourceId },
      { label: 'Organization', accessor: (r) => r.orgName },
      { label: 'User', accessor: (r) => r.userEmail },
      { label: 'Metadata', accessor: (r) => r.metadata ? JSON.stringify(r.metadata) : '' },
    ];
    exportToCSV(logs, columns, 'activity-logs');
  };

  const getActionColor = (action: string) => {
    if (action.includes('create') || action.includes('add')) return 'bg-green-100 text-green-700';
    if (action.includes('delete') || action.includes('remove')) return 'bg-red-100 text-red-700';
    if (action.includes('update') || action.includes('edit')) return 'bg-blue-100 text-blue-700';
    if (action.includes('deploy')) return 'bg-violet-100 text-violet-700';
    if (action.includes('suspend') || action.includes('reject')) return 'bg-red-100 text-red-700';
    if (action.includes('approve') || action.includes('reactivate')) return 'bg-green-100 text-green-700';
    return 'bg-slate-100 text-slate-700';
  };

  const hasExpandableContent = (log: AuditLogEntry) => {
    return (log.metadata && Object.keys(log.metadata).length > 0) ||
           (log.changes && Object.keys(log.changes).length > 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Activity Logs</h1>
          <p className="text-slate-500">Platform-wide audit trail of all actions</p>
        </div>
        <Button variant="outline" onClick={handleExport} disabled={logs.length === 0}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by action name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={dateRange}
                onChange={(e) => {
                  setDateRange(e.target.value as DateRange);
                  setPage(0);
                }}
                className="px-3 py-2 border rounded-lg text-sm bg-white"
              >
                {DATE_RANGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select
                value={actionFilter}
                onChange={(e) => {
                  setActionFilter(e.target.value);
                  setPage(0);
                }}
                className="px-3 py-2 border rounded-lg text-sm bg-white"
              >
                <option value="all">All Actions</option>
                {actions.map((action) => (
                  <option key={action} value={action}>
                    {action.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="h-5 w-5" />
            Audit Logs
          </CardTitle>
          <CardDescription>
            {totalCount} entries {dateRange !== 'all' && `in ${DATE_RANGE_OPTIONS.find(o => o.value === dateRange)?.label.toLowerCase()}`}
            {debouncedSearch && ` matching "${debouncedSearch}"`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No activity logs found.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium text-slate-500 w-8"></th>
                      <th className="pb-3 font-medium text-slate-500">Timestamp</th>
                      <th className="pb-3 font-medium text-slate-500">Action</th>
                      <th className="pb-3 font-medium text-slate-500">Resource</th>
                      <th className="pb-3 font-medium text-slate-500">Organization</th>
                      <th className="pb-3 font-medium text-slate-500">User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {logs.map((log) => (
                      <>
                        <tr
                          key={log.id}
                          className={`hover:bg-slate-50 ${hasExpandableContent(log) ? 'cursor-pointer' : ''}`}
                          onClick={() => hasExpandableContent(log) && setExpandedId(expandedId === log.id ? null : log.id)}
                        >
                          <td className="py-3">
                            {hasExpandableContent(log) && (
                              expandedId === log.id
                                ? <ChevronUp className="h-4 w-4 text-slate-400" />
                                : <ChevronDown className="h-4 w-4 text-slate-400" />
                            )}
                          </td>
                          <td className="py-3 text-slate-500 whitespace-nowrap">
                            {new Date(log.createdAt).toLocaleString()}
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getActionColor(log.action)}`}>
                              {log.action.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="text-slate-700">{log.resourceType}</span>
                            <span className="text-slate-400 text-xs ml-1" title={log.resourceId}>
                              {log.resourceId?.slice(0, 8)}...
                            </span>
                          </td>
                          <td className="py-3">
                            <a
                              href={`/admin/accounts/${log.orgId}`}
                              className="text-blue-600 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {log.orgName}
                            </a>
                          </td>
                          <td className="py-3 text-slate-600">
                            {log.userEmail}
                          </td>
                        </tr>
                        {expandedId === log.id && hasExpandableContent(log) && (
                          <tr key={`${log.id}-detail`}>
                            <td colSpan={6} className="pb-4">
                              <div className="bg-slate-50 rounded-lg p-4 mx-2 space-y-3">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-slate-500 font-medium">Resource ID:</span>
                                    <span className="ml-2 font-mono text-xs">{log.resourceId}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-500 font-medium">User ID:</span>
                                    <span className="ml-2 font-mono text-xs">{log.userId}</span>
                                  </div>
                                </div>
                                {log.metadata && Object.keys(log.metadata).length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-700 mb-1">Metadata</h4>
                                    <pre className="text-xs bg-white border rounded p-3 overflow-x-auto">
                                      {JSON.stringify(log.metadata, null, 2)}
                                    </pre>
                                  </div>
                                )}
                                {log.changes && Object.keys(log.changes).length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-700 mb-1">Changes</h4>
                                    <pre className="text-xs bg-white border rounded p-3 overflow-x-auto">
                                      {JSON.stringify(log.changes, null, 2)}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-slate-500">
                  Page {page + 1} of {totalPages || 1}
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
                    onClick={() => setPage(p => Math.min((totalPages || 1) - 1, p + 1))}
                    disabled={page >= (totalPages || 1) - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
