import type { SignatureBlock, IndustryType } from '@/components/templates/types';

/**
 * Starter signature templates shown in the "create template" gallery so new
 * users get a professionally-structured signature in one click instead of a
 * blank/bare editor. Blocks use dynamic {{placeholders}} that resolve per user
 * at deploy time. Image/logo blocks are intentionally omitted so nothing renders
 * broken before the user adds their own assets.
 */
export interface StarterTemplate {
  id: string;
  name: string;
  description: string;
  industry: IndustryType;
  blocks: SignatureBlock[];
}

const BRAND = '#4f46e5';
const INK = '#1a1a1a';
const MUTED = '#666666';
const LINE = '#e5e5e5';

export const starterTemplates: StarterTemplate[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Name, title, and contact details with a clean divider. A safe, professional default.',
    industry: 'general',
    blocks: [
      { id: 'name', type: 'text', content: { text: '{{first_name}} {{last_name}}', fontSize: 16, fontWeight: 'bold', color: INK } },
      { id: 'title', type: 'text', content: { text: '{{job_title}}, {{company}}', fontSize: 14, fontWeight: 'normal', color: MUTED } },
      { id: 'divider', type: 'divider', content: { color: LINE, width: 100, thickness: 1, style: 'solid' } },
      { id: 'contact', type: 'contact-info', content: { email: '{{email}}', phone: '{{phone}}', website: '{{website}}', showIcons: true } },
    ],
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'A compact two-line identity with a brand accent and inline contact — great for lean teams.',
    industry: 'general',
    blocks: [
      { id: 'name', type: 'text', content: { text: '{{first_name}} {{last_name}}', fontSize: 15, fontWeight: 'bold', color: INK } },
      { id: 'title', type: 'text', content: { text: '{{job_title}} · {{company}}', fontSize: 13, fontWeight: 'normal', color: BRAND } },
      { id: 'spacer', type: 'spacer', content: { height: 6 } },
      { id: 'contact', type: 'contact-info', content: { email: '{{email}}', phone: '{{phone}}', showIcons: false } },
    ],
  },
  {
    id: 'with-social',
    name: 'Social Forward',
    description: 'Name, title, contact, and a row of social icons to drive profile visits.',
    industry: 'general',
    blocks: [
      { id: 'name', type: 'text', content: { text: '{{first_name}} {{last_name}}', fontSize: 16, fontWeight: 'bold', color: INK } },
      { id: 'title', type: 'text', content: { text: '{{job_title}}, {{company}}', fontSize: 14, fontWeight: 'normal', color: MUTED } },
      { id: 'contact', type: 'contact-info', content: { email: '{{email}}', phone: '{{phone}}', website: '{{website}}', showIcons: true } },
      { id: 'spacer', type: 'spacer', content: { height: 8 } },
      {
        id: 'social', type: 'social', content: {
          platforms: [
            { type: 'linkedin', url: '{{linkedin}}' },
            { type: 'twitter', url: '{{twitter}}' },
          ],
          displayMode: 'icons', iconSize: 20, iconColor: BRAND,
        },
      },
    ],
  },
  {
    id: 'cta-button',
    name: 'Book a Meeting',
    description: 'Identity and contact plus a prominent call-to-action button (e.g. book a call).',
    industry: 'general',
    blocks: [
      { id: 'name', type: 'text', content: { text: '{{first_name}} {{last_name}}', fontSize: 16, fontWeight: 'bold', color: INK } },
      { id: 'title', type: 'text', content: { text: '{{job_title}}, {{company}}', fontSize: 14, fontWeight: 'normal', color: MUTED } },
      { id: 'divider', type: 'divider', content: { color: LINE, width: 100, thickness: 1, style: 'solid' } },
      { id: 'contact', type: 'contact-info', content: { email: '{{email}}', phone: '{{phone}}', showIcons: true } },
      { id: 'spacer', type: 'spacer', content: { height: 10 } },
      { id: 'cta', type: 'button', content: { text: 'Book a meeting', url: '{{website}}', backgroundColor: BRAND, textColor: '#ffffff', borderRadius: 6 } },
    ],
  },
  {
    id: 'promo-banner',
    name: 'Campaign Banner',
    description: 'Standard signature with a clickable marketing banner for campaigns and promotions.',
    industry: 'general',
    blocks: [
      { id: 'name', type: 'text', content: { text: '{{first_name}} {{last_name}}', fontSize: 16, fontWeight: 'bold', color: INK } },
      { id: 'title', type: 'text', content: { text: '{{job_title}}, {{company}}', fontSize: 14, fontWeight: 'normal', color: MUTED } },
      { id: 'contact', type: 'contact-info', content: { email: '{{email}}', phone: '{{phone}}', website: '{{website}}', showIcons: true } },
      { id: 'spacer', type: 'spacer', content: { height: 10 } },
      { id: 'banner', type: 'banner', content: { src: '', alt: 'Add your campaign banner', width: 468, trackClicks: true } },
    ],
  },
  {
    id: 'legal-compliant',
    name: 'Legal / Compliance',
    description: 'Professional identity with a confidentiality disclaimer — ideal for regulated industries.',
    industry: 'legal',
    blocks: [
      { id: 'name', type: 'text', content: { text: '{{first_name}} {{last_name}}, Esq.', fontSize: 16, fontWeight: 'bold', color: INK } },
      { id: 'title', type: 'text', content: { text: '{{job_title}}, {{company}}', fontSize: 14, fontWeight: 'normal', color: MUTED } },
      { id: 'divider', type: 'divider', content: { color: LINE, width: 100, thickness: 1, style: 'solid' } },
      { id: 'contact', type: 'contact-info', content: { email: '{{email}}', phone: '{{phone}}', address: '{{address}}', showIcons: true } },
      { id: 'spacer', type: 'spacer', content: { height: 8 } },
      {
        id: 'disclaimer', type: 'disclaimer', content: {
          template: 'confidentiality',
          text: 'This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the sender immediately and delete it from your system.',
          fontSize: 11, color: '#888888',
        },
      },
    ],
  },
];

export const BLANK_STARTER_BLOCKS: SignatureBlock[] = [
  { id: '1', type: 'text', content: { text: '{{first_name}} {{last_name}}', fontSize: 16, fontWeight: 'bold', color: INK } },
  { id: '2', type: 'text', content: { text: '{{job_title}}', fontSize: 14, fontWeight: 'normal', color: MUTED } },
  { id: '3', type: 'divider', content: { color: LINE, width: 100, thickness: 1, style: 'solid' } },
  { id: '4', type: 'contact-info', content: { email: '{{email}}', phone: '{{phone}}', website: '{{website}}' } },
];
