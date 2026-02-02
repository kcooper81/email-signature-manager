-- Drop and recreate signature_deployments with correct schema for bulk deployments
DROP TABLE IF EXISTS signature_deployments CASCADE;

CREATE TABLE signature_deployments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  template_id uuid REFERENCES signature_templates(id) NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  total_users integer DEFAULT 0 NOT NULL,
  successful_count integer DEFAULT 0 NOT NULL,
  failed_count integer DEFAULT 0 NOT NULL,
  initiated_by uuid,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  completed_at timestamp with time zone
);

-- Enable RLS
ALTER TABLE signature_deployments ENABLE ROW LEVEL SECURITY;

-- Policy for users to see their org's deployments
CREATE POLICY "Users can view their organization's deployments"
  ON signature_deployments
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

-- Policy for users to insert deployments for their org
CREATE POLICY "Users can create deployments for their organization"
  ON signature_deployments
  FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

-- Policy for users to update their org's deployments
CREATE POLICY "Users can update their organization's deployments"
  ON signature_deployments
  FOR UPDATE
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );
