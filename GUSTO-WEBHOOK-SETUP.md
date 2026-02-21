# Gusto Webhook Setup Guide

Quick guide to set up real-time employee sync with Gusto webhooks.

---

## What You Need

1. Gusto developer account with your app created
2. Access to Gusto developer portal
3. Your Siggly production URL: `https://siggly.io`

---

## Step-by-Step Setup

### 1. Run Database Migration

First, add the `webhook_secret` column to your database:

```bash
# Connect to your Supabase database and run:
ALTER TABLE sync_configurations ADD COLUMN IF NOT EXISTS webhook_secret TEXT;
```

Or use the migration file at:
`apps/web/drizzle/0000_add_webhook_secret_to_sync_configurations.sql`

### 2. Add Webhook Subscription in Gusto

1. **Go to Gusto Developer Portal**: https://dev.gusto.com
2. **Select your "Siggly" application**
3. **Click "Webhook subscriptions" tab**
4. **Click "Add webhook subscription"**

### 3. Configure Webhook

**URL:**
```
https://siggly.io/api/webhooks/gusto
```

**Subscription Types (check these):**
- ✅ **Employee** (required - for employee.created, employee.updated, employee.terminated)
- ✅ **EmployeeJobCompensation** (optional - for title/department changes)
- ✅ **EmployeeBenefit** (optional - for benefits tracking)

**Click "Create"**

### 4. Copy Webhook Secret

After creating the webhook subscription, Gusto will show you a **webhook signing secret**.

**Copy this secret** - you'll need it in the next step.

Example: `whsec_abc123xyz...`

### 5. Add Webhook Secret to Siggly

1. **Go to Siggly**: Settings → HR & Directory Sync
2. **Find your Gusto integration** (or create one if you haven't)
3. **Click "Configure"**
4. **Scroll down to "Webhook Secret (Optional)"**
5. **Paste the webhook signing secret** from Gusto
6. **Click "Update"**

---

## Testing the Webhook

### Test in Gusto Sandbox:

1. **Add a new employee** in your Gusto sandbox company
   - Go to your demo company
   - Add employee with name, email, title, department

2. **Check Siggly**
   - Go to Team page
   - Employee should appear **immediately** (within seconds)

3. **Update an employee**
   - Change their job title in Gusto
   - Check Siggly - title should update instantly

4. **Terminate an employee**
   - Mark employee as terminated in Gusto
   - Check Siggly - employee should be marked inactive

### Check Webhook Logs:

In Gusto developer portal:
- Go to Webhook subscriptions
- Click on your webhook
- View delivery logs to see if webhooks are being sent successfully

---

## How It Works

### Real-time Sync Flow:

1. **Employee changes in Gusto** (created/updated/terminated)
2. **Gusto sends webhook** to `https://siggly.io/api/webhooks/gusto`
3. **Siggly verifies signature** using your webhook secret
4. **Siggly updates employee** in database automatically
5. **User sees changes** immediately in Siggly

### Security:

- Webhook signature verification ensures requests are from Gusto
- Only active Gusto configurations receive updates
- Scoped to organization_id for multi-tenant security

---

## Webhook Events Handled

### `employee.created`
- Creates new user in Siggly
- Syncs: name, email, title, department, phone, hire date

### `employee.updated`
- Updates existing user in Siggly
- Syncs: name, email, title, department, phone
- Marks as active/inactive based on termination status

### `employee.terminated`
- Marks user as inactive in Siggly
- Preserves user data for historical records

---

## Troubleshooting

### Webhook Not Receiving Events

**Check:**
1. Webhook URL is correct: `https://siggly.io/api/webhooks/gusto`
2. Webhook subscription is active in Gusto
3. Company ID in Siggly matches Gusto company
4. Check Gusto webhook delivery logs for errors

### Signature Verification Failing

**Check:**
1. Webhook secret is correctly pasted in Siggly
2. No extra spaces or characters in the secret
3. Secret matches what Gusto shows in developer portal

### Employee Not Syncing

**Check:**
1. Employee has valid email address
2. Gusto configuration is active in Siggly
3. Company ID in "Company ID" field matches webhook company_id
4. Check server logs for errors

---

## Configuration Fields

### In Siggly HR Sync Settings:

**Provider:** Gusto

**API Key:** OAuth access token (for manual sync fallback)

**Company ID:** 
- Sandbox: `demo/1234567890`
- Production: `1234567890`

**Webhook Secret:** Signing secret from Gusto developer portal

**Schedule:** 
- Set to "Manual" if using webhooks only
- Or keep "Daily" as backup sync

---

## Benefits of Webhooks vs Polling

### Webhooks (Real-time):
- ✅ Instant updates (< 1 second)
- ✅ No API rate limits
- ✅ Lower server load
- ✅ No token expiration issues
- ✅ More reliable

### Polling (Scheduled):
- ❌ Delayed (hourly/daily)
- ❌ Uses API quota
- ❌ Token expires every 2 hours
- ❌ Can miss rapid changes

---

## Next Steps

1. ✅ Run database migration
2. ✅ Add webhook subscription in Gusto
3. ✅ Copy webhook secret
4. ✅ Add secret to Siggly configuration
5. ✅ Test with sandbox employee
6. ✅ Monitor webhook delivery logs

---

## Support

For issues:
- Check Gusto webhook delivery logs
- Check Siggly server logs
- Verify webhook secret is correct
- Ensure company ID matches

Webhook endpoint code: `apps/web/src/app/api/webhooks/gusto/route.ts`
