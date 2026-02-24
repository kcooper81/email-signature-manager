import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata = genMeta({
  title: 'Email Signature Audit & Grader | Free Tool',
  description: 'Paste your email signature HTML and get an instant score with actionable recommendations. Check mobile compatibility, branding, and compliance.',
  canonical: '/tools/signature-audit',
  keywords: ['email signature audit', 'signature grader', 'email signature checker', 'signature score', 'email signature review'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
