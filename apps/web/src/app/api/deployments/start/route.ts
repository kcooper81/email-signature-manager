import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { setGmailSignature } from '@/lib/google/gmail';
import { renderSignatureToHtml } from '@/lib/signature-renderer';
import { logException } from '@/lib/error-logging';
import { getTemplateForUserWithFallback } from '@/lib/signature-rules';
import { logDeployment } from '@/lib/audit/logger';

export const dynamic = 'force-dynamic';

// Test endpoint to verify route is accessible
export async function GET() {
  return NextResponse.json({ status: 'ok', route: 'deployments/start' });
}

export async function POST(request: NextRequest) {
  console.log('POST /api/deployments/start called');
  
  let requestBody: any = {};
  
  try {
    requestBody = await request.json();
    console.log('Request body:', requestBody);
    const { templateId, target = 'me', userIds, useRules = false, emailType = 'new', recipients = [] } = requestBody;
    
    const supabase = createClient();

    if (!templateId) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      );
    }

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Try to get user's organization from users table first
    let organizationId: string | null = null;
    
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (userData?.organization_id) {
      organizationId = userData.organization_id;
    }

    // Get Google connection - if no org from user, get it from connection
    const connectionQuery = supabase
      .from('provider_connections')
      .select('*')
      .eq('provider', 'google')
      .eq('is_active', true);

    if (organizationId) {
      connectionQuery.eq('organization_id', organizationId);
    }

    const { data: connection } = await connectionQuery.single();

    if (!connection) {
      return NextResponse.json(
        { error: 'Google Workspace not connected' },
        { status: 400 }
      );
    }

    // Use organization from connection if we didn't have it
    if (!organizationId) {
      organizationId = connection.organization_id;
    }

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Get the template - MUST be in user's organization (no fallback for security)
    const { data: template } = await supabase
      .from('signature_templates')
      .select('*')
      .eq('id', templateId)
      .eq('organization_id', organizationId)
      .single();

    if (!template) {
      console.error('Template not found or access denied:', { templateId, organizationId });
      return NextResponse.json(
        { error: 'Template not found or access denied' },
        { status: 404 }
      );
    }

    // Determine target users based on deployment target
    let targetUsers: { 
      id?: string; 
      email: string; 
      name: string; 
      firstName?: string; 
      lastName?: string;
      calendlyUrl?: string;
      linkedinUrl?: string;
      twitterUrl?: string;
      githubUrl?: string;
      personalWebsite?: string;
      instagramUrl?: string;
      facebookUrl?: string;
      youtubeUrl?: string;
    }[] = [];

    if (target === 'me') {
      // Deploy to current user only - get their user ID from the users table
      const { data: currentUserData } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', user.id)
        .single();
      
      targetUsers = [{
        id: currentUserData?.id,
        email: user.email!,
        name: user.user_metadata?.full_name || user.email!,
        firstName: user.user_metadata?.first_name,
        lastName: user.user_metadata?.last_name,
      }];
    } else if (target === 'selected' && userIds?.length > 0) {
      // Deploy to selected users
      const { data: selectedUsers } = await supabase
        .from('users')
        .select('id, email, first_name, last_name, calendly_url, linkedin_url, twitter_url, github_url, personal_website, instagram_url, facebook_url, youtube_url')
        .eq('organization_id', organizationId)
        .in('id', userIds);

      if (selectedUsers) {
        targetUsers = selectedUsers.map(u => ({
          id: u.id,
          email: u.email,
          name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.email,
          firstName: u.first_name || undefined,
          lastName: u.last_name || undefined,
          calendlyUrl: u.calendly_url || undefined,
          linkedinUrl: u.linkedin_url || undefined,
          twitterUrl: u.twitter_url || undefined,
          githubUrl: u.github_url || undefined,
          personalWebsite: u.personal_website || undefined,
          instagramUrl: u.instagram_url || undefined,
          facebookUrl: u.facebook_url || undefined,
          youtubeUrl: u.youtube_url || undefined,
        }));
      }
    } else if (target === 'all') {
      // Deploy to all users in organization
      const { data: allUsers } = await supabase
        .from('users')
        .select('id, email, first_name, last_name, calendly_url, linkedin_url, twitter_url, github_url, personal_website, instagram_url, facebook_url, youtube_url')
        .eq('organization_id', organizationId);

      if (allUsers) {
        targetUsers = allUsers.map(u => ({
          id: u.id,
          email: u.email,
          name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.email,
          firstName: u.first_name || undefined,
          lastName: u.last_name || undefined,
          calendlyUrl: u.calendly_url || undefined,
          linkedinUrl: u.linkedin_url || undefined,
          twitterUrl: u.twitter_url || undefined,
          githubUrl: u.github_url || undefined,
          personalWebsite: u.personal_website || undefined,
          instagramUrl: u.instagram_url || undefined,
          facebookUrl: u.facebook_url || undefined,
          youtubeUrl: u.youtube_url || undefined,
        }));
      }
    }

    if (targetUsers.length === 0) {
      return NextResponse.json(
        { error: 'No users to deploy to' },
        { status: 400 }
      );
    }

    // Create deployment record (without target tracking columns that may not exist)
    const { data: deployment, error: deploymentError } = await supabase
      .from('signature_deployments')
      .insert({
        organization_id: organizationId,
        template_id: templateId,
        status: 'running',
        total_users: targetUsers.length,
        successful_count: 0,
        failed_count: 0,
        initiated_by: user.id,
      })
      .select('id')
      .single();

    if (deploymentError || !deployment) {
      console.error('Failed to create deployment:', deploymentError);
      return NextResponse.json(
        { error: 'Failed to create deployment', details: deploymentError?.message },
        { status: 500 }
      );
    }

    // Process each user
    let successCount = 0;
    let failCount = 0;

    for (const targetUser of targetUsers) {
      let deploymentStatus = 'completed';
      let errorMessage: string | null = null;
      let actualTemplateId = templateId;
      let actualTemplate = template;
      
      try {
        // If useRules is enabled, evaluate rules to get the correct template for this user
        if (useRules && targetUser.id) {
          const ruleBasedTemplateId = await getTemplateForUserWithFallback(
            targetUser.id,
            organizationId,
            {
              emailType: emailType as 'new' | 'reply',
              recipients: recipients,
            }
          );
          
          if (ruleBasedTemplateId && ruleBasedTemplateId !== templateId) {
            // Fetch the rule-matched template
            const { data: ruleTemplate } = await supabase
              .from('signature_templates')
              .select('*')
              .eq('id', ruleBasedTemplateId)
              .eq('organization_id', organizationId)
              .single();
            
            if (ruleTemplate) {
              actualTemplateId = ruleBasedTemplateId;
              actualTemplate = ruleTemplate;
              console.log(`Rule matched: Using template "${ruleTemplate.name}" for user ${targetUser.email}`);
            }
          }
        }

        // Render signature with user data in RenderContext format
        const renderContext = {
          user: {
            firstName: targetUser.firstName || targetUser.name?.split(' ')[0] || '',
            lastName: targetUser.lastName || targetUser.name?.split(' ').slice(1).join(' ') || '',
            email: targetUser.email || '',
            calendlyUrl: targetUser.calendlyUrl || '',
            linkedinUrl: targetUser.linkedinUrl || '',
            twitterUrl: targetUser.twitterUrl || '',
            githubUrl: targetUser.githubUrl || '',
            personalWebsite: targetUser.personalWebsite || '',
            instagramUrl: targetUser.instagramUrl || '',
            facebookUrl: targetUser.facebookUrl || '',
            youtubeUrl: targetUser.youtubeUrl || '',
          },
          organization: {
            name: '', // Can be populated from org settings later
          },
          tracking: {
            userId: targetUser.id,
            templateId: actualTemplateId,
            enabled: true,
          },
        };

        const signatureResult = await renderSignatureToHtml(actualTemplate.blocks, renderContext);

        // Deploy to Gmail
        await setGmailSignature(
          connection.access_token,
          connection.refresh_token,
          targetUser.email!,
          signatureResult.html
        );

        successCount++;
      } catch (err: any) {
        console.error(`Failed to deploy to ${targetUser.email}:`, err);
        deploymentStatus = 'failed';
        errorMessage = err?.message || 'Unknown error';
        failCount++;
      }

      // Record per-user deployment history (if user has an id)
      if (targetUser.id) {
        await supabase
          .from('user_deployment_history')
          .insert({
            organization_id: organizationId,
            user_id: targetUser.id,
            deployment_id: deployment.id,
            template_id: actualTemplateId, // Use the actual template (rule-based or original)
            status: deploymentStatus,
            error_message: errorMessage,
            deployed_at: new Date().toISOString(),
          });
      }
    }

    // Update deployment status
    await supabase
      .from('signature_deployments')
      .update({
        status: failCount === targetUsers.length ? 'failed' : 'completed',
        successful_count: successCount,
        failed_count: failCount,
        completed_at: new Date().toISOString(),
      })
      .eq('id', deployment.id);

    // Log deployment to audit trail
    await logDeployment(
      organizationId,
      user.id,
      templateId,
      template.name,
      {
        deploymentId: deployment.id,
        target,
        totalUsers: targetUsers.length,
        successCount,
        failCount,
        useRules,
      }
    );

    return NextResponse.json({
      success: true,
      deploymentId: deployment.id,
      successCount,
      failCount,
    });
  } catch (err: any) {
    console.error('Deployment error:', err);
    
    // Log error for admin monitoring
    await logException(err, {
      route: '/api/deployments/start',
      method: 'POST',
      errorType: 'deployment_error',
      metadata: { templateId: requestBody?.templateId, target: requestBody?.target },
    });

    return NextResponse.json(
      { error: 'Deployment failed' },
      { status: 500 }
    );
  }
}
