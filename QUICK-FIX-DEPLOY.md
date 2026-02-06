# Quick Production Fix Deployment

## TL;DR - Apply These Migrations Now

Run these SQL migrations in your Supabase Dashboard (SQL Editor) in this exact order:

### 1. Fix Template Deletion (409 Error)
```sql
-- File: fix_signature_templates_rls.sql
-- Copy and paste the entire file contents into SQL Editor
```

### 2. Fix User Queries (400 Error)
```sql
-- File: fix_users_rls.sql
-- Copy and paste the entire file contents into SQL Editor
```

### 3. Fix Deployment Queries (400 Error)
```sql
-- File: add_target_emails_to_deployments.sql
-- Copy and paste the entire file contents into SQL Editor
```

### 4. Fix Assignment Deletion
```sql
-- File: fix_signature_assignments_rls.sql
-- Copy and paste the entire file contents into SQL Editor
```

### 5. Fix Deployment Deletion
```sql
-- File: fix_signature_deployments_delete_rls.sql
-- Copy and paste the entire file contents into SQL Editor
```

### 6. Fix Feedback Submission (500 Error)
```sql
-- File: fix_feedback_user_reference.sql
-- Copy and paste the entire file contents into SQL Editor
```

### 7. Add Missing Column
```sql
-- File: add_assignment_id_to_deployments.sql
-- Copy and paste the entire file contents into SQL Editor
```

## Using Supabase CLI (Faster)

```bash
cd apps/web
supabase db push --linked
```

## Verify Fixes

After running migrations, test these in production:

1. ✅ Delete a template → Should work without 409 error
2. ✅ View deployments page → Should load without 400 errors
3. ✅ View analytics → Should display stats correctly
4. ✅ Submit feedback → Should work without 500 error
5. ✅ Sync Microsoft users → Should complete successfully

## Expected Results

- **Template Deletion**: Works immediately
- **Deployment Queries**: All 400 errors resolved
- **User Queries**: All 400 errors resolved
- **Feedback API**: All 500 errors resolved
- **Microsoft Sync**: Should work if unique constraint migration was applied

## If Issues Persist

1. Check Supabase logs for specific errors
2. Verify migrations were applied successfully
3. Check that `user_deployment_history` table exists
4. Verify `fix_users_unique_constraint.sql` was applied (for Microsoft sync)

## Files Location

All migration files are in: `apps/web/supabase/migrations/`
