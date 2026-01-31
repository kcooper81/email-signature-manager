import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { setGmailSignature } from '@/lib/google/gmail';
import { renderSignatureToHtml } from '@/lib/signature-renderer';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { templateId } = await request.json();

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

    // Get user's organization
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.organization_id) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Get the template
    const { data: template } = await supabase
      .from('signature_templates')
      .select('*')
      .eq('id', templateId)
      .eq('organization_id', userData.organization_id)
      .single();

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Get Google connection
    const { data: connection } = await supabase
      .from('provider_connections')
      .select('*')
      .eq('organization_id', userData.organization_id)
      .eq('provider', 'google')
      .eq('is_active', true)
      .single();

    if (!connection) {
      return NextResponse.json(
        { error: 'Google Workspace not connected' },
        { status: 400 }
      );
    }

    // For MVP, deploy to the current user only
    // In production, you'd fetch all users from Google Directory
    const targetUsers = [{ email: user.email, name: user.user_metadata?.full_name || user.email }];

    // Create deployment record
    const { data: deployment, error: deploymentError } = await supabase
      .from('signature_deployments')
      .insert({
        organization_id: userData.organization_id,
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
        { error: 'Failed to create deployment' },
        { status: 500 }
      );
    }

    // Process each user
    let successCount = 0;
    let failCount = 0;

    for (const targetUser of targetUsers) {
      try {
        // Render signature with user data
        const userData = {
          first_name: targetUser.name?.split(' ')[0] || '',
          last_name: targetUser.name?.split(' ').slice(1).join(' ') || '',
          full_name: targetUser.name || '',
          email: targetUser.email || '',
          // Add more fields as needed
        };

        const signatureHtml = renderSignatureToHtml(template.blocks, userData);

        // Deploy to Gmail
        await setGmailSignature(
          connection.access_token,
          connection.refresh_token,
          targetUser.email!,
          signatureHtml
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
