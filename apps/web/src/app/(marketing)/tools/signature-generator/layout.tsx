import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata = genMeta({
  title: 'Free Email Signature Generator',
  description: 'Create a professional email signature for free. Enter your details and generate a ready-to-use HTML signature for Gmail, Outlook, and more.',
  canonical: '/tools/signature-generator',
  keywords: ['email signature generator', 'free signature creator', 'HTML signature'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
