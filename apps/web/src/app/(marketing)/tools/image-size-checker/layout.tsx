import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Email Signature Image Size Checker & Resizer',
  description:
    'Check if your logo, headshot, or banner is the right size for an email signature — and resize it to the recommended dimensions in one click. Free, no signup, runs in your browser.',
  keywords: [
    'email signature image size',
    'best image size for email signature',
    'email signature logo size',
    'email signature banner size',
    'resize image for email signature',
    'email signature photo size',
  ],
  canonical: '/tools/image-size-checker',
});

export default function ImageSizeCheckerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
