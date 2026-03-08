'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import { Badge } from '@/components/ui/badge';
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from '@/components/ui/modal';
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
  Settings2,
  Check,
  Building2,
} from 'lucide-react';
import { DEFAULT_SUPPORT_VIEWS, ADMIN_VIEW_OPTIONS } from '@/lib/admin/views';

interface PlatformAdmin {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  superAdminRole: string;
  allowedViews: string[];
  createdAt: string;
}

interface SearchResult {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  organizationName: string | null;
}

const ROLE_OPTIONS = [
  { value: 'super_admin', label: 'Super Admin — Full access to all admin features' },
  { value: 'support', label: 'Support — Selected views only' },
];


export default function PlatformAdminsPage() {
  const [admins, setAdmins] = useState<PlatformAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addRole, setAddRole] = useState('support');
  const [addViews, setAddViews] = useState<string[]>([...DEFAULT_SUPPORT_VIEWS]);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [removeTarget, setRemoveTarget] = useState<PlatformAdmin | null>(null);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [editingViews, setEditingViews] = useState<string | null>(null);
  const [editViewsState, setEditViewsState] = useState<string[]>([]);
  const [savingViews, setSavingViews] = useState(false);

  // Search state for adding admins
  const [userSearch, setUserSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SearchResult | null>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      const res = await fetch('/api/admin/platform-admins');
      const data = await res.json();

      if (!res.ok) {
        console.error('Failed to load admins:', data.error);
        setLoading(false);
        return;
      }

      setAdmins(
        (data.admins || []).map((u: any) => {
          let views: string[] = DEFAULT_SUPPORT_VIEWS;
          try {
            if (u.super_admin_allowed_views) {
              views = JSON.parse(u.super_admin_allowed_views);
            }
          } catch { /* use default */ }

          return {
            id: u.id,
            email: u.email,
            firstName: u.first_name,
            lastName: u.last_name,
            superAdminRole: u.super_admin_role || 'super_admin',
            allowedViews: views,
            createdAt: u.created_at,
          };
        })
      );
    } catch (err) {
      console.error('Failed to load admins:', err);
    }
    setLoading(false);
  };

  const searchUsers = useCallback(async (query: string) => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    try {
      const res = await fetch(`/api/admin/platform-admins/search?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (res.ok) {
        setSearchResults(data.users || []);
      }
    } catch {
      // ignore
    }
    setSearchLoading(false);
  }, []);

  const handleUserSearchChange = (value: string) => {
    setUserSearch(value);
    setSelectedUser(null);
    setAddError(null);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (value.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    searchTimeout.current = setTimeout(() => searchUsers(value), 300);
  };

  const handleAdd = async () => {
    if (!selectedUser) {
      setAddError('Please search and select a user first.');
      return;
    }
    setAddLoading(true);
    setAddError(null);

    try {
      const res = await fetch('/api/admin/platform-admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedUser.id,
          role: addRole,
          allowedViews: addRole === 'support' ? addViews : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAddError(data.error || 'Failed to add admin');
        setAddLoading(false);
        return;
      }

      setShowAddModal(false);
      resetAddForm();
      loadAdmins();
    } catch {
      setAddError('Failed to add admin');
    }
    setAddLoading(false);
  };

  const resetAddForm = () => {
    setUserSearch('');
    setSearchResults([]);
    setSelectedUser(null);
    setAddRole('support');
    setAddViews([...DEFAULT_SUPPORT_VIEWS]);
    setAddError(null);
  };

  const handleChangeRole = async (admin: PlatformAdmin, newRole: string) => {
    await fetch('/api/admin/platform-admins', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: admin.id,
        role: newRole,
        allowedViews: newRole === 'support'
          ? (admin.allowedViews.length > 0 ? admin.allowedViews : DEFAULT_SUPPORT_VIEWS)
          : undefined,
      }),
    });
    loadAdmins();
  };

  const handleSaveViews = async (adminId: string) => {
    setSavingViews(true);
    await fetch('/api/admin/platform-admins', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: adminId, allowedViews: editViewsState }),
    });
    setEditingViews(null);
    setSavingViews(false);
    loadAdmins();
  };

  const handleRemove = async () => {
    if (!removeTarget) return;
    setRemoveLoading(true);

    await fetch('/api/admin/platform-admins', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: removeTarget.id }),
    });

    setRemoveTarget(null);
    setRemoveLoading(false);
    loadAdmins();
  };

  const toggleView = (views: string[], key: string): string[] => {
    return views.includes(key) ? views.filter(v => v !== key) : [...views, key];
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
            Manage who has access to the admin panel and their permissions
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
            Super Admins have full access. Support users only see the views you select.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {filteredAdmins.map((admin) => (
              <div key={admin.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
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
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <select
                      value={admin.superAdminRole}
                      onChange={(e) => handleChangeRole(admin, e.target.value)}
                      className="text-sm rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                      <option value="super_admin">Super Admin</option>
                      <option value="support">Support</option>
                    </select>
                    {admin.superAdminRole === 'support' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-blue-600 h-8 w-8"
                        onClick={() => {
                          setEditingViews(admin.id);
                          setEditViewsState([...admin.allowedViews]);
                        }}
                        title="Configure allowed views"
                      >
                        <Settings2 className="h-4 w-4" />
                      </Button>
                    )}
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

                {/* Allowed views summary for support users */}
                {admin.superAdminRole === 'support' && (
                  <div className="mt-2 ml-12 flex flex-wrap gap-1">
                    {admin.allowedViews.map(v => (
                      <Badge key={v} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {ADMIN_VIEW_OPTIONS.flatMap(g => g.views).find(o => o.key === v)?.label || v}
                      </Badge>
                    ))}
                    {admin.allowedViews.length === 0 && (
                      <span className="text-xs text-red-500">No views assigned</span>
                    )}
                  </div>
                )}

                {/* Inline view editor */}
                {editingViews === admin.id && (
                  <div className="mt-3 ml-12 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-xs font-medium text-slate-700 mb-2">Allowed Admin Views</p>
                    <div className="space-y-3">
                      {ADMIN_VIEW_OPTIONS.map(group => (
                        <div key={group.group}>
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                            {group.group}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {group.views.map(view => {
                              const isSelected = editViewsState.includes(view.key);
                              return (
                                <button
                                  key={view.key}
                                  onClick={() => setEditViewsState(toggleView(editViewsState, view.key))}
                                  className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border transition-colors ${
                                    isSelected
                                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                                  }`}
                                >
                                  {isSelected && <Check className="h-3 w-3" />}
                                  {view.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        size="sm"
                        onClick={() => handleSaveViews(admin.id)}
                        disabled={savingViews || editViewsState.length === 0}
                      >
                        {savingViews ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingViews(null)}
                      >
                        Cancel
                      </Button>
                      {editViewsState.length === 0 && (
                        <span className="text-xs text-red-500">Select at least one view</span>
                      )}
                    </div>
                  </div>
                )}
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
      <Modal open={showAddModal} onClose={() => { setShowAddModal(false); resetAddForm(); }}>
        <ModalHeader onClose={() => { setShowAddModal(false); resetAddForm(); }}>
          <ModalTitle>Add Platform Admin</ModalTitle>
          <ModalDescription>
            Search for an existing user account to grant admin panel access.
          </ModalDescription>
        </ModalHeader>
        <ModalContent>
          <div className="space-y-4">
            {/* User search */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Search User</label>
              {selectedUser ? (
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {selectedUser.firstName || selectedUser.lastName
                          ? `${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`.trim()
                          : selectedUser.email}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{selectedUser.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(null);
                      setUserSearch('');
                      setSearchResults([]);
                    }}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by name or email..."
                    value={userSearch}
                    onChange={(e) => handleUserSearchChange(e.target.value)}
                    className="pl-9"
                    autoFocus
                  />
                  {searchLoading && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-slate-400" />
                  )}

                  {/* Search results dropdown */}
                  {userSearch.trim().length >= 2 && !selectedUser && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                      {searchResults.length > 0 ? (
                        searchResults.map((user) => (
                          <button
                            key={user.id}
                            onClick={() => {
                              setSelectedUser(user);
                              setSearchResults([]);
                              setUserSearch('');
                            }}
                            className="w-full text-left px-3 py-2.5 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-100 last:border-0 transition-colors"
                          >
                            <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0 text-xs font-medium">
                              {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-slate-900 truncate">
                                {user.firstName || user.lastName
                                  ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                                  : user.email}
                              </p>
                              {(user.firstName || user.lastName) && (
                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                              )}
                            </div>
                            {user.organizationName && (
                              <span className="flex items-center gap-1 text-[10px] text-slate-400 flex-shrink-0">
                                <Building2 className="h-3 w-3" />
                                {user.organizationName}
                              </span>
                            )}
                          </button>
                        ))
                      ) : !searchLoading ? (
                        <p className="px-3 py-4 text-sm text-slate-500 text-center">
                          No users found matching &ldquo;{userSearch}&rdquo;
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Role</label>
              <Select
                options={ROLE_OPTIONS}
                value={addRole}
                onChange={(e) => setAddRole(e.target.value)}
              />
            </div>

            {/* View selection for support role */}
            {addRole === 'support' && (
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Allowed Views</label>
                <div className="space-y-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  {ADMIN_VIEW_OPTIONS.map(group => (
                    <div key={group.group}>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        {group.group}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.views.map(view => {
                          const isSelected = addViews.includes(view.key);
                          return (
                            <button
                              key={view.key}
                              type="button"
                              onClick={() => setAddViews(toggleView(addViews, view.key))}
                              className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border transition-colors ${
                                isSelected
                                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                              }`}
                            >
                              {isSelected && <Check className="h-3 w-3" />}
                              {view.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {addViews.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">Select at least one view</p>
                )}
              </div>
            )}

            {addError && (
              <p className="text-sm text-red-600">{addError}</p>
            )}
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => { setShowAddModal(false); resetAddForm(); }}>
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={addLoading || !selectedUser || (addRole === 'support' && addViews.length === 0)}
          >
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
