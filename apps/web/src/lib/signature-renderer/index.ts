import mjml2html from 'mjml';
import type { SignatureBlock, User, Organization } from '@esm/shared';
import { EMAIL_SAFE_FONTS, DEFAULT_SIGNATURE_STYLES, SOCIAL_PLATFORMS } from '@esm/shared';

interface RenderContext {
  user: Partial<User>;
  organization: Partial<Organization>;
}

/**
 * Renders signature blocks to email-safe HTML using MJML
 */
export function renderSignatureToHtml(
  blocks: SignatureBlock[],
  context: RenderContext
): { html: string; errors: string[] } {
  const mjmlContent = blocksToMjml(blocks, context);
  
  const result = mjml2html(mjmlContent, {
    validationLevel: 'soft',
    minify: true,
  });

  return {
    html: result.html,
    errors: result.errors?.map((e) => e.message) || [],
  };
}

function blocksToMjml(blocks: SignatureBlock[], context: RenderContext): string {
  const bodyContent = blocks.map((block) => blockToMjml(block, context)).join('\n');

  return `
    <mjml>
      <mj-body width="600px">
        <mj-section padding="0">
          <mj-column>
            ${bodyContent}
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `;
}

function blockToMjml(block: SignatureBlock, context: RenderContext): string {
  switch (block.type) {
    case 'text':
      return renderTextBlock(block);
    case 'image':
      return renderImageBlock(block);
    case 'variable':
      return renderVariableBlock(block, context);
    case 'banner':
      return renderBannerBlock(block);
    case 'disclaimer':
      return renderDisclaimerBlock(block);
    case 'divider':
      return renderDividerBlock(block);
    case 'socialLinks':
      return renderSocialLinksBlock(block);
    case 'spacer':
      return renderSpacerBlock(block);
    default:
      return '';
  }
}

function renderTextBlock(block: { content: string; styles?: Record<string, unknown> }): string {
  const styles = block.styles || {};
  const fontSize = styles.fontSize || DEFAULT_SIGNATURE_STYLES.fontSize;
  const color = styles.color || DEFAULT_SIGNATURE_STYLES.color;
  const fontFamily = styles.fontFamily || DEFAULT_SIGNATURE_STYLES.fontFamily;

  return `
    <mj-text 
      font-size="${fontSize}px" 
      color="${color}" 
      font-family="${fontFamily}"
      padding="2px 0"
    >
      ${block.content}
    </mj-text>
  `;
}

function renderImageBlock(block: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  link?: string;
}): string {
  const imgTag = `
    <mj-image 
      src="${block.src}" 
      alt="${block.alt || ''}"
      ${block.width ? `width="${block.width}px"` : ''}
      ${block.link ? `href="${block.link}"` : ''}
      padding="4px 0"
    />
  `;
  return imgTag;
}

function renderVariableBlock(
  block: { variable: string; fallback?: string; prefix?: string; suffix?: string; styles?: Record<string, unknown> },
  context: RenderContext
): string {
  const value = resolveVariable(block.variable, context) || block.fallback || '';
  if (!value) return '';

  const content = `${block.prefix || ''}${value}${block.suffix || ''}`;
  const styles = block.styles || {};
  const fontSize = styles.fontSize || DEFAULT_SIGNATURE_STYLES.fontSize;
  const color = styles.color || DEFAULT_SIGNATURE_STYLES.color;

  return `
    <mj-text 
      font-size="${fontSize}px" 
      color="${color}"
      padding="2px 0"
    >
      ${content}
    </mj-text>
  `;
}

function resolveVariable(variable: string, context: RenderContext): string | undefined {
  const { user, organization } = context;

  switch (variable) {
    case 'firstName':
      return user.firstName;
    case 'lastName':
      return user.lastName;
    case 'fullName':
      return [user.firstName, user.lastName].filter(Boolean).join(' ');
    case 'email':
      return user.email;
    case 'title':
      return user.title;
    case 'department':
      return user.department;
    case 'phone':
      return user.phone;
    case 'mobile':
      return user.mobile;
    case 'company':
      return organization.name;
    case 'avatar':
      return user.avatarUrl;
    default:
      return undefined;
  }
}

function renderBannerBlock(block: {
  imageUrl: string;
  link?: string;
  alt?: string;
  startDate?: Date;
  endDate?: Date;
}): string {
  // Check date range if specified
  const now = new Date();
  if (block.startDate && new Date(block.startDate) > now) return '';
  if (block.endDate && new Date(block.endDate) < now) return '';

  return `
    <mj-image 
      src="${block.imageUrl}" 
      alt="${block.alt || 'Banner'}"
      ${block.link ? `href="${block.link}"` : ''}
      padding="8px 0"
    />
  `;
}

function renderDisclaimerBlock(block: { content: string }): string {
  return `
    <mj-text 
      font-size="10px" 
      color="#666666"
      padding="8px 0 0 0"
    >
      ${block.content}
    </mj-text>
  `;
}

function renderDividerBlock(block: { color?: string; thickness?: number }): string {
  return `
    <mj-divider 
      border-color="${block.color || DEFAULT_SIGNATURE_STYLES.dividerColor}" 
      border-width="${block.thickness || 1}px"
      padding="4px 0"
    />
  `;
}

function renderSocialLinksBlock(block: {
  links: Array<{ platform: string; url: string }>;
  iconSize?: number;
}): string {
  const iconSize = block.iconSize || 24;
  
  const socialIcons = block.links
    .map((link) => {
      const platform = SOCIAL_PLATFORMS[link.platform as keyof typeof SOCIAL_PLATFORMS];
      if (!platform) return '';
      
      // Using placeholder icons - in production, use actual hosted icon URLs
      return `
        <mj-social-element 
          name="${link.platform}" 
          href="${link.url}"
          icon-size="${iconSize}px"
          padding="0 4px"
        />
      `;
    })
    .join('');

  return `
    <mj-social 
      font-size="12px" 
      icon-size="${iconSize}px" 
      mode="horizontal"
      padding="4px 0"
    >
      ${socialIcons}
    </mj-social>
  `;
}

function renderSpacerBlock(block: { height: number }): string {
  return `<mj-spacer height="${block.height}px" />`;
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
