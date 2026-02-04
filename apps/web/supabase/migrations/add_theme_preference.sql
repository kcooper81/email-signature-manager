-- Add theme preference column to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS theme VARCHAR(10) DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system'));

-- Add comment for documentation
COMMENT ON COLUMN users.theme IS 'User theme preference: light, dark, or system';
