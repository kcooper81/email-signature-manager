import { createClient } from '@/lib/supabase/server';
import { setGmailSignatureWithClient } from '@/lib/google/gmail';
import { createOrgGoogleClient } from '@/lib/google/oauth';
import { setSignatureWithServiceAccount } from '@/lib/google/service-account';
import { resolveDisclaimersForUser } from '@/lib/disclaimer-engine';
import { logAudit } from '@/lib/audit/logger';
import type { WorkflowRunContext } from '../workflow-runner';

export async function setDepartedSignature(context: WorkflowRunContext, config: Record<string, any>) {
  const supabase = createClient();
  const { message } = config;
  const defaultMessage = 'This person is no longer with the organization.';

  // Fetch user data
  const { data: userData } = await supabase
    .from('users')
    .select('email, first_name, last_name, department, source')
    .eq('id', context.userId)
    .single();

  if (!userData) return;

  // Build departed signature HTML
  const departedHtml = `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #666666;">
      <tbody>
        <tr>
          <td style="padding: 8px 0;">
            <em>${message || defaultMessage}</em>
          </td>
        </tr>
      </tbody>
    </table>
  `;

  // Resolve disclaimers (GDPR text may still be needed for departed users)
  let finalHtml = departedHtml;
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
    console.error(`Disclaimer resolution failed for departed user ${userData.email}:`, err);
  }

  // Deploy via Gmail if Google connection exists (OAuth or Marketplace)
  try {
    const googleAuth = await createOrgGoogleClient(context.organizationId);
    await setGmailSignatureWithClient(googleAuth, userData.email, finalHtml);
  } catch (err: any) {
    if (err.message === 'Google Workspace not connected') {
      return; // Skip silently — org may use Microsoft 365
    }
    if (err.message === 'MARKETPLACE_AUTH') {
      try {
        await setSignatureWithServiceAccount(userData.email, finalHtml);
      } catch (saErr: any) {
        console.error(`Service account deployment failed for departed user ${userData.email}:`, saErr.message);
      }
    } else {
      console.error(`Google deployment failed for departed user ${userData.email}:`, err.message);
    }
  }

  await logAudit({
    organizationId: context.organizationId,
    userId: context.userId,
    action: 'deploy',
    resourceType: 'deployment',
    metadata: {
      type: 'departed_signature',
      source: 'lifecycle',
      eventId: context.eventId,
    },
  });
}
