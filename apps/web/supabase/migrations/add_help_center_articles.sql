-- Add missing help center articles
-- These articles are linked from the /help page but don't exist in the database

-- Article: Create Your First Template
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Create Your First Email Signature Template',
  'create-first-template',
  '**Getting started with your first email signature template in Siggly.**

## Step 1: Navigate to Templates

1. Log in to your Siggly dashboard
2. Click **Templates** in the left sidebar
3. Click the **Create Template** button

## Step 2: Choose a Starting Point

You have two options:
- **Start from scratch** - Build a custom template using our drag-and-drop editor
- **Use a pre-built template** - Choose from our library of professional designs

## Step 3: Add Your Content Blocks

Drag and drop blocks to build your signature:

- **Text Block** - Add names, titles, contact info
- **Image Block** - Add logos, headshots, or icons
- **Social Links** - Add social media icons with links
- **Button Block** - Add call-to-action buttons
- **Divider** - Separate sections visually
- **Spacer** - Add vertical spacing

## Step 4: Use Dynamic Fields

Instead of hardcoding information, use dynamic placeholders:

- `{{full_name}}` - Employee''s full name
- `{{job_title}}` - Job title
- `{{email}}` - Email address
- `{{phone}}` - Phone number
- `{{department}}` - Department name

These fields automatically populate with each employee''s data when deployed.

## Step 5: Style Your Template

Customize the look:
- Set fonts and colors
- Adjust spacing and alignment
- Add your brand colors
- Upload your company logo

## Step 6: Preview and Save

1. Click **Preview** to see how your signature looks
2. Test on different email clients (Gmail, Outlook, Apple Mail)
3. Click **Save Template** when satisfied

## Next Steps

- [Deploy to Your Team](/help/deploy-signatures)
- [Add Campaign Banners](/help/add-campaign-banner)
- [Set Up Signature Rules](/help/signature-rules-internal-external)',
  'Getting Started',
  'guide',
  true,
  true,
  1,
  true
);

-- Article: Deploy Signatures
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Deploy Signatures to Your Team',
  'deploy-signatures',
  '**Learn how to deploy email signatures to your team members.**

## Prerequisites

Before deploying signatures, ensure you have:
- Connected your email provider (Google Workspace or Microsoft 365)
- Created at least one signature template
- Team members synced to your organization

## Deployment Methods

### Method 1: Deploy to All Users

1. Go to **Templates** and select your template
2. Click **Deploy**
3. Select **All Users**
4. Review the deployment preview
5. Click **Confirm Deployment**

### Method 2: Deploy to Specific Users

1. Go to **Team** in the sidebar
2. Select the users you want to update
3. Click **Assign Template**
4. Choose the template to deploy
5. Click **Deploy Now**

### Method 3: Deploy by Department

1. Go to **Templates** and select your template
2. Click **Deploy**
3. Select **By Department**
4. Choose the departments to include
5. Click **Confirm Deployment**

## What Happens During Deployment

1. Siggly renders each signature with the user''s personal data
2. The signature is pushed to the user''s email client
3. The signature becomes their default for new emails
4. Deployment status is logged in the audit trail

## Deployment Status

Check deployment status in the **Team** section:
- ✅ **Deployed** - Signature successfully applied
- ⏳ **Pending** - Deployment in progress
- ❌ **Failed** - Check error message for details

## Troubleshooting

**Signature not appearing:**
- Verify the user''s email is correctly synced
- Check that the email provider connection is active
- Try redeploying to that specific user

**Wrong information showing:**
- Update the user''s profile data in Team settings
- Redeploy the signature

## Best Practices

- Test deployments with a small group first
- Schedule deployments during off-hours
- Communicate changes to your team beforehand
- Keep a backup of previous templates',
  'Getting Started',
  'guide',
  true,
  true,
  2,
  true
);

-- Article: Bulk Invite Employees
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Bulk Invite Employees',
  'bulk-invite-employees',
  '**Add multiple team members to your organization at once.**

## Option 1: Sync from Email Provider

The easiest way to add employees is to sync from your connected email provider:

### Google Workspace
1. Go to **Team** in the sidebar
2. Click **Sync Users**
3. Select **Google Workspace**
4. Choose which users to import
5. Click **Import Selected**

### Microsoft 365
1. Go to **Team** in the sidebar
2. Click **Sync Users**
3. Select **Microsoft 365**
4. Choose which users to import
5. Click **Import Selected**

## Option 2: CSV Import

Import employees from a spreadsheet:

1. Go to **Team** → **Import**
2. Download the CSV template
3. Fill in employee data:
   - Email (required)
   - First Name
   - Last Name
   - Job Title
   - Department
   - Phone
4. Upload your completed CSV
5. Review the import preview
6. Click **Import Employees**

### CSV Format Example

```
email,first_name,last_name,job_title,department,phone
john@company.com,John,Smith,Sales Manager,Sales,555-0101
jane@company.com,Jane,Doe,Marketing Lead,Marketing,555-0102
```

## Option 3: Manual Invite

Send individual invitations:

1. Go to **Team** → **Invite**
2. Enter the employee''s email address
3. Select their role (Member or Admin)
4. Click **Send Invite**

## Managing Imported Users

After import, you can:
- Edit user profiles individually
- Assign templates to users
- Set department assignments
- Configure role permissions

## Sync Settings

Configure automatic syncing:
- **Auto-sync new users** - Automatically add new employees
- **Sync frequency** - Daily, weekly, or manual
- **Filter by group** - Only sync specific groups/OUs

## Troubleshooting

**Users not appearing after sync:**
- Check your email provider connection
- Verify admin permissions are granted
- Try a manual sync refresh

**Duplicate users:**
- Users are matched by email address
- Duplicates are automatically merged',
  'Team Management',
  'guide',
  true,
  true,
  10,
  true
);

-- Article: RBAC Permissions
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Role-Based Access Control (RBAC)',
  'rbac-permissions',
  '**Manage who can do what in your Siggly organization.**

## Available Roles

### Owner
- Full access to all features
- Manage billing and subscription
- Delete the organization
- Cannot be removed (transfer ownership instead)

### Admin
- Create and edit templates
- Deploy signatures to all users
- Manage team members
- Configure integrations
- View analytics and audit logs
- Cannot access billing

### Member
- View their own signature
- Edit their personal links (if enabled)
- View assigned templates
- Cannot create or deploy templates

## Assigning Roles

1. Go to **Team** in the sidebar
2. Find the user you want to update
3. Click the **Role** dropdown
4. Select the new role
5. Confirm the change

## Role Permissions Matrix

| Permission | Owner | Admin | Member |
|------------|-------|-------|--------|
| View own signature | ✅ | ✅ | ✅ |
| Edit personal links | ✅ | ✅ | ✅* |
| Create templates | ✅ | ✅ | ❌ |
| Deploy signatures | ✅ | ✅ | ❌ |
| Manage team | ✅ | ✅ | ❌ |
| View analytics | ✅ | ✅ | ❌ |
| Manage integrations | ✅ | ✅ | ❌ |
| Access billing | ✅ | ❌ | ❌ |
| Delete organization | ✅ | ❌ | ❌ |

*If personal links are enabled for the organization

## Best Practices

- **Limit Admin access** - Only give admin to those who need it
- **Use Members for most employees** - They only need to see their signature
- **Review permissions regularly** - Remove access when roles change
- **Document your policy** - Create internal guidelines for role assignments

## Transferring Ownership

To transfer organization ownership:
1. Go to **Settings** → **Organization**
2. Click **Transfer Ownership**
3. Select the new owner (must be an existing Admin)
4. Confirm with your password
5. The new owner receives full control',
  'Team Management',
  'guide',
  true,
  true,
  11,
  true
);

-- Article: Personal Links Setup
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Personal Links Setup',
  'personal-links-setup',
  '**Allow employees to add their own social and professional links to signatures.**

## What Are Personal Links?

Personal links let employees customize their signatures with:
- LinkedIn profiles
- Twitter/X handles
- Personal websites
- Calendly booking links
- GitHub profiles
- And more

## Enabling Personal Links

### For Your Organization

1. Go to **Settings** → **Organization**
2. Find **Personal Links**
3. Toggle **Enable Personal Links**
4. Choose which link types to allow
5. Save changes

### Available Link Types

- LinkedIn
- Twitter/X
- Facebook
- Instagram
- YouTube
- GitHub
- Website
- Calendly
- Custom URL

## How Employees Add Links

1. Employee logs into Siggly
2. Goes to **My Profile**
3. Scrolls to **Personal Links**
4. Adds their links
5. Links appear in their deployed signature

## Using Personal Links in Templates

Add personal link placeholders to your templates:

- `{{linkedin_url}}` - LinkedIn profile
- `{{twitter_url}}` - Twitter/X profile
- `{{website_url}}` - Personal website
- `{{calendly_url}}` - Calendly booking page
- `{{github_url}}` - GitHub profile

### Example Template Block

```
Connect with me:
{{#if linkedin_url}}LinkedIn: {{linkedin_url}}{{/if}}
{{#if twitter_url}}Twitter: {{twitter_url}}{{/if}}
```

## Validation & Moderation

Personal links are validated:
- URLs must be properly formatted
- Links are checked for the correct domain (e.g., linkedin.com for LinkedIn)
- Admins can review and approve links (optional)

## Best Practices

- **Set clear guidelines** - Tell employees what links are appropriate
- **Use conditional display** - Only show links that exist
- **Keep it professional** - Limit to business-relevant platforms
- **Test thoroughly** - Verify links render correctly in all email clients',
  'Team Management',
  'guide',
  true,
  true,
  12,
  true
);

-- Article: Signature Rules Internal vs External
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Internal vs External Signature Rules',
  'signature-rules-internal-external',
  '**Show different signatures based on whether the recipient is internal or external.**

## Why Use Different Signatures?

- **External emails** - Full branding, marketing banners, legal disclaimers
- **Internal emails** - Simpler signature, no marketing, casual tone

## Setting Up Rules

### Step 1: Create Two Templates

1. Create an **External Template** with full branding
2. Create an **Internal Template** with minimal info

### Step 2: Configure the Rule

1. Go to **Templates** → Select your external template
2. Click **Rules** tab
3. Click **Add Rule**
4. Set condition: **Recipient Domain**
5. Choose: **Is not** your company domain
6. Action: Use this template

### Step 3: Set Default

1. Go to **Templates** → Select your internal template
2. Click **Set as Default**
3. This template is used when no rules match

## How It Works

When an employee sends an email:
1. Siggly checks the recipient''s email domain
2. If external (not your domain) → External template
3. If internal (your domain) → Internal/default template

## Example Configuration

**Company domain:** acme.com

| Recipient | Template Used |
|-----------|---------------|
| client@customer.com | External (full branding) |
| partner@vendor.com | External (full branding) |
| colleague@acme.com | Internal (simple) |

## Advanced Rules

Combine with other conditions:
- **Department** - Sales gets promotional banners
- **Time-based** - Holiday signatures during December
- **Campaign** - Special signatures for product launches

## Limitations

- Rules are evaluated in order (first match wins)
- Maximum 10 rules per template
- Some email clients may not support dynamic switching

## Testing Rules

1. Go to **Templates** → **Test Rules**
2. Enter a test recipient email
3. See which template would be applied
4. Adjust rules as needed',
  'Signature Rules',
  'guide',
  true,
  true,
  20,
  true
);

-- Article: Department Signatures
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Department-Based Signatures',
  'department-signatures',
  '**Assign different signature templates to different departments.**

## Why Department-Based Signatures?

Different teams have different needs:
- **Sales** - Include meeting links, promotional banners
- **Support** - Include ticket links, help resources
- **Legal** - Include compliance disclaimers
- **Marketing** - Include social links, campaign banners

## Setting Up Departments

### Step 1: Define Departments

1. Go to **Settings** → **Departments**
2. Click **Add Department**
3. Enter department name
4. Optionally add a description
5. Save

### Step 2: Assign Users to Departments

**Option A: Manual Assignment**
1. Go to **Team**
2. Select a user
3. Set their **Department** field
4. Save

**Option B: Sync from Email Provider**
- Departments sync automatically from Google Workspace OUs
- Or from Microsoft 365 groups/departments

### Step 3: Create Department Templates

1. Go to **Templates**
2. Create a template for each department
3. Customize content for that team''s needs

### Step 4: Assign Templates to Departments

1. Go to **Templates** → Select a template
2. Click **Assignments**
3. Select **By Department**
4. Choose the department(s)
5. Click **Save Assignments**

## Example Setup

| Department | Template | Special Features |
|------------|----------|------------------|
| Sales | Sales Pro | Calendly link, promo banner |
| Support | Support Team | Help desk link, hours |
| Engineering | Tech Team | GitHub link, minimal design |
| Executive | Leadership | Professional, no banner |

## Deployment

When you deploy:
1. Each user gets the template assigned to their department
2. Users without a department get the default template
3. Individual assignments override department assignments

## Managing Changes

When an employee changes departments:
1. Update their department in **Team**
2. Redeploy signatures
3. They automatically get the new department''s template

## Best Practices

- Keep department names consistent with your HR system
- Create a "Default" template for users without departments
- Review department assignments quarterly
- Document which templates are assigned to which departments',
  'Signature Rules',
  'guide',
  true,
  true,
  21,
  true
);

-- Article: Campaign Scheduling
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Campaign Date Scheduling',
  'campaign-scheduling',
  '**Schedule signature campaigns to run during specific date ranges.**

## What Is Campaign Scheduling?

Campaign scheduling lets you:
- Automatically activate promotional banners on a start date
- Automatically deactivate them on an end date
- Plan campaigns weeks or months in advance
- Run seasonal or event-based promotions

## Creating a Scheduled Campaign

### Step 1: Create Your Campaign Banner

1. Go to **Campaigns** → **Create Campaign**
2. Upload your banner image
3. Set the click-through URL
4. Add tracking parameters (optional)

### Step 2: Set the Schedule

1. In the campaign editor, find **Schedule**
2. Set **Start Date** - When the banner appears
3. Set **End Date** - When the banner disappears
4. Choose timezone for accuracy
5. Save the campaign

### Step 3: Assign to Templates

1. Go to **Templates**
2. Edit the template(s) that should show this campaign
3. Add a **Campaign Block**
4. Select your scheduled campaign
5. Save the template

## How Scheduling Works

- **Before start date:** Banner doesn''t appear in signatures
- **During campaign:** Banner is visible in all deployed signatures
- **After end date:** Banner automatically removed

No redeployment needed - changes happen automatically!

## Example Campaigns

| Campaign | Start | End | Use Case |
|----------|-------|-----|----------|
| Black Friday Sale | Nov 25 | Nov 30 | Retail promotion |
| Webinar Invite | Jan 10 | Jan 20 | Event registration |
| Holiday Greeting | Dec 20 | Jan 2 | Seasonal message |
| Product Launch | Mar 1 | Mar 31 | New product awareness |

## Managing Campaigns

### View All Campaigns
Go to **Campaigns** to see:
- Active campaigns (currently running)
- Scheduled campaigns (upcoming)
- Ended campaigns (past)

### Edit a Campaign
1. Click on the campaign
2. Update dates, image, or URL
3. Changes apply immediately

### Pause a Campaign
1. Click on the campaign
2. Toggle **Pause Campaign**
3. Banner stops showing until unpaused

## Best Practices

- Plan campaigns at least 1 week ahead
- Test banners before the start date
- Set reminders to create new campaigns
- Archive old campaigns to keep things organized
- Use UTM parameters for tracking',
  'Campaign Banners',
  'guide',
  true,
  true,
  30,
  true
);

-- Article: Add Campaign Banner
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Add a Campaign Banner to Your Signature',
  'add-campaign-banner',
  '**Add promotional banners to email signatures for marketing campaigns.**

## What Are Campaign Banners?

Campaign banners are clickable images that appear in email signatures:
- Promote events, products, or offers
- Drive traffic to landing pages
- Track clicks and engagement
- Schedule for specific date ranges

## Creating a Campaign Banner

### Step 1: Prepare Your Image

**Recommended specifications:**
- **Size:** 600px wide × 100-150px tall
- **Format:** PNG or JPG
- **File size:** Under 100KB for fast loading
- **Design:** Clear CTA, readable text, brand colors

### Step 2: Create the Campaign

1. Go to **Campaigns** in the sidebar
2. Click **Create Campaign**
3. Enter a campaign name (internal use)
4. Upload your banner image
5. Enter the destination URL
6. Add UTM tracking parameters (optional)
7. Set start and end dates (optional)
8. Click **Create**

### Step 3: Add to Template

1. Go to **Templates**
2. Edit the template you want to update
3. Drag a **Campaign Block** into your signature
4. Select your campaign from the dropdown
5. Adjust positioning and spacing
6. Save the template

### Step 4: Deploy

1. Click **Deploy** on your template
2. Select which users should receive the update
3. Confirm deployment

## Banner Placement Tips

**Best positions:**
- Below the signature content
- Above the legal disclaimer
- Separated by a divider for clarity

**Avoid:**
- Placing at the very top (looks like spam)
- Multiple banners (overwhelming)
- Banners that are too large

## Tracking Clicks

Every campaign banner automatically tracks:
- Total clicks
- Unique clicks
- Click-through rate
- Clicks by user

View stats in **Campaigns** → Select campaign → **Analytics**

## A/B Testing Banners

Test different designs:
1. Create two campaign variants
2. Assign each to different user groups
3. Compare click rates after 1-2 weeks
4. Use the winning design for everyone

## Best Practices

- Keep banners visually consistent with your brand
- Use clear, action-oriented text
- Update banners regularly to stay fresh
- Remove expired campaigns promptly
- Test on multiple email clients before deploying',
  'Campaign Banners',
  'guide',
  true,
  true,
  31,
  true
);

-- Article: Track Banner Clicks
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Track Campaign Banner Clicks',
  'track-banner-clicks',
  '**Monitor the performance of your email signature campaign banners.**

## Accessing Click Analytics

1. Go to **Campaigns** in the sidebar
2. Click on a campaign to view details
3. Select the **Analytics** tab

## Available Metrics

### Overview Stats
- **Total Clicks** - All clicks on the banner
- **Unique Clicks** - One per recipient
- **Click-Through Rate (CTR)** - Clicks ÷ Impressions
- **Top Performers** - Users generating most clicks

### Time-Based Data
- Daily click trends
- Weekly comparisons
- Campaign lifetime performance

### Breakdown Views
- **By User** - Which team members drive clicks
- **By Department** - Department performance comparison
- **By Date** - Daily/weekly trends

## Understanding the Data

### Click-Through Rate (CTR)
- **Good:** 2-5%
- **Great:** 5-10%
- **Excellent:** 10%+

Low CTR? Consider:
- More compelling banner design
- Clearer call-to-action
- Better targeting (right audience)
- Improved offer/value proposition

### Unique vs Total Clicks
- **Unique clicks** = Number of people who clicked
- **Total clicks** = All clicks (including repeat clicks)

High repeat clicks may indicate strong interest or confusion.

## UTM Tracking

Add UTM parameters for Google Analytics integration:

1. When creating a campaign, expand **Tracking**
2. Add parameters:
   - `utm_source=email_signature`
   - `utm_medium=email`
   - `utm_campaign=your_campaign_name`
3. View results in Google Analytics → Acquisition → Campaigns

## Exporting Data

1. Go to campaign analytics
2. Click **Export**
3. Choose format (CSV or PDF)
4. Download the report

## Setting Up Alerts

Get notified about campaign performance:
1. Go to **Settings** → **Notifications**
2. Enable **Campaign Alerts**
3. Set thresholds (e.g., notify when CTR drops below 2%)

## Best Practices

- Review analytics weekly during active campaigns
- Compare performance across campaigns
- Share results with marketing team
- Use data to improve future campaigns
- Archive campaigns with their analytics for reference',
  'Campaign Banners',
  'guide',
  true,
  true,
  32,
  true
);

-- Article: View Analytics
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'View Click Analytics',
  'view-analytics',
  '**Track link clicks and engagement from your email signatures.**

## Accessing Analytics

1. Go to **Analytics** in the sidebar
2. View the dashboard overview
3. Drill down into specific metrics

## Dashboard Overview

The analytics dashboard shows:

### Key Metrics
- **Total Clicks** - All tracked link clicks
- **Unique Visitors** - Individual people who clicked
- **Top Links** - Most clicked links
- **Trending** - Click trends over time

### Time Filters
- Today
- Last 7 days
- Last 30 days
- Custom date range

## What Gets Tracked

Siggly automatically tracks clicks on:
- Campaign banners
- Social media links
- Website links
- Call-to-action buttons
- Any link with tracking enabled

## Analytics Views

### By Link
See performance of individual links:
- Click count
- Click-through rate
- First/last click dates

### By User
See which team members generate engagement:
- Clicks per user
- Most effective signatures
- Deployment status

### By Campaign
Campaign-specific metrics:
- Banner clicks
- Conversion tracking
- A/B test results

### By Time
Temporal analysis:
- Daily trends
- Weekly patterns
- Month-over-month growth

## Reading the Charts

### Click Trend Chart
- X-axis: Time period
- Y-axis: Number of clicks
- Hover for daily details

### Top Links Table
- Ranked by click count
- Shows URL and click count
- Click to see detailed stats

## Filtering Data

Narrow down your view:
1. Click **Filters**
2. Select criteria:
   - Date range
   - Department
   - Campaign
   - Link type
3. Apply filters

## Exporting Reports

1. Set your desired filters
2. Click **Export**
3. Choose format:
   - CSV for spreadsheets
   - PDF for presentations
4. Download the file

## Best Practices

- Check analytics weekly
- Compare periods to spot trends
- Share reports with stakeholders
- Use insights to optimize signatures
- Set up automated reports (Pro plan)',
  'Analytics',
  'guide',
  true,
  true,
  40,
  true
);

-- Article: Link Performance
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Link Performance Analytics',
  'link-performance',
  '**Analyze which links in your signatures perform best.**

## Understanding Link Performance

Link performance shows you:
- Which links get clicked most
- Click-through rates by link type
- Trends over time
- User engagement patterns

## Accessing Link Performance

1. Go to **Analytics** → **Links**
2. View the link performance table
3. Sort by clicks, CTR, or date

## Link Types Tracked

### Social Links
- LinkedIn profile clicks
- Twitter/X clicks
- Other social platforms

### Website Links
- Company website
- Landing pages
- Blog posts

### Action Links
- Calendly booking links
- Contact forms
- Phone number clicks

### Campaign Links
- Banner click-throughs
- Promotional links

## Performance Metrics

### Click Count
Total number of times a link was clicked.

### Click-Through Rate (CTR)
Percentage of signature views that resulted in a click.

Formula: `(Clicks ÷ Impressions) × 100`

### Unique Clicks
Number of individual people who clicked (not repeat clicks).

## Analyzing Results

### High-Performing Links
- Keep these prominent in signatures
- Consider adding similar links
- Use as templates for other content

### Low-Performing Links
- Consider removing or repositioning
- Test different anchor text
- Evaluate if the link is still relevant

## Optimization Tips

### Improve Click Rates
1. Use clear, action-oriented text
2. Place important links higher
3. Use buttons for key CTAs
4. Keep link count reasonable (3-5 max)

### A/B Testing
1. Create two template variants
2. Assign to different user groups
3. Compare link performance
4. Implement winning version

## Comparing Periods

1. Select a date range
2. Click **Compare**
3. Select comparison period
4. View side-by-side metrics

## Exporting Link Data

1. Go to **Analytics** → **Links**
2. Apply desired filters
3. Click **Export**
4. Download CSV or PDF',
  'Analytics',
  'guide',
  true,
  true,
  41,
  true
);

-- Article: Export Reports
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Export Analytics Reports',
  'export-reports',
  '**Download and share analytics data from Siggly.**

## Available Export Formats

### CSV (Spreadsheet)
- Opens in Excel, Google Sheets
- Raw data for custom analysis
- Best for data manipulation

### PDF (Report)
- Formatted, printable report
- Includes charts and summaries
- Best for sharing with stakeholders

## What You Can Export

### Click Analytics
- Total clicks by date
- Clicks by link
- Clicks by user
- Campaign performance

### Team Reports
- User list with deployment status
- Department breakdowns
- Template assignments

### Audit Logs
- Activity history
- Change tracking
- Compliance records

## How to Export

### From Analytics Dashboard

1. Go to **Analytics**
2. Set your date range and filters
3. Click the **Export** button
4. Select format (CSV or PDF)
5. Download the file

### From Campaigns

1. Go to **Campaigns**
2. Select a campaign
3. Go to **Analytics** tab
4. Click **Export Campaign Report**

### From Team

1. Go to **Team**
2. Click **Export**
3. Choose what to include
4. Download the file

## Scheduling Automated Reports

*Available on Professional and Enterprise plans*

1. Go to **Settings** → **Reports**
2. Click **Create Scheduled Report**
3. Configure:
   - Report type
   - Frequency (daily, weekly, monthly)
   - Recipients (email addresses)
   - Format preference
4. Save the schedule

## Report Contents

### Analytics Report Includes:
- Executive summary
- Click trends chart
- Top performing links
- User engagement breakdown
- Campaign performance
- Recommendations

### Team Report Includes:
- Total users
- Deployment status
- Department distribution
- Role breakdown
- Recent activity

## Sharing Reports

### Email
1. Export the report
2. Attach to an email
3. Send to stakeholders

### Scheduled Delivery
1. Set up automated reports
2. Add recipient emails
3. Reports sent automatically

## Data Privacy

- Exported data follows your privacy settings
- Personal data is included only if permitted
- Audit log exports may require admin approval',
  'Analytics',
  'guide',
  true,
  true,
  42,
  true
);

-- Article: Disclaimers Library
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Disclaimers Library',
  'disclaimers-library',
  '**Manage legal disclaimers for your email signatures.**

## What Are Email Disclaimers?

Email disclaimers are legal notices added to signatures:
- Confidentiality statements
- Legal notices
- Regulatory compliance text
- Environmental messages

## Accessing the Disclaimers Library

1. Go to **Settings** → **Disclaimers**
2. View your disclaimer library
3. Create, edit, or delete disclaimers

## Pre-Built Disclaimers

Siggly includes industry-standard templates:

### Confidentiality
> This email and any attachments are confidential and intended solely for the addressee...

### Legal Notice
> This email does not constitute a binding agreement...

### HIPAA (Healthcare)
> This message may contain Protected Health Information (PHI)...

### Financial Services
> This email is not investment advice...

### Environmental
> Please consider the environment before printing this email.

## Creating Custom Disclaimers

1. Go to **Settings** → **Disclaimers**
2. Click **Create Disclaimer**
3. Enter a name (internal reference)
4. Write or paste your disclaimer text
5. Set formatting options
6. Save

## Adding Disclaimers to Signatures

### Method 1: Template Block
1. Edit your template
2. Add a **Disclaimer Block**
3. Select from your library
4. Position at the bottom of the signature

### Method 2: Global Disclaimer
1. Go to **Settings** → **Disclaimers**
2. Select a disclaimer
3. Enable **Apply to All Signatures**
4. All templates will include this disclaimer

## Formatting Options

- **Font size** - Usually smaller than main signature
- **Color** - Often gray for subtlety
- **Separator** - Line above disclaimer
- **Alignment** - Left, center, or justified

## Best Practices

### Keep It Concise
- Long disclaimers are often ignored
- Focus on essential legal requirements
- Consider linking to full policy

### Make It Readable
- Use appropriate font size (10-11px)
- Ensure sufficient contrast
- Don''t use all caps

### Stay Compliant
- Consult legal counsel for requirements
- Update when regulations change
- Document your compliance approach

### Industry-Specific
- Healthcare: HIPAA notices
- Finance: Investment disclaimers
- Legal: Confidentiality statements
- Government: Official communication notices

## Managing Multiple Disclaimers

Use different disclaimers for:
- Different departments
- Internal vs external emails
- Different regions/jurisdictions
- Specific compliance requirements

Set up rules to apply the right disclaimer automatically.',
  'Compliance & Security',
  'guide',
  true,
  true,
  50,
  true
);

-- Article: Audit Logs
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Audit Logs',
  'audit-logs',
  '**Track all changes and activities in your Siggly organization.**

## What Are Audit Logs?

Audit logs record every significant action:
- Who did what
- When it happened
- What changed
- IP address and device info

## Accessing Audit Logs

1. Go to **Settings** → **Audit Logs**
2. View the activity timeline
3. Filter and search as needed

*Note: Audit logs are available on Professional and Enterprise plans.*

## What Gets Logged

### User Actions
- Login/logout events
- Password changes
- Profile updates
- Role changes

### Template Actions
- Template created
- Template edited
- Template deleted
- Template deployed

### Team Actions
- User invited
- User removed
- Role changed
- Department assigned

### Integration Actions
- Provider connected
- Provider disconnected
- Sync completed
- Sync failed

### Settings Changes
- Organization settings updated
- Billing changes
- Security settings modified

## Reading Audit Logs

Each log entry shows:
- **Timestamp** - When it happened
- **User** - Who performed the action
- **Action** - What was done
- **Target** - What was affected
- **Details** - Additional context
- **IP Address** - Where it came from

## Filtering Logs

### By Date
1. Click **Date Range**
2. Select start and end dates
3. Apply filter

### By User
1. Click **User**
2. Select one or more users
3. Apply filter

### By Action Type
1. Click **Action**
2. Select action categories
3. Apply filter

### Search
Type keywords to search across all log entries.

## Exporting Audit Logs

1. Set your desired filters
2. Click **Export**
3. Choose format (CSV or PDF)
4. Download the file

## Retention Policy

- **Professional plan:** 90 days
- **Enterprise plan:** 1 year (or custom)

Logs older than retention period are automatically deleted.

## Compliance Use Cases

### SOC 2
Demonstrate access controls and change management.

### GDPR
Track data access and modifications.

### HIPAA
Document who accessed what and when.

### Internal Audits
Review user activities and permissions.

## Best Practices

- Review logs regularly (weekly recommended)
- Investigate unusual activities promptly
- Export logs before retention expiry
- Use logs for security incident response
- Train admins on log interpretation',
  'Compliance & Security',
  'guide',
  true,
  true,
  51,
  true
);
