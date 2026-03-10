-- Add 'spam' to feedback status CHECK constraint
-- This allows tickets to be marked as spam and filtered separately
ALTER TABLE feedback DROP CONSTRAINT IF EXISTS feedback_status_check;
ALTER TABLE feedback ADD CONSTRAINT feedback_status_check
  CHECK (status IN ('new', 'reviewed', 'resolved', 'archived', 'spam'));

-- Add DELETE policy for super admins
-- Only super admins can permanently delete tickets
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'feedback' AND policyname = 'Super admins can delete feedback'
  ) THEN
    CREATE POLICY "Super admins can delete feedback" ON feedback
      FOR DELETE TO authenticated
      USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()::text AND users.is_super_admin = true
      ));
  END IF;
END $$;
