-- MSP Multi-Tenant Database Schema
-- This migration adds support for MSP (Managed Service Provider) features:
-- - Parent/child organization relationships
-- - Multi-domain support per organization
-- - MSP user access control across client organizations
-- - Extended roles and permissions for MSP users
-- - Partner application tracking

-- ============================================
-- 1. Organization Table Updates
-- ============================================

-- Add organization type and parent relationship
ALTER TABLE organizations 
ADD COLUMN IF NOT EXISTS parent_organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL;

ALTER TABLE organizations 
ADD COLUMN IF NOT EXISTS organization_type TEXT DEFAULT 'standard' 
CHECK (organization_type IN ('standard', 'msp', 'msp_client'));

-- Branding settings for white-label support
ALTER TABLE organizations 
ADD COLUMN IF NOT EXISTS branding JSONB DEFAULT '{}';
-- branding schema: {
--   primaryColor: string (hex),
--   secondaryColor: string (hex),
--   logoUrl: string,
--   faviconUrl: string,
--   hideSignlyBranding: boolean,
--   customDomain: string (future)
-- }

-- Partner tier for MSP organizations
ALTER TABLE organizations 
ADD COLUMN IF NOT EXISTS partner_tier TEXT DEFAULT 'registered'
CHECK (partner_tier IN ('registered', 'authorized', 'premier'));

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_organizations_parent ON organizations(parent_organization_id);
CREATE INDEX IF NOT EXISTS idx_organizations_type ON organizations(organization_type);
CREATE INDEX IF NOT EXISTS idx_organizations_partner_tier ON organizations(partner_tier) WHERE organization_type = 'msp';

-- ============================================
-- 2. Organization Domains Table (Multi-Domain)
-- ============================================

CREATE TABLE IF NOT EXISTS organization_domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  domain TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false NOT NULL,
  verified BOOLEAN DEFAULT false NOT NULL,
  verification_token TEXT,
  verification_method TEXT DEFAULT 'dns_txt' CHECK (verification_method IN ('dns_txt', 'dns_cname', 'meta_tag')),
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Each domain can only belong to one organization
CREATE UNIQUE INDEX IF NOT EXISTS idx_org_domains_unique ON organization_domains(domain);
CREATE INDEX IF NOT EXISTS idx_org_domains_org ON organization_domains(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_domains_verified ON organization_domains(organization_id, verified) WHERE verified = true;

-- Ensure only one primary domain per organization
CREATE UNIQUE INDEX IF NOT EXISTS idx_org_domains_primary ON organization_domains(organization_id) WHERE is_primary = true;

COMMENT ON TABLE organization_domains IS 'Stores multiple domains per organization with verification status';
COMMENT ON COLUMN organization_domains.verification_token IS 'Token to be added as DNS TXT record for verification';

-- ============================================
-- 3. MSP Client Access Table (Cross-Org Access)
-- ============================================

CREATE TABLE IF NOT EXISTS msp_client_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  msp_user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  msp_organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  client_organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  access_level TEXT DEFAULT 'full' NOT NULL CHECK (access_level IN ('full', 'read_only', 'deploy_only', 'billing_only')),
  granted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  granted_by UUID REFERENCES users(id) ON DELETE SET NULL,
  revoked_at TIMESTAMPTZ,
  revoked_by UUID REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE(msp_user_id, client_organization_id)
);

CREATE INDEX IF NOT EXISTS idx_msp_access_user ON msp_client_access(msp_user_id);
CREATE INDEX IF NOT EXISTS idx_msp_access_msp_org ON msp_client_access(msp_organization_id);
CREATE INDEX IF NOT EXISTS idx_msp_access_client ON msp_client_access(client_organization_id);
CREATE INDEX IF NOT EXISTS idx_msp_access_active ON msp_client_access(msp_user_id) WHERE revoked_at IS NULL;

COMMENT ON TABLE msp_client_access IS 'Controls which MSP users can access which client organizations';
COMMENT ON COLUMN msp_client_access.access_level IS 'full=all access, read_only=view only, deploy_only=can deploy signatures, billing_only=billing access';

-- ============================================
-- 4. Partner Applications Table
-- ============================================

CREATE TABLE IF NOT EXISTS partner_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Applicant info
  company_name TEXT NOT NULL,
  website TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  
  -- Business info
  number_of_clients INTEGER,
  primary_services TEXT[], -- ['IT Support', 'Cloud Services', 'Security', etc.]
  how_heard_about_us TEXT,
  additional_notes TEXT,
  
  -- Application status
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'withdrawn')),
  reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT,
  
  -- If approved, link to the created MSP organization
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  
  -- Tracking
  submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_partner_apps_status ON partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_partner_apps_email ON partner_applications(contact_email);

COMMENT ON TABLE partner_applications IS 'Tracks MSP partner program applications';

-- ============================================
-- 5. Extended Roles for MSP
-- ============================================

-- Add new MSP-specific roles
INSERT INTO roles (name, description, is_system) VALUES
  ('msp_owner', 'MSP organization owner with full access to all client organizations', true),
  ('msp_admin', 'MSP administrator who can manage client organizations', true),
  ('client_admin', 'Client organization admin with self-service access (managed by MSP)', true)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 6. Extended Permissions for MSP
-- ============================================

-- Add MSP-specific permissions
INSERT INTO permissions (name, description, category) VALUES
  -- MSP management permissions
  ('msp.view_clients', 'View all client organizations', 'msp'),
  ('msp.manage_clients', 'Create, edit, and delete client organizations', 'msp'),
  ('msp.switch_context', 'Switch between client organization contexts', 'msp'),
  ('msp.billing', 'View and manage consolidated billing for all clients', 'msp'),
  ('msp.branding', 'Configure white-label branding settings', 'msp'),
  ('msp.analytics', 'View aggregate analytics across all client organizations', 'msp'),
  ('msp.invite_client_admin', 'Invite client administrators to their organizations', 'msp'),
  
  -- Partner program permissions
  ('partner.view_applications', 'View partner program applications (platform admin)', 'partner'),
  ('partner.manage_applications', 'Approve/reject partner applications (platform admin)', 'partner'),
  
  -- Domain management
  ('domains.view', 'View organization domains', 'domains'),
  ('domains.manage', 'Add, verify, and remove organization domains', 'domains')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 7. Assign Permissions to MSP Roles
-- ============================================

-- MSP Owner gets all MSP permissions + all standard permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'msp_owner' 
  AND (p.category IN ('msp', 'domains') OR p.category NOT IN ('partner'))
ON CONFLICT DO NOTHING;

-- MSP Admin gets MSP permissions except billing
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'msp_admin' 
  AND p.category = 'msp'
  AND p.name NOT IN ('msp.billing')
ON CONFLICT DO NOTHING;

-- MSP Admin also gets standard admin permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'msp_admin' 
  AND p.category IN ('templates', 'team', 'deployments', 'analytics', 'domains')
ON CONFLICT DO NOTHING;

-- Client Admin gets standard admin permissions for their org
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'client_admin' 
  AND p.category IN ('templates', 'team', 'deployments', 'analytics', 'domains')
  AND p.name NOT IN ('team.delete', 'templates.delete')
ON CONFLICT DO NOTHING;

-- ============================================
-- 8. Helper Functions
-- ============================================

-- Function to get all client organizations for an MSP
CREATE OR REPLACE FUNCTION get_msp_clients(msp_org_id UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  domain TEXT,
  user_count BIGINT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.name,
    o.slug,
    o.domain,
    (SELECT COUNT(*) FROM users u WHERE u.organization_id = o.id) as user_count,
    o.created_at
  FROM organizations o
  WHERE o.parent_organization_id = msp_org_id
    AND o.organization_type = 'msp_client'
  ORDER BY o.name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if a user has access to a client organization
CREATE OR REPLACE FUNCTION user_has_client_access(
  p_user_id UUID,
  p_client_org_id UUID,
  p_required_level TEXT DEFAULT 'read_only'
) RETURNS BOOLEAN AS $$
DECLARE
  v_access_level TEXT;
  v_user_org_id UUID;
  v_client_parent_id UUID;
BEGIN
  -- Get user's organization
  SELECT organization_id INTO v_user_org_id FROM users WHERE id = p_user_id;
  
  -- Check if user is directly in the client org
  IF v_user_org_id = p_client_org_id THEN
    RETURN TRUE;
  END IF;
  
  -- Check if user's org is the parent MSP of the client
  SELECT parent_organization_id INTO v_client_parent_id 
  FROM organizations WHERE id = p_client_org_id;
  
  IF v_user_org_id = v_client_parent_id THEN
    -- User is in the MSP org, check their access level
    SELECT access_level INTO v_access_level
    FROM msp_client_access
    WHERE msp_user_id = p_user_id
      AND client_organization_id = p_client_org_id
      AND revoked_at IS NULL;
    
    -- If no specific access record, check if user is MSP owner/admin (implicit full access)
    IF v_access_level IS NULL THEN
      -- Check if user has msp.view_clients permission (MSP owner/admin)
      IF EXISTS (
        SELECT 1 FROM user_roles ur
        JOIN role_permissions rp ON ur.role_id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE ur.user_id = p_user_id
          AND ur.organization_id = v_user_org_id
          AND p.name = 'msp.view_clients'
      ) THEN
        RETURN TRUE;
      END IF;
      RETURN FALSE;
    END IF;
    
    -- Check access level hierarchy: full > deploy_only > read_only
    IF p_required_level = 'read_only' THEN
      RETURN v_access_level IN ('full', 'deploy_only', 'read_only', 'billing_only');
    ELSIF p_required_level = 'deploy_only' THEN
      RETURN v_access_level IN ('full', 'deploy_only');
    ELSIF p_required_level = 'full' THEN
      RETURN v_access_level = 'full';
    ELSIF p_required_level = 'billing_only' THEN
      RETURN v_access_level IN ('full', 'billing_only');
    END IF;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 9. Row Level Security Policies
-- ============================================

-- Enable RLS on new tables
ALTER TABLE organization_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE msp_client_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

-- Organization domains: users can see domains for their org or client orgs they manage
CREATE POLICY "Users can view their org domains" ON organization_domains
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()
    )
    OR
    user_has_client_access(
      (SELECT id FROM users WHERE auth_id = auth.uid()),
      organization_id,
      'read_only'
    )
  );

CREATE POLICY "Admins can manage their org domains" ON organization_domains
  FOR ALL USING (
    organization_id IN (
      SELECT u.organization_id FROM users u
      WHERE u.auth_id = auth.uid() AND u.role IN ('owner', 'admin')
    )
  );

-- MSP client access: MSP users can see their access records
CREATE POLICY "MSP users can view their access" ON msp_client_access
  FOR SELECT USING (
    msp_user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY "MSP owners can manage access" ON msp_client_access
  FOR ALL USING (
    msp_organization_id IN (
      SELECT u.organization_id FROM users u
      WHERE u.auth_id = auth.uid() AND u.role = 'owner'
    )
  );

-- Partner applications: only platform admins can view
CREATE POLICY "Platform admins can view applications" ON partner_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE auth_id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Anyone can submit applications" ON partner_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Platform admins can manage applications" ON partner_applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE auth_id = auth.uid() AND is_admin = true
    )
  );

-- ============================================
-- 10. Triggers
-- ============================================

-- Update updated_at on organization_domains
CREATE OR REPLACE FUNCTION update_organization_domains_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_organization_domains_updated_at
  BEFORE UPDATE ON organization_domains
  FOR EACH ROW
  EXECUTE FUNCTION update_organization_domains_updated_at();

-- Update updated_at on partner_applications
CREATE OR REPLACE FUNCTION update_partner_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_partner_applications_updated_at
  BEFORE UPDATE ON partner_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_partner_applications_updated_at();

-- ============================================
-- 11. Comments
-- ============================================

COMMENT ON COLUMN organizations.parent_organization_id IS 'For MSP clients, points to the parent MSP organization';
COMMENT ON COLUMN organizations.organization_type IS 'standard=direct customer, msp=managed service provider, msp_client=client managed by MSP';
COMMENT ON COLUMN organizations.branding IS 'White-label branding settings (JSON)';
COMMENT ON COLUMN organizations.partner_tier IS 'MSP partner program tier (registered, authorized, premier)';
