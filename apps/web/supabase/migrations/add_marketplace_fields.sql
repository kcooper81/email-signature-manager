-- Add fields to support Google Workspace Marketplace installation
-- These fields allow distinguishing between OAuth and Marketplace auth types

ALTER TABLE provider_connections
ADD COLUMN IF NOT EXISTS auth_type TEXT DEFAULT 'oauth',
ADD COLUMN IF NOT EXISTS admin_email TEXT,
ADD COLUMN IF NOT EXISTS domain TEXT;

-- Add comment for clarity
COMMENT ON COLUMN provider_connections.auth_type IS 'Authentication type: oauth or marketplace';
COMMENT ON COLUMN provider_connections.admin_email IS 'Admin email for Marketplace installations (used for domain-wide delegation)';
COMMENT ON COLUMN provider_connections.domain IS 'Domain for Marketplace installations';
