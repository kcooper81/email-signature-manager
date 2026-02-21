-- Add webhook_secret column to sync_configurations table
ALTER TABLE sync_configurations ADD COLUMN IF NOT EXISTS webhook_secret TEXT;
