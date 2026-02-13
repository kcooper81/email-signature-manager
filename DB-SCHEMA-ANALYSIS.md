# Database Schema Analysis Report

**Generated:** February 12, 2026  
**Purpose:** Identify discrepancies between production database and schema.ts

---

## Executive Summary

The production database has **significantly diverged** from `schema.ts`. There are:
- **13 tables** in the database that are **missing** from schema.ts
- **Multiple column mismatches** in existing tables (wrong types, nullability, missing columns)
- **Type inconsistencies** between database enums and schema definitions
- **Timestamp type mismatches** (with/without timezone)

**Risk Level:** 🔴 **HIGH** - This could cause runtime errors, failed queries, and data integrity issues.

---

## 1. Tables Missing from schema.ts

These tables exist in production but are **NOT defined** in `schema.ts`:

### Marketing & Content Tables
1. **`disclaimer_templates`** - Legal disclaimer templates
2. **`help_articles`** - Help documentation articles  
3. **`help_categories`** - Help article categories
4. **`feature_releases`** - Feature release announcements
5. **`feature_release_items`** - Individual items in releases

### System & Operations Tables
6. **`error_logs`** - Application error tracking
7. **`feedback`** - User feedback submissions
8. **`email_subscribers`** - Newsletter subscribers (exists in schema.ts but with DIFFERENT structure)

### User & Organization Tables
9. **`ooo_banner_settings`** - Out-of-office banner configuration
10. **`organization_settings`** - Organization-level settings
11. **`user_invites`** - User invitation system

### Analytics Tables
12. **`signature_clicks`** - Click tracking for signature links
13. **`signature_impressions`** - Impression tracking for signatures

### Subscription & Permissions Tables
14. **`subscription_events`** - Subscription change history
15. **`user_deployment_history`** - Individual user deployment tracking
16. **`permissions`** - Permission definitions
17. **`roles`** - Role definitions
18. **`role_permissions`** - Role-permission mappings
19. **`user_roles`** - User-role assignments
20. **`ticket_notes`** - Support ticket notes

---

## 2. Column Mismatches in Existing Tables

### `audit_logs`
**Database has:**
- `user_id` (uuid, nullable)
- `resource_id` (uuid, nullable)
- `resource_name` (text, nullable)
- `changes` (jsonb)
- `ip_address` (inet)
- `user_agent` (text)

**schema.ts has:**
- `user_id` (uuid, NOT NULL) ❌
- `resource_id` (text, NOT NULL) ❌ Wrong type!
- Missing: `resource_name`, `changes`, `ip_address`, `user_agent`
- Extra: `affected_user_ids` (array)

**Impact:** Queries will fail when `user_id` is null, type mismatch on `resource_id`

---

### `email_subscribers`
**Database structure is CORRECT** (matches what's in schema.ts)
- No issues found ✅

---

### `job_logs`
**Database has:**
- All timestamps are `timestamp without time zone`

**schema.ts has:**
- All timestamps are `timestamp with time zone`

**Impact:** Timezone data will be lost/misinterpreted

---

### `msp_client_access`
**Database has:**
- `access_level` (text with default 'full')

**schema.ts has:**
- `access_level` (enum msp_access_level)

**Impact:** Database is using text instead of enum - less type safety

---

### `organizations`
**Database has:**
- `created_at` (timestamp without time zone)
- `updated_at` (timestamp without time zone)
- `organization_type` (text)
- `partner_tier` (text)
- `google_workspace_connected` (boolean)
- `microsoft_365_connected` (boolean)
- `hubspot_connected` (boolean)

**schema.ts has:**
- `created_at` (timestamp with time zone)
- `updated_at` (timestamp with time zone)
- `organization_type` (enum)
- `partner_tier` (enum)
- Missing: `google_workspace_connected`, `microsoft_365_connected`, `hubspot_connected`

**Impact:** 
- Timezone issues
- Type safety issues (text vs enum)
- Missing integration status flags

---

### `partner_applications`
**Database has:**
- `status` (text with default 'pending')
- `existing_organization_id` (uuid, nullable)

**schema.ts has:**
- `status` (enum partner_application_status)
- Missing: `existing_organization_id`

**Impact:** Missing column for linking to existing orgs

---

### `provider_connections`
**Database has:**
- `access_token` (text, nullable)
- `refresh_token` (text, nullable)
- `token_expires_at` (timestamp without time zone)
- `connected_by` (uuid, nullable)
- `created_at` (timestamp without time zone)
- `updated_at` (timestamp without time zone)
- `is_active` (boolean)
- `auth_type` (text)
- `admin_email` (text)
- `domain` (text)
- `metadata` (jsonb)
- `last_sync_at` (timestamp with time zone)

**schema.ts has:**
- `access_token` (text, NOT NULL) ❌
- `refresh_token` (text, NOT NULL) ❌
- `expires_at` (timestamp with time zone) - different name!
- `connected_by` (uuid, NOT NULL) ❌
- `created_at` (timestamp with time zone)
- `updated_at` (timestamp with time zone)
- Missing: `is_active`, `auth_type`, `admin_email`, `domain`, `metadata`, `last_sync_at`

**Impact:** 
- Queries will fail when tokens are null
- Column name mismatch (`expires_at` vs `token_expires_at`)
- Missing critical integration metadata

---

### `signature_assignments`
**Database has:**
- `created_at` (timestamp without time zone)

**schema.ts has:**
- `created_at` (timestamp with time zone)

**Impact:** Timezone data loss

---

### `signature_deployments`
**Database has:**
- `organization_id` (uuid, NOT NULL)
- `template_id` (uuid, NOT NULL)
- `status` (text)
- `total_users` (integer)
- `successful_count` (integer)
- `failed_count` (integer)
- `initiated_by` (uuid, nullable)
- `created_at` (timestamp with time zone)
- `completed_at` (timestamp with time zone)
- `target_emails` (array)
- `target_type` (text)

**schema.ts has:**
- `assignment_id` (uuid, NOT NULL)
- `user_id` (uuid, NOT NULL)
- `provider` (enum email_provider, NOT NULL)
- `status` (enum deployment_status)
- `rendered_html` (text)
- `error_message` (text)
- `deployed_at` (timestamp)
- `created_at` (timestamp with time zone)

**Impact:** 🔴 **COMPLETELY DIFFERENT STRUCTURE** - This is a critical mismatch!

---

### `signature_rules`
**Database has:**
- All timestamps without timezone defaults

**schema.ts has:**
- All timestamps with timezone

**Impact:** Timezone issues

---

### `signature_templates`
**Database has:**
- `created_at` (timestamp without time zone)
- `updated_at` (timestamp without time zone)

**schema.ts has:**
- `created_at` (timestamp with time zone)
- `updated_at` (timestamp with time zone)

**Impact:** Timezone data loss

---

### `subscriptions`
**Database has:**
- `created_at` (timestamp without time zone)
- `updated_at` (timestamp without time zone)
- `current_period_start` (timestamp without time zone)
- `current_period_end` (timestamp without time zone)

**schema.ts has:**
- All timestamps with time zone

**Impact:** Timezone data loss

---

### `users`
**Database has:**
- `created_at` (timestamp without time zone)
- `updated_at` (timestamp without time zone)
- `source` (text, default 'manual')
- `company` (text)
- `office_location` (text)
- `email_notifications` (boolean)
- `deployment_alerts` (boolean)
- `weekly_digest` (boolean)
- `theme` (text, default 'system')
- `is_active` (boolean, default true)
- `deleted_at` (timestamp with time zone)
- `google_calendar_enabled` (boolean)
- `google_booking_url` (text)
- `ooo_banner_enabled` (boolean)
- `ooo_custom_message` (text)
- `calendar_sync_enabled` (boolean)
- `last_calendar_sync` (timestamp with time zone)
- `self_manage_enabled` (boolean)

**schema.ts has:**
- All timestamps with time zone
- Missing: `source`, `company`, `office_location`, `email_notifications`, `deployment_alerts`, `weekly_digest`, `theme`, `is_active`, `deleted_at`, `google_calendar_enabled`, `google_booking_url`, `ooo_banner_enabled`, `ooo_custom_message`, `calendar_sync_enabled`, `last_calendar_sync`, `self_manage_enabled`

**Impact:** 🔴 **CRITICAL** - Many user features won't work properly

---

## 3. Critical Issues & Risks

### 🔴 **HIGH PRIORITY**

1. **`signature_deployments` table structure is completely different**
   - Database tracks org-level batch deployments
   - schema.ts expects user-level individual deployments
   - **Risk:** Deployment system may be completely broken

2. **`users` table missing 15+ columns**
   - Missing user preferences, settings, feature flags
   - **Risk:** User features (calendar, OOO, notifications) won't work

3. **`provider_connections` missing critical fields**
   - Missing `metadata`, `last_sync_at`, `is_active`, `auth_type`
   - Token fields are nullable in DB but NOT NULL in schema
   - **Risk:** Integration syncs will fail

4. **`audit_logs` type mismatch**
   - `resource_id` is UUID in DB but text in schema
   - Missing tracking fields (`ip_address`, `user_agent`, `changes`)
   - **Risk:** Audit logging broken

### 🟡 **MEDIUM PRIORITY**

5. **20 tables missing from schema.ts**
   - Features exist in production but not in type definitions
   - **Risk:** No type safety, harder to maintain

6. **Timestamp timezone inconsistencies**
   - Most tables use `timestamp without time zone` in DB
   - schema.ts uses `timestamp with time zone`
   - **Risk:** Timezone bugs, incorrect time calculations

7. **Enum vs text type mismatches**
   - Several fields use text in DB but enums in schema
   - **Risk:** Less type safety, potential invalid values

### 🟢 **LOW PRIORITY**

8. **`organizations` missing integration flags**
   - Missing `google_workspace_connected`, etc.
   - **Risk:** Can't easily check integration status

---

## 4. Recommended Actions

### Immediate (This Week)

1. **Update `schema.ts` to match production database**
   - Add all 20 missing tables
   - Fix column mismatches in existing tables
   - Align timestamp types (decide: with or without timezone)
   - Fix enum vs text inconsistencies

2. **Fix critical type mismatches**
   - `audit_logs.resource_id` (text → uuid)
   - `provider_connections` token nullability
   - `signature_deployments` structure

3. **Add missing columns to existing tables**
   - `users` table (15+ missing columns)
   - `organizations` integration flags
   - `provider_connections` metadata fields

### Short-term (This Month)

4. **Database migration strategy**
   - Decide on timezone strategy (recommend: always use `with time zone`)
   - Create migration to standardize timestamp types
   - Convert text enums to proper enums where appropriate

5. **Add missing table definitions**
   - Create schema definitions for all 20 missing tables
   - Add proper relations and indexes
   - Update Drizzle ORM types

### Long-term (Next Quarter)

6. **Implement schema validation**
   - Add CI/CD check to compare schema.ts with production
   - Automated alerts when schema drift is detected
   - Regular schema audits

7. **Documentation**
   - Document all tables and their purposes
   - Create ER diagram
   - Document migration history

---

## 5. Questions to Answer

1. **Timestamp strategy:** Should we use `timestamp with time zone` or `without time zone`?
   - Recommendation: **WITH timezone** for consistency and correctness

2. **Enum migration:** Should we migrate text fields to enums in the database?
   - Recommendation: **Yes**, for better type safety

3. **`signature_deployments` reconciliation:** Which structure is correct?
   - Need to understand business logic to determine

4. **Missing tables:** Are these all actively used?
   - Need to verify which features are in production

---

## 6. Next Steps

**Would you like me to:**

A. **Generate the updated `schema.ts`** file with all corrections?
B. **Create database migration scripts** to align DB with schema?
C. **Focus on specific critical issues first** (e.g., signature_deployments)?
D. **Audit the codebase** to see which tables/columns are actually being used?

Let me know which approach you'd prefer, and I'll proceed accordingly.
