'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import {
  Target,
  Rocket,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  Zap,
  Users,
  CheckCircle2,
  FileSignature,
  Shield,
} from 'lucide-react';
import { AnalyticsData } from '../types';

interface OverviewTabProps {
  data: AnalyticsData;
}

export function OverviewTab({ data }: OverviewTabProps) {
  const successRate = data.totalDeployments 
    ? Math.round((data.successfulDeployments / data.totalDeployments) * 100) 
    : 0;

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500 bg-emerald-500/10';
    if (score >= 60) return 'text-amber-600 bg-amber-500/10';
    return 'text-red-600 bg-red-500/10';
  };

  const getAdoptionColor = (rate: number) => {
    if (rate >= 80) return 'bg-emerald-500';
    if (rate >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Health Score & Key Metrics Row */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
        {/* Health Score */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${getHealthColor(data.healthScore)}`}>
                <span className="text-xl sm:text-2xl font-bold">{data.healthScore}</span>
              </div>
              <p className="mt-2 font-semibold">Health Score</p>
              <p className="text-xs text-muted-foreground mt-1">
                {data.healthScore >= 80 ? 'Excellent' : data.healthScore >= 60 ? 'Good' : 'Needs Attention'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Team Adoption */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Team Adoption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold">{data.adoptionRate}%</span>
              {data.adoptionChange !== 0 && (
                <span className={`text-sm flex items-center ${data.adoptionChange > 0 ? 'text-emerald-500' : 'text-red-600'}`}>
                  {data.adoptionChange > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(data.adoptionChange)}%
                </span>
              )}
            </div>
            <div className="mt-3 w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${getAdoptionColor(data.adoptionRate)}`}
                style={{ width: `${data.adoptionRate}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {data.usersWithSignatures} of {data.totalUsers} users have signatures deployed
            </p>
          </CardContent>
        </Card>

        {/* Deployment Activity */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Rocket className="h-4 w-4 text-primary" />
              Deployment Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold">{data.totalDeployments}</span>
              {data.deploymentsChange !== 0 && (
                <span className={`text-sm flex items-center ${data.deploymentsChange > 0 ? 'text-emerald-500' : 'text-red-600'}`}>
                  {data.deploymentsChange > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(data.deploymentsChange)}% vs prev
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-3">
              <div className="text-center p-2 bg-emerald-500/10 rounded">
                <p className="text-lg font-semibold text-emerald-500">{data.successfulDeployments}</p>
                <p className="text-xs text-emerald-500">Successful</p>
              </div>
              <div className="text-center p-2 bg-red-500/10 rounded">
                <p className="text-lg font-semibold text-red-600">{data.failedDeployments}</p>
                <p className="text-xs text-red-600">Failed</p>
              </div>
              <div className="text-center p-2 bg-amber-500/10 rounded">
                <p className="text-lg font-semibold text-amber-600">{data.pendingDeployments}</p>
                <p className="text-xs text-amber-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actionable Insights */}
      {data.complianceIssues > 0 && (
        <Card className="border-amber-500/20 bg-amber-500/10">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-amber-600">Recommendations</h4>
                <ul className="mt-2 space-y-1 text-sm text-amber-600">
                  {data.totalUsers - data.usersWithSignatures > 0 && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                      {data.totalUsers - data.usersWithSignatures} team members don't have signatures deployed yet
                    </li>
                  )}
                  {data.failedDeployments > 0 && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                      {data.failedDeployments} failed deployments need attention
                    </li>
                  )}
                  {data.adoptionRate < 50 && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                      Consider running a company-wide deployment to improve adoption
                    </li>
                  )}
                </ul>
              </div>
              <Link href="/deployments">
                <Button size="sm" variant="outline" className="border-amber-500/20 text-amber-600 hover:bg-amber-500/10">
                  <Zap className="h-4 w-4 mr-1" />
                  Deploy Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">{data.totalUsers}</p>
                <p className="text-xs text-muted-foreground">Total Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">{data.usersWithSignatures}</p>
                <p className="text-xs text-muted-foreground">With Signatures</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/15 rounded-lg">
                <FileSignature className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">{data.totalTemplates}</p>
                <p className="text-xs text-muted-foreground">Active Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Shield className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">{successRate}%</p>
                <p className="text-xs text-muted-foreground">Deployment Success</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
