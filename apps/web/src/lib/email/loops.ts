/**
 * Loops (loops.so) client — lifecycle + broadcast email.
 *
 * This is the integration point for MARKETING / LIFECYCLE email only:
 * welcome, onboarding, trial nudges, re-engagement, product announcements,
 * and the "email everyone" broadcasts. Transactional email (invites, resets,
 * ticket replies, partner approval) stays on Resend; Stripe owns billing email.
 *
 * Everything here is BEST-EFFORT and ENV-GATED: if LOOPS_API_KEY is not set,
 * every call is a no-op that returns `{ skipped: true }`. No call ever throws
 * into its caller, so wiring these into signup / billing / deploy flows can
 * never break those flows.
 *
 * API reference: https://loops.so/docs/api-reference
 */

const LOOPS_BASE = 'https://app.loops.so/api/v1';

export function loopsEnabled(): boolean {
  return !!process.env.LOOPS_API_KEY;
}

type LoopsResult =
  | { skipped: true }
  | { ok: true; data: any }
  | { ok: false; status?: number; error?: unknown };

async function loopsFetch(
  path: string,
  body: Record<string, unknown>,
  method: 'POST' | 'PUT' = 'POST'
): Promise<LoopsResult> {
  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) return { skipped: true };

  try {
    const res = await fetch(`${LOOPS_BASE}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error(`[loops] ${method} ${path} -> ${res.status}: ${text}`);
      return { ok: false, status: res.status };
    }

    const data = await res.json().catch(() => ({}));
    return { ok: true, data };
  } catch (error) {
    console.error(`[loops] ${method} ${path} request failed:`, error);
    return { ok: false, error };
  }
}

/**
 * Attributes we sync onto every Loops contact. Custom properties (plan, orgId,
 * orgName, isPartner, isActive) are auto-created in Loops on first write.
 * `userGroup` is Loops' built-in segmentation field — we map the Siggly role
 * (owner / admin / member) onto it.
 */
export interface LoopsContact {
  email: string;
  firstName?: string;
  lastName?: string;
  /** Supabase auth id — stable cross-reference. */
  userId?: string;
  /** Where the contact came from (e.g. "siggly-signup", "backfill"). */
  source?: string;
  /** Marketing subscription state. false = unsubscribed. */
  subscribed?: boolean;
  /** Siggly role mapped onto Loops' built-in userGroup. */
  userGroup?: string;
  // --- custom properties ---
  plan?: string;
  orgId?: string;
  orgName?: string;
  isPartner?: boolean;
  isActive?: boolean;
}

/**
 * Create or update a contact. Loops' update endpoint upserts by email (or
 * userId), so this is safe to call on both signup and later changes.
 */
export async function upsertLoopsContact(contact: LoopsContact): Promise<LoopsResult> {
  if (!loopsEnabled()) return { skipped: true };
  // Strip undefined so we never clobber existing fields with null.
  const payload = Object.fromEntries(
    Object.entries(contact).filter(([, v]) => v !== undefined)
  );
  return loopsFetch('/contacts/update', payload, 'PUT');
}

/**
 * Fire a lifecycle event. Events trigger automations ("Loops") configured in
 * the Loops dashboard — e.g. `signed_up` -> welcome/onboarding sequence.
 * `contactProperties` are merged onto the contact at send time.
 */
export async function trackLoopsEvent(opts: {
  email: string;
  userId?: string;
  eventName: string;
  eventProperties?: Record<string, unknown>;
  contactProperties?: Record<string, unknown>;
}): Promise<LoopsResult> {
  if (!loopsEnabled()) return { skipped: true };
  const { email, userId, eventName, eventProperties, contactProperties } = opts;
  return loopsFetch('/events/send', {
    email,
    ...(userId ? { userId } : {}),
    eventName,
    ...(eventProperties ? { eventProperties } : {}),
    ...(contactProperties ? { contactProperties } : {}),
  });
}

/**
 * Send a transactional email defined in Loops (by transactionalId). We mostly
 * keep transactional on Resend; this exists for cases where a Loops-authored
 * template is the better fit.
 */
export async function sendLoopsTransactional(opts: {
  transactionalId: string;
  email: string;
  dataVariables?: Record<string, unknown>;
}): Promise<LoopsResult> {
  if (!loopsEnabled()) return { skipped: true };
  const { transactionalId, email, dataVariables } = opts;
  return loopsFetch('/transactional', {
    transactionalId,
    email,
    ...(dataVariables ? { dataVariables } : {}),
  });
}

/** Mark a contact as unsubscribed from marketing (honors opt-out). */
export async function unsubscribeLoopsContact(email: string): Promise<LoopsResult> {
  if (!loopsEnabled()) return { skipped: true };
  return loopsFetch('/contacts/update', { email, subscribed: false }, 'PUT');
}
