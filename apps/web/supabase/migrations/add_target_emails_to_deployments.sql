-- Add target_emails column to signature_deployments table
-- This column stores the list of email addresses that were targeted in the deployment
-- Used for analytics and tracking which users received signatures

ALTER TABLE signature_deployments 
ADD COLUMN IF NOT EXISTS target_emails TEXT[];

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_signature_deployments_target_emails ON signature_deployments USING GIN (target_emails);
