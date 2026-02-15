'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import {
  Monitor,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  UserPlus,
  Megaphone,
  Image,
  MousePointerClick,
  Link2,
  Activity,
  Target,
} from 'lucide-react';
import { AnalyticsData } from '../types';

interface OperationsTabProps {
  data: AnalyticsData;
  timeRange: string;
}

export function OperationsTab({ data, timeRange }: OperationsTabProps) {
  return (
    <div className="space-y-6">
      {/* IT Operations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-blue-600" />
            IT Operations
          </CardTitle>
          <CardDescription>
            System health and integration status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Sync Status */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Integration Status</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${data.syncStatus.google.connected ? 'bg-emerald-500' : 'bg-muted-foreground/30'}`} />
                    <span className="text-sm">Google Workspace</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{data.syncStatus.google.userCount} users</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${data.syncStatus.microsoft.connected ? 'bg-emerald-500' : 'bg-muted-foreground/30'}`} />
                    <span className="text-sm">Microsoft 365</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{data.syncStatus.microsoft.userCount} users</span>
                </div>
              </div>
            </div>

            {/* Error Rate */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className={`text-2xl font-bold ${data.errorRate > 10 ? 'text-red-600' : data.errorRate > 5 ? 'text-amber-600' : 'text-emerald-500'}`}>
                {data.errorRate}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Error Rate</p>
              {data.errorRate > 10 && (
                <Badge variant="outline" className="mt-2 border-red-500/20 text-red-600">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Needs attention
                </Badge>
              )}
            </div>

            {/* Avg Deployment Time */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {data.avgDeploymentTime}s
              </div>
              <p className="text-xs text-muted-foreground mt-1">Avg Deploy Time</p>
            </div>

            {/* Failed Reasons */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Failure Reasons</h4>
              {data.failedDeploymentReasons.length === 0 ? (
                <p className="text-xs text-muted-foreground p-2 bg-emerald-500/10 rounded-lg text-center">
                  <CheckCircle2 className="h-4 w-4 inline mr-1 text-emerald-500" />
                  No failures
                </p>
              ) : (
                <div className="space-y-1">
                  {data.failedDeploymentReasons.slice(0, 3).map((reason, i) => (
                    <div key={i} className="flex justify-between text-xs p-2 bg-red-500/10 rounded">
                      <span className="text-red-600">{reason.reason}</span>
                      <span className="font-medium text-red-600">{reason.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HR & People Operations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-emerald-500" />
            HR & People Operations
          </CardTitle>
          <CardDescription>
            Employee adoption and onboarding metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* New Users */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-1">
                <UserPlus className="h-5 w-5 text-emerald-500" />
                <span className="text-2xl font-bold">{data.newUsersThisPeriod}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">New Users ({timeRange})</p>
            </div>

            {/* Users Without Signatures */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className={`text-2xl font-bold ${data.usersWithoutSignatures > 10 ? 'text-amber-600' : 'text-emerald-500'}`}>
                {data.usersWithoutSignatures}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Without Signatures</p>
              {data.usersWithoutSignatures > 0 && (
                <Link href="/team">
                  <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-1">
                    View list →
                  </Button>
                </Link>
              )}
            </div>

            {/* Department Coverage */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className={`text-2xl font-bold ${data.departmentCoverage >= 80 ? 'text-emerald-500' : data.departmentCoverage >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                {data.departmentCoverage}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Dept Coverage (&gt;50%)</p>
            </div>

            {/* Onboarding Pending */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className={`text-2xl font-bold ${data.onboardingPending > 5 ? 'text-amber-600' : 'text-emerald-500'}`}>
                {data.onboardingPending}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Onboarding Pending</p>
              <p className="text-xs text-muted-foreground">New users without signatures</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketing & Branding */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-pink-600" />
            Marketing & Branding
          </CardTitle>
          <CardDescription>
            Campaign elements and brand consistency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Banners */}
            <div className="text-center p-4 bg-gradient-to-br from-pink-500/10 to-white rounded-lg border border-pink-500/20">
              <Image className="h-6 w-6 mx-auto text-pink-600 mb-2" />
              <div className="text-2xl font-bold text-pink-600">{data.bannersDeployed}</div>
              <p className="text-xs text-muted-foreground mt-1">Banners in Use</p>
              <p className="text-xs text-pink-600">{data.templatesWithBanners} templates</p>
            </div>

            {/* CTA Buttons */}
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-white rounded-lg border border-primary/30">
              <MousePointerClick className="h-6 w-6 mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold text-primary">{data.ctaButtonsDeployed}</div>
              <p className="text-xs text-muted-foreground mt-1">CTA Buttons</p>
            </div>

            {/* Social Links */}
            <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-white rounded-lg border border-blue-500/20">
              <Link2 className="h-6 w-6 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">{data.socialLinksDeployed}</div>
              <p className="text-xs text-muted-foreground mt-1">Social Links</p>
            </div>

            {/* Avg Social per Signature */}
            <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-white rounded-lg border border-cyan-100">
              <Activity className="h-6 w-6 mx-auto text-cyan-600 mb-2" />
              <div className="text-2xl font-bold text-cyan-600">{data.avgSocialLinksPerSignature}</div>
              <p className="text-xs text-muted-foreground mt-1">Avg Social/Template</p>
            </div>

            {/* Brand Consistency Score */}
            <div className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-white rounded-lg border border-emerald-500/20">
              <Target className="h-6 w-6 mx-auto text-emerald-500 mb-2" />
              <div className="text-2xl font-bold text-emerald-500">
                {data.totalTemplates ? Math.round((data.templatesWithBanners / data.totalTemplates) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Templates w/ Branding</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
