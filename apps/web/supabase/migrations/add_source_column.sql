-- Add source column to track where users were synced from
ALTER TABLE users ADD COLUMN IF NOT EXISTS source TEXT CHECK (source IN ('manual', 'google', 'microsoft', 'hubspot'));

-- Set default to 'manual' for existing users
UPDATE users SET source = 'manual' WHERE source IS NULL;

-- Add index for filtering
CREATE INDEX IF NOT EXISTS idx_users_source ON users(source);

-- Add comment for documentation
COMMENT ON COLUMN users.source IS 'Source of user data: manual (added by admin), google (Google Workspace), microsoft (Microsoft 365), hubspot (HubSpot CRM)';
