export type SignatureBlockType =
  | 'text'
  | 'image'
  | 'social'
  | 'divider'
  | 'spacer'
  | 'contact-info'
  | 'button'
  | 'banner'
  | 'disclaimer'
  | 'html';

export interface TextBlockContent {
  text: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  color: string;
  align?: 'left' | 'center' | 'right';
}

export interface ImageBlockContent {
  src: string;
  alt: string;
  width: number;
  height?: number;
  link?: string;
}

export interface SocialBlockContent {
  platforms: {
    type: 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'github';
    url: string;
  }[];
  iconSize: number;
  iconStyle: 'color' | 'mono' | 'circle';
}

export interface DividerBlockContent {
  color: string;
  width: number;
  style: 'solid' | 'dashed' | 'dotted';
}

export interface SpacerBlockContent {
  height: number;
}

export interface ContactInfoBlockContent {
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  showIcons?: boolean;
}

export interface ButtonBlockContent {
  text: string;
  url: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
}

export interface BannerBlockContent {
  src: string;
  alt: string;
  link?: string;
  width: number;
}

export interface HtmlBlockContent {
  html: string;
}

export interface DisclaimerBlockContent {
  text: string;
  template: 'confidentiality' | 'legal' | 'gdpr' | 'hipaa' | 'custom';
  fontSize: number;
  color: string;
}

export const DISCLAIMER_TEMPLATES = {
  confidentiality: `This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the sender immediately and delete it from your system.`,
  legal: `This email does not create any contractual relationship. The views expressed in this email are those of the sender and do not necessarily reflect the views of the company.`,
  gdpr: `We process your personal data in accordance with GDPR. For more information about how we handle your data, please see our Privacy Policy.`,
  hipaa: `This message may contain Protected Health Information (PHI). If you are not the intended recipient, you are prohibited from disclosing, copying, or distributing this information. Please notify the sender and delete this message immediately.`,
  custom: '',
};

export type SignatureBlockContent =
  | TextBlockContent
  | ImageBlockContent
  | SocialBlockContent
  | DividerBlockContent
  | SpacerBlockContent
  | ContactInfoBlockContent
  | ButtonBlockContent
  | BannerBlockContent
  | DisclaimerBlockContent
  | HtmlBlockContent;

export interface SignatureBlock {
  id: string;
  type: SignatureBlockType;
  content: SignatureBlockContent;
}

export interface SignatureTemplate {
  id: string;
  name: string;
  description: string | null;
  blocks: SignatureBlock[];
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// Dynamic field placeholders
export const DYNAMIC_FIELDS = [
  { key: '{{first_name}}', label: 'First Name' },
  { key: '{{last_name}}', label: 'Last Name' },
  { key: '{{full_name}}', label: 'Full Name' },
  { key: '{{email}}', label: 'Email' },
  { key: '{{phone}}', label: 'Phone' },
  { key: '{{mobile}}', label: 'Mobile' },
  { key: '{{job_title}}', label: 'Job Title' },
  { key: '{{department}}', label: 'Department' },
  { key: '{{company}}', label: 'Company' },
  { key: '{{website}}', label: 'Website' },
  { key: '{{address}}', label: 'Address' },
  { key: '{{linkedin}}', label: 'LinkedIn URL' },
  { key: '{{twitter}}', label: 'Twitter URL' },
];
