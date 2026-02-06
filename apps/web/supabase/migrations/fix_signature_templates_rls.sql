-- Fix signature_templates RLS policies to allow DELETE operations
-- This fixes the 409 conflict error when deleting templates

-- Enable RLS if not already enabled
ALTER TABLE signature_templates ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to recreate them
DROP POLICY IF EXISTS "Users can view their organization's templates" ON signature_templates;
DROP POLICY IF EXISTS "Users can create templates for their organization" ON signature_templates;
DROP POLICY IF EXISTS "Users can update their organization's templates" ON signature_templates;
DROP POLICY IF EXISTS "Users can delete their organization's templates" ON signature_templates;

-- Policy for SELECT
CREATE POLICY "Users can view their organization's templates"
  ON signature_templates
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

-- Policy for INSERT
CREATE POLICY "Users can create templates for their organization"
  ON signature_templates
  FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

-- Policy for UPDATE
CREATE POLICY "Users can update their organization's templates"
  ON signature_templates
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

-- Policy for DELETE (THIS WAS MISSING)
CREATE POLICY "Users can delete their organization's templates"
  ON signature_templates
  FOR DELETE
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );
