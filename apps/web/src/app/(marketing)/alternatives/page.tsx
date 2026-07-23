import { Repeat } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { HubPage } from '@/components/seo/hub-page';
import { alternativesPages } from '@/lib/seo-pages/data/alternatives';

export const metadata = genMeta({
  title: 'Email Signature Software Alternatives | Siggly',
  description:
    'Comparing email signature tools? See how Siggly stacks up as an alternative to WiseStamp, HubSpot, Exclaimer, and other signature software — features, pricing, and deployment.',
  keywords: ['email signature alternatives', 'email signature software comparison', 'best email signature tool', 'signature software alternative'],
  canonical: '/alternatives',
});

export default function AlternativesHub() {
  return (
    <HubPage
      badge="Alternatives"
      icon={Repeat}
      title="Siggly vs. the Alternatives"
      intro="Weighing your options for email signature management? Explore how Siggly compares to other tools on features, pricing, and ease of deployment."
      basePath="/alternatives"
      pages={alternativesPages}
    />
  );
}
