import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata = genMeta({
  title: 'Free Email Signature Tools',
  description: 'Free email signature tools: generator, templates, ROI calculator, audit grader, disclaimer generator, email client preview, and HTML converter. No signup required.',
  canonical: '/tools',
  keywords: ['free email signature tools', 'signature generator', 'email signature templates', 'signature audit'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
