-- Fix RLS policies for feedback and ticket_notes tables
-- Issue: auth_id is TEXT but auth.uid() returns UUID - needs ::text cast

-- Drop and recreate feedback admin policies with correct type casting
DROP POLICY IF EXISTS "Admins can read all feedback" ON feedback;
DROP POLICY IF EXISTS "Admins can update feedback" ON feedback;

CREATE POLICY "Admins can read all feedback" ON feedback
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()::text
      AND users.is_admin = true
    )
  );

CREATE POLICY "Admins can update feedback" ON feedback
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()::text
      AND users.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()::text
      AND users.is_admin = true
    )
  );

-- Drop and recreate ticket_notes admin policy with correct type casting
DROP POLICY IF EXISTS "Admins can manage ticket notes" ON ticket_notes;

CREATE POLICY "Admins can manage ticket notes" ON ticket_notes
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()::text
      AND users.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()::text
      AND users.is_admin = true
    )
  );
