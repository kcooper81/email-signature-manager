-- Add details JSONB column to seo_change_log.
-- Multiple routes insert with a `details` field for metadata
-- (recommendation_id, type, user, etc.) that doesn't fit before_value/after_value.
ALTER TABLE seo_change_log
ADD COLUMN IF NOT EXISTS details jsonb;
