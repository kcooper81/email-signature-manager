-- Add html_body column to feedback and ticket_notes for safe HTML email storage
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS html_body text;
ALTER TABLE ticket_notes ADD COLUMN IF NOT EXISTS html_body text;
