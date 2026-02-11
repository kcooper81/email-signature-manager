'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/dashboard';
import { 
  Building2, 
  Plus, 
  Users, 
  Calendar,
  ExternalLink,
  Loader2,
  Search,
  Copy,
  Check,
  Mail,
  Globe,
  ArrowRight,
  Settings,
  CreditCard,
  DollarSign,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { useMspContext } from '@/hooks/use-msp-context';
import { cn } from '@/lib/utils';

interface Client {
  id: string;
  name: string;
  domain: string | null;
  created_at: string;
  updated_at: string;
  userCount: number;
}

export default function ClientsPage() {
  const router = useRouter();
  const { switchToClient, refreshClients } = useMspContext();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isNotMsp, setIsNotMsp] = useState(false);
  
  // Add client modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addingClient, setAddingClient] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    domain: '',
    adminEmail: '',
    adminFirstName: '',
    adminLastName: '',
  });
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const response = await fetch('/api/msp/clients');
      const data = await response.json();
      
      if (!response.ok) {
        if (data.error === 'Not an MSP organization') {
          setIsNotMsp(true);
        } else {
          setError(data.error);
        }
        return;
      }
      
      setClients(data.clients || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingClient(true);
    setError(null);

    try {
      const response = await fetch('/api/msp/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setInviteUrl(data.inviteUrl);
      loadClients();
      refreshClients(); // Update the MSP context with new client
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAddingClient(false);
    }
  };

  const copyInviteUrl = () => {
    if (inviteUrl) {
      navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setNewClient({ name: '', domain: '', adminEmail: '', adminFirstName: '', adminLastName: '' });
    setInviteUrl(null);
    setError(null);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.domain?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isNotMsp) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title="Client Management" 
          description="Manage your MSP client organizations"
        />
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">MSP Feature</h3>
            <p className="text-muted-foreground mb-4">
              Client management is only available for MSP partner organizations.
            </p>
            <Button onClick={() => router.push('/partners/apply')}>
              Apply to Become a Partner
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Client Management" 
        description="Manage your MSP client organizations"
        action={
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        }
      />

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-violet-100 rounded-lg dark:bg-violet-900/30">
                <Building2 className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{clients.length}</p>
                <p className="text-sm text-muted-foreground">Total Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg dark:bg-blue-900/30">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {clients.reduce((sum, c) => sum + c.userCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg dark:bg-green-900/30">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {clients.filter(c => {
                    const created = new Date(c.created_at);
                    const now = new Date();
                    return (now.getTime() - created.getTime()) < 30 * 24 * 60 * 60 * 1000;
                  }).length}
                </p>
                <p className="text-sm text-muted-foreground">New This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client List */}
      {filteredClients.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery ? 'No clients found' : 'No clients yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? 'Try adjusting your search query'
                : 'Add your first client to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Client
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-md transition-shadow">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-lg dark:bg-slate-800">
                      <Building2 className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{client.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {client.domain && (
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {client.domain}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {client.userCount} users
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Added {new Date(client.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Active</Badge>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => {
                        switchToClient({ id: client.id, name: client.name, domain: client.domain });
                        router.push('/dashboard');
                      }}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>
                {inviteUrl ? 'Client Created!' : 'Add New Client'}
              </CardTitle>
              <CardDescription>
                {inviteUrl 
                  ? 'Share the invite link with your client\'s admin'
                  : 'Create a new client organization and invite their admin'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {inviteUrl ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
                      <Check className="h-5 w-5" />
                      <span className="font-medium">Client organization created</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-500">
                      An invite has been created for the client admin.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Invite Link</Label>
                    <div className="flex gap-2">
                      <Input value={inviteUrl} readOnly className="font-mono text-sm" />
                      <Button variant="outline" onClick={copyInviteUrl}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This link expires in 7 days. Share it with your client's admin.
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button onClick={closeModal}>Done</Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAddClient} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name *</Label>
                    <Input
                      id="name"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      placeholder="Acme Corporation"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="domain">Domain (optional)</Label>
                    <Input
                      id="domain"
                      value={newClient.domain}
                      onChange={(e) => setNewClient({ ...newClient, domain: e.target.value })}
                      placeholder="acme.com"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Client Admin Details
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="adminFirstName">First Name</Label>
                        <Input
                          id="adminFirstName"
                          value={newClient.adminFirstName}
                          onChange={(e) => setNewClient({ ...newClient, adminFirstName: e.target.value })}
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adminLastName">Last Name</Label>
                        <Input
                          id="adminLastName"
                          value={newClient.adminLastName}
                          onChange={(e) => setNewClient({ ...newClient, adminLastName: e.target.value })}
                          placeholder="Smith"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mt-3">
                      <Label htmlFor="adminEmail">Admin Email *</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={newClient.adminEmail}
                        onChange={(e) => setNewClient({ ...newClient, adminEmail: e.target.value })}
                        placeholder="john@acme.com"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        This person will receive an invite to manage their organization.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={addingClient}>
                      {addingClient && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Create Client
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
