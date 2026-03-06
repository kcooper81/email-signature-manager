-- ============================================
-- COMBINED MIGRATION: Ticket system + inbound email fixes
-- Safe to run multiple times (all IF NOT EXISTS / IF EXISTS)
-- ============================================

-- ============================================
-- A. Fix feedback.type constraint (CRITICAL for inbound email)
--    Original only allows: bug, feature, question, other
--    Inbound emails need: email, sales
-- ============================================
ALTER TABLE feedback DROP CONSTRAINT IF EXISTS feedback_type_check;
ALTER TABLE feedback ADD CONSTRAINT feedback_type_check
  CHECK (type IN ('bug', 'feature', 'question', 'other', 'email', 'sales', 'feedback'));

-- ============================================
-- B. Make ticket_notes.author_id nullable (CRITICAL for inbound email)
--    Inbound email replies have no admin author
-- ============================================
ALTER TABLE ticket_notes ALTER COLUMN author_id DROP NOT NULL;

-- ============================================
-- C. Add email_sent column to ticket_notes
-- ============================================
ALTER TABLE ticket_notes ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT false;

-- ============================================
-- D. Add inbox_email column to feedback
-- ============================================
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS inbox_email TEXT;

-- ============================================
-- E. Add snoozed_until column to feedback
-- ============================================
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS snoozed_until TIMESTAMPTZ;

-- ============================================
-- F. Enable Realtime on key tables
-- ============================================
ALTER TABLE feedback REPLICA IDENTITY FULL;
ALTER TABLE ticket_notes REPLICA IDENTITY FULL;
ALTER TABLE error_logs REPLICA IDENTITY FULL;

DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE feedback;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE ticket_notes;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE error_logs;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================
-- G. Canned Responses table
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

DO $$ BEGIN
  CREATE POLICY "Super admins can manage canned responses"
    ON canned_responses FOR ALL
    USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()::text
          AND users.is_super_admin = true
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE canned_responses REPLICA IDENTITY FULL;

-- ============================================
-- H. Mailbox Signatures table
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

DO $$ BEGIN
  CREATE POLICY "Super admins can manage mailbox signatures"
    ON mailbox_signatures FOR ALL
    USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()::text
          AND users.is_super_admin = true
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE mailbox_signatures REPLICA IDENTITY FULL;

-- Seed default mailbox entries
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
-- I. Auto-Responder Settings table
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

DO $$ BEGIN
  CREATE POLICY "Super admins can manage auto-responder"
    ON auto_responder_settings FOR ALL
    USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()::text
          AND users.is_super_admin = true
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Seed default settings row
INSERT INTO auto_responder_settings (is_enabled)
SELECT false WHERE NOT EXISTS (SELECT 1 FROM auto_responder_settings);

-- ============================================
-- J. Service role access for new tables
--    (webhook uses service role, not authenticated)
-- ============================================
DO $$ BEGIN
  CREATE POLICY "Service role full access to canned_responses"
    ON canned_responses FOR ALL TO service_role
    USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Service role full access to mailbox_signatures"
    ON mailbox_signatures FOR ALL TO service_role
    USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Service role full access to auto_responder_settings"
    ON auto_responder_settings FOR ALL TO service_role
    USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
