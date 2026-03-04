'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import { Badge } from '@/components/ui/badge';
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '@/components/ui/modal';
import { Select } from '@/components/ui/select';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import {
  Shield,
  ShieldCheck,
  HeadphonesIcon,
  Loader2,
  UserPlus,
  Trash2,
  Search,
} from 'lucide-react';

interface PlatformAdmin {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  superAdminRole: string;
  createdAt: string;
}

const ROLE_OPTIONS = [
  { value: 'super_admin', label: 'Super Admin — Full access to all admin features' },
  { value: 'support', label: 'Support — Tickets & Testing Guide only' },
];

export default function PlatformAdminsPage() {
  const [admins, setAdmins] = useState<PlatformAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addEmail, setAddEmail] = useState('');
  const [addRole, setAddRole] = useState('support');
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [removeTarget, setRemoveTarget] = useState<PlatformAdmin | null>(null);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, super_admin_role, created_at')
      .eq('is_super_admin', true)
      .order('created_at', { ascending: true });

    setAdmins(
      data?.map((u) => ({
        id: u.id,
        email: u.email,
        firstName: u.first_name,
        lastName: u.last_name,
        superAdminRole: u.super_admin_role || 'super_admin',
        createdAt: u.created_at,
      })) || []
    );
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!addEmail.trim()) return;
    setAddLoading(true);
    setAddError(null);

    const supabase = createClient();

    // Find user by email
    const { data: user, error: findErr } = await supabase
      .from('users')
      .select('id, email, is_super_admin')
      .eq('email', addEmail.trim().toLowerCase())
      .maybeSingle();

    if (findErr || !user) {
      setAddError('User not found. They must have an existing account.');
      setAddLoading(false);
      return;
    }

    if (user.is_super_admin) {
      setAddError('This user is already a platform admin.');
      setAddLoading(false);
      return;
    }

    const { error: updateErr } = await supabase
      .from('users')
      .update({ is_super_admin: true, super_admin_role: addRole })
      .eq('id', user.id);

    if (updateErr) {
      setAddError('Failed to update user: ' + updateErr.message);
      setAddLoading(false);
      return;
    }

    setShowAddModal(false);
    setAddEmail('');
    setAddRole('support');
    setAddLoading(false);
    loadAdmins();
  };

  const handleChangeRole = async (admin: PlatformAdmin, newRole: string) => {
    const supabase = createClient();
    await supabase
      .from('users')
      .update({ super_admin_role: newRole })
      .eq('id', admin.id);
    loadAdmins();
  };

  const handleRemove = async () => {
    if (!removeTarget) return;
    setRemoveLoading(true);

    const supabase = createClient();
    await supabase
      .from('users')
      .update({ is_super_admin: false, super_admin_role: null })
      .eq('id', removeTarget.id);

    setRemoveTarget(null);
    setRemoveLoading(false);
    loadAdmins();
  };

  const filteredAdmins = search
    ? admins.filter(
        (a) =>
          a.email.toLowerCase().includes(search.toLowerCase()) ||
          (a.firstName || '').toLowerCase().includes(search.toLowerCase()) ||
          (a.lastName || '').toLowerCase().includes(search.toLowerCase())
      )
    : admins;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Shield className="h-6 w-6 text-amber-500" />
            Platform Admins
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage who has access to the admin panel and their role
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Admin
        </Button>
      </div>

      {admins.length > 3 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search admins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Admin Users ({admins.length})</CardTitle>
          <CardDescription>
            Super Admins have full access. Support users can only manage tickets and use the testing guide.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {filteredAdmins.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    admin.superAdminRole === 'super_admin'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {admin.superAdminRole === 'super_admin' ? (
                      <ShieldCheck className="h-4 w-4" />
                    ) : (
                      <HeadphonesIcon className="h-4 w-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-slate-900 truncate">
                      {admin.firstName || admin.lastName
                        ? `${admin.firstName || ''} ${admin.lastName || ''}`.trim()
                        : admin.email}
                    </p>
                    {(admin.firstName || admin.lastName) && (
                      <p className="text-xs text-slate-500 truncate">{admin.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <select
                    value={admin.superAdminRole}
                    onChange={(e) => handleChangeRole(admin, e.target.value)}
                    className="text-sm rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="support">Support</option>
                  </select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-red-600 h-8 w-8"
                    onClick={() => setRemoveTarget(admin)}
                    title="Remove admin access"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {filteredAdmins.length === 0 && (
              <p className="text-center text-slate-500 py-6">
                {search ? 'No admins match your search.' : 'No platform admins configured.'}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Admin Modal */}
      <Modal open={showAddModal} onClose={() => { setShowAddModal(false); setAddError(null); }}>
        <ModalHeader onClose={() => { setShowAddModal(false); setAddError(null); }}>
          <ModalTitle>Add Platform Admin</ModalTitle>
          <ModalDescription>
            Grant admin panel access to an existing user by their email address.
          </ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
            <Input
              placeholder="user@example.com"
              value={addEmail}
              onChange={(e) => { setAddEmail(e.target.value); setAddError(null); }}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Role</label>
            <Select
              options={ROLE_OPTIONS}
              value={addRole}
              onChange={(e) => setAddRole(e.target.value)}
            />
          </div>
          {addError && (
            <p className="text-sm text-red-600">{addError}</p>
          )}
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => { setShowAddModal(false); setAddError(null); }}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={addLoading || !addEmail.trim()}>
            {addLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Admin'
            )}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Remove Confirmation */}
      <ConfirmDialog
        open={!!removeTarget}
        onClose={() => setRemoveTarget(null)}
        onConfirm={handleRemove}
        title="Remove Admin Access"
        description={`Remove admin panel access for ${removeTarget?.email}? They will no longer be able to access /admin.`}
        confirmText="Remove Access"
        variant="destructive"
        loading={removeLoading}
      />
    </div>
  );
}
