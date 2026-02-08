'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  AlertCircle,
  UserPlus,
  RefreshCw,
  XCircle,
  CheckCircle2,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface PendingActionsWidgetProps {
  usersWithoutSignatures: number;
  newUsersWithoutSignatures: number;
  failedDeployments: number;
  staleSyncs: string[];
}

interface ActionItem {
  type: 'warning' | 'error' | 'info';
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
}

export function PendingActionsWidget({
  usersWithoutSignatures,
  newUsersWithoutSignatures,
  failedDeployments,
  staleSyncs,
}: PendingActionsWidgetProps) {
  const actions: ActionItem[] = [];

  if (newUsersWithoutSignatures > 0) {
    actions.push({
      type: 'info',
      icon: <UserPlus className="h-4 w-4 text-blue-600" />,
      title: `${newUsersWithoutSignatures} new team member${newUsersWithoutSignatures > 1 ? 's' : ''} need signatures`,
      description: 'Recently added users without deployed signatures',
      href: '/deployments',
      actionLabel: 'Deploy',
    });
  }

  if (failedDeployments > 0) {
    actions.push({
      type: 'error',
      icon: <XCircle className="h-4 w-4 text-red-600" />,
      title: `${failedDeployments} failed deployment${failedDeployments > 1 ? 's' : ''}`,
      description: 'Review and retry failed signature deployments',
      href: '/deployments',
      actionLabel: 'Review',
    });
  }

  if (staleSyncs.length > 0) {
    actions.push({
      type: 'warning',
      icon: <RefreshCw className="h-4 w-4 text-amber-600" />,
      title: `${staleSyncs.join(' & ')} sync overdue`,
      description: 'Last sync was more than 7 days ago',
      href: '/integrations',
      actionLabel: 'Sync Now',
    });
  }

  if (usersWithoutSignatures > 0 && newUsersWithoutSignatures === 0) {
    actions.push({
      type: 'info',
      icon: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
      title: `${usersWithoutSignatures} team member${usersWithoutSignatures > 1 ? 's' : ''} without signatures`,
      description: 'Deploy signatures to improve team coverage',
      href: '/deployments',
      actionLabel: 'Deploy',
    });
  }

  const hasActions = actions.length > 0;

  return (
    <Card className={hasActions ? 'border-amber-200' : ''}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className={`h-4 w-4 ${hasActions ? 'text-amber-600' : 'text-green-600'}`} />
            Pending Actions
          </CardTitle>
          {hasActions ? (
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              {actions.length} item{actions.length > 1 ? 's' : ''}
            </span>
          ) : (
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              All clear
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {hasActions ? (
          <div className="space-y-3">
            {actions.slice(0, 3).map((action, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  action.type === 'error'
                    ? 'bg-red-50'
                    : action.type === 'warning'
                    ? 'bg-amber-50'
                    : 'bg-blue-50'
                }`}
              >
                <div className="mt-0.5">{action.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {action.description}
                  </p>
                </div>
                <Link href={action.href}>
                  <Button size="sm" variant="outline" className="shrink-0">
                    {action.actionLabel}
                  </Button>
                </Link>
              </div>
            ))}
            {actions.length > 3 && (
              <p className="text-xs text-muted-foreground text-center pt-1">
                +{actions.length - 3} more action{actions.length - 3 > 1 ? 's' : ''}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm font-medium text-green-700">You're all caught up!</p>
            <p className="text-xs text-muted-foreground mt-1">
              No pending actions at this time
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
