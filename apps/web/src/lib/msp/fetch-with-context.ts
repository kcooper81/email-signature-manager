import { getMspClientOrgId } from '@/hooks/use-msp-context';

/**
 * Fetch wrapper that automatically includes MSP client context header.
 * Use this for API calls that should respect MSP context switching.
 */
export async function fetchWithMspContext(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const clientOrgId = getMspClientOrgId();
  
  const headers = new Headers(options.headers);
  
  if (clientOrgId) {
    headers.set('x-msp-client-org', clientOrgId);
  }
  
  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Get headers object with MSP context for use with fetch.
 */
export function getMspContextHeaders(): Record<string, string> {
  const clientOrgId = getMspClientOrgId();
  
  if (clientOrgId) {
    return { 'x-msp-client-org': clientOrgId };
  }
  
  return {};
}
