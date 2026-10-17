'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { TemplateEditor } from '@/components/templates/editor';
import { TemplateGallery } from '@/components/templates/gallery';
import type { SignatureBlock, IndustryType } from '@/components/templates/types';
import { useSubscription, usePayGatesBypass } from '@/hooks/use-subscription';
import { AlertCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NewTemplatePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [templateCount, setTemplateCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { limits } = useSubscription();
  const devBypass = usePayGatesBypass();
  // Starter chosen from the gallery (null = still choosing).
  const [choice, setChoice] = useState<{ blocks: SignatureBlock[]; industry: IndustryType; name: string } | null>(null);

  // Check current template count on mount
  useEffect(() => {
    const checkTemplateCount = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: userData } = await supabase
        .from('users')
        .select('organization_id')
        .eq('auth_id', user.id)
        .single();

      if (!userData?.organization_id) {
        setLoading(false);
        return;
      }

      const { count } = await supabase
        .from('signature_templates')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', userData.organization_id);

      setTemplateCount(count || 0);
      setLoading(false);
    };

    checkTemplateCount();
  }, []);

  // Check if user can create more templates
  const canCreate = devBypass || limits.maxTemplates === -1 || templateCount < limits.maxTemplates;

  const [brandError, setBrandError] = useState<string[] | null>(null);

  const handleSave = async (name: string, description: string, blocks: SignatureBlock[], industry?: string) => {
    setSaving(true);
    setBrandError(null);

    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, blocks, industry: industry || 'general' }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.violations) {
          setBrandError(data.violations);
        } else {
          setBrandError([data.error || 'Failed to save template']);
        }
        return;
      }

      router.push('/templates');
    } finally {
      setSaving(false);
    }
  };

  // Show limit reached message
  if (!loading && !canCreate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
          <Lock className="h-8 w-8 text-amber-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Template Limit Reached</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Your current plan allows {limits.maxTemplates} template{limits.maxTemplates !== 1 ? 's' : ''}. 
          You currently have {templateCount}. Upgrade your plan to create more templates.
        </p>
        <div className="flex gap-3">
          <Link href="/templates">
            <Button variant="outline">Back to Templates</Button>
          </Link>
          <Link href="/settings/billing">
            <Button>Upgrade Plan</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Step 1: choose a starter from the gallery.
  if (!choice) {
    return (
      <TemplateGallery
        onSelect={(blocks, industry, name) => setChoice({ blocks, industry, name })}
      />
    );
  }

  // Step 2: edit the chosen starter.
  return (
    <>
      {brandError && (
        <div className="mx-auto max-w-4xl mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-red-800">Brand guideline violations</p>
              <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                {brandError.map((v, i) => <li key={i}>{v}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
      <TemplateEditor
        initialBlocks={choice.blocks}
        initialName={choice.name}
        initialIndustry={choice.industry}
        onSave={handleSave}
        saving={saving}
        onBack={() => setChoice(null)}
      />
    </>
  );
}
