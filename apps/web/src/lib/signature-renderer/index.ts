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
    calendlyUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    githubUrl?: string;
    personalWebsite?: string;
    instagramUrl?: string;
    facebookUrl?: string;
    youtubeUrl?: string;
    googleBookingUrl?: string;
  };
  organization: {
    name?: string;
  };
  oooStatus?: {
    isOutOfOffice: boolean;
    dateRange?: string;
    message?: string;
    bannerSettings?: {
      backgroundColor?: string;
      textColor?: string;
      showReturnDate?: boolean;
    };
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
    
    // Render OOO banner if user is out of office
    const oooBanner = context.oooStatus?.isOutOfOffice 
      ? renderOOOBanner(context.oooStatus)
      : '';
    
    // Add dark mode support with color-scheme and media queries
    const html = `
      <div style="color-scheme: light dark;">
        ${oooBanner}
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

/**
 * Renders an out-of-office banner for the signature
 */
function renderOOOBanner(oooStatus: NonNullable<RenderContext['oooStatus']>): string {
  const bgColor = oooStatus.bannerSettings?.backgroundColor || '#FEF3C7';
  const textColor = oooStatus.bannerSettings?.textColor || '#92400E';
  const showReturnDate = oooStatus.bannerSettings?.showReturnDate !== false;
  
  const message = oooStatus.message || 'I am currently out of office and will respond when I return.';
  const dateInfo = showReturnDate && oooStatus.dateRange 
    ? ` (${oooStatus.dateRange})`
    : '';
  
  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 12px;">
      <tr>
        <td style="background-color: ${bgColor}; padding: 10px 14px; border-radius: 6px; border-left: 4px solid ${textColor};">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="font-family: Arial, sans-serif; font-size: 13px; color: ${textColor}; line-height: 1.4;">
                <strong style="display: block; margin-bottom: 2px;">🌴 Out of Office${dateInfo}</strong>
                <span style="font-size: 12px;">${message}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
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
    case 'disclaimer':
      return renderDisclaimerBlock(content);
    case 'compliance':
      return renderComplianceBlock(content);
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
    .replace(/\{\{company\}\}/gi, organization.name || '');
  
  // Personal link replacements (per-user URLs)
  result = result
    .replace(/\{\{calendly_url\}\}/gi, user.calendlyUrl || '')
    .replace(/\{\{calendly_link\}\}/gi, user.calendlyUrl || '') // Alias for backwards compatibility
    .replace(/\{\{linkedin_url\}\}/gi, user.linkedinUrl || '')
    .replace(/\{\{twitter_url\}\}/gi, user.twitterUrl || '')
    .replace(/\{\{github_url\}\}/gi, user.githubUrl || '')
    .replace(/\{\{personal_website\}\}/gi, user.personalWebsite || '')
    .replace(/\{\{instagram_url\}\}/gi, user.instagramUrl || '')
    .replace(/\{\{facebook_url\}\}/gi, user.facebookUrl || '')
    .replace(/\{\{youtube_url\}\}/gi, user.youtubeUrl || '')
    .replace(/\{\{google_booking_url\}\}/gi, user.googleBookingUrl || '')
    .replace(/\{\{booking_url\}\}/gi, user.googleBookingUrl || user.calendlyUrl || '');
  
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

function renderDisclaimerBlock(content: any): string {
  const text = content.text || '';
  if (!text.trim()) return '';

  const fontSize = content.fontSize || 11;
  const color = content.color || '#666666';
  const backgroundColor = content.backgroundColor || 'transparent';
  const padding = content.padding || 8;

  // Adapt color for dark mode
  const darkModeColor = (color === '#666666' || color === '#333333') ? '#a0a0a0' : color;

  return `
    <tr>
      <td class="disclaimer-block" style="padding: ${padding}px; font-size: ${fontSize}px; color: ${color}; background-color: ${backgroundColor}; font-style: italic; line-height: 1.3;">
        ${text}
      </td>
    </tr>
    <style>
      @media (prefers-color-scheme: dark) {
        .disclaimer-block { color: ${darkModeColor} !important; }
      }
    </style>
  `;
}

function renderComplianceBlock(content: any): string {
  const fields = content.fields || {};
  const industryType = content.industryType || 'general';
  const fontSize = content.fontSize || 11;
  const color = content.color || '#666666';

  // Skip rendering for general industry with no specific compliance
  if (industryType === 'general') return '';

  // Adapt color for dark mode
  const darkModeColor = (color === '#666666' || color === '#333333') ? '#a0a0a0' : color;

  let complianceHtml = '';

  switch (industryType) {
    case 'legal':
      if (fields.credentials) complianceHtml += `<div style="font-weight: bold;">${fields.credentials}</div>`;
      if (fields.barNumber) complianceHtml += `<div>Bar Number: ${fields.barNumber}</div>`;
      if (fields.barState) complianceHtml += `<div>Licensed in ${fields.barState}</div>`;
      if (fields.firmName) complianceHtml += `<div>${fields.firmName}</div>`;
      if (fields.disclaimer) {
        complianceHtml += `<div style="margin-top: 8px; padding: 8px; background-color: #f9fafb; border-left: 3px solid #6b7280; font-size: ${fontSize - 2}px;">${fields.disclaimer}</div>`;
      }
      break;

    case 'healthcare':
      if (fields.credentials) complianceHtml += `<div style="font-weight: bold;">${fields.credentials}</div>`;
      if (fields.practiceName) complianceHtml += `<div>${fields.practiceName}</div>`;
      if (fields.npiNumber) complianceHtml += `<div>NPI: ${fields.npiNumber}</div>`;
      if (fields.licenseNumber) {
        complianceHtml += `<div>License: ${fields.licenseNumber}${fields.licenseState ? ` (${fields.licenseState})` : ''}</div>`;
      }
      if (fields.hipaaDisclaimer) {
        complianceHtml += `<div style="margin-top: 8px; padding: 8px; background-color: #eff6ff; border-left: 3px solid #3b82f6; font-size: ${fontSize - 2}px;">${fields.hipaaDisclaimer}</div>`;
      }
      break;

    case 'finance':
      if (fields.credentials) complianceHtml += `<div style="font-weight: bold;">${fields.credentials}</div>`;
      if (fields.firmName) complianceHtml += `<div>${fields.firmName}</div>`;
      if (fields.brokerDealerName) complianceHtml += `<div>Securities offered through ${fields.brokerDealerName}</div>`;
      if (fields.riaName) complianceHtml += `<div>Investment advisory services through ${fields.riaName}</div>`;
      if (fields.memberFINRASIPC) complianceHtml += `<div style="font-style: italic;">Member FINRA/SIPC</div>`;
      if (fields.crdNumber) complianceHtml += `<div>CRD: ${fields.crdNumber}</div>`;
      if (fields.secNumber) complianceHtml += `<div>SEC: ${fields.secNumber}</div>`;
      if (fields.licenseNumber) complianceHtml += `<div>License: ${fields.licenseNumber}</div>`;
      if (fields.disclaimer) {
        complianceHtml += `<div style="margin-top: 8px; padding: 8px; background-color: #f0fdf4; border-left: 3px solid #10b981; font-size: ${fontSize - 2}px;">${fields.disclaimer}</div>`;
      }
      break;

    case 'real_estate':
      if (fields.designations) complianceHtml += `<div style="font-weight: bold;">${fields.designations}</div>`;
      if (fields.brokerageName) complianceHtml += `<div>${fields.brokerageName}</div>`;
      if (fields.licenseNumber) {
        complianceHtml += `<div>License: ${fields.licenseNumber}${fields.licenseState ? ` (${fields.licenseState})` : ''}</div>`;
      }
      if (fields.dreNumber) complianceHtml += `<div>DRE: ${fields.dreNumber}</div>`;
      if (fields.mlsNumber) complianceHtml += `<div>MLS: ${fields.mlsNumber}</div>`;
      if (fields.equalHousingLogo) {
        complianceHtml += `
          <div style="margin-top: 8px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width: 24px; height: 24px; background-color: #3b82f6; text-align: center; vertical-align: middle; color: white; font-weight: bold; font-size: 12px;">=</td>
                <td style="padding-left: 8px; font-size: ${fontSize - 2}px;">Equal Housing Opportunity</td>
              </tr>
            </table>
          </div>
        `;
      }
      break;
  }

  if (!complianceHtml) return '';

  return `
    <tr>
      <td class="compliance-block" style="padding: 8px 0; font-size: ${fontSize}px; color: ${color};">
        ${complianceHtml}
      </td>
    </tr>
    <style>
      @media (prefers-color-scheme: dark) {
        .compliance-block { color: ${darkModeColor} !important; }
      }
    </style>
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
