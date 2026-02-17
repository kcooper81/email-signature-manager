'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { TemplateEditor } from '@/components/templates/editor';
import { RulesManager } from '@/components/templates/rules-manager';
import type { SignatureBlock, IndustryType } from '@/components/templates/types';
import { AlertCircle, Loader2, Paintbrush, Target } from 'lucide-react';

interface PageProps {
  params: { id: string };
}

export default function EditTemplatePage({ params }: PageProps) {
  const router = useRouter();
  const [template, setTemplate] = useState<{
    name: string;
    description: string;
    blocks: SignatureBlock[];
    industry: IndustryType;
  } | null>(null);
  const [organizationId, setOrganizationId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'design' | 'rules'>('design');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [brandError, setBrandError] = useState<string[] | null>(null);

  useEffect(() => {
    loadTemplate();
  }, [params.id]);

  const loadTemplate = async () => {
    const supabase = createClient();
    
    // Get current user's organization
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/templates');
      return;
    }

    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) {
      router.push('/templates');
      return;
    }

    setOrganizationId(currentUser.organization_id);

    // Load template - FILTERED BY ORGANIZATION
    const { data, error } = await supabase
      .from('signature_templates')
      .select('*')
      .eq('id', params.id)
      .eq('organization_id', currentUser.organization_id)
      .single();

    if (error || !data) {
      router.push('/templates');
      return;
    }

    setTemplate({
      name: data.name,
      description: data.description || '',
      blocks: (data.blocks as SignatureBlock[]) || [],
      industry: (data.industry as IndustryType) || 'general',
    });
    setLoading(false);
  };

  const handleSave = async (name: string, description: string, blocks: SignatureBlock[], industry?: IndustryType) => {
    setSaving(true);
    setBrandError(null);

    try {
      const res = await fetch(`/api/templates/${params.id}`, {
        method: 'PUT',
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
    } catch (err) {
      console.error('Error saving template:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!template) {
    return null;
  }

  return (
    <div className="space-y-6">
      {brandError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
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
      {/* Tabs */}
      <div className="border-b">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('design')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
              activeTab === 'design'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Paintbrush className="h-4 w-4" />
            Design
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
              activeTab === 'rules'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Target className="h-4 w-4" />
            Rules
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'design' ? (
        <TemplateEditor
          initialBlocks={template.blocks}
          initialName={template.name}
          initialDescription={template.description}
          initialIndustry={template.industry}
          onSave={handleSave}
          saving={saving}
        />
      ) : (
        <RulesManager
          templateId={params.id}
          templateName={template.name}
          organizationId={organizationId}
        />
      )}
    </div>
  );
}
