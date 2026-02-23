'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Search,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Undo2,
  ExternalLink,
  Settings,
  Globe,
  FileText,
  Zap,
  Clock,
  Filter,
  RotateCcw,
} from 'lucide-react';

type Tab = 'overview' | 'competitors' | 'action-queue' | 'change-log' | 'settings';

interface SEOSnapshot {
  id: string;
  snapshot_date: string;
  page_url: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  sessions: number;
  bounce_rate: number;
  meta_title: string | null;
}

interface Recommendation {
  id: string;
  page_url: string | null;
  recommendation_type: string;
  current_value: any;
  suggested_value: any;
  ai_enhanced_value: any;
  rationale: string;
  confidence: number;
  data_basis: any;
  admin_notes: string | null;
  status: string;
  applied_by: string | null;
  created_at: string;
}

interface CompetitorRanking {
  id: string;
  keyword: string;
  our_position: number | null;
  our_url: string | null;
  competitors: any[];
  serp_features: any;
  search_volume_bucket: string;
  captured_at: string;
}

interface ChangeLogEntry {
  id: string;
  action: string;
  page_url: string | null;
  before_value: any;
  after_value: any;
  performed_by: string;
  created_at: string;
}

interface AlgorithmConfig {
  // Data Maturity
  minPageAgeDays: number;
  minImpressionsForCTR: number;
  comparisonWindowDays: number;
  changeLockoutDays: number;
  positionFluctuationTolerance: number;
  recentSnapshotDays: number;
  // Issue Detection
  lowCTRThreshold: number;
  lowCTRMaxPosition: number;
  trafficDeclineMedium: number;
  trafficDeclineHigh: number;
  opportunityZoneMinPosition: number;
  opportunityZoneMaxPosition: number;
  opportunityZoneMinImpressions: number;
  highBounceThreshold: number;
  highBounceMinSessions: number;
  metaTitleMinLength: number;
  metaTitleMaxLength: number;
  metaDescMinLength: number;
  metaDescMaxLength: number;
  contentGapMaxPosition: number;
  competitorTopPosition: number;
  outrankedMinPosition: number;
  outrankedMaxPosition: number;
  outrankedByPosition: number;
  // Confidence
  confidenceMetaTooLong: number;
  confidenceMetaTooShort: number;
  confidenceLowCTR: number;
  confidenceMissingFAQ: number;
  confidenceOpportunityZone: number;
  confidenceHighBounce: number;
  confidenceExpandContent: number;
  confidenceNewPage: number;
  // Data Collection
  dataCollectionWindowDays: number;
  topQueriesPerPage: number;
  snapshotBatchSize: number;
  maxSnapshotsForAnalysis: number;
  highVolumeThreshold: number;
  mediumVolumeThreshold: number;
  serpRateLimitMs: number;
  // Optimizer Limits
  maxExpandContentRecs: number;
  maxNewPageRecs: number;
  suggestedInternalLinks: number;
  // Cache
  overrideCacheTTLMinutes: number;
}

interface SEOSettings {
  id: string;
  claude_api_enabled: boolean;
  auto_run_enabled: boolean;
  auto_run_min_confidence: number;
  competitors: any[];
  daily_serp_query_limit: number;
  auto_run_types: string[];
  algorithm_config: AlgorithmConfig;
}

interface SEOIssue {
  id: string;
  page_url: string;
  issue_type: string;
  severity: string;
  status: string;
  details: any;
}

export default function SEODashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(true);

  // Overview state
  const [snapshots, setSnapshots] = useState<SEOSnapshot[]>([]);
  const [issues, setIssues] = useState<SEOIssue[]>([]);
  const [snapshotSort, setSnapshotSort] = useState<'impressions' | 'clicks' | 'position' | 'ctr'>('impressions');
  const [snapshotSortDir, setSnapshotSortDir] = useState<'asc' | 'desc'>('desc');

  // Recommendations state
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [recFilter, setRecFilter] = useState<string>('pending');
  const [recTypeFilter, setRecTypeFilter] = useState<string>('');
  const [expandedRec, setExpandedRec] = useState<string | null>(null);
  const [recTotal, setRecTotal] = useState(0);

  // Competitors state
  const [competitors, setCompetitors] = useState<CompetitorRanking[]>([]);
  const [competitorTotal, setCompetitorTotal] = useState(0);

  // Change log state
  const [changeLogs, setChangeLogs] = useState<ChangeLogEntry[]>([]);
  const [changeLogTotal, setChangeLogTotal] = useState(0);

  // Settings state
  const [settings, setSettings] = useState<SEOSettings | null>(null);

  // Algorithm config state
  const [algoConfig, setAlgoConfig] = useState<AlgorithmConfig | null>(null);
  const [algoConfigDirty, setAlgoConfigDirty] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [savingAlgoConfig, setSavingAlgoConfig] = useState(false);

  // Loading states
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [auditRunning, setAuditRunning] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'overview':
          await loadOverview();
          break;
        case 'competitors':
          await loadCompetitors();
          break;
        case 'action-queue':
          await loadRecommendations();
          break;
        case 'change-log':
          await loadChangeLogs();
          break;
        case 'settings':
          await loadSettings();
          break;
      }
    } catch (e) {
      console.error('Failed to load data:', e);
    }
    setLoading(false);
  }, [activeTab, recFilter, recTypeFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // --- Data loaders ---

  async function loadOverview() {
    const res = await fetch('/api/admin/seo/snapshots?limit=200');
    const data = await res.json();
    setSnapshots(data.data || []);

    const supabase = createClient();
    const { data: issueData } = await supabase
      .from('seo_issues')
      .select('*')
      .eq('status', 'open')
      .order('severity');
    setIssues(issueData || []);
  }

  async function loadRecommendations() {
    const params = new URLSearchParams({
      status: recFilter,
      limit: '50',
    });
    if (recTypeFilter) params.set('type', recTypeFilter);
    const res = await fetch(`/api/admin/seo/recommendations?${params}`);
    const data = await res.json();
    setRecommendations(data.data || []);
    setRecTotal(data.total || 0);
  }

  async function loadCompetitors() {
    const res = await fetch('/api/admin/seo/competitors?limit=100');
    const data = await res.json();
    setCompetitors(data.data || []);
    setCompetitorTotal(data.total || 0);
  }

  async function loadChangeLogs() {
    const res = await fetch('/api/admin/seo/change-log?limit=50');
    const data = await res.json();
    setChangeLogs(data.data || []);
    setChangeLogTotal(data.total || 0);
  }

  async function loadSettings() {
    const res = await fetch('/api/admin/seo/settings');
    const data = await res.json();
    setSettings(data);
    if (data?.algorithm_config) {
      setAlgoConfig(data.algorithm_config);
      setAlgoConfigDirty(false);
    }
  }

  // --- Actions ---

  async function runAudit() {
    setAuditRunning(true);
    try {
      const res = await fetch('/api/admin/seo/run-audit', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await loadData();
    } catch (e: any) {
      console.error('Audit failed:', e.message);
    }
    setAuditRunning(false);
  }

  async function approveRecommendation(id: string) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/seo/recommendations/${id}/approve`, { method: 'POST' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error('Approve failed:', data.error || res.statusText);
      }
      await loadRecommendations();
    } catch (e) { console.error(e); }
    setActionLoading(null);
  }

  async function dismissRecommendation(id: string) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/seo/recommendations/${id}/dismiss`, { method: 'POST' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error('Dismiss failed:', data.error || res.statusText);
      }
      await loadRecommendations();
    } catch (e) { console.error(e); }
    setActionLoading(null);
  }

  async function rollbackRecommendation(id: string) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/seo/recommendations/${id}/rollback`, { method: 'POST' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error('Rollback failed:', data.error || res.statusText);
      }
      await loadRecommendations();
    } catch (e) { console.error(e); }
    setActionLoading(null);
  }

  async function enhanceRecommendation(id: string) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/seo/recommendations/${id}/enhance`, { method: 'POST' });
      if (res.ok) await loadRecommendations();
    } catch (e) { console.error(e); }
    setActionLoading(null);
  }

  async function publishGeneratedPage(pageId: string, recId: string) {
    setActionLoading(recId);
    try {
      const res = await fetch(`/api/admin/seo/generated-pages/${pageId}/publish`, { method: 'POST' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error('Publish failed:', data.error || res.statusText);
      } else {
        await loadRecommendations();
      }
    } catch (e) { console.error(e); }
    setActionLoading(null);
  }

  async function updateNotes(id: string, notes: string) {
    await fetch(`/api/admin/seo/recommendations/${id}/notes`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes }),
    });
  }

  async function updateSettings(updates: Partial<SEOSettings>) {
    const res = await fetch('/api/admin/seo/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const data = await res.json();
      setSettings(data);
    }
  }

  // --- Helper renderers ---

  function severityBadge(severity: string) {
    const colors: Record<string, string> = {
      critical: 'bg-red-100 text-red-700 border-red-200',
      high: 'bg-orange-100 text-orange-700 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colors[severity] || 'bg-slate-100 text-slate-700'}`}>
        {severity.toUpperCase()}
      </span>
    );
  }

  function confidenceBadge(confidence: number) {
    const pct = Math.round(confidence * 100);
    const color = pct >= 80 ? 'text-green-600' : pct >= 60 ? 'text-yellow-600' : 'text-red-600';
    return <span className={`text-sm font-medium ${color}`}>{pct}%</span>;
  }

  function recTypeBadge(type: string) {
    const labels: Record<string, string> = {
      meta_title: 'Meta Title',
      meta_description: 'Meta Desc',
      add_faq: 'Add FAQs',
      add_section: 'Add Section',
      expand_content: 'Expand Content',
      new_page: 'New Page',
      add_internal_links: 'Internal Links',
      add_comparison_table: 'Comparison Table',
      add_checklist: 'Add Checklist',
    };
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-violet-100 text-violet-700">
        {labels[type] || type}
      </span>
    );
  }

  function truncateUrl(url: string, maxLen = 60): string {
    if (!url) return '';
    try {
      return new URL(url).pathname.substring(0, maxLen);
    } catch {
      return url.substring(0, maxLen);
    }
  }

  // Sort snapshots
  const sortedSnapshots = [...snapshots].sort((a, b) => {
    const aVal = a[snapshotSort];
    const bVal = b[snapshotSort];
    return snapshotSortDir === 'desc' ? (bVal as number) - (aVal as number) : (aVal as number) - (bVal as number);
  });

  // Aggregate metrics
  const totalClicks = snapshots.reduce((sum, s) => sum + s.clicks, 0);
  const totalImpressions = snapshots.reduce((sum, s) => sum + s.impressions, 0);
  const avgPosition = snapshots.length > 0 ? snapshots.reduce((sum, s) => sum + s.position, 0) / snapshots.length : 0;
  const avgCTR = snapshots.length > 0 ? snapshots.reduce((sum, s) => sum + s.ctr, 0) / snapshots.length : 0;
  const criticalIssues = issues.filter((i) => i.severity === 'critical').length;
  const highIssues = issues.filter((i) => i.severity === 'high').length;

  // --- Tab buttons ---

  const tabs: { key: Tab; label: string; icon: typeof Search }[] = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'competitors', label: 'Competitors', icon: Globe },
    { key: 'action-queue', label: 'Action Queue', icon: Zap },
    { key: 'change-log', label: 'Change Log', icon: Clock },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">SEO Engine</h1>
          <p className="text-slate-500">Auto-optimization, competitor intelligence & content management</p>
        </div>
        <Button
          onClick={runAudit}
          disabled={auditRunning}
          className="bg-violet-600 hover:bg-violet-700"
        >
          {auditRunning ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Running Audit...</>
          ) : (
            <><RefreshCw className="h-4 w-4 mr-2" /> Run Audit Now</>
          )}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab.key
                ? 'border-violet-600 text-violet-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
            {tab.key === 'action-queue' && recTotal > 0 && (
              <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1.5 text-xs font-bold text-white">
                {recTotal > 99 ? '99+' : recTotal}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      ) : (
        <>
          {/* ==================== OVERVIEW TAB ==================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metric cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard icon={MousePointerClick} iconBg="bg-blue-100" iconColor="text-blue-600" value={totalClicks.toLocaleString()} label="Organic Clicks" />
                <MetricCard icon={Eye} iconBg="bg-violet-100" iconColor="text-violet-600" value={totalImpressions.toLocaleString()} label="Impressions" />
                <MetricCard icon={TrendingUp} iconBg="bg-green-100" iconColor="text-green-600" value={`${(avgCTR * 100).toFixed(2)}%`} label="Avg CTR" />
                <MetricCard icon={BarChart3} iconBg="bg-amber-100" iconColor="text-amber-600" value={avgPosition.toFixed(1)} label="Avg Position" />
              </div>

              {/* Issues summary */}
              {(criticalIssues > 0 || highIssues > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Open Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      {criticalIssues > 0 && (
                        <div className="flex items-center gap-2">
                          {severityBadge('critical')}
                          <span className="text-sm">{criticalIssues} critical</span>
                        </div>
                      )}
                      {highIssues > 0 && (
                        <div className="flex items-center gap-2">
                          {severityBadge('high')}
                          <span className="text-sm">{highIssues} high</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        {severityBadge('medium')}
                        <span className="text-sm">{issues.filter((i) => i.severity === 'medium').length} medium</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Page performance table */}
              <Card>
                <CardHeader>
                  <CardTitle>Page Performance</CardTitle>
                  <CardDescription>Top pages by search performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left">
                          <th className="pb-3 font-medium text-slate-500">Page</th>
                          {(['impressions', 'clicks', 'ctr', 'position'] as const).map((col) => (
                            <th
                              key={col}
                              className="pb-3 font-medium text-slate-500 cursor-pointer hover:text-slate-700"
                              onClick={() => {
                                if (snapshotSort === col) {
                                  setSnapshotSortDir(snapshotSortDir === 'desc' ? 'asc' : 'desc');
                                } else {
                                  setSnapshotSort(col);
                                  setSnapshotSortDir('desc');
                                }
                              }}
                            >
                              <span className="flex items-center gap-1">
                                {col.charAt(0).toUpperCase() + col.slice(1)}
                                {snapshotSort === col && (
                                  snapshotSortDir === 'desc' ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />
                                )}
                              </span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {sortedSnapshots.slice(0, 50).map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50">
                            <td className="py-2.5 max-w-[300px] truncate text-slate-700" title={s.page_url}>
                              {truncateUrl(s.page_url)}
                            </td>
                            <td className="py-2.5 text-slate-600">{s.impressions.toLocaleString()}</td>
                            <td className="py-2.5 font-medium">{s.clicks.toLocaleString()}</td>
                            <td className="py-2.5">
                              <span className={s.ctr >= 0.03 ? 'text-green-600' : s.ctr >= 0.015 ? 'text-amber-600' : 'text-red-600'}>
                                {(s.ctr * 100).toFixed(2)}%
                              </span>
                            </td>
                            <td className="py-2.5">
                              <span className={s.position <= 5 ? 'text-green-600 font-medium' : s.position <= 10 ? 'text-amber-600' : 'text-slate-600'}>
                                {s.position.toFixed(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {snapshots.length === 0 && (
                      <div className="text-center py-12 text-slate-500">No snapshot data yet. Run an audit to collect data.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ==================== COMPETITORS TAB ==================== */}
          {activeTab === 'competitors' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Competitor Rankings ({competitorTotal})
                  </CardTitle>
                  <CardDescription>Keyword-level comparison with competitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left">
                          <th className="pb-3 font-medium text-slate-500">Keyword</th>
                          <th className="pb-3 font-medium text-slate-500">Our Position</th>
                          <th className="pb-3 font-medium text-slate-500">Top Competitor</th>
                          <th className="pb-3 font-medium text-slate-500">Gap</th>
                          <th className="pb-3 font-medium text-slate-500">Volume</th>
                          <th className="pb-3 font-medium text-slate-500">SERP Features</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {competitors.map((cr) => {
                          const topComp = cr.competitors?.[0];
                          const gap = cr.our_position && topComp ? cr.our_position - topComp.position : null;
                          return (
                            <tr key={cr.id} className="hover:bg-slate-50">
                              <td className="py-2.5 font-medium text-slate-700 max-w-[200px] truncate">{cr.keyword}</td>
                              <td className="py-2.5">
                                {cr.our_position ? (
                                  <span className={cr.our_position <= 5 ? 'text-green-600 font-medium' : cr.our_position <= 10 ? 'text-amber-600' : 'text-red-600'}>
                                    #{cr.our_position}
                                  </span>
                                ) : (
                                  <span className="text-slate-400">Not ranking</span>
                                )}
                              </td>
                              <td className="py-2.5 text-slate-600">
                                {topComp ? (
                                  <span>#{topComp.position} — {topComp.domain}</span>
                                ) : '-'}
                              </td>
                              <td className="py-2.5">
                                {gap !== null ? (
                                  <span className={gap > 0 ? 'text-red-600' : 'text-green-600'}>
                                    {gap > 0 ? `+${gap}` : gap}
                                  </span>
                                ) : '-'}
                              </td>
                              <td className="py-2.5">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                  cr.search_volume_bucket === 'high' ? 'bg-green-100 text-green-700' :
                                  cr.search_volume_bucket === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-slate-100 text-slate-600'
                                }`}>
                                  {cr.search_volume_bucket}
                                </span>
                              </td>
                              <td className="py-2.5">
                                <div className="flex gap-1">
                                  {cr.serp_features?.faq && <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px]">FAQ</span>}
                                  {cr.serp_features?.featuredSnippet && <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 text-[10px]">Featured</span>}
                                  {cr.serp_features?.videos && <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 text-[10px]">Video</span>}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {competitors.length === 0 && (
                      <div className="text-center py-12 text-slate-500">No competitor data yet. Configure SERP API and run an audit.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ==================== ACTION QUEUE TAB ==================== */}
          {activeTab === 'action-queue' && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-500">Status:</span>
                  {['pending', 'applied', 'dismissed', 'rolled_back'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setRecFilter(s)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        recFilter === s ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Type:</span>
                  <select
                    value={recTypeFilter}
                    onChange={(e) => setRecTypeFilter(e.target.value)}
                    className="text-xs border rounded-lg px-2 py-1.5 bg-white"
                  >
                    <option value="">All types</option>
                    <option value="meta_title">Meta Title</option>
                    <option value="meta_description">Meta Description</option>
                    <option value="add_faq">Add FAQs</option>
                    <option value="expand_content">Expand Content</option>
                    <option value="new_page">New Page</option>
                    <option value="add_internal_links">Internal Links</option>
                  </select>
                </div>
                <span className="text-sm text-slate-400 ml-auto">{recTotal} recommendations</span>
              </div>

              {/* Recommendation cards */}
              {recommendations.map((rec) => (
                <Card key={rec.id} className="border-l-4" style={{ borderLeftColor: rec.confidence >= 0.8 ? '#22c55e' : rec.confidence >= 0.6 ? '#eab308' : '#ef4444' }}>
                  <CardContent className="pt-4">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {recTypeBadge(rec.recommendation_type)}
                        <span className="text-sm text-slate-500">Confidence: {confidenceBadge(rec.confidence)}</span>
                        {rec.applied_by && (
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                            Applied by: {rec.applied_by}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => setExpandedRec(expandedRec === rec.id ? null : rec.id)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        {expandedRec === rec.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* Page URL */}
                    {rec.page_url && (
                      <p className="text-sm text-slate-600 mb-2 flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" />
                        <span className="truncate max-w-[500px]">{truncateUrl(rec.page_url)}</span>
                        <a href={rec.page_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </p>
                    )}

                    {/* Rationale */}
                    <p className="text-sm text-slate-700 mb-3">{rec.rationale}</p>

                    {/* Expanded details */}
                    {expandedRec === rec.id && (
                      <div className="mt-3 pt-3 border-t space-y-3">
                        {/* Current vs Suggested */}
                        {rec.current_value && (
                          <div>
                            <p className="text-xs font-medium text-slate-500 mb-1">Current:</p>
                            <pre className="text-xs bg-red-50 text-red-800 p-2 rounded overflow-auto max-h-32">
                              {JSON.stringify(rec.current_value, null, 2)}
                            </pre>
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-medium text-slate-500 mb-1">Suggested:</p>
                          <pre className="text-xs bg-green-50 text-green-800 p-2 rounded overflow-auto max-h-32">
                            {JSON.stringify(rec.suggested_value, null, 2)}
                          </pre>
                        </div>
                        {rec.ai_enhanced_value && (
                          <div>
                            <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
                              <Sparkles className="h-3 w-3 text-violet-500" /> AI Enhanced:
                            </p>
                            <pre className="text-xs bg-violet-50 text-violet-800 p-2 rounded overflow-auto max-h-32">
                              {JSON.stringify(rec.ai_enhanced_value, null, 2)}
                            </pre>
                          </div>
                        )}

                        {/* Data basis */}
                        {rec.data_basis && Object.keys(rec.data_basis).length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-slate-500 mb-1">Data Basis:</p>
                            <pre className="text-xs bg-slate-50 text-slate-700 p-2 rounded overflow-auto max-h-24">
                              {JSON.stringify(rec.data_basis, null, 2)}
                            </pre>
                          </div>
                        )}

                        {/* Notes */}
                        <div>
                          <p className="text-xs font-medium text-slate-500 mb-1">Admin Notes:</p>
                          <Textarea
                            defaultValue={rec.admin_notes || ''}
                            placeholder="Add notes..."
                            className="text-xs h-16"
                            onBlur={(e) => updateNotes(rec.id, e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    {rec.status === 'pending' && (
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          onClick={() => approveRecommendation(rec.id)}
                          disabled={actionLoading === rec.id}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {actionLoading === rec.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle className="h-3 w-3 mr-1" />}
                          Apply
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => dismissRecommendation(rec.id)}
                          disabled={actionLoading === rec.id}
                        >
                          <XCircle className="h-3 w-3 mr-1" /> Dismiss
                        </Button>
                        {settings?.claude_api_enabled && !rec.ai_enhanced_value && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => enhanceRecommendation(rec.id)}
                            disabled={actionLoading === rec.id}
                            className="text-violet-600 border-violet-200 hover:bg-violet-50"
                          >
                            <Sparkles className="h-3 w-3 mr-1" /> AI Enhance
                          </Button>
                        )}
                      </div>
                    )}
                    {rec.status === 'applied' && (
                      <div className="mt-3 space-y-2">
                        {/* Show generated page link for new_page recommendations */}
                        {rec.recommendation_type === 'new_page' && rec.suggested_value?.generated_page_url && (
                          <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                            <Globe className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <a
                              href={rec.suggested_value.generated_page_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 underline truncate"
                            >
                              {rec.suggested_value.generated_page_url}
                            </a>
                            <ExternalLink className="h-3 w-3 text-blue-400 flex-shrink-0" />
                            <span className="text-xs text-blue-500 ml-auto flex-shrink-0">Draft</span>
                          </div>
                        )}
                        <div className="flex gap-2">
                          {/* Publish button for new_page with generated page */}
                          {rec.recommendation_type === 'new_page' && rec.suggested_value?.generated_page_id && (
                            <Button
                              size="sm"
                              onClick={() => publishGeneratedPage(rec.suggested_value.generated_page_id, rec.id)}
                              disabled={actionLoading === rec.id}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              {actionLoading === rec.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Globe className="h-3 w-3 mr-1" />}
                              Publish Page
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rollbackRecommendation(rec.id)}
                            disabled={actionLoading === rec.id}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Undo2 className="h-3 w-3 mr-1" /> Rollback
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {recommendations.length === 0 && (
                <div className="text-center py-12 text-slate-500">No recommendations matching filters. Run an audit to generate recommendations.</div>
              )}
            </div>
          )}

          {/* ==================== CHANGE LOG TAB ==================== */}
          {activeTab === 'change-log' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Change Log ({changeLogTotal})
                  </CardTitle>
                  <CardDescription>Full audit trail of all SEO changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {changeLogs.map((log) => (
                      <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border">
                        <div className="mt-0.5">
                          {log.action.includes('applied') ? <CheckCircle className="h-4 w-4 text-green-500" /> :
                           log.action.includes('rolled_back') ? <Undo2 className="h-4 w-4 text-red-500" /> :
                           log.action.includes('dismissed') ? <XCircle className="h-4 w-4 text-slate-400" /> :
                           log.action.includes('published') ? <Globe className="h-4 w-4 text-blue-500" /> :
                           <FileText className="h-4 w-4 text-slate-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-700">
                              {log.action.replace(/_/g, ' ')}
                            </span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">
                              {log.performed_by}
                            </span>
                          </div>
                          {log.page_url && (
                            <p className="text-xs text-slate-500 mt-0.5 truncate">{truncateUrl(log.page_url)}</p>
                          )}
                          <p className="text-xs text-slate-400 mt-0.5">
                            {new Date(log.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {changeLogs.length === 0 && (
                      <div className="text-center py-12 text-slate-500">No changes recorded yet.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ==================== SETTINGS TAB ==================== */}
          {activeTab === 'settings' && settings && (
            <div className="space-y-6">
              {/* Claude API */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-violet-500" />
                    Claude API Integration
                  </CardTitle>
                  <CardDescription>Enable AI-powered content enhancement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Enable Claude API</p>
                      <p className="text-xs text-slate-500">Powers AI Enhance button and auto-run mode</p>
                    </div>
                    <Switch
                      checked={settings.claude_api_enabled}
                      onCheckedChange={(checked) => updateSettings({ claude_api_enabled: checked })}
                    />
                  </div>

                  {settings.claude_api_enabled && (
                    <>
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Auto-Run Mode</p>
                            <p className="text-xs text-slate-500">Automatically apply high-confidence recommendations</p>
                          </div>
                          <Switch
                            checked={settings.auto_run_enabled}
                            onCheckedChange={(checked) => updateSettings({ auto_run_enabled: checked })}
                          />
                        </div>
                      </div>

                      {settings.auto_run_enabled && (
                        <div className="space-y-3 pl-4 border-l-2 border-violet-200">
                          <div>
                            <label className="text-sm font-medium">Min Confidence Threshold: {Math.round(settings.auto_run_min_confidence * 100)}%</label>
                            <input
                              type="range"
                              min="0.5"
                              max="1"
                              step="0.05"
                              value={settings.auto_run_min_confidence}
                              onChange={(e) => updateSettings({ auto_run_min_confidence: parseFloat(e.target.value) })}
                              className="w-full mt-1"
                            />
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Auto-Run Types:</p>
                            {[
                              { type: 'meta_title', label: 'Meta title fixes' },
                              { type: 'meta_description', label: 'Meta description fixes' },
                              { type: 'add_faq', label: 'Add FAQs' },
                              { type: 'expand_content', label: 'Expand content' },
                            ].map(({ type, label }) => (
                              <label key={type} className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={settings.auto_run_types.includes(type)}
                                  onChange={(e) => {
                                    const newTypes = e.target.checked
                                      ? [...settings.auto_run_types, type]
                                      : settings.auto_run_types.filter((t) => t !== type);
                                    updateSettings({ auto_run_types: newTypes } as any);
                                  }}
                                  className="rounded border-slate-300"
                                />
                                {label}
                              </label>
                            ))}
                            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-not-allowed">
                              <input type="checkbox" disabled className="rounded border-slate-200" />
                              New pages (always requires manual publish)
                            </label>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              {/* SERP / Competitors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Competitor Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Daily SERP Query Limit</label>
                    <Input
                      type="number"
                      value={settings.daily_serp_query_limit}
                      onChange={(e) => updateSettings({ daily_serp_query_limit: parseInt(e.target.value) || 50 })}
                      className="w-32 mt-1"
                      min={1}
                      max={500}
                    />
                    <p className="text-xs text-slate-500 mt-1">Max SERP API queries per audit run</p>
                  </div>
                </CardContent>
              </Card>

              {/* Algorithm Parameters */}
              {algoConfig && (
                <AlgorithmConfigPanel
                  config={algoConfig}
                  onChange={(updated) => { setAlgoConfig(updated); setAlgoConfigDirty(true); }}
                  expandedSections={expandedSections}
                  onToggleSection={(section) => {
                    setExpandedSections((prev) => {
                      const next = new Set(prev);
                      next.has(section) ? next.delete(section) : next.add(section);
                      return next;
                    });
                  }}
                  saving={savingAlgoConfig}
                  dirty={algoConfigDirty}
                  onSave={async () => {
                    setSavingAlgoConfig(true);
                    await updateSettings({ algorithm_config: algoConfig } as any);
                    setAlgoConfigDirty(false);
                    setSavingAlgoConfig(false);
                  }}
                  onResetAll={async () => {
                    setSavingAlgoConfig(true);
                    await updateSettings({ algorithm_config: {} } as any);
                    await loadSettings();
                    setSavingAlgoConfig(false);
                  }}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// --- Reusable metric card ---

function MetricCard({
  icon: Icon,
  iconBg,
  iconColor,
  value,
  label,
}: {
  icon: typeof Search;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Algorithm Config Defaults (must match server config.ts) ---

const ALGO_DEFAULTS: AlgorithmConfig = {
  minPageAgeDays: 28, minImpressionsForCTR: 200, comparisonWindowDays: 28,
  changeLockoutDays: 28, positionFluctuationTolerance: 3, recentSnapshotDays: 7,
  lowCTRThreshold: 0.02, lowCTRMaxPosition: 10, trafficDeclineMedium: 0.30,
  trafficDeclineHigh: 0.50, opportunityZoneMinPosition: 5, opportunityZoneMaxPosition: 20,
  opportunityZoneMinImpressions: 50, highBounceThreshold: 0.80, highBounceMinSessions: 10,
  metaTitleMinLength: 30, metaTitleMaxLength: 60, metaDescMinLength: 70, metaDescMaxLength: 160,
  contentGapMaxPosition: 20, competitorTopPosition: 5, outrankedMinPosition: 5,
  outrankedMaxPosition: 20, outrankedByPosition: 3,
  confidenceMetaTooLong: 0.90, confidenceMetaTooShort: 0.85, confidenceLowCTR: 0.60,
  confidenceMissingFAQ: 0.70, confidenceOpportunityZone: 0.65, confidenceHighBounce: 0.60,
  confidenceExpandContent: 0.60, confidenceNewPage: 0.50,
  dataCollectionWindowDays: 30, topQueriesPerPage: 20, snapshotBatchSize: 50,
  maxSnapshotsForAnalysis: 500, highVolumeThreshold: 1000, mediumVolumeThreshold: 200,
  serpRateLimitMs: 250,
  maxExpandContentRecs: 20, maxNewPageRecs: 10, suggestedInternalLinks: 3,
  overrideCacheTTLMinutes: 5,
};

// --- Algorithm Config Panel ---

interface ConfigFieldDef {
  key: keyof AlgorithmConfig;
  label: string;
  type: 'number' | 'slider' | 'percent-slider';
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
}

interface ConfigSectionDef {
  id: string;
  title: string;
  fields: ConfigFieldDef[];
}

const CONFIG_SECTIONS: ConfigSectionDef[] = [
  {
    id: 'data-maturity',
    title: 'Data Maturity',
    fields: [
      { key: 'minPageAgeDays', label: 'Min page age (days)', type: 'slider', min: 7, max: 90, step: 1, hint: 'Skip pages younger than this' },
      { key: 'minImpressionsForCTR', label: 'Min impressions for CTR analysis', type: 'number', min: 10, max: 5000, hint: 'Require this many impressions before CTR analysis' },
      { key: 'comparisonWindowDays', label: 'Comparison window (days)', type: 'slider', min: 7, max: 90, step: 1, hint: 'Compare current vs prior period' },
      { key: 'changeLockoutDays', label: 'Change lockout (days)', type: 'slider', min: 7, max: 90, step: 1, hint: 'Skip pages recently changed' },
      { key: 'positionFluctuationTolerance', label: 'Position fluctuation tolerance', type: 'number', min: 1, max: 20, hint: 'Ignore position changes within this range' },
      { key: 'recentSnapshotDays', label: 'Recent snapshot window (days)', type: 'slider', min: 3, max: 30, step: 1, hint: 'Window for "recent" data' },
    ],
  },
  {
    id: 'issue-detection',
    title: 'Issue Detection Thresholds',
    fields: [
      { key: 'lowCTRThreshold', label: 'Low CTR threshold', type: 'percent-slider', min: 0.005, max: 0.10, step: 0.005, hint: 'Flag pages below this CTR' },
      { key: 'lowCTRMaxPosition', label: 'Low CTR max position', type: 'number', min: 1, max: 50, hint: 'Only check CTR for pages ranking within this' },
      { key: 'trafficDeclineMedium', label: 'Traffic decline medium', type: 'percent-slider', min: 0.10, max: 0.80, step: 0.05, hint: 'Decline % to flag as medium severity' },
      { key: 'trafficDeclineHigh', label: 'Traffic decline high', type: 'percent-slider', min: 0.20, max: 0.90, step: 0.05, hint: 'Decline % to flag as high severity' },
      { key: 'opportunityZoneMinPosition', label: 'Opportunity zone min position', type: 'number', min: 1, max: 50 },
      { key: 'opportunityZoneMaxPosition', label: 'Opportunity zone max position', type: 'number', min: 5, max: 100 },
      { key: 'opportunityZoneMinImpressions', label: 'Opportunity zone min impressions', type: 'number', min: 1, max: 1000 },
      { key: 'highBounceThreshold', label: 'High bounce threshold', type: 'percent-slider', min: 0.50, max: 0.95, step: 0.05, hint: 'Flag pages above this bounce rate' },
      { key: 'highBounceMinSessions', label: 'High bounce min sessions', type: 'number', min: 1, max: 100, hint: 'Require this many sessions before flagging' },
    ],
  },
  {
    id: 'meta-tags',
    title: 'Meta Tag Rules',
    fields: [
      { key: 'metaTitleMinLength', label: 'Title min length', type: 'number', min: 10, max: 60 },
      { key: 'metaTitleMaxLength', label: 'Title max length', type: 'number', min: 40, max: 100 },
      { key: 'metaDescMinLength', label: 'Description min length', type: 'number', min: 30, max: 160 },
      { key: 'metaDescMaxLength', label: 'Description max length', type: 'number', min: 100, max: 320 },
    ],
  },
  {
    id: 'content-gap',
    title: 'Content Gap Detection',
    fields: [
      { key: 'contentGapMaxPosition', label: 'Our max position (content gap)', type: 'number', min: 5, max: 100, hint: "We're absent or ranking worse than this" },
      { key: 'competitorTopPosition', label: 'Competitor top position', type: 'number', min: 1, max: 20, hint: 'Competitor must rank within this to flag gap' },
      { key: 'outrankedMinPosition', label: 'Outranked min position', type: 'number', min: 1, max: 50 },
      { key: 'outrankedMaxPosition', label: 'Outranked max position', type: 'number', min: 5, max: 100 },
      { key: 'outrankedByPosition', label: 'Outranked by position', type: 'number', min: 1, max: 10, hint: 'Competitor position threshold' },
    ],
  },
  {
    id: 'confidence',
    title: 'Recommendation Confidence Scores',
    fields: [
      { key: 'confidenceMetaTooLong', label: 'Meta too long', type: 'percent-slider', min: 0, max: 1, step: 0.05 },
      { key: 'confidenceMetaTooShort', label: 'Meta too short', type: 'percent-slider', min: 0, max: 1, step: 0.05 },
      { key: 'confidenceLowCTR', label: 'Low CTR', type: 'percent-slider', min: 0, max: 1, step: 0.05 },
      { key: 'confidenceMissingFAQ', label: 'Missing FAQ', type: 'percent-slider', min: 0, max: 1, step: 0.05 },
      { key: 'confidenceOpportunityZone', label: 'Opportunity zone', type: 'percent-slider', min: 0, max: 1, step: 0.05 },
      { key: 'confidenceHighBounce', label: 'High bounce', type: 'percent-slider', min: 0, max: 1, step: 0.05 },
      { key: 'confidenceExpandContent', label: 'Expand content', type: 'percent-slider', min: 0, max: 1, step: 0.05 },
      { key: 'confidenceNewPage', label: 'New page', type: 'percent-slider', min: 0, max: 1, step: 0.05 },
    ],
  },
  {
    id: 'data-collection',
    title: 'Data Collection',
    fields: [
      { key: 'dataCollectionWindowDays', label: 'Collection window (days)', type: 'slider', min: 7, max: 90, step: 1 },
      { key: 'topQueriesPerPage', label: 'Top queries per page', type: 'number', min: 5, max: 100 },
      { key: 'snapshotBatchSize', label: 'Snapshot batch size', type: 'number', min: 10, max: 200 },
      { key: 'maxSnapshotsForAnalysis', label: 'Max snapshots for analysis', type: 'number', min: 50, max: 5000 },
      { key: 'highVolumeThreshold', label: 'High volume threshold (impressions)', type: 'number', min: 100, max: 10000 },
      { key: 'mediumVolumeThreshold', label: 'Medium volume threshold (impressions)', type: 'number', min: 10, max: 5000 },
      { key: 'serpRateLimitMs', label: 'SERP rate limit (ms)', type: 'number', min: 50, max: 2000, hint: 'Delay between SERP API calls' },
    ],
  },
  {
    id: 'optimizer-limits',
    title: 'Optimizer Limits',
    fields: [
      { key: 'maxExpandContentRecs', label: 'Max expand content recommendations', type: 'number', min: 1, max: 100 },
      { key: 'maxNewPageRecs', label: 'Max new page recommendations', type: 'number', min: 1, max: 50 },
      { key: 'suggestedInternalLinks', label: 'Suggested internal links count', type: 'number', min: 1, max: 20 },
    ],
  },
  {
    id: 'cache',
    title: 'Cache',
    fields: [
      { key: 'overrideCacheTTLMinutes', label: 'Override cache TTL (minutes)', type: 'number', min: 1, max: 60, hint: 'How long to cache content overrides' },
    ],
  },
];

function AlgorithmConfigPanel({
  config,
  onChange,
  expandedSections,
  onToggleSection,
  saving,
  dirty,
  onSave,
  onResetAll,
}: {
  config: AlgorithmConfig;
  onChange: (updated: AlgorithmConfig) => void;
  expandedSections: Set<string>;
  onToggleSection: (section: string) => void;
  saving: boolean;
  dirty: boolean;
  onSave: () => void;
  onResetAll: () => void;
}) {
  function updateField(key: keyof AlgorithmConfig, value: number) {
    onChange({ ...config, [key]: value });
  }

  function resetSection(section: ConfigSectionDef) {
    const updated = { ...config };
    for (const field of section.fields) {
      (updated as any)[field.key] = ALGO_DEFAULTS[field.key];
    }
    onChange(updated);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Algorithm Parameters
            </CardTitle>
            <CardDescription>Fine-tune the SEO engine detection thresholds and limits</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onResetAll}
              disabled={saving}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Reset All to Defaults
            </Button>
            <Button
              size="sm"
              onClick={onSave}
              disabled={saving || !dirty}
              className="bg-violet-600 hover:bg-violet-700"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : null}
              {dirty ? 'Save Changes' : 'Saved'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {CONFIG_SECTIONS.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          return (
            <div key={section.id} className="border rounded-lg">
              <button
                onClick={() => onToggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>{section.title}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); resetSection(section); }}
                    className="text-xs text-slate-400 hover:text-red-600 px-2 py-0.5 rounded hover:bg-red-50"
                    title="Reset section to defaults"
                  >
                    Reset
                  </button>
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 space-y-4 border-t">
                  {section.fields.map((field) => (
                    <ConfigField
                      key={field.key}
                      field={field}
                      value={config[field.key]}
                      defaultValue={ALGO_DEFAULTS[field.key]}
                      onChange={(v) => updateField(field.key, v)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function ConfigField({
  field,
  value,
  defaultValue,
  onChange,
}: {
  field: ConfigFieldDef;
  value: number;
  defaultValue: number;
  onChange: (v: number) => void;
}) {
  const isModified = value !== defaultValue;

  if (field.type === 'slider') {
    return (
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm text-slate-700">
            {field.label}
            {isModified && <span className="ml-1.5 text-xs text-violet-600">(modified)</span>}
          </label>
          <span className="text-sm font-medium text-slate-900">{value}</span>
        </div>
        <input
          type="range"
          min={field.min}
          max={field.max}
          step={field.step || 1}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full"
        />
        {field.hint && <p className="text-xs text-slate-400 mt-0.5">{field.hint}</p>}
      </div>
    );
  }

  if (field.type === 'percent-slider') {
    return (
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm text-slate-700">
            {field.label}
            {isModified && <span className="ml-1.5 text-xs text-violet-600">(modified)</span>}
          </label>
          <span className="text-sm font-medium text-slate-900">{Math.round(value * 100)}%</span>
        </div>
        <input
          type="range"
          min={field.min}
          max={field.max}
          step={field.step || 0.01}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full"
        />
        {field.hint && <p className="text-xs text-slate-400 mt-0.5">{field.hint}</p>}
      </div>
    );
  }

  // number input
  return (
    <div className="pt-2">
      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-700 flex-1">
          {field.label}
          {isModified && <span className="ml-1.5 text-xs text-violet-600">(modified)</span>}
        </label>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-28"
          min={field.min}
          max={field.max}
        />
      </div>
      {field.hint && <p className="text-xs text-slate-400 mt-0.5">{field.hint}</p>}
    </div>
  );
}
