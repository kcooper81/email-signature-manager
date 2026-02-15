'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import {
  MousePointerClick,
  Eye,
  TrendingUp,
  BarChart3,
  Building2,
  ExternalLink,
  Calendar,
  Loader2,
} from 'lucide-react';

interface ClickEntry {
  id: string;
  signatureId: string;
  linkUrl: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  organizationId: string;
  orgName: string;
}

interface OrgPerformance {
  orgId: string;
  orgName: string;
  clickCount: number;
  impressionCount: number;
  clickRate: number;
}

interface AnalyticsMetrics {
  totalClicks: number;
  totalImpressions: number;
  clickRate: number;
  uniqueOrgs: number;
}

type TimeRange = '7d' | '30d' | '90d' | 'all';
type ActiveTab = 'top-orgs' | 'recent-clicks';

const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
  'all': 'All time',
};

function getDateFromRange(range: TimeRange): string | null {
  if (range === 'all') return null;
  const now = new Date();
  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  now.setDate(now.getDate() - days);
  now.setHours(0, 0, 0, 0);
  return now.toISOString();
}

export default function SignatureAnalyticsPage() {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [topOrgs, setTopOrgs] = useState<OrgPerformance[]>([]);
  const [recentClicks, setRecentClicks] = useState<ClickEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [activeTab, setActiveTab] = useState<ActiveTab>('top-orgs');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    const supabase = createClient();
    const dateFilter = getDateFromRange(timeRange);

    // Fetch clicks
    let clicksQuery = supabase
      .from('signature_clicks')
      .select('id, signature_id, link_url, utm_source, utm_medium, utm_campaign, ip_address, user_agent, created_at, organization_id');

    if (dateFilter) {
      clicksQuery = clicksQuery.gte('created_at', dateFilter);
    }

    const { data: clicksData } = await clicksQuery.order('created_at', { ascending: false });

    // Fetch impressions
    let impressionsQuery = supabase
      .from('signature_impressions')
      .select('id, signature_id, created_at, organization_id');

    if (dateFilter) {
      impressionsQuery = impressionsQuery.gte('created_at', dateFilter);
    }

    const { data: impressionsData } = await impressionsQuery;

    const clicks = clicksData || [];
    const impressions = impressionsData || [];

    // Gather unique org IDs from both tables
    const orgIdSet = new Set<string>();
    clicks.forEach(c => orgIdSet.add(c.organization_id));
    impressions.forEach(i => orgIdSet.add(i.organization_id));
    const orgIds = [...orgIdSet];

    // Fetch org names
    let orgMap = new Map<string, string>();
    if (orgIds.length > 0) {
      const { data: orgs } = await supabase
        .from('organizations')
        .select('id, name')
        .in('id', orgIds);

      orgMap = new Map(orgs?.map(o => [o.id, o.name]) || []);
    }

    // Calculate metrics
    const totalClicks = clicks.length;
    const totalImpressions = impressions.length;
    const clickRate = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const uniqueOrgs = orgIds.length;

    setMetrics({
      totalClicks,
      totalImpressions,
      clickRate,
      uniqueOrgs,
    });

    // Build per-org click and impression counts
    const clicksByOrg = new Map<string, number>();
    clicks.forEach(c => {
      clicksByOrg.set(c.organization_id, (clicksByOrg.get(c.organization_id) || 0) + 1);
    });

    const impressionsByOrg = new Map<string, number>();
    impressions.forEach(i => {
      impressionsByOrg.set(i.organization_id, (impressionsByOrg.get(i.organization_id) || 0) + 1);
    });

    // Top 10 orgs by click count
    const orgPerformance: OrgPerformance[] = orgIds
      .map(orgId => {
        const orgClicks = clicksByOrg.get(orgId) || 0;
        const orgImpressions = impressionsByOrg.get(orgId) || 0;
        return {
          orgId,
          orgName: orgMap.get(orgId) || 'Unknown',
          clickCount: orgClicks,
          impressionCount: orgImpressions,
          clickRate: orgImpressions > 0 ? (orgClicks / orgImpressions) * 100 : 0,
        };
      })
      .sort((a, b) => b.clickCount - a.clickCount)
      .slice(0, 10);

    setTopOrgs(orgPerformance);

    // Recent 50 clicks
    const recent: ClickEntry[] = clicks.slice(0, 50).map(c => ({
      id: c.id,
      signatureId: c.signature_id,
      linkUrl: c.link_url,
      utmSource: c.utm_source,
      utmMedium: c.utm_medium,
      utmCampaign: c.utm_campaign,
      ipAddress: c.ip_address,
      userAgent: c.user_agent,
      createdAt: c.created_at,
      organizationId: c.organization_id,
      orgName: orgMap.get(c.organization_id) || 'Unknown',
    }));

    setRecentClicks(recent);
    setLoading(false);
  };

  if (loading) {
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
          <h1 className="text-2xl font-bold text-slate-900">Signature Analytics</h1>
          <p className="text-slate-500">Platform-wide signature click and impression tracking</p>
        </div>
      </div>

      {/* Time Range Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-500">Time range:</span>
            <div className="flex gap-2">
              {(Object.keys(TIME_RANGE_LABELS) as TimeRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    timeRange === range
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {TIME_RANGE_LABELS[range]}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MousePointerClick className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.totalClicks.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Total Clicks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <Eye className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.totalImpressions.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Total Impressions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.clickRate.toFixed(2)}%</p>
                <p className="text-xs text-slate-500">Click Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Building2 className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics?.uniqueOrgs.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Active Organizations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('top-orgs')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'top-orgs'
              ? 'border-violet-600 text-violet-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <BarChart3 className="h-4 w-4 inline mr-2" />
          Top Organizations
        </button>
        <button
          onClick={() => setActiveTab('recent-clicks')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'recent-clicks'
              ? 'border-violet-600 text-violet-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <MousePointerClick className="h-4 w-4 inline mr-2" />
          Recent Clicks ({recentClicks.length})
        </button>
      </div>

      {/* Top Organizations Tab */}
      {activeTab === 'top-orgs' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Performing Organizations
            </CardTitle>
            <CardDescription>
              Top 10 organizations by click count
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topOrgs.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                No signature activity found for this time period.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium text-slate-500">#</th>
                      <th className="pb-3 font-medium text-slate-500">Organization</th>
                      <th className="pb-3 font-medium text-slate-500">Clicks</th>
                      <th className="pb-3 font-medium text-slate-500">Impressions</th>
                      <th className="pb-3 font-medium text-slate-500">Click Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {topOrgs.map((org, index) => (
                      <tr key={org.orgId} className="hover:bg-slate-50">
                        <td className="py-3 text-slate-400 font-medium">
                          {index + 1}
                        </td>
                        <td className="py-3">
                          <a
                            href={`/admin/accounts/${org.orgId}`}
                            className="font-medium text-blue-600 hover:underline flex items-center gap-1"
                          >
                            {org.orgName}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </td>
                        <td className="py-3 font-medium text-slate-900">
                          {org.clickCount.toLocaleString()}
                        </td>
                        <td className="py-3 text-slate-600">
                          {org.impressionCount.toLocaleString()}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            org.clickRate >= 5
                              ? 'bg-green-100 text-green-700'
                              : org.clickRate >= 2
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {org.clickRate.toFixed(2)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recent Clicks Tab */}
      {activeTab === 'recent-clicks' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointerClick className="h-5 w-5" />
              Recent Clicks
            </CardTitle>
            <CardDescription>
              Last 50 signature link clicks
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentClicks.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                No clicks recorded for this time period.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium text-slate-500">Timestamp</th>
                      <th className="pb-3 font-medium text-slate-500">Organization</th>
                      <th className="pb-3 font-medium text-slate-500">Link URL</th>
                      <th className="pb-3 font-medium text-slate-500">UTM Source</th>
                      <th className="pb-3 font-medium text-slate-500">UTM Medium</th>
                      <th className="pb-3 font-medium text-slate-500">UTM Campaign</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentClicks.map((click) => (
                      <tr key={click.id} className="hover:bg-slate-50">
                        <td className="py-3 text-slate-500 whitespace-nowrap">
                          {new Date(click.createdAt).toLocaleString()}
                        </td>
                        <td className="py-3">
                          <a
                            href={`/admin/accounts/${click.organizationId}`}
                            className="text-blue-600 hover:underline"
                          >
                            {click.orgName}
                          </a>
                        </td>
                        <td className="py-3">
                          <a
                            href={click.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1 max-w-[300px] truncate"
                          >
                            {click.linkUrl}
                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                          </a>
                        </td>
                        <td className="py-3 text-slate-600">
                          {click.utmSource || <span className="text-slate-300">-</span>}
                        </td>
                        <td className="py-3 text-slate-600">
                          {click.utmMedium || <span className="text-slate-300">-</span>}
                        </td>
                        <td className="py-3 text-slate-600">
                          {click.utmCampaign || <span className="text-slate-300">-</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
