-- Add domain column to organizations for disclaimer engine domain-based matching
ALTER TABLE organizations
ADD COLUMN IF NOT EXISTS domain TEXT;

CREATE INDEX IF NOT EXISTS idx_organizations_domain ON organizations(domain);

COMMENT ON COLUMN organizations.domain IS 'Primary email domain for the organization (e.g., acme.com), used by disclaimer rule matching';
