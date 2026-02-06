-- Fix users table RLS policies to ensure proper access
-- This fixes the 400 error when querying users table

-- Enable RLS if not already enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to recreate them
DROP POLICY IF EXISTS "Users can view their organization's users" ON users;
DROP POLICY IF EXISTS "Users can view their own data" ON users;

-- Policy for users to view their own data
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  USING (auth_id = auth.uid()::text);

-- Policy for users to view other users in their organization
CREATE POLICY "Users can view their organization's users"
  ON users
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );
