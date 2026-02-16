'use client';

import { useState, useEffect } from 'react';
import { Button, ConfirmDialog, useToast } from '@/components/ui';
import { Zap, Plus, Play, Pencil, Trash2, Loader2 } from 'lucide-react';
import { FeatureGate } from '@/components/billing/upgrade-prompt';
import { WorkflowModal } from './workflow-modal';

interface WorkflowAction {
  type: string;
  config: Record<string, string>;
}

interface Workflow {
  id: string;
  name: string;
  description: string | null;
  event_type: string;
  priority: number;
  department_filter: string[] | null;
  source_filter: string[] | null;
  is_active: boolean;
  cascade_to_clients: boolean;
  actions: WorkflowAction[];
  _cascaded?: boolean;
  _readOnly?: boolean;
}

const eventTypeLabels: Record<string, string> = {
  user_joined: 'User Joined',
  user_left: 'User Left',
  user_moved: 'User Moved',
  user_updated: 'User Updated',
  invite_accepted: 'Invite Accepted',
};

export default function AutomationPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [testing, setTesting] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    loadWorkflows();
  }, []);

  async function loadWorkflows() {
    setLoading(true);
    try {
      const res = await fetch('/api/lifecycle/workflows');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load');
      setWorkflows(data.workflows || []);
    } catch (err: any) {
      toast.error('Failed to load workflows', err.message);
    }
    setLoading(false);
  }

  function openCreate() {
    setEditingWorkflow(null);
    setModalOpen(true);
  }

  function openEdit(w: Workflow) {
    setEditingWorkflow(w);
    setModalOpen(true);
  }

  async function handleTest(id: string) {
    setTesting(id);
    try {
      const res = await fetch(`/api/lifecycle/workflows/${id}/test`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Test failed');
      toast.success('Test completed', `${data.actionsExecuted || 0} actions would execute`);
    } catch (err: any) {
      toast.error('Test failed', err.message);
    }
    setTesting(null);
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/lifecycle/workflows/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      toast.success('Workflow deleted');
      setDeleteId(null);
      await loadWorkflows();
    } catch (err: any) {
      toast.error('Failed to delete', err.message);
    }
    setDeleting(false);
  }

  return (
    <FeatureGate feature="maxLifecycleWorkflows">
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Lifecycle Automation</h2>
          <p className="text-sm text-muted-foreground">Automate onboarding, offboarding, and user lifecycle workflows</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : workflows.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No automation workflows yet.</p>
          <p className="text-sm mt-1">Create workflows to automate signature assignment and deployment when users join or leave.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {workflows.map(w => (
            <div key={w.id} className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{w.name}</h3>
                    {w._cascaded && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">MSP</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trigger: {eventTypeLabels[w.event_type] || w.event_type} · {(w.actions || []).length} action(s) · Priority: {w.priority}
                  </p>
                  {w.description && <p className="text-xs text-muted-foreground mt-1">{w.description}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${w.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {w.is_active ? 'Active' : 'Inactive'}
                  </span>
                  {!w._readOnly && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleTest(w.id)} disabled={testing === w.id}>
                        {testing === w.id ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <Play className="h-3.5 w-3.5 mr-1" />}
                        Test
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openEdit(w)}>
                        <Pencil className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setDeleteId(w.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Workflow Modal */}
      {modalOpen && (
        <WorkflowModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditingWorkflow(null); }}
          workflow={editingWorkflow}
          onSaved={() => { toast.success(editingWorkflow ? 'Workflow updated' : 'Workflow created'); loadWorkflows(); }}
        />
      )}

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Workflow"
        description="Are you sure? This workflow will be permanently removed and will no longer trigger."
        confirmText="Delete"
        variant="destructive"
        loading={deleting}
      />
    </div>
    </FeatureGate>
  );
}
