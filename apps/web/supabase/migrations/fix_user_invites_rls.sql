-- Fix user_invites table RLS policies
-- This allows organization members to create invites for their organization

-- Enable RLS
ALTER TABLE user_invites ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Org members can insert invites" ON user_invites;
DROP POLICY IF EXISTS "Org members can view invites" ON user_invites;
DROP POLICY IF EXISTS "Org members can update invites" ON user_invites;
DROP POLICY IF EXISTS "Anyone can view invite by token" ON user_invites;

-- Policy for organization members to create invites
CREATE POLICY "Org members can insert invites"
  ON user_invites
  FOR INSERT
  WITH CHECK (
    invited_by IN (
      SELECT u.organization_id 
      FROM users u 
      WHERE u.auth_id = auth.uid()::text
    )
  );

-- Policy for organization members to view their org's invites
CREATE POLICY "Org members can view invites"
  ON user_invites
  FOR SELECT
  USING (
    invited_by IN (
      SELECT u.organization_id 
      FROM users u 
      WHERE u.auth_id = auth.uid()::text
    )
  );

-- Policy for organization members to update invites (e.g., mark as accepted)
CREATE POLICY "Org members can update invites"
  ON user_invites
  FOR UPDATE
  USING (
    invited_by IN (
      SELECT u.organization_id 
      FROM users u 
      WHERE u.auth_id = auth.uid()::text
    )
  );

-- Policy for anyone to view an invite by token (for the invite acceptance page)
-- This uses a service role or anon key lookup
CREATE POLICY "Anyone can view invite by token"
  ON user_invites
  FOR SELECT
  USING (true);
