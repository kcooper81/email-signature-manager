-- Error logs table for admin monitoring
CREATE TABLE IF NOT EXISTS error_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Error details
  error_type TEXT NOT NULL, -- 'api_error', 'auth_error', 'integration_error', 'deployment_error', etc.
  error_message TEXT NOT NULL,
  error_stack TEXT,
  
  -- Context
  route TEXT, -- API route or page where error occurred
  method TEXT, -- HTTP method (GET, POST, etc.)
  status_code INTEGER,
  
  -- User context (optional - some errors may be anonymous)
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  
  -- Request details
  request_body JSONB,
  request_headers JSONB,
  
  -- Additional metadata
  metadata JSONB,
  
  -- Resolution tracking
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  resolution_notes TEXT
);

-- Index for faster queries
CREATE INDEX idx_error_logs_created_at ON error_logs(created_at DESC);
CREATE INDEX idx_error_logs_error_type ON error_logs(error_type);
CREATE INDEX idx_error_logs_organization_id ON error_logs(organization_id);
CREATE INDEX idx_error_logs_resolved ON error_logs(resolved);

-- RLS policies - only admins can access error logs
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- Admin read policy
CREATE POLICY "Admins can read error logs"
  ON error_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()::text
      AND users.is_admin = true
    )
  );

-- Admin update policy (for marking as resolved)
CREATE POLICY "Admins can update error logs"
  ON error_logs
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()::text
      AND users.is_admin = true
    )
  );

-- Service role can insert (for API routes logging errors)
CREATE POLICY "Service role can insert error logs"
  ON error_logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);
