-- Add priority and admin notes to feedback table for ticket management
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent'));
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES users(id);
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create ticket_notes table for admin replies/notes
CREATE TABLE IF NOT EXISTS ticket_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES feedback(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add RLS policies for ticket_notes
ALTER TABLE ticket_notes ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role has full access to ticket_notes" ON ticket_notes
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow admin users to manage notes
CREATE POLICY "Admins can manage ticket notes" ON ticket_notes
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.is_admin = true
    )
  );

-- Create indexes
CREATE INDEX idx_ticket_notes_ticket ON ticket_notes(ticket_id);
CREATE INDEX idx_feedback_priority ON feedback(priority);
CREATE INDEX idx_feedback_assigned ON feedback(assigned_to);
