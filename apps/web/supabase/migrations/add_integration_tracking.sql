-- Add integration tracking columns to organizations table
ALTER TABLE organizations
ADD COLUMN IF NOT EXISTS google_workspace_connected BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS microsoft_365_connected BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS hubspot_connected BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS integration_synced_at TIMESTAMP WITH TIME ZONE;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_organizations_google_workspace ON organizations(google_workspace_connected);
CREATE INDEX IF NOT EXISTS idx_organizations_microsoft_365 ON organizations(microsoft_365_connected);
CREATE INDEX IF NOT EXISTS idx_organizations_hubspot ON organizations(hubspot_connected);

-- Add comments for documentation
COMMENT ON COLUMN organizations.google_workspace_connected IS 'Whether Google Workspace integration is connected';
COMMENT ON COLUMN organizations.microsoft_365_connected IS 'Whether Microsoft 365 integration is connected';
COMMENT ON COLUMN organizations.hubspot_connected IS 'Whether HubSpot integration is connected';
COMMENT ON COLUMN organizations.integration_synced_at IS 'Last time integration data was synced';
