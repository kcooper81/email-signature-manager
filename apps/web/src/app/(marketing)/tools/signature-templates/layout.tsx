import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata = genMeta({
  title: 'Free Email Signature Templates',
  description: 'Browse professional email signature templates for business, creative, and executive use. Copy and customize for Gmail, Outlook, and Apple Mail.',
  canonical: '/tools/signature-templates',
  keywords: ['email signature templates', 'free signature designs', 'professional signature'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
