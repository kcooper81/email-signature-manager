-- Create signature rules system for conditional signature deployment
-- Based on WiseStamp and Exclaimer functionality

-- Signature rules table
CREATE TABLE IF NOT EXISTS signature_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID REFERENCES signature_templates(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  priority INTEGER DEFAULT 0, -- Higher priority rules evaluated first
  is_active BOOLEAN DEFAULT true,
  
  -- Sender conditions
  sender_condition TEXT DEFAULT 'all', -- 'all', 'specific_users', 'specific_departments', 'specific_groups'
  sender_user_ids UUID[], -- Array of user IDs if sender_condition = 'specific_users'
  sender_departments TEXT[], -- Array of departments if sender_condition = 'specific_departments'
  
  -- Email type conditions
  email_type TEXT DEFAULT 'all', -- 'all', 'new', 'reply'
  
  -- Recipient conditions
  recipient_condition TEXT DEFAULT 'all', -- 'all', 'all_internal', 'all_external', 'at_least_one_internal', 'at_least_one_external'
  
  -- Date/Time conditions (for campaigns)
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  
  -- Advanced conditions (future)
  subject_contains TEXT,
  subject_not_contains TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_signature_rules_template_id ON signature_rules(template_id);
CREATE INDEX IF NOT EXISTS idx_signature_rules_organization_id ON signature_rules(organization_id);
CREATE INDEX IF NOT EXISTS idx_signature_rules_is_active ON signature_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_signature_rules_priority ON signature_rules(priority DESC);
CREATE INDEX IF NOT EXISTS idx_signature_rules_dates ON signature_rules(start_date, end_date);

-- Add comments
COMMENT ON TABLE signature_rules IS 'Defines conditional rules for when signatures should be applied';
COMMENT ON COLUMN signature_rules.priority IS 'Higher numbers evaluated first. Used to resolve conflicts when multiple rules match.';
COMMENT ON COLUMN signature_rules.sender_condition IS 'Who can use this signature: all, specific_users, specific_departments, specific_groups';
COMMENT ON COLUMN signature_rules.email_type IS 'When to apply: all emails, new (compose) only, or reply only';
COMMENT ON COLUMN signature_rules.recipient_condition IS 'Based on recipients: all, all_internal, all_external, at_least_one_internal, at_least_one_external';
COMMENT ON COLUMN signature_rules.start_date IS 'Optional: Rule only active after this date (for campaigns)';
COMMENT ON COLUMN signature_rules.end_date IS 'Optional: Rule only active until this date (for campaigns)';

-- Add default_signature flag to signature_templates
ALTER TABLE signature_templates ADD COLUMN IF NOT EXISTS is_default BOOLEAN DEFAULT false;
COMMENT ON COLUMN signature_templates.is_default IS 'Fallback signature when no rules match';

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_signature_rules_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS signature_rules_updated_at ON signature_rules;
CREATE TRIGGER signature_rules_updated_at
  BEFORE UPDATE ON signature_rules
  FOR EACH ROW
  EXECUTE FUNCTION update_signature_rules_updated_at();
