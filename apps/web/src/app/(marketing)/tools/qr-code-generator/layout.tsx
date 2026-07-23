import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Free QR Code Generator for Email Signatures',
  description:
    'Create a free QR code for your website, email, phone, or vCard contact card — then add it to your email signature. No signup, instant PNG/SVG download.',
  keywords: [
    'qr code generator',
    'email signature qr code',
    'vcard qr code generator',
    'free qr code',
    'contact qr code',
  ],
  canonical: '/tools/qr-code-generator',
});

export default function QrToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
