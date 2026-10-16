import { Scale } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { HubPage } from '@/components/seo/hub-page';
import { comparisonsPages } from '@/lib/seo-pages/data/comparisons';

export const metadata = genMeta({
  title: 'Compare Siggly vs Other Email Signature Software',
  description:
    'See how Siggly compares head-to-head with Exclaimer, CodeTwo, WiseStamp, and other email signature tools — features, pricing, deployment, and platform support.',
  keywords: [
    'email signature software comparison',
    'siggly vs',
    'compare email signature tools',
    'email signature manager comparison',
  ],
  canonical: '/compare',
});

export default function CompareHub() {
  return (
    <HubPage
      badge="Compare"
      icon={Scale}
      title="Compare Siggly Head-to-Head"
      intro="Evaluating email signature platforms? See how Siggly stacks up against the competition on features, pricing, deployment, and ease of use."
      basePath="/compare"
      pages={comparisonsPages}
    />
  );
}
