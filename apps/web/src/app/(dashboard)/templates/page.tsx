'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, EmptyState } from '@/components/ui';
import { PageHeader } from '@/components/dashboard';
import { Plus, FileSignature, Pencil, Trash2, Users, Lock } from 'lucide-react';
import { SignaturePreview } from '@/components/templates/preview';
import type { SignatureBlock } from '@/components/templates/types';
import { useSubscription, usePayGatesBypass } from '@/hooks/use-subscription';
import { LimitGate } from '@/components/billing';
import { useMspContext } from '@/hooks/use-msp-context';

interface Template {
  id: string;
  name: string;
  description: string | null;
  blocks: SignatureBlock[];
  is_default: boolean;
  created_at: string;
  updated_at: string;
  deployment_count?: number;
  last_deployed_at?: string | null;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const { plan, usage, limits, refresh } = useSubscription();
  const devBypass = usePayGatesBypass();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const { currentClientOrg } = useMspContext();

  useEffect(() => {
    loadTemplates();
  }, [currentClientOrg]); // Reload when MSP context changes

  const loadTemplates = async () => {
    const supabase = createClient();
    
    // Get current user's organization
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) {
      setLoading(false);
      return;
    }

    // Use MSP client org if viewing a client, otherwise use user's own org
    const effectiveOrgId = currentClientOrg?.id || currentUser.organization_id;

    // Load templates - ONLY for effective organization
    const { data, error } = await supabase
      .from('signature_templates')
      .select('*')
      .eq('organization_id', effectiveOrgId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTemplates(data);
    }
    setLoading(false);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const deleteTemplate = async (id: string) => {
    setDeleteConfirmId(null);

    const supabase = createClient();
    
    // Get current user's organization for security
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) return;

    // CASCADE DELETE will automatically handle related deployments and assignments
    const { error } = await supabase
      .from('signature_templates')
      .delete()
      .eq('id', id)
      .eq('organization_id', currentUser.organization_id);

    if (!error) {
      setTemplates(templates.filter((t) => t.id !== id));
      // Refresh subscription usage counts
      refresh();
    }
  };

  // Check if user can create more templates (use actual templates.length for accuracy)
  const canCreate = devBypass || limits.maxTemplates === -1 || templates.length < limits.maxTemplates;
  const templateLimitReached = !canCreate;

  const actionButtons = (
    <div className="flex items-center gap-2">
      <Link href="/templates/assignments">
        <Button variant="outline">
          <Users className="mr-2 h-4 w-4" />
          View Usage
        </Button>
      </Link>
      {templateLimitReached ? (
        <Link href="/settings/billing">
          <Button variant="outline" className="border-violet-300 text-violet-700 hover:bg-violet-50">
            <Lock className="mr-2 h-4 w-4" />
            Upgrade to Create More
          </Button>
        </Link>
      ) : (
        <Link href="/templates/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </Link>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Templates"
        description="Create and manage email signature templates"
        action={actionButtons}
      />

      {/* Usage indicator */}
      {limits.maxTemplates !== -1 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {templates.length} / {limits.maxTemplates} templates used
          </span>
          {templates.length >= limits.maxTemplates && !devBypass && (
            <Badge variant="secondary" className="text-xs">
              Limit reached
            </Badge>
          )}
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-5 bg-slate-200 rounded w-1/2" />
                <div className="h-4 bg-slate-200 rounded w-3/4 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-slate-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : templates.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-6">
            <EmptyState
              icon={FileSignature}
              title="No templates yet"
              description="Create your first email signature template to get started"
              action={
                <Link href="/templates/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Template
                  </Button>
                </Link>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="group relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {template.name}
                      {template.is_default && (
                        <Badge variant="info">Default</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {template.description || 'No description'}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/templates/${template.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDeleteClick(template.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href={`/templates/${template.id}`}>
                  <div className="bg-card rounded-lg p-6 min-h-[120px] hover:bg-accent/50 transition-colors cursor-pointer overflow-hidden">
                    {template.blocks && template.blocks.length > 0 ? (
                      <div className="transform scale-[0.9] origin-top-left">
                        <SignaturePreview blocks={template.blocks} />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No blocks yet
                      </p>
                    )}
                  </div>
                </Link>
                <div className="mt-3 text-xs text-muted-foreground">
                  Updated {new Date(template.updated_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Delete Template?</CardTitle>
              <CardDescription>
                Are you sure you want to delete this template? This action cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3">
              <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => deleteTemplate(deleteConfirmId)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
