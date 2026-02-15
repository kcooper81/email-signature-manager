export interface SEOLandingPageData {
  slug: string;
  category: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    canonical: string;
  };
  breadcrumbs: { name: string; url: string }[];
  hero: {
    badge?: { icon: string; text: string };
    title: string;
    description: string;
    variant: 'light' | 'dark' | 'violet' | 'emerald' | 'indigo' | 'slate';
  };
  stats?: { value: string; label: string }[];
  features: { icon: string; title: string; description: string }[];
  featuresTitle?: string;
  featuresDescription?: string;
  sections?: SEOContentSection[];
  testimonial?: { quote: string; authorName: string; authorTitle: string };
  faqs?: { question: string; answer: string }[];
  cta: { title: string; description: string; variant?: string };
}

export type SEOContentSection =
  | { type: 'checklist'; title: string; items: string[] }
  | {
      type: 'comparison-table';
      title: string;
      competitor: string;
      rows: {
        feature: string;
        siggly: boolean | string;
        competitor: boolean | string;
      }[];
    }
  | {
      type: 'how-it-works';
      title: string;
      steps: { step: string; title: string; description: string }[];
    }
  | {
      type: 'benefits';
      title: string;
      items: { icon: string; title: string; description: string }[];
    }
  | { type: 'prose'; title: string; paragraphs: string[] }
  | {
      type: 'use-cases-grid';
      title: string;
      cases: { title: string; description: string }[];
    };
