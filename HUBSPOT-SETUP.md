# HubSpot CRM Integration Setup Guide

## Overview
This guide walks through setting up HubSpot CRM integration for your Email Signature Manager. This integration allows you to automatically sync contact data from HubSpot to populate signature fields with employee information.

**IMPORTANT**: This is a **CRM data sync integration**, NOT an email provider integration. We sync contact data from HubSpot to auto-populate signature template variables (name, title, phone, etc.).

## Architecture Overview

- **User Authentication**: Handled by Supabase Auth (email/password, magic links)
- **CRM Integration**: OAuth flow to access HubSpot contacts and sync employee data
- **Data Flow**: HubSpot Contacts → Your App Users → Signature Templates

## Prerequisites

### 1. Create a HubSpot App

1. Go to [HubSpot Developer Portal](https://developers.hubspot.com/)
2. Sign in with your HubSpot account
3. Click **Apps** → **Create app**
4. Fill in app details:
   - **App name**: `Email Signature Manager` (or your preferred name)
   - **Description**: `Sync HubSpot contacts to manage email signatures`
   - **Logo**: Upload your app logo (optional)

### 2. Configure OAuth Settings

1. In your app settings, go to **Auth** tab
2. Add **Redirect URL**:
   - Production: `https://yourdomain.com/api/integrations/hubspot/callback`
   - Development: `http://localhost:3000/api/integrations/hubspot/callback`
3. Note your credentials:
   - **Client ID**: Found in the Auth tab
   - **Client Secret**: Click "Show" to reveal

### 3. Configure Scopes

Add the following scopes to your app:

**Required Scopes:**
- `crm.objects.contacts.read` - Read contact records
- `crm.objects.contacts.write` - Update contact records (optional, for future features)
- `crm.schemas.contacts.read` - Read contact property definitions

**How to add scopes:**
1. Go to **Auth** tab in your app settings
2. Scroll to **Scopes** section
3. Search and select each scope listed above
4. Click **Save**

## Environment Variables

Add these to your `.env.local`:

```bash
# HubSpot CRM Integration
HUBSPOT_CLIENT_ID=your-client-id-here
HUBSPOT_CLIENT_SECRET=your-client-secret-here

# App URL (must match redirect URI in HubSpot app)
NEXT_PUBLIC_APP_URL=http://localhost:3000  # or your production URL
```

## Database Schema

The integration uses your existing `provider_connections` table. Make sure to run the schema migration to add 'hubspot' to the provider enum:

```sql
-- This is handled automatically by the schema update
ALTER TYPE email_provider ADD VALUE 'hubspot';
```

Then push the schema changes:

```bash
npm run db:push
```

## How It Works

### 1. OAuth Connection Flow

```
User clicks "Connect HubSpot CRM"
  → Redirects to HubSpot OAuth page
  → User authorizes the app
  → HubSpot redirects back with authorization code
  → App exchanges code for access token + refresh token
  → Tokens stored in provider_connections table
```

### 2. Contact Sync Flow

```
User clicks "Sync Users" (or automatic sync)
  → App fetches all contacts from HubSpot
  → Maps HubSpot properties to user fields:
      - firstname → first_name
      - lastname → last_name
      - jobtitle → title
      - department → department
      - phone → phone
      - mobilephone → mobile
  → Upserts users into your database
  → Users now available for signature assignment
```

### 3. Signature Population

When deploying signatures:
- Template variables like `{{first_name}}`, `{{job_title}}`, etc. are populated from synced user data
- Data stays in sync with HubSpot contacts
- Re-sync anytime to update user information

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/integrations/hubspot/connect` | GET | Initiates OAuth flow |
| `/api/integrations/hubspot/callback` | GET | Handles OAuth callback |
| `/api/integrations/hubspot/sync` | POST | Syncs contacts from HubSpot |

## Testing

### Local Development

1. Set up your HubSpot app with `http://localhost:3000/api/integrations/hubspot/callback` as redirect URI
2. Add credentials to `.env.local`
3. Start your dev server: `npm run dev`
4. Navigate to `/integrations` page
5. Click "Connect HubSpot CRM"
6. Authorize the app in HubSpot
7. You should be redirected back with success message

### Test Contact Sync

1. After connecting, go to the Team page
2. Click "Sync Users" (or use the API endpoint)
3. Verify contacts appear in your users list
4. Check that contact properties are correctly mapped

## HubSpot Contact Properties

The integration syncs these standard HubSpot contact properties:

| HubSpot Property | Your App Field | Template Variable |
|------------------|----------------|-------------------|
| `email` | `email` | `{{email}}` |
| `firstname` | `first_name` | `{{first_name}}` |
| `lastname` | `last_name` | `{{last_name}}` |
| `jobtitle` | `title` | `{{job_title}}` |
| `phone` | `phone` | `{{phone}}` |
| `mobilephone` | `mobile` | `{{mobile}}` |
| `department` | `department` | `{{department}}` |

### Custom Properties

To sync custom HubSpot properties:

1. Edit `apps/web/src/lib/hubspot/crm.ts`
2. Add custom property names to the `properties` array
3. Map them in the contact object
4. Update your database schema if needed

## Token Management

- **Access tokens** expire after a few hours
- **Refresh tokens** are used to get new access tokens automatically
- The sync endpoint automatically refreshes expired tokens
- Tokens are stored encrypted in your database

## Rate Limits

HubSpot API rate limits:
- **Free/Starter**: 100 requests per 10 seconds
- **Professional/Enterprise**: Higher limits

The integration handles rate limits gracefully with pagination.

## Troubleshooting

### "OAuth denied" error
- User declined authorization
- Solution: Try connecting again

### "Missing tokens" error
- OAuth flow didn't complete properly
- Solution: Check redirect URI matches exactly in HubSpot app settings

### Contacts not syncing
- Check access token hasn't expired (auto-refreshed)
- Verify scopes are correctly configured in HubSpot app
- Check server logs for API errors

### "Organization not found" error
- User doesn't have an organization in your database
- Solution: Ensure user completes signup flow first

## Security Best Practices

1. **Never commit credentials** - Keep `.env.local` in `.gitignore`
2. **Use HTTPS in production** - Required for OAuth
3. **Rotate secrets regularly** - Generate new client secrets periodically
4. **Limit scopes** - Only request permissions you need
5. **Encrypt tokens** - Tokens are stored in database (consider encryption at rest)

## Next Steps

1. Create HubSpot app and get credentials
2. Add credentials to `.env.local`
3. Push database schema changes
4. Test OAuth connection flow
5. Test contact sync
6. Deploy to production with production credentials

## Marketing Opportunity

HubSpot integration opens new use cases:
- **Target Audience**: Sales teams using HubSpot CRM
- **Value Proposition**: "Auto-sync your HubSpot team to email signatures"
- **SEO Keywords**: "hubspot email signature integration", "hubspot signature sync"

Consider adding:
- `/integrations/hubspot` landing page
- Blog post: "How to Sync HubSpot Contacts to Email Signatures"
- Case study: "How [Company] Automated Signatures with HubSpot"

## Resources

- [HubSpot OAuth Documentation](https://developers.hubspot.com/docs/api/oauth-quickstart-guide)
- [HubSpot CRM API](https://developers.hubspot.com/docs/api/crm/contacts)
- [HubSpot Developer Portal](https://developers.hubspot.com/)
- [HubSpot API Rate Limits](https://developers.hubspot.com/docs/api/usage-details)
