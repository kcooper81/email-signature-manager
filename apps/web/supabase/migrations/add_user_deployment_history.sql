-- Create user_deployment_history table to track individual user deployments
CREATE TABLE IF NOT EXISTS user_deployment_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  deployment_id uuid REFERENCES signature_deployments(id),
  template_id uuid REFERENCES signature_templates(id) NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  error_message text,
  deployed_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_user_deployment_history_org ON user_deployment_history(organization_id);
CREATE INDEX IF NOT EXISTS idx_user_deployment_history_user ON user_deployment_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_deployment_history_deployed_at ON user_deployment_history(deployed_at DESC);

-- Enable RLS
ALTER TABLE user_deployment_history ENABLE ROW LEVEL SECURITY;

-- Policy for users to see their org's deployment history
CREATE POLICY "Users can view their organization's deployment history"
  ON user_deployment_history
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

-- Policy for users to insert deployment history for their org
CREATE POLICY "Users can create deployment history for their organization"
  ON user_deployment_history
  FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

