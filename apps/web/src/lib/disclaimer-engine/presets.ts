/**
 * Regulatory disclaimer presets
 * System-level templates that organizations can use out of the box
 */

export interface DisclaimerPreset {
  id: string;
  name: string;
  category: string;
  regulationType: string;
  description: string;
  content: string;
  contentHtml: string;
}

export const DISCLAIMER_PRESETS: DisclaimerPreset[] = [
  {
    id: 'gdpr-standard',
    name: 'GDPR Privacy Notice',
    category: 'privacy',
    regulationType: 'gdpr',
    description: 'Standard GDPR privacy disclaimer for EU communications',
    content: 'This email and any attachments are confidential and intended solely for the addressee. If you have received this email in error, please notify the sender and delete it immediately. Personal data in this email is processed in accordance with GDPR. For our privacy policy, visit our website.',
    contentHtml: '<div style="font-size:11px;color:#666;border-top:1px solid #e0e0e0;padding-top:8px;margin-top:16px;">This email and any attachments are confidential and intended solely for the addressee. If you have received this email in error, please notify the sender and delete it immediately. Personal data in this email is processed in accordance with GDPR. For our privacy policy, visit our website.</div>',
  },
  {
    id: 'hipaa-standard',
    name: 'HIPAA Confidentiality Notice',
    category: 'healthcare',
    regulationType: 'hipaa',
    description: 'HIPAA-compliant confidentiality notice for healthcare organizations',
    content: 'CONFIDENTIALITY NOTICE: This email may contain Protected Health Information (PHI) subject to HIPAA regulations. If you are not the intended recipient, you are prohibited from reading, disclosing, or distributing this information. Please notify the sender immediately and destroy all copies.',
    contentHtml: '<div style="font-size:11px;color:#666;border-top:1px solid #e0e0e0;padding-top:8px;margin-top:16px;"><strong>CONFIDENTIALITY NOTICE:</strong> This email may contain Protected Health Information (PHI) subject to HIPAA regulations. If you are not the intended recipient, you are prohibited from reading, disclosing, or distributing this information. Please notify the sender immediately and destroy all copies.</div>',
  },
  {
    id: 'ccpa-standard',
    name: 'CCPA Privacy Notice',
    category: 'privacy',
    regulationType: 'ccpa',
    description: 'California Consumer Privacy Act notice',
    content: 'California residents: This communication may involve the collection of personal information. You have rights under the California Consumer Privacy Act (CCPA) including the right to know, delete, and opt-out of the sale of your personal information. Contact us for details.',
    contentHtml: '<div style="font-size:11px;color:#666;border-top:1px solid #e0e0e0;padding-top:8px;margin-top:16px;">California residents: This communication may involve the collection of personal information. You have rights under the California Consumer Privacy Act (CCPA) including the right to know, delete, and opt-out of the sale of your personal information. Contact us for details.</div>',
  },
  {
    id: 'finra-standard',
    name: 'FINRA Compliance Notice',
    category: 'finance',
    regulationType: 'finra',
    description: 'Financial industry regulatory compliance disclaimer',
    content: 'This email is not intended as investment advice and does not constitute an offer or solicitation. Securities offered through registered broker-dealers. Member FINRA/SIPC. Past performance is not indicative of future results. All investments involve risk.',
    contentHtml: '<div style="font-size:11px;color:#666;border-top:1px solid #e0e0e0;padding-top:8px;margin-top:16px;">This email is not intended as investment advice and does not constitute an offer or solicitation. Securities offered through registered broker-dealers. Member FINRA/SIPC. Past performance is not indicative of future results. All investments involve risk.</div>',
  },
  {
    id: 'sox-standard',
    name: 'SOX Compliance Notice',
    category: 'finance',
    regulationType: 'sox',
    description: 'Sarbanes-Oxley Act compliance disclaimer',
    content: 'This communication may contain confidential financial information subject to Sarbanes-Oxley Act requirements. Unauthorized disclosure, copying, or distribution is strictly prohibited. If received in error, please notify the sender and delete immediately.',
    contentHtml: '<div style="font-size:11px;color:#666;border-top:1px solid #e0e0e0;padding-top:8px;margin-top:16px;">This communication may contain confidential financial information subject to Sarbanes-Oxley Act requirements. Unauthorized disclosure, copying, or distribution is strictly prohibited. If received in error, please notify the sender and delete immediately.</div>',
  },
  {
    id: 'confidentiality-standard',
    name: 'General Confidentiality',
    category: 'general',
    regulationType: 'custom',
    description: 'Standard confidentiality notice for business communications',
    content: 'This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the system manager and delete it from your system.',
    contentHtml: '<div style="font-size:11px;color:#666;border-top:1px solid #e0e0e0;padding-top:8px;margin-top:16px;">This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the system manager and delete it from your system.</div>',
  },
  {
    id: 'attorney-client',
    name: 'Attorney-Client Privilege',
    category: 'legal',
    regulationType: 'custom',
    description: 'Attorney-client privilege notice for legal communications',
    content: 'PRIVILEGED AND CONFIDENTIAL: This email is protected by the attorney-client privilege and/or work product doctrine. It is intended only for the addressee. If you are not the intended recipient, any disclosure, copying, distribution, or use of the contents is prohibited. Please notify the sender immediately.',
    contentHtml: '<div style="font-size:11px;color:#666;border-top:1px solid #e0e0e0;padding-top:8px;margin-top:16px;"><strong>PRIVILEGED AND CONFIDENTIAL:</strong> This email is protected by the attorney-client privilege and/or work product doctrine. It is intended only for the addressee. If you are not the intended recipient, any disclosure, copying, distribution, or use of the contents is prohibited. Please notify the sender immediately.</div>',
  },
  {
    id: 'tax-advice',
    name: 'Tax Advice Disclaimer',
    category: 'finance',
    regulationType: 'custom',
    description: 'IRS Circular 230 tax advice disclaimer',
    content: 'IRS Circular 230 Disclosure: To ensure compliance with requirements imposed by the IRS, we inform you that any tax advice contained in this communication was not intended or written to be used, and cannot be used, for the purpose of avoiding penalties under the Internal Revenue Code.',
    contentHtml: '<div style="font-size:11px;color:#666;border-top:1px solid #e0e0e0;padding-top:8px;margin-top:16px;">IRS Circular 230 Disclosure: To ensure compliance with requirements imposed by the IRS, we inform you that any tax advice contained in this communication was not intended or written to be used, and cannot be used, for the purpose of avoiding penalties under the Internal Revenue Code.</div>',
  },
];

export function getPresetById(id: string): DisclaimerPreset | undefined {
  return DISCLAIMER_PRESETS.find(p => p.id === id);
}

export function getPresetsByRegulation(regulationType: string): DisclaimerPreset[] {
  return DISCLAIMER_PRESETS.filter(p => p.regulationType === regulationType);
}

export function getPresetsByCategory(category: string): DisclaimerPreset[] {
  return DISCLAIMER_PRESETS.filter(p => p.category === category);
}
