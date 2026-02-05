-- Add is_admin column to users table for platform admin access control
-- This is more secure than hardcoding admin emails in code

ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE NOT NULL;

-- Create index for faster admin lookups
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON users(is_admin) WHERE is_admin = TRUE;

-- RLS Policy: Only admins can view/modify the is_admin column
-- Regular users cannot grant themselves admin access

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own is_admin status" ON users;
DROP POLICY IF EXISTS "Only admins can update is_admin" ON users;

-- Policy: Users can see their own is_admin status (read-only for non-admins)
CREATE POLICY "Users can view own is_admin status" ON users
  FOR SELECT
  USING (auth.uid()::text = auth_id);

-- Policy: Only existing admins can modify is_admin column
-- This prevents privilege escalation
CREATE POLICY "Only admins can update is_admin" ON users
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid()::text 
      AND is_admin = TRUE
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid()::text 
      AND is_admin = TRUE
    )
  );

-- Set initial admin(s) - UPDATE THIS with your actual admin user email
-- Run this separately after migration or update the email below:
-- UPDATE users SET is_admin = TRUE WHERE email = 'kade@siggly.io';

COMMENT ON COLUMN users.is_admin IS 'Platform admin flag - grants access to /admin dashboard. Can only be modified by existing admins.';
