import { BookOpen } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { HubPage } from '@/components/seo/hub-page';
import { guidesPages } from '@/lib/seo-pages/data/guides';

export const metadata = genMeta({
  title: 'Email Signature Guides & Tutorials | Siggly',
  description:
    'In-depth guides for creating, deploying, and managing email signatures at scale — compliance checklists, brand guidelines, rollout playbooks, and more from Siggly.',
  keywords: ['email signature guides', 'email signature tutorials', 'email signature best practices', 'signature management guide'],
  canonical: '/guides',
});

export default function GuidesHub() {
  return (
    <HubPage
      badge="Guides"
      icon={BookOpen}
      title="Email Signature Guides"
      intro="Practical, step-by-step guides for rolling out and managing professional email signatures across your organization — from compliance to brand consistency."
      basePath="/guides"
      pages={guidesPages}
    />
  );
}
