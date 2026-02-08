-- Create audit logs system for compliance and tracking

-- Drop existing table if it exists (to ensure clean creation)
DROP TABLE IF EXISTS audit_logs CASCADE;

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Action details
  action TEXT NOT NULL, -- 'create', 'update', 'delete', 'deploy', 'invite', etc.
  resource_type TEXT NOT NULL, -- 'template', 'user', 'rule', 'deployment', etc.
  resource_id UUID,
  resource_name TEXT,
  
  -- Change details
  changes JSONB, -- Before/after values for updates
  metadata JSONB, -- Additional context
  
  -- Request details
  ip_address INET,
  user_agent TEXT,
  
  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_audit_logs_org ON audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_id ON audit_logs(resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- Composite index for common queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_org_date ON audit_logs(organization_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_date ON audit_logs(user_id, created_at DESC);

-- Add comments
COMMENT ON TABLE audit_logs IS 'Comprehensive audit trail for all actions in the system';
COMMENT ON COLUMN audit_logs.action IS 'Type of action performed: create, update, delete, deploy, invite, etc.';
COMMENT ON COLUMN audit_logs.resource_type IS 'Type of resource affected: template, user, rule, deployment, etc.';
COMMENT ON COLUMN audit_logs.changes IS 'JSON object with before/after values for updates';
COMMENT ON COLUMN audit_logs.metadata IS 'Additional context about the action';

-- Function to automatically log changes
CREATE OR REPLACE FUNCTION log_audit_event(
  p_organization_id UUID,
  p_user_id UUID,
  p_action TEXT,
  p_resource_type TEXT,
  p_resource_id UUID,
  p_resource_name TEXT,
  p_changes JSONB DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO audit_logs (
    organization_id,
    user_id,
    action,
    resource_type,
    resource_id,
    resource_name,
    changes,
    metadata
  ) VALUES (
    p_organization_id,
    p_user_id,
    p_action,
    p_resource_type,
    p_resource_id,
    p_resource_name,
    p_changes,
    p_metadata
  ) RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Example trigger for signature_templates
CREATE OR REPLACE FUNCTION audit_template_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM log_audit_event(
      NEW.organization_id,
      NEW.created_by,
      'create',
      'template',
      NEW.id,
      NEW.name,
      NULL,
      jsonb_build_object('industry', NEW.industry)
    );
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM log_audit_event(
      NEW.organization_id,
      NEW.created_by,
      'update',
      'template',
      NEW.id,
      NEW.name,
      jsonb_build_object(
        'before', jsonb_build_object('name', OLD.name, 'description', OLD.description),
        'after', jsonb_build_object('name', NEW.name, 'description', NEW.description)
      ),
      NULL
    );
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM log_audit_event(
      OLD.organization_id,
      OLD.created_by,
      'delete',
      'template',
      OLD.id,
      OLD.name,
      NULL,
      NULL
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS audit_template_changes_trigger ON signature_templates;
CREATE TRIGGER audit_template_changes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON signature_templates
  FOR EACH ROW
  EXECUTE FUNCTION audit_template_changes();
