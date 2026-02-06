-- Add assignment_id column to signature_deployments for backward compatibility
-- Some queries may still reference this field from the old schema

ALTER TABLE signature_deployments 
ADD COLUMN IF NOT EXISTS assignment_id UUID REFERENCES signature_assignments(id);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_signature_deployments_assignment_id ON signature_deployments(assignment_id);
