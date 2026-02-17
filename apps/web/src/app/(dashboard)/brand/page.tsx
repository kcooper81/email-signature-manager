'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Palette, Shield, FileText, Image, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeatureGate } from '@/components/billing/upgrade-prompt';

export default function BrandHubPage() {
  const [hubData, setHubData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHubData();
  }, []);

  async function loadHubData() {
    try {
      const res = await fetch('/api/brand/hub');
      const data = await res.json();
      setHubData(data);
    } catch (err) {
      console.error('Failed to load brand hub:', err);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const score = hubData?.complianceScore || 0;
  const scoreColor = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600';

  return (
    <FeatureGate feature="brandGovernance">
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Brand Hub</h1>
        <p className="text-muted-foreground">Central hub for brand governance, assets, and compliance</p>
      </div>

      {/* Score Card */}
      <div className="p-6 rounded-lg border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Brand Compliance Score</p>
            <p className={`text-4xl font-bold ${scoreColor}`}>{score}%</p>
            <p className="text-sm text-muted-foreground mt-1">{hubData?.totalAudits || 0} signatures audited</p>
          </div>
          <Link href="/brand/audit">
            <Button variant="outline">
              View Full Audit <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/brand/guidelines" className="p-4 rounded-lg border bg-card hover:border-primary transition-colors">
          <Palette className="h-8 w-8 text-primary mb-2" />
          <h3 className="font-medium">Guidelines</h3>
          <p className="text-sm text-muted-foreground">{(hubData?.guidelines || []).length} active</p>
        </Link>
        <Link href="/brand/audit" className="p-4 rounded-lg border bg-card hover:border-primary transition-colors">
          <Shield className="h-8 w-8 text-primary mb-2" />
          <h3 className="font-medium">Audit</h3>
          <p className="text-sm text-muted-foreground">Run compliance checks</p>
        </Link>
        <Link href="/brand/assets" className="p-4 rounded-lg border bg-card hover:border-primary transition-colors">
          <Image className="h-8 w-8 text-primary mb-2" />
          <h3 className="font-medium">Assets</h3>
          <p className="text-sm text-muted-foreground">
            {hubData?.assetCounts?.approved || 0} approved, {hubData?.assetCounts?.pending || 0} pending
          </p>
        </Link>
        <div className="p-4 rounded-lg border bg-card">
          <FileText className="h-8 w-8 text-primary mb-2" />
          <h3 className="font-medium">Document Templates</h3>
          <p className="text-sm text-muted-foreground">{(hubData?.documentTemplates || []).length} templates</p>
        </div>
      </div>
    </div>
    </FeatureGate>
  );
}
