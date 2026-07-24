import { HelpCircle } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { HubPage } from '@/components/seo/hub-page';
import { answersPages } from '@/lib/seo-pages/data/answers';

export const metadata = genMeta({
  title: 'Email Signature Answers & Quick Guides',
  description:
    'Straight answers to common email signature management questions — department signatures, updating everyone at once, enforcement, and more, for Google Workspace and Microsoft 365.',
  keywords: ['email signature questions', 'email signature answers', 'email signature management help'],
  canonical: '/answers',
});

export default function AnswersHub() {
  return (
    <HubPage
      badge="Answers"
      icon={HelpCircle}
      title="Email Signature Answers"
      intro="Quick, direct answers to the questions teams ask most about managing email signatures at scale."
      basePath="/answers"
      pages={answersPages}
    />
  );
}
