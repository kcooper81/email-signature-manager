# Siggly Email System — Audit & Build Plan

_Last updated: 2026-10-18_

This is the plan behind branch `feat/email-lifecycle`. It documents the audit
findings, the chosen architecture, what's already built, and what remains.

---

## 1. The four lanes

Each email job gets the right tool. We do **not** make one tool do everything.

| Lane | Job | Tool | Status |
|---|---|---|---|
| **Auth** | Signup verification, password reset | Supabase Auth → **Resend SMTP** | ✅ Already configured (SMTP points at `smtp.resend.com`, from `noreply@siggly.io`) |
| **Transactional** | Invites, ticket replies, partner approval/rejection, contact form | **Resend** (SDK) | ✅ Live |
| **Billing** | Receipts, dunning, trial/renewal reminders, expiring cards | **Stripe native emails** | ✅ Toggled on in Stripe (no app code) |
| **Lifecycle + broadcast** | Welcome, onboarding, trial nudges (no-card), re-engagement, announcements, "email everyone" | **Loops** | 🔨 This branch wires the plumbing |
| **1:1 / support** | Human replies, inbound threads | Custom inbox + Gmail | ✅ Keep as-is |

**Why Loops (not Klaviyo / Mailchimp / Gmail):** Loops segments on *who the user
is and what they do in-product* (role, plan, active, partner) and does manual
campaigns **and** automated drips. Klaviyo is e-commerce (order/cart data we
don't have). Mailchimp is flat lists, weak product automation. Gmail has hard
send limits and blasting from `siggly.io` would poison the domain reputation our
auth + transactional mail depends on.

**Deliverability guardrail:** marketing/lifecycle sends from a **separate
subdomain** (`updates.siggly.io`) so a bad broadcast can never damage the
reputation behind invites/resets. (Configured in Loops; see §5.)

---

## 2. Audit findings (what prompted this)

- 🔴 **Lifecycle automation was a silent no-op.** The workflow engine existed but
  its `sendEmail` action only wrote to the audit log. → **Fixed** (now fires Loops events).
- 🔴 **Dead preferences.** Users can toggle "Weekly Digest" and "Deployment
  Alerts" but nothing sent them. → Wired via Loops events (digest cron still TODO).
- 🔴 **No welcome / onboarding.** Signup gave only Supabase's verification link.
  → `signed_up` event now fires to Loops (sequence authored in Loops dashboard).
- 🟠 **Customers got no billing email** (only internal admins were notified). →
  Resolved by enabling **Stripe native** receipts + dunning (no app code).
- 🟢 Stripe recovery links pointed to `teamprompt.app` (shared Stripe account).
  Switch to a Stripe-hosted page or siggly.io links. _(Owner task in Stripe.)_

---

## 3. What this branch builds

| File | What |
|---|---|
| `apps/web/src/lib/email/loops.ts` | Loops client — `upsertLoopsContact`, `trackLoopsEvent`, `sendLoopsTransactional`, `unsubscribeLoopsContact`. Env-gated + best-effort (no-op without `LOOPS_API_KEY`; never throws into callers). |
| `apps/web/supabase/migrations/add_marketing_opt_in.sql` | Adds `users.marketing_opt_in` (default true) + `users.unsubscribed_at` + index. **Not yet applied** (see §4). |
| `apps/web/src/lib/auth/create-user-org.ts` | On signup: upsert contact + fire `signed_up` event. |
| `apps/web/src/app/api/billing/webhook/route.ts` | On plan change (checkout / updated / canceled): upsert contact plan + fire `plan_changed` event. |
| `apps/web/src/lib/lifecycle/actions/send-email.ts` | The dead stub now fires `lifecycle_<eventType>` to the affected contact (keeps the audit log). |
| `scripts/loops-backfill.mjs` | One-time import of existing users into Loops (idempotent; `--dry-run` supported). |

**Loops contact attributes synced:** `email`, `firstName`, `lastName`,
`userId` (auth id), `userGroup` (role), `plan`, `orgId`, `orgName`, `isPartner`,
`isActive`, `subscribed`. Custom props auto-create in Loops on first write.

**Events emitted:** `signed_up`, `plan_changed`, `lifecycle_<eventType>` (from
workflow actions). Each maps to an automation ("Loop") built in the dashboard.

---

## 4. Go-live checklist (in order)

1. **Provision Loops** via `/marketplace`; put `LOOPS_API_KEY` in Vercel env
   (all environments). _Nothing in this branch activates until this is set._
2. **Apply the migration** `add_marketing_opt_in.sql` (via Supabase MCP next
   session, or the normal migration flow).
3. **Verify the sending domain** `updates.siggly.io` in Loops (DNS records).
4. **Backfill contacts:** `node scripts/loops-backfill.mjs --dry-run` first, then
   for real.
5. **Author the automations in Loops:** welcome/onboarding on `signed_up`;
   trial/activation nudge for no-card free users; win-back on `plan_changed`→free.
6. **Test with a real address** (`jameskadecooper@gmail.com`): sign up a throwaway
   org → confirm the contact + `signed_up` event land in Loops.
7. **Rotate the Resend key** that was exposed in chat, and update it in Supabase
   SMTP + Vercel `RESEND_API_KEY` if it's the same key.

---

## 5. Phase 2 (after go-live)

- **Unsubscribe sync back:** Loops webhook → set `users.marketing_opt_in=false`
  + `unsubscribed_at`, so segment queries and backfill respect opt-outs both ways.
- **Deployment-alert event:** emit `signature_deployed` from the deploy path so
  the (currently dead) "Deployment Alerts" pref drives a Loops email.
- **Weekly digest:** a Vercel cron that fires a `weekly_digest` event (or batches
  per-org stats) for users with `weeklyDigest=true`.
- **In-app broadcast composer (optional):** a segment-picker + send screen in
  `/admin` on the Loops API — only if composing in the Loops dashboard proves
  too limiting. Default is to compose in Loops.
- **Seat/usage warnings**, **invite reminders**, **NPS** — as events once the
  core loop is proven.

---

## 6. Guardrails

- Loops = marketing/lifecycle **only**. Never move invites/resets/receipts onto
  it — those need instant, reliable delivery (Resend / Stripe / Supabase SMTP).
- Every Loops call is env-gated and best-effort; a Loops outage must never break
  signup, billing, or deploys.
- Respect `marketing_opt_in` everywhere we send marketing. Transactional is exempt.
- Resend free tier = 100/day, 3k/mo (shared across transactional + auth). Loops
  has its own quota — a reason broadcasts live there, not on Resend.
