'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, RefreshCw } from 'lucide-react';
import { FeatureGate } from '@/components/billing/upgrade-prompt';

export default function BrandAuditPage() {
  const [results, setResults] = useState<any[]>([]);
  const [avgScore, setAvgScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runAudit();
  }, []);

  async function runAudit() {
    setLoading(true);
    try {
      const res = await fetch('/api/brand/audit');
      const data = await res.json();
      setResults(data.results || []);
      setAvgScore(data.averageScore || 0);
    } catch (err) {
      console.error('Failed to run audit:', err);
    }
    setLoading(false);
  }

  return (
    <FeatureGate feature="brandGovernance">
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

      {/* Score Summary */}
      <div className="p-4 rounded-lg border bg-card">
        <p className="text-sm text-muted-foreground">Organization Average</p>
        <p className={`text-3xl font-bold ${avgScore >= 80 ? 'text-green-600' : avgScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
          {avgScore}%
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No audit results available. Make sure you have brand guidelines and user assignments configured.</p>
        </div>
      ) : (
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
                  {r.violations.map((v: any, j: number) => (
                    <div key={j} className="text-xs text-red-600 flex items-center gap-1">
                      <span>•</span> {v.rule}: expected {v.expected}, found {v.actual}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </FeatureGate>
  );
}
