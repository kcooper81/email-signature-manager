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
  calendly?: {
    scheduling_url?: string;
    event_types?: Array<{
      slug: string;
      scheduling_url: string;
      name: string;
    }>;
    default_event_type_uri?: string;
  };
}

/**
 * Renders signature blocks to email-safe HTML
 * Uses simple table-based HTML for maximum email client compatibility
 * Includes dark mode support via CSS media queries
 */
export async function renderSignatureToHtml(
  blocks: TemplateBlock[],
  context: RenderContext
): Promise<{ html: string; errors: string[] }> {
  try {
    const bodyContent = blocks.map((block) => blockToHtml(block, context)).join('');
    
    // Add dark mode support with color-scheme and media queries
    const html = `
      <div style="color-scheme: light dark;">
        <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #333333;">
          <tbody>
            ${bodyContent}
          </tbody>
        </table>
      </div>
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
      return renderButtonBlock(content, context);
    case 'banner':
      return renderBannerBlock(content, context);
    case 'html':
      return renderHtmlBlock(content);
    default:
      return '';
  }
}

function replacePlaceholders(text: string, context: RenderContext): string {
  const { user, organization, calendly } = context;
  
  let result = text
    .replace(/\{\{first_name\}\}/gi, user.firstName || '')
    .replace(/\{\{last_name\}\}/gi, user.lastName || '')
    .replace(/\{\{full_name\}\}/gi, [user.firstName, user.lastName].filter(Boolean).join(' '))
    .replace(/\{\{email\}\}/gi, user.email || '')
    .replace(/\{\{phone\}\}/gi, user.phone || '')
    .replace(/\{\{mobile\}\}/gi, user.mobile || '')
    .replace(/\{\{job_title\}\}/gi, user.title || '')
    .replace(/\{\{department\}\}/gi, user.department || '')
    .replace(/\{\{company\}\}/gi, organization.name || '');
  
  // Calendly link replacements
  if (calendly) {
    // Replace main Calendly link
    result = result.replace(/\{\{calendly_link\}\}/gi, calendly.scheduling_url || '');
    
    // Replace default event type link
    if (calendly.default_event_type_uri && calendly.event_types) {
      const defaultEvent = calendly.event_types.find(
        et => et.scheduling_url
      );
      result = result.replace(
        /\{\{calendly_default\}\}/gi, 
        defaultEvent?.scheduling_url || calendly.scheduling_url || ''
      );
    } else {
      result = result.replace(/\{\{calendly_default\}\}/gi, calendly.scheduling_url || '');
    }
    
    // Replace specific event type links: {{calendly_event:slug}}
    const eventTypePattern = /\{\{calendly_event:([a-zA-Z0-9_-]+)\}\}/gi;
    result = result.replace(eventTypePattern, (match, slug) => {
      if (!calendly.event_types) return '';
      const eventType = calendly.event_types.find(et => et.slug === slug);
      return eventType?.scheduling_url || '';
    });
  }
  
  // Remove any remaining unresolved placeholders
  result = result.replace(/\{\{[^}]+\}\}/gi, '');
  
  return result.trim();
}

function renderTextBlock(content: any, context: RenderContext): string {
  const text = replacePlaceholders(content.text || '', context);
  const fontSize = content.fontSize || 14;
  const color = content.color || '#333333';
  const fontWeight = content.fontWeight || 'normal';
  const fontStyle = content.fontStyle || 'normal';
  const align = content.align || 'left';

  // Adapt color for dark mode if it's a dark text color
  const darkModeColor = (color === '#333333' || color === '#000000') ? '#e5e5e5' : (color === '#666666' ? '#a0a0a0' : color);

  return `
    <tr>
      <td class="text-block" style="font-size: ${fontSize}px; color: ${color}; font-weight: ${fontWeight}; font-style: ${fontStyle}; text-align: ${align}; padding: 2px 0;">
        <span style="color: ${color};">${text}</span>
      </td>
    </tr>
    <style>
      @media (prefers-color-scheme: dark) {
        .text-block span { color: ${darkModeColor} !important; }
      }
    </style>
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
  const thickness = content.thickness || 1;
  const width = content.width || 100;

  // Adapt divider color for dark mode
  const darkModeColor = (color === '#cccccc' || color === '#e5e5e5') ? '#444444' : color;

  // Gmail-safe divider using a colored table cell instead of border
  // This approach works better across email clients
  return `
    <tr>
      <td style="padding: 10px 0;">
        <table cellpadding="0" cellspacing="0" border="0" width="${width}%" style="border-collapse: collapse;">
          <tr>
            <td class="divider-line" style="background-color: ${color}; height: ${thickness}px; line-height: ${thickness}px; font-size: ${thickness}px;">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>
    <style>
      @media (prefers-color-scheme: dark) {
        .divider-line { background-color: ${darkModeColor} !important; }
      }
    </style>
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
      return `<a href="${p.url}" class="social-link" style="margin: 0 8px; color: #0066cc; text-decoration: none;">${name}</a>`;
    })
    .filter(Boolean)
    .join('');

  return `
    <tr>
      <td style="padding: 4px 0;">
        ${links}
      </td>
    </tr>
    <style>
      @media (prefers-color-scheme: dark) {
        .social-link { color: #66b3ff !important; }
      }
    </style>
  `;
}

function renderContactInfoBlock(content: any, context: RenderContext): string {
  const items: string[] = [];
  
  if (content.email) {
    const email = replacePlaceholders(content.email, context);
    if (email) {
      items.push(`<a href="mailto:${email}" class="contact-link" style="color: #0066cc; text-decoration: none;">${email}</a>`);
    }
  }
  if (content.phone) {
    const phone = replacePlaceholders(content.phone, context);
    if (phone) {
      items.push(`<a href="tel:${phone}" class="contact-link" style="color: #0066cc; text-decoration: none;">${phone}</a>`);
    }
  }
  if (content.website) {
    const website = replacePlaceholders(content.website, context);
    if (website) {
      items.push(`<a href="${website}" class="contact-link" style="color: #0066cc; text-decoration: none;">${website}</a>`);
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
      <td class="contact-info" style="padding: 4px 0; font-size: 12px; color: #666666;">
        ${items.join(' | ')}
      </td>
    </tr>
    <style>
      @media (prefers-color-scheme: dark) {
        .contact-info { color: #a0a0a0 !important; }
        .contact-link { color: #66b3ff !important; }
      }
    </style>
  `;
}

function renderButtonBlock(content: any, context: RenderContext): string {
  const text = content.text || 'Click Here';
  const url = replacePlaceholders(content.url || '#', context);
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

function renderBannerBlock(content: any, context: RenderContext): string {
  const src = content.src || '';
  const alt = content.alt || 'Banner';
  const link = content.link ? replacePlaceholders(content.link, context) : '';
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
