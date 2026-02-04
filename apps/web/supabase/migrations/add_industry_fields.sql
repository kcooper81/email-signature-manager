-- Add industry type enum
CREATE TYPE industry_type AS ENUM ('general', 'legal', 'healthcare', 'finance', 'real_estate');

-- Add industry field to organizations
ALTER TABLE organizations 
ADD COLUMN industry industry_type DEFAULT 'general';

-- Add industry and compliance fields to signature_templates
ALTER TABLE signature_templates 
ADD COLUMN industry industry_type DEFAULT 'general',
ADD COLUMN compliance_fields JSONB;

-- Create index for faster industry-based queries
CREATE INDEX idx_organizations_industry ON organizations(industry);
CREATE INDEX idx_signature_templates_industry ON signature_templates(industry);

-- Add comments for documentation
COMMENT ON COLUMN organizations.industry IS 'Industry type for organization-specific compliance requirements';
COMMENT ON COLUMN signature_templates.industry IS 'Industry type for template-specific compliance features';
COMMENT ON COLUMN signature_templates.compliance_fields IS 'JSON storage for industry-specific compliance data (bar numbers, NPI, licenses, etc.)';
