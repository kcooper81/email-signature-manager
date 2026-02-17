'use client';

import { useState, useEffect } from 'react';
import { Button, useToast } from '@/components/ui';
import { Shield, RefreshCw, Loader2 } from 'lucide-react';
import { FeatureGate } from '@/components/billing/upgrade-prompt';
import { BrandNav } from '@/components/dashboard';

interface AuditViolation {
  rule: string;
  expected: string;
  actual: string;
}

interface AuditResult {
  userEmail: string;
  templateName: string;
  score: number;
  violations: AuditViolation[];
}

export default function BrandAuditPage() {
  const [results, setResults] = useState<AuditResult[]>([]);
  const [avgScore, setAvgScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    runAudit();
  }, []);

  async function runAudit() {
    setLoading(true);
    try {
      const res = await fetch('/api/brand/audit');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to run audit');
      setResults(data.results || []);
      setAvgScore(data.averageScore || 0);
    } catch (err: any) {
      toast.error('Audit failed', err.message);
    }
    setLoading(false);
  }

  return (
    <FeatureGate feature="brandGovernance">
    <BrandNav />
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Brand Audit</h1>
          <p className="text-muted-foreground">Compliance scores for all user signatures</p>
        </div>
        <Button onClick={runAudit} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Re-run Audit
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No audit results yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-2">
            Brand audits check every deployed signature against your guidelines and score them for compliance.
          </p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            To run an audit, first create brand guidelines and deploy signatures to your users.
          </p>
          <Button onClick={runAudit} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Run Audit
          </Button>
        </div>
      ) : (
        <>
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground">Organization Average</p>
            <p className={`text-3xl font-bold ${avgScore >= 80 ? 'text-green-600' : avgScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {avgScore}%
            </p>
          </div>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{r.userEmail}</h3>
                    <p className="text-sm text-muted-foreground">Template: {r.templateName}</p>
                  </div>
                  <div className={`text-lg font-bold ${r.score >= 80 ? 'text-green-600' : r.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {r.score}%
                  </div>
                </div>
                {r.violations?.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {r.violations.map((v: AuditViolation, j: number) => (
                      <div key={j} className="text-xs text-red-600 flex items-center gap-1">
                        <span>•</span> {v.rule}: expected {v.expected}, found {v.actual}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </FeatureGate>
  );
}
