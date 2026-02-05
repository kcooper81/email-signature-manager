-- Allow admin users to read all feedback
CREATE POLICY "Admins can read all feedback" ON feedback
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.is_admin = true
    )
  );

-- Allow admin users to update feedback status
CREATE POLICY "Admins can update feedback" ON feedback
  FOR UPDATE TO authenticated
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
