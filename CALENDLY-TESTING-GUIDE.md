# Calendly Integration Testing Guide

## Overview
This guide provides step-by-step instructions for testing the Calendly integration end-to-end.

## Prerequisites

### 1. Calendly Account Setup
- Create a Calendly account at https://calendly.com
- Set up at least 2-3 event types (e.g., "30 Minute Meeting", "Discovery Call", "Quick Chat")
- Note your Calendly username (e.g., `https://calendly.com/your-username`)

### 2. Create Calendly OAuth Application
1. Go to https://calendly.com/integrations/api_webhooks
2. Click "Register New Application"
3. Fill in:
   - **Name**: Email Signature Manager (Dev)
   - **Website**: http://localhost:3000
   - **Redirect URI**: http://localhost:3000/api/integrations/calendly/callback
4. Save your Client ID and Client Secret

### 3. Environment Setup
Add to `.env.local`:
```bash
CALENDLY_CLIENT_ID=your_client_id_here
CALENDLY_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Migration
Run the migration to add Calendly to the provider enum:
```bash
# If using Supabase CLI
supabase db push

# Or apply the migration manually via Supabase dashboard
# Run: apps/web/supabase/migrations/add_calendly_provider.sql
```

## Testing Checklist

### Phase 1: OAuth Connection Flow

#### Test 1.1: Connect Calendly
- [ ] Start dev server: `npm run dev`
- [ ] Navigate to `/integrations` page
- [ ] Verify Calendly card is visible with "Connect Calendly" button
- [ ] Click "Connect Calendly"
- [ ] Verify redirect to Calendly OAuth page
- [ ] Authorize the application
- [ ] Verify redirect back to `/integrations?success=calendly_connected`
- [ ] Verify success message displays
- [ ] Verify Calendly card shows "Connected" status

**Expected Result**: Calendly connection saved to `provider_connections` table with:
- `provider = 'calendly'`
- `access_token` and `refresh_token` populated
- `metadata` contains user info and event types
- `is_active = true`

#### Test 1.2: View Event Types
- [ ] Click "View Event Types" button
- [ ] Verify event types load and display correctly
- [ ] Verify event names, durations, and slugs are shown
- [ ] Check that event types match your Calendly account

**Expected Result**: Event types fetched from Calendly API and displayed in UI

#### Test 1.3: Refresh Metadata
- [ ] Add a new event type in Calendly
- [ ] Click "Refresh Event Types" in the app
- [ ] Verify new event type appears in the list
- [ ] Check database: `metadata` field should be updated with new event type

**Expected Result**: Metadata refreshed with latest event types from Calendly

### Phase 2: Signature Template Integration

#### Test 2.1: Create Template with Calendly Link
- [ ] Navigate to `/templates/new`
- [ ] Create a new signature template
- [ ] Add a text block with: `Schedule a meeting: {{calendly_link}}`
- [ ] Save the template
- [ ] Preview the template
- [ ] Verify `{{calendly_link}}` placeholder is visible in preview

**Expected Result**: Template saved with Calendly placeholder

#### Test 2.2: Add Calendly Button
- [ ] Edit or create a template
- [ ] Add a button block
- [ ] Set button text: "Book a Call"
- [ ] Set button URL: `{{calendly_link}}`
- [ ] Save and preview
- [ ] Verify button displays with placeholder URL

**Expected Result**: Button block created with Calendly link placeholder

#### Test 2.3: Use Specific Event Type
- [ ] Create a template with text: `Quick chat: {{calendly_event:30min}}`
- [ ] Replace `30min` with your actual event type slug
- [ ] Save and preview
- [ ] Verify placeholder is visible

**Expected Result**: Specific event type placeholder saved

### Phase 3: Signature Rendering & Deployment

#### Test 3.1: Render Signature with Calendly Link
- [ ] Assign template to a user
- [ ] Navigate to deployment wizard
- [ ] Select user and template
- [ ] Preview the rendered signature
- [ ] Verify `{{calendly_link}}` is replaced with actual Calendly URL
- [ ] Verify URL format: `https://calendly.com/your-username`
- [ ] Click the link to verify it opens Calendly

**Expected Result**: Placeholder replaced with actual Calendly scheduling URL

#### Test 3.2: Deploy Signature
- [ ] Complete deployment to Gmail or Outlook
- [ ] Check deployed signature in email client
- [ ] Verify Calendly link is clickable
- [ ] Click link and verify it opens your Calendly booking page
- [ ] Test booking a meeting through the link

**Expected Result**: Signature deployed with working Calendly link

#### Test 3.3: Test Specific Event Type Links
- [ ] Create template with: `{{calendly_event:discovery-call}}`
- [ ] Deploy to a test user
- [ ] Verify link goes to specific event type page
- [ ] Verify URL format: `https://calendly.com/your-username/discovery-call`

**Expected Result**: Specific event type URL rendered correctly

### Phase 4: Edge Cases & Error Handling

#### Test 4.1: No Calendly Connection
- [ ] Create a signature with `{{calendly_link}}`
- [ ] Deploy without connecting Calendly
- [ ] Verify placeholder is removed (empty string)
- [ ] Verify no errors in deployment

**Expected Result**: Graceful handling - placeholder removed

#### Test 4.2: Invalid Event Type Slug
- [ ] Use placeholder: `{{calendly_event:nonexistent-event}}`
- [ ] Deploy signature
- [ ] Verify placeholder is removed (empty string)
- [ ] Verify no errors

**Expected Result**: Invalid slug handled gracefully

#### Test 4.3: Expired Token Refresh
- [ ] Manually expire token in database (set `token_expires_at` to past date)
- [ ] Click "View Event Types"
- [ ] Verify token is automatically refreshed
- [ ] Verify event types load successfully
- [ ] Check database: `token_expires_at` updated to future date

**Expected Result**: Automatic token refresh works

#### Test 4.4: Disconnect Calendly
- [ ] Click "Disconnect" button
- [ ] Confirm disconnection
- [ ] Verify connection removed from database
- [ ] Verify Calendly card shows "Connect" button again
- [ ] Deploy existing signature with Calendly link
- [ ] Verify placeholder is removed (empty string)

**Expected Result**: Clean disconnection, existing signatures handle missing connection

### Phase 5: API Endpoint Testing

#### Test 5.1: Connect Endpoint
```bash
# Should redirect to Calendly OAuth
curl -L http://localhost:3000/api/integrations/calendly/connect
```
**Expected**: Redirect to Calendly authorization page

#### Test 5.2: Event Types Endpoint
```bash
# Must be authenticated
curl http://localhost:3000/api/integrations/calendly/event-types \
  -H "Cookie: your-session-cookie"
```
**Expected**: JSON response with event types array

#### Test 5.3: Refresh Metadata Endpoint
```bash
curl -X POST http://localhost:3000/api/integrations/calendly/refresh-metadata \
  -H "Cookie: your-session-cookie"
```
**Expected**: Success response with updated metadata

#### Test 5.4: Disconnect Endpoint
```bash
curl -X POST http://localhost:3000/api/integrations/calendly/disconnect \
  -H "Cookie: your-session-cookie"
```
**Expected**: Success response, connection removed

### Phase 6: Database Verification

#### Test 6.1: Check Provider Connection
```sql
SELECT 
  id,
  organization_id,
  provider,
  is_active,
  token_expires_at,
  metadata->>'scheduling_url' as scheduling_url,
  jsonb_array_length(metadata->'event_types') as event_type_count,
  created_at
FROM provider_connections
WHERE provider = 'calendly';
```
**Expected**: Connection record with populated metadata

#### Test 6.2: Verify Metadata Structure
```sql
SELECT 
  metadata->>'calendly_user_uri' as user_uri,
  metadata->>'user_name' as user_name,
  metadata->>'user_email' as user_email,
  metadata->'event_types' as event_types
FROM provider_connections
WHERE provider = 'calendly';
```
**Expected**: Complete metadata with user info and event types

### Phase 7: Multi-User Testing

#### Test 7.1: Organization-Wide Connection
- [ ] Connect Calendly as admin
- [ ] Create signature with Calendly link
- [ ] Assign to multiple users
- [ ] Deploy to all users
- [ ] Verify all users get the same Calendly link (organization's link)

**Expected Result**: All users share organization's Calendly connection

#### Test 7.2: Multiple Event Types
- [ ] Create 3 different templates with different event type slugs
- [ ] Assign to different users
- [ ] Deploy all signatures
- [ ] Verify each user gets correct event type link

**Expected Result**: Different event types work correctly per template

## Common Issues & Solutions

### Issue 1: OAuth Redirect Mismatch
**Symptom**: "redirect_uri_mismatch" error
**Solution**: 
- Verify redirect URI in Calendly app matches exactly: `http://localhost:3000/api/integrations/calendly/callback`
- Check `NEXT_PUBLIC_APP_URL` in `.env.local`

### Issue 2: Event Types Not Loading
**Symptom**: Empty event types list
**Solution**:
- Check Calendly account has active event types
- Verify token hasn't expired
- Check browser console for API errors
- Try "Refresh Event Types" button

### Issue 3: Placeholder Not Replaced
**Symptom**: `{{calendly_link}}` appears in deployed signature
**Solution**:
- Verify Calendly is connected
- Check `provider_connections` table has metadata
- Verify signature renderer is receiving Calendly context
- Check deployment logs for errors

### Issue 4: Token Expired
**Symptom**: 401 errors when fetching event types
**Solution**:
- Token should auto-refresh
- If not, disconnect and reconnect Calendly
- Check `token_expires_at` in database

## Performance Testing

### Load Test: Multiple Deployments
- [ ] Create 50+ test users
- [ ] Deploy signature with Calendly link to all users
- [ ] Monitor deployment time
- [ ] Verify all signatures render correctly
- [ ] Check for rate limiting issues

**Expected**: Deployments complete without errors, rate limiting handled gracefully

## Security Testing

### Test: Token Storage
- [ ] Verify tokens are stored in database
- [ ] Check tokens are not exposed in API responses
- [ ] Verify tokens are not logged to console
- [ ] Test token refresh doesn't leak credentials

**Expected**: Tokens stored securely, never exposed to client

### Test: OAuth State Validation
- [ ] Attempt to replay OAuth callback with old state
- [ ] Verify state expires after 5 minutes
- [ ] Test with invalid state parameter

**Expected**: Invalid/expired states rejected

## Production Readiness Checklist

Before deploying to production:

- [ ] Update Calendly app redirect URI to production URL
- [ ] Set production environment variables in Vercel/Netlify
- [ ] Run database migration on production database
- [ ] Test OAuth flow on production domain
- [ ] Verify SSL/HTTPS works correctly
- [ ] Test with real Calendly account
- [ ] Create user documentation
- [ ] Add Calendly integration to help docs
- [ ] Update marketing site with Calendly feature
- [ ] Create demo video showing Calendly integration

## Monitoring & Logging

### Metrics to Track
- OAuth connection success rate
- Token refresh success rate
- Event type fetch latency
- Signature deployment with Calendly links
- Click-through rate on Calendly links (future)

### Logs to Monitor
- OAuth errors
- Token refresh failures
- API rate limit hits
- Metadata sync failures

## Support Documentation

### User-Facing Docs Needed
1. How to connect Calendly
2. How to add Calendly links to signatures
3. How to use specific event types
4. Troubleshooting guide
5. FAQ

### Admin Docs Needed
1. Calendly app setup guide
2. Environment variable configuration
3. Database schema documentation
4. API endpoint reference

## Success Criteria

Integration is considered complete when:
- ✅ OAuth flow works end-to-end
- ✅ Event types sync correctly
- ✅ Placeholders render in signatures
- ✅ Links work in deployed signatures
- ✅ Token refresh works automatically
- ✅ Error handling is graceful
- ✅ UI is intuitive and clear
- ✅ Documentation is complete
- ✅ All tests pass

## Next Steps After Testing

1. Create marketing landing page: `/integrations/calendly`
2. Write blog post: "How to Add Calendly to Email Signatures"
3. Add to feature comparison table
4. Update pricing page if gating feature
5. Announce to existing customers
6. Create demo video
7. Add to onboarding checklist
