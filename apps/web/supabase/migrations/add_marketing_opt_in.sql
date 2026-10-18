-- Marketing / lifecycle email opt-out state.
--
-- Transactional email (invites, resets, receipts) is always sent regardless of
-- these columns. These govern ONLY marketing/lifecycle sends (Loops): welcome,
-- onboarding, announcements, broadcasts, re-engagement.
--
-- marketing_opt_in  : false once the user unsubscribes from marketing email.
--                     Defaults true (opted in at account creation).
-- unsubscribed_at    : timestamp of the opt-out, synced from Loops' managed
--                     unsubscribe so we never email an opt-out.

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS marketing_opt_in boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS unsubscribed_at timestamptz;

-- Partial index so segment queries that exclude unsubscribers stay fast.
CREATE INDEX IF NOT EXISTS idx_users_marketing_opt_in
  ON users (marketing_opt_in)
  WHERE marketing_opt_in = true;
