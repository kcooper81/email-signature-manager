-- Add allowed_views column for granular support role access control
-- Stores a JSON array of admin view keys that support users can access
-- Super admins always have full access regardless of this field
ALTER TABLE users ADD COLUMN IF NOT EXISTS super_admin_allowed_views text;

-- Default existing support users to tickets + testing-guide (current behavior)
UPDATE users
SET super_admin_allowed_views = '["tickets","testing-guide"]'
WHERE is_super_admin = true
  AND super_admin_role = 'support'
  AND super_admin_allowed_views IS NULL;
