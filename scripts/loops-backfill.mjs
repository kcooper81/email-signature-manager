/**
 * One-time backfill: import existing Siggly users into Loops as contacts.
 *
 * Run AFTER LOOPS_API_KEY is set. Idempotent — Loops upserts by email, so
 * re-running just refreshes attributes.
 *
 * Usage (from repo root, with env set):
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... LOOPS_API_KEY=... \
 *     node scripts/loops-backfill.mjs
 *
 * Add --dry-run to print what would be sent without calling Loops.
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const LOOPS_API_KEY = process.env.LOOPS_API_KEY;
const DRY_RUN = process.argv.includes('--dry-run');

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}
if (!LOOPS_API_KEY && !DRY_RUN) {
  console.error('Missing LOOPS_API_KEY (or pass --dry-run)');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function loopsUpsert(contact) {
  if (DRY_RUN) {
    console.log('[dry-run]', JSON.stringify(contact));
    return { ok: true };
  }
  const res = await fetch('https://app.loops.so/api/v1/contacts/update', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${LOOPS_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(contact),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return { ok: false, status: res.status, text };
  }
  return { ok: true };
}

async function main() {
  // Pull users (exclude soft-deleted / stub records with no auth link if desired).
  const { data: users, error: uErr } = await supabase
    .from('users')
    .select('id, auth_id, email, first_name, last_name, role, organization_id, is_active, marketing_opt_in')
    .not('email', 'is', null);
  if (uErr) throw uErr;

  // Org names.
  const orgIds = [...new Set(users.map((u) => u.organization_id).filter(Boolean))];
  const { data: orgs } = await supabase
    .from('organizations')
    .select('id, name, organization_type')
    .in('id', orgIds.length ? orgIds : ['00000000-0000-0000-0000-000000000000']);
  const orgMap = new Map((orgs || []).map((o) => [o.id, o]));

  // Plans (by org).
  const { data: subs } = await supabase
    .from('subscriptions')
    .select('organization_id, plan')
    .in('organization_id', orgIds.length ? orgIds : ['00000000-0000-0000-0000-000000000000']);
  const planMap = new Map((subs || []).map((s) => [s.organization_id, s.plan]));

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const u of users) {
    // Respect opt-out if the column exists.
    if (u.marketing_opt_in === false) {
      skipped++;
      continue;
    }
    const org = orgMap.get(u.organization_id);
    const contact = {
      email: u.email,
      firstName: u.first_name || undefined,
      lastName: u.last_name || undefined,
      userId: u.auth_id || undefined,
      source: 'backfill',
      subscribed: true,
      userGroup: u.role || undefined,
      plan: planMap.get(u.organization_id) || 'free',
      orgId: u.organization_id || undefined,
      orgName: org?.name || undefined,
      isPartner: org?.organization_type === 'msp',
      isActive: u.is_active !== false,
    };
    const result = await loopsUpsert(contact);
    if (result.ok) {
      ok++;
    } else {
      failed++;
      console.error(`FAIL ${u.email}: ${result.status} ${result.text || ''}`);
    }
  }

  console.log(`\nDone. upserted=${ok} skipped(opted-out)=${skipped} failed=${failed} total=${users.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
