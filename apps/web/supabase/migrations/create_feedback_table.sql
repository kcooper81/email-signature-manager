-- Create feedback table for user feedback submissions
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  type TEXT NOT NULL CHECK (type IN ('bug', 'feature', 'question', 'other')),
  message TEXT NOT NULL,
  page_url TEXT,
  user_agent TEXT,
  metadata JSONB,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'resolved', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add RLS policies
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own feedback
CREATE POLICY "Users can insert feedback" ON feedback
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Allow service role full access for admin operations
CREATE POLICY "Service role has full access" ON feedback
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Create index for efficient queries
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX idx_feedback_status ON feedback(status);
CREATE INDEX idx_feedback_type ON feedback(type);
