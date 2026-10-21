-- Inbox feature columns: separate spam/read state from status, add SLA/aging,
-- a real subject column, tags, and ticket merge; plus a cascade so deleting a
-- ticket removes its notes. Additive + backfilled — safe to run against prod
-- while the current app is live (no deployed code depends on these yet).

-- 1. New columns on the ticket table (feedback).
ALTER TABLE feedback
  ADD COLUMN IF NOT EXISTS is_spam boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS read_at timestamptz,
  ADD COLUMN IF NOT EXISTS first_response_at timestamptz,
  ADD COLUMN IF NOT EXISTS subject text,
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS merged_into uuid REFERENCES feedback(id) ON DELETE SET NULL;

-- 2. Backfill from existing data so nothing visually regresses after deploy.
UPDATE feedback SET is_spam = true WHERE status = 'spam' AND is_spam = false;

-- Anything past the "new" state has effectively been read.
UPDATE feedback SET read_at = COALESCE(updated_at, created_at)
  WHERE read_at IS NULL AND status <> 'new';

-- Promote the subject out of the metadata blob.
UPDATE feedback SET subject = metadata->>'original_subject'
  WHERE subject IS NULL AND metadata ? 'original_subject';

-- First response = earliest non-internal note authored by an admin.
UPDATE feedback f SET first_response_at = n.first_at
FROM (
  SELECT ticket_id, MIN(created_at) AS first_at
  FROM ticket_notes
  WHERE author_id IS NOT NULL AND is_internal = false
  GROUP BY ticket_id
) n
WHERE f.id = n.ticket_id AND f.first_response_at IS NULL;

-- 3. Indexes for the new filters / dedup lookups.
CREATE INDEX IF NOT EXISTS idx_feedback_is_spam ON feedback (is_spam) WHERE is_spam = true;
CREATE INDEX IF NOT EXISTS idx_feedback_tags ON feedback USING gin (tags);
CREATE INDEX IF NOT EXISTS idx_feedback_resend_email_id ON feedback ((metadata->>'resend_email_id'));
CREATE INDEX IF NOT EXISTS idx_feedback_merged_into ON feedback (merged_into) WHERE merged_into IS NOT NULL;

-- 4. Remove orphaned notes, then enforce cascade delete (notes followed their ticket).
DELETE FROM ticket_notes WHERE ticket_id NOT IN (SELECT id FROM feedback);
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'ticket_notes_ticket_id_fkey'
      AND table_name = 'ticket_notes'
  ) THEN
    ALTER TABLE ticket_notes
      ADD CONSTRAINT ticket_notes_ticket_id_fkey
      FOREIGN KEY (ticket_id) REFERENCES feedback(id) ON DELETE CASCADE;
  END IF;
END $$;
