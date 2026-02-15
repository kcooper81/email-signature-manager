'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { TemplateEditor } from '@/components/templates/editor';
import type { SignatureBlock } from '@/components/templates/types';
import { useSubscription, usePayGatesBypass } from '@/hooks/use-subscription';
import { AlertCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const defaultBlocks: SignatureBlock[] = [
  {
    id: '1',
    type: 'text',
    content: {
      text: '{{first_name}} {{last_name}}',
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1a1a1a',
    },
  },
  {
    id: '2',
    type: 'text',
    content: {
      text: '{{job_title}}',
      fontSize: 14,
      fontWeight: 'normal',
      color: '#666666',
    },
  },
  {
    id: '3',
    type: 'divider',
    content: {
      color: '#e5e5e5',
      width: 100,
      thickness: 1,
      style: 'solid',
    },
  },
  {
    id: '4',
    type: 'contact-info',
    content: {
      email: '{{email}}',
      phone: '{{phone}}',
      website: '{{website}}',
    },
  },
];

export default function NewTemplatePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [templateCount, setTemplateCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { limits } = useSubscription();
  const devBypass = usePayGatesBypass();

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

  const handleSave = async (name: string, description: string, blocks: SignatureBlock[], industry?: string) => {
    setSaving(true);

    try {
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // Get CURRENT USER's organization - CRITICAL for multi-tenant security
      const { data: userData } = await supabase
        .from('users')
        .select('organization_id')
        .eq('auth_id', user.id)
        .single();

      if (!userData?.organization_id) {
        router.push('/dashboard');
        return;
      }

      // Create the template under user's organization
      const { error } = await supabase
        .from('signature_templates')
        .insert({
          organization_id: userData.organization_id,
          name,
          description,
          blocks,
          industry: industry || 'general',
          is_default: false,
        })
        .select('id')
        .single();

      if (!error) {
        router.push('/templates');
      }
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

  return (
    <TemplateEditor
      initialBlocks={defaultBlocks}
      onSave={handleSave}
      saving={saving}
    />
  );
}
