'use client';

import { useState, useEffect } from 'react';
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
} from 'lucide-react';

interface AuditLogEntry {
  id: string;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  orgName: string;
  orgId: string;
  userEmail: string;
  userId: string;
}

const PAGE_SIZE = 50;

export default function ActivityPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [actions, setActions] = useState<string[]>([]);

  useEffect(() => {
    loadLogs();
  }, [page, actionFilter]);

  const loadLogs = async () => {
    setLoading(true);
    const supabase = createClient();

    // Build query
    let query = supabase
      .from('audit_logs')
      .select('id, action, resource_type, resource_id, metadata, created_at, organization_id, user_id', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (actionFilter !== 'all') {
      query = query.eq('action', actionFilter);
    }

    const { data: logsData, count } = await query;

    if (!logsData) {
      setLoading(false);
      return;
    }

    setTotalCount(count || 0);

    // Get unique org IDs and user IDs
    const orgIds = [...new Set(logsData.map(l => l.organization_id))];
    const userIds = [...new Set(logsData.map(l => l.user_id))];

    // Fetch org names
    const { data: orgs } = await supabase
      .from('organizations')
      .select('id, name')
      .in('id', orgIds);

    const orgMap = new Map(orgs?.map(o => [o.id, o.name]) || []);

    // Fetch user emails
    const { data: users } = await supabase
      .from('users')
      .select('id, email')
      .in('id', userIds);

    const userMap = new Map(users?.map(u => [u.id, u.email]) || []);

    // Get distinct actions for filter
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
      createdAt: log.created_at,
      orgName: orgMap.get(log.organization_id) || 'Unknown',
      orgId: log.organization_id,
      userEmail: userMap.get(log.user_id) || 'Unknown',
      userId: log.user_id,
    }));

    setLogs(enrichedLogs);
    setLoading(false);
  };

  const filteredLogs = logs.filter(log => {
    if (search === '') return true;
    const searchLower = search.toLowerCase();
    return (
      log.action.toLowerCase().includes(searchLower) ||
      log.resourceType.toLowerCase().includes(searchLower) ||
      log.orgName.toLowerCase().includes(searchLower) ||
      log.userEmail.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const getActionColor = (action: string) => {
    if (action.includes('create') || action.includes('add')) return 'bg-green-100 text-green-700';
    if (action.includes('delete') || action.includes('remove')) return 'bg-red-100 text-red-700';
    if (action.includes('update') || action.includes('edit')) return 'bg-blue-100 text-blue-700';
    if (action.includes('deploy')) return 'bg-violet-100 text-violet-700';
    return 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Activity Logs</h1>
        <p className="text-slate-500">Platform-wide audit trail of all actions</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by action, resource, org, or user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
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
            Showing {filteredLogs.length} of {totalCount} entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No activity logs found.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium text-slate-500">Timestamp</th>
                      <th className="pb-3 font-medium text-slate-500">Action</th>
                      <th className="pb-3 font-medium text-slate-500">Resource</th>
                      <th className="pb-3 font-medium text-slate-500">Organization</th>
                      <th className="pb-3 font-medium text-slate-500">User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-3 text-slate-500">
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getActionColor(log.action)}`}>
                            {log.action.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="text-slate-700">{log.resourceType}</span>
                          <span className="text-slate-400 text-xs ml-1">
                            {log.resourceId.slice(0, 8)}...
                          </span>
                        </td>
                        <td className="py-3">
                          <a 
                            href={`/admin/accounts/${log.orgId}`}
                            className="text-blue-600 hover:underline"
                          >
                            {log.orgName}
                          </a>
                        </td>
                        <td className="py-3 text-slate-600">
                          {log.userEmail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
