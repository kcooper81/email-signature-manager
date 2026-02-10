-- Add MSP-related fields to feedback table for partner support tracking
-- This allows tracking whether a ticket came from a partner or a partner's client

-- Add organization context fields
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS partner_organization_id UUID REFERENCES organizations(id);
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS is_partner_escalation BOOLEAN DEFAULT false;
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent'));
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;

-- Add indexes for efficient partner queries
CREATE INDEX IF NOT EXISTS idx_feedback_organization_id ON feedback(organization_id);
CREATE INDEX IF NOT EXISTS idx_feedback_partner_organization_id ON feedback(partner_organization_id);
CREATE INDEX IF NOT EXISTS idx_feedback_is_partner_escalation ON feedback(is_partner_escalation) WHERE is_partner_escalation = true;
CREATE INDEX IF NOT EXISTS idx_feedback_priority ON feedback(priority);

-- Comments for clarity
COMMENT ON COLUMN feedback.organization_id IS 'The organization this ticket is about (could be MSP or direct customer)';
COMMENT ON COLUMN feedback.partner_organization_id IS 'If submitted by/for an MSP partner, this is the MSP org ID';
COMMENT ON COLUMN feedback.is_partner_escalation IS 'True if this is an escalation from a partner (higher priority)';
COMMENT ON COLUMN feedback.priority IS 'Ticket priority: low, normal, high, urgent';
