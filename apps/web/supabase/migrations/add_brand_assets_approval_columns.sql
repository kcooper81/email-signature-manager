-- Add approval workflow columns to brand_assets table
-- Used by the brand governance auditor to track deprecated assets

ALTER TABLE brand_assets
  ADD COLUMN IF NOT EXISTS approved_status TEXT NOT NULL DEFAULT 'approved',
  ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES users(id),
  ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;

COMMENT ON COLUMN brand_assets.approved_status IS 'Approval status: approved, pending, deprecated';
COMMENT ON COLUMN brand_assets.approved_by IS 'User who approved/deprecated this asset';
COMMENT ON COLUMN brand_assets.approved_at IS 'When the asset was approved/deprecated';

-- Index for querying by approval status (used by brand auditor)
CREATE INDEX IF NOT EXISTS idx_brand_assets_approved_status
  ON brand_assets(organization_id, approved_status);
