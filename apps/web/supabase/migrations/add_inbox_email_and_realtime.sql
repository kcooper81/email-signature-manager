-- Add inbox_email column to feedback table (proper column instead of metadata JSON)
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS inbox_email TEXT;

-- Enable Supabase Realtime with full replica identity on key tables
ALTER TABLE feedback REPLICA IDENTITY FULL;
ALTER TABLE ticket_notes REPLICA IDENTITY FULL;
ALTER TABLE error_logs REPLICA IDENTITY FULL;

-- Add tables to realtime publication (ignore errors if already added)
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE feedback;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE ticket_notes;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE error_logs;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
