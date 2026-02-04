-- Fix users table unique constraint to support email+organization_id composite key
-- This allows the same email to exist across different organizations

-- Drop the old single-column unique constraint
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_email_unique;

-- Add composite unique constraint on email and organization_id
ALTER TABLE users ADD CONSTRAINT users_email_organization_unique UNIQUE (email, organization_id);
