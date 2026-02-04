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
  | 'compliance'
  | 'html';

export type IndustryType = 'general' | 'legal' | 'healthcare' | 'finance' | 'real_estate';

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
  backgroundColor?: string;
  padding?: number;
}

export const DISCLAIMER_TEMPLATES = {
  confidentiality: `This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the sender immediately and delete it from your system.`,
  legal: `This email does not create any contractual relationship. The views expressed in this email are those of the sender and do not necessarily reflect the views of the company.`,
  gdpr: `We process your personal data in accordance with GDPR. For more information about how we handle your data, please see our Privacy Policy.`,
  hipaa: `This message may contain Protected Health Information (PHI). If you are not the intended recipient, you are prohibited from disclosing, copying, or distributing this information. Please notify the sender and delete this message immediately.`,
  custom: '',
};

// Industry-specific compliance field definitions
export interface LegalComplianceFields {
  barNumber?: string;
  barState?: string;
  credentials?: string; // e.g., "Esq.", "J.D."
  disclaimer?: string;
  firmName?: string;
}

export interface HealthcareComplianceFields {
  npiNumber?: string;
  licenseNumber?: string;
  licenseState?: string;
  credentials?: string; // e.g., "MD", "RN", "NP"
  hipaaDisclaimer?: string;
  practiceName?: string;
}

export interface FinanceComplianceFields {
  crdNumber?: string; // Central Registration Depository number
  secNumber?: string;
  licenseNumber?: string;
  credentials?: string; // e.g., "CFA", "CFP", "ChFC"
  brokerDealerName?: string;
  riaName?: string; // Registered Investment Advisor name
  memberFINRASIPC?: boolean;
  disclaimer?: string;
  firmName?: string;
}

export interface RealEstateComplianceFields {
  licenseNumber?: string;
  licenseState?: string;
  dreNumber?: string; // California Department of Real Estate number
  mlsNumber?: string;
  designations?: string; // e.g., "REALTOR®", "ABR", "GRI"
  brokerageName?: string;
  equalHousingLogo?: boolean;
}

export type ComplianceFields = 
  | LegalComplianceFields 
  | HealthcareComplianceFields 
  | FinanceComplianceFields 
  | RealEstateComplianceFields;

export interface ComplianceBlockContent {
  industryType: IndustryType;
  fields: ComplianceFields;
  fontSize: number;
  color: string;
}

// Industry-specific disclaimer templates
export const INDUSTRY_DISCLAIMERS = {
  legal: `ATTORNEY-CLIENT PRIVILEGE: This communication may contain privileged and confidential information. If you are not the intended recipient, you are hereby notified that you have received this communication in error and that any review, disclosure, dissemination, distribution or copying of it is strictly prohibited.`,
  healthcare: `CONFIDENTIALITY NOTICE: This message may contain Protected Health Information (PHI) that is legally protected. If you are not the intended recipient, you are prohibited from disclosing, copying, distributing or taking any action based on this information. Please notify the sender immediately and delete this message.`,
  finance: `IMPORTANT NOTICE: This communication is for informational purposes only and does not constitute an offer to sell or a solicitation to buy any securities. Past performance is not indicative of future results. Investment advisory services and securities offered through licensed professionals. Please consult with a financial advisor before making investment decisions.`,
  real_estate: `Equal Housing Opportunity: We are committed to fair housing practices. All properties are subject to the Federal Fair Housing Act.`,
  general: '',
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
  | ComplianceBlockContent
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
  industry: IndustryType;
  compliance_fields: ComplianceFields | null;
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

// Industry labels for UI
export const INDUSTRY_LABELS: Record<IndustryType, string> = {
  general: 'General Business',
  legal: 'Legal / Law Firms',
  healthcare: 'Healthcare / Medical',
  finance: 'Finance / Investment',
  real_estate: 'Real Estate',
};

// Required fields by industry
export const INDUSTRY_REQUIRED_FIELDS: Record<IndustryType, string[]> = {
  general: [],
  legal: ['disclaimer'],
  healthcare: ['hipaaDisclaimer'],
  finance: ['disclaimer'],
  real_estate: ['licenseNumber', 'licenseState'],
};
