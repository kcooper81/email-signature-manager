import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { renderSignatureToHtml } from '@/lib/signature-renderer';
import type { SignatureBlock } from '@/components/templates/types';

/**
 * Returns the signature that has been deployed to the currently authenticated
 * user, rendered on demand from their most recent successful deployment's
 * template + their current profile data.
 *
 * Rendered per-user HTML is not persisted anywhere, so we re-render it here.
 * Returns { signature: null } when the user has no deployed signature yet,
 * which the UI shows as an explicit empty state.
 */
export async function GET() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select(
        'id, organization_id, first_name, last_name, email, title, department, phone, mobile, calendly_url, linkedin_url, twitter_url, github_url, personal_website, instagram_url, facebook_url, youtube_url, google_booking_url'
      )
      .eq('auth_id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Most recent successful deployment for this user → which template they got.
    const { data: deployment } = await supabase
      .from('user_deployment_history')
      .select('template_id, deployed_at')
      .eq('user_id', userData.id)
      .in('status', ['completed', 'success'])
      .order('deployed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!deployment?.template_id) {
      return NextResponse.json({ signature: null });
    }

    // Load the template, scoped to the user's organization.
    const { data: template } = await supabase
      .from('signature_templates')
      .select('name, blocks')
      .eq('id', deployment.template_id)
      .eq('organization_id', userData.organization_id)
      .maybeSingle();

    if (!template?.blocks) {
      return NextResponse.json({ signature: null });
    }

    // Org name for the render context.
    const { data: org } = await supabase
      .from('organizations')
      .select('name')
      .eq('id', userData.organization_id)
      .maybeSingle();

    const { html } = await renderSignatureToHtml(template.blocks as SignatureBlock[], {
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
        googleBookingUrl: userData.google_booking_url || '',
      },
      organization: { name: org?.name || '' },
      tracking: {
        userId: userData.id,
        templateId: deployment.template_id,
        enabled: false,
      },
    });

    return NextResponse.json({
      signature: { html, templateName: template.name || 'Email Signature' },
    });
  } catch (error) {
    console.error('Error rendering profile signature:', error);
    return NextResponse.json({ error: 'Failed to render signature' }, { status: 500 });
  }
}
