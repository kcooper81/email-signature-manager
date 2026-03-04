-- Add is_suspended column to organizations table
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS is_suspended BOOLEAN DEFAULT FALSE;

-- Index for quick lookups on suspended orgs
CREATE INDEX IF NOT EXISTS idx_organizations_is_suspended ON organizations(is_suspended) WHERE is_suspended = TRUE;
