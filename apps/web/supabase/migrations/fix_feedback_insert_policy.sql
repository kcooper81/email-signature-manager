-- Fix feedback insert policy to allow both authenticated and anonymous submissions
-- The current policy only allows authenticated users, but we want to accept anonymous feedback too

DROP POLICY IF EXISTS "Users can insert feedback" ON feedback;

-- Allow anyone (authenticated or anonymous) to insert feedback
CREATE POLICY "Anyone can insert feedback" ON feedback
  FOR INSERT
  WITH CHECK (true);
