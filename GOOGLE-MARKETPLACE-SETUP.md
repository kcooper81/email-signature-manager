# Google Workspace Marketplace Setup Guide

Complete step-by-step guide to publish Siggly on the Google Workspace Marketplace.

---

## Phase 1: Create Service Account (Google Cloud Console)

### Step 1.1: Create the Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project (Email Signature Hub)
3. Navigate to **IAM & Admin → Service Accounts**
4. Click **+ Create Service Account**
5. Fill in:
   - **Name**: `Siggly Marketplace Service`
   - **ID**: `siggly-marketplace` (auto-generated)
   - **Description**: `Service account for Google Workspace Marketplace integration`
6. Click **Create and Continue**
7. Skip the optional role assignment (click **Continue**)
8. Click **Done**

### Step 1.2: Enable Domain-Wide Delegation

1. In the Service Accounts list, click on your new service account
2. Click **Show Advanced Settings** (or scroll down)
3. Find **Domain-wide Delegation** section
4. Check **Enable Google Workspace Domain-wide Delegation**
5. Click **Save**
6. Note the **Client ID** (a long number like `123456789012345678901`) - you'll need this later

### Step 1.3: Generate JSON Key

1. While viewing the service account, go to **Keys** tab
2. Click **Add Key → Create new key**
3. Select **JSON** format
4. Click **Create**
5. A JSON file downloads - **keep this secure!**

The JSON file contains:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "siggly-marketplace@your-project.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",
  ...
}
```

---

## Phase 2: Configure Domain-Wide Delegation (Google Admin Console)

> **Note**: This step is done by each customer when they install your app. But you need to test it with your own domain first.

### Step 2.1: Add API Client in Admin Console

1. Go to [Google Admin Console](https://admin.google.com)
2. Navigate to **Security → Access and data control → API controls**
3. Scroll to **Domain-wide delegation** section
4. Click **Manage Domain-Wide Delegation**
5. Click **Add new**
6. Enter:
   - **Client ID**: The Client ID from Step 1.2
   - **OAuth Scopes** (comma-separated):
     ```
     https://www.googleapis.com/auth/gmail.settings.basic,https://www.googleapis.com/auth/gmail.settings.sharing,https://www.googleapis.com/auth/admin.directory.user.readonly
     ```
7. Click **Authorize**

---

## Phase 3: Set Up Environment Variables

### Step 3.1: Local Development (.env.local)

Add to your `.env.local`:

```env
# Google Workspace Marketplace Service Account
GOOGLE_SERVICE_ACCOUNT_EMAIL=siggly-marketplace@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...(your key here)...\n-----END PRIVATE KEY-----\n"
```

**Important**: The private key must have `\n` for line breaks (not actual newlines).

### Step 3.2: Production (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com) → Your Project → Settings → Environment Variables
2. Add:
   - **GOOGLE_SERVICE_ACCOUNT_EMAIL**: `siggly-marketplace@your-project.iam.gserviceaccount.com`
   - **GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY**: Paste the entire private key from the JSON file

---

## Phase 4: Run Database Migration

### Step 4.1: Run Migration

```bash
cd apps/web
npx supabase db push
```

Or manually run the SQL in Supabase Dashboard:

```sql
ALTER TABLE provider_connections
ADD COLUMN IF NOT EXISTS auth_type TEXT DEFAULT 'oauth',
ADD COLUMN IF NOT EXISTS admin_email TEXT,
ADD COLUMN IF NOT EXISTS domain TEXT;
```

---

## Phase 5: Test the Integration

### Step 5.1: Test Locally

1. Start your dev server: `npm run dev`
2. Go to `/integrations`
3. Click **Install from Marketplace**
4. Enter your admin email and domain
5. Click **Verify & Connect**

If domain-wide delegation is set up correctly, it should connect and you can sync users.

---

## Phase 6: Create Marketplace Listing

### Step 6.1: Enable Marketplace SDK

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services → Library**
3. Search for **Google Workspace Marketplace SDK**
4. Click **Enable**

### Step 6.2: Configure Marketplace SDK

1. Go to **APIs & Services → Google Workspace Marketplace SDK**
2. Click **App Configuration**
3. Fill in:

**App Visibility**:
- Select **Public** (or Private for testing)

**App Integration**:
- Check **Admin install only**
- Check **Supports domain-wide installation**

**OAuth 2.0 Scopes**:
```
https://www.googleapis.com/auth/gmail.settings.basic
https://www.googleapis.com/auth/gmail.settings.sharing
https://www.googleapis.com/auth/admin.directory.user.readonly
```

**Extensions**: Leave unchecked unless you want Calendar/Drive integration

**Developer Information**:
- Name: Siggly
- Website: https://www.siggly.io
- Support URL: https://www.siggly.io/support
- Terms of Service URL: https://www.siggly.io/terms
- Privacy Policy URL: https://www.siggly.io/privacy

4. Click **Save**

### Step 6.3: Create Store Listing

1. In Marketplace SDK, go to **Store Listing**
2. Fill in:

**Application Info**:
- Application name: `Siggly - Email Signature Manager`
- Short description (80 chars): `Deploy professional email signatures to your entire Google Workspace organization`
- Detailed description (4000 chars): 
  ```
  Siggly makes it easy for Google Workspace administrators to create, manage, and deploy professional email signatures across their entire organization.

  KEY FEATURES:
  • Visual drag-and-drop signature editor
  • One-click deployment to all Gmail users
  • Automatic user sync from Google Workspace directory
  • Dynamic fields (name, title, phone, etc.)
  • Mobile-responsive signatures
  • Department and role-based templates
  • Compliance blocks for legal, healthcare, and finance
  • Real-time preview

  HOW IT WORKS:
  1. Connect your Google Workspace
  2. Design your signature template
  3. Map fields to user attributes
  4. Deploy to all users with one click

  Siggly syncs with your Google Workspace directory, so signatures stay up-to-date as employees join, leave, or change roles.
  ```

**Graphics** (required):
- Application icon: 128x128 PNG
- Banner: 220x140 PNG
- Screenshots: At least 1, recommended 3-5 (1280x800 or similar)

**Category**:
- Primary: Business Tools
- Secondary: IT & Admin Tools

3. Click **Save**

---

## Phase 7: Submit for Review

### Step 7.1: Pre-Submission Checklist

- [ ] Service account created with domain-wide delegation
- [ ] All scopes documented and justified
- [ ] Privacy policy URL works
- [ ] Terms of service URL works
- [ ] Support URL works
- [ ] App icon uploaded (128x128)
- [ ] At least one screenshot
- [ ] Detailed description filled out
- [ ] Tested with your own domain

### Step 7.2: Submit

1. In Marketplace SDK, click **Publish**
2. Choose **Public** visibility
3. Click **Submit for Review**

### Step 7.3: Review Timeline

- **Initial review**: 1-2 weeks
- **Clarifications**: May take additional time if Google has questions
- **Approval**: Total 2-4 weeks typically

---

## Post-Launch: Customer Installation Flow

When a customer installs from Marketplace:

1. Admin finds Siggly in [Google Workspace Marketplace](https://workspace.google.com/marketplace)
2. Clicks **Install**
3. Reviews permissions and clicks **Continue**
4. Chooses to install for **entire domain** or specific OUs
5. Clicks **Done**
6. Comes to Siggly, enters their admin email + domain
7. Siggly verifies installation and connects

---

## Troubleshooting

### "Domain-wide delegation not configured"
- Customer's admin hasn't added the service account Client ID in Admin Console
- Provide them the Client ID and scope list

### "403 Forbidden" errors
- Service account doesn't have permission
- Check that scopes match exactly between your code and Admin Console config

### "Service account not configured" 
- Missing environment variables
- Check `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

---

## Resources

- [Marketplace SDK Documentation](https://developers.google.com/workspace/marketplace)
- [Domain-Wide Delegation Guide](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority)
- [Marketplace Publishing Guide](https://developers.google.com/workspace/marketplace/how-to-publish)
