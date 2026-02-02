// Template block types matching the actual database structure
interface TemplateBlock {
  id: string;
  type: string;
  content: any;
}

interface RenderContext {
  user: {
    firstName?: string;
    lastName?: string;
    email?: string;
    title?: string;
    department?: string;
    phone?: string;
    mobile?: string;
  };
  organization: {
    name?: string;
  };
}

/**
 * Renders signature blocks to email-safe HTML
 * Uses simple table-based HTML for maximum email client compatibility
 */
export async function renderSignatureToHtml(
  blocks: TemplateBlock[],
  context: RenderContext
): Promise<{ html: string; errors: string[] }> {
  try {
    const bodyContent = blocks.map((block) => blockToHtml(block, context)).join('');
    
    const html = `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #333333;">
        <tbody>
          ${bodyContent}
        </tbody>
      </table>
    `;

    return {
      html: html.trim(),
      errors: [],
    };
  } catch (error: any) {
    console.error('Error rendering signature:', error);
    return {
      html: '',
      errors: [error.message || 'Failed to render signature'],
    };
  }
}

function blockToHtml(block: TemplateBlock, context: RenderContext): string {
  const content = block.content;
  
  switch (block.type) {
    case 'text':
      return renderTextBlock(content, context);
    case 'image':
      return renderImageBlock(content);
    case 'divider':
      return renderDividerBlock(content);
    case 'spacer':
      return renderSpacerBlock(content);
    case 'social':
      return renderSocialBlock(content);
    case 'contact-info':
      return renderContactInfoBlock(content, context);
    case 'button':
      return renderButtonBlock(content);
    case 'banner':
      return renderBannerBlock(content);
    case 'html':
      return renderHtmlBlock(content);
    default:
      return '';
  }
}

function replacePlaceholders(text: string, context: RenderContext): string {
  const { user, organization } = context;
  
  let result = text
    .replace(/\{\{first_name\}\}/gi, user.firstName || '')
    .replace(/\{\{last_name\}\}/gi, user.lastName || '')
    .replace(/\{\{full_name\}\}/gi, [user.firstName, user.lastName].filter(Boolean).join(' '))
    .replace(/\{\{email\}\}/gi, user.email || '')
    .replace(/\{\{phone\}\}/gi, user.phone || '')
    .replace(/\{\{mobile\}\}/gi, user.mobile || '')
    .replace(/\{\{job_title\}\}/gi, user.title || '')
    .replace(/\{\{department\}\}/gi, user.department || '')
    .replace(/\{\{company\}\}/gi, organization.name || '')
    // Remove any remaining unresolved placeholders
    .replace(/\{\{[^}]+\}\}/gi, '');
  
  return result.trim();
}

function renderTextBlock(content: any, context: RenderContext): string {
  const text = replacePlaceholders(content.text || '', context);
  const fontSize = content.fontSize || 14;
  const color = content.color || '#333333';
  const fontWeight = content.fontWeight || 'normal';
  const fontStyle = content.fontStyle || 'normal';
  const align = content.align || 'left';

  return `
    <tr>
      <td style="font-size: ${fontSize}px; color: ${color}; font-weight: ${fontWeight}; font-style: ${fontStyle}; text-align: ${align}; padding: 2px 0;">
        ${text}
      </td>
    </tr>
  `;
}

function renderImageBlock(content: any): string {
  const src = content.src || '';
  const alt = content.alt || '';
  const width = content.width ? `width="${content.width}"` : '';
  const link = content.link;

  if (!src) return '';

  const img = `<img src="${src}" alt="${alt}" ${width} style="display: block; max-width: 100%;" />`;
  
  return `
    <tr>
      <td style="padding: 4px 0;">
        ${link ? `<a href="${link}">${img}</a>` : img}
      </td>
    </tr>
  `;
}

function renderDividerBlock(content: any): string {
  const color = content.color || '#cccccc';
  const thickness = content.width || 1;

  // Gmail-safe divider using a colored table cell instead of border
  // This approach works better across email clients
  return `
    <tr>
      <td style="padding: 10px 0;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
          <tr>
            <td style="background-color: ${color}; height: ${thickness}px; line-height: ${thickness}px; font-size: ${thickness}px;">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function renderSpacerBlock(content: any): string {
  const height = content.height || 20;

  return `
    <tr>
      <td style="height: ${height}px; line-height: ${height}px;">&nbsp;</td>
    </tr>
  `;
}

function renderSocialBlock(content: any): string {
  const platforms = content.platforms || [];
  
  if (platforms.length === 0) return '';

  const links = platforms
    .map((p: any) => {
      if (!p.url) return '';
      const name = p.type.charAt(0).toUpperCase() + p.type.slice(1);
      return `<a href="${p.url}" style="margin: 0 8px; color: #0066cc; text-decoration: none;">${name}</a>`;
    })
    .filter(Boolean)
    .join('');

  return `
    <tr>
      <td style="padding: 4px 0;">
        ${links}
      </td>
    </tr>
  `;
}

function renderContactInfoBlock(content: any, context: RenderContext): string {
  const items: string[] = [];
  
  if (content.email) {
    const email = replacePlaceholders(content.email, context);
    if (email) {
      items.push(`<a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>`);
    }
  }
  if (content.phone) {
    const phone = replacePlaceholders(content.phone, context);
    if (phone) {
      items.push(`<a href="tel:${phone}" style="color: #0066cc; text-decoration: none;">${phone}</a>`);
    }
  }
  if (content.website) {
    const website = replacePlaceholders(content.website, context);
    if (website) {
      items.push(`<a href="${website}" style="color: #0066cc; text-decoration: none;">${website}</a>`);
    }
  }
  if (content.address) {
    const address = replacePlaceholders(content.address, context);
    if (address) {
      items.push(address);
    }
  }

  if (items.length === 0) return '';

  return `
    <tr>
      <td style="padding: 4px 0; font-size: 12px; color: #666666;">
        ${items.join(' | ')}
      </td>
    </tr>
  `;
}

function renderButtonBlock(content: any): string {
  const text = content.text || 'Click Here';
  const url = content.url || '#';
  const bgColor = content.backgroundColor || '#0066cc';
  const textColor = content.textColor || '#ffffff';
  const borderRadius = content.borderRadius || 4;

  return `
    <tr>
      <td style="padding: 8px 0;">
        <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: ${bgColor}; color: ${textColor}; text-decoration: none; border-radius: ${borderRadius}px; font-weight: bold;">
          ${text}
        </a>
      </td>
    </tr>
  `;
}

function renderBannerBlock(content: any): string {
  const src = content.src || '';
  const alt = content.alt || 'Banner';
  const link = content.link;
  const width = content.width ? `width="${content.width}"` : '';

  if (!src) return '';

  const img = `<img src="${src}" alt="${alt}" ${width} style="display: block; max-width: 100%;" />`;
  
  return `
    <tr>
      <td style="padding: 8px 0;">
        ${link ? `<a href="${link}">${img}</a>` : img}
      </td>
    </tr>
  `;
}

function renderHtmlBlock(content: any): string {
  const html = content.html || '';
  
  if (!html.trim()) return '';

  // Sanitize HTML - remove dangerous elements
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');

  return `
    <tr>
      <td style="padding: 4px 0;">
        ${sanitized}
      </td>
    </tr>
  `;
}

/**
 * Validates that rendered HTML is email-client safe
 */
export function validateEmailHtml(html: string): { valid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Check for problematic CSS
  if (html.includes('position:') || html.includes('position :')) {
    warnings.push('CSS position property may not render correctly in all email clients');
  }

  if (html.includes('display: flex') || html.includes('display:flex')) {
    warnings.push('Flexbox is not supported in many email clients');
  }

  if (html.includes('display: grid') || html.includes('display:grid')) {
    warnings.push('CSS Grid is not supported in email clients');
  }

  // Check for external fonts
  if (html.includes('@import') || html.includes('@font-face')) {
    warnings.push('Custom fonts may not load in all email clients');
  }

  return {
    valid: warnings.length === 0,
    warnings,
  };
}
