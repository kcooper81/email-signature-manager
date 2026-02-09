-- Add is_super_admin column to users table
-- This separates platform-level admin access (/admin panel) from organization-level admin access

-- Add the column
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_super_admin BOOLEAN DEFAULT FALSE;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_is_super_admin ON users(is_super_admin) WHERE is_super_admin = TRUE;

-- Set super admin for specific users (Siggly platform admins only)
UPDATE users SET is_super_admin = TRUE WHERE email IN ('admin@siggly.io', 'kade@siggly.io');

-- Add comment explaining the difference
COMMENT ON COLUMN users.is_super_admin IS 'Platform-level super admin access for /admin panel. Different from is_admin which is org-level admin.';
COMMENT ON COLUMN users.is_admin IS 'Organization-level admin access for managing team members within their org.';
