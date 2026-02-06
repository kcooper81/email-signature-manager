import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logException } from '@/lib/error-logging';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current user's organization
    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    const { signatureId, userIds } = await request.json();

    if (!signatureId || !userIds || !Array.isArray(userIds)) {
      return NextResponse.json(
        { error: 'Missing required fields: signatureId, userIds' },
        { status: 400 }
      );
    }

    // Get the signature template - FILTERED BY ORGANIZATION
    const { data: template, error: templateError } = await supabase
      .from('signature_templates')
      .select('*, signature_blocks(*)')
      .eq('id', signatureId)
      .eq('organization_id', currentUser.organization_id)
      .single();

    if (templateError || !template) {
      return NextResponse.json(
        { error: 'Signature template not found' },
        { status: 404 }
      );
    }

    // Generate shareable link or send email with signature HTML
    // For now, we'll return the signature HTML that can be shared
    const signatureHtml = generateSignatureHtml(template.signature_blocks);

    // Create share records in database
    const shareRecords = userIds.map((userId: string) => ({
      signature_id: signatureId,
      shared_by: user.id,
      shared_with: userId,
      signature_html: signatureHtml,
      created_at: new Date().toISOString(),
    }));

    const { error: shareError } = await supabase
      .from('signature_shares')
      .insert(shareRecords);

    if (shareError) {
      console.error('Failed to create share records:', shareError);
    }

    return NextResponse.json({
      success: true,
      signatureHtml,
      shareCount: userIds.length,
    });
  } catch (error) {
    console.error('Signature share error:', error);
    
    await logException(error, {
      route: '/api/signatures/share',
      method: 'POST',
      errorType: 'api_error',
    });

    return NextResponse.json(
      { error: 'Failed to share signature' },
      { status: 500 }
    );
  }
}

// Helper function to generate HTML from signature blocks
function generateSignatureHtml(blocks: any[]): string {
  if (!blocks || blocks.length === 0) return '';

  let html = '<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif;">';

  blocks.forEach((block) => {
    const content = block.content;

    switch (block.type) {
      case 'text':
        html += `<tr><td style="font-size: ${content.fontSize || 14}px; color: ${content.color || '#000000'}; font-weight: ${content.fontWeight || 'normal'}; padding: 4px 0;">${content.text || ''}</td></tr>`;
        break;

      case 'image':
        html += `<tr><td style="padding: 8px 0;"><img src="${content.src || ''}" alt="${content.alt || ''}" width="${content.width || 100}" height="${content.height || 100}" style="display: block;" /></td></tr>`;
        break;

      case 'contact-info':
        const contactItems = [];
        if (content.email) contactItems.push(`<a href="mailto:${content.email}" style="color: #0066cc; text-decoration: none;">${content.email}</a>`);
        if (content.phone) contactItems.push(`<a href="tel:${content.phone}" style="color: #0066cc; text-decoration: none;">${content.phone}</a>`);
        if (content.website) contactItems.push(`<a href="${content.website}" style="color: #0066cc; text-decoration: none;">${content.website}</a>`);
        if (content.address) contactItems.push(content.address);
        
        if (contactItems.length > 0) {
          html += `<tr><td style="font-size: 12px; color: #666666; padding: 4px 0;">${contactItems.join(' | ')}</td></tr>`;
        }
        break;

      case 'social':
        if (content.platforms && content.platforms.length > 0) {
          const socialLinks = content.platforms.map((platform: any) => {
            return `<a href="${platform.url}" style="margin-right: 8px;"><img src="${getSocialIcon(platform.type)}" alt="${platform.type}" width="24" height="24" /></a>`;
          }).join('');
          html += `<tr><td style="padding: 8px 0;">${socialLinks}</td></tr>`;
        }
        break;

      case 'disclaimer':
        html += `<tr><td style="font-size: 10px; color: #999999; padding: 12px 0; border-top: 1px solid #eeeeee; margin-top: 12px;">${content.text || ''}</td></tr>`;
        break;

      case 'spacer':
        html += `<tr><td style="height: ${content.height || 12}px;"></td></tr>`;
        break;
    }
  });

  html += '</table>';
  return html;
}

function getSocialIcon(type: string): string {
  // Return placeholder icon URLs - in production, use actual hosted icons
  const icons: Record<string, string> = {
    linkedin: 'https://cdn.simpleicons.org/linkedin/0A66C2',
    twitter: 'https://cdn.simpleicons.org/twitter/1DA1F2',
    facebook: 'https://cdn.simpleicons.org/facebook/1877F2',
    instagram: 'https://cdn.simpleicons.org/instagram/E4405F',
  };
  return icons[type] || '';
}
