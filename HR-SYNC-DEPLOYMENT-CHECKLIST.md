# HR Sync OAuth Integration - Production Deployment Checklist

## Pre-Deployment Steps

### 1. Database Migrations ✅
Run both migration files in order:

```sql
-- Migration 1: Add webhook_secret column
\i apps/web/drizzle/0000_add_webhook_secret_to_sync_configurations.sql

-- Migration 2: Add OAuth fields
\i apps/web/drizzle/0001_add_oauth_fields_to_sync_configurations.sql
```

**Verify migrations:**
```sql
-- Check that all columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'sync_configurations' 
  AND column_name IN (
    'webhook_secret',
    'oauth_access_token',
    'oauth_refresh_token',
    'oauth_token_expires_at',
    'oauth_company_id',
    'oauth_subdomain'
  );
```

### 2. Environment Variables ✅

**Required for OAuth to work:**

```bash
# CRITICAL: OAuth encryption key (64-character hex string)
# Generate with: openssl rand -hex 32
OAUTH_ENCRYPTION_KEY=your_64_char_hex_string_here

# App URL (must match OAuth redirect URIs)
NEXT_PUBLIC_APP_URL=https://siggly.io

# Gusto OAuth credentials
GUSTO_CLIENT_ID=your_gusto_client_id
GUSTO_CLIENT_SECRET=your_gusto_client_secret

# BambooHR OAuth credentials
BAMBOOHR_CLIENT_ID=your_bamboohr_client_id
BAMBOOHR_CLIENT_SECRET=your_bamboohr_client_secret
```

**Verify in production:**
- [ ] All environment variables set in Vercel/hosting platform
- [ ] OAUTH_ENCRYPTION_KEY is exactly 64 characters
- [ ] NEXT_PUBLIC_APP_URL matches production domain
- [ ] No trailing slashes in URLs

### 3. Provider App Registration ✅

#### Gusto
1. **Create app:** https://dev.gusto.com
2. **Add redirect URI:** `https://siggly.io/api/oauth/gusto/callback`
3. **Copy credentials** to environment variables
4. **Test with demo company** before production

#### BambooHR
1. **Apply to marketplace:** https://www.bamboohr.com/partner-programs/marketplace-program
2. **Create app** in developer portal (after approval)
3. **Add redirect URI:** `https://siggly.io/api/oauth/bamboohr/callback`
4. **Copy credentials** to environment variables

**Verification:**
- [ ] Apps created in both provider portals
- [ ] Redirect URIs match exactly (including https://)
- [ ] Client IDs and secrets copied correctly
- [ ] Test OAuth flow works in sandbox/demo

---

## Deployment Steps

### 1. Code Deployment ✅
Deploy to production with all new files:

**New files:**
- `apps/web/src/lib/oauth/encryption.ts`
- `apps/web/src/lib/oauth/gusto.ts`
- `apps/web/src/lib/oauth/bamboohr.ts`
- `apps/web/src/lib/oauth/token-refresh.ts`
- `apps/web/src/app/api/oauth/initiate/route.ts`
- `apps/web/src/app/api/oauth/gusto/callback/route.ts`
- `apps/web/src/app/api/oauth/bamboohr/callback/route.ts`
- `apps/web/src/components/hr-sync/integration-wizard.tsx`

**Modified files:**
- `apps/web/src/lib/db/schema.ts`
- `apps/web/src/lib/hr-sync/index.ts`
- `apps/web/src/lib/api/field-allowlists.ts`
- `apps/web/src/app/(dashboard)/settings/hr-sync/page.tsx`
- `apps/web/src/app/api/webhooks/gusto/route.ts`
- `apps/web/src/app/api/hr-sync/configurations/route.ts`
- `apps/web/.env.example`

**Verify deployment:**
- [ ] All files deployed successfully
- [ ] No build errors
- [ ] Environment variables loaded

### 2. Test OAuth Flows ✅

#### Test Gusto Integration
1. Go to `/settings/hr-sync`
2. Click "Add Integration"
3. Select Gusto
4. Toggle "Use Sandbox" ON
5. Click "Connect to Gusto"
6. Authorize in Gusto demo
7. Verify redirect back with success message
8. Check database for encrypted tokens
9. Trigger manual sync
10. Verify employees synced

#### Test BambooHR Integration
1. Go to `/settings/hr-sync`
2. Click "Add Integration"
3. Select BambooHR
4. Enter test subdomain
5. Click "Connect to BambooHR"
6. Authorize in BambooHR
7. Verify redirect back with success message
8. Check database for encrypted tokens
9. Trigger manual sync
10. Verify employees synced

**Verification checklist:**
- [ ] OAuth redirect works correctly
- [ ] Tokens stored encrypted in database
- [ ] Company ID/subdomain extracted automatically
- [ ] Webhook created automatically (Gusto)
- [ ] Manual sync works with OAuth tokens
- [ ] Token refresh works when expired
- [ ] Success/error messages display correctly

### 3. Test Webhook Delivery (Gusto) ✅

1. **Verify webhook created:**
   - Check Gusto developer portal
   - Should show webhook subscription
   - Status should be "Active" (green)

2. **Test webhook events:**
   - Create test employee in Gusto demo
   - Check `/api/webhooks/gusto` endpoint logs
   - Verify signature validation works
   - Verify employee created in Siggly

3. **Test webhook security:**
   - Send request without signature → Should reject
   - Send request with invalid signature → Should reject
   - Send request with valid signature → Should accept

**Verification:**
- [ ] Webhook subscription shows "Active"
- [ ] Webhook events received and processed
- [ ] Signature validation working
- [ ] Employees sync in real-time

---

## Post-Deployment Verification

### Security Checks ✅

1. **Token Encryption:**
```sql
-- Verify tokens are encrypted (should NOT be readable)
SELECT 
  id, 
  provider,
  LEFT(oauth_access_token, 20) as token_preview,
  oauth_token_expires_at
FROM sync_configurations
WHERE oauth_access_token IS NOT NULL;
```
- [ ] Tokens are encrypted (look like gibberish)
- [ ] Tokens are NOT plain text OAuth tokens

2. **API Route Security:**
- [ ] `/api/oauth/initiate` requires authentication
- [ ] `/api/oauth/*/callback` validates state parameter
- [ ] All routes scoped to organization_id
- [ ] Webhook signature validation enabled

3. **Error Handling:**
- [ ] Failed OAuth shows user-friendly error
- [ ] Token refresh failures logged
- [ ] Webhook failures logged but don't crash
- [ ] Database errors handled gracefully

### Performance Checks ✅

1. **Token Refresh:**
- [ ] Tokens refresh automatically before expiry
- [ ] No unnecessary refresh calls
- [ ] Failed refresh shows clear error

2. **Sync Performance:**
- [ ] OAuth sync as fast as legacy API key
- [ ] No timeout issues
- [ ] Large employee lists handled

### User Experience Checks ✅

1. **Integration Setup:**
- [ ] Wizard UI loads correctly
- [ ] Provider selection clear
- [ ] Instructions easy to follow
- [ ] OAuth flow smooth (no errors)
- [ ] Success message shows after connection

2. **Error Messages:**
- [ ] Missing subdomain → Clear error
- [ ] OAuth failure → Helpful message
- [ ] Token expired → Prompts reconnection
- [ ] Webhook failure → Admin notified

---

## Rollback Plan

If issues occur, rollback steps:

### 1. Disable OAuth (Keep Legacy Working)
```sql
-- Disable OAuth integrations temporarily
UPDATE sync_configurations 
SET is_active = false 
WHERE oauth_access_token IS NOT NULL;
```

### 2. Revert Code
```bash
git revert <commit-hash>
git push origin main
```

### 3. Remove Environment Variables
Remove OAuth-related env vars to disable OAuth routes.

### 4. Notify Users
If OAuth integrations were active:
- Email affected users
- Provide manual API key setup instructions
- Offer support for reconnection

---

## Monitoring & Alerts

### What to Monitor

1. **OAuth Success Rate:**
   - Track successful OAuth completions
   - Alert if success rate < 90%

2. **Token Refresh Failures:**
   - Log all refresh failures
   - Alert if > 5 failures per hour

3. **Webhook Delivery:**
   - Monitor webhook success rate
   - Alert if Gusto webhooks fail

4. **Sync Errors:**
   - Track sync failures
   - Alert if error rate increases

### Logging

**Key events to log:**
- OAuth initiation
- OAuth callback success/failure
- Token refresh attempts
- Webhook deliveries
- Sync completions/failures

**Log format:**
```
[HR-SYNC-OAUTH] {event} | org:{org_id} | provider:{provider} | status:{success/fail} | error:{error_msg}
```

---

## Support Documentation

### For Users

**"How to connect Gusto":**
1. Go to Settings → HR & Directory Sync
2. Click "Add Integration"
3. Select "Gusto"
4. Click "Connect to Gusto"
5. Sign in and authorize
6. Done! Your employees will sync automatically.

**"How to connect BambooHR":**
1. Go to Settings → HR & Directory Sync
2. Click "Add Integration"
3. Select "BambooHR"
4. Enter your subdomain (from yourcompany.bamboohr.com)
5. Click "Connect to BambooHR"
6. Sign in and authorize
7. Done! Your employees will sync automatically.

### For Support Team

**Common issues:**

1. **"OAuth redirect failed"**
   - Check redirect URI matches exactly
   - Verify NEXT_PUBLIC_APP_URL is correct
   - Check provider app is active

2. **"Token expired"**
   - Normal - should auto-refresh
   - If refresh fails, ask user to reconnect
   - Check refresh token is valid

3. **"Webhook not receiving events"**
   - Verify webhook subscription active
   - Check webhook secret matches
   - Test with manual event in provider portal

---

## Success Criteria

Integration is successful when:

- ✅ Users can connect in < 2 minutes
- ✅ No manual token copying required
- ✅ Tokens refresh automatically
- ✅ Webhooks deliver in real-time (Gusto)
- ✅ Error rate < 5%
- ✅ No security vulnerabilities
- ✅ Support tickets < 1 per week

---

## Next Steps After Deployment

### Week 1
- [ ] Monitor error rates daily
- [ ] Collect user feedback
- [ ] Fix any critical bugs
- [ ] Document common issues

### Week 2-4
- [ ] Add Rippling OAuth support
- [ ] Implement token refresh background job
- [ ] Add sync preview feature
- [ ] Improve error messages

### Month 2+
- [ ] Add multi-company support
- [ ] Implement advanced field mapping
- [ ] Add sync history/logs
- [ ] Build webhook retry logic

---

## Contacts

**For Issues:**
- Gusto API Support: [email protected]
- BambooHR Support: [email protected]

**Internal:**
- DevOps: [Your team contact]
- Security: [Your security team]
