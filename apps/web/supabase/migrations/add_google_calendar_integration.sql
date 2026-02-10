-- Google Calendar Integration Migration
-- Adds fields for calendar booking links and out-of-office settings

-- Add calendar-related fields to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS google_calendar_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS google_booking_url TEXT,
ADD COLUMN IF NOT EXISTS ooo_banner_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS ooo_custom_message TEXT,
ADD COLUMN IF NOT EXISTS calendar_sync_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS last_calendar_sync TIMESTAMPTZ;

-- Add calendar metadata to provider_connections for storing calendar-specific tokens/data
-- The metadata JSONB field already exists, we'll use it for calendar data like:
-- {
--   "calendar_enabled": true,
--   "booking_links": [...],
--   "last_ooo_check": "2026-02-10T00:00:00Z",
--   "ooo_status": { "isOutOfOffice": false }
-- }

-- Create a table for organization-level OOO banner settings
CREATE TABLE IF NOT EXISTS ooo_banner_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT true,
  banner_image_url TEXT,
  banner_text TEXT DEFAULT 'I am currently out of office and will respond when I return.',
  banner_background_color TEXT DEFAULT '#FEF3C7',
  banner_text_color TEXT DEFAULT '#92400E',
  show_return_date BOOLEAN DEFAULT true,
  auto_detect_ooo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id)
);

-- Enable RLS on ooo_banner_settings
ALTER TABLE ooo_banner_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for ooo_banner_settings
CREATE POLICY "Users can view their org's OOO banner settings"
  ON ooo_banner_settings FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

CREATE POLICY "Admins can manage their org's OOO banner settings"
  ON ooo_banner_settings FOR ALL
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text AND is_admin = true
    )
  );

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_ooo_banner_settings_org ON ooo_banner_settings(organization_id);

-- Add trigger to update updated_at
CREATE OR REPLACE FUNCTION update_ooo_banner_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ooo_banner_settings_updated_at ON ooo_banner_settings;
CREATE TRIGGER ooo_banner_settings_updated_at
  BEFORE UPDATE ON ooo_banner_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_ooo_banner_settings_updated_at();

-- Add self-manage portal control per user
ALTER TABLE users
ADD COLUMN IF NOT EXISTS self_manage_enabled BOOLEAN DEFAULT true;

-- Add organization-level settings for employee self-management features
CREATE TABLE IF NOT EXISTS organization_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  -- Employee self-manage portal settings
  allow_employee_self_manage BOOLEAN DEFAULT true,
  allow_employee_personal_links BOOLEAN DEFAULT true,
  allow_employee_calendar_integration BOOLEAN DEFAULT true,
  allow_employee_ooo_banners BOOLEAN DEFAULT true,
  -- Google Calendar org-wide settings
  google_calendar_enabled BOOLEAN DEFAULT true,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id)
);

-- Enable RLS on organization_settings
ALTER TABLE organization_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for organization_settings
CREATE POLICY "Users can view their org settings"
  ON organization_settings FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text
    )
  );

CREATE POLICY "Admins can manage their org settings"
  ON organization_settings FOR ALL
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()::text AND is_admin = true
    )
  );

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_organization_settings_org ON organization_settings(organization_id);

-- Add trigger to update updated_at
CREATE OR REPLACE FUNCTION update_organization_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS organization_settings_updated_at ON organization_settings;
CREATE TRIGGER organization_settings_updated_at
  BEFORE UPDATE ON organization_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_organization_settings_updated_at();

-- Add comment for documentation
COMMENT ON TABLE ooo_banner_settings IS 'Organization-level settings for out-of-office banners in email signatures';
COMMENT ON TABLE organization_settings IS 'Organization-level settings for employee self-management features';
COMMENT ON COLUMN users.google_calendar_enabled IS 'Whether user has enabled Google Calendar integration';
COMMENT ON COLUMN users.google_booking_url IS 'User Google Calendar booking/appointment URL';
COMMENT ON COLUMN users.ooo_banner_enabled IS 'Whether to show OOO banner when user is out of office';
COMMENT ON COLUMN users.ooo_custom_message IS 'Custom OOO message to display in signature banner';
COMMENT ON COLUMN users.calendar_sync_enabled IS 'Whether to auto-sync calendar for OOO detection';
COMMENT ON COLUMN users.self_manage_enabled IS 'Whether this user can access the self-manage portal (admin can disable)';
COMMENT ON COLUMN organization_settings.allow_employee_self_manage IS 'Whether employees can access the self-manage portal';
COMMENT ON COLUMN organization_settings.allow_employee_personal_links IS 'Whether employees can edit their personal links';
COMMENT ON COLUMN organization_settings.allow_employee_calendar_integration IS 'Whether employees can use Google Calendar integration';
COMMENT ON COLUMN organization_settings.allow_employee_ooo_banners IS 'Whether employees can enable OOO banners';
COMMENT ON COLUMN organization_settings.google_calendar_enabled IS 'Whether Google Calendar integration is enabled org-wide';
