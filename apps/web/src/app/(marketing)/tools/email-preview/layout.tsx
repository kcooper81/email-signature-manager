import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata = genMeta({
  title: 'Email Signature Preview Tool | See How It Looks Everywhere',
  description: 'Preview how your email signature looks across Gmail, Outlook, Apple Mail, and mobile devices. Paste your HTML and see instant cross-client previews.',
  canonical: '/tools/email-preview',
  keywords: ['email signature preview', 'signature rendering test', 'email client preview', 'Gmail signature preview', 'Outlook signature preview'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
