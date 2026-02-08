-- Create feature_releases table for tracking product updates and changelog
CREATE TABLE IF NOT EXISTS feature_releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  release_date DATE NOT NULL DEFAULT CURRENT_DATE,
  release_type TEXT NOT NULL DEFAULT 'feature' CHECK (release_type IN ('major', 'feature', 'improvement', 'fix')),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create feature_release_items table for individual features within a release
CREATE TABLE IF NOT EXISTS feature_release_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  release_id UUID NOT NULL REFERENCES feature_releases(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'feature' CHECK (category IN ('feature', 'improvement', 'fix', 'security')),
  icon TEXT,
  link_url TEXT,
  link_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_feature_releases_date ON feature_releases(release_date DESC);
CREATE INDEX IF NOT EXISTS idx_feature_releases_published ON feature_releases(is_published);
CREATE INDEX IF NOT EXISTS idx_feature_release_items_release ON feature_release_items(release_id);

-- Enable RLS
ALTER TABLE feature_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_release_items ENABLE ROW LEVEL SECURITY;

-- Public read access for published releases
CREATE POLICY "Public can view published releases"
  ON feature_releases FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public can view release items"
  ON feature_release_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM feature_releases 
    WHERE feature_releases.id = feature_release_items.release_id 
    AND feature_releases.is_published = true
  ));

-- Insert February 2026 release
INSERT INTO feature_releases (version, title, description, release_date, release_type) VALUES
('2.0.0', 'February 2026 Release', 'Major feature release including Personal Links, Signature Rules, Campaign Banners, Analytics, RBAC, Audit Logs, and Disclaimers Library.', '2026-02-08', 'major');

-- Get the release ID and insert items
DO $$
DECLARE
  release_uuid UUID;
BEGIN
  SELECT id INTO release_uuid FROM feature_releases WHERE version = '2.0.0';
  
  INSERT INTO feature_release_items (release_id, title, description, category, icon, link_url, link_text, sort_order) VALUES
  (release_uuid, 'Personal Links', 'Employees can now add their own Calendly, LinkedIn, and social media links directly from their Profile Settings or via admin on the Team page apply to signatures.', 'feature', 'Link2', '/features', 'Learn more', 1),
  (release_uuid, 'Bulk Invite', 'Admins can select multiple team members and send bulk invitations, allowing employees to create accounts and manage their own profile information.', 'feature', 'UserPlus', '/features', 'Learn more', 2),
  (release_uuid, 'Signature Rules', 'Create conditional logic to automatically apply different signatures based on recipient type (internal/external), sender department, or campaign date ranges.', 'feature', 'GitBranch', '/features', 'Learn more', 3),
  (release_uuid, 'Campaign Banners', 'Add promotional banners to signatures with built-in click tracking. Schedule campaigns with start and end dates for product launches and events.', 'feature', 'Image', '/features', 'Learn more', 4),
  (release_uuid, 'Analytics Dashboard', 'Track clicks on links and banners. Monitor which signatures drive the most engagement and measure your email marketing ROI.', 'feature', 'BarChart3', '/features', 'Learn more', 5),
  (release_uuid, 'Role-Based Access Control', 'Assign granular permissions with Owner, Admin, Editor, and Viewer roles. Control who can create, edit, or only view templates and settings.', 'feature', 'Shield', '/features', 'Learn more', 6),
  (release_uuid, 'Audit Logs', 'Complete record of all actions for compliance. Track who changed what and when with before/after values. Essential for SOC 2 and HIPAA.', 'feature', 'ClipboardList', '/features', 'Learn more', 7),
  (release_uuid, 'Disclaimers Library', 'Browse and insert 15+ pre-written legal disclaimers including GDPR, HIPAA, confidentiality notices, and industry-specific compliance text.', 'feature', 'FileText', '/features', 'Learn more', 8);
END $$;
