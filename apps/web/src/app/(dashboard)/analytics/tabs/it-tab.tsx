'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import {
  Monitor,
  Server,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  Shield,
  Activity,
} from 'lucide-react';
import { AnalyticsData } from '../types';

interface ITTabProps {
  data: AnalyticsData;
  timeRange: string;
}

export function ITTab({ data, timeRange }: ITTabProps) {
  const successRate = data.totalDeployments > 0 
    ? Math.round((data.successfulDeployments / data.totalDeployments) * 100) 
    : 100;

  // Stale sync detection not available without last_sync_at column
  const isGoogleStale = false;
  const isMicrosoftStale = false;

  return (
    <div className="space-y-6">
      {/* IT KPIs */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-white border-blue-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/15 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{successRate}%</p>
                <p className="text-sm text-muted-foreground">Deployment Success</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-white border-emerald-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Activity className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-500">{data.totalDeployments}</p>
                <p className="text-sm text-muted-foreground">Total Deployments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-br ${data.errorRate > 10 ? 'from-red-500/10 border-red-500/20' : 'from-amber-500/10 border-amber-500/20'} to-white`}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${data.errorRate > 10 ? 'bg-red-500/10' : 'bg-amber-500/10'}`}>
                <AlertCircle className={`h-5 w-5 ${data.errorRate > 10 ? 'text-red-600' : 'text-amber-600'}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${data.errorRate > 10 ? 'text-red-600' : 'text-amber-600'}`}>{data.errorRate}%</p>
                <p className="text-sm text-muted-foreground">Error Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-white border-primary/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{data.avgDeploymentTime}s</p>
                <p className="text-sm text-muted-foreground">Avg Deploy Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-blue-600" />
            Integration Status
          </CardTitle>
          <CardDescription>
            Connected email providers and sync status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Google Workspace */}
            <div className={`p-4 border rounded-lg ${isGoogleStale ? 'border-amber-500/20 bg-amber-500/10' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${data.syncStatus.google.connected ? 'bg-emerald-500' : 'bg-muted-foreground/30'}`} />
                  <h4 className="font-medium">Google Workspace</h4>
                </div>
                <Badge variant="outline" className={data.syncStatus.google.connected ? 'border-emerald-500/20 text-emerald-500' : ''}>
                  {data.syncStatus.google.connected ? 'Connected' : 'Not Connected'}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Users Synced</span>
                  <span className="font-medium">{data.syncStatus.google.userCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Connected</span>
                  <span className="font-medium">
                    {data.syncStatus.google.connectedAt 
                      ? new Date(data.syncStatus.google.connectedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Never'}
                  </span>
                </div>
              </div>
              {isGoogleStale && (
                <Link href="/integrations" className="block mt-3">
                  <Button size="sm" variant="outline" className="w-full border-amber-500/20 text-amber-600">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Sync Now
                  </Button>
                </Link>
              )}
            </div>

            {/* Microsoft 365 */}
            <div className={`p-4 border rounded-lg ${isMicrosoftStale ? 'border-amber-500/20 bg-amber-500/10' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${data.syncStatus.microsoft.connected ? 'bg-emerald-500' : 'bg-muted-foreground/30'}`} />
                  <h4 className="font-medium">Microsoft 365</h4>
                </div>
                <Badge variant="outline" className={data.syncStatus.microsoft.connected ? 'border-emerald-500/20 text-emerald-500' : ''}>
                  {data.syncStatus.microsoft.connected ? 'Connected' : 'Not Connected'}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Users Synced</span>
                  <span className="font-medium">{data.syncStatus.microsoft.userCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Connected</span>
                  <span className="font-medium">
                    {data.syncStatus.microsoft.connectedAt 
                      ? new Date(data.syncStatus.microsoft.connectedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Never'}
                  </span>
                </div>
              </div>
              {isMicrosoftStale && (
                <Link href="/integrations" className="block mt-3">
                  <Button size="sm" variant="outline" className="w-full border-amber-500/20 text-amber-600">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Sync Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deployment Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-blue-600" />
            Deployment Health
          </CardTitle>
          <CardDescription>
            System performance and error analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Success/Failure Breakdown */}
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-3">Deployment Results ({timeRange})</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Successful</span>
                  </div>
                  <span className="font-medium text-emerald-500">{data.successfulDeployments}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Failed</span>
                  </div>
                  <span className="font-medium text-red-600">{data.failedDeployments}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="font-medium text-amber-600">{data.pendingDeployments}</span>
                </div>
              </div>
            </div>

            {/* Error Rate Gauge */}
            <div className="p-4 border rounded-lg text-center">
              <h4 className="font-medium mb-3">Error Rate</h4>
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
                data.errorRate > 10 ? 'bg-red-500/10' : data.errorRate > 5 ? 'bg-amber-500/10' : 'bg-emerald-500/10'
              }`}>
                <span className={`text-2xl font-bold ${
                  data.errorRate > 10 ? 'text-red-600' : data.errorRate > 5 ? 'text-amber-600' : 'text-emerald-500'
                }`}>
                  {data.errorRate}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {data.errorRate > 10 ? 'Needs immediate attention' : 
                 data.errorRate > 5 ? 'Monitor closely' : 'Healthy'}
              </p>
            </div>

            {/* Failure Reasons */}
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-3">Failure Reasons</h4>
              {data.failedDeploymentReasons.length === 0 ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="h-8 w-8 mx-auto text-emerald-500 mb-2" />
                  <p className="text-sm text-emerald-500">No failures recorded</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {data.failedDeploymentReasons.map((reason, i) => (
                    <div key={i} className="flex justify-between items-center p-2 bg-red-500/10 rounded">
                      <span className="text-sm text-red-600">{reason.reason}</span>
                      <Badge variant="outline" className="border-red-500/20 text-red-600">
                        {reason.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Recommendations */}
      {(data.errorRate > 5 || isGoogleStale || isMicrosoftStale || data.pendingDeployments > 0) && (
        <Card className="border-blue-500/20 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              System Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.errorRate > 5 && (
                <li className="flex items-start gap-2 text-sm text-blue-600">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                  Error rate is above 5%. Review failed deployments and check API connectivity.
                </li>
              )}
              {(isGoogleStale || isMicrosoftStale) && (
                <li className="flex items-start gap-2 text-sm text-blue-600">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                  One or more integrations haven't synced in over 7 days. Run a manual sync to ensure user data is current.
                </li>
              )}
              {data.pendingDeployments > 0 && (
                <li className="flex items-start gap-2 text-sm text-blue-600">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                  {data.pendingDeployments} deployment{data.pendingDeployments > 1 ? 's are' : ' is'} still pending. Check for stuck jobs.
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
