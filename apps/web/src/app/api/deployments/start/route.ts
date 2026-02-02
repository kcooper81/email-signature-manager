import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { setGmailSignature } from '@/lib/google/gmail';
import { renderSignatureToHtml } from '@/lib/signature-renderer';

export const dynamic = 'force-dynamic';

// Test endpoint to verify route is accessible
export async function GET() {
  return NextResponse.json({ status: 'ok', route: 'deployments/start' });
}

export async function POST(request: NextRequest) {
  console.log('POST /api/deployments/start called');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);
    const { templateId, target = 'me', userIds } = body;
    
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

    // Get the template - try with org first, then without
    let template = null;
    
    const { data: templateWithOrg } = await supabase
      .from('signature_templates')
      .select('*')
      .eq('id', templateId)
      .eq('organization_id', organizationId)
      .single();

    if (templateWithOrg) {
      template = templateWithOrg;
    } else {
      // Fallback: try to get template without org filter (for templates created before org assignment)
      const { data: templateAny } = await supabase
        .from('signature_templates')
        .select('*')
        .eq('id', templateId)
        .single();
      
      template = templateAny;
    }

    if (!template) {
      console.error('Template not found:', { templateId, organizationId });
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Determine target users based on deployment target
    let targetUsers: { email: string; name: string; firstName?: string; lastName?: string }[] = [];

    if (target === 'me') {
      // Deploy to current user only
      targetUsers = [{
        email: user.email!,
        name: user.user_metadata?.full_name || user.email!,
        firstName: user.user_metadata?.first_name,
        lastName: user.user_metadata?.last_name,
      }];
    } else if (target === 'selected' && userIds?.length > 0) {
      // Deploy to selected users
      const { data: selectedUsers } = await supabase
        .from('users')
        .select('email, first_name, last_name')
        .eq('organization_id', organizationId)
        .in('id', userIds);

      if (selectedUsers) {
        targetUsers = selectedUsers.map(u => ({
          email: u.email,
          name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.email,
          firstName: u.first_name || undefined,
          lastName: u.last_name || undefined,
        }));
      }
    } else if (target === 'all') {
      // Deploy to all users in organization
      const { data: allUsers } = await supabase
        .from('users')
        .select('email, first_name, last_name')
        .eq('organization_id', organizationId);

      if (allUsers) {
        targetUsers = allUsers.map(u => ({
          email: u.email,
          name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.email,
          firstName: u.first_name || undefined,
          lastName: u.last_name || undefined,
        }));
      }
    }

    if (targetUsers.length === 0) {
      return NextResponse.json(
        { error: 'No users to deploy to' },
        { status: 400 }
      );
    }

    // Collect unique departments from target users for tracking
    const targetEmails = targetUsers.map(u => u.email);
    
    // Create deployment record with target info
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
        target_type: target, // 'me', 'selected', or 'all'
        target_emails: targetEmails, // Array of emails deployed to
      })
      .select('id')
      .single();

    if (deploymentError || !deployment) {
      console.error('Failed to create deployment:', deploymentError);
      return NextResponse.json(
        { error: 'Failed to create deployment' },
        { status: 500 }
      );
    }

    // Process each user
    let successCount = 0;
    let failCount = 0;

    for (const targetUser of targetUsers) {
      try {
        // Render signature with user data in RenderContext format
        const renderContext = {
          user: {
            firstName: targetUser.firstName || targetUser.name?.split(' ')[0] || '',
            lastName: targetUser.lastName || targetUser.name?.split(' ').slice(1).join(' ') || '',
            email: targetUser.email || '',
          },
          organization: {
            name: '', // Can be populated from org settings later
          },
        };

        const signatureResult = await renderSignatureToHtml(template.blocks, renderContext);

        // Deploy to Gmail
        await setGmailSignature(
          connection.access_token,
          connection.refresh_token,
          targetUser.email!,
          signatureResult.html
        );

        successCount++;
      } catch (err) {
        console.error(`Failed to deploy to ${targetUser.email}:`, err);
        failCount++;
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

    return NextResponse.json({
      success: true,
      deploymentId: deployment.id,
      successCount,
      failCount,
    });
  } catch (err) {
    console.error('Deployment error:', err);
    return NextResponse.json(
      { error: 'Deployment failed' },
      { status: 500 }
    );
  }
}
