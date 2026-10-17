/**
 * One-off: seed a full brand (guidelines + assets) for the admin@siggly.io org
 * so the Brand hub (/brand, /brand/guidelines, /brand/assets, /brand/audit) is
 * populated. Safe to re-run — it skips if guidelines already exist for the org.
 *
 * Run from the repo root:   node scripts/seed-brand.mjs
 * Requires DATABASE_URL_PROD (or pass DATABASE_URL) in your environment.
 */
import postgres from 'postgres';

const CONN = process.env.DATABASE_URL_PROD || process.env.DATABASE_URL;
const ADMIN_EMAIL = 'admin@siggly.io';

if (!CONN) {
  console.error('Set DATABASE_URL_PROD (or DATABASE_URL) first.');
  process.exit(1);
}

const sql = postgres(CONN, { ssl: 'require', max: 1 });

// Siggly brand values (matches the app's violet brand).
const BRAND = {
  primary: ['#4F46E5'],                 // Indigo/violet 600
  secondary: ['#1A1A1A', '#666666'],    // Ink + muted
  accent: ['#7C3AED'],                  // Violet 700
  fonts: ['Arial', 'Helvetica', 'Inter'],
};
const LOGO_URL = 'https://siggly.io/siggly-logo.png';

try {
  const [user] = await sql`
    select u.id, u.organization_id, o.name as org
    from users u join organizations o on o.id = u.organization_id
    where lower(u.email) = ${ADMIN_EMAIL} limit 1`;
  if (!user) { console.error(`No user ${ADMIN_EMAIL} with an organization found.`); process.exit(1); }
  const orgId = user.organization_id;
  console.log(`Org: ${user.org} (${orgId}) — admin ${ADMIN_EMAIL}`);

  const [existing] = await sql`select count(*)::int as n from brand_guidelines where organization_id = ${orgId}`;
  if (existing.n > 0) {
    console.log(`Brand guidelines already exist for this org (${existing.n}). Nothing to do — delete them first to re-seed.`);
    process.exit(0);
  }

  // 1) Brand assets (reference the live logo; approved + one pending to show the governance states)
  const assets = [
    { display: 'Siggly Primary Logo', file: 'siggly-logo.png', cat: 'logo', status: 'approved', w: 240, h: 64, notes: 'Primary full-color logo. Use on light backgrounds. Minimum width 120px.' },
    { display: 'Siggly Logo Mark', file: 'siggly-icon.png', cat: 'icon', status: 'approved', w: 64, h: 64, notes: 'Icon-only mark for compact placements and favicons.' },
    { display: 'Partner Co-Brand Logo', file: 'siggly-cobrand.png', cat: 'logo', status: 'pending', w: 300, h: 80, notes: 'Awaiting brand-team approval before use in partner signatures.' },
  ];
  const assetIds = {};
  for (const a of assets) {
    const [row] = await sql`
      insert into brand_assets
        (organization_id, file_name, file_path, public_url, mime_type, file_size, width, height,
         display_name, category, tags, description, uploaded_by, usage_guidelines, approved_status)
      values
        (${orgId}, ${a.file}, ${'brand/' + a.file}, ${LOGO_URL}, 'image/png', 18240, ${a.w}, ${a.h},
         ${a.display}, ${a.cat}, ${sql.array(['brand', a.cat])}, ${a.notes}, ${user.id}, ${a.notes}, ${a.status})
      returning id`;
    assetIds[a.display] = row.id;
    console.log(`  + asset "${a.display}" (${a.status})`);
  }

  // 2) Brand guidelines referencing the primary logo
  const [g] = await sql`
    insert into brand_guidelines
      (organization_id, name, description, primary_colors, secondary_colors, accent_colors,
       allowed_fonts, required_logo_asset_id, logo_min_width, logo_max_width,
       required_disclaimer, required_social_links, locked_colors, locked_fonts,
       is_active, version, created_by)
    values
      (${orgId}, 'Siggly Brand Guidelines',
       'Official Siggly brand standards for all employee email signatures — colors, typography, logo usage, and required elements.',
       ${sql.array(BRAND.primary)}, ${sql.array(BRAND.secondary)}, ${sql.array(BRAND.accent)},
       ${sql.array(BRAND.fonts)}, ${assetIds['Siggly Primary Logo']}, 120, 240,
       true, ${sql.array(['linkedin', 'twitter'])}, true, true,
       true, 1, ${user.id})
    returning id`;
  console.log(`  + brand guidelines "Siggly Brand Guidelines" (${g.id})`);

  console.log('\nDone. Open https://siggly.io/brand to see guidelines, assets, and the audit/score.');
} catch (e) {
  console.error('ERROR:', e.message);
  process.exit(1);
} finally {
  await sql.end();
}
