/**
 * Turns a URL slug into a human breadcrumb/label, fixing the acronyms and brand
 * names that naive title-casing mangles (e.g. "it-admins" → "IT Admins",
 * "hubspot-email-signature" → "HubSpot Email Signature", not "It Admins" /
 * "Hubspot Email Signature").
 *
 * Applied per word, keyed on the lowercased token. Add new acronyms/brands here.
 */
const WORD_OVERRIDES: Record<string, string> = {
  // Acronyms / initialisms
  it: 'IT', hr: 'HR', qr: 'QR', crm: 'CRM', api: 'API', sso: 'SSO', saas: 'SaaS',
  gdpr: 'GDPR', hipaa: 'HIPAA', ferpa: 'FERPA', finra: 'FINRA', sec: 'SEC', sox: 'SOX',
  soc: 'SOC', smb: 'SMB', seo: 'SEO', ui: 'UI', ux: 'UX', ai: 'AI', pdf: 'PDF',
  html: 'HTML', css: 'CSS', url: 'URL', us: 'US', uk: 'UK', eu: 'EU', ceo: 'CEO',
  cfo: 'CFO', cto: 'CTO', vp: 'VP', id: 'ID', dns: 'DNS', spf: 'SPF', dkim: 'DKIM',
  dmarc: 'DMARC', nhs: 'NHS', msp: 'MSP', b2b: 'B2B', faq: 'FAQ', '365': '365',
  o365: 'O365', m365: 'M365', ios: 'iOS', vcard: 'vCard',
  // Platforms / brands
  google: 'Google', microsoft: 'Microsoft', gmail: 'Gmail', outlook: 'Outlook',
  // Competitor brand names (single tokens in slugs)
  hubspot: 'HubSpot', codetwo: 'CodeTwo', wisestamp: 'WiseStamp',
  signaturesatori: 'SignatureSatori', mysignature: 'MySignature', bamboohr: 'BambooHR',
  htmlsig: 'HTMLSig', syncsignature: 'SyncSignature', brandmail: 'BrandMail',
  newoldstamp: 'Newoldstamp', mailchimp: 'Mailchimp', yesware: 'Yesware',
  sigstr: 'Sigstr', bybrand: 'Bybrand', florbs: 'Florbs', designhill: 'Designhill',
  exclaimer: 'Exclaimer', calendly: 'Calendly', salesforce: 'Salesforce',
};

export function formatSlugLabel(slug: string): string {
  return slug
    .split('-')
    .map((word) => WORD_OVERRIDES[word.toLowerCase()] ?? (word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ');
}
