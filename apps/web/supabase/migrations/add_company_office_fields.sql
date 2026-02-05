-- Add company and office_location fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS office_location TEXT;

-- Add indexes for filtering
CREATE INDEX IF NOT EXISTS idx_users_company ON users(company);
CREATE INDEX IF NOT EXISTS idx_users_office_location ON users(office_location);

-- Add comments for documentation
COMMENT ON COLUMN users.company IS 'Company name from Azure AD or Google Workspace';
COMMENT ON COLUMN users.office_location IS 'Office location from Azure AD or Google Workspace';
