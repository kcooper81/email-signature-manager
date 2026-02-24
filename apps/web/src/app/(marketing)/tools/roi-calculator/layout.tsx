import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata = genMeta({
  title: 'Email Signature ROI Calculator | Free Tool',
  description: 'Calculate the marketing ROI of your team\'s email signatures. See how many impressions, clicks, and dollars your signatures generate each month.',
  canonical: '/tools/roi-calculator',
  keywords: ['email signature ROI', 'signature marketing calculator', 'email signature value', 'email impressions calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
