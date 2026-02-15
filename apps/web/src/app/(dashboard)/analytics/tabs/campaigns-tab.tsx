'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import {
  Target,
  MousePointerClick,
  TrendingUp,
  BarChart3,
  Users,
  Link2,
  Loader2,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { AnalyticsData } from '../types';

interface CampaignsTabProps {
  data: AnalyticsData;
  timeRange: '7d' | '30d' | '90d';
}

interface CampaignRow {
  name: string;
  status: 'active' | 'scheduled' | 'expired' | 'unknown';
  totalClicks: number;
  uniqueClickers: number;
  topLink: string | null;
}

interface ClicksByDay {
  date: string;
  [campaign: string]: string | number;
}

interface UTMBreakdown {
  source: string;
  medium: string;
  count: number;
}

export function CampaignsTab({ data, timeRange }: CampaignsTabProps) {
  const [loading, setLoading] = useState(true);
  const [clicks, setClicks] = useState<any[]>([]);
  const [bannerCampaigns, setBannerCampaigns] = useState<
    { name: string; startDate?: string; endDate?: string }[]
  >([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  useEffect(() => {
    loadCampaignData();
  }, [timeRange]);

  const loadCampaignData = async () => {
    setLoading(true);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) { setLoading(false); return; }

    const orgId = currentUser.organization_id;
    const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);

    // Fetch clicks with campaign data
    const { data: clickData } = await supabase
      .from('signature_clicks')
      .select('id, link_url, link_type, campaign_name, utm_source, utm_medium, utm_campaign, utm_content, user_id, clicked_at')
      .eq('organization_id', orgId)
      .gte('clicked_at', startDate.toISOString())
      .order('clicked_at', { ascending: true });

    setClicks(clickData || []);

    // Fetch templates with banner blocks to derive campaign list
    const { data: templates } = await supabase
      .from('signature_templates')
      .select('id, name, blocks')
      .eq('organization_id', orgId);

    const campaigns: { name: string; startDate?: string; endDate?: string }[] = [];
    templates?.forEach((t) => {
      const blocks = (t.blocks as any[]) || [];
      blocks.forEach((b) => {
        if (b.type === 'banner' && b.content?.campaignName) {
          campaigns.push({
            name: b.content.campaignName,
            startDate: b.content.startDate,
            endDate: b.content.endDate,
          });
        }
      });
    });

    setBannerCampaigns(campaigns);
    setLoading(false);
  };

  // Derive campaign performance data
  const campaignRows = useMemo<CampaignRow[]>(() => {
    const today = new Date().toISOString().split('T')[0];

    // Build map from click data
    const clickMap = new Map<string, { total: number; users: Set<string>; links: Map<string, number> }>();
    clicks.forEach((c) => {
      const name = c.campaign_name || '(no campaign)';
      if (!clickMap.has(name)) {
        clickMap.set(name, { total: 0, users: new Set(), links: new Map() });
      }
      const entry = clickMap.get(name)!;
      entry.total++;
      if (c.user_id) entry.users.add(c.user_id);
      const linkCount = entry.links.get(c.link_url) || 0;
      entry.links.set(c.link_url, linkCount + 1);
    });

    // Merge with banner campaign definitions (so campaigns with 0 clicks still appear)
    const allNames = new Set<string>();
    clickMap.forEach((_, name) => allNames.add(name));
    bannerCampaigns.forEach((c) => allNames.add(c.name));

    // Remove the "(no campaign)" entry if there are real campaigns
    if (allNames.size > 1) allNames.delete('(no campaign)');

    return Array.from(allNames).map((name) => {
      const clickEntry = clickMap.get(name);
      const bannerDef = bannerCampaigns.find((c) => c.name === name);

      let status: CampaignRow['status'] = 'unknown';
      if (bannerDef) {
        if (bannerDef.startDate && today < bannerDef.startDate) status = 'scheduled';
        else if (bannerDef.endDate && today > bannerDef.endDate) status = 'expired';
        else status = 'active';
      }

      let topLink: string | null = null;
      if (clickEntry) {
        let maxCount = 0;
        clickEntry.links.forEach((count, url) => {
          if (count > maxCount) { maxCount = count; topLink = url; }
        });
      }

      return {
        name,
        status,
        totalClicks: clickEntry?.total || 0,
        uniqueClickers: clickEntry?.users.size || 0,
        topLink,
      };
    }).sort((a, b) => b.totalClicks - a.totalClicks);
  }, [clicks, bannerCampaigns]);

  // KPI metrics
  const totalActiveCampaigns = campaignRows.filter((c) => c.status === 'active').length;
  const totalClicks = clicks.length;
  const topCampaign = campaignRows[0];
  const avgClicksPerCampaign = campaignRows.length > 0
    ? Math.round(totalClicks / campaignRows.length)
    : 0;

  // Clicks over time chart data
  const chartData = useMemo<ClicksByDay[]>(() => {
    const campaignNames = [...new Set(clicks.map((c) => c.campaign_name || '(no campaign)'))];
    const dayMap = new Map<string, Record<string, number>>();

    clicks.forEach((c) => {
      const date = new Date(c.clicked_at).toISOString().split('T')[0];
      if (!dayMap.has(date)) {
        const entry: Record<string, number> = {};
        campaignNames.forEach((n) => (entry[n] = 0));
        dayMap.set(date, entry);
      }
      const name = c.campaign_name || '(no campaign)';
      dayMap.get(date)![name] = (dayMap.get(date)![name] || 0) + 1;
    });

    return Array.from(dayMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, counts]) => ({ date, ...counts }));
  }, [clicks]);

  const campaignNames = useMemo(
    () => [...new Set(clicks.map((c) => c.campaign_name || '(no campaign)'))],
    [clicks]
  );

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

  // UTM breakdown for selected campaign
  const utmBreakdown = useMemo<UTMBreakdown[]>(() => {
    if (!selectedCampaign) return [];
    const filtered = clicks.filter(
      (c) => (c.campaign_name || '(no campaign)') === selectedCampaign
    );
    const map = new Map<string, number>();
    filtered.forEach((c) => {
      const key = `${c.utm_source || '(none)'} / ${c.utm_medium || '(none)'}`;
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([key, count]) => {
        const [source, medium] = key.split(' / ');
        return { source, medium, count };
      })
      .sort((a, b) => b.count - a.count);
  }, [clicks, selectedCampaign]);

  const statusBadge = (status: CampaignRow['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10">Active</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500/15 text-blue-500 hover:bg-blue-500/15">Scheduled</Badge>;
      case 'expired':
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/10">Expired</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/10 to-white border-primary/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{totalActiveCampaigns}</p>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-white border-blue-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/15 rounded-lg">
                <MousePointerClick className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{totalClicks}</p>
                <p className="text-sm text-muted-foreground">Total Clicks Tracked</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-white border-emerald-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">
                  {topCampaign?.name || '-'}
                </p>
                <p className="text-sm text-muted-foreground">Top Campaign</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-white border-amber-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{avgClicksPerCampaign}</p>
                <p className="text-sm text-muted-foreground">Avg Clicks / Campaign</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Campaign Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {campaignRows.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No campaigns found</p>
              <p className="text-sm mt-1">Create banner blocks with campaign names to start tracking</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium">Campaign</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Total Clicks</th>
                    <th className="pb-3 font-medium text-right">Unique Clickers</th>
                    <th className="pb-3 font-medium">Top Link</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignRows.map((row) => (
                    <tr
                      key={row.name}
                      className={`border-b last:border-0 cursor-pointer transition-colors ${
                        selectedCampaign === row.name
                          ? 'bg-primary/10'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() =>
                        setSelectedCampaign(
                          selectedCampaign === row.name ? null : row.name
                        )
                      }
                    >
                      <td className="py-3 font-medium">{row.name}</td>
                      <td className="py-3">{statusBadge(row.status)}</td>
                      <td className="py-3 text-right">{row.totalClicks}</td>
                      <td className="py-3 text-right">
                        <span className="flex items-center justify-end gap-1">
                          <Users className="h-3.5 w-3.5 text-muted-foreground" />
                          {row.uniqueClickers}
                        </span>
                      </td>
                      <td className="py-3 max-w-[200px] truncate text-muted-foreground text-xs">
                        {row.topLink ? (
                          <span className="flex items-center gap-1">
                            <Link2 className="h-3 w-3 flex-shrink-0" />
                            {(() => {
                              try { return new URL(row.topLink).hostname; } catch { return row.topLink; }
                            })()}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Clicks Over Time Chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Clicks Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(d) => {
                      const date = new Date(d + 'T00:00:00');
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip
                    labelFormatter={(d) => {
                      const date = new Date(d + 'T00:00:00');
                      return date.toLocaleDateString();
                    }}
                  />
                  <Legend />
                  {campaignNames.map((name, i) => (
                    <Line
                      key={name}
                      type="monotone"
                      dataKey={name}
                      stroke={COLORS[i % COLORS.length]}
                      strokeWidth={2}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* UTM Breakdown for Selected Campaign */}
      {selectedCampaign && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              UTM Breakdown: {selectedCampaign}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {utmBreakdown.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">
                No UTM data for this campaign
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Source</th>
                      <th className="pb-3 font-medium">Medium</th>
                      <th className="pb-3 font-medium text-right">Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {utmBreakdown.map((row, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-2">{row.source}</td>
                        <td className="py-2">{row.medium}</td>
                        <td className="py-2 text-right font-medium">{row.count}</td>
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
