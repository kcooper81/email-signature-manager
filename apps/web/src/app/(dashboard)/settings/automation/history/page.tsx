'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface ActionResult {
  action: string;
  status: string;
  error?: string;
}

interface WorkflowRun {
  id: string;
  status: string;
  started_at: string;
  lifecycle_workflows?: { name: string } | null;
  users?: { email: string } | null;
  action_results?: ActionResult[] | null;
}

export default function AutomationHistoryPage() {
  const [runs, setRuns] = useState<WorkflowRun[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRuns();
  }, []);

  async function loadRuns() {
    setLoading(true);
    try {
      const res = await fetch('/api/lifecycle/runs');
      const data = await res.json();
      setRuns(data.runs || []);
    } catch (err) {
      console.error('Failed to load runs:', err);
    }
    setLoading(false);
  }

  const statusColors: Record<string, string> = {
    completed: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    running: 'bg-blue-100 text-blue-700',
    partial: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Automation History</h1>
        <p className="text-muted-foreground">View past workflow executions and their results</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : runs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No workflow runs recorded yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {runs.map(run => (
            <div key={run.id} className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{run.lifecycle_workflows?.name || 'Unknown Workflow'}</h3>
                  <p className="text-sm text-muted-foreground">
                    User: {run.users?.email || 'unknown'} · {new Date(run.started_at).toLocaleString()}
                  </p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${statusColors[run.status] || 'bg-gray-100 text-gray-600'}`}>
                  {run.status}
                </span>
              </div>
              {(run.action_results?.length ?? 0) > 0 && (
                <div className="mt-2 space-y-1">
                  {run.action_results!.map((ar: ActionResult, i: number) => (
                    <div key={i} className="text-xs flex items-center gap-2">
                      <span className={ar.status === 'completed' ? 'text-green-600' : 'text-red-600'}>
                        {ar.status === 'completed' ? '\u2713' : '\u2717'}
                      </span>
                      <span>{ar.action}</span>
                      {ar.error && <span className="text-red-500">({ar.error})</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
