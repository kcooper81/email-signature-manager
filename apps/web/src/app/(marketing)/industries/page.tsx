import { Building2 } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { HubPage } from '@/components/seo/hub-page';
import { industriesPages } from '@/lib/seo-pages/data/industries';

export const metadata = genMeta({
  title: 'Email Signatures by Industry | Siggly',
  description:
    'Industry-specific email signature guidance and compliance — legal, healthcare, finance, real estate, technology, and dozens more. Built and deployed with Siggly.',
  keywords: ['email signatures by industry', 'industry email signature compliance', 'professional email signatures', 'industry signature templates'],
  canonical: '/industries',
});

// Hand-built industry pages that live outside the data-driven [slug] set.
const featuredLinks = [
  { href: '/industries/legal', title: 'Legal', description: 'Compliant, disclaimer-ready signatures for law firms.' },
  { href: '/industries/healthcare', title: 'Healthcare', description: 'HIPAA-aware email signatures for healthcare teams.' },
  { href: '/industries/finance', title: 'Finance', description: 'Regulation-ready signatures for financial services.' },
  { href: '/industries/real-estate', title: 'Real Estate', description: 'Branded, contact-rich signatures for agents and brokers.' },
];

export default function IndustriesHub() {
  return (
    <HubPage
      badge="Industries"
      icon={Building2}
      title="Email Signatures for Every Industry"
      intro="Every industry has its own norms, regulations, and branding needs. Find email signature guidance tailored to yours."
      basePath="/industries"
      pages={industriesPages}
      extraLinks={featuredLinks}
    />
  );
}
