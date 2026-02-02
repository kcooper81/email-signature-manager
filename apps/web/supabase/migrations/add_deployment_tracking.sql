-- Add deployment tracking columns
ALTER TABLE signature_deployments 
ADD COLUMN IF NOT EXISTS target_type text DEFAULT 'me',
ADD COLUMN IF NOT EXISTS target_emails text[] DEFAULT '{}';

-- Add comment for documentation
COMMENT ON COLUMN signature_deployments.target_type IS 'Type of deployment: me, selected, or all';
COMMENT ON COLUMN signature_deployments.target_emails IS 'Array of email addresses that were targeted';
