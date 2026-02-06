-- Fix feedback table user_id foreign key constraint
-- The constraint was blocking inserts when user exists in auth.users but not synced to public.users
-- Make user_id optional without strict FK enforcement

-- Drop the existing foreign key constraint
ALTER TABLE feedback DROP CONSTRAINT IF EXISTS feedback_user_id_fkey;

-- Note: user_id can still store the auth user ID for reference, 
-- but we don't enforce FK since users table sync may be delayed
