# Database Codebase Usage Report

**Generated:** February 12, 2026  
**Purpose:** Document which database tables and columns are actively used in the codebase

---

## Summary

Based on codebase analysis, here's what's **actively used** vs **potentially unused**:

---

## ✅ ACTIVELY USED - Missing from schema.ts

These tables are **actively used** in production code and **MUST** be added to schema.ts:

### 1. **`audit_logs`** - CRITICAL ⚠️
- **Used in:** `src/lib/audit/logger.ts`
- **Columns used:** `organization_id`, `user_id`, `action`, `resource_type`, `resource_id`, `resource_name`, `changes`, `metadata`, `ip_address`, `user_agent`
- **Status:** Fully implemented audit logging system
- **Issue:** schema.ts has wrong types (resource_id is UUID in DB but text in schema)

### 2. **`signature_clicks`** - ACTIVE ✓
- **Used in:** `src/app/api/track/click/route.ts`
- **Columns used:** All columns including UTM tracking
- **Status:** Click tracking is live and working
- **Issue:** Missing from schema.ts entirely

### 3. **`user_deployment_history`** - ACTIVE ✓
- **Used in:** `src/app/api/deployments/start/route.ts`
- **Purpose:** Tracks individual user deployment success/failure
- **Status:** Used in every deployment
- **Issue:** Missing from schema.ts entirely

### 4. **`error_logs`** - ACTIVE ✓
- **Used in:** `src/lib/error-logging.ts` (referenced in 25+ API routes)
- **Purpose:** Application error tracking and monitoring
- **Status:** Used throughout the application
- **Issue:** Missing from schema.ts entirely

### 5. **`help_articles`** - ACTIVE ✓
- **Used in:** 
  - `src/app/api/help/articles/route.ts`
  - `src/app/api/help/articles/[slug]/route.ts`
  - `src/app/api/admin/help/articles/route.ts`
- **Status:** Help documentation system is live
- **Issue:** Missing from schema.ts entirely

### 6. **`feature_releases`** + **`feature_release_items`** - ACTIVE ✓
- **Used in:** `src/app/(marketing)/help/releases/page.tsx`
- **Purpose:** Feature release announcements
- **Status:** Release notes page is live
- **Issue:** Missing from schema.ts entirely

### 7. **`disclaimer_templates`** - ACTIVE ✓
- **Used in:** 
  - `src/components/disclaimers/disclaimer-library.tsx`
  - `src/components/templates/block-editor.tsx`
- **Purpose:** Legal disclaimer template library
- **Status:** Used in signature editor
- **Issue:** Missing from schema.ts entirely

### 8. **`organization_settings`** - ACTIVE ✓
- **Used in:** 
  - `src/app/(dashboard)/settings/page.tsx`
  - `src/app/(dashboard)/team/page.tsx`
  - `src/app/(employee)/my-profile/page.tsx`
- **Purpose:** Organization-level feature permissions
- **Status:** Controls employee self-management, calendar integration, OOO banners
- **Issue:** Missing from schema.ts entirely

### 9. **`ooo_banner_settings`** - ACTIVE ✓
- **Used in:** `src/app/api/integrations/google/calendar/ooo-status/route.ts`
- **Purpose:** Out-of-office banner configuration
- **Status:** OOO feature is implemented
- **Issue:** Missing from schema.ts entirely

### 10. **`user_invites`** - ACTIVE ✓
- **Used in:** 
  - `src/app/api/team/invite/route.ts`
  - `src/app/api/invite/accept/route.ts`
  - `src/app/invite/[token]/page.tsx`
- **Purpose:** User invitation system
- **Status:** Invite flow is fully implemented
- **Issue:** Missing from schema.ts entirely

### 11. **`subscription_events`** - ACTIVE ✓
- **Used in:** 
  - `src/app/api/billing/webhook/route.ts`
  - `src/app/(admin)/admin/billing/page.tsx`
- **Purpose:** Subscription change history tracking
- **Status:** Used for billing audit trail
- **Issue:** Missing from schema.ts entirely

### 12. **`feedback`** - ACTIVE ✓
- **Used in:** Multiple pages (referenced in grep results)
- **Purpose:** User feedback collection
- **Status:** Feedback system is live
- **Issue:** Missing from schema.ts entirely

### 13. **`permissions`** + **`roles`** + **`role_permissions`** + **`user_roles`** - ACTIVE ✓
- **Used in:** `src/lib/rbac/permissions.ts` (29 matches)
- **Purpose:** Role-based access control system
- **Status:** RBAC system is implemented
- **Issue:** Missing from schema.ts entirely

---

## ⚠️ POTENTIALLY UNUSED

### 14. **`signature_impressions`** - NOT FOUND
- **Search results:** 0 matches in codebase
- **Status:** May be unused or planned for future

### 15. **`help_categories`** - UNCLEAR
- **Search results:** Not directly queried in code
- **Status:** May be used via help_articles relationship

### 16. **`ticket_notes`** - UNCLEAR
- **Search results:** Not found in source code
- **Status:** May be admin-only feature

---

## 🔴 CRITICAL COLUMN MISMATCHES

### `users` table - 15 missing columns
**These columns exist in DB and ARE USED in code:**

1. **`google_calendar_enabled`** - Used in 55 locations
   - `src/app/(dashboard)/team/edit-member-modal.tsx`
   - `src/app/(dashboard)/team/page.tsx`
   - `src/app/(employee)/my-profile/page.tsx`
   - `src/app/api/integrations/google/calendar/route.ts`

2. **`ooo_banner_enabled`** - Used in 55 locations
   - Same files as above

3. **`self_manage_enabled`** - Used in 55 locations
   - Same files as above

4. **`google_booking_url`** - Used in calendar integration

5. **`ooo_custom_message`** - Used in OOO feature

6. **`calendar_sync_enabled`** - Used in calendar sync

7. **`last_calendar_sync`** - Used in calendar sync

8. **`source`** - User import source tracking

9. **`company`** - Company field

10. **`office_location`** - Office location field

11. **`is_active`** - Soft delete flag

12. **`deleted_at`** - Soft delete timestamp

13. **`email_notifications`** - Notification preferences

14. **`deployment_alerts`** - Notification preferences

15. **`weekly_digest`** - Notification preferences

16. **`theme`** - UI theme preference

### `organizations` table - 3 missing columns
**These columns exist in DB and ARE USED in code:**

1. **`google_workspace_connected`** - Used in 6 locations
   - `src/app/(dashboard)/settings/page.tsx`
   - `src/app/(dashboard)/integrations/page.tsx`

2. **`microsoft_365_connected`** - Used in 6 locations

3. **`hubspot_connected`** - Used in 6 locations

### `provider_connections` table - 7 missing columns
**These columns exist in DB and ARE USED in code:**

1. **`token_expires_at`** - Used in 24 locations (schema.ts calls it `expires_at`)
2. **`last_sync_at`** - Used in 24 locations
3. **`metadata`** - Used for storing provider-specific data
4. **`is_active`** - Used to filter active connections
5. **`auth_type`** - OAuth vs other auth methods
6. **`admin_email`** - Admin email for connection
7. **`domain`** - Domain for connection

**Also:** `access_token` and `refresh_token` are nullable in DB but NOT NULL in schema.ts

---

## 📊 Deployment Table Structure Issue

### `signature_deployments` - COMPLETELY DIFFERENT STRUCTURE

**Database structure (ACTUAL):**
```typescript
{
  id: uuid
  organization_id: uuid (NOT NULL)
  template_id: uuid (NOT NULL)
  status: text
  total_users: integer
  successful_count: integer
  failed_count: integer
  initiated_by: uuid
  created_at: timestamp
  completed_at: timestamp
  target_emails: array
  target_type: text
}
```

**schema.ts structure (WRONG):**
```typescript
{
  id: uuid
  assignment_id: uuid (NOT NULL)
  user_id: uuid (NOT NULL)
  provider: enum
  status: enum
  rendered_html: text
  error_message: text
  deployed_at: timestamp
  created_at: timestamp
}
```

**Impact:** The database tracks **organization-level batch deployments**, but schema.ts expects **user-level individual deployments**. This is a fundamental mismatch.

**Code usage:** `src/app/api/deployments/start/route.ts` uses the database structure (correct one)

---

## 🎯 Recommendations

### Priority 1 (CRITICAL - Do Immediately)

1. **Update `schema.ts` to match production database**
   - Add all 20 missing tables
   - Fix `signature_deployments` structure
   - Add missing columns to `users`, `organizations`, `provider_connections`
   - Fix `audit_logs` type mismatch (resource_id: text → uuid)

2. **Fix nullability issues**
   - `provider_connections.access_token` and `refresh_token` should be nullable
   - `audit_logs.user_id` should be nullable

### Priority 2 (Important - This Week)

3. **Standardize timestamp types**
   - Decide: `with time zone` or `without time zone`
   - Recommendation: Use `with time zone` everywhere

4. **Add proper TypeScript types**
   - Export types for all new tables
   - Add relations for Drizzle ORM

### Priority 3 (Nice to Have)

5. **Run the audit script** to get actual data statistics
6. **Document table purposes** in schema.ts comments
7. **Add indexes** for commonly queried columns

---

## Next Steps

1. **Run the SQL audit script** (`DB-AUDIT-SCRIPT.sql`) in Supabase
2. **Share the results** so I can see actual data volumes
3. **I'll generate the corrected `schema.ts`** with all fixes
4. **Test the updated schema** with your codebase

---

## Files to Review

- `src/lib/audit/logger.ts` - Audit logging implementation
- `src/app/api/deployments/start/route.ts` - Deployment logic
- `src/app/api/track/click/route.ts` - Click tracking
- `src/lib/error-logging.ts` - Error logging
- `src/lib/rbac/permissions.ts` - RBAC system
