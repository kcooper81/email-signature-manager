'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Button } from '@/components/ui';
import {
  Search,
  Loader2,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Play,
  Clock,
  CheckCircle2,
  XCircle,
  Cog,
  RotateCcw,
  ListTodo,
} from 'lucide-react';

interface JobLog {
  id: string;
  job_type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'retrying';
  payload: Record<string, unknown> | null;
  result: Record<string, unknown> | null;
  error_message: string | null;
  retry_count: number;
  max_retries: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  organization_id: string | null;
  orgName: string;
}

const PAGE_SIZE = 50;

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  retrying: 'bg-violet-100 text-violet-700',
};

const STATUS_ICONS: Record<string, typeof Clock> = {
  pending: Clock,
  processing: Cog,
  completed: CheckCircle2,
  failed: XCircle,
  retrying: RotateCcw,
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [retryingId, setRetryingId] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
  }, [page, statusFilter]);

  const loadJobs = async () => {
    setLoading(true);
    const supabase = createClient();

    // Build query
    let query = supabase
      .from('job_logs')
      .select('id, job_type, status, payload, result, error_message, retry_count, max_retries, created_at, started_at, completed_at, organization_id', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data: jobsData, count } = await query;

    if (!jobsData) {
      setLoading(false);
      return;
    }

    setTotalCount(count || 0);

    // Get unique org IDs
    const orgIds = [...new Set(jobsData.map(j => j.organization_id).filter(Boolean))] as string[];

    // Fetch org names
    let orgMap = new Map<string, string>();
    if (orgIds.length > 0) {
      const { data: orgs } = await supabase
        .from('organizations')
        .select('id, name')
        .in('id', orgIds);

      orgMap = new Map(orgs?.map(o => [o.id, o.name]) || []);
    }

    const enrichedJobs: JobLog[] = jobsData.map(job => ({
      id: job.id,
      job_type: job.job_type,
      status: job.status,
      payload: job.payload as Record<string, unknown> | null,
      result: job.result as Record<string, unknown> | null,
      error_message: job.error_message,
      retry_count: job.retry_count,
      max_retries: job.max_retries,
      created_at: job.created_at,
      started_at: job.started_at,
      completed_at: job.completed_at,
      organization_id: job.organization_id,
      orgName: job.organization_id ? (orgMap.get(job.organization_id) || 'Unknown') : 'N/A',
    }));

    setJobs(enrichedJobs);
    setLoading(false);
  };

  const handleRetry = async (job: JobLog) => {
    setRetryingId(job.id);
    const supabase = createClient();

    const { error } = await supabase
      .from('job_logs')
      .update({
        status: 'pending',
        retry_count: job.retry_count + 1,
        error_message: null,
        started_at: null,
        completed_at: null,
      })
      .eq('id', job.id);

    if (!error) {
      setJobs(prev =>
        prev.map(j =>
          j.id === job.id
            ? { ...j, status: 'pending' as const, retry_count: j.retry_count + 1, error_message: null, started_at: null, completed_at: null }
            : j
        )
      );
    }

    setRetryingId(null);
  };

  const filteredJobs = jobs.filter(job => {
    if (search === '') return true;
    const searchLower = search.toLowerCase();
    return (
      job.job_type.toLowerCase().includes(searchLower) ||
      job.orgName.toLowerCase().includes(searchLower) ||
      (job.error_message?.toLowerCase().includes(searchLower) ?? false)
    );
  });

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const stats = {
    total: totalCount,
    processing: jobs.filter(j => j.status === 'processing').length,
    failed: jobs.filter(j => j.status === 'failed').length,
    completed: jobs.filter(j => j.status === 'completed').length,
  };

  const formatDuration = (startedAt: string | null, completedAt: string | null): string => {
    if (!startedAt || !completedAt) return 'N/A';
    const ms = new Date(completedAt).getTime() - new Date(startedAt).getTime();
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const formatTimestamp = (ts: string | null): string => {
    if (!ts) return '--';
    return new Date(ts).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Background Jobs</h1>
          <p className="text-slate-500">Monitor and manage background job execution</p>
        </div>
        <Button onClick={loadJobs} variant="outline" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-slate-100 p-2">
                <ListTodo className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-slate-500">Total Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Cog className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.processing}</p>
                <p className="text-sm text-slate-500">Running</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.failed}</p>
                <p className="text-sm text-slate-500">Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-sm text-slate-500">Completed</p>
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
                placeholder="Search by job type, organization, or error..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(0);
                }}
                className="px-3 py-2 border rounded-lg text-sm bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="retrying">Retrying</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListTodo className="h-5 w-5" />
            Job Logs
          </CardTitle>
          <CardDescription>
            Showing {filteredJobs.length} of {totalCount} jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No jobs found.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium text-slate-500 w-8"></th>
                      <th className="pb-3 font-medium text-slate-500">Job Type</th>
                      <th className="pb-3 font-medium text-slate-500">Status</th>
                      <th className="pb-3 font-medium text-slate-500">Organization</th>
                      <th className="pb-3 font-medium text-slate-500">Retries</th>
                      <th className="pb-3 font-medium text-slate-500">Created</th>
                      <th className="pb-3 font-medium text-slate-500">Started</th>
                      <th className="pb-3 font-medium text-slate-500">Completed</th>
                      <th className="pb-3 font-medium text-slate-500">Error</th>
                      <th className="pb-3 font-medium text-slate-500 w-20">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredJobs.map((job) => {
                      const StatusIcon = STATUS_ICONS[job.status] || Clock;
                      const isExpanded = expandedId === job.id;

                      return (
                        <tr key={job.id} className="group">
                          <td colSpan={10} className="p-0">
                            {/* Main Row */}
                            <div
                              className="flex items-center hover:bg-slate-50 cursor-pointer"
                              onClick={() => setExpandedId(isExpanded ? null : job.id)}
                            >
                              <div className="py-3 px-1 w-8 flex items-center justify-center">
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4 text-slate-400" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-slate-400" />
                                )}
                              </div>
                              <div className="py-3 flex-1 min-w-[120px]">
                                <span className="font-mono text-xs font-medium text-slate-700">
                                  {job.job_type}
                                </span>
                              </div>
                              <div className="py-3 min-w-[110px]">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[job.status]}`}>
                                  <StatusIcon className="h-3 w-3" />
                                  {job.status}
                                </span>
                              </div>
                              <div className="py-3 min-w-[120px]">
                                {job.organization_id ? (
                                  <a
                                    href={`/admin/accounts/${job.organization_id}`}
                                    className="text-blue-600 hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {job.orgName}
                                  </a>
                                ) : (
                                  <span className="text-slate-400">N/A</span>
                                )}
                              </div>
                              <div className="py-3 min-w-[70px]">
                                <span className="text-slate-600">
                                  {job.retry_count}/{job.max_retries}
                                </span>
                              </div>
                              <div className="py-3 min-w-[140px] text-slate-500 text-xs">
                                {formatTimestamp(job.created_at)}
                              </div>
                              <div className="py-3 min-w-[140px] text-slate-500 text-xs">
                                {formatTimestamp(job.started_at)}
                              </div>
                              <div className="py-3 min-w-[140px] text-slate-500 text-xs">
                                {formatTimestamp(job.completed_at)}
                              </div>
                              <div className="py-3 min-w-[150px] max-w-[200px]">
                                {job.error_message ? (
                                  <span className="text-red-600 text-xs truncate block" title={job.error_message}>
                                    {job.error_message.length > 50
                                      ? job.error_message.slice(0, 50) + '...'
                                      : job.error_message}
                                  </span>
                                ) : (
                                  <span className="text-slate-400 text-xs">--</span>
                                )}
                              </div>
                              <div className="py-3 w-20" onClick={(e) => e.stopPropagation()}>
                                {job.status === 'failed' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRetry(job)}
                                    disabled={retryingId === job.id}
                                    title="Retry this job"
                                  >
                                    {retryingId === job.id ? (
                                      <Loader2 className="h-3 w-3 animate-spin" />
                                    ) : (
                                      <Play className="h-3 w-3" />
                                    )}
                                    <span className="ml-1">Retry</span>
                                  </Button>
                                )}
                              </div>
                            </div>

                            {/* Expanded Detail Row */}
                            {isExpanded && (
                              <div className="bg-slate-50 border-t px-6 py-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {/* Payload */}
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-700 mb-2">Payload</h4>
                                    {job.payload && Object.keys(job.payload).length > 0 ? (
                                      <pre className="text-xs bg-slate-900 text-slate-100 p-3 rounded overflow-x-auto max-h-48 overflow-y-auto">
                                        {JSON.stringify(job.payload, null, 2)}
                                      </pre>
                                    ) : (
                                      <p className="text-xs text-slate-400 italic">No payload</p>
                                    )}
                                  </div>

                                  {/* Result */}
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-700 mb-2">Result</h4>
                                    {job.result && Object.keys(job.result).length > 0 ? (
                                      <pre className="text-xs bg-slate-900 text-slate-100 p-3 rounded overflow-x-auto max-h-48 overflow-y-auto">
                                        {JSON.stringify(job.result, null, 2)}
                                      </pre>
                                    ) : (
                                      <p className="text-xs text-slate-400 italic">No result</p>
                                    )}
                                  </div>
                                </div>

                                {/* Error Message */}
                                {job.error_message && (
                                  <div>
                                    <h4 className="text-sm font-medium text-red-700 mb-2">Error Message</h4>
                                    <pre className="text-xs bg-red-50 text-red-800 border border-red-200 p-3 rounded overflow-x-auto whitespace-pre-wrap">
                                      {job.error_message}
                                    </pre>
                                  </div>
                                )}

                                {/* Duration & Metadata */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="text-slate-500">Duration:</span>
                                    <span className="ml-2 font-medium text-slate-700">
                                      {formatDuration(job.started_at, job.completed_at)}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-slate-500">Retries:</span>
                                    <span className="ml-2 font-medium text-slate-700">
                                      {job.retry_count} / {job.max_retries}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-slate-500">Job ID:</span>
                                    <span className="ml-2 font-mono text-xs text-slate-700">
                                      {job.id}
                                    </span>
                                  </div>
                                  {job.organization_id && (
                                    <div>
                                      <span className="text-slate-500">Org ID:</span>
                                      <span className="ml-2 font-mono text-xs text-slate-700">
                                        {job.organization_id}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
    </div>
  );
}
