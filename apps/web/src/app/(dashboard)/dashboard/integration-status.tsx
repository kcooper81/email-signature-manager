'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Link2,
  ArrowRight,
  Mail,
  Building2,
  Users,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface IntegrationInfo {
  connected: boolean;
  lastSync: string | null;
}

interface IntegrationStatusWidgetProps {
  google: IntegrationInfo;
  microsoft: IntegrationInfo;
  hubspot: IntegrationInfo;
}

const integrations: { key: 'google' | 'microsoft' | 'hubspot'; name: string; icon: LucideIcon; color: string }[] = [
  { key: 'google', name: 'Google Workspace', icon: Mail, color: 'text-red-500' },
  { key: 'microsoft', name: 'Microsoft 365', icon: Building2, color: 'text-blue-500' },
  { key: 'hubspot', name: 'HubSpot', icon: Users, color: 'text-orange-500' },
];

function formatLastSync(lastSync: string | null): string {
  if (!lastSync) return 'Never synced';
  
  const syncDate = new Date(lastSync);
  const now = new Date();
  const diffMs = now.getTime() - syncDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return syncDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function isStale(lastSync: string | null): boolean {
  if (!lastSync) return false;
  const syncDate = new Date(lastSync);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return syncDate < sevenDaysAgo;
}

export function IntegrationStatusWidget({
  google,
  microsoft,
  hubspot,
}: IntegrationStatusWidgetProps) {
  const statusMap = { google, microsoft, hubspot };
  const connectedCount = [google, microsoft, hubspot].filter(i => i.connected).length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Link2 className="h-4 w-4 text-violet-600" />
            Integrations
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            {connectedCount}/3 connected
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {integrations.map((integration) => {
          const status = statusMap[integration.key];
          const stale = status.connected && isStale(status.lastSync);
          
          return (
            <div
              key={integration.key}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <integration.icon className={`w-5 h-5 ${integration.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium">{integration.name}</p>
                  {status.connected && (
                    <p className={`text-xs ${stale ? 'text-amber-600' : 'text-muted-foreground'}`}>
                      {stale && <Clock className="h-3 w-3 inline mr-1" />}
                      {formatLastSync(status.lastSync)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {status.connected ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <CheckCircle2 className="h-3 w-3" />
                    Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    <XCircle className="h-3 w-3" />
                    Not connected
                  </span>
                )}
              </div>
            </div>
          );
        })}
        
        <Link href="/integrations" className="block pt-2">
          <Button variant="outline" size="sm" className="w-full">
            Manage Integrations
            <ArrowRight className="h-3 w-3 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
