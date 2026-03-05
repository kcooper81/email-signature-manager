-- API Keys table for public signature API access
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
  created_by UUID REFERENCES users(id),
  last_used_at TIMESTAMPTZ,
  rate_limit_count INT NOT NULL DEFAULT 0,
  rate_limit_window TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast key lookup during auth
CREATE INDEX idx_api_keys_prefix_hash ON api_keys (key_prefix, key_hash) WHERE is_revoked = FALSE;

-- Index for org-scoped queries (management UI)
CREATE INDEX idx_api_keys_org ON api_keys (organization_id);

-- Enable RLS
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Policy: users can read api keys for their own organization
CREATE POLICY "Users can view own org api keys"
  ON api_keys FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

-- Policy: admins/owners can insert api keys for their org
CREATE POLICY "Admins can create api keys"
  ON api_keys FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM users
      WHERE auth_id = auth.uid()::text
        AND role IN ('owner', 'admin')
    )
  );

-- Policy: admins/owners can update (revoke) api keys for their org
CREATE POLICY "Admins can update api keys"
  ON api_keys FOR UPDATE
  USING (
    organization_id IN (
      SELECT organization_id FROM users
      WHERE auth_id = auth.uid()::text
        AND role IN ('owner', 'admin')
    )
  );
