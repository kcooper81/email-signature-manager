'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { TemplateEditor } from '@/components/templates/editor';
import type { SignatureBlock } from '@/components/templates/types';

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

  const handleSave = async (name: string, description: string, blocks: SignatureBlock[], industry: string) => {
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
        console.error('User has no organization');
        router.push('/dashboard');
        return;
      }

      // Create the template under user's organization
      const { data: template, error } = await supabase
        .from('signature_templates')
        .insert({
          organization_id: userData.organization_id,
          name,
          description,
          blocks,
          industry,
          is_default: false,
        })
        .select('id')
        .single();

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

  return (
    <TemplateEditor
      initialBlocks={defaultBlocks}
      onSave={handleSave}
      saving={saving}
    />
  );
}
