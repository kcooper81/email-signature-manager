-- Add soft delete columns to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE;

-- Add index for performance on active users queries
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

-- Add comments for documentation
COMMENT ON COLUMN users.is_active IS 'Whether the user account is active';
COMMENT ON COLUMN users.deleted_at IS 'Timestamp when the user account was deleted';
