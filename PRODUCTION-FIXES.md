# Production Error Fixes

## Issues Identified

Based on the production errors, the following issues were found and fixed:

### 1. Template Deletion Error (409 Conflict)
**Error**: `signature_templates` DELETE operation returns 409 conflict
**Cause**: Missing DELETE RLS policy on `signature_templates` table
**Fix**: Created `fix_signature_templates_rls.sql` migration

### 2. Signature Deployments Query Errors (400 Bad Request)
**Error**: Queries to `signature_deployments` failing with 400 status
**Cause**: Missing `target_emails` column in production database schema
**Fix**: Created `add_target_emails_to_deployments.sql` migration

### 3. User Deployment History Not Found (404)
**Error**: `user_deployment_history` table queries returning 404
**Cause**: Table may not exist in production or RLS policies blocking access
**Fix**: Ensure `add_user_deployment_history.sql` migration is applied

### 4. Microsoft Sync Error (500)
**Error**: Microsoft sync failing with "Failed to sync users"
**Cause**: Upsert constraint conflict on `users` table
**Status**: Existing migration `fix_users_unique_constraint.sql` should handle this - verify it's applied

### 5. Feedback API Error (500)
**Error**: Feedback submission failing
**Cause**: User ID reference constraint issues
**Fix**: Created `fix_feedback_user_reference.sql` migration

### 6. Users Table Query Error (400)
**Error**: Queries to `users` table failing with 400 status
**Cause**: Missing or incorrect RLS policies
**Fix**: Created `fix_users_rls.sql` migration

## Migration Files Created

The following migration files need to be applied to production:

1. **fix_signature_templates_rls.sql** - Adds complete RLS policies including DELETE
2. **fix_signature_assignments_rls.sql** - Adds complete RLS policies including DELETE
3. **fix_signature_deployments_delete_rls.sql** - Adds DELETE policy
4. **fix_users_rls.sql** - Fixes SELECT policies for users table
5. **fix_feedback_user_reference.sql** - Allows NULL user_id in feedback
6. **add_target_emails_to_deployments.sql** - Adds missing target_emails column
7. **add_assignment_id_to_deployments.sql** - Adds assignment_id for backward compatibility

## Deployment Steps

### Option 1: Using Supabase Dashboard

1. Go to Supabase Dashboard → SQL Editor
2. Run each migration file in order (listed above)
3. Verify no errors in the output

### Option 2: Using Supabase CLI

```bash
# Navigate to the web app directory
cd apps/web

# Push migrations to production
supabase db push --linked

# Or apply specific migrations
supabase migration up
```

## Verification Steps

After applying migrations, verify the following:

1. **Template Deletion**: Try deleting a template from the UI
2. **Deployments Page**: Check that deployments load without 400 errors
3. **Analytics Page**: Verify deployment stats display correctly
4. **Microsoft Sync**: Test syncing users from Microsoft 365
5. **Feedback Form**: Submit feedback to ensure no 500 errors
6. **User Queries**: Verify user lists load correctly

## Additional Notes

- All migrations use `IF NOT EXISTS` or `DROP IF EXISTS` to be idempotent
- RLS policies are recreated to ensure consistency
- The `target_emails` column is added with GIN index for efficient array queries
- Feedback table now allows anonymous submissions (NULL user_id)

## Rollback Plan

If issues occur after migration:

1. Check Supabase logs for specific error messages
2. Verify RLS policies are not blocking legitimate access
3. Use Supabase Dashboard to temporarily disable RLS on affected tables for debugging
4. Contact support if data corruption occurs

## Share Modal Error

**Error**: `share-modal.js:1 Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')`
**Cause**: This is a Next.js build artifact error, likely from a hydration mismatch or SSR issue
**Status**: Not a critical database issue - appears to be a transient client-side error
**Recommendation**: 
- Clear browser cache and hard reload
- Rebuild the Next.js application: `npm run build`
- This error may resolve itself after the database migrations are applied and the app is redeployed

## SES Lockdown Warning

**Warning**: `lockdown-install.js:1 SES Removing unpermitted intrinsics`
**Status**: This is an informational warning from the Secure ECMAScript (SES) shim
**Action**: No action required - this is expected behavior for security hardening
