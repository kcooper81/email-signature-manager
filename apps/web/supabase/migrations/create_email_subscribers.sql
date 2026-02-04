-- Create email_subscribers table for newsletter signups
CREATE TABLE IF NOT EXISTS email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  metadata JSONB
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);

-- Create index on is_active for filtering active subscribers
CREATE INDEX IF NOT EXISTS idx_email_subscribers_active ON email_subscribers(is_active);

-- Create index on source for analytics
CREATE INDEX IF NOT EXISTS idx_email_subscribers_source ON email_subscribers(source);
