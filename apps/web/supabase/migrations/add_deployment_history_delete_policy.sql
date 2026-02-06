-- Add DELETE policy for user_deployment_history table
-- This allows users to delete deployment history records for their organization
-- (needed when deleting templates that have deployment history)

CREATE POLICY "Users can delete deployment history for their organization"
  ON user_deployment_history
  FOR DELETE
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );
