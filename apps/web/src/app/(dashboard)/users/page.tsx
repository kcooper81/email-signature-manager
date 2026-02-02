'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Users as UsersIcon, 
  RefreshCw, 
  Loader2, 
  CheckCircle2,
  AlertCircle,
  Mail,
  Building2,
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  department: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

interface Connection {
  provider: string;
  is_active: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ synced: number; errors: number } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const supabase = createClient();
    
    // Load users
    const { data: usersData } = await supabase
      .from('users')
      .select('*')
      .order('email');
    
    if (usersData) setUsers(usersData);

    // Load connections
    const { data: connectionsData } = await supabase
      .from('provider_connections')
      .select('provider, is_active');
    
    if (connectionsData) setConnections(connectionsData);

    setLoading(false);
  };

  const syncUsers = async () => {
    setSyncing(true);
    setSyncResult(null);

    try {
      const response = await fetch('/api/users/sync', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sync failed');
      }

      setSyncResult({ synced: data.synced, errors: data.errors });
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to sync users');
    } finally {
      setSyncing(false);
    }
  };

  const googleConnected = connections.some(c => c.provider === 'google' && c.is_active);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage team members and sync from Google Workspace
          </p>
        </div>
        <Button 
          onClick={syncUsers} 
          disabled={!googleConnected || syncing}
        >
          {syncing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync from Google
            </>
          )}
        </Button>
      </div>

      {/* Connection warning */}
      {!googleConnected && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <p className="text-amber-800">
            Connect Google Workspace to sync users from your organization.
          </p>
        </div>
      )}

      {/* Sync result */}
      {syncResult && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <p className="text-green-800">
            Synced {syncResult.synced} users
            {syncResult.errors > 0 && ` (${syncResult.errors} errors)`}
          </p>
        </div>
      )}

      {/* Users list */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5" />
            Team Members
          </CardTitle>
          <CardDescription>
            {users.length} user{users.length !== 1 ? 's' : ''} in your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <UsersIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No users yet</p>
              <p className="text-sm">
                {googleConnected 
                  ? 'Click "Sync from Google" to import your team'
                  : 'Connect Google Workspace first, then sync users'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                      {(user.first_name?.[0] || user.email[0]).toUpperCase()}
                      {user.last_name?.[0]?.toUpperCase() || ''}
                    </div>
                    <div>
                      <p className="font-medium">
                        {user.first_name && user.last_name 
                          ? `${user.first_name} ${user.last_name}`
                          : user.email}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </span>
                        {user.department && (
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {user.department}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {user.title && (
                      <span className="text-sm text-muted-foreground">
                        {user.title}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.role === 'owner' 
                        ? 'bg-purple-100 text-purple-700'
                        : user.role === 'admin'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
