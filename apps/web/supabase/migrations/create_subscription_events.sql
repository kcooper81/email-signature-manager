-- Create subscription_events table to track all subscription changes
CREATE TABLE IF NOT EXISTS subscription_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  subscription_id UUID,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'created', 'upgraded', 'downgraded', 'canceled', 'reactivated', 
    'payment_failed', 'payment_succeeded', 'trial_started', 'trial_ended'
  )),
  from_plan TEXT,
  to_plan TEXT,
  from_status TEXT,
  to_status TEXT,
  stripe_event_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add RLS policies
ALTER TABLE subscription_events ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role has full access to subscription_events" ON subscription_events
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow admin users to read all events
CREATE POLICY "Admins can read subscription events" ON subscription_events
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.is_admin = true
    )
  );

-- Create indexes for efficient queries
CREATE INDEX idx_subscription_events_org ON subscription_events(organization_id);
CREATE INDEX idx_subscription_events_created ON subscription_events(created_at DESC);
CREATE INDEX idx_subscription_events_type ON subscription_events(event_type);
