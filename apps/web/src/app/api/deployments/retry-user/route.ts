import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { setGmailSignatureWithClient } from '@/lib/google/gmail';
import { createOrgGoogleClient } from '@/lib/google/oauth';
import { setSignatureWithServiceAccount } from '@/lib/google/service-account';
import { renderSignatureToHtml } from '@/lib/signature-renderer';
import { resolveDisclaimersForUser } from '@/lib/disclaimer-engine';
import { logException } from '@/lib/error-logging';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  let requestBody: any = {};

  try {
    requestBody = await request.json();
    const { deploymentId, userId } = requestBody;

    if (!deploymentId || !userId) {
      return NextResponse.json(
        { error: 'deploymentId and userId are required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Authenticate
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get caller's organization
    const { data: callerData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!callerData?.organization_id) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    const organizationId = callerData.organization_id;
    const serviceClient = createServiceClient();

    // Look up the original deployment and verify it belongs to this org
    const { data: deployment } = await serviceClient
      .from('signature_deployments')
      .select('id, template_id, organization_id')
      .eq('id', deploymentId)
      .single();

    if (!deployment || deployment.organization_id !== organizationId) {
      return NextResponse.json({ error: 'Deployment not found' }, { status: 404 });
    }

    // Look up the target user and verify they belong to this org
    const { data: targetUser } = await serviceClient
      .from('users')
      .select('id, email, first_name, last_name, department, source, title, phone, mobile, calendly_url, linkedin_url, twitter_url, github_url, personal_website, instagram_url, facebook_url, youtube_url')
      .eq('id', userId)
      .eq('organization_id', organizationId)
      .single();

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get the template
    const { data: template } = await serviceClient
      .from('signature_templates')
      .select('*')
      .eq('id', deployment.template_id)
      .eq('organization_id', organizationId)
      .single();

    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    // Set up Google/Microsoft auth
    let googleAuth: any = null;
    let useServiceAccount = false;
    try {
      googleAuth = await createOrgGoogleClient(organizationId);
    } catch (err: any) {
      if (err.message === 'MARKETPLACE_AUTH') {
        useServiceAccount = true;
      } else if (err.message === 'Google Workspace not connected') {
        return NextResponse.json(
          { error: 'No email provider connected' },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { error: err.message || 'Failed to connect to email provider' },
          { status: 400 }
        );
      }
    }

    // Render signature HTML
    const renderContext = {
      user: {
        firstName: targetUser.first_name || '',
        lastName: targetUser.last_name || '',
        email: targetUser.email || '',
        title: targetUser.title || '',
        department: targetUser.department || '',
        phone: targetUser.phone || '',
        mobile: targetUser.mobile || '',
        calendlyUrl: targetUser.calendly_url || '',
        linkedinUrl: targetUser.linkedin_url || '',
        twitterUrl: targetUser.twitter_url || '',
        githubUrl: targetUser.github_url || '',
        personalWebsite: targetUser.personal_website || '',
        instagramUrl: targetUser.instagram_url || '',
        facebookUrl: targetUser.facebook_url || '',
        youtubeUrl: targetUser.youtube_url || '',
      },
      organization: { name: '' },
      tracking: {
        userId: targetUser.id,
        templateId: deployment.template_id,
        enabled: true,
      },
    };

    const { html } = await renderSignatureToHtml(template.blocks, renderContext);

    // Resolve disclaimers
    let finalHtml = html;
    const { data: orgData } = await serviceClient
      .from('organizations')
      .select('domain, industry, parent_organization_id')
      .eq('id', organizationId)
      .single();

    try {
      const disclaimerResult = await resolveDisclaimersForUser(
        {
          userId: targetUser.id,
          userEmail: targetUser.email,
          userDepartment: targetUser.department || undefined,
          userSource: targetUser.source || undefined,
          organizationId,
          organizationDomain: orgData?.domain || undefined,
          organizationIndustry: orgData?.industry || undefined,
        },
        orgData?.parent_organization_id || null
      );
      if (disclaimerResult.combinedHtml) {
        finalHtml += disclaimerResult.combinedHtml;
      }
    } catch (err) {
      console.error(`Disclaimer resolution failed for ${targetUser.email}:`, err);
    }

    // Deploy signature
    let deployStatus = 'completed';
    let errorMessage: string | null = null;

    try {
      if (useServiceAccount) {
        await setSignatureWithServiceAccount(targetUser.email, finalHtml);
      } else {
        await setGmailSignatureWithClient(googleAuth, targetUser.email, finalHtml);
      }
    } catch (err: any) {
      console.error(`Retry deployment failed for ${targetUser.email}:`, err);
      deployStatus = 'failed';
      errorMessage = err?.message || 'Unknown error';
    }

    // Update the existing user_deployment_history record for this deployment+user,
    // or insert a new one if none exists
    const { data: existingHistory } = await serviceClient
      .from('user_deployment_history')
      .select('id')
      .eq('deployment_id', deploymentId)
      .eq('user_id', userId)
      .order('deployed_at', { ascending: false })
      .limit(1)
      .single();

    if (existingHistory) {
      await serviceClient
        .from('user_deployment_history')
        .update({
          status: deployStatus,
          error_message: errorMessage,
          deployed_at: new Date().toISOString(),
        })
        .eq('id', existingHistory.id);
    } else {
      await serviceClient
        .from('user_deployment_history')
        .insert({
          organization_id: organizationId,
          user_id: userId,
          deployment_id: deploymentId,
          template_id: deployment.template_id,
          status: deployStatus,
          error_message: errorMessage,
          deployed_at: new Date().toISOString(),
        });
    }

    // Update parent deployment counts
    if (deployStatus === 'completed') {
      // Recount from history to stay accurate
      const { count: successCount } = await serviceClient
        .from('user_deployment_history')
        .select('*', { count: 'exact', head: true })
        .eq('deployment_id', deploymentId)
        .eq('status', 'completed');

      const { count: failCount } = await serviceClient
        .from('user_deployment_history')
        .select('*', { count: 'exact', head: true })
        .eq('deployment_id', deploymentId)
        .eq('status', 'failed');

      await serviceClient
        .from('signature_deployments')
        .update({
          successful_count: successCount || 0,
          failed_count: failCount || 0,
          status: (failCount || 0) === 0 ? 'completed' : 'completed',
        })
        .eq('id', deploymentId);
    }

    return NextResponse.json({
      success: deployStatus === 'completed',
      status: deployStatus,
      errorMessage,
    });
  } catch (err: any) {
    console.error('Retry deployment error:', err);

    await logException(err, {
      route: '/api/deployments/retry-user',
      method: 'POST',
      errorType: 'deployment_error',
      metadata: { deploymentId: requestBody?.deploymentId, userId: requestBody?.userId },
    });

    return NextResponse.json(
      { error: 'Retry deployment failed' },
      { status: 500 }
    );
  }
}
