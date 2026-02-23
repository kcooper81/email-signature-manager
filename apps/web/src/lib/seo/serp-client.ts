/**
 * Serper.dev SERP API client for competitor intelligence.
 * Lightweight REST wrapper — no npm package needed.
 */

const SERPER_API_URL = 'https://google.serper.dev/search';

export interface SERPResult {
  title: string;
  link: string;
  snippet: string;
  position: number;
  domain: string;
}

export interface SERPResponse {
  query: string;
  organic: SERPResult[];
  searchParameters: {
    q: string;
    gl: string;
    hl: string;
  };
  knowledgeGraph?: Record<string, unknown>;
  peopleAlsoAsk?: { question: string; snippet: string; link: string }[];
  relatedSearches?: { query: string }[];
  serpFeatures: {
    faq: boolean;
    reviews: boolean;
    sitelinks: boolean;
    featuredSnippet: boolean;
    localPack: boolean;
    images: boolean;
    videos: boolean;
  };
}

function getApiKey(): string {
  const key = process.env.SERPER_API_KEY;
  if (!key) {
    throw new Error('SERPER_API_KEY not configured');
  }
  return key;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

/**
 * Search Google SERP for a single query via Serper.dev.
 */
export async function searchSERP(
  query: string,
  options?: { gl?: string; hl?: string; num?: number }
): Promise<SERPResponse> {
  const apiKey = getApiKey();

  const response = await fetch(SERPER_API_URL, {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: query,
      gl: options?.gl || 'us',
      hl: options?.hl || 'en',
      num: options?.num || 10,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Serper API error ${response.status}: ${text}`);
  }

  const data = await response.json();

  const organic: SERPResult[] = (data.organic || []).map(
    (item: any, index: number) => ({
      title: item.title || '',
      link: item.link || '',
      snippet: item.snippet || '',
      position: item.position || index + 1,
      domain: extractDomain(item.link || ''),
    })
  );

  return {
    query,
    organic,
    searchParameters: data.searchParameters || { q: query, gl: 'us', hl: 'en' },
    knowledgeGraph: data.knowledgeGraph,
    peopleAlsoAsk: data.peopleAlsoAsk,
    relatedSearches: data.relatedSearches,
    serpFeatures: {
      faq: !!(data.peopleAlsoAsk && data.peopleAlsoAsk.length > 0),
      reviews: !!data.knowledgeGraph?.rating,
      sitelinks: organic.some((r) => (data.organic?.[0] as any)?.sitelinks),
      featuredSnippet: !!data.answerBox,
      localPack: !!(data.places && data.places.length > 0),
      images: !!(data.images && data.images.length > 0),
      videos: !!(data.videos && data.videos.length > 0),
    },
  };
}

/**
 * Batch search multiple queries. Respects rate limits by sequential execution.
 */
export async function batchSearchSERP(
  queries: string[],
  options?: { gl?: string; hl?: string; delayMs?: number }
): Promise<SERPResponse[]> {
  const results: SERPResponse[] = [];
  const delay = options?.delayMs || 200; // 200ms between requests

  for (const query of queries) {
    try {
      const result = await searchSERP(query, options);
      results.push(result);
    } catch (error) {
      console.error(`SERP query failed for "${query}":`, error);
      // Continue with remaining queries
    }

    // Rate limit delay
    if (queries.indexOf(query) < queries.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return results;
}

/**
 * Check if Serper API is configured and working.
 */
export async function testSERPConnection(): Promise<{
  connected: boolean;
  error?: string;
}> {
  try {
    getApiKey();
    const result = await searchSERP('test', { num: 1 });
    return { connected: result.organic.length > 0 };
  } catch (error: any) {
    return { connected: false, error: error.message };
  }
}
