'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import {
  FileSignature,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
} from 'lucide-react';
import { AnalyticsData } from '../types';

interface TemplatesTabProps {
  data: AnalyticsData;
}

export function TemplatesTab({ data }: TemplatesTabProps) {
  const maxUsersDeployed = Math.max(...data.templatePerformance.map(t => t.usersDeployed), 1);

  return (
    <div className="space-y-6">
      {/* Template Stats Summary */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <FileSignature className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data.totalTemplates}</p>
                <p className="text-sm text-muted-foreground">Total Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {data.topTemplate?.successRate || 0}%
                </p>
                <p className="text-sm text-muted-foreground">Top Template Success</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {data.templatePerformance.reduce((sum, t) => sum + t.usersDeployed, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Users Deployed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Performance Comparison */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-violet-600" />
                Template Performance Comparison
              </CardTitle>
              <CardDescription>
                Compare deployment reach and success rates across templates
              </CardDescription>
            </div>
            <Link href="/templates">
              <Button variant="outline" size="sm">Manage Templates</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {data.templatePerformance.length === 0 ? (
            <div className="text-center py-12">
              <FileSignature className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No templates yet.</p>
              <Link href="/templates/new">
                <Button className="mt-4">Create Your First Template</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Visual Bar Comparison */}
              <div className="space-y-4">
                {data.templatePerformance.map((template, index) => (
                  <div key={template.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {index === 0 && (
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200">Top</Badge>
                        )}
                        <span className="font-medium">{template.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          {template.usersDeployed} users
                        </span>
                        <span className={`font-medium ${
                          template.successRate >= 90 ? 'text-green-600' : 
                          template.successRate >= 70 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {template.successRate}% success
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                        <div 
                          className="h-full bg-violet-500 rounded-full transition-all"
                          style={{ width: `${(template.usersDeployed / maxUsersDeployed) * 100}%` }}
                        />
                      </div>
                      <div className="w-20 bg-muted rounded-full h-4 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            template.successRate >= 90 ? 'bg-green-500' : 
                            template.successRate >= 70 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${template.successRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 text-xs text-muted-foreground pt-4 border-t">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-violet-500 rounded" /> Users Deployed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-500 rounded" /> Success Rate
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Template Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.templatePerformance.map((template, index) => (
          <Card key={template.id} className={index === 0 ? 'border-amber-200 bg-amber-50/30' : ''}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{template.name}</CardTitle>
                {index === 0 && (
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                    Most Used
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">{template.deploymentCount}</p>
                  <p className="text-xs text-muted-foreground">Deployments</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{template.usersDeployed}</p>
                  <p className="text-xs text-muted-foreground">Users</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className={`font-medium ${
                    template.successRate >= 90 ? 'text-green-600' : 
                    template.successRate >= 70 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {template.successRate}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      template.successRate >= 90 ? 'bg-green-500' : 
                      template.successRate >= 70 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${template.successRate}%` }}
                  />
                </div>
              </div>

              {template.lastDeployed && (
                <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Last deployed {new Date(template.lastDeployed).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
