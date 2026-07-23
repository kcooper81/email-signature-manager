import { Puzzle } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { HubPage } from '@/components/seo/hub-page';
import { integrationsPages } from '@/lib/seo-pages/data/integrations';

export const metadata = genMeta({
  title: 'Integrations Directory',
  description:
    'Browse every Siggly integration — Google Workspace, Microsoft 365, HubSpot, Calendly, Salesforce, Slack, and more — to automate email signature management across your stack.',
  keywords: ['email signature integrations', 'Siggly integrations', 'Google Workspace signature integration', 'Microsoft 365 signature integration', 'HubSpot email signatures'],
  canonical: '/integrations/directory',
});

// Dedicated (hand-built) integration pages that live outside the data-driven [slug] set.
const featuredLinks = [
  {
    href: '/google-workspace',
    title: 'Google Workspace',
    description: 'Deploy and enforce email signatures across every Gmail user in your Google Workspace organization.',
  },
  {
    href: '/integrations/microsoft-365',
    title: 'Microsoft 365',
    description: 'Centrally manage Outlook and Microsoft 365 email signatures for your whole company.',
  },
  {
    href: '/integrations/hubspot',
    title: 'HubSpot',
    description: 'Sync contacts and roles from HubSpot to keep every email signature accurate and on-brand.',
  },
  {
    href: '/integrations/calendly',
    title: 'Calendly',
    description: 'Add personal Calendly booking links to every team member’s email signature automatically.',
  },
];

export default function IntegrationsDirectory() {
  return (
    <HubPage
      badge="Integrations"
      icon={Puzzle}
      title="Integrations Directory"
      intro="Siggly connects with your identity provider, HR system, CRM, and scheduling tools so email signatures stay accurate and automatic as your team changes."
      basePath="/integrations"
      // /integrations/google-workspace 301-redirects to /google-workspace, which
      // is surfaced via featuredLinks — exclude it here to avoid a redirect hop.
      pages={integrationsPages.filter((p) => p.slug !== 'google-workspace')}
      extraLinks={featuredLinks}
    />
  );
}
