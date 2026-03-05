'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Search,
  Download,
  Copy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  SkipForward,
  Circle,
  ClipboardCheck,
  Filter,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { testSections, type StepStatus, type Priority, type TestSection } from './test-data';

type StatusFilter = StepStatus | 'all';
type PriorityFilter = Priority | 'all';

interface StepState {
  status: StepStatus;
  note: string;
}

const STORAGE_KEY = 'siggly-testing-guide-state';

function loadState(): Record<string, StepState> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(state: Record<string, StepState>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable
  }
}

const statusConfig: Record<StepStatus, { label: string; color: string; icon: typeof Circle }> = {
  untested: { label: 'Untested', color: 'text-slate-400', icon: Circle },
  pass: { label: 'Pass', color: 'text-emerald-500', icon: CheckCircle2 },
  fail: { label: 'Fail', color: 'text-red-500', icon: XCircle },
  skip: { label: 'Skip', color: 'text-amber-500', icon: SkipForward },
};

const priorityColors: Record<Priority, string> = {
  P0: 'bg-red-500/10 text-red-400 border-red-500/20',
  P1: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  P2: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

export default function TestingGuidePage() {
  const [stepStates, setStepStates] = useState<Record<string, StepState>>(loadState);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const getStepState = useCallback(
    (stepId: string): StepState => stepStates[stepId] || { status: 'untested', note: '' },
    [stepStates]
  );

  const updateStepStatus = useCallback((stepId: string, status: StepStatus) => {
    setStepStates((prev) => {
      const next = { ...prev, [stepId]: { ...prev[stepId], status, note: prev[stepId]?.note || '' } };
      saveState(next);
      return next;
    });
  }, []);

  const cycleStatus = useCallback(
    (stepId: string) => {
      const order: StepStatus[] = ['untested', 'pass', 'fail', 'skip'];
      const current = getStepState(stepId).status;
      const next = order[(order.indexOf(current) + 1) % order.length];
      updateStepStatus(stepId, next);
    },
    [getStepState, updateStepStatus]
  );

  const toggleSection = useCallback((sectionId: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  }, []);

  // Counts
  const counts = useMemo(() => {
    const all = testSections.flatMap((s) => s.steps);
    const total = all.length;
    let pass = 0, fail = 0, skip = 0, untested = 0;
    for (const step of all) {
      const s = getStepState(step.id).status;
      if (s === 'pass') pass++;
      else if (s === 'fail') fail++;
      else if (s === 'skip') skip++;
      else untested++;
    }
    return { total, pass, fail, skip, untested, tested: pass + fail + skip };
  }, [stepStates, getStepState]);

  // Filtered sections
  const filteredSections = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return testSections
      .map((section) => {
        const filteredSteps = section.steps.filter((step) => {
          if (query && !step.description.toLowerCase().includes(query) && !section.title.toLowerCase().includes(query) && !step.howTo.some(h => h.toLowerCase().includes(query))) {
            return false;
          }
          if (statusFilter !== 'all' && getStepState(step.id).status !== statusFilter) return false;
          if (priorityFilter !== 'all' && step.priority !== priorityFilter) return false;
          return true;
        });
        return { ...section, steps: filteredSteps };
      })
      .filter((s) => s.steps.length > 0);
  }, [searchQuery, statusFilter, priorityFilter, getStepState, stepStates]);

  const handleReset = useCallback(() => {
    setStepStates({});
    saveState({});
    setShowResetConfirm(false);
  }, []);

  const exportResults = useCallback(() => {
    const lines: string[] = [
      `Siggly QA Testing Report — ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
      `${'='.repeat(60)}`,
      `Total: ${counts.total} | Pass: ${counts.pass} | Fail: ${counts.fail} | Skip: ${counts.skip} | Untested: ${counts.untested}`,
      '',
    ];

    for (const section of testSections) {
      lines.push(`## ${section.title}`);
      for (const step of section.steps) {
        const state = getStepState(step.id);
        const statusLabel = statusConfig[state.status].label.toUpperCase();
        lines.push(`  [${statusLabel}] (${step.priority}) ${step.description}`);
      }
      lines.push('');
    }

    return lines.join('\n');
  }, [counts, getStepState]);

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(exportResults());
  }, [exportResults]);

  const downloadReport = useCallback(() => {
    const blob = new Blob([exportResults()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `siggly-qa-report-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [exportResults]);

  const progressPercent = counts.total > 0 ? Math.round((counts.tested / counts.total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ClipboardCheck className="h-6 w-6 text-amber-500" />
            Testing Guide
          </h1>
          <p className="text-sm text-slate-500 mt-1">Interactive QA checklist for Siggly</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-1.5" /> Copy
          </Button>
          <Button variant="outline" size="sm" onClick={downloadReport}>
            <Download className="h-4 w-4 mr-1.5" /> Export
          </Button>
          {showResetConfirm ? (
            <div className="flex items-center gap-1.5">
              <Button variant="destructive" size="sm" onClick={handleReset}>
                Confirm Reset
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowResetConfirm(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowResetConfirm(true)}>
              <RotateCcw className="h-4 w-4 mr-1.5" /> Reset
            </Button>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">Progress</span>
          <span className="text-sm text-slate-500">{counts.tested}/{counts.total} tested ({progressPercent}%)</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
          {counts.pass > 0 && (
            <div className="bg-emerald-500 h-full" style={{ width: `${(counts.pass / counts.total) * 100}%` }} />
          )}
          {counts.fail > 0 && (
            <div className="bg-red-500 h-full" style={{ width: `${(counts.fail / counts.total) * 100}%` }} />
          )}
          {counts.skip > 0 && (
            <div className="bg-amber-500 h-full" style={{ width: `${(counts.skip / counts.total) * 100}%` }} />
          )}
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> {counts.pass} Pass</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> {counts.fail} Fail</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> {counts.skip} Skip</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" /> {counts.untested} Untested</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search test steps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="text-sm rounded-lg border border-slate-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <option value="all">All Statuses</option>
            <option value="untested">Untested</option>
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
            <option value="skip">Skip</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
            className="text-sm rounded-lg border border-slate-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <option value="all">All Priorities</option>
            <option value="P0">P0 - Critical</option>
            <option value="P1">P1 - Important</option>
            <option value="P2">P2 - Nice to have</option>
          </select>
        </div>
      </div>

      {/* Sections */}
      {filteredSections.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          No test steps match the current filters.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              collapsed={collapsedSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
              getStepState={getStepState}
              onCycleStatus={cycleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SectionCard({
  section,
  collapsed,
  onToggle,
  getStepState,
  onCycleStatus,
}: {
  section: TestSection;
  collapsed: boolean;
  onToggle: () => void;
  getStepState: (id: string) => StepState;
  onCycleStatus: (id: string) => void;
}) {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

  const toggleStep = useCallback((stepId: string) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  }, []);

  const sectionCounts = useMemo(() => {
    let pass = 0, fail = 0, skip = 0;
    for (const step of section.steps) {
      const s = getStepState(step.id).status;
      if (s === 'pass') pass++;
      else if (s === 'fail') fail++;
      else if (s === 'skip') skip++;
    }
    return { pass, fail, skip, total: section.steps.length };
  }, [section.steps, getStepState]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
          <span className="font-semibold text-slate-900">{section.title}</span>
          <span className="text-xs text-slate-400">({sectionCounts.total} steps)</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {sectionCounts.pass > 0 && (
            <span className="text-emerald-600 font-medium">{sectionCounts.pass} pass</span>
          )}
          {sectionCounts.fail > 0 && (
            <span className="text-red-600 font-medium">{sectionCounts.fail} fail</span>
          )}
          {sectionCounts.skip > 0 && (
            <span className="text-amber-600 font-medium">{sectionCounts.skip} skip</span>
          )}
        </div>
      </button>
      {!collapsed && (
        <div className="border-t border-slate-100">
          {section.steps.map((step) => {
            const state = getStepState(step.id);
            const config = statusConfig[state.status];
            const StatusIcon = config.icon;
            const isExpanded = expandedSteps.has(step.id);

            return (
              <div
                key={step.id}
                className="border-b border-slate-50 last:border-b-0"
              >
                <div className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors">
                  <button
                    onClick={() => onCycleStatus(step.id)}
                    className={`mt-0.5 flex-shrink-0 ${config.color} hover:opacity-80 transition-opacity`}
                    title={`Status: ${config.label} (click to cycle)`}
                  >
                    <StatusIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="flex-1 text-left text-sm text-slate-700 hover:text-slate-900 transition-colors"
                    title="Click to show/hide instructions"
                  >
                    <span className="flex items-center gap-1.5">
                      {step.description}
                      <Info className={`h-3.5 w-3.5 flex-shrink-0 transition-colors ${isExpanded ? 'text-amber-500' : 'text-slate-300'}`} />
                    </span>
                  </button>
                  <span className={`flex-shrink-0 text-[11px] font-medium px-1.5 py-0.5 rounded border ${priorityColors[step.priority]}`}>
                    {step.priority}
                  </span>
                </div>
                {isExpanded && (
                  <div className="px-4 pb-3 ml-8">
                    <div className="bg-slate-50 rounded-lg p-3 space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">How to test</p>
                        <ol className="space-y-1">
                          {step.howTo.map((instruction, i) => (
                            <li key={i} className="text-sm text-slate-600 flex gap-2">
                              <span className="text-xs font-medium text-slate-400 mt-0.5 flex-shrink-0 w-5 text-right">{i + 1}.</span>
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      {step.sampleData && Object.keys(step.sampleData).length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Sample data</p>
                          <div className="bg-white rounded border border-slate-200 divide-y divide-slate-100">
                            {Object.entries(step.sampleData).map(([key, value]) => (
                              <div key={key} className="flex items-start gap-3 px-3 py-1.5 text-sm">
                                <span className="font-medium text-slate-500 flex-shrink-0 min-w-[100px]">{key}</span>
                                <code className="text-slate-700 font-mono text-xs bg-slate-50 px-1.5 py-0.5 rounded break-all">{value}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
