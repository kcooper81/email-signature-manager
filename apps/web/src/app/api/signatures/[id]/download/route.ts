import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logException } from '@/lib/error-logging';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const signatureId = params.id;

    // Get the signature template with blocks - FILTERED BY ORGANIZATION
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

    // Sort blocks by order
    const sortedBlocks = (template.signature_blocks || []).sort(
      (a: any, b: any) => a.order - b.order
    );

    // Generate HTML
    const signatureHtml = generateSignatureHtml(sortedBlocks);

    // Return as downloadable HTML file
    return new NextResponse(signatureHtml, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="signature-${template.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html"`,
      },
    });
  } catch (error) {
    console.error('Signature download error:', error);
    
    await logException(error, {
      route: '/api/signatures/[id]/download',
      method: 'GET',
      errorType: 'api_error',
    });

    return NextResponse.json(
      { error: 'Failed to download signature' },
      { status: 500 }
    );
  }
}

function generateSignatureHtml(blocks: any[]): string {
  if (!blocks || blocks.length === 0) {
    return '<p>No signature content</p>';
  }

  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Signature</title>
</head>
<body style="margin: 0; padding: 0;">
  <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; max-width: 600px;">
    <tbody>`;

  blocks.forEach((block) => {
    const content = block.content;

    switch (block.type) {
      case 'text':
        html += `
      <tr>
        <td style="font-size: ${content.fontSize || 14}px; color: ${content.color || '#000000'}; font-weight: ${content.fontWeight || 'normal'}; padding: 4px 0;">
          ${escapeHtml(content.text || '')}
        </td>
      </tr>`;
        break;

      case 'image':
        html += `
      <tr>
        <td style="padding: 8px 0;">
          <img src="${escapeHtml(content.src || '')}" alt="${escapeHtml(content.alt || '')}" width="${content.width || 100}" height="${content.height || 100}" style="display: block; border: 0;" />
        </td>
      </tr>`;
        break;

      case 'contact-info':
        const contactItems = [];
        if (content.email) {
          contactItems.push(`<a href="mailto:${escapeHtml(content.email)}" style="color: #0066cc; text-decoration: none;">${escapeHtml(content.email)}</a>`);
        }
        if (content.phone) {
          contactItems.push(`<a href="tel:${escapeHtml(content.phone)}" style="color: #0066cc; text-decoration: none;">${escapeHtml(content.phone)}</a>`);
        }
        if (content.website) {
          contactItems.push(`<a href="${escapeHtml(content.website)}" style="color: #0066cc; text-decoration: none;">${escapeHtml(content.website)}</a>`);
        }
        if (content.address) {
          contactItems.push(escapeHtml(content.address));
        }

        if (contactItems.length > 0) {
          html += `
      <tr>
        <td style="font-size: 12px; color: #666666; padding: 4px 0;">
          ${contactItems.join(' | ')}
        </td>
      </tr>`;
        }
        break;

      case 'social':
        if (content.platforms && content.platforms.length > 0) {
          const socialLinks = content.platforms
            .map((platform: any) => {
              return `<a href="${escapeHtml(platform.url)}" style="margin-right: 8px; display: inline-block;"><img src="${getSocialIcon(platform.type)}" alt="${escapeHtml(platform.type)}" width="24" height="24" style="border: 0;" /></a>`;
            })
            .join('');
          html += `
      <tr>
        <td style="padding: 8px 0;">
          ${socialLinks}
        </td>
      </tr>`;
        }
        break;

      case 'disclaimer':
        html += `
      <tr>
        <td style="font-size: 10px; color: #999999; padding: 12px 0; border-top: 1px solid #eeeeee; margin-top: 12px;">
          ${escapeHtml(content.text || '')}
        </td>
      </tr>`;
        break;

      case 'spacer':
        html += `
      <tr>
        <td style="height: ${content.height || 12}px;"></td>
      </tr>`;
        break;

      case 'divider':
        html += `
      <tr>
        <td style="padding: 8px 0;">
          <hr style="border: 0; border-top: ${content.thickness || 1}px ${content.style || 'solid'} ${content.color || '#cccccc'}; margin: 0;" />
        </td>
      </tr>`;
        break;

      case 'button':
        html += `
      <tr>
        <td style="padding: 8px 0;">
          <a href="${escapeHtml(content.url || '#')}" style="display: inline-block; padding: 10px 20px; background-color: ${content.backgroundColor || '#0066cc'}; color: ${content.textColor || '#ffffff'}; text-decoration: none; border-radius: 4px; font-size: 14px;">
            ${escapeHtml(content.text || 'Click here')}
          </a>
        </td>
      </tr>`;
        break;
    }
  });

  html += `
    </tbody>
  </table>
</body>
</html>`;

  return html;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function getSocialIcon(type: string): string {
  const icons: Record<string, string> = {
    linkedin: 'https://cdn.simpleicons.org/linkedin/0A66C2',
    twitter: 'https://cdn.simpleicons.org/twitter/1DA1F2',
    facebook: 'https://cdn.simpleicons.org/facebook/1877F2',
    instagram: 'https://cdn.simpleicons.org/instagram/E4405F',
  };
  return icons[type] || '';
}
