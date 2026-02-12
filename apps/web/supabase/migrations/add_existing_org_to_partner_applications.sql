-- Add existing_organization_id column to partner_applications table
-- This allows existing users to apply to convert their organization to an MSP partner

ALTER TABLE partner_applications
ADD COLUMN IF NOT EXISTS existing_organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_partner_applications_existing_org 
ON partner_applications(existing_organization_id) 
WHERE existing_organization_id IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN partner_applications.existing_organization_id IS 
'If set, the applicant wants to convert this existing organization to an MSP partner instead of creating a new one';
