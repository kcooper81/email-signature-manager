import { createClient } from '@/lib/supabase/server';
import { renderSignatureToHtml } from '@/lib/signature-renderer';
import { setGmailSignature } from '@/lib/google/gmail';
import { resolveDisclaimersForUser } from '@/lib/disclaimer-engine';
import { logAudit } from '@/lib/audit/logger';
import type { WorkflowRunContext } from '../workflow-runner';

export async function deploySignature(context: WorkflowRunContext, _config: Record<string, any>) {
  const supabase = createClient();

  // Get user's assigned template
  const { data: assignment } = await supabase
    .from('signature_assignments')
    .select('template_id')
    .eq('user_id', context.userId)
    .eq('organization_id', context.organizationId)
    .order('priority', { ascending: false })
    .limit(1)
    .single();

  if (!assignment) return;

  // Fetch the template blocks
  const { data: template } = await supabase
    .from('signature_templates')
    .select('*')
    .eq('id', assignment.template_id)
    .eq('organization_id', context.organizationId)
    .single();

  if (!template) return;

  // Fetch user data
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', context.userId)
    .single();

  if (!userData) return;

  // Render signature HTML
  const renderContext = {
    user: {
      firstName: userData.first_name || '',
      lastName: userData.last_name || '',
      email: userData.email || '',
      title: userData.title || '',
      department: userData.department || '',
      phone: userData.phone || '',
      mobile: userData.mobile || '',
      calendlyUrl: userData.calendly_url || '',
      linkedinUrl: userData.linkedin_url || '',
      twitterUrl: userData.twitter_url || '',
      githubUrl: userData.github_url || '',
      personalWebsite: userData.personal_website || '',
      instagramUrl: userData.instagram_url || '',
      facebookUrl: userData.facebook_url || '',
      youtubeUrl: userData.youtube_url || '',
    },
    organization: { name: '' },
    tracking: {
      userId: context.userId,
      templateId: assignment.template_id,
      enabled: true,
    },
  };

  const { html } = await renderSignatureToHtml(template.blocks, renderContext);

  // Resolve and append disclaimers
  let finalHtml = html;
  const { data: orgData } = await supabase
    .from('organizations')
    .select('domain, industry, parent_organization_id')
    .eq('id', context.organizationId)
    .single();

  try {
    const disclaimerResult = await resolveDisclaimersForUser(
      {
        userId: context.userId,
        userEmail: userData.email,
        userDepartment: userData.department || undefined,
        userSource: userData.source || undefined,
        organizationId: context.organizationId,
        organizationDomain: orgData?.domain || undefined,
        organizationIndustry: orgData?.industry || undefined,
      },
      orgData?.parent_organization_id || null
    );
    if (disclaimerResult.combinedHtml) {
      finalHtml += disclaimerResult.combinedHtml;
    }
  } catch (err) {
    console.error(`Disclaimer resolution failed for ${userData.email}:`, err);
  }

  // Deploy via Gmail if Google connection exists
  const { data: connection } = await supabase
    .from('provider_connections')
    .select('*')
    .eq('organization_id', context.organizationId)
    .eq('provider', 'google')
    .eq('is_active', true)
    .single();

  if (connection) {
    await setGmailSignature(
      connection.access_token,
      connection.refresh_token,
      userData.email,
      finalHtml
    );
  }

  // Record deployment history
  await supabase
    .from('user_deployment_history')
    .insert({
      organization_id: context.organizationId,
      user_id: context.userId,
      template_id: assignment.template_id,
      status: 'completed',
      deployed_at: new Date().toISOString(),
    });

  await logAudit({
    organizationId: context.organizationId,
    userId: context.userId,
    action: 'deploy',
    resourceType: 'deployment',
    resourceId: assignment.template_id,
    resourceName: template.name,
    metadata: { source: 'lifecycle', eventId: context.eventId },
  });
}
