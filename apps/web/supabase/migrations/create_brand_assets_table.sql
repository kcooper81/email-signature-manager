-- Brand Assets table for managing reusable uploaded images
CREATE TABLE IF NOT EXISTS brand_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  width INTEGER,
  height INTEGER,
  display_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'uncategorized',
  tags TEXT[] DEFAULT '{}',
  description TEXT,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_brand_assets_org ON brand_assets(organization_id);
CREATE INDEX IF NOT EXISTS idx_brand_assets_category ON brand_assets(organization_id, category);
CREATE INDEX IF NOT EXISTS idx_brand_assets_created ON brand_assets(created_at DESC);

-- RLS policies
ALTER TABLE brand_assets ENABLE ROW LEVEL SECURITY;

-- Users can view assets in their organization
CREATE POLICY "Users can view org brand assets"
  ON brand_assets FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

-- Users can insert assets in their organization
CREATE POLICY "Users can insert org brand assets"
  ON brand_assets FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

-- Users can update assets in their organization
CREATE POLICY "Users can update org brand assets"
  ON brand_assets FOR UPDATE
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

-- Users can delete assets in their organization
CREATE POLICY "Users can delete org brand assets"
  ON brand_assets FOR DELETE
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

COMMENT ON TABLE brand_assets IS 'Stores metadata for uploaded brand assets (logos, banners, icons) for reuse across templates';
COMMENT ON COLUMN brand_assets.category IS 'Asset category: logo, banner, icon, photo, uncategorized';
COMMENT ON COLUMN brand_assets.usage_count IS 'Number of times this asset has been used in templates';
