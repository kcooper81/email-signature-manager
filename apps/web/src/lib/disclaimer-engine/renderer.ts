/**
 * Disclaimer Template Renderer
 * Renders a disclaimer template into styled HTML for appending to signatures
 */

export interface DisclaimerStyling {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  fontSize?: string;
  padding?: string;
}

const DEFAULT_STYLING: DisclaimerStyling = {
  backgroundColor: 'transparent',
  borderColor: '#e0e0e0',
  textColor: '#666666',
  fontSize: '11px',
  padding: '8px 0',
};

export function renderDisclaimerHtml(
  content: string,
  contentHtml?: string | null,
  styling?: DisclaimerStyling | null
): string {
  // Use HTML version if available, otherwise wrap plain text
  if (contentHtml) {
    return contentHtml;
  }

  const s = { ...DEFAULT_STYLING, ...styling };

  return `<div style="font-size:${s.fontSize};color:${s.textColor};background-color:${s.backgroundColor};border-top:1px solid ${s.borderColor};padding:${s.padding};margin-top:16px;">${escapeHtml(content)}</div>`;
}

export function combineDisclaimers(disclaimerHtmls: string[]): string {
  if (disclaimerHtmls.length === 0) return '';
  return disclaimerHtmls.join('');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
