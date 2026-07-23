import { generateMetadata as genMeta } from '@/lib/seo';

// The contact page is a client component and cannot export metadata itself,
// so it is provided here (title, description, and canonical).
export const metadata = genMeta({
  title: 'Contact Siggly',
  description: 'Get in touch with the Siggly team. Questions about email signature management, pricing, demos, or support — we’re here to help.',
  keywords: ['contact Siggly', 'Siggly support', 'email signature software contact'],
  canonical: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
