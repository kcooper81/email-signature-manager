# Personal Links Implementation Status

## ✅ Completed (Core Backend)

### 1. Database Schema
- **File:** `apps/web/supabase/migrations/add_personal_links_to_users.sql`
- **Status:** Created, ready to run
- **Fields Added:**
  - `calendly_url`
  - `linkedin_url`
  - `twitter_url`
  - `github_url`
  - `personal_website`
  - `instagram_url`
  - `facebook_url`
  - `youtube_url`

### 2. Drizzle ORM Schema
- **File:** `apps/web/src/lib/db/schema.ts`
- **Status:** ✅ Updated
- **Changes:** Added all 8 personal link fields to `users` table definition

### 3. Signature Renderer
- **File:** `apps/web/src/lib/signature-renderer/index.ts`
- **Status:** ✅ Updated
- **Changes:**
  - Updated `RenderContext` interface to include personal URLs
  - Removed OAuth-based Calendly logic
  - Added simple URL field replacements
  - Supports placeholders: `{{calendly_url}}`, `{{linkedin_url}}`, etc.
  - Backwards compatible: `{{calendly_link}}` still works

### 4. API Routes Updated
- **File:** `apps/web/src/app/api/signatures/generate-for-users/route.ts`
  - ✅ Updated to include personal URLs in render context
- **File:** `apps/web/src/app/api/deployments/start/route.ts`
  - ✅ Updated type definitions
  - ✅ Updated database queries to select personal URL fields
  - ✅ Updated render context to include personal URLs

## 🚧 In Progress / Pending

### 5. Team Management UI (Admin)
- **File:** `apps/web/src/app/(dashboard)/team/page.tsx`
- **Status:** ⏳ Needs work
- **Required Changes:**
  - Add "Edit Member" functionality (currently only has "Add Member")
  - Add "Personal Links" section to edit modal
  - Include all 8 URL fields with proper labels
  - Add URL validation
  - Update API calls to save personal links

### 6. User Profile Settings (Self-Service)
- **File:** `apps/web/src/app/(dashboard)/settings/page.tsx` (or similar)
- **Status:** ⏳ Not started
- **Required Changes:**
  - Add "Personal Links" section to profile settings
  - Allow authenticated users to edit their own URLs
  - Same 8 fields as admin view
  - URL validation and preview

### 7. API Endpoints for Updating Users
- **Files:** Need to verify/update
  - `apps/web/src/app/api/team/[userId]/route.ts` (or similar)
- **Status:** ⏳ Needs verification
- **Required:** Ensure PATCH/PUT endpoints accept personal link fields

### 8. Help Documentation
- **Files:**
  - `CALENDLY-HELP-ARTICLE.md`
  - `apps/web/supabase/migrations/add_calendly_help_articles.sql`
- **Status:** ⏳ Needs complete rewrite
- **Required Changes:**
  - Remove OAuth setup instructions
  - Add simple "paste your URL" instructions
  - Update for per-user approach
  - Add instructions for all 8 link types
  - Update for both admin and self-service flows

### 9. Marketing Landing Page
- **File:** `apps/web/src/app/(marketing)/integrations/calendly/page.tsx`
- **Status:** ⏳ Needs update
- **Required Changes:**
  - Remove OAuth messaging
  - Emphasize simplicity ("paste your URL")
  - Show per-user approach
  - Update placeholders documentation
  - Add examples for other link types

### 10. Remove/Deprecate OAuth Integration
- **Files to review:**
  - `apps/web/src/lib/calendly/oauth.ts`
  - `apps/web/src/lib/calendly/api.ts`
  - `apps/web/src/app/api/integrations/calendly/*`
  - `apps/web/src/app/(dashboard)/integrations/page.tsx`
- **Status:** ⏳ Not started
- **Decision needed:** Keep as optional advanced feature or remove entirely?

## 📋 Testing Checklist

### Database & Schema
- [ ] Run migration in Supabase SQL Editor
- [ ] Verify all 8 columns exist in `users` table
- [ ] Verify indexes are created
- [ ] Test with sample data

### Signature Rendering
- [ ] Create test user with personal URLs
- [ ] Create template with `{{calendly_url}}` placeholder
- [ ] Generate signature and verify URL is replaced
- [ ] Test with empty URL (should render empty, not placeholder)
- [ ] Test all 8 URL types
- [ ] Test backwards compatibility with `{{calendly_link}}`

### Deployments
- [ ] Deploy signature to Gmail with personal URLs
- [ ] Verify URLs appear correctly in deployed signature
- [ ] Test "Deploy to Me"
- [ ] Test "Deploy to Selected Users"
- [ ] Test "Deploy to All Users"

### Admin UI (Team Page)
- [ ] Add new team member with personal URLs
- [ ] Edit existing team member's personal URLs
- [ ] Verify URLs save correctly
- [ ] Test URL validation
- [ ] Test with synced employees (no auth_id)

### Self-Service UI (Profile Settings)
- [ ] Authenticated user can view their profile
- [ ] User can edit their own personal URLs
- [ ] Changes save correctly
- [ ] URL validation works
- [ ] Preview functionality (if added)

### End-to-End
- [ ] Admin adds personal URLs for team member
- [ ] Create signature template with personal link placeholders
- [ ] Deploy signature
- [ ] Verify links work in email client
- [ ] User updates their own URLs
- [ ] Redeploy signature
- [ ] Verify updated links work

## 🎯 Next Steps (Priority Order)

### Immediate (Do First)
1. **Run database migration**
   ```sql
   -- In Supabase SQL Editor
   -- Run: apps/web/supabase/migrations/add_personal_links_to_users.sql
   ```

2. **Test signature rendering**
   - Manually add URLs to a test user via Supabase dashboard
   - Create template with `{{calendly_url}}`
   - Generate signature and verify

3. **Add Edit Member functionality to Team page**
   - Add edit button/modal
   - Include personal links fields
   - Test saving

### Short-term (This Session)
4. **Add Personal Links to Profile Settings**
   - Create/update settings page
   - Add personal links section
   - Test self-service editing

5. **Update Help Documentation**
   - Rewrite for simple URL approach
   - Remove OAuth instructions
   - Add examples for all link types

6. **Update Calendly Landing Page**
   - Simplify messaging
   - Remove OAuth complexity
   - Show paste-URL approach

### Medium-term (Next Session)
7. **Comprehensive Testing**
   - Run through full testing checklist
   - Fix any bugs found
   - Test edge cases

8. **Decision on OAuth Integration**
   - Keep as advanced feature?
   - Remove entirely?
   - Document decision

9. **Update Navigation/Marketing**
   - Ensure Calendly page is accessible
   - Update any OAuth-related messaging

## 🐛 Known Issues / Considerations

1. **Type Safety:** Deployment route now expects personal URL fields but "Deploy to Me" path doesn't fetch them from database (uses auth metadata). May need to fetch full user record.

2. **Backwards Compatibility:** Old signatures with `{{calendly_link}}` will still work (aliased to `{{calendly_url}}`), but OAuth-based event type placeholders like `{{calendly_event:slug}}` will no longer work.

3. **URL Validation:** Need to add proper URL validation in UI (format, protocol, etc.)

4. **Conditional Rendering:** Should only show personal link fields in signatures if they're populated (already handled by renderer removing empty placeholders)

5. **Migration Path:** Existing OAuth Calendly connections will need to be migrated or deprecated

## 📝 Documentation Files

- `PERSONAL-LINKS-RESEARCH.md` - Research on competitor approaches
- `COMPETITOR-PERSONAL-LINKS-ANALYSIS.md` - Detailed competitor analysis
- `CALENDLY-SETUP.md` - OLD OAuth setup (needs update/removal)
- `CALENDLY-HELP-ARTICLE.md` - OLD help content (needs rewrite)
- `add_calendly_help_articles.sql` - OLD help articles (needs rewrite)

## 🎨 UI Design Notes

### Personal Links Section (Both Admin & Self-Service)

```
Personal Links (Optional)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Calendly URL
[https://calendly.com/yourname                    ]

💼 LinkedIn Profile  
[https://linkedin.com/in/yourname                 ]

🐦 Twitter/X Profile
[https://twitter.com/yourname                     ]

💻 GitHub Profile
[https://github.com/yourname                      ]

🌐 Personal Website
[https://yourwebsite.com                          ]

📸 Instagram
[https://instagram.com/yourname                   ]

📘 Facebook
[https://facebook.com/yourname                    ]

🎥 YouTube Channel
[https://youtube.com/@yourname                    ]

ℹ️ These links can be used in signature templates with placeholders
   like {{calendly_url}}, {{linkedin_url}}, etc.
```

## 🔄 Migration Strategy

1. **Phase 1:** Add new URL fields (✅ Done)
2. **Phase 2:** Update renderer to use URL fields (✅ Done)
3. **Phase 3:** Add UI for managing URLs (🚧 In Progress)
4. **Phase 4:** Update documentation (⏳ Pending)
5. **Phase 5:** Deprecate OAuth integration (⏳ Pending)
6. **Phase 6:** Announce to users (⏳ Pending)

## ✅ Ready to Deploy

Once all pending items are complete:
- [ ] Run full test suite
- [ ] Update SCOPE.md
- [ ] Create git commit
- [ ] Deploy to production
- [ ] Monitor for issues
- [ ] Gather user feedback
