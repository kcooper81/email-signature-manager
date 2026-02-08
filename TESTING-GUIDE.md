# Simple Testing Guide for Email Signature Manager

## Getting Started

Before testing, make sure all database updates are complete. Ask your developer to run the 7 migration files in Supabase.

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
1. Check that all 7 migrations were run successfully
2. Verify you're logged in with the correct account
3. Try refreshing the page
4. Check browser console for errors
5. Ask your developer to check the database

---

## Success!

You've successfully tested all 8 new features when:
✅ Personal links work in signatures
✅ Invites send and employees can sign up
✅ Rules control which signatures show
✅ Banners appear and track clicks
✅ Different users have different permissions
✅ Actions are logged for compliance
✅ Disclaimers are available to use

**Total Testing Time:** About 1-2 hours

**You're ready to use these features in production!** 🎉
