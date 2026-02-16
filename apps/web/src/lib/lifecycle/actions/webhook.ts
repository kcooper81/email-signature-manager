import type { WorkflowRunContext } from '../workflow-runner';

function isPrivateUrl(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);

    // Only allow http and https
    if (!['http:', 'https:'].includes(parsed.protocol)) return true;

    const hostname = parsed.hostname.toLowerCase();

    // Block localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1' || hostname === '[::1]') return true;

    // Block private IP ranges
    const parts = hostname.split('.').map(Number);
    if (parts.length === 4 && parts.every(p => !isNaN(p))) {
      // 10.0.0.0/8
      if (parts[0] === 10) return true;
      // 172.16.0.0/12
      if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
      // 192.168.0.0/16
      if (parts[0] === 192 && parts[1] === 168) return true;
      // 169.254.0.0/16 (link-local)
      if (parts[0] === 169 && parts[1] === 254) return true;
      // 0.0.0.0
      if (parts.every(p => p === 0)) return true;
    }

    return false;
  } catch {
    return true; // Invalid URL = blocked
  }
}

export async function executeWebhook(context: WorkflowRunContext, config: Record<string, any>) {
  const { url, method, headers } = config;

  if (!url) throw new Error('Webhook URL is required');
  if (isPrivateUrl(url)) throw new Error('Webhook URL points to a private/internal address');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(url, {
      method: method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(headers || {}),
      },
      body: JSON.stringify({
        eventType: context.eventType,
        eventSource: context.eventSource,
        userId: context.userId,
        organizationId: context.organizationId,
        eventData: context.eventData,
        timestamp: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}
