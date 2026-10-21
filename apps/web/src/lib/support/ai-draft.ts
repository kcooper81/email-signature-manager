import Anthropic from '@anthropic-ai/sdk';

/**
 * AI support assistant — drafts replies and summarizes ticket threads.
 * Reuses the same ANTHROPIC_API_KEY / model family as the SEO enhancer.
 * Env-gated: callers should check isSupportAiConfigured() first.
 */

const MODEL = 'claude-haiku-4-5-20251001';

function getClient(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  return new Anthropic({ apiKey });
}

export function isSupportAiConfigured(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}

export interface ThreadMessage {
  role: 'customer' | 'agent' | 'note';
  from?: string;
  text: string;
}

function renderThread(thread: ThreadMessage[]): string {
  return thread
    .map((m) => {
      const who =
        m.role === 'customer' ? `CUSTOMER${m.from ? ` <${m.from}>` : ''}` :
        m.role === 'note' ? 'INTERNAL NOTE (not sent to customer)' :
        'SIGGLY SUPPORT (you, previously)';
      return `${who}:\n${m.text}`;
    })
    .join('\n\n---\n\n');
}

const PRODUCT_CONTEXT = `Siggly is a SaaS that lets teams design one on-brand email signature and deploy it across everyone's Gmail (Google Workspace) or Outlook (Microsoft 365) automatically. Key areas: signature templates/editor, deployment/integrations, team management, billing/plans, and a white-label MSP partner program.`;

/** Draft a reply to the customer's latest message. Returns plain text (no signature). */
export async function draftTicketReply(opts: {
  subject?: string | null;
  customerEmail?: string | null;
  thread: ThreadMessage[];
  instructions?: string | null;
}): Promise<string> {
  const client = getClient();
  if (!client) throw new Error('AI not configured');

  const prompt = `You are an experienced, warm, concise customer-support agent for Siggly.

${PRODUCT_CONTEXT}

Conversation so far (oldest first):
Subject: ${opts.subject || '(none)'}
Customer: ${opts.customerEmail || '(unknown)'}

${renderThread(opts.thread)}

Write a reply to the customer's most recent message.
Rules:
- Address their actual question directly; be helpful and specific.
- Warm but efficient — short paragraphs, no filler, no corporate fluff.
- If you genuinely need info you don't have, ask one clear question.
- Do NOT invent features, prices, or facts you aren't sure about; if unsure, say you'll check.
- Do NOT include a greeting line's name guess if unknown; "Hi there," is fine.
- Do NOT add a sign-off/signature block — the system appends that.
- Output ONLY the reply body text, nothing else.${
    opts.instructions ? `\n\nExtra instruction from the agent: ${opts.instructions}` : ''
  }`;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 900,
    messages: [{ role: 'user', content: prompt }],
  });
  return response.content[0]?.type === 'text' ? response.content[0].text.trim() : '';
}

/** Summarize the thread into a few bullets for fast triage. */
export async function summarizeTicket(opts: {
  subject?: string | null;
  thread: ThreadMessage[];
}): Promise<string> {
  const client = getClient();
  if (!client) throw new Error('AI not configured');

  const prompt = `Summarize this Siggly support conversation for the agent, so they can act fast.

Subject: ${opts.subject || '(none)'}

${renderThread(opts.thread)}

Output 2-4 short bullet points covering: what the customer wants, any key details (plan, platform, error), and the single most useful next action. Be terse. No preamble.`;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 350,
    messages: [{ role: 'user', content: prompt }],
  });
  return response.content[0]?.type === 'text' ? response.content[0].text.trim() : '';
}
