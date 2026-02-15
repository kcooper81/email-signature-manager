# Stripe Payment Setup Guide

## Issue Fixed
The webhook previously looked for a base fee + per-user fee for professional plans. With the pricing simplification, Professional now uses a single per-user price ID (`STRIPE_PROFESSIONAL_PRICE_ID`). The Starter plan has been removed entirely.

**Current:** Professional plan uses a single per-user price at $1.50/user/month with a 10-user minimum.

---

## Required Environment Variables

Make sure your `.env.local` file has these variables set:

```bash
# Supabase (CRITICAL for webhooks)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # ⚠️ REQUIRED for webhooks

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # ⚠️ Get this from Stripe webhook settings
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Price IDs (create these in Stripe Dashboard)
STRIPE_PROFESSIONAL_PRICE_ID=price_...  # $1.50/user/month per-seat price

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000  # or your production URL
```

---

## Stripe Setup Steps

### 1. Create Products and Prices in Stripe

**Professional Plan (single per-user price):**
- Product: "Professional Plan"
  - Price: $1.50/user/month (recurring, per-seat)
  - Copy the Price ID → `STRIPE_PROFESSIONAL_PRICE_ID`

> **Note:** Professional plan has a 10-user minimum ($15/month). The code enforces `max(10, totalUsers)` as the seat quantity. There is no base fee -- pricing is purely per-user.

**No Starter Plan:** The Starter plan has been removed. Users go directly from Free to Professional.

### 2. Configure Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. **Endpoint URL:** `https://your-domain.com/api/billing/webhook`
   - For local testing: Use Stripe CLI or ngrok
4. **Events to listen for:**
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
   - `invoice.paid`
5. Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`

### 3. Get Supabase Service Role Key

1. Go to Supabase Dashboard → Settings → API
2. Copy the **service_role** key (NOT the anon key)
3. Set as `SUPABASE_SERVICE_ROLE_KEY`

**Why it's needed:** The webhook needs elevated permissions to update subscription records in your database.

---

## Testing with Stripe Test Cards

### Test Card Numbers

**Successful Payment:**
```
Card: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**Payment Requires Authentication (3D Secure):**
```
Card: 4000 0025 0000 3155
```

**Payment Declined:**
```
Card: 4000 0000 0000 0002
```

### Testing Locally

**Option 1: Stripe CLI (Recommended)**
```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/billing/webhook

# Copy the webhook signing secret from the output
# Set it as STRIPE_WEBHOOK_SECRET in .env.local
```

**Option 2: ngrok**
```bash
# Install ngrok
# https://ngrok.com/download

# Start your dev server
npm run dev

# In another terminal, expose it
ngrok http 3000

# Use the ngrok URL in Stripe webhook settings
# https://your-ngrok-url.ngrok.io/api/billing/webhook
```

---

## Troubleshooting

### Features Not Unlocking After Payment

**Check these in order:**

1. **Verify webhook is receiving events:**
   - Go to Stripe Dashboard → Developers → Webhooks
   - Click on your webhook endpoint
   - Check "Recent events" - you should see events with 200 status

2. **Check webhook secret:**
   - Make sure `STRIPE_WEBHOOK_SECRET` matches the signing secret in Stripe

3. **Verify service role key:**
   - Make sure `SUPABASE_SERVICE_ROLE_KEY` is set correctly
   - Check server logs for "Failed to update subscription" errors

4. **Check database:**
   ```sql
   -- In Supabase SQL Editor
   SELECT * FROM subscriptions WHERE organization_id = 'your-org-id';
   ```
   - Verify `plan` column updated to 'professional'
   - Verify `status` is 'active' or 'trialing'

5. **Refresh the page:**
   - The subscription state is loaded on page load
   - After successful payment, refresh the billing page

6. **Check browser console:**
   - Look for any errors in the Network tab
   - Verify `/api/billing/checkout` returns a valid session URL

### Common Errors

**"Invalid signature" in webhook logs:**
- Wrong `STRIPE_WEBHOOK_SECRET`
- Using production secret with test events (or vice versa)

**"Failed to update subscription" in webhook logs:**
- Missing or incorrect `SUPABASE_SERVICE_ROLE_KEY`
- Database permissions issue

**Plan stays as "free" after payment:**
- Price IDs don't match environment variables
- Webhook not receiving events
- Check the fix in this guide was applied

---

## Development Mode

To bypass pay gates during development:

```bash
# In .env.local
NEXT_PUBLIC_BYPASS_PAY_GATES=true
```

This allows you to test all features without payment. **Remove this in production!**

---

## Webhook Event Flow

```
User clicks "Upgrade" 
  → Creates Stripe Checkout Session
  → User completes payment
  → Stripe sends webhook: checkout.session.completed
  → Webhook retrieves subscription details
  → Webhook updates database: plan = 'professional', status = 'active'
  → User refreshes page
  → Features unlock ✅
```

---

## Next Steps After Setup

1. Test with Stripe test card (4242 4242 4242 4242)
2. Complete checkout flow
3. Verify webhook receives event in Stripe Dashboard
4. Check database to confirm subscription updated
5. Refresh billing page to see unlocked features
6. Test creating templates, adding team members, etc.

---

## Production Checklist

- [ ] Replace test Stripe keys with live keys
- [ ] Update webhook endpoint to production URL
- [ ] Remove `NEXT_PUBLIC_BYPASS_PAY_GATES` or set to `false`
- [ ] Test live payment with real card
- [ ] Monitor webhook events in Stripe Dashboard
- [ ] Set up error monitoring (Sentry, etc.)
