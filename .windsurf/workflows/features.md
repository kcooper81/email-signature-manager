---
description: How to evaluate and document new features for help docs and marketing pages
---

# Feature Release Documentation Workflow

When the user mentions they've added new features, built something new, or asks you to check for updates, follow this workflow to evaluate and document them.

## Step 1: Identify New Features

Look for recent changes by checking:
1. New migration files in `apps/web/supabase/migrations/`
2. New components in `apps/web/src/components/`
3. New pages in `apps/web/src/app/`
4. Recent commits or user descriptions of what was built

## Step 2: Evaluate Feature Importance

For each feature, determine if it needs documentation based on these criteria:

### HIGH PRIORITY - Update Help Docs + Marketing + Releases Page
Features that are:
- User-facing and change how customers interact with the product
- New capabilities customers would want to know about
- Competitive differentiators
- Features customers might ask support about

Examples: Personal Links, Signature Rules, Campaign Banners, Analytics, RBAC, Bulk Invite

### MEDIUM PRIORITY - Update Help Docs + Releases Page Only
Features that are:
- Improvements to existing functionality
- Quality of life enhancements
- Performance improvements users would notice

Examples: Faster deployments, improved editor, better mobile support

### LOW PRIORITY - Releases Page Only (or skip)
Features that are:
- Internal/backend improvements
- Bug fixes
- Developer-facing changes
- Minor UI tweaks

Examples: Database optimizations, code refactoring, dependency updates

## Step 3: Update Documentation

For HIGH PRIORITY features, update these files:

### 1. Features Page (`apps/web/src/app/(marketing)/features/page.tsx`)
Add to the `features` array:
```typescript
{
  icon: IconName,
  title: 'Feature Name',
  description: 'One sentence description.',
  benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4'],
  color: 'violet', // or blue, cyan, green, amber, etc.
},
```

### 2. Homepage (`apps/web/src/app/(marketing)/page.tsx`)
Add a FeatureCard in the Features Grid section if it's a major feature.

### 3. Help Page (`apps/web/src/app/(marketing)/help/page.tsx`)
Add to relevant quickLinks section or create a new section if needed.

### 4. Audience Pages (if relevant)
- `/for/enterprise` - Enterprise features (RBAC, Audit Logs, SSO, Compliance)
- `/for/marketing` - Marketing features (Banners, Analytics, Campaigns)
- `/for/it-admins` - IT features (Bulk operations, Directory sync, Compliance)

### 5. Feature Releases Database
Insert into `feature_releases` and `feature_release_items` tables:
```sql
-- For a new release
INSERT INTO feature_releases (version, title, description, release_date, release_type) 
VALUES ('X.X.X', 'Release Title', 'Description', CURRENT_DATE, 'feature');

-- For each feature in the release
INSERT INTO feature_release_items (release_id, title, description, category, icon, link_url, link_text, sort_order)
VALUES (
  (SELECT id FROM feature_releases WHERE version = 'X.X.X'),
  'Feature Name',
  'Full description of the feature.',
  'feature', -- or 'improvement', 'fix', 'security'
  'IconName', -- Lucide icon name
  '/features',
  'Learn more',
  1
);
```

### 6. FEATURE-RELEASES.md
Update the tracking document at the project root.

## Step 4: Update Help Page Banner

If it's a significant release, update the "What's New" banner text in the Help page hero section:
```tsx
<span className="font-medium">What's New: [Month Year] Release</span>
```

## Icon Reference

Common icons for features (from lucide-react):
- `Link2` - Links, URLs, connections
- `UserPlus` - User invites, onboarding
- `GitBranch` - Rules, conditional logic, branching
- `Image` - Banners, images, media
- `BarChart3` - Analytics, charts, metrics
- `Shield` - Security, permissions, RBAC
- `ClipboardList` - Audit logs, lists, records
- `FileText` - Documents, disclaimers, text
- `Zap` - Speed, automation, instant
- `Users` - Team, groups, collaboration
- `Lock` - Security, privacy, encryption
- `RefreshCw` - Sync, updates, refresh

## Example Evaluation

When user says "I added personal links and bulk invite features":

1. **Personal Links** → HIGH PRIORITY
   - User-facing: Yes (employees use it)
   - New capability: Yes (didn't exist before)
   - Differentiator: Yes (self-service)
   → Update: Features page, Homepage, Help page, IT Admins page, Releases DB

2. **Bulk Invite** → HIGH PRIORITY
   - User-facing: Yes (admins use it)
   - New capability: Yes (mass invitations)
   - Differentiator: Yes (reduces admin work)
   → Update: Features page, Help page, IT Admins page, Releases DB
