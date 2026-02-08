-- Create RBAC (Role-Based Access Control) system

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_system BOOLEAN DEFAULT false, -- System roles can't be deleted
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT, -- 'templates', 'team', 'analytics', 'settings', 'deployments'
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Role permissions junction table
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE NOT NULL,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (role_id, permission_id)
);

-- User roles table
CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  assigned_by UUID REFERENCES users(id) ON DELETE SET NULL,
  PRIMARY KEY (user_id, role_id, organization_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_roles_user ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_org ON user_roles(organization_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission ON role_permissions(permission_id);

-- Insert default system roles
INSERT INTO roles (name, description, is_system) VALUES
  ('owner', 'Organization owner with full access', true),
  ('admin', 'Administrator with full management access', true),
  ('editor', 'Can create and edit templates and deploy signatures', true),
  ('viewer', 'Read-only access to view templates and analytics', true)
ON CONFLICT (name) DO NOTHING;

-- Insert default permissions
INSERT INTO permissions (name, description, category) VALUES
  -- Template permissions
  ('templates.view', 'View signature templates', 'templates'),
  ('templates.create', 'Create new signature templates', 'templates'),
  ('templates.edit', 'Edit existing signature templates', 'templates'),
  ('templates.delete', 'Delete signature templates', 'templates'),
  ('templates.rules', 'Manage signature rules', 'templates'),
  
  -- Team permissions
  ('team.view', 'View team members', 'team'),
  ('team.add', 'Add new team members', 'team'),
  ('team.edit', 'Edit team member details', 'team'),
  ('team.delete', 'Remove team members', 'team'),
  ('team.invite', 'Send invites to team members', 'team'),
  
  -- Deployment permissions
  ('deployments.create', 'Deploy signatures to email clients', 'deployments'),
  ('deployments.view', 'View deployment history', 'deployments'),
  
  -- Analytics permissions
  ('analytics.view', 'View analytics and reports', 'analytics'),
  ('analytics.export', 'Export analytics data', 'analytics'),
  
  -- Settings permissions
  ('settings.organization', 'Manage organization settings', 'settings'),
  ('settings.integrations', 'Manage integrations', 'settings'),
  ('settings.billing', 'Manage billing and subscription', 'settings'),
  ('settings.roles', 'Manage roles and permissions', 'settings')
ON CONFLICT (name) DO NOTHING;

-- Assign permissions to default roles
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'owner'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'admin' AND p.name NOT IN ('settings.billing', 'settings.roles')
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'editor' AND p.category IN ('templates', 'deployments') AND p.name NOT LIKE '%.delete'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'viewer' AND p.name LIKE '%.view'
ON CONFLICT DO NOTHING;

-- Add comments
COMMENT ON TABLE roles IS 'Defines roles for role-based access control';
COMMENT ON TABLE permissions IS 'Defines granular permissions for different actions';
COMMENT ON TABLE role_permissions IS 'Maps permissions to roles';
COMMENT ON TABLE user_roles IS 'Assigns roles to users within organizations';

COMMENT ON COLUMN roles.is_system IS 'System roles cannot be deleted or modified';
COMMENT ON COLUMN permissions.category IS 'Groups permissions by feature area';
