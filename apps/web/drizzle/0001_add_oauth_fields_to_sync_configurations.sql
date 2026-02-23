-- Add OAuth fields to sync_configurations table for proper token management
ALTER TABLE sync_configurations ADD COLUMN IF NOT EXISTS oauth_access_token TEXT;
ALTER TABLE sync_configurations ADD COLUMN IF NOT EXISTS oauth_refresh_token TEXT;
ALTER TABLE sync_configurations ADD COLUMN IF NOT EXISTS oauth_token_expires_at TIMESTAMP;
ALTER TABLE sync_configurations ADD COLUMN IF NOT EXISTS oauth_company_id TEXT;
ALTER TABLE sync_configurations ADD COLUMN IF NOT EXISTS oauth_subdomain TEXT;

-- Add comments for clarity
COMMENT ON COLUMN sync_configurations.oauth_access_token IS 'Encrypted OAuth access token';
COMMENT ON COLUMN sync_configurations.oauth_refresh_token IS 'Encrypted OAuth refresh token';
COMMENT ON COLUMN sync_configurations.oauth_token_expires_at IS 'When the OAuth access token expires';
COMMENT ON COLUMN sync_configurations.oauth_company_id IS 'Company/tenant ID from OAuth response (Gusto, Rippling)';
COMMENT ON COLUMN sync_configurations.oauth_subdomain IS 'Subdomain from OAuth response (BambooHR)';
