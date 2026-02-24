import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata = genMeta({
  title: 'Email Disclaimer Generator | Free Tool',
  description: 'Generate professional email disclaimers for HIPAA, GDPR, legal, financial, and general business use. Copy-ready HTML for any email client.',
  canonical: '/tools/disclaimer-generator',
  keywords: ['email disclaimer generator', 'HIPAA email disclaimer', 'GDPR email disclaimer', 'legal email disclaimer', 'confidentiality notice'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
