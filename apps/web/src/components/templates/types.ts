export type SignatureBlockType =
  | 'text'
  | 'image'
  | 'social'
  | 'divider'
  | 'spacer'
  | 'contact-info'
  | 'button'
  | 'banner';

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

export type SignatureBlockContent =
  | TextBlockContent
  | ImageBlockContent
  | SocialBlockContent
  | DividerBlockContent
  | SpacerBlockContent
  | ContactInfoBlockContent
  | ButtonBlockContent
  | BannerBlockContent;

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
