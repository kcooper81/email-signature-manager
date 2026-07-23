import { Mail } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { HubPage } from '@/components/seo/hub-page';
import { emailSignaturesPages } from '@/lib/seo-pages/data/email-signatures';

export const metadata = genMeta({
  title: 'Professional Email Signatures by Role & Profession | Siggly',
  description:
    'Professional email signature examples and templates tailored by role and profession — accountants, lawyers, realtors, consultants, and more. Built and deployed with Siggly.',
  keywords: ['professional email signatures', 'email signature by profession', 'email signature examples', 'role-based email signatures'],
  canonical: '/email-signatures',
});

export default function EmailSignaturesHub() {
  return (
    <HubPage
      badge="Email Signatures"
      icon={Mail}
      title="Professional Email Signatures by Profession"
      intro="Find email signature guidance tailored to your role. Each guide covers the details, layout, and compliance considerations that matter for your profession."
      basePath="/email-signatures"
      pages={emailSignaturesPages}
    />
  );
}
