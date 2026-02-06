# Production Migration Checklist

## Pre-Migration

- [ ] Backup production database
- [ ] Review all migration files in `apps/web/supabase/migrations/`
- [ ] Test migrations in a staging environment if available
- [ ] Notify team of upcoming maintenance window

## Required Migrations (In Order)

Apply these migrations to fix production errors:

### 1. Core RLS Policies
- [ ] `fix_signature_templates_rls.sql` - Fixes template deletion (409 error)
- [ ] `fix_signature_assignments_rls.sql` - Fixes assignment deletion
- [ ] `fix_signature_deployments_delete_rls.sql` - Fixes deployment deletion
- [ ] `fix_users_rls.sql` - Fixes user queries (400 error)

### 2. Schema Updates
- [ ] `add_target_emails_to_deployments.sql` - Fixes analytics queries (400 error)
- [ ] `add_assignment_id_to_deployments.sql` - Backward compatibility

### 3. Feedback System
- [ ] `fix_feedback_user_reference.sql` - Fixes feedback submission (500 error)

### 4. Verify Existing Migrations Are Applied
- [ ] `add_user_deployment_history.sql` - Required for deployment tracking
- [ ] `add_deployment_history_delete_policy.sql` - Required for template deletion
- [ ] `fix_users_unique_constraint.sql` - Required for Microsoft sync

## Post-Migration Verification

### Database Checks
- [ ] Verify all tables have RLS enabled
- [ ] Check that all foreign key constraints are valid
- [ ] Confirm indexes are created properly

### Functional Tests
- [ ] **Template Deletion**: Delete a test template
- [ ] **Deployments Page**: Load deployments without errors
- [ ] **Analytics Page**: View deployment statistics
- [ ] **Microsoft Sync**: Sync users from Microsoft 365
- [ ] **Feedback Form**: Submit test feedback
- [ ] **User Management**: View and manage users

### Error Monitoring
- [ ] Check Supabase logs for any new errors
- [ ] Monitor browser console for client-side errors
- [ ] Verify no 400/404/409/500 errors in network tab

## Rollback Procedure

If critical issues occur:

1. **Immediate Actions**
   - Document the specific error
   - Check Supabase logs for error details
   - Temporarily disable RLS on affected table (emergency only)

2. **Rollback Steps**
   ```sql
   -- Example: Rollback RLS policies
   DROP POLICY IF EXISTS "Users can delete their organization's templates" ON signature_templates;
   
   -- Restore from backup if needed
   -- Contact Supabase support for assistance
   ```

3. **Communication**
   - Notify team of issues
   - Provide ETA for resolution
   - Document lessons learned

## Success Criteria

Migration is successful when:
- ✅ No 400/404/409/500 errors in production
- ✅ Template deletion works correctly
- ✅ Deployments page loads all data
- ✅ Analytics display correctly
- ✅ Microsoft sync completes without errors
- ✅ Feedback submissions succeed
- ✅ All user queries return expected results

## Notes

- All migrations use `IF NOT EXISTS` / `DROP IF EXISTS` for idempotency
- Migrations can be safely re-run without causing issues
- RLS policies are recreated to ensure consistency
- No data loss should occur from these migrations
