import { createServiceClient } from '@/lib/supabase/server';
import { renderSignatureToHtml } from '@/lib/signature-renderer';
import { setGmailSignatureWithClient } from '@/lib/google/gmail';
import { createOrgGoogleClient } from '@/lib/google/oauth';
import { setSignatureWithServiceAccount } from '@/lib/google/service-account';
import { resolveDisclaimersForUser } from '@/lib/disclaimer-engine';
import { logAudit } from '@/lib/audit/logger';
import type { WorkflowRunContext } from '../workflow-runner';

export async function deploySignature(context: WorkflowRunContext, _config: Record<string, any>) {
  const supabase = createServiceClient();

  // Fetch assignment with template and user data in parallel
  const [assignmentResult, userResult] = await Promise.all([
    supabase
      .from('signature_assignments')
      .select('template_id, template:template_id(id, name, blocks)')
      .eq('user_id', context.userId)
      .eq('organization_id', context.organizationId)
      .order('priority', { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from('users')
      .select('*')
      .eq('id', context.userId)
      .single(),
  ]);

  const assignment = assignmentResult.data;
  const template = (assignment as any)?.template;
  const userData = userResult.data;

  if (!assignment || !template || !userData) return;

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

  // Deploy via Gmail if Google connection exists (OAuth or Marketplace)
  let deployStatus = 'completed';
  try {
    const googleAuth = await createOrgGoogleClient(context.organizationId);
    await setGmailSignatureWithClient(googleAuth, userData.email, finalHtml);
  } catch (err: any) {
    if (err.message === 'Google Workspace not connected') {
      return; // Skip silently — org may use Microsoft 365
    }
    if (err.message === 'MARKETPLACE_AUTH') {
      // Marketplace connection — use service account
      try {
        await setSignatureWithServiceAccount(userData.email, finalHtml);
      } catch (saErr: any) {
        console.error(`Service account deployment failed for ${userData.email}:`, saErr.message);
        deployStatus = 'failed';
      }
    } else {
      console.error(`Google deployment failed for ${userData.email}:`, err.message);
      deployStatus = 'failed';
    }
  }

  // Record deployment history
  await supabase
    .from('user_deployment_history')
    .insert({
      organization_id: context.organizationId,
      user_id: context.userId,
      template_id: assignment.template_id,
      status: deployStatus,
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
