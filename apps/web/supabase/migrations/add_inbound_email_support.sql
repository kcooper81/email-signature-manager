-- Allow ticket_notes.author_id to be null (for inbound email replies from external users)
ALTER TABLE ticket_notes ALTER COLUMN author_id DROP NOT NULL;

-- Enable Supabase Realtime on the feedback table for live admin updates
ALTER PUBLICATION supabase_realtime ADD TABLE feedback;
