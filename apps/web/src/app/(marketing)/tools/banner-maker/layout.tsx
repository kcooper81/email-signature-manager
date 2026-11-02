import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Free Email Header & Signature Banner Maker',
  description:
    'Make a free email header or signature banner in your browser — set the headline, CTA, colors, and logo, then download a ready-to-use PNG for Gmail and Outlook. No signup.',
  keywords: [
    'free email header maker',
    'email header maker',
    'email header generator',
    'email signature banner maker',
    'create email signature banner',
    'signature banner',
    'email banner generator',
    'email signature banner template',
  ],
  canonical: '/tools/banner-maker',
});

export default function BannerMakerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
