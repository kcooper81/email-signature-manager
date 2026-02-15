'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Button } from '@/components/ui';
import {
  Search,
  Building2,
  Users,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Download,
  ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';
import { exportToCSV, type CSVColumn } from '@/lib/admin/export-csv';

interface Organization {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  createdAt: string;
  plan: string;
  userCount: number;
  templateCount: number;
  lastActivity: string | null;
  isSuspended: boolean;
}

type PlanFilter = 'all' | 'free' | 'starter' | 'professional' | 'enterprise';

const PAGE_SIZE = 25;

export default function AccountsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [planFilter, setPlanFilter] = useState<PlanFilter>('all');
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    loadOrganizations();
  }, [debouncedSearch, page]);

  const loadOrganizations = async () => {
    setLoading(true);
    const supabase = createClient();

    // Build query with server-side search and pagination
    let query = supabase
      .from('organizations')
      .select('id, name, slug, domain, created_at', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (debouncedSearch) {
      query = query.or(`name.ilike.%${debouncedSearch}%,slug.ilike.%${debouncedSearch}%,domain.ilike.%${debouncedSearch}%`);
    }

    query = query.range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    const { data: orgs, count } = await query;

    if (!orgs) {
      setLoading(false);
      return;
    }

    setTotalCount(count || 0);
    const orgIds = orgs.map(o => o.id);

    // Get subscriptions
    const { data: subscriptions } = await supabase
      .from('subscriptions')
      .select('organization_id, plan')
      .in('organization_id', orgIds);

    const subsByOrg = new Map(subscriptions?.map(s => [s.organization_id, s.plan]) || []);

    // Get user counts per org
    const { data: users } = await supabase
      .from('users')
      .select('organization_id')
      .in('organization_id', orgIds);

    const userCountByOrg = new Map<string, number>();
    users?.forEach(u => {
      const count = userCountByOrg.get(u.organization_id) || 0;
      userCountByOrg.set(u.organization_id, count + 1);
    });

    // Get template counts per org
    const { data: templates } = await supabase
      .from('signature_templates')
      .select('organization_id')
      .in('organization_id', orgIds);

    const templateCountByOrg = new Map<string, number>();
    templates?.forEach(t => {
      const count = templateCountByOrg.get(t.organization_id) || 0;
      templateCountByOrg.set(t.organization_id, count + 1);
    });

    // Get last activity (audit log) per org
    const { data: auditLogs } = await supabase
      .from('audit_logs')
      .select('organization_id, created_at')
      .in('organization_id', orgIds)
      .order('created_at', { ascending: false });

    const lastActivityByOrg = new Map<string, string>();
    auditLogs?.forEach(log => {
      if (!lastActivityByOrg.has(log.organization_id)) {
        lastActivityByOrg.set(log.organization_id, log.created_at);
      }
    });

    const enrichedOrgs: Organization[] = orgs.map(org => ({
      id: org.id,
      name: org.name,
      slug: org.slug,
      domain: org.domain,
      createdAt: org.created_at,
      plan: subsByOrg.get(org.id) || 'free',
      userCount: userCountByOrg.get(org.id) || 0,
      templateCount: templateCountByOrg.get(org.id) || 0,
      lastActivity: lastActivityByOrg.get(org.id) || null,
      isSuspended: (org as any).is_suspended || false,
    }));

    setOrganizations(enrichedOrgs);
    setLoading(false);
  };

  // Plan filter is client-side since plan lives in subscriptions table
  const filteredOrgs = organizations.filter(org => {
    return planFilter === 'all' || org.plan === planFilter;
  });

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleExport = () => {
    const columns: CSVColumn<Organization>[] = [
      { label: 'Name', accessor: (r) => r.name },
      { label: 'Slug', accessor: (r) => r.slug },
      { label: 'Domain', accessor: (r) => r.domain },
      { label: 'Plan', accessor: (r) => r.plan },
      { label: 'Users', accessor: (r) => r.userCount },
      { label: 'Templates', accessor: (r) => r.templateCount },
      { label: 'Created', accessor: (r) => new Date(r.createdAt).toLocaleDateString() },
      { label: 'Last Activity', accessor: (r) => r.lastActivity ? new Date(r.lastActivity).toLocaleDateString() : '' },
      { label: 'Suspended', accessor: (r) => r.isSuspended ? 'Yes' : 'No' },
    ];
    exportToCSV(filteredOrgs, columns, 'accounts');
  };

  const planBadgeClass = (plan: string) => {
    switch (plan) {
      case 'starter': return 'bg-blue-100 text-blue-700'; // Legacy plan
      case 'professional': return 'bg-violet-100 text-violet-700';
      case 'enterprise': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading && organizations.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Accounts</h1>
          <p className="text-slate-500">Search and manage customer organizations</p>
        </div>
        <Button variant="outline" onClick={handleExport} disabled={filteredOrgs.length === 0}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, slug, or domain..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'free', 'starter', 'professional', 'enterprise'] as PlanFilter[]).map((plan) => (
                <button
                  key={plan}
                  onClick={() => { setPlanFilter(plan); }}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                    planFilter === plan
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {plan}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Organizations
          </CardTitle>
          <CardDescription>
            {filteredOrgs.length} of {totalCount} organizations (page {page + 1} of {totalPages || 1})
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : filteredOrgs.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No organizations found matching your search.
            </div>
          ) : (
            <>
              <div className="divide-y">
                {filteredOrgs.map((org) => (
                  <Link
                    key={org.id}
                    href={`/admin/accounts/${org.id}`}
                    className="flex items-center justify-between py-4 hover:bg-slate-50 -mx-6 px-6 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <p className="font-medium text-slate-900 truncate">{org.name}</p>
                        <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${planBadgeClass(org.plan)}`}>
                          {org.plan}
                        </span>
                        {org.isSuspended && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 flex items-center gap-1">
                            <ShieldAlert className="h-3 w-3" />
                            Suspended
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                        <span>{org.slug}</span>
                        {org.domain && <span>• {org.domain}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <div className="text-right">
                        <p className="font-medium text-slate-700">{org.userCount}</p>
                        <p className="text-xs">users</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-700">{org.templateCount}</p>
                        <p className="text-xs">templates</p>
                      </div>
                      <div className="text-right min-w-[100px]">
                        <p className="font-medium text-slate-700">
                          {new Date(org.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs">joined</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </div>
                  </Link>
                ))}
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
