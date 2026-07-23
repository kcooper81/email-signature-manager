import { Users } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { HubPage } from '@/components/seo/hub-page';
import { solutionsPages } from '@/lib/seo-pages/data/solutions';

export const metadata = genMeta({
  title: 'Email Signature Solutions by Team & Role | Siggly',
  description:
    'Email signature management built for every team — IT admins, marketing, sales, HR, agencies, enterprise, and more. See how Siggly solves signature management for your role.',
  keywords: ['email signature solutions', 'email signatures for teams', 'email signature management by role', 'signature software for business'],
  canonical: '/for',
});

// Hand-built solution pages that live outside the data-driven [slug] set.
const featuredLinks = [
  { href: '/for/it-admins', title: 'For IT Admins', description: 'Centralized signature control with zero end-user involvement.' },
  { href: '/for/marketing', title: 'For Marketing Teams', description: 'Turn every email into a branded marketing channel.' },
  { href: '/for/small-business', title: 'For Small Business', description: 'Professional signatures for your whole team, free to start.' },
  { href: '/for/agencies', title: 'For Agencies', description: 'Manage signatures across every client brand from one place.' },
  { href: '/for/enterprise', title: 'For Enterprise', description: 'Governance, compliance, and scale for large organizations.' },
];

export default function SolutionsHub() {
  return (
    <HubPage
      badge="Solutions"
      icon={Users}
      title="Email Signature Solutions for Every Team"
      intro="However your team works, Siggly keeps every email signature consistent, on-brand, and automatic. Find the solution built for your role."
      basePath="/for"
      pages={solutionsPages}
      extraLinks={featuredLinks}
    />
  );
}
