// IndexNow API integration for instant search engine indexing
// https://www.indexnow.org/documentation

const INDEXNOW_KEY = process.env.INDEXNOW_API_KEY || '';
const SITE_HOST = 'siggly.io';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

interface IndexNowResponse {
  success: boolean;
  statusCode: number;
  message: string;
  urlCount: number;
}

/**
 * Submit URLs to IndexNow for instant indexing by Bing, Yandex, and other participating engines.
 * Submits in batch (up to 10,000 URLs per request).
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResponse> {
  if (!INDEXNOW_KEY) {
    return { success: false, statusCode: 0, message: 'INDEXNOW_API_KEY not configured', urlCount: 0 };
  }

  if (urls.length === 0) {
    return { success: true, statusCode: 200, message: 'No URLs to submit', urlCount: 0 };
  }

  // Ensure all URLs are fully qualified and belong to our host
  const fullUrls = urls
    .map(url => {
      if (url.startsWith('http')) return url;
      return `https://${SITE_HOST}${url.startsWith('/') ? '' : '/'}${url}`;
    })
    .filter(url => {
      try {
        const parsed = new URL(url);
        return parsed.hostname === SITE_HOST;
      } catch {
        return false;
      }
    });

  // Batch in groups of 10,000 (API limit)
  const batches = [];
  for (let i = 0; i < fullUrls.length; i += 10000) {
    batches.push(fullUrls.slice(i, i + 10000));
  }

  let totalSubmitted = 0;
  let lastStatusCode = 200;
  let lastMessage = 'OK';

  for (const batch of batches) {
    try {
      const response = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: SITE_HOST,
          key: INDEXNOW_KEY,
          keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
          urlList: batch,
        }),
      });

      lastStatusCode = response.status;

      if (response.status === 200 || response.status === 202) {
        totalSubmitted += batch.length;
        lastMessage = response.status === 202 ? 'Accepted (validation pending)' : 'OK';
      } else {
        const text = await response.text().catch(() => '');
        lastMessage = `HTTP ${response.status}: ${text || response.statusText}`;
        break;
      }
    } catch (error) {
      lastMessage = error instanceof Error ? error.message : 'Network error';
      lastStatusCode = 0;
      break;
    }
  }

  return {
    success: lastStatusCode === 200 || lastStatusCode === 202,
    statusCode: lastStatusCode,
    message: lastMessage,
    urlCount: totalSubmitted,
  };
}

/**
 * Get all sitemap URLs from the sitemap. Used to submit the full site.
 */
export async function getAllSitemapUrls(): Promise<string[]> {
  try {
    const response = await fetch(`https://${SITE_HOST}/sitemap.xml`);
    const xml = await response.text();

    // Simple regex extraction of <loc> tags
    const urls: string[] = [];
    const locRegex = /<loc>([^<]+)<\/loc>/g;
    let match;
    while ((match = locRegex.exec(xml)) !== null) {
      urls.push(match[1]);
    }
    return urls;
  } catch {
    return [];
  }
}
