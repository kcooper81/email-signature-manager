-- Add DELETE policy for signature_deployments table
-- This is needed when deleting assignments that have deployments

DROP POLICY IF EXISTS "Users can delete their organization's deployments" ON signature_deployments;

CREATE POLICY "Users can delete their organization's deployments"
  ON signature_deployments
  FOR DELETE
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );
