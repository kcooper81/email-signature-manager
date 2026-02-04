-- Add notification preference columns to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS deployment_alerts BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS weekly_digest BOOLEAN DEFAULT false;

-- Add comment for documentation
COMMENT ON COLUMN users.email_notifications IS 'Whether user wants to receive email notifications';
COMMENT ON COLUMN users.deployment_alerts IS 'Whether user wants deployment completion/failure alerts';
COMMENT ON COLUMN users.weekly_digest IS 'Whether user wants weekly activity digest emails';
