import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Free Email Signature Banner Maker',
  description:
    'Design a professional email signature banner in your browser — headline, CTA, colors, and logo. Free, no signup, instant PNG download for Gmail and Outlook.',
  keywords: [
    'email signature banner maker',
    'email banner generator',
    'signature banner creator',
    'email signature banner template',
    'free banner maker',
  ],
  canonical: '/tools/banner-maker',
});

export default function BannerMakerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
