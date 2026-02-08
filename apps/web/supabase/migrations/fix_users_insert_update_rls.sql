-- Fix users table RLS policies to allow admins to insert and update team members
-- This fixes the "new row violates row-level security policy" error

-- Drop existing INSERT/UPDATE policies if they exist
DROP POLICY IF EXISTS "Admins can insert users in their organization" ON users;
DROP POLICY IF EXISTS "Admins can update users in their organization" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Org members can insert users in their organization" ON users;

-- Policy for organization members to insert new team members into their organization
-- Checks: user is authenticated AND inserting into their own organization
CREATE POLICY "Org members can insert users in their organization"
  ON users
  FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT u.organization_id 
      FROM users u 
      WHERE u.auth_id = auth.uid()::text
    )
  );

-- Policy for admins to update any user in their organization
-- Checks role OR is_admin flag
CREATE POLICY "Admins can update users in their organization"
  ON users
  FOR UPDATE
  USING (
    organization_id IN (
      SELECT u.organization_id 
      FROM users u 
      WHERE u.auth_id = auth.uid()::text 
        AND (u.role IN ('admin', 'owner') OR u.is_admin = TRUE)
    )
  )
  WITH CHECK (
    organization_id IN (
      SELECT u.organization_id 
      FROM users u 
      WHERE u.auth_id = auth.uid()::text 
        AND (u.role IN ('admin', 'owner') OR u.is_admin = TRUE)
    )
  );

-- Policy for users to update their own data (non-admin users can edit their own profile)
CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  USING (auth_id = auth.uid()::text)
  WITH CHECK (auth_id = auth.uid()::text);
