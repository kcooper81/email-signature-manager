-- ============================================
-- 1. Canned Responses
-- ============================================
CREATE TABLE IF NOT EXISTS canned_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  shortcut TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE canned_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can manage canned responses"
  ON canned_responses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()::text
        AND users.is_super_admin = true
    )
  );

-- ============================================
-- 2. Mailbox Signatures
-- ============================================
CREATE TABLE IF NOT EXISTS mailbox_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alias TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  signature_html TEXT NOT NULL DEFAULT '',
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE mailbox_signatures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can manage mailbox signatures"
  ON mailbox_signatures FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()::text
        AND users.is_super_admin = true
    )
  );

-- Seed default mailbox entries (empty signatures to start)
INSERT INTO mailbox_signatures (alias, display_name) VALUES
  ('support', 'Siggly Support'),
  ('sales', 'Siggly Sales'),
  ('help', 'Siggly Help'),
  ('contact', 'Siggly'),
  ('info', 'Siggly'),
  ('team', 'Siggly Team'),
  ('kade', 'Kade')
ON CONFLICT (alias) DO NOTHING;

-- ============================================
-- 3. Snooze support on feedback
-- ============================================
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS snoozed_until TIMESTAMPTZ;

-- ============================================
-- 4. Auto-responder settings
-- ============================================
CREATE TABLE IF NOT EXISTS auto_responder_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_enabled BOOLEAN DEFAULT false,
  subject TEXT DEFAULT 'We received your message',
  body TEXT DEFAULT 'Thank you for reaching out. We''ve received your message and will get back to you as soon as possible.',
  only_outside_hours BOOLEAN DEFAULT false,
  business_hours_start TIME DEFAULT '09:00',
  business_hours_end TIME DEFAULT '17:00',
  business_timezone TEXT DEFAULT 'America/New_York',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE auto_responder_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can manage auto-responder"
  ON auto_responder_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()::text
        AND users.is_super_admin = true
    )
  );

-- Seed a single row for the settings
INSERT INTO auto_responder_settings (is_enabled) VALUES (false)
ON CONFLICT DO NOTHING;

-- Add realtime for canned_responses (live updates if editing)
ALTER TABLE canned_responses REPLICA IDENTITY FULL;
ALTER TABLE mailbox_signatures REPLICA IDENTITY FULL;
