'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Plus, Play } from 'lucide-react';
import { FeatureGate } from '@/components/billing/upgrade-prompt';

export default function AutomationPage() {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkflows();
  }, []);

  async function loadWorkflows() {
    setLoading(true);
    try {
      const res = await fetch('/api/lifecycle/workflows');
      const data = await res.json();
      setWorkflows(data.workflows || []);
    } catch (err) {
      console.error('Failed to load workflows:', err);
    }
    setLoading(false);
  }

  const eventTypeLabels: Record<string, string> = {
    user_joined: 'User Joined',
    user_left: 'User Left',
    user_moved: 'User Moved',
    user_updated: 'User Updated',
    invite_accepted: 'Invite Accepted',
  };

  return (
    <FeatureGate feature="maxLifecycleWorkflows">
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Lifecycle Automation</h1>
          <p className="text-muted-foreground">Automate onboarding, offboarding, and user lifecycle workflows</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
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
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${w.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {w.is_active ? 'Active' : 'Inactive'}
                  </span>
                  {!w._readOnly && (
                    <>
                      <Button variant="outline" size="sm">
                        <Play className="h-3.5 w-3.5 mr-1" /> Test
                      </Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </FeatureGate>
  );
}
