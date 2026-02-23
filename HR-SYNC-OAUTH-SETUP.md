# HR Sync OAuth Integration Setup

Complete guide for setting up OAuth-based HR integrations with automatic token management and webhook support.

---

## Overview

The new OAuth-based integration system provides:
- ✅ **One-click connection** - No manual token copying
- ✅ **Automatic token refresh** - Never expire
- ✅ **Automatic webhook setup** - Real-time sync (Gusto)
- ✅ **Secure token storage** - Encrypted at rest
- ✅ **User-friendly wizard** - Step-by-step guidance

---

## Prerequisites

### 1. Environment Variables

Add these to your `.env.local` file:

```bash
# OAuth Encryption (REQUIRED)
# Generate with: openssl rand -hex 32
OAUTH_ENCRYPTION_KEY=your_64_character_hex_string_here

# BambooHR OAuth
BAMBOOHR_CLIENT_ID=your_bamboohr_client_id
BAMBOOHR_CLIENT_SECRET=your_bamboohr_client_secret

# Gusto OAuth
GUSTO_CLIENT_ID=your_gusto_client_id
GUSTO_CLIENT_SECRET=your_gusto_client_secret

# Rippling OAuth (when available)
RIPPLING_CLIENT_ID=your_rippling_client_id
RIPPLING_CLIENT_SECRET=your_rippling_client_secret

# App URL (for OAuth callbacks)
NEXT_PUBLIC_APP_URL=https://siggly.io
```

### 2. Database Migration

Run the SQL migrations:

```sql
-- Migration 1: Add webhook_secret column
ALTER TABLE sync_configurations ADD COLUMN IF NOT EXISTS webhook_secret TEXT;

-- Migration 2: Add OAuth fields
ALTER TABLE sync_configurations ADD COLUMN IF NOT EXISTS oauth_access_token TEXT;
ALTER TABLE sync_configurations ADD COLUMN IF NOT EXISTS oauth_refresh_token TEXT;
ALTER TABLE sync_configurations ADD COLUMN IF NOT EXISTS oauth_token_expires_at TIMESTAMP;
ALTER TABLE sync_configurations ADD COLUMN IF NOT EXISTS oauth_company_id TEXT;
ALTER TABLE sync_configurations ADD COLUMN IF NOT EXISTS oauth_subdomain TEXT;
```

---

## Provider Setup

### BambooHR

#### 1. Register Your App

1. Go to: https://www.bamboohr.com/partner-programs/marketplace-program
2. Apply to become a marketplace partner
3. Once approved, create an app in the BambooHR Developer Portal
4. Get your **Client ID** and **Client Secret**

#### 2. Configure Redirect URI

In BambooHR Developer Portal, add this redirect URI:
```
https://siggly.io/api/oauth/bamboohr/callback
```

For local development:
```
http://localhost:3000/api/oauth/bamboohr/callback
```

#### 3. Add to Environment Variables

```bash
BAMBOOHR_CLIENT_ID=your_client_id_here
BAMBOOHR_CLIENT_SECRET=your_client_secret_here
```

---

### Gusto

#### 1. Create Developer Account

1. Go to: https://dev.gusto.com
2. Sign up for a developer account
3. Create a new application
4. Get your **Client ID** and **Client Secret**

#### 2. Configure Redirect URI

In Gusto Developer Portal → Your App → Settings, add:
```
https://siggly.io/api/oauth/gusto/callback
```

For local development:
```
http://localhost:3000/api/oauth/gusto/callback
```

#### 3. Add to Environment Variables

```bash
GUSTO_CLIENT_ID=your_client_id_here
GUSTO_CLIENT_SECRET=your_client_secret_here
```

#### 4. Webhook Setup (Automatic)

The integration will **automatically create** a webhook subscription when users connect. No manual setup needed!

The webhook endpoint is:
```
https://siggly.io/api/webhooks/gusto
```

---

### Rippling

#### 1. Contact Rippling

Rippling's API is not publicly available. Contact:
- Email: [[email protected]](mailto:[email protected])
- Request API access for your integration

#### 2. Once Approved

Follow similar OAuth setup as above with redirect URI:
```
https://siggly.io/api/oauth/rippling/callback
```

---

## User Flow

### How Users Connect (New OAuth Flow)

#### Step 1: Select Provider
1. User goes to Settings → HR & Directory Sync
2. Clicks "Add Integration"
3. Sees wizard with provider options (BambooHR, Gusto, Rippling)
4. Clicks on their provider

#### Step 2: Provider Setup
**For BambooHR:**
- Enters their subdomain (e.g., "mycompany")
- Clicks "Connect to BambooHR"

**For Gusto:**
- Optionally toggles "Use Sandbox" for testing
- Clicks "Connect to Gusto"

#### Step 3: OAuth Authorization
- User is redirected to provider's website
- Signs in (if not already)
- Authorizes Siggly to access employee data
- Redirected back to Siggly

#### Step 4: Automatic Setup
**What happens automatically:**
- ✅ OAuth tokens stored (encrypted)
- ✅ Refresh token saved for auto-renewal
- ✅ Company ID / Subdomain extracted
- ✅ Webhook created (Gusto only)
- ✅ Integration activated

#### Step 5: Configure & Test
- User sets sync schedule (Manual/Daily/Hourly)
- Toggles auto-apply changes
- Clicks "Test Sync" to preview
- Clicks "Activate"

**Total time: ~2 minutes** (vs 30+ minutes with manual setup)

---

## Technical Architecture

### OAuth Flow Diagram

```
User clicks "Connect"
    ↓
POST /api/oauth/initiate
    ↓
Create placeholder config in DB
    ↓
Generate state parameter (contains config ID)
    ↓
Redirect to provider OAuth URL
    ↓
User authorizes in provider
    ↓
Provider redirects to /api/oauth/{provider}/callback?code=...
    ↓
Exchange code for access_token + refresh_token
    ↓
Encrypt tokens
    ↓
Store in sync_configurations table
    ↓
Create webhook (if supported)
    ↓
Redirect to /settings/hr-sync?success=connected
```

### Token Refresh Flow

```
Sync job starts
    ↓
Check oauth_token_expires_at
    ↓
If expired or expiring soon:
    ↓
    Use refresh_token to get new access_token
    ↓
    Update oauth_access_token and oauth_token_expires_at
    ↓
Use access_token for API calls
```

### Security Features

1. **Token Encryption**
   - All OAuth tokens encrypted using AES-256-GCM
   - Encryption key stored in environment variable
   - Never exposed to client-side code

2. **State Parameter**
   - Prevents CSRF attacks
   - Contains config ID for callback
   - Base64 encoded JSON

3. **Scoped Access**
   - All queries scoped to organization_id
   - Role-based access (owner/admin only)
   - Tokens tied to specific organization

---

## Files Created

### OAuth Infrastructure

```
apps/web/src/lib/oauth/
├── encryption.ts              # Token encryption/decryption
├── gusto.ts                   # Gusto OAuth helpers
├── bamboohr.ts                # BambooHR OAuth helpers
└── rippling.ts                # Rippling OAuth helpers (future)

apps/web/src/app/api/oauth/
├── initiate/route.ts          # Start OAuth flow
├── gusto/callback/route.ts    # Gusto OAuth callback
├── bamboohr/callback/route.ts # BambooHR OAuth callback
└── rippling/callback/route.ts # Rippling OAuth callback (future)

apps/web/src/components/hr-sync/
└── integration-wizard.tsx     # User-friendly wizard UI
```

### Database Migrations

```
apps/web/drizzle/
├── 0000_add_webhook_secret_to_sync_configurations.sql
└── 0001_add_oauth_fields_to_sync_configurations.sql
```

---

## Testing

### Local Development

1. **Use ngrok for OAuth callbacks:**
   ```bash
   ngrok http 3000
   ```

2. **Update environment variables:**
   ```bash
   NEXT_PUBLIC_APP_URL=https://your-ngrok-url.ngrok.io
   ```

3. **Update provider redirect URIs** to use ngrok URL

4. **Test OAuth flow:**
   - Go to /settings/hr-sync
   - Click "Add Integration"
   - Select provider
   - Complete OAuth flow

### Production Testing

1. **Deploy to production** (Vercel/your hosting)
2. **Verify environment variables** are set
3. **Test with real provider accounts**
4. **Verify webhook delivery** (Gusto)

---

## Troubleshooting

### "OAuth initiate error"

**Check:**
- Environment variables are set correctly
- Client ID and Secret are valid
- Redirect URI matches exactly in provider settings

### "Token refresh failed"

**Check:**
- Refresh token is still valid
- Provider API is accessible
- Encryption key hasn't changed

### "Webhook unreachable" (Gusto)

**Check:**
- Webhook endpoint is deployed
- URL is publicly accessible
- No firewall blocking requests
- Database migration for webhook_secret ran

### "Insufficient permissions"

**Check:**
- User has owner or admin role
- Organization ID is correct
- User is authenticated

---

## Migration from Manual Setup

### For Existing Integrations

Users with manual API key setups can:

1. **Keep using manual setup** - Still supported
2. **Migrate to OAuth** - Delete old config, create new one with OAuth

### Backward Compatibility

The system supports both:
- **Legacy**: Manual API keys in `api_key` field
- **New**: OAuth tokens in `oauth_access_token` field

HR sync functions check OAuth tokens first, fall back to API key if not present.

---

## Future Enhancements

### Planned Features

1. **Automatic Webhook Setup for All Providers**
   - BambooHR webhook support (when available)
   - Rippling webhook support

2. **Token Refresh Background Job**
   - Proactively refresh tokens before expiry
   - Notify admins if refresh fails

3. **Multi-Company Support**
   - Allow connecting multiple companies per provider
   - Separate configs per company

4. **Sync Preview**
   - Show employees before activating
   - Highlight changes before applying

5. **Advanced Field Mapping**
   - Custom field mapping UI
   - Map custom fields from providers

---

## Support

### For Developers

- OAuth library docs: https://oauth.net/2/
- BambooHR API: https://documentation.bamboohr.com
- Gusto API: https://docs.gusto.com
- Rippling API: https://developer.rippling.com

### For Issues

Check:
1. Server logs for detailed error messages
2. Provider API status pages
3. Environment variables are correct
4. Database migrations have run

---

## Summary

The new OAuth-based integration system provides a **professional, user-friendly experience** that:

- ✅ Takes 2 minutes instead of 30+ minutes
- ✅ Requires zero technical knowledge
- ✅ Automatically handles token refresh
- ✅ Sets up webhooks automatically (Gusto)
- ✅ Provides clear error messages
- ✅ Follows security best practices

**This is the right way to build integrations** - like Zapier, Slack, and other professional SaaS products.
