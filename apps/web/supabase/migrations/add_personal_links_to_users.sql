-- Add personal link fields to users table
-- These fields allow each user to have their own personal URLs for Calendly, social media, etc.

ALTER TABLE users ADD COLUMN IF NOT EXISTS calendly_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS twitter_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS personal_website TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS facebook_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS youtube_url TEXT;

-- Add comments for documentation
COMMENT ON COLUMN users.calendly_url IS 'User''s personal Calendly scheduling URL (e.g., https://calendly.com/username)';
COMMENT ON COLUMN users.linkedin_url IS 'User''s LinkedIn profile URL (e.g., https://linkedin.com/in/username)';
COMMENT ON COLUMN users.twitter_url IS 'User''s Twitter/X profile URL (e.g., https://twitter.com/username)';
COMMENT ON COLUMN users.github_url IS 'User''s GitHub profile URL (e.g., https://github.com/username)';
COMMENT ON COLUMN users.personal_website IS 'User''s personal website or portfolio URL';
COMMENT ON COLUMN users.instagram_url IS 'User''s Instagram profile URL (e.g., https://instagram.com/username)';
COMMENT ON COLUMN users.facebook_url IS 'User''s Facebook profile URL';
COMMENT ON COLUMN users.youtube_url IS 'User''s YouTube channel URL';

-- Create index for faster lookups (optional, but good for performance)
CREATE INDEX IF NOT EXISTS idx_users_calendly_url ON users(calendly_url) WHERE calendly_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_linkedin_url ON users(linkedin_url) WHERE linkedin_url IS NOT NULL;
