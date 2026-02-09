# Resend Email Setup Guide

## Overview

Siggly uses [Resend](https://resend.com) for transactional emails including:
- Team member invitation emails (self-manage invites)
- Contact form notifications
- Support ticket responses

## ⚠️ Critical: Domain Verification Required for Production

**The default `onboarding@resend.dev` sender can ONLY send emails to the Resend account owner's email address.** This is a Resend limitation for unverified domains.

To send emails to any recipient in production, you **MUST** verify your domain in Resend.

---

## Setup Steps

### 1. Create Resend Account
1. Go to [resend.com](https://resend.com) and create an account
2. Get your API key from the dashboard

### 2. Verify Your Domain (REQUIRED for production)
1. In Resend dashboard, go to **Domains** → **Add Domain**
2. Add `siggly.io` (or your domain)
3. Add the DNS records Resend provides:
   - **MX record** for receiving bounces
   - **TXT record** for SPF
   - **CNAME records** for DKIM
4. Wait for verification (usually 5-30 minutes)

### 3. Configure Environment Variables

```bash
# Resend API Key (get from Resend dashboard)
RESEND_API_KEY=re_xxxxxxxxxxxx

# From email address (MUST use verified domain for production)
# Development (only sends to account owner):
RESEND_FROM_EMAIL=Siggly <onboarding@resend.dev>

# Production (after domain verification):
RESEND_FROM_EMAIL=Siggly <noreply@siggly.io>
```

### 4. Update Vercel Environment Variables
1. Go to Vercel project settings → Environment Variables
2. Add/update `RESEND_API_KEY` for Production
3. Add/update `RESEND_FROM_EMAIL` to use your verified domain

---

## Troubleshooting

### Emails Not Being Sent

**Check the Vercel logs** for these messages:
```
Processing X users for invite
RESEND_API_KEY configured: true/false
RESEND_FROM_EMAIL: <value>
Attempting to send invite email to <email>...
```

**Common issues:**

| Issue | Solution |
|-------|----------|
| `RESEND_API_KEY configured: false` | Add `RESEND_API_KEY` to Vercel env vars |
| `Failed to send email: validation_error` | Verify your domain in Resend |
| Emails only work for one address | You're using `onboarding@resend.dev` - verify your domain |
| `RESEND_FROM_EMAIL: not set` | Add `RESEND_FROM_EMAIL` to env vars |

### Testing Email Sending

1. In development, emails will only work if sent to the Resend account owner's email
2. For testing with other emails, you must verify a domain first
3. Check Resend dashboard → Emails to see sent/failed emails

---

## Email Templates

All email templates are in `apps/web/src/lib/email/resend.ts`:

| Function | Purpose |
|----------|---------|
| `sendTeamInviteEmail` | Self-manage invitation for team members |
| `sendContactFormEmail` | Contact form submissions to sales |
| `sendTicketResponseEmail` | Admin responses to support tickets |

---

## DNS Records Example

After adding your domain in Resend, add these records to your DNS:

```
Type    Name                    Value
----    ----                    -----
MX      siggly.io               feedback-smtp.us-east-1.amazonses.com (priority 10)
TXT     siggly.io               v=spf1 include:amazonses.com ~all
CNAME   resend._domainkey       <provided by Resend>
CNAME   <key2>._domainkey       <provided by Resend>
```

---

## Vercel Environment Variables Checklist

| Variable | Development | Production |
|----------|-------------|------------|
| `RESEND_API_KEY` | `re_test_...` | `re_live_...` |
| `RESEND_FROM_EMAIL` | `Siggly <onboarding@resend.dev>` | `Siggly <noreply@siggly.io>` |

---

## Related Files

- `apps/web/src/lib/email/resend.ts` - Email sending functions
- `apps/web/src/app/api/team/invite/route.ts` - Team invite API
- `apps/web/.env.example` - Environment variable template
