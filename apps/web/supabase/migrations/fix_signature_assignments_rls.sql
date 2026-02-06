-- Fix signature_assignments RLS policies to allow DELETE operations
-- This is needed when deleting templates that have assignments

-- Enable RLS if not already enabled
ALTER TABLE signature_assignments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to recreate them
DROP POLICY IF EXISTS "Users can view their organization's assignments" ON signature_assignments;
DROP POLICY IF EXISTS "Users can create assignments for their organization" ON signature_assignments;
DROP POLICY IF EXISTS "Users can update their organization's assignments" ON signature_assignments;
DROP POLICY IF EXISTS "Users can delete their organization's assignments" ON signature_assignments;

-- Policy for SELECT
CREATE POLICY "Users can view their organization's assignments"
  ON signature_assignments
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

-- Policy for INSERT
CREATE POLICY "Users can create assignments for their organization"
  ON signature_assignments
  FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

-- Policy for UPDATE
CREATE POLICY "Users can update their organization's assignments"
  ON signature_assignments
  FOR UPDATE
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  )
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

-- Policy for DELETE
CREATE POLICY "Users can delete their organization's assignments"
  ON signature_assignments
  FOR DELETE
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );
