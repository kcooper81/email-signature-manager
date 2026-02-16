# Simple Testing Guide for Email Signature Manager

## Getting Started

Before testing, make sure all database updates are complete. Ask your developer to run the 13 migration files in Supabase.

---

## Feature 1: Personal Links

**What it does:** Lets employees add their personal social media and scheduling links to their email signatures.

### How to Test:

**As an Admin:**
1. Log into the app
2. Go to the **Team** page
3. Click the **Edit** button next to any team member's name
4. Scroll down to the **Personal Links** section
5. Add some test links:
   - Calendly: `https://calendly.com/john-smith`
   - LinkedIn: `https://linkedin.com/in/john-smith`
6. Click **Save Changes**
7. You should see a success message

**As an Employee:**
1. Log into the app
2. Go to **Settings** (top right)
3. Click the **Profile** tab
4. Scroll to **Personal Links**
5. Add or update your links
6. Click **Save Changes**
7. You should see "Saved!" message

**Verify it Works:**
1. Go to **Templates** and edit any template
2. Add text like: "Book a meeting: {{calendly_url}}"
3. Save the template
4. Generate a signature for yourself
5. Your actual Calendly link should appear (not the placeholder text)

✅ **Success:** Personal links save correctly and appear in signatures

---

## Feature 2: Bulk Employee Invites

**What it does:** Admins can invite multiple employees at once to create their own accounts and manage their profiles.

### How to Test:

**Setup:**
1. Make sure you have at least one team member who doesn't have an account yet
2. If needed, add a test employee on the Team page

**Send Invites:**
1. Go to the **Team** page
2. Check the boxes next to 2-3 employees
3. Click the **Invite to Self-Manage** button
4. You should see: "Successfully sent X invites"

**Accept Invite (as Employee):**
1. Ask your developer to get the invite link from the database
2. Open the invite link in a new browser (or incognito window)
3. You'll see a "Create Your Account" page
4. Enter a password (at least 8 characters)
5. Confirm the password
6. Click **Create Account**
7. You should be redirected to the Settings page

**Verify:**
1. Log out and log back in with the new employee's email and password
2. You should be able to access the app
3. Go to Settings and update your profile

✅ **Success:** Employees can create accounts via invite and manage their own profiles

---

## Feature 3: Signature Rules

**What it does:** Automatically shows different signatures based on who's sending and who's receiving the email.

### How to Test:

**Create Test Templates:**
1. Go to **Templates**
2. Create a template called "Internal Template" with text: "This is for internal emails"
3. Create another called "External Template" with text: "This is for external emails"

**Create Rules:**
1. Open the "External Template"
2. Click the **Rules** tab
3. Click **Add Rule**
4. Fill in:
   - Name: "External Emails Only"
   - Recipients: Select "All external"
   - Status: Active
5. Click **Create Rule**
6. You should see the rule appear in the list

**Create Another Rule:**
1. Open the "Internal Template"
2. Click the **Rules** tab
3. Click **Add Rule**
4. Fill in:
   - Name: "Internal Emails Only"
   - Recipients: Select "All internal"
5. Click **Create Rule**

**Test Department Rules:**
1. Create a new template called "Sales Template"
2. Go to Rules tab
3. Add a rule:
   - Name: "Sales Department"
   - Sender: Select "Specific departments" → Check "Sales"
4. Save the rule

**Test Campaign Dates:**
1. Create a template called "Holiday Campaign"
2. Add a rule:
   - Name: "Holiday Promo"
   - Start Date: Today
   - End Date: One week from today
   - Recipients: "All external"
3. This signature will only show during those dates

✅ **Success:** Rules appear in the list and can be edited/deleted

---

## Feature 4: Campaign Banners

**What it does:** Add promotional banners to signatures that can be tracked when clicked.

### How to Test:

**Add a Banner:**
1. Go to **Templates** and edit any template
2. Click **Add Block** → **Banner**
3. Upload an image or use a URL
4. Add a link URL (like your website)
5. Set width to 600px
6. Save the template

**Schedule a Campaign:**
1. Go to the **Rules** tab on that template
2. Create a rule with:
   - Start date: Today
   - End date: Next week
   - Recipients: "All external"
3. The banner will only show during these dates

**Test Click Tracking:**
1. Generate a signature with the banner
2. Copy the signature HTML
3. Paste it into an email or HTML viewer
4. Click the banner
5. You should be redirected to your website

✅ **Success:** Banner appears in signature and is clickable

---

## Feature 5: Analytics & Click Tracking

**What it does:** Tracks when people click links in your signatures so you can measure effectiveness.

### How to Test:

**Test the Tracking:**
1. Create a signature with a Calendly or LinkedIn link
2. Generate the signature
3. Copy the signature HTML
4. Paste into an email
5. Click the link
6. You should be redirected to the actual website

**View Analytics:**
1. Ask your developer to check the database for click data
2. They should see your test clicks logged with:
   - The link you clicked
   - What type of link it was (Calendly, LinkedIn, etc.)
   - When you clicked it

✅ **Success:** Clicks are being tracked in the background

---

## Feature 6: Roles & Permissions

**What it does:** Control what different users can do in the app (view only, edit, full admin, etc.)

### How to Test:

**Check Default Roles:**
Ask your developer to verify these 4 roles exist:
- **Owner** - Can do everything
- **Admin** - Can manage everything except billing
- **Editor** - Can create and edit templates
- **Viewer** - Can only view, not edit

**Assign a Role:**
1. Your developer will need to assign roles to users in the database
2. Once assigned, users will only see features they have permission for

**Test Permissions:**
1. Log in as a user with "Viewer" role
2. You should NOT see Edit or Delete buttons
3. You should only be able to view templates and analytics

✅ **Success:** Different users have different access levels

---

## Feature 7: Audit Logs

**What it does:** Keeps a record of every action taken in the app for security and compliance.

### How to Test:

**Create Some Actions:**
1. Create a new template
2. Edit the template
3. Delete the template

**Check the Logs:**
Ask your developer to check the audit logs. They should see:
- When you created the template
- When you edited it (with before/after values)
- When you deleted it
- Your user ID and timestamp for each action

✅ **Success:** All actions are being logged automatically

---

## Feature 8: Disclaimers Library

**What it does:** Pre-written legal disclaimers you can quickly add to signatures.

### How to Test:

**Check Disclaimers Loaded:**
Ask your developer to verify 15 disclaimers are in the database, including:
- Confidentiality Notice
- GDPR Compliance
- HIPAA Notice
- Legal Disclaimer
- And 11 more

**Use a Disclaimer (when UI is ready):**
1. When editing a template, look for "Add Disclaimer" button
2. Browse the disclaimer library
3. Search for "GDPR"
4. Click "Preview" to see full text
5. Click "Insert" to add it to your template

✅ **Success:** Disclaimers are available and can be inserted

---

## Feature 9: Disclaimer Engine (Advanced)

**What it does:** Full disclaimer management with templates, rules, regulatory presets, and audit trail.

### How to Test:

**As a Free User:**
1. Go to **Settings** → **Disclaimers**
2. You should see the Templates and Rules tabs
3. The **Regulatory Presets** and **Audit Trail** tabs should show a lock icon
4. Try creating disclaimer templates — you're limited to 2
5. Try creating disclaimer rules — you're limited to 1
6. Trying to create more should show an upgrade prompt

**As a Professional User:**
1. All tabs should be accessible (no lock icons)
2. Create unlimited templates and rules
3. Access the Regulatory Presets tab — browse and use presets
4. Access the Audit Trail tab — view deployment history

**As an Enterprise User:**
1. Everything Professional gets, plus:
2. Create a rule with "Cascade to Clients" enabled (MSP feature)
3. Create a template with a non-English locale

✅ **Success:** Free users see limits, Pro users see all tabs, Enterprise gets MSP cascade

---

## Feature 10: HR Sync & Directory Integration

**What it does:** Sync employee data from BambooHR, Gusto, Rippling, and other HR providers.

### How to Test:

**As a Free User:**
1. Go to **Settings** → **HR Sync**
2. You should see an upgrade prompt blocking the entire page
3. The page content should NOT be accessible

**As a Professional User:**
1. HR Sync page should load fully
2. Create a sync configuration (e.g., BambooHR)
3. Trigger a manual sync
4. Review pending changes and approve/reject them
5. The schedule type "realtime" should show upgrade prompt (Enterprise only)

**As an Enterprise User:**
1. Everything Professional gets, plus:
2. Can set schedule type to "realtime"

**Profile Requests (Pro+):**
1. Go to **Settings** → **Validation** to manage validation rules
2. As an employee, update your profile — changes go to admin for approval
3. As an admin, approve or reject pending profile changes

✅ **Success:** Free users see upgrade prompt, Pro users have full HR sync

---

## Feature 11: Lifecycle Automation

**What it does:** Automate signature assignment when employees join, leave, or change departments.

### How to Test:

**As a Free User:**
1. Go to **Settings** → **Automation**
2. You should see an upgrade prompt blocking the entire page

**As a Professional User:**
1. Automation page should load
2. Create a workflow (e.g., "Onboard New Hire" triggered by "User Joined")
3. Add actions like "Assign Template" and "Deploy Signature"
4. You're limited to 5 workflows total
5. Trying to add a webhook action should show upgrade prompt
6. Test the workflow using the Test button

**As an Enterprise User:**
1. Unlimited workflows
2. Can add webhook actions
3. Can enable "Cascade to Clients" for MSP

✅ **Success:** Free blocked, Pro gets 5 workflows, Enterprise unlimited with webhooks

---

## Feature 12: Brand Governance

**What it does:** Define brand guidelines, audit signature compliance, and manage brand assets.

### How to Test:

**As a Free or Professional User:**
1. Navigate to **Brand Hub** (/brand)
2. You should see an upgrade prompt (Enterprise only)
3. Try /brand/guidelines — same upgrade prompt
4. Try /brand/audit — same upgrade prompt

**As an Enterprise User:**
1. Brand Hub shows compliance score, quick links
2. Create brand guidelines (colors, fonts, logo requirements)
3. Run a brand audit — see per-user compliance scores
4. Manage document templates
5. Approve/deprecate brand assets

✅ **Success:** Only Enterprise users can access brand features

---

## Feature 13: Billing Enforcement & Security

**What it does:** Ensures all API routes check subscriptions and blocks unauthorized access.

### How to Test:

**API Security (for developers):**
1. With dev bypass OFF, make API requests as a Free user to:
   - `POST /api/hr-sync/configurations` → should get 403 with `upgradeRequired: true`
   - `GET /api/brand/hub` → should get 403 with `upgradeRequired: true`
   - `POST /api/lifecycle/workflows` → should get 403 with `upgradeRequired: true`
2. Try PUT requests with `organization_id` or `is_system` in the body → these fields should be silently stripped (not applied)
3. Try creating a lifecycle webhook with a localhost URL → should be rejected
4. Try creating a webhook with 10.0.0.1, 172.16.0.1, 192.168.1.1 URLs → all rejected
5. Dev bypass: Set `NEXT_PUBLIC_BYPASS_PAY_GATES=true` → all routes should work regardless of plan

**Settings Navigation:**
1. Go to Settings page
2. You should see 4 new nav links: Disclaimers, HR Sync, Automation, Validation
3. Each link should navigate to its page

✅ **Success:** Unauthorized API calls get 403, field injection is blocked, SSRF URLs rejected

---

## Quick Verification Checklist

Go through this list to make sure everything works:

- [ ] Personal links save and appear in signatures
- [ ] Bulk invites send successfully
- [ ] Employees can create accounts from invites
- [ ] Signature rules can be created and edited
- [ ] Rules show active/inactive status
- [ ] Campaign banners display in signatures
- [ ] Banners are clickable
- [ ] Links redirect correctly
- [ ] Different user roles have different permissions
- [ ] Viewers can't edit templates
- [ ] Disclaimers are loaded in the database
- [ ] All actions create audit log entries
- [ ] Disclaimers: Free users limited to 2 templates, 1 rule
- [ ] Disclaimers: Presets and Audit tabs locked for Free
- [ ] HR Sync: Free users see upgrade prompt on page
- [ ] Automation: Free users see upgrade prompt on page
- [ ] Brand: Non-Enterprise users see upgrade prompt
- [ ] Settings nav shows Disclaimers, HR Sync, Automation, Validation links
- [ ] API PUT routes strip unauthorized fields
- [ ] Webhook URLs reject private/localhost addresses
- [ ] Dev bypass unlocks all gates when enabled

---

## Common Issues

**"I don't see the Rules tab"**
- Make sure you're editing a template (not creating a new one)
- The Rules tab appears next to the Design tab

**"Invite link doesn't work"**
- Check that the link hasn't expired (7 days)
- Make sure you're using the full URL with the token

**"Personal links don't appear in signature"**
- Make sure you used the correct placeholder: `{{calendly_url}}`
- Check that the URL was saved in your profile

**"Can't create rules"**
- Make sure your organization has a domain set
- Check that you have permission to edit templates

---

## Need Help?

If something isn't working:
1. Check that all 13 migrations were run successfully
2. Verify you're logged in with the correct account
3. Try refreshing the page
4. Check browser console for errors
5. Ask your developer to check the database

---

## Success!

You've successfully tested all 13 new features when:
✅ Personal links work in signatures
✅ Invites send and employees can sign up
✅ Rules control which signatures show
✅ Banners appear and track clicks
✅ Different users have different permissions
✅ Actions are logged for compliance
✅ Disclaimers are available to use
✅ Disclaimer engine enforces plan limits
✅ HR Sync works for Pro+ users
✅ Lifecycle automation creates and runs workflows
✅ Brand governance restricted to Enterprise
✅ API routes enforce billing and block unauthorized access

**Total Testing Time:** About 1-2 hours

**You're ready to use these features in production!** 🎉
