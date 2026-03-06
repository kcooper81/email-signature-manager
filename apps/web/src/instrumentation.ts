export async function register() {
  // Submit all sitemap URLs to IndexNow on deploy (opt-in via env var)
  if (process.env.INDEXNOW_ON_DEPLOY === 'true' && process.env.INDEXNOW_API_KEY) {
    // Fire-and-forget — don't block server startup
    submitSitemapToIndexNow().catch(() => {});
  }
}

async function submitSitemapToIndexNow() {
  // Dynamic import to avoid loading at build time
  const { submitToIndexNow, getAllSitemapUrls } = await import('@/lib/seo/indexnow');
  const urls = await getAllSitemapUrls();
  if (urls.length > 0) {
    await submitToIndexNow(urls);
  }
}
