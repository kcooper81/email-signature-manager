import { generateMetadata as genMeta } from '@/lib/seo';

// The demo page is a client component and cannot export metadata itself,
// so it is provided here (title, description, and canonical).
export const metadata = genMeta({
  title: 'Book a Siggly Demo',
  description: 'See Siggly in action. Book a personalized demo and learn how to deploy consistent, on-brand email signatures across your whole team in minutes.',
  keywords: ['Siggly demo', 'email signature software demo', 'book a demo'],
  canonical: '/demo',
});

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
