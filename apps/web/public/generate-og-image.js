/**
 * Generates the site-wide Open Graph / Twitter card image.
 *
 * Source: public/og-image.html  →  Output: public/og-image.png (1200x630)
 * Referenced as DEFAULT_OG_IMAGE in src/lib/seo/metadata.ts and in the root layout.
 *
 * Run: node public/generate-og-image.js
 */
const puppeteer = require('puppeteer');
const path = require('path');

async function generateOgImage() {
  const browser = await puppeteer.launch({ channel: 'chrome' });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.goto(`file://${path.join(__dirname, 'og-image.html')}`, { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: path.join(__dirname, 'og-image.png'),
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });

  await browser.close();
  console.log(`✓ og-image.png created at ${path.join(__dirname, 'og-image.png')}`);
}

generateOgImage().catch((err) => {
  console.error(err);
  process.exit(1);
});
