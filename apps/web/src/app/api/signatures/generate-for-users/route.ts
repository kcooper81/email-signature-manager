import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { renderSignatureToHtml } from '@/lib/signature-renderer';
import { logException } from '@/lib/error-logging';
import { resolveDisclaimersForUser } from '@/lib/disclaimer-engine';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { templateId, userIds } = await request.json();

    if (!templateId || !userIds || !Array.isArray(userIds)) {
      return NextResponse.json(
        { error: 'Missing required fields: templateId, userIds' },
        { status: 400 }
      );
    }

    // Get organization info FIRST for security
    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id, organizations(name)')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Get the signature template with blocks - FILTERED BY ORGANIZATION
    const { data: template, error: templateError } = await supabase
      .from('signature_templates')
      .select('*')
      .eq('id', templateId)
      .eq('organization_id', currentUser.organization_id)
      .single();

    if (templateError) {
      console.error('Template fetch error:', templateError);
      return NextResponse.json(
        { error: `Signature template not found: ${templateError.message}` },
        { status: 404 }
      );
    }

    if (!template) {
      return NextResponse.json(
        { error: 'Signature template not found' },
        { status: 404 }
      );
    }

    const organizationName = (currentUser.organizations as any)?.name || '';

    // Get org details for disclaimer context
    const { data: orgData } = await supabase
      .from('organizations')
      .select('domain, industry, parent_organization_id')
      .eq('id', currentUser.organization_id)
      .single();

    // Get all selected users
    const { data: selectedUsers, error: usersError } = await supabase
      .from('users')
      .select('*')
      .in('id', userIds)
      .eq('organization_id', currentUser.organization_id);

    if (usersError || !selectedUsers) {
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      );
    }

    // Get blocks from the template
    const blocks = (template.blocks as any[]) || [];
    
    if (blocks.length === 0) {
      return NextResponse.json(
        { error: 'Template has no signature blocks' },
        { status: 400 }
      );
    }

    // Generate personalized signatures for each user
    const signatures = await Promise.all(
      selectedUsers.map(async (selectedUser) => {
        const context = {
          user: {
            firstName: selectedUser.first_name || '',
            lastName: selectedUser.last_name || '',
            email: selectedUser.email,
            title: selectedUser.title || '',
            department: selectedUser.department || '',
            phone: selectedUser.phone || '',
            mobile: selectedUser.mobile || '',
            calendlyUrl: selectedUser.calendly_url || '',
            linkedinUrl: selectedUser.linkedin_url || '',
            twitterUrl: selectedUser.twitter_url || '',
            githubUrl: selectedUser.github_url || '',
            personalWebsite: selectedUser.personal_website || '',
            instagramUrl: selectedUser.instagram_url || '',
            facebookUrl: selectedUser.facebook_url || '',
            youtubeUrl: selectedUser.youtube_url || '',
          },
          organization: {
            name: organizationName,
          },
        };

        const { html } = await renderSignatureToHtml(blocks, context);

        // Resolve and append disclaimers
        let finalHtml = html;
        try {
          const disclaimerResult = await resolveDisclaimersForUser(
            {
              userId: selectedUser.id,
              userEmail: selectedUser.email,
              userDepartment: selectedUser.department || undefined,
              userSource: selectedUser.source || undefined,
              organizationId: currentUser.organization_id,
              organizationDomain: orgData?.domain || undefined,
              organizationIndustry: orgData?.industry || undefined,
            },
            orgData?.parent_organization_id || null
          );
          if (disclaimerResult.combinedHtml) {
            finalHtml += disclaimerResult.combinedHtml;
          }
        } catch (disclaimerErr) {
          console.error(`Disclaimer resolution failed for ${selectedUser.email}:`, disclaimerErr);
        }

        return {
          userId: selectedUser.id,
          userName: `${selectedUser.first_name || ''} ${selectedUser.last_name || ''}`.trim() || selectedUser.email,
          email: selectedUser.email,
          html: finalHtml,
        };
      })
    );

    return NextResponse.json({
      success: true,
      signatures,
      templateName: template.name,
    });
  } catch (error) {
    console.error('Signature generation error:', error);
    
    await logException(error, {
      route: '/api/signatures/generate-for-users',
      method: 'POST',
      errorType: 'api_error',
    });

    return NextResponse.json(
      { error: 'Failed to generate signatures' },
      { status: 500 }
    );
  }
}
