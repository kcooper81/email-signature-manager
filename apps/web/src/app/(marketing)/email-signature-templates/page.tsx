import { LayoutTemplate } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { HubPage } from '@/components/seo/hub-page';
import { templatesPages } from '@/lib/seo-pages/data/templates';

export const metadata = genMeta({
  title: 'Free Email Signature Templates | Siggly',
  description:
    'Browse professional email signature templates — corporate, modern, minimalist, sales, and more. Customize and deploy across your whole team with Siggly.',
  keywords: ['email signature templates', 'free email signature templates', 'professional signature templates', 'HTML email signature templates'],
  canonical: '/email-signature-templates',
});

export default function EmailSignatureTemplatesHub() {
  return (
    <HubPage
      badge="Templates"
      icon={LayoutTemplate}
      title="Email Signature Templates"
      intro="Professionally designed email signature templates for every style and team. Pick a starting point, customize it to your brand, and deploy in minutes."
      basePath="/email-signature-templates"
      pages={templatesPages}
    />
  );
}
