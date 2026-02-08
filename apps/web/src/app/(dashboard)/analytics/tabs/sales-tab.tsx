'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BarChart3,
  Briefcase,
} from 'lucide-react';
import { AnalyticsData, EmployeeSignatureStatus } from '../types';

interface SalesTabProps {
  data: AnalyticsData;
  employeeData: EmployeeSignatureStatus[];
}

export function SalesTab({ data, employeeData }: SalesTabProps) {
  // Filter sales department employees
  const salesEmployees = employeeData.filter(e => 
    e.department.toLowerCase().includes('sales') || 
    e.department.toLowerCase().includes('business development') ||
    e.department.toLowerCase().includes('account')
  );
  
  const salesDeployed = salesEmployees.filter(e => e.hasSignature).length;
  const salesTotal = salesEmployees.length;
  const salesAdoption = salesTotal > 0 ? Math.round((salesDeployed / salesTotal) * 100) : 0;

  // Get templates used by sales team
  const salesTemplates = new Map<string, number>();
  salesEmployees.forEach(e => {
    if (e.templateName) {
      salesTemplates.set(e.templateName, (salesTemplates.get(e.templateName) || 0) + 1);
    }
  });

  const templateUsage = Array.from(salesTemplates.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-6">
      {/* Sales KPIs */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-700">{salesAdoption}%</p>
                <p className="text-sm text-muted-foreground">Sales Team Adoption</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">{salesDeployed}</p>
                <p className="text-sm text-muted-foreground">Reps with Signatures</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Target className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-700">{salesTotal - salesDeployed}</p>
                <p className="text-sm text-muted-foreground">Pending Deployment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-50 to-white border-violet-100">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <Briefcase className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-violet-700">{templateUsage.length}</p>
                <p className="text-sm text-muted-foreground">Templates in Use</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Coverage Alert */}
      {salesTotal - salesDeployed > 0 && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Target className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900">Sales Coverage Gap</h4>
                  <p className="text-sm text-amber-700">
                    {salesTotal - salesDeployed} sales team member{salesTotal - salesDeployed > 1 ? 's' : ''} don't have professional signatures yet
                  </p>
                </div>
              </div>
              <Link href="/deployments">
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Deploy Now
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Template Usage by Sales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-600" />
            Template Usage by Sales Team
          </CardTitle>
          <CardDescription>
            Which signature templates your sales reps are using
          </CardDescription>
        </CardHeader>
        <CardContent>
          {templateUsage.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No templates deployed to sales team yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {templateUsage.map((template, index) => (
                <div key={template.name} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-8 text-muted-foreground">#{index + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{template.name}</span>
                      <span className="text-sm text-muted-foreground">{template.count} users</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 bg-emerald-500 rounded-full"
                        style={{ width: `${(template.count / salesDeployed) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sales Team Member List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-600" />
                Sales Team Signature Status
              </CardTitle>
              <CardDescription>
                Individual sales rep signature deployment status
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {salesEmployees.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No sales team members found.</p>
              <p className="text-sm mt-1">Users with "Sales", "Business Development", or "Account" department will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden sm:table-cell">Role</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden md:table-cell">Template</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden lg:table-cell">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {salesEmployees.map((employee) => (
                    <tr key={employee.email} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-medium text-sm">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2 hidden sm:table-cell">
                        <span className="text-sm">{employee.department}</span>
                      </td>
                      <td className="py-3 px-2">
                        {employee.hasSignature ? (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-amber-600 border-amber-200">
                            <XCircle className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-2 hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {employee.templateName || '—'}
                        </span>
                      </td>
                      <td className="py-3 px-2 hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {employee.lastDeployedAt 
                            ? new Date(employee.lastDeployedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })
                            : '—'}
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
    </div>
  );
}
