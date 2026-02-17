import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata = genMeta({
  title: 'HTML Email Signature Converter',
  description: 'Convert any HTML email signature to a clean, cross-client compatible format. Paste your HTML and get a signature that works in Gmail, Outlook, and Apple Mail.',
  canonical: '/tools/html-signature-converter',
  keywords: ['HTML signature converter', 'email signature cleaner', 'signature formatter'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
