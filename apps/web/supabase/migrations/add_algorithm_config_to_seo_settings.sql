-- Add algorithm_config JSONB column to seo_settings
-- Stores engine parameter overrides as a single JSON object.
-- Defaults live in code; the DB stores only overrides.
ALTER TABLE seo_settings
ADD COLUMN IF NOT EXISTS algorithm_config jsonb NOT NULL DEFAULT '{}'::jsonb;
