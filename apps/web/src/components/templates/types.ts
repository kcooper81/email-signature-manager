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

export type IndustryType = 'general' | 'legal' | 'healthcare' | 'finance' | 'real_estate' | 'insurance' | 'accounting' | 'consulting' | 'technology' | 'education' | 'non_profit';

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
    type: 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'github' | 'custom';
    url: string;
    label?: string; // For custom platforms
    icon?: string; // URL to custom icon
  }[];
  displayMode: 'icons' | 'text'; // Show icons or text names
  iconSize: number;
  iconStyle: 'color' | 'mono' | 'circle';
}

export interface DividerBlockContent {
  color: string;
  width: number;
  thickness: number;
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
  customFields?: {
    label: string;
    value: string;
    icon?: 'mail' | 'phone' | 'globe' | 'map-pin' | 'calendar' | 'briefcase' | 'user' | 'building' | 'none';
  }[];
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
  // Campaign scheduling
  campaignName?: string;
  startDate?: string;
  endDate?: string;
  // Click tracking
  trackClicks?: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
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

export interface InsuranceComplianceFields {
  licenseNumber?: string;
  licenseState?: string;
  nmlsNumber?: string; // Nationwide Multistate Licensing System
  credentials?: string; // e.g., "CLU", "ChFC", "CPCU"
  agencyName?: string;
  carrierAffiliations?: string;
  disclaimer?: string;
}

export interface AccountingComplianceFields {
  cpaNumber?: string;
  licenseState?: string;
  credentials?: string; // e.g., "CPA", "EA", "CMA"
  firmName?: string;
  disclaimer?: string;
}

export interface ConsultingComplianceFields {
  credentials?: string; // e.g., "MBA", "PMP", "Six Sigma"
  firmName?: string;
  specializations?: string;
  disclaimer?: string;
}

export interface TechnologyComplianceFields {
  certifications?: string; // e.g., "AWS Certified", "CISSP", "PMP"
  companyName?: string;
  gdprCompliant?: boolean;
  soc2Compliant?: boolean;
  disclaimer?: string;
}

export interface EducationComplianceFields {
  credentials?: string; // e.g., "PhD", "EdD", "M.Ed"
  institution?: string;
  accreditation?: string;
  ferpaNotice?: string;
}

export interface NonProfitComplianceFields {
  ein?: string; // Employer Identification Number
  organizationName?: string;
  taxExemptStatus?: string; // e.g., "501(c)(3)"
  disclaimer?: string;
}

export type ComplianceFields = 
  | LegalComplianceFields 
  | HealthcareComplianceFields 
  | FinanceComplianceFields 
  | RealEstateComplianceFields
  | InsuranceComplianceFields
  | AccountingComplianceFields
  | ConsultingComplianceFields
  | TechnologyComplianceFields
  | EducationComplianceFields
  | NonProfitComplianceFields;

export interface ComplianceBlockContent {
  industryType: IndustryType;
  fields: ComplianceFields;
  preset?: string; // Selected preset template
  fontSize: number;
  color: string;
}

// Industry-specific disclaimer templates
export const INDUSTRY_DISCLAIMERS = {
  legal: `ATTORNEY-CLIENT PRIVILEGE: This communication may contain privileged and confidential information. If you are not the intended recipient, you are hereby notified that you have received this communication in error and that any review, disclosure, dissemination, distribution or copying of it is strictly prohibited.`,
  healthcare: `CONFIDENTIALITY NOTICE: This message may contain Protected Health Information (PHI) that is legally protected. If you are not the intended recipient, you are prohibited from disclosing, copying, distributing or taking any action based on this information. Please notify the sender immediately and delete this message.`,
  finance: `IMPORTANT NOTICE: This communication is for informational purposes only and does not constitute an offer to sell or a solicitation to buy any securities. Past performance is not indicative of future results. Investment advisory services and securities offered through licensed professionals. Please consult with a financial advisor before making investment decisions.`,
  real_estate: `Equal Housing Opportunity: We are committed to fair housing practices. All properties are subject to the Federal Fair Housing Act.`,
  insurance: `Insurance products and services offered through licensed insurance professionals. Coverage and availability may vary by state. This communication does not constitute a binding contract or guarantee of coverage.`,
  accounting: `The information contained in this email is for general guidance only and should not be considered professional accounting, tax, or legal advice. Please consult with a qualified professional regarding your specific situation.`,
  consulting: `The views and recommendations expressed in this communication are based on our professional opinion and experience. Implementation results may vary based on specific circumstances and conditions.`,
  technology: `This communication may contain proprietary and confidential information. Unauthorized use, disclosure, or distribution is prohibited. All data is processed in accordance with applicable privacy regulations.`,
  education: `FERPA NOTICE: This email may contain education records protected under the Family Educational Rights and Privacy Act (FERPA). If you are not the intended recipient, please delete this message immediately.`,
  non_profit: `This organization is a tax-exempt nonprofit under Section 501(c)(3) of the Internal Revenue Code. Contributions may be tax-deductible to the extent allowed by law. Please consult your tax advisor.`,
  general: '',
};

// Compliance preset templates by industry
export const COMPLIANCE_PRESETS: Record<IndustryType, Record<string, { name: string; fields: any }>> = {
  general: {},
  legal: {
    attorney: {
      name: 'Attorney - Standard',
      fields: { credentials: 'Esq.', disclaimer: INDUSTRY_DISCLAIMERS.legal }
    },
    partner: {
      name: 'Partner - Law Firm',
      fields: { credentials: 'Esq., Partner', disclaimer: INDUSTRY_DISCLAIMERS.legal }
    },
    associate: {
      name: 'Associate Attorney',
      fields: { credentials: 'Esq., Associate', disclaimer: INDUSTRY_DISCLAIMERS.legal }
    },
  },
  healthcare: {
    physician: {
      name: 'Physician (MD)',
      fields: { credentials: 'MD', hipaaDisclaimer: INDUSTRY_DISCLAIMERS.healthcare }
    },
    nurse: {
      name: 'Registered Nurse',
      fields: { credentials: 'RN', hipaaDisclaimer: INDUSTRY_DISCLAIMERS.healthcare }
    },
    specialist: {
      name: 'Medical Specialist',
      fields: { credentials: 'MD, FACP', hipaaDisclaimer: INDUSTRY_DISCLAIMERS.healthcare }
    },
  },
  finance: {
    advisor: {
      name: 'Financial Advisor',
      fields: { credentials: 'CFP®', memberFINRASIPC: true, disclaimer: INDUSTRY_DISCLAIMERS.finance }
    },
    analyst: {
      name: 'Financial Analyst',
      fields: { credentials: 'CFA', disclaimer: INDUSTRY_DISCLAIMERS.finance }
    },
    planner: {
      name: 'Wealth Manager',
      fields: { credentials: 'CFP®, ChFC', memberFINRASIPC: true, disclaimer: INDUSTRY_DISCLAIMERS.finance }
    },
  },
  real_estate: {
    agent: {
      name: 'Real Estate Agent',
      fields: { designations: 'REALTOR®', equalHousingLogo: true }
    },
    broker: {
      name: 'Real Estate Broker',
      fields: { designations: 'REALTOR®, Broker', equalHousingLogo: true }
    },
    specialist: {
      name: 'Certified Specialist',
      fields: { designations: 'REALTOR®, ABR, GRI', equalHousingLogo: true }
    },
  },
  insurance: {
    agent: {
      name: 'Insurance Agent',
      fields: { credentials: 'Licensed Agent', disclaimer: INDUSTRY_DISCLAIMERS.insurance }
    },
    broker: {
      name: 'Insurance Broker',
      fields: { credentials: 'Licensed Broker', disclaimer: INDUSTRY_DISCLAIMERS.insurance }
    },
    specialist: {
      name: 'Insurance Specialist',
      fields: { credentials: 'CLU, ChFC', disclaimer: INDUSTRY_DISCLAIMERS.insurance }
    },
  },
  accounting: {
    cpa: {
      name: 'Certified Public Accountant',
      fields: { credentials: 'CPA', disclaimer: INDUSTRY_DISCLAIMERS.accounting }
    },
    tax: {
      name: 'Tax Professional',
      fields: { credentials: 'EA, CPA', disclaimer: INDUSTRY_DISCLAIMERS.accounting }
    },
    auditor: {
      name: 'Auditor',
      fields: { credentials: 'CPA, CIA', disclaimer: INDUSTRY_DISCLAIMERS.accounting }
    },
  },
  consulting: {
    management: {
      name: 'Management Consultant',
      fields: { credentials: 'MBA', disclaimer: INDUSTRY_DISCLAIMERS.consulting }
    },
    strategy: {
      name: 'Strategy Consultant',
      fields: { credentials: 'MBA, PMP', disclaimer: INDUSTRY_DISCLAIMERS.consulting }
    },
    specialist: {
      name: 'Industry Specialist',
      fields: { credentials: 'Six Sigma Black Belt', disclaimer: INDUSTRY_DISCLAIMERS.consulting }
    },
  },
  technology: {
    engineer: {
      name: 'Software Engineer',
      fields: { certifications: 'AWS Certified', gdprCompliant: true, disclaimer: INDUSTRY_DISCLAIMERS.technology }
    },
    security: {
      name: 'Security Professional',
      fields: { certifications: 'CISSP, CEH', soc2Compliant: true, disclaimer: INDUSTRY_DISCLAIMERS.technology }
    },
    architect: {
      name: 'Solutions Architect',
      fields: { certifications: 'AWS Solutions Architect', gdprCompliant: true, soc2Compliant: true, disclaimer: INDUSTRY_DISCLAIMERS.technology }
    },
  },
  education: {
    professor: {
      name: 'Professor',
      fields: { credentials: 'PhD', ferpaNotice: INDUSTRY_DISCLAIMERS.education }
    },
    administrator: {
      name: 'Administrator',
      fields: { credentials: 'EdD', ferpaNotice: INDUSTRY_DISCLAIMERS.education }
    },
    teacher: {
      name: 'Teacher',
      fields: { credentials: 'M.Ed', ferpaNotice: INDUSTRY_DISCLAIMERS.education }
    },
  },
  non_profit: {
    director: {
      name: 'Executive Director',
      fields: { taxExemptStatus: '501(c)(3)', disclaimer: INDUSTRY_DISCLAIMERS.non_profit }
    },
    development: {
      name: 'Development Officer',
      fields: { taxExemptStatus: '501(c)(3)', disclaimer: INDUSTRY_DISCLAIMERS.non_profit }
    },
    program: {
      name: 'Program Manager',
      fields: { taxExemptStatus: '501(c)(3)', disclaimer: INDUSTRY_DISCLAIMERS.non_profit }
    },
  },
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
  insurance: 'Insurance',
  accounting: 'Accounting / CPA',
  consulting: 'Consulting',
  technology: 'Technology / IT',
  education: 'Education',
  non_profit: 'Non-Profit',
};

// Required fields by industry
export const INDUSTRY_REQUIRED_FIELDS: Record<IndustryType, string[]> = {
  general: [],
  legal: ['disclaimer'],
  healthcare: ['hipaaDisclaimer'],
  finance: ['disclaimer'],
  real_estate: ['licenseNumber', 'licenseState'],
  insurance: ['licenseNumber', 'licenseState'],
  accounting: ['cpaNumber', 'licenseState'],
  consulting: [],
  technology: [],
  education: [],
  non_profit: ['ein', 'taxExemptStatus'],
};
