'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  X,
  Download,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { exportToCSV, type CSVColumn } from '@/lib/admin/export-csv';

interface ErrorLog {
  id: string;
  created_at: string;
  error_type: string;
  error_message: string;
  error_stack: string | null;
  route: string | null;
  method: string | null;
  status_code: number | null;
  user_id: string | null;
  organization_id: string | null;
  metadata: Record<string, any> | null;
  resolved: boolean;
  resolved_at: string | null;
  resolution_notes: string | null;
}

const ERROR_TYPE_COLORS: Record<string, string> = {
  api_error: 'bg-red-100 text-red-800',
  auth_error: 'bg-orange-100 text-orange-800',
  integration_error: 'bg-purple-100 text-purple-800',
  deployment_error: 'bg-blue-100 text-blue-800',
  billing_error: 'bg-yellow-100 text-yellow-800',
  sync_error: 'bg-cyan-100 text-cyan-800',
  validation_error: 'bg-gray-100 text-gray-800',
  unknown_error: 'bg-slate-100 text-slate-800',
};

export default function AdminErrorLogsPage() {
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>('unresolved');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');

  useEffect(() => {
    loadErrors();
  }, [filter, typeFilter]);

  const loadErrors = async () => {
    setLoading(true);
    const supabase = createClient();
    
    let query = supabase
      .from('error_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (filter === 'unresolved') {
      query = query.eq('resolved', false);
    } else if (filter === 'resolved') {
      query = query.eq('resolved', true);
    }

    if (typeFilter !== 'all') {
      query = query.eq('error_type', typeFilter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Failed to load error logs:', error);
    } else {
      setErrors(data || []);
    }

    setLoading(false);
  };

  const markAsResolved = async (id: string) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('error_logs')
      .update({
        resolved: true,
        resolved_at: new Date().toISOString(),
        resolved_by: user?.id,
        resolution_notes: resolutionNotes || null,
      })
      .eq('id', id);

    if (!error) {
      setErrors(errors.map(e => 
        e.id === id 
          ? { ...e, resolved: true, resolved_at: new Date().toISOString(), resolution_notes: resolutionNotes }
          : e
      ));
      setResolvingId(null);
      setResolutionNotes('');
    }
  };

  const filteredErrors = errors.filter(e => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      e.error_message.toLowerCase().includes(query) ||
      e.route?.toLowerCase().includes(query) ||
      e.error_type.toLowerCase().includes(query)
    );
  });

  const errorTypes = [...new Set(errors.map(e => e.error_type))];

  const handleExport = () => {
    const columns: CSVColumn<ErrorLog>[] = [
      { label: 'Message', accessor: (r) => r.error_message },
      { label: 'Route', accessor: (r) => r.route ? `${r.method || ''} ${r.route}` : '' },
      { label: 'Type', accessor: (r) => r.error_type },
      { label: 'Status Code', accessor: (r) => r.status_code },
      { label: 'Created', accessor: (r) => new Date(r.created_at).toLocaleString() },
      { label: 'Resolved', accessor: (r) => r.resolved ? 'Yes' : 'No' },
    ];
    exportToCSV(filteredErrors, columns, 'error-logs');
  };

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Error Logs</h1>
          <p className="text-muted-foreground">
            Monitor and resolve application errors
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport} disabled={filteredErrors.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={loadErrors} variant="outline" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Errors (24h)</CardDescription>
            <CardTitle className="text-2xl">
              {errors.filter(e => 
                new Date(e.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
              ).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Unresolved</CardDescription>
            <CardTitle className="text-2xl text-red-600">
              {errors.filter(e => !e.resolved).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Resolved</CardDescription>
            <CardTitle className="text-2xl text-green-600">
              {errors.filter(e => e.resolved).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="px-3 py-2 border rounded-md text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
              >
                <option value="all">All Errors</option>
                <option value="unresolved">Unresolved</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <select
              className="px-3 py-2 border rounded-md text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {errorTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search errors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredErrors.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium">No errors found</h3>
            <p className="text-muted-foreground mt-1">
              {filter === 'unresolved' 
                ? 'All errors have been resolved!' 
                : 'No errors match your filters.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredErrors.map((error) => (
            <Card key={error.id} className={error.resolved ? 'opacity-60' : ''}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {error.resolved ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={ERROR_TYPE_COLORS[error.error_type] || ERROR_TYPE_COLORS.unknown_error}>
                          {error.error_type}
                        </Badge>
                        {error.route && (
                          <span className="text-sm text-muted-foreground font-mono">
                            {error.method} {error.route}
                          </span>
                        )}
                        {error.status_code && (
                          <Badge variant="outline">{error.status_code}</Badge>
                        )}
                      </div>
                      <p className="text-sm mt-1 font-medium">{error.error_message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getTimeAgo(error.created_at)} • {new Date(error.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!error.resolved && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setResolvingId(resolvingId === error.id ? null : error.id)}
                      >
                        Mark Resolved
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setExpandedId(expandedId === error.id ? null : error.id)}
                    >
                      {expandedId === error.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Resolve form */}
              {resolvingId === error.id && (
                <CardContent className="pt-0 pb-4">
                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <Input
                      placeholder="Resolution notes (optional)"
                      value={resolutionNotes}
                      onChange={(e) => setResolutionNotes(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => markAsResolved(error.id)}>
                        Confirm Resolved
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setResolvingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}

              {/* Expanded details */}
              {expandedId === error.id && (
                <CardContent className="pt-0">
                  <div className="bg-muted rounded-lg p-4 space-y-4">
                    {error.error_stack && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Stack Trace</h4>
                        <pre className="text-xs bg-slate-900 text-slate-100 p-3 rounded overflow-x-auto">
                          {error.error_stack}
                        </pre>
                      </div>
                    )}

                    {error.metadata && Object.keys(error.metadata).length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Metadata</h4>
                        <pre className="text-xs bg-slate-100 p-3 rounded overflow-x-auto">
                          {JSON.stringify(error.metadata, null, 2)}
                        </pre>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">User ID:</span>
                        <span className="ml-2 font-mono">{error.user_id || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Organization ID:</span>
                        <span className="ml-2 font-mono">{error.organization_id || 'N/A'}</span>
                      </div>
                    </div>

                    {error.resolved && error.resolution_notes && (
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium mb-2">Resolution Notes</h4>
                        <p className="text-sm text-muted-foreground">{error.resolution_notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
