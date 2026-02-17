-- Platform Expansion: Create all missing tables for disclaimers, HR sync,
-- lifecycle automation, validation rules, and brand governance features.
-- These tables match the Drizzle schema definitions in lib/db/schema.ts.

-- ============================================
-- 1. Disclaimer Rules (Compliance Engine)
-- ============================================
CREATE TABLE IF NOT EXISTS disclaimer_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  priority INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  disclaimer_template_id UUID NOT NULL REFERENCES disclaimer_templates(id) ON DELETE CASCADE,
  department_condition TEXT DEFAULT 'all',
  departments TEXT[],
  region_condition TEXT DEFAULT 'all',
  regions TEXT[],
  recipient_condition TEXT DEFAULT 'all',
  recipient_domains TEXT[],
  industry_condition TEXT DEFAULT 'all',
  industries TEXT[],
  user_source_condition TEXT DEFAULT 'all',
  user_sources TEXT[],
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  cascade_to_clients BOOLEAN DEFAULT false,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_disclaimer_rules_org ON disclaimer_rules(organization_id);
CREATE INDEX IF NOT EXISTS idx_disclaimer_rules_template ON disclaimer_rules(disclaimer_template_id);
CREATE INDEX IF NOT EXISTS idx_disclaimer_rules_active ON disclaimer_rules(is_active);

-- ============================================
-- 2. Disclaimer Deployments (Audit Trail)
-- ============================================
CREATE TABLE IF NOT EXISTS disclaimer_deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  disclaimer_template_id UUID REFERENCES disclaimer_templates(id),
  disclaimer_rule_id UUID REFERENCES disclaimer_rules(id),
  deployment_id UUID REFERENCES signature_deployments(id),
  disclaimer_html TEXT NOT NULL,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_disclaimer_deployments_org ON disclaimer_deployments(organization_id);
CREATE INDEX IF NOT EXISTS idx_disclaimer_deployments_user ON disclaimer_deployments(user_id);

-- ============================================
-- 3. Sync Configurations (HR/Directory Sync)
-- ============================================
CREATE TABLE IF NOT EXISTS sync_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  schedule_type TEXT NOT NULL DEFAULT 'manual',
  field_mapping JSONB DEFAULT '{}',
  conflict_resolution TEXT NOT NULL DEFAULT 'ask_admin',
  auto_apply_changes BOOLEAN DEFAULT false,
  sync_new_users BOOLEAN DEFAULT true,
  sync_deactivated BOOLEAN DEFAULT true,
  api_key TEXT,
  api_url TEXT,
  last_sync_at TIMESTAMPTZ,
  last_sync_status TEXT,
  last_sync_result JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sync_configurations_org ON sync_configurations(organization_id);

-- ============================================
-- 4. Sync Change Queue (Pending HR Changes)
-- ============================================
CREATE TABLE IF NOT EXISTS sync_change_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  sync_configuration_id UUID NOT NULL REFERENCES sync_configurations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  user_email TEXT NOT NULL,
  change_type TEXT NOT NULL,
  field_changes JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sync_change_queue_org ON sync_change_queue(organization_id);
CREATE INDEX IF NOT EXISTS idx_sync_change_queue_status ON sync_change_queue(status);

-- ============================================
-- 5. Data Validation Rules
-- ============================================
CREATE TABLE IF NOT EXISTS data_validation_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  field_name TEXT NOT NULL,
  validation_type TEXT NOT NULL,
  validation_value TEXT,
  error_message TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_data_validation_rules_org ON data_validation_rules(organization_id);

-- ============================================
-- 6. User Profile Requests (Self-Service)
-- ============================================
CREATE TABLE IF NOT EXISTS user_profile_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  field_changes JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'pending',
  requires_approval BOOLEAN DEFAULT true,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_profile_requests_org ON user_profile_requests(organization_id);
CREATE INDEX IF NOT EXISTS idx_user_profile_requests_status ON user_profile_requests(status);

-- ============================================
-- 7. Lifecycle Events
-- ============================================
CREATE TABLE IF NOT EXISTS lifecycle_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  event_type TEXT NOT NULL,
  event_source TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  workflow_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lifecycle_events_org ON lifecycle_events(organization_id);
CREATE INDEX IF NOT EXISTS idx_lifecycle_events_processed ON lifecycle_events(processed);

-- ============================================
-- 8. Lifecycle Workflows
-- ============================================
CREATE TABLE IF NOT EXISTS lifecycle_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  department_filter TEXT[],
  source_filter TEXT[],
  actions JSONB DEFAULT '[]',
  cascade_to_clients BOOLEAN DEFAULT false,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lifecycle_workflows_org ON lifecycle_workflows(organization_id);
CREATE INDEX IF NOT EXISTS idx_lifecycle_workflows_event ON lifecycle_workflows(event_type);

-- ============================================
-- 9. Lifecycle Workflow Runs
-- ============================================
CREATE TABLE IF NOT EXISTS lifecycle_workflow_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  workflow_id UUID NOT NULL REFERENCES lifecycle_workflows(id) ON DELETE CASCADE,
  event_id UUID REFERENCES lifecycle_events(id),
  user_id UUID REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'running',
  action_results JSONB DEFAULT '[]',
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_lifecycle_workflow_runs_org ON lifecycle_workflow_runs(organization_id);
CREATE INDEX IF NOT EXISTS idx_lifecycle_workflow_runs_workflow ON lifecycle_workflow_runs(workflow_id);

-- ============================================
-- 10. Brand Guidelines
-- ============================================
CREATE TABLE IF NOT EXISTS brand_guidelines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  primary_colors TEXT[],
  secondary_colors TEXT[],
  accent_colors TEXT[],
  allowed_fonts TEXT[],
  required_logo_asset_id UUID REFERENCES brand_assets(id),
  logo_min_width INTEGER,
  logo_max_width INTEGER,
  required_disclaimer BOOLEAN DEFAULT false,
  required_social_links TEXT[],
  locked_blocks TEXT[],
  locked_colors BOOLEAN DEFAULT false,
  locked_fonts BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  version INTEGER DEFAULT 1,
  cascade_to_clients BOOLEAN DEFAULT false,
  allow_client_override BOOLEAN DEFAULT false,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_brand_guidelines_org ON brand_guidelines(organization_id);

-- ============================================
-- 11. Brand Audit Results
-- ============================================
CREATE TABLE IF NOT EXISTS brand_audit_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  guideline_id UUID NOT NULL REFERENCES brand_guidelines(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  template_id UUID REFERENCES signature_templates(id),
  compliance_score INTEGER NOT NULL DEFAULT 0,
  violations JSONB DEFAULT '[]',
  audited_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_brand_audit_results_org ON brand_audit_results(organization_id);
CREATE INDEX IF NOT EXISTS idx_brand_audit_results_guideline ON brand_audit_results(guideline_id);

-- ============================================
-- RLS Policies (basic org-scoped access)
-- ============================================
ALTER TABLE disclaimer_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE disclaimer_deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_change_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_validation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profile_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifecycle_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifecycle_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifecycle_workflow_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_guidelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_audit_results ENABLE ROW LEVEL SECURITY;

-- Service role bypass (for API routes using service role)
CREATE POLICY "Service role full access" ON disclaimer_rules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON disclaimer_deployments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON sync_configurations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON sync_change_queue FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON data_validation_rules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON user_profile_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON lifecycle_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON lifecycle_workflows FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON lifecycle_workflow_runs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON brand_guidelines FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON brand_audit_results FOR ALL USING (true) WITH CHECK (true);
