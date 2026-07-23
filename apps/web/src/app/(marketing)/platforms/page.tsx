import { MonitorSmartphone } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { HubPage } from '@/components/seo/hub-page';
import { platformsPages } from '@/lib/seo-pages/data/platforms';

export const metadata = genMeta({
  title: 'Email Signatures by Platform | Siggly',
  description:
    'Set up and deploy professional email signatures on Outlook, Gmail, Apple Mail, Yahoo Mail, Thunderbird, and every major email platform. Platform-specific guides from Siggly.',
  keywords: ['email signature platforms', 'email signature by client', 'Outlook signatures', 'Gmail signatures', 'Apple Mail signatures'],
  canonical: '/platforms',
});

export default function PlatformsHub() {
  return (
    <HubPage
      badge="Platforms"
      icon={MonitorSmartphone}
      title="Email Signatures for Every Platform"
      intro="Deploy consistent, professional email signatures across every email client your team uses. Choose your platform for a step-by-step setup and deployment guide."
      basePath="/platforms"
      pages={platformsPages}
    />
  );
}
