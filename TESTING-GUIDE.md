# Siggly — User Guide

Welcome to Siggly! This guide walks you through every feature in the app so you can explore, test, and verify things work end-to-end. Each section tells you **which account type to log in as** so you always know the right context.

> **Before you start:** Make sure your developer has run all database migrations in Supabase.

---

## Account Types Reference

Throughout this guide, you'll see badges like **[Admin]**, **[Employee]**, etc. Here's what they mean:

| Badge | Who | How to log in |
|-------|-----|---------------|
| **[Owner]** | The person who created the organization | Log in with the original account |
| **[Admin]** | A team member with admin access | Assigned by the Owner on the Team page |
| **[Editor]** | Can create and edit templates | Assigned by Owner/Admin |
| **[Viewer]** | Read-only access | Assigned by Owner/Admin |
| **[Employee]** | A team member using self-service | Accept an invite link and create an account |
| **[Free]** | Any user on the Free plan | Default plan for new orgs |
| **[Pro]** | Any user on the Professional plan | Upgrade via Settings → Billing |
| **[Enterprise]** | Any user on the Enterprise plan | Contact sales or use dev bypass |

> **Tip:** To test pay-gated features without upgrading, your developer can set `NEXT_PUBLIC_BYPASS_PAY_GATES=true` in the environment. A yellow "Pay Gates Bypassed" badge appears in the bottom-right corner when active.

---

## 1. Personal Links

Lets employees add their own social media and scheduling links to email signatures.

### **[Admin]** — Add links for a team member
1. Go to the **Team** page
2. Click **Edit** next to any team member
3. Scroll to the **Personal Links** section
4. Add some test links:
   - Calendly: `https://calendly.com/john-smith`
   - LinkedIn: `https://linkedin.com/in/john-smith`
5. Click **Save Changes** — you should see a success message

### **[Employee]** — Add your own links
1. Go to **Settings** → **Profile** tab
2. Scroll to **Personal Links**
3. Add or update your links
4. Click **Save Changes** — you should see "Saved!"

### **[Any user]** — Verify links appear in signatures
1. Go to **Templates** and edit any template
2. Add text like: `Book a meeting: {{calendly_url}}`
3. Save the template
4. Generate a signature for yourself
5. Your actual Calendly link should appear in the output (not the placeholder)

---

## 2. Bulk Employee Invites

Admins can invite multiple employees at once to create their own accounts.

### **[Admin]** — Send invites
1. Go to the **Team** page
2. Check the boxes next to 2–3 employees who don't have accounts yet
3. Click **Invite to Self-Manage**
4. You should see: "Successfully sent X invites"

### **[Employee]** — Accept an invite
1. Get the invite link (check email, or ask your developer to get it from the database)
2. Open the link in a **new browser** or **incognito window**
3. You'll see a "Create Your Account" page
4. Enter and confirm a password (at least 8 characters)
5. Click **Create Account** — you'll be redirected to the Settings page

### **[Employee]** — Verify your account works
1. Log out, then log back in with the new email and password
2. You should be able to access the app and update your profile under Settings

---

## 3. Signature Rules

Automatically show different signatures based on sender, recipient, department, or date.

### **[Admin or Editor]** — Create test templates
1. Go to **Templates**
2. Create a template called "Internal Template" with text: "This is for internal emails"
3. Create another called "External Template" with text: "This is for external emails"

### **[Admin or Editor]** — Create recipient-based rules
1. Open the "External Template" → click the **Rules** tab
2. Click **Add Rule** and fill in:
   - Name: "External Emails Only"
   - Recipients: Select "All external"
   - Status: Active
3. Click **Create Rule** — it should appear in the list
4. Repeat for "Internal Template" with recipient set to "All internal"

### **[Admin or Editor]** — Create department-based rules
1. Create a template called "Sales Template"
2. Go to the **Rules** tab → **Add Rule**
3. Set Sender to "Specific departments" → check "Sales"
4. Save — only Sales team members will get this signature

### **[Admin or Editor]** — Create date-based campaign rules
1. Create a template called "Holiday Campaign"
2. Add a rule with Start Date (today) and End Date (one week out)
3. Set Recipients to "All external"
4. This signature will only show during those dates

---

## 4. Campaign Banners

Add promotional banners to signatures with click tracking.

### **[Admin or Editor]** — Add a banner to a template
1. Go to **Templates** → edit any template
2. Click **Add Block** → **Banner**
3. Upload an image or paste a URL
4. Add a destination link (like your website)
5. Set width to 600px
6. Save the template

### **[Admin or Editor]** — Schedule the banner
1. Go to the **Rules** tab on that template
2. Create a rule with a start date, end date, and recipients set to "All external"
3. The banner will only appear during those dates

### **[Any user]** — Test click tracking
1. Generate a signature with the banner
2. Copy the HTML and paste it into an email or HTML viewer
3. Click the banner — you should be redirected to the destination URL

---

## 5. Analytics & Click Tracking

Track link clicks across your organization's signatures.

### **[Admin]** — View analytics
1. Go to the **Analytics** page from the sidebar
2. You'll see tabs: Overview, Deployments, Templates, Marketing, Sales, HR, IT, Campaigns
3. On the Free plan, you'll see a 7-day preview with an upgrade prompt
4. On Professional, you get 30-day and 90-day reporting

### **[Any user]** — Generate some click data
1. Create a signature with a Calendly or LinkedIn link
2. Generate and copy the signature HTML
3. Paste into an email and click the links
4. Your developer can verify clicks are logged in the database

---

## 6. Roles & Permissions

Control what different team members can do in the app.

### **[Owner]** — Verify default roles
Your organization should have these 4 roles:
- **Owner** — full access to everything including billing
- **Admin** — manages everything except billing
- **Editor** — creates and edits templates
- **Viewer** — read-only access

### **[Owner or Admin]** — Assign roles
1. Go to the **Team** page
2. Edit a team member and assign them a role
3. Their access will update immediately

### **[Viewer]** — Verify restricted access
1. Log in as a Viewer
2. You should **not** see Edit or Delete buttons on templates
3. You should only be able to view templates, analytics, and your own profile

---

## 7. Audit Logs

Every action in the app is recorded for security and compliance.

### **[Admin]** — Generate and review logs
1. Create a new template
2. Edit it
3. Delete it
4. Ask your developer to check the audit logs table — they should see all three actions with timestamps, your user ID, and before/after values for edits

---

## 8. Disclaimers Library

Pre-written legal disclaimers you can add to signatures.

### **[Admin]** — Verify disclaimers are loaded
Ask your developer to confirm 15 disclaimers exist in the database, including:
- Confidentiality Notice
- GDPR Compliance
- HIPAA Notice
- Legal Disclaimer

### **[Admin or Editor]** — Use a disclaimer in a template
1. When editing a template, look for "Add Disclaimer"
2. Browse the library or search for "GDPR"
3. Preview the full text
4. Click "Insert" to add it to your template

---

## 9. Disclaimer Engine

Full disclaimer management with templates, rules, regulatory presets, and audit trail.

### **[Free]** — Test plan limits
1. Go to **Settings** → **Disclaimers**
2. You should see the **Templates** and **Rules** tabs
3. The **Regulatory Presets** and **Audit Trail** tabs should show a lock icon
4. On Templates, click **Add Template** — fill in name, category, content, description
5. Click **Create** — template appears in the list
6. Try creating more than 2 templates — you should see an upgrade prompt
7. Switch to Rules, click **Add Rule** — select a template, set conditions
8. Try creating more than 1 rule — upgrade prompt appears
9. Test **Edit** and **Delete** on templates and rules

### **[Pro]** — Test full access
1. All tabs should be accessible (no lock icons)
2. Create unlimited templates and rules
3. On the **Presets** tab, click **Use This** on any preset — it pre-fills the template modal
4. Check the **Audit Trail** tab for deployment history

### **[Enterprise]** — Test MSP features
1. Everything Pro gets, plus:
2. Create a rule with "Cascade to Clients" enabled
3. Create a template with a non-English locale

---

## 10. HR Sync & Directory Integration

Sync employee data from BambooHR, Gusto, Rippling, Google Directory, or Microsoft Directory.

### **[Free]** — Verify upgrade gate
1. Go to **Settings** → **HR Sync**
2. You should see an upgrade prompt blocking the entire page

### **[Pro]** — Test full HR sync
1. HR Sync page should load
2. Click **Add Integration** — select a provider, configure schedule and conflict resolution
3. Enter API credentials and click **Add**
4. The configuration appears in the list
5. Click **Configure** to edit, **Sync Now** to trigger a manual sync, **Delete** to remove
6. Note: "Realtime" schedule is Enterprise-only — should show upgrade prompt

### **[Enterprise]** — Test realtime sync
1. Everything Pro gets, plus realtime schedule option

### **[Pro]** — Test Validation Rules
1. Go to **Settings** → **Validation**
2. Click **Add Rule** — select a field (email, phone, job title, etc.) and validation type
3. Set the value and error message, then click **Create**
4. Test Edit and Delete
5. As an employee, profile updates go to admin for approval

---

## 11. Lifecycle Automation

Automate signature assignment when employees join, leave, or change departments.

### **[Free]** — Verify upgrade gate
1. Go to **Settings** → **Automation**
2. You should see an upgrade prompt blocking the entire page

### **[Pro]** — Test workflow creation
1. Automation page should load
2. Click **Create Workflow** — fill in name, description, event trigger (e.g., "User Joined")
3. In **Actions**, select "Assign Template" — a dropdown shows your org's templates (not UUIDs)
4. Click **Add Action** for more actions (deploy signature, send notification, etc.)
5. Click **Create** — workflow appears in the list
6. Click **Edit** to modify, **Test** to dry-run, **Delete** to remove
7. You're limited to **5 workflows** on Pro
8. Trying to add a webhook action should show an upgrade prompt

### **[Enterprise]** — Test advanced features
1. Unlimited workflows
2. Webhook actions are available
3. "Cascade to Clients" option for MSP

---

## 12. Brand Governance

Define brand guidelines, audit signature compliance, and manage brand assets.

### **[Free or Pro]** — Verify upgrade gates
1. **Brand** appears in the sidebar for all plans
2. Navigate to **Brand Hub** → you should see an upgrade prompt
3. Try **/brand/guidelines** and **/brand/audit** — same upgrade prompt
4. **Brand Assets** (/brand/assets) should be accessible on all plans

### **[Enterprise]** — Test brand features
1. **Brand Hub** shows compliance score and quick links
2. Use the **Brand Nav** tabs (Overview, Guidelines, Audit, Assets) to navigate between views
3. Go to **Guidelines** → click **New Guideline**
4. Set name, description, colors (hex picker with swatches), fonts, toggle locks
5. Click **Create** — guideline appears in the list. Test Edit and Delete.
6. Go to **Audit** → click **Re-run Audit** — see per-user compliance scores with violations
7. Go to **Assets** — upload logos, icons, banners. Filter by category and search.

---

## 13. Billing Enforcement & Settings Navigation

All API routes check subscriptions, and the settings page is organized for easy access.

### **[Admin]** — Test settings navigation
1. Go to **Settings**
2. The sidebar is grouped into three sections:
   - **Account**: General (Profile/Org/Notifications/Appearance/Security), Billing
   - **Compliance**: Disclaimers, Validation, Branding (MSP only)
   - **Automation**: HR Sync, Workflows
3. Click through each item — only the active item should highlight

### **[Developer]** — Test API security
1. With dev bypass OFF, make API requests as a Free user to:
   - `POST /api/hr-sync/configurations` → 403 with `upgradeRequired: true`
   - `GET /api/brand/hub` → 403 with `upgradeRequired: true`
   - `POST /api/lifecycle/workflows` → 403 with `upgradeRequired: true`
2. Try PUT requests with `organization_id` or `is_system` in the body — fields should be silently stripped
3. Try webhook URLs with localhost, 10.0.0.1, 172.16.x.x, 192.168.x.x — all should be rejected

---

## Quick Verification Checklist

Run through this to confirm everything works:

**Core Features**
- [ ] Personal links save and appear in generated signatures
- [ ] Bulk invites send, and employees can create accounts from invite links
- [ ] Signature rules can be created, edited, and deleted
- [ ] Campaign banners display in signatures and are clickable
- [ ] Analytics page loads with tabs and data
- [ ] Different user roles have appropriate access levels
- [ ] All actions create audit log entries

**Disclaimers**
- [ ] Create/Edit/Delete templates via modal
- [ ] Create/Edit/Delete rules via modal with template dropdown
- [ ] Free users limited to 2 templates, 1 rule
- [ ] Regulatory Presets and Audit Trail tabs locked on Free
- [ ] Presets "Use This" pre-fills the template modal

**HR Sync**
- [ ] Free users see upgrade prompt on page
- [ ] Add/Edit/Delete configurations via modal
- [ ] Sync Now triggers with loading state
- [ ] Validation rules: Create/Edit/Delete via modal

**Automation**
- [ ] Free users see upgrade prompt on page
- [ ] Create/Edit/Delete workflows via modal
- [ ] Template actions show dropdown (not UUID input)
- [ ] Test button dry-runs the workflow

**Brand Governance**
- [ ] Brand nav visible in sidebar for all plans
- [ ] Non-Enterprise users see upgrade prompt on Brand Hub/Guidelines/Audit
- [ ] Brand Assets accessible on all plans
- [ ] Brand Nav tabs work between sub-pages
- [ ] Create/Edit/Delete guidelines with color picker

**Settings & Security**
- [ ] Settings nav grouped into Account/Compliance/Automation
- [ ] Only one nav item highlights at a time
- [ ] API PUT routes strip unauthorized fields
- [ ] Webhook URLs reject private/localhost addresses
- [ ] Dev bypass unlocks all gates when enabled

---

## Troubleshooting

**"I don't see the Rules tab on a template"**
Make sure you're *editing* an existing template, not creating a new one. The Rules tab appears next to the Design tab.

**"Invite link doesn't work"**
Check that the link hasn't expired (valid for 7 days) and that you're using the full URL including the token.

**"Personal links don't show up in my signature"**
Make sure you used the correct placeholder format: `{{calendly_url}}`. Verify the URL was saved in your profile first.

**"I see an upgrade prompt but I should have access"**
Check that your organization is on the correct plan in Settings → Billing. If you're using dev bypass, make sure `NEXT_PUBLIC_BYPASS_PAY_GATES=true` is set.

**"Brand/HR Sync/Automation pages show a database error"**
Ask your developer to verify all migration files have been run in Supabase. The platform expansion tables must exist.

---

## All Done?

When you've verified everything above, you're ready to use Siggly in production. Total testing time is about 1–2 hours.

If you run into anything unexpected:
1. Refresh the page
2. Check that you're logged in with the right account type
3. Check the browser console for errors
4. Ask your developer to verify the database state
