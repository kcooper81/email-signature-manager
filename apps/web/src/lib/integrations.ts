import { Chrome, Building2, Users, Zap, MessageSquare } from 'lucide-react';

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: 'available' | 'coming-soon';
  href?: string;
  color: string;
}

export const INTEGRATIONS: Integration[] = [
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    description: 'Deploy signatures to Gmail and sync users from Google Directory',
    icon: Chrome,
    status: 'available',
    href: '/google-workspace',
    color: 'blue',
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    description: 'Manage Outlook signatures and sync from Azure AD',
    icon: Building2,
    status: 'available',
    href: '/integrations/microsoft-365',
    color: 'blue',
  },
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    description: 'Sync contact data and enrich signature fields',
    icon: Users,
    status: 'available',
    href: '/integrations',
    color: 'orange',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get notifications for signature deployments and updates',
    icon: MessageSquare,
    status: 'coming-soon',
    color: 'purple',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect Siggly with 5,000+ apps and automate workflows',
    icon: Zap,
    status: 'coming-soon',
    color: 'orange',
  },
];

export const AVAILABLE_INTEGRATIONS = INTEGRATIONS.filter(i => i.status === 'available');
export const COMING_SOON_INTEGRATIONS = INTEGRATIONS.filter(i => i.status === 'coming-soon');
