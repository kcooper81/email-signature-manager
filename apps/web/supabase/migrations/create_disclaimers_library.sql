-- Create disclaimers library for quick insertion into signatures

CREATE TABLE IF NOT EXISTS disclaimer_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'legal', 'gdpr', 'hipaa', 'confidentiality', 'finance', 'real_estate', 'custom'
  content TEXT NOT NULL,
  description TEXT,
  is_system BOOLEAN DEFAULT false, -- System templates can't be deleted
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE, -- NULL for system templates
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_disclaimer_templates_category ON disclaimer_templates(category);
CREATE INDEX IF NOT EXISTS idx_disclaimer_templates_org ON disclaimer_templates(organization_id);
CREATE INDEX IF NOT EXISTS idx_disclaimer_templates_system ON disclaimer_templates(is_system);

-- Add comments
COMMENT ON TABLE disclaimer_templates IS 'Pre-written disclaimer templates for quick insertion into signatures';
COMMENT ON COLUMN disclaimer_templates.is_system IS 'System templates are available to all organizations';
COMMENT ON COLUMN disclaimer_templates.organization_id IS 'NULL for system templates, set for organization-specific templates';

-- Insert system disclaimer templates
INSERT INTO disclaimer_templates (name, category, content, description, is_system) VALUES
  (
    'Confidentiality Notice',
    'confidentiality',
    'CONFIDENTIALITY NOTICE: This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the sender immediately and delete it from your system.',
    'Standard confidentiality disclaimer for business emails',
    true
  ),
  (
    'Legal Disclaimer',
    'legal',
    'LEGAL DISCLAIMER: This email does not create any contractual relationship. The views expressed in this email are those of the sender and do not necessarily reflect the views of the company. This email may contain privileged and confidential information.',
    'General legal disclaimer for corporate communications',
    true
  ),
  (
    'GDPR Compliance',
    'gdpr',
    'GDPR NOTICE: We process your personal data in accordance with the General Data Protection Regulation (GDPR). For more information about how we handle your data, please see our Privacy Policy at [WEBSITE]. You have the right to access, rectify, or erase your personal data.',
    'GDPR compliance notice for European communications',
    true
  ),
  (
    'HIPAA Confidentiality',
    'hipaa',
    'HIPAA CONFIDENTIALITY NOTICE: This message may contain Protected Health Information (PHI) that is legally protected under HIPAA. If you are not the intended recipient, you are prohibited from disclosing, copying, distributing, or taking any action based on this information. Please notify the sender immediately and delete this message.',
    'HIPAA compliance for healthcare communications',
    true
  ),
  (
    'Attorney-Client Privilege',
    'legal',
    'ATTORNEY-CLIENT PRIVILEGE: This communication may contain privileged and confidential information intended for the use of the addressee only. If you are not the intended recipient, you are hereby notified that you have received this communication in error and that any review, disclosure, dissemination, distribution, or copying of it is strictly prohibited.',
    'Attorney-client privilege notice for law firms',
    true
  ),
  (
    'Financial Advisory Disclaimer',
    'finance',
    'INVESTMENT DISCLAIMER: This communication is for informational purposes only and does not constitute an offer to sell or a solicitation to buy any securities. Past performance is not indicative of future results. Please consult with a licensed financial advisor before making investment decisions. Securities offered through licensed professionals.',
    'Standard disclaimer for financial advisors',
    true
  ),
  (
    'Real Estate Equal Housing',
    'real_estate',
    'EQUAL HOUSING OPPORTUNITY: We are committed to fair housing practices and compliance with the Federal Fair Housing Act. All properties are subject to the Fair Housing Act which makes it illegal to discriminate based on race, color, religion, sex, handicap, familial status, or national origin.',
    'Equal housing opportunity statement for real estate',
    true
  ),
  (
    'Tax Advice Disclaimer',
    'finance',
    'TAX DISCLAIMER: This email does not constitute tax advice. Tax laws are complex and subject to change. Please consult with a qualified tax professional regarding your specific situation.',
    'Disclaimer for communications that may touch on tax matters',
    true
  ),
  (
    'Medical Advice Disclaimer',
    'hipaa',
    'MEDICAL DISCLAIMER: This email does not constitute medical advice. For medical emergencies, please call 911 or visit your nearest emergency room. For medical questions, please schedule an appointment or contact your healthcare provider directly.',
    'Disclaimer for healthcare provider communications',
    true
  ),
  (
    'Cybersecurity Notice',
    'confidentiality',
    'SECURITY NOTICE: Please be cautious of phishing attempts. We will never ask you to provide passwords, credit card information, or other sensitive data via email. If you receive a suspicious email claiming to be from us, please contact us directly to verify.',
    'Cybersecurity awareness notice',
    true
  ),
  (
    'Environmental Disclosure',
    'real_estate',
    'ENVIRONMENTAL DISCLOSURE: Properties may be subject to environmental hazards. Buyers should conduct appropriate environmental assessments and due diligence. This communication does not constitute an environmental report or assessment.',
    'Environmental disclosure for real estate transactions',
    true
  ),
  (
    'No Spam Compliance (CAN-SPAM)',
    'legal',
    'UNSUBSCRIBE: This email complies with the CAN-SPAM Act. If you wish to unsubscribe from future emails, please click the unsubscribe link below or reply with "UNSUBSCRIBE" in the subject line.',
    'CAN-SPAM Act compliance for marketing emails',
    true
  ),
  (
    'Broker-Dealer Disclosure',
    'finance',
    'BROKER-DEALER DISCLOSURE: Securities offered through [BROKER-DEALER NAME], Member FINRA/SIPC. Advisory services offered through [RIA NAME], a Registered Investment Advisor. [BROKER-DEALER NAME] and [RIA NAME] are separate entities.',
    'Required disclosure for broker-dealers',
    true
  ),
  (
    'Insurance Disclaimer',
    'finance',
    'INSURANCE DISCLAIMER: Insurance products are not FDIC insured, not bank guaranteed, and may lose value. Insurance products are offered through licensed insurance agents.',
    'Disclaimer for insurance product communications',
    true
  ),
  (
    'Copyright Notice',
    'legal',
    'COPYRIGHT NOTICE: © [YEAR] [COMPANY NAME]. All rights reserved. This email and any attachments may contain copyrighted material. Unauthorized use, reproduction, or distribution is prohibited.',
    'Copyright protection notice',
    true
  )
ON CONFLICT DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_disclaimer_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS disclaimer_templates_updated_at ON disclaimer_templates;
CREATE TRIGGER disclaimer_templates_updated_at
  BEFORE UPDATE ON disclaimer_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_disclaimer_templates_updated_at();
