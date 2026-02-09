const puppeteer = require('puppeteer');
const path = require('path');

async function generateBanners() {
  const browser = await puppeteer.launch({
    channel: 'chrome', // Use installed Chrome
  });
  
  // YouTube Banner (2560x1440)
  console.log('Generating YouTube banner...');
  const ytPage = await browser.newPage();
  await ytPage.setViewport({ width: 2560, height: 1440 });
  await ytPage.goto(`file://${path.join(__dirname, 'youtube-banner.html')}`, { waitUntil: 'networkidle0' });
  await ytPage.screenshot({ 
    path: path.join(__dirname, 'youtube-banner.png'),
    clip: { x: 0, y: 0, width: 2560, height: 1440 }
  });
  console.log('✓ youtube-banner.png created');

  // X.com Banner (1500x500)
  console.log('Generating X.com banner...');
  const xPage = await browser.newPage();
  await xPage.setViewport({ width: 1500, height: 500 });
  await xPage.goto(`file://${path.join(__dirname, 'x-banner.html')}`, { waitUntil: 'networkidle0' });
  await xPage.screenshot({ 
    path: path.join(__dirname, 'x-banner.png'),
    clip: { x: 0, y: 0, width: 1500, height: 500 }
  });
  console.log('✓ x-banner.png created');

  // LinkedIn Banner (1128x191)
  console.log('Generating LinkedIn banner...');
  const liPage = await browser.newPage();
  await liPage.setViewport({ width: 1128, height: 191 });
  await liPage.goto(`file://${path.join(__dirname, 'linkedin-banner.html')}`, { waitUntil: 'networkidle0' });
  await liPage.screenshot({ 
    path: path.join(__dirname, 'linkedin-banner.png'),
    clip: { x: 0, y: 0, width: 1128, height: 191 }
  });
  console.log('✓ linkedin-banner.png created');

  await browser.close();
  console.log('\nDone! Banners saved to:');
  console.log(`  - ${path.join(__dirname, 'youtube-banner.png')}`);
  console.log(`  - ${path.join(__dirname, 'x-banner.png')}`);
  console.log(`  - ${path.join(__dirname, 'linkedin-banner.png')}`);
}

async function generateProfiles() {
  const browser = await puppeteer.launch({
    channel: 'chrome',
  });

  const page = await browser.newPage();
  await page.goto(`file://${path.join(__dirname, 'profile-images.html')}`, { waitUntil: 'networkidle0' });

  // YouTube Profile (800x800)
  console.log('Generating YouTube profile...');
  await page.setViewport({ width: 1200, height: 1000 });
  const ytProfile = await page.$('#youtube-profile');
  await ytProfile.screenshot({ path: path.join(__dirname, 'youtube-profile.png') });
  console.log('✓ youtube-profile.png created (800×800)');

  // Google Marketplace (512x512)
  console.log('Generating Google Marketplace icon...');
  const googleProfile = await page.$('#google-profile');
  await googleProfile.screenshot({ path: path.join(__dirname, 'google-marketplace-icon.png') });
  console.log('✓ google-marketplace-icon.png created (512×512)');

  // X.com Profile (400x400)
  console.log('Generating X.com profile...');
  const xProfile = await page.$('#x-profile');
  await xProfile.screenshot({ path: path.join(__dirname, 'x-profile.png') });
  console.log('✓ x-profile.png created (400×400)');

  // Facebook Profile (180x180)
  console.log('Generating Facebook profile...');
  const fbProfile = await page.$('#facebook-profile');
  await fbProfile.screenshot({ path: path.join(__dirname, 'facebook-profile.png') });
  console.log('✓ facebook-profile.png created (180×180)');

  // LinkedIn Profile (300x300)
  console.log('Generating LinkedIn profile...');
  const liProfile = await page.$('#linkedin-profile');
  await liProfile.screenshot({ path: path.join(__dirname, 'linkedin-profile.png') });
  console.log('✓ linkedin-profile.png created (300×300)');

  // Instagram Profile (320x320)
  console.log('Generating Instagram profile...');
  const igProfile = await page.$('#instagram-profile');
  await igProfile.screenshot({ path: path.join(__dirname, 'instagram-profile.png') });
  console.log('✓ instagram-profile.png created (320×320)');

  await browser.close();
  console.log('\nDone! Profile images saved.');
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--profiles') || args.includes('-p')) {
    await generateProfiles();
  } else if (args.includes('--banners') || args.includes('-b')) {
    await generateBanners();
  } else {
    // Generate all by default
    await generateBanners();
    console.log('');
    await generateProfiles();
  }
}

main().catch(console.error);
