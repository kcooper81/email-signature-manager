'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import {
  UserCheck,
  UserPlus,
  Users,
  Building2,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { AnalyticsData, EmployeeSignatureStatus } from '../types';

interface HRTabProps {
  data: AnalyticsData;
  employeeData: EmployeeSignatureStatus[];
  timeRange: string;
}

export function HRTab({ data, employeeData, timeRange }: HRTabProps) {
  // Calculate onboarding metrics
  const pendingOnboarding = employeeData.filter(e => !e.hasSignature);
  const recentlyDeployed = employeeData.filter(e => {
    if (!e.lastDeployedAt) return false;
    const deployDate = new Date(e.lastDeployedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return deployDate >= weekAgo;
  });

  // Group by department for coverage analysis
  const deptCoverage = new Map<string, { total: number; deployed: number }>();
  employeeData.forEach(e => {
    const dept = e.department;
    if (!deptCoverage.has(dept)) {
      deptCoverage.set(dept, { total: 0, deployed: 0 });
    }
    deptCoverage.get(dept)!.total++;
    if (e.hasSignature) {
      deptCoverage.get(dept)!.deployed++;
    }
  });

  const departmentData = Array.from(deptCoverage.entries())
    .map(([name, stats]) => ({
      name,
      total: stats.total,
      deployed: stats.deployed,
      rate: stats.total > 0 ? Math.round((stats.deployed / stats.total) * 100) : 0,
    }))
    .sort((a, b) => a.rate - b.rate); // Sort by lowest adoption first for HR attention

  const lowAdoptionDepts = departmentData.filter(d => d.rate < 50);

  return (
    <div className="space-y-6">
      {/* HR KPIs */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700">{data.adoptionRate}%</p>
                <p className="text-sm text-muted-foreground">Overall Adoption</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">{data.newUsersThisPeriod}</p>
                <p className="text-sm text-muted-foreground">New Hires ({timeRange})</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-700">{data.onboardingPending}</p>
                <p className="text-sm text-muted-foreground">Onboarding Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-50 to-white border-violet-100">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <Building2 className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-violet-700">{data.departmentCoverage}%</p>
                <p className="text-sm text-muted-foreground">Dept Coverage (&gt;50%)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Adoption Alert */}
      {lowAdoptionDepts.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-amber-900">Departments Needing Attention</h4>
                <p className="text-sm text-amber-700 mt-1">
                  {lowAdoptionDepts.length} department{lowAdoptionDepts.length > 1 ? 's have' : ' has'} less than 50% signature adoption:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {lowAdoptionDepts.slice(0, 5).map(dept => (
                    <Badge key={dept.name} variant="outline" className="border-amber-300 text-amber-700">
                      {dept.name} ({dept.rate}%)
                    </Badge>
                  ))}
                  {lowAdoptionDepts.length > 5 && (
                    <Badge variant="outline" className="border-amber-300 text-amber-700">
                      +{lowAdoptionDepts.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
              <Link href="/deployments">
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  Deploy Signatures
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Department Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-green-600" />
            Department Adoption Breakdown
          </CardTitle>
          <CardDescription>
            Signature coverage by department - focus on lowest adoption first
          </CardDescription>
        </CardHeader>
        <CardContent>
          {departmentData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No department data available.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {departmentData.map((dept) => (
                <div key={dept.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{dept.name}</span>
                      {dept.rate < 50 && (
                        <Badge variant="outline" className="text-amber-600 border-amber-200 text-xs">
                          Low
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {dept.deployed}/{dept.total} ({dept.rate}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        dept.rate >= 80 ? 'bg-green-500' :
                        dept.rate >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${dept.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Employees Pending Onboarding */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-green-600" />
                Employees Without Signatures
              </CardTitle>
              <CardDescription>
                {pendingOnboarding.length} team member{pendingOnboarding.length !== 1 ? 's' : ''} need signature deployment
              </CardDescription>
            </div>
            {pendingOnboarding.length > 0 && (
              <Link href="/deployments">
                <Button size="sm">
                  Deploy All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {pendingOnboarding.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <p className="font-medium text-green-700">All employees have signatures!</p>
              <p className="text-sm text-muted-foreground mt-1">Great job maintaining 100% coverage.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Employee</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Department</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden md:table-cell">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingOnboarding.slice(0, 20).map((employee) => (
                    <tr key={employee.email} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-medium text-sm">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-sm">{employee.department}</span>
                      </td>
                      <td className="py-3 px-2 hidden md:table-cell">
                        <Badge variant="outline" className="text-amber-600 border-amber-200">
                          <XCircle className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {pendingOnboarding.length > 20 && (
                <p className="text-center text-sm text-muted-foreground py-4">
                  +{pendingOnboarding.length - 20} more employees pending
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recently Onboarded */}
      {recentlyDeployed.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Recently Deployed (Last 7 Days)
            </CardTitle>
            <CardDescription>
              {recentlyDeployed.length} employee{recentlyDeployed.length !== 1 ? 's' : ''} received signatures this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentlyDeployed.slice(0, 10).map((employee) => (
                <div 
                  key={employee.email}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">{employee.name}</p>
                      <p className="text-xs text-muted-foreground">{employee.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{employee.templateName}</p>
                    <p className="text-xs text-muted-foreground">
                      {employee.lastDeployedAt && new Date(employee.lastDeployedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
