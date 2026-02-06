-- Fix feedback table to allow NULL user_id for anonymous feedback
-- The user_id should reference auth.users, not the users table
-- This allows feedback to be submitted even when user is not in users table yet

-- Drop the existing constraint if it exists
ALTER TABLE feedback DROP CONSTRAINT IF EXISTS feedback_user_id_fkey;

-- Make user_id nullable and don't enforce foreign key
-- This allows anonymous feedback and avoids 500 errors when user doesn't exist in users table
ALTER TABLE feedback ALTER COLUMN user_id DROP NOT NULL;
