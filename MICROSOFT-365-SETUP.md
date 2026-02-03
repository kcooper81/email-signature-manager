# Microsoft 365 Integration Setup Guide

## Overview
This guide walks through setting up Microsoft 365 OAuth integration for Siggly, enabling organizations to connect their Microsoft 365/Outlook accounts for signature deployment.

**IMPORTANT**: This is a **workspace integration** (like Google Workspace), NOT user authentication. We use Supabase Auth for user login. This integration is specifically for deploying signatures to Microsoft 365 users.

## Architecture Overview

Similar to Google Workspace integration:
- **User Authentication**: Handled by Supabase Auth (can use email/password, magic links, or OAuth providers)
- **Workspace Integration**: Custom OAuth flow to get organization-level access to Microsoft Graph API for signature deployment

## Prerequisites

### 1. Azure AD App Registration
You need to create an app registration in Azure Active Directory (now called Microsoft Entra ID).

**Steps:**
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** (or **Microsoft Entra ID**)
3. Click **App registrations** → **New registration**
4. Fill in:
   - **Name**: `Siggly Email Signature Manager` (or your preferred name)
   - **Supported account types**: `Accounts in any organizational directory (Any Azure AD directory - Multitenant)`
   - **Redirect URI**: 
     - Type: `Web`
     - URL: `https://yourdomain.com/api/integrations/microsoft/callback`
     - For local dev: `http://localhost:3000/api/integrations/microsoft/callback`

### 2. Configure API Permissions
After creating the app, configure the required permissions:

**Microsoft Graph API Permissions Needed:**
- `User.Read` (Delegated) - Read user profile
- `User.ReadBasic.All` (Delegated) - Read all users' basic profiles
- `MailboxSettings.ReadWrite` (Delegated) - Read and write user mailbox settings (for signatures)
- `Directory.Read.All` (Application) - Read directory data (for user sync)
- `Mail.Send` (Delegated) - Optional: for testing signatures

**How to add permissions:**
1. In your app registration, go to **API permissions**
2. Click **Add a permission** → **Microsoft Graph**
3. Choose **Delegated permissions** and add the permissions above
4. For `Directory.Read.All`, choose **Application permissions**
5. Click **Grant admin consent** (requires admin privileges)

### 3. Create Client Secret
1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Add description: `Siggly Production` or `Siggly Development`
4. Choose expiration (recommend: 24 months)
5. Click **Add**
6. **IMPORTANT**: Copy the secret value immediately (you won't see it again!)

### 4. Note Your Credentials
You'll need these values for your `.env.local`:
- **Application (client) ID**: Found on the app's Overview page
- **Directory (tenant) ID**: Found on the app's Overview page
- **Client secret**: The value you just copied

## Environment Variables

Add these to your `.env.local`:

```bash
# Microsoft 365 OAuth
MICROSOFT_CLIENT_ID=your-application-client-id
MICROSOFT_CLIENT_SECRET=your-client-secret-value
MICROSOFT_TENANT_ID=your-tenant-id

# Or use 'common' for multi-tenant support
# MICROSOFT_TENANT_ID=common
```

## API Scopes Required

The following Microsoft Graph API scopes will be requested:

```typescript
const SCOPES = [
  'openid',                           // Basic OpenID Connect
  'profile',                          // User profile info
  'email',                            // User email
  'offline_access',                   // Refresh tokens
  'User.Read',                        // Read user profile
  'User.ReadBasic.All',              // Read all users
  'MailboxSettings.ReadWrite',       // Read/write signatures
];
```

## Implementation Architecture

### Files to Create:
1. `/lib/microsoft/oauth.ts` - OAuth client and token management
2. `/lib/microsoft/graph.ts` - Microsoft Graph API calls
3. `/app/api/integrations/microsoft/connect/route.ts` - Initiate OAuth flow
4. `/app/api/integrations/microsoft/callback/route.ts` - Handle OAuth callback
5. `/app/api/integrations/microsoft/sync/route.ts` - Sync users from Azure AD
6. `/app/api/integrations/microsoft/deploy/route.ts` - Deploy signatures

### Database Schema Updates:
Update the `integrations` table to support Microsoft:
- `provider` enum: Add 'microsoft' option
- Store `access_token`, `refresh_token`, `token_expiry`
- Store `tenant_id` for organization identification

## Key Differences from Google Workspace

### 1. **OAuth Flow**
- Microsoft uses Azure AD OAuth 2.0 (similar to Google but different endpoints)
- Tenant ID is important for multi-tenant apps
- Token endpoint: `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token`

### 2. **User Directory**
- Google: Admin SDK Directory API
- Microsoft: Microsoft Graph API `/users` endpoint

### 3. **Signature Deployment**
- Google: Gmail API `sendAs` settings
- Microsoft: Graph API `/users/{userId}/mailboxSettings` endpoint
- Microsoft signatures are HTML-based in `mailboxSettings.automaticRepliesSetting`

### 4. **Signature Format**
Microsoft 365 signatures are stored differently:
- Outlook desktop: Roaming signatures (Graph API)
- Outlook web: Mailbox settings
- Mobile: Limited support

## Microsoft Graph API Endpoints

### Get User Profile
```
GET https://graph.microsoft.com/v1.0/me
```

### List All Users (requires admin consent)
```
GET https://graph.microsoft.com/v1.0/users
```

### Get User's Mailbox Settings
```
GET https://graph.microsoft.com/v1.0/users/{userId}/mailboxSettings
```

### Update User's Signature
```
PATCH https://graph.microsoft.com/v1.0/users/{userId}/mailboxSettings
Content-Type: application/json

{
  "automaticRepliesSetting": {
    "status": "disabled",
    "externalAudience": "all",
    "internalReplyMessage": "<html>Your signature HTML</html>",
    "externalReplyMessage": "<html>Your signature HTML</html>"
  }
}
```

**Note**: The above is for automatic replies. For actual signatures, you need to use:
```
PATCH https://graph.microsoft.com/v1.0/users/{userId}/settings/microsoft.graph.mailboxSettings
```

## Testing

### Local Development
1. Use `http://localhost:3000` as your redirect URI in Azure AD
2. Test with a Microsoft 365 developer account (free at https://developer.microsoft.com/microsoft-365/dev-program)

### Production
1. Update redirect URI to your production domain
2. Ensure SSL/HTTPS is enabled
3. Request admin consent for organization-wide permissions

## Security Considerations

1. **Token Storage**: Store refresh tokens encrypted in database
2. **Token Refresh**: Implement automatic token refresh before expiry
3. **Scope Minimization**: Only request permissions you actually need
4. **Admin Consent**: Some permissions require tenant admin approval
5. **Multi-tenant**: Use `common` tenant for multi-org support

## Common Issues

### "AADSTS65001: The user or administrator has not consented"
- Solution: Admin needs to grant consent in Azure AD

### "AADSTS50011: The reply URL specified does not match"
- Solution: Ensure redirect URI in code matches Azure AD exactly (including trailing slash)

### "Invalid client secret"
- Solution: Client secret may have expired, create a new one

### Signatures not appearing in Outlook
- Outlook desktop caches signatures locally
- May need to restart Outlook or clear cache
- Web version updates faster

## Next Steps

1. Create Azure AD app registration
2. Gather credentials
3. Implement OAuth flow (similar to Google integration)
4. Implement Microsoft Graph API calls
5. Test with development account
6. Deploy and test with real users

## Resources

- [Microsoft Graph API Documentation](https://learn.microsoft.com/en-us/graph/)
- [Azure AD OAuth 2.0 Flow](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow)
- [Mailbox Settings API](https://learn.microsoft.com/en-us/graph/api/user-update-mailboxsettings)
- [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program)
