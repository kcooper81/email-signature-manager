# Calendly Integration Setup Guide

## Overview
This guide walks through setting up Calendly integration for your Email Signature Manager. This integration allows you to automatically insert meeting scheduling links from Calendly into email signatures, making it easy for recipients to book time with your team.

**Use Case**: Sales teams, support staff, and customer-facing employees can include their personal Calendly booking links in signatures, streamlining the meeting scheduling process.

## Architecture Overview

- **User Authentication**: Handled by Supabase Auth (email/password, magic links)
- **Calendly Integration**: OAuth 2.0 flow to access user's event types and scheduling links
- **Data Flow**: Calendly Event Types → User Metadata → Signature Templates → Dynamic Link Insertion

## Prerequisites

### 1. Create a Calendly OAuth Application

1. Go to [Calendly Integrations](https://calendly.com/integrations/api_webhooks)
2. Sign in with your Calendly account
3. Navigate to **API & Webhooks** section
4. Click **Register New Application** or **Create OAuth App**
5. Fill in app details:
   - **Application Name**: `Email Signature Manager` (or your preferred name)
   - **Description**: `Automatically insert Calendly scheduling links into email signatures`
   - **Website URL**: Your production URL (e.g., `https://siggly.io`)
   - **Logo**: Upload your app logo (optional)

### 2. Configure OAuth Settings

1. In your Calendly app settings, add **Redirect URI**:
   - Production: `https://yourdomain.com/api/integrations/calendly/callback`
   - Development: `http://localhost:3000/api/integrations/calendly/callback`
2. Note your credentials:
   - **Client ID**: Found in the app details
   - **Client Secret**: Click "Show" to reveal (keep this secure!)

### 3. Configure Scopes

Calendly uses a simple OAuth scope model. Request these scopes:

**Required Scopes:**
- Default scope (provides access to user info and event types)

**Note**: Calendly's OAuth automatically grants access to:
- User profile information
- Event types (meeting types)
- Scheduling links

## Environment Variables

Add these to your `.env.local`:

```bash
# Calendly Integration
CALENDLY_CLIENT_ID=your-client-id-here
CALENDLY_CLIENT_SECRET=your-client-secret-here

# App URL (must match redirect URI in Calendly app)
NEXT_PUBLIC_APP_URL=http://localhost:3000  # or your production URL
```

## Database Schema

The integration uses your existing `provider_connections` table. A migration will add 'calendly' to the provider enum:

```sql
-- Add Calendly to the email_provider enum
ALTER TYPE email_provider ADD VALUE IF NOT EXISTS 'calendly';
```

### Metadata Storage

Calendly-specific data is stored in the `metadata` JSONB field of `provider_connections`:

```json
{
  "calendly_user_uri": "https://api.calendly.com/users/XXXXXX",
  "scheduling_url": "https://calendly.com/username",
  "event_types": [
    {
      "uri": "https://api.calendly.com/event_types/XXXXXX",
      "name": "30 Minute Meeting",
      "slug": "30min",
      "scheduling_url": "https://calendly.com/username/30min",
      "duration": 30,
      "active": true
    }
  ],
  "default_event_type_uri": "https://api.calendly.com/event_types/XXXXXX"
}
```

Then push the schema changes:

```bash
npm run db:push
```

## How It Works

### 1. OAuth Connection Flow

```
User clicks "Connect Calendly"
  → Redirects to Calendly OAuth page
  → User authorizes the app
  → Calendly redirects back with authorization code
  → App exchanges code for access token + refresh token
  → Tokens stored in provider_connections table
  → App fetches user's event types from Calendly API
  → Event types stored in metadata field
```

### 2. Event Type Selection

```
User views connected Calendly account
  → Sees list of available event types (e.g., "30 min", "Discovery Call")
  → Selects default event type for signatures
  → Selection saved to user metadata or organization settings
```

### 3. Signature Population

When building/deploying signatures:
- Template variable `{{calendly_link}}` is replaced with user's scheduling URL
- Can use specific event type: `{{calendly_30min}}` or default link
- Link automatically includes user's Calendly username
- Rendered as clickable button or text link in signature

### 4. Dynamic Link Insertion

Options for inserting Calendly links:
1. **Default scheduling page**: `https://calendly.com/username`
2. **Specific event type**: `https://calendly.com/username/30min`
3. **Button with CTA**: "Schedule a Meeting" button linking to Calendly
4. **Text link**: "Book time with me" inline text

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/integrations/calendly/connect` | GET | Initiates OAuth flow |
| `/api/integrations/calendly/callback` | GET | Handles OAuth callback |
| `/api/integrations/calendly/event-types` | GET | Fetches user's event types |
| `/api/integrations/calendly/disconnect` | POST | Removes Calendly connection |

## Calendly API Reference

### Base URL
```
https://api.calendly.com
```

### Key Endpoints Used

#### Get Current User
```
GET /users/me
Authorization: Bearer {access_token}
```

Returns user profile including scheduling URL.

#### List Event Types
```
GET /event_types?user={user_uri}
Authorization: Bearer {access_token}
```

Returns all event types (meeting types) for the user.

#### Event Type Object
```json
{
  "uri": "https://api.calendly.com/event_types/XXXXXX",
  "name": "30 Minute Meeting",
  "slug": "30min",
  "scheduling_url": "https://calendly.com/username/30min",
  "duration": 30,
  "active": true,
  "kind": "solo",
  "type": "StandardEventType"
}
```

## Testing

### Local Development

1. Set up your Calendly app with `http://localhost:3000/api/integrations/calendly/callback` as redirect URI
2. Add credentials to `.env.local`
3. Start your dev server: `npm run dev`
4. Navigate to `/integrations` page
5. Click "Connect Calendly"
6. Authorize the app in Calendly
7. You should be redirected back with success message

### Test Event Type Fetching

1. After connecting, the app automatically fetches your event types
2. Go to the Integrations page
3. View your Calendly connection details
4. Verify event types are listed correctly
5. Select a default event type

### Test Signature Insertion

1. Create or edit a signature template
2. Add a Calendly link block or use `{{calendly_link}}` variable
3. Preview the signature
4. Verify the Calendly link renders correctly
5. Deploy signature to a test user
6. Check that the link works in the actual email signature

## Calendly Link Variables

The integration supports these template variables:

| Variable | Description | Example Output |
|----------|-------------|----------------|
| `{{calendly_link}}` | User's main scheduling page | `https://calendly.com/username` |
| `{{calendly_default}}` | Default event type link | `https://calendly.com/username/30min` |
| `{{calendly_event:slug}}` | Specific event by slug | `{{calendly_event:discovery-call}}` |

### Usage in Templates

**Text Link:**
```html
<a href="{{calendly_link}}">Schedule a meeting</a>
```

**Button Block:**
```json
{
  "type": "button",
  "text": "Book a Call",
  "url": "{{calendly_link}}",
  "style": "primary"
}
```

**Multiple Event Types:**
```html
<a href="{{calendly_event:30min}}">Quick Chat (30 min)</a> | 
<a href="{{calendly_event:discovery}}">Discovery Call (60 min)</a>
```

## Token Management

- **Access tokens** expire after a set period (typically 2 hours)
- **Refresh tokens** are used to get new access tokens automatically
- The API client automatically refreshes expired tokens
- Tokens are stored encrypted in your database

## Rate Limits

Calendly API rate limits:
- **Standard**: 1000 requests per hour per organization
- **Enterprise**: Higher limits available

The integration handles rate limits gracefully with exponential backoff.

## Troubleshooting

### "OAuth denied" error
- User declined authorization
- Solution: Try connecting again

### "Missing tokens" error
- OAuth flow didn't complete properly
- Solution: Check redirect URI matches exactly in Calendly app settings

### Event types not loading
- Check access token hasn't expired (auto-refreshed)
- Verify user has active event types in Calendly
- Check server logs for API errors

### "User not found" error
- User doesn't have an organization in your database
- Solution: Ensure user completes signup flow first

### Links not working in signatures
- Verify the scheduling URL format is correct
- Check that event type is still active in Calendly
- Ensure user hasn't changed their Calendly username

## Security Best Practices

1. **Never commit credentials** - Keep `.env.local` in `.gitignore`
2. **Use HTTPS in production** - Required for OAuth
3. **Rotate secrets regularly** - Generate new client secrets periodically
4. **Encrypt tokens** - Tokens are stored in database (consider encryption at rest)
5. **Validate redirect URIs** - Only allow whitelisted redirect URIs

## User Experience Flow

### For Admins Setting Up Integration

1. Admin goes to Integrations page
2. Clicks "Connect Calendly"
3. Redirected to Calendly OAuth
4. Authorizes app
5. Redirected back to app
6. Sees success message and connected status
7. Views available event types
8. Selects default event type (optional)

### For Team Members Using Calendly Links

**Option A: Organization-wide Calendly**
- Admin connects organization's Calendly account
- All team members can use organization's scheduling links
- Useful for support teams with shared calendars

**Option B: Individual Calendly Accounts**
- Each team member connects their own Calendly
- Personal scheduling links in individual signatures
- Useful for sales teams with personal calendars

## Advanced Features (Future Enhancements)

### Per-User Calendly Connections
Allow each user to connect their own Calendly account:
- Store connections at user level, not just organization level
- Each user gets their own scheduling links
- Useful for sales teams where everyone has individual Calendly accounts

### Smart Link Selection
Automatically choose event type based on context:
- Sales team → "Discovery Call" event type
- Support team → "Support Session" event type
- Executives → "Executive Meeting" event type

### Analytics Integration
Track Calendly link clicks from signatures:
- How many people clicked scheduling links
- Which event types are most popular
- Conversion rate from email to booked meeting

### Calendly Embed Widget
Instead of just links, embed Calendly inline:
- Recipient can book directly from email (if email client supports)
- Better user experience than redirecting to Calendly site

## Marketing Opportunity

Calendly integration opens new use cases:
- **Target Audience**: Sales teams, customer success, support teams
- **Value Proposition**: "Make it easy for prospects to book time with you"
- **SEO Keywords**: "calendly email signature", "add calendly to signature", "calendly integration"

Consider adding:
- `/integrations/calendly` landing page
- Blog post: "How to Add Calendly to Your Email Signature"
- Case study: "How [Sales Team] Increased Meetings by 40% with Calendly Signatures"
- Video tutorial: "Setting up Calendly in Email Signatures"

## Comparison with Competitors

| Feature | Siggly | Exclaimer | CodeTwo | WiseStamp |
|---------|--------|-----------|---------|-----------|
| Calendly OAuth | ✅ Yes | ✅ Yes | ❌ No | ⚠️ Manual |
| Auto-sync event types | ✅ Yes | ⚠️ Limited | ❌ No | ❌ No |
| Per-user links | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
| Multiple event types | ✅ Yes | ⚠️ Limited | ❌ No | ❌ No |
| Link analytics | 🔄 Planned | ✅ Yes | ❌ No | ❌ No |

## Next Steps

1. Create Calendly OAuth app and get credentials
2. Add credentials to `.env.local`
3. Run database migration to add 'calendly' provider
4. Test OAuth connection flow
5. Test event type fetching
6. Test signature link insertion
7. Deploy to production with production credentials

## Resources

- [Calendly API Documentation](https://developer.calendly.com/api-docs)
- [Calendly OAuth Guide](https://developer.calendly.com/api-docs/ZG9jOjM2MzE2MDM4-oauth)
- [Calendly Developer Portal](https://developer.calendly.com/)
- [Calendly API Rate Limits](https://developer.calendly.com/api-docs/ZG9jOjM2MzE2MDM5-rate-limits)

## Support

For issues with:
- **Calendly API**: Contact Calendly Developer Support
- **Integration bugs**: Check GitHub issues or contact your development team
- **OAuth errors**: Verify redirect URIs and credentials match exactly
