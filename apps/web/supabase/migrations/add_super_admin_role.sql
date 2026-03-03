-- Add super_admin_role column to users table
-- Values: 'super_admin' (full access), 'support' (tickets + testing guide only), NULL (not an admin)
ALTER TABLE users ADD COLUMN IF NOT EXISTS super_admin_role TEXT;

-- Add CHECK constraint for valid values
ALTER TABLE users ADD CONSTRAINT users_super_admin_role_check
  CHECK (super_admin_role IN ('super_admin', 'support') OR super_admin_role IS NULL);

-- Backfill existing super admins
UPDATE users SET super_admin_role = 'super_admin' WHERE is_super_admin = true AND super_admin_role IS NULL;
