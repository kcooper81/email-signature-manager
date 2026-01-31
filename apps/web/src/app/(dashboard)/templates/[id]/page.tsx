'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { TemplateEditor } from '@/components/templates/editor';
import type { SignatureBlock } from '@/components/templates/types';
import { Loader2 } from 'lucide-react';

interface PageProps {
  params: { id: string };
}

export default function EditTemplatePage({ params }: PageProps) {
  const router = useRouter();
  const [template, setTemplate] = useState<{
    name: string;
    description: string;
    blocks: SignatureBlock[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTemplate();
  }, [params.id]);

  const loadTemplate = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('signature_templates')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error || !data) {
      router.push('/templates');
      return;
    }

    setTemplate({
      name: data.name,
      description: data.description || '',
      blocks: (data.blocks as SignatureBlock[]) || [],
    });
    setLoading(false);
  };

  const handleSave = async (name: string, description: string, blocks: SignatureBlock[]) => {
    setSaving(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('signature_templates')
        .update({
          name,
          description,
          blocks,
          updated_at: new Date().toISOString(),
        })
        .eq('id', params.id);

      if (error) {
        console.error('Failed to save template:', error);
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
    <TemplateEditor
      initialBlocks={template.blocks}
      initialName={template.name}
      initialDescription={template.description}
      onSave={handleSave}
      saving={saving}
    />
  );
}
