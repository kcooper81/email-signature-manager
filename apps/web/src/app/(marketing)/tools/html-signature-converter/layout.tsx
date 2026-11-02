import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata = genMeta({
  title: 'HTML to Email Signature Converter',
  description: 'Convert HTML to a clean, email-safe signature that works in Gmail, Outlook, and Apple Mail. Paste your HTML, strip the unsupported code, and copy the result — free, no signup.',
  canonical: '/tools/html-signature-converter',
  keywords: [
    'html to email signature',
    'convert html to email signature',
    'html email signature converter',
    'email signature html',
    'html signature for gmail',
    'html signature for outlook',
    'email signature cleaner',
    'signature formatter',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
