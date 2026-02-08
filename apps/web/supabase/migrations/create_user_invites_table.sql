-- Create user_invites table for managing employee invitations
CREATE TABLE IF NOT EXISTS user_invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  invited_by UUID REFERENCES organizations(id) ON DELETE CASCADE,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_invites_token ON user_invites(token);
CREATE INDEX IF NOT EXISTS idx_user_invites_email ON user_invites(email);
CREATE INDEX IF NOT EXISTS idx_user_invites_user_id ON user_invites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_invites_expires_at ON user_invites(expires_at);

-- Add comments
COMMENT ON TABLE user_invites IS 'Stores invitation tokens for employees to create accounts and self-manage their profiles';
COMMENT ON COLUMN user_invites.token IS 'Unique secure token for the invite link';
COMMENT ON COLUMN user_invites.expires_at IS 'When the invite expires (typically 7 days)';
COMMENT ON COLUMN user_invites.accepted_at IS 'When the user accepted the invite and created their account';
