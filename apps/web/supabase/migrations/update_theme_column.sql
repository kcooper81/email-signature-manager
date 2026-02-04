-- Update theme column to support new theme values
ALTER TABLE users
DROP CONSTRAINT IF EXISTS users_theme_check;

ALTER TABLE users
ADD CONSTRAINT users_theme_check 
CHECK (theme IN ('light', 'dark', 'dark-blue', 'charcoal'));

-- Update existing 'dark' values to 'dark-blue' for consistency
UPDATE users
SET theme = 'dark-blue'
WHERE theme = 'dark';

COMMENT ON COLUMN users.theme IS 'User theme preference: light, dark-blue, or charcoal';
