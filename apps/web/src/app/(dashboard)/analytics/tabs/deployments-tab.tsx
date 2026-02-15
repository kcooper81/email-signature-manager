'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import {
  BarChart3,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { AnalyticsData } from '../types';

interface DeploymentsTabProps {
  data: AnalyticsData;
}

export function DeploymentsTab({ data }: DeploymentsTabProps) {
  const maxDeployments = Math.max(...(data.deploymentsByDay.map(d => d.count) || [1]), 1);
  const maxUsers = Math.max(...(data.deploymentsByDay.map(d => d.users) || [1]), 1);

  return (
    <div className="space-y-6">
      {/* Deployment Stats Summary */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{data.totalDeployments}</p>
              <p className="text-sm text-muted-foreground">Total Deployments</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-500">{data.successfulDeployments}</p>
              <p className="text-sm text-muted-foreground">Successful</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{data.failedDeployments}</p>
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-600">{data.pendingDeployments}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deployment Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Deployment Trend
          </CardTitle>
          <CardDescription>
            Deployments and users affected over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex items-end gap-1">
            {data.deploymentsByDay.slice(-30).map((day) => (
              <div
                key={day.date}
                className="flex-1 flex flex-col justify-end relative group"
              >
                <div 
                  className="bg-primary/20 rounded-t"
                  style={{ height: `${Math.max((day.users / maxUsers) * 100, 2)}%` }}
                />
                <div 
                  className="bg-primary rounded-t -mt-1"
                  style={{ height: `${Math.max((day.count / maxDeployments) * 60, 2)}%` }}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border z-10">
                  <strong>{day.count}</strong> deployment{day.count !== 1 ? 's' : ''}<br />
                  <strong>{day.users}</strong> users affected<br />
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{data.deploymentsByDay[0]?.date ? new Date(data.deploymentsByDay[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary rounded" /> Deployments</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary/20 rounded" /> Users</span>
            </div>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Deployments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest signature deployments
              </CardDescription>
            </div>
            <Link href="/deployments">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {data.recentDeployments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No deployments yet. Deploy your first signature!
            </p>
          ) : (
            <div className="space-y-3">
              {data.recentDeployments.map((deployment) => (
                <div
                  key={deployment.id}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  {deployment.status === 'completed' ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  ) : deployment.status === 'failed' ? (
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  ) : (
                    <Clock className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {deployment.template?.name || 'Unknown Template'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {deployment.successful_count}/{deployment.total_users} users • {new Date(deployment.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      deployment.status === 'completed' ? 'border-emerald-500/20 text-emerald-500' :
                      deployment.status === 'failed' ? 'border-red-500/20 text-red-600' :
                      'border-amber-500/20 text-amber-600'
                    }
                  >
                    {deployment.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deployment by Day of Week */}
      <Card>
        <CardHeader>
          <CardTitle>Deployment Patterns</CardTitle>
          <CardDescription>When deployments typically happen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
              const dayDeployments = data.deploymentsByDay.filter(d => new Date(d.date).getDay() === index);
              const total = dayDeployments.reduce((sum, d) => sum + d.count, 0);
              const maxTotal = Math.max(...['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((_, i) => 
                data.deploymentsByDay.filter(d => new Date(d.date).getDay() === i).reduce((sum, d) => sum + d.count, 0)
              ), 1);
              
              return (
                <div key={day} className="text-center">
                  <div className="h-24 flex items-end justify-center mb-2">
                    <div 
                      className="w-full max-w-[40px] bg-primary rounded-t"
                      style={{ height: `${Math.max((total / maxTotal) * 100, 5)}%` }}
                    />
                  </div>
                  <p className="text-xs font-medium">{day}</p>
                  <p className="text-xs text-muted-foreground">{total}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
