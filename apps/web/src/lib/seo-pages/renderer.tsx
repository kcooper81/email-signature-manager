import {
  MarketingHero,
  MarketingStatsBar,
  MarketingFeatureGrid,
  MarketingTestimonial,
  MarketingCTA,
} from '@/components/marketing';
import { FAQSection } from '@/components/seo/faq-section';
import { resolveIcon } from './icon-map';
import { SectionRenderer } from './section-renderers';
import type { SEOLandingPageData } from './types';

export function SEOLandingPage({ data }: { data: SEOLandingPageData }) {
  const badgeIcon = data.hero.badge ? resolveIcon(data.hero.badge.icon) : undefined;

  const features = data.features.map((f) => ({
    icon: resolveIcon(f.icon),
    title: f.title,
    description: f.description,
  }));

  return (
    <>
      <MarketingHero
        badge={
          data.hero.badge
            ? { icon: badgeIcon, text: data.hero.badge.text }
            : undefined
        }
        title={data.hero.title}
        description={data.hero.description}
        variant={data.hero.variant}
        primaryButtonText="Get Started Free"
        primaryButtonHref="/signup"
        secondaryButtonText="Book a Demo"
        secondaryButtonHref="/demo"
      />

      {data.stats && data.stats.length > 0 && (
        <MarketingStatsBar stats={data.stats} />
      )}

      <MarketingFeatureGrid
        title={data.featuresTitle || 'Key Features'}
        description={data.featuresDescription}
        features={features}
        columns={data.features.length <= 4 ? (data.features.length as 2 | 3 | 4) : 3}
        variant="cards"
        iconVariant="violet"
      />

      {data.sections?.map((section, i) => (
        <SectionRenderer key={i} section={section} />
      ))}

      {data.testimonial && (
        <MarketingTestimonial
          quote={data.testimonial.quote}
          author={{
            name: data.testimonial.authorName,
            title: data.testimonial.authorTitle,
          }}
          variant="violet"
        />
      )}

      {data.faqs && data.faqs.length > 0 && <FAQSection faqs={data.faqs} />}

      <MarketingCTA
        title={data.cta.title}
        description={data.cta.description}
        variant={
          (data.cta.variant as
            | 'default'
            | 'violet'
            | 'blue'
            | 'emerald'
            | 'indigo'
            | 'dark') || 'violet'
        }
      />
    </>
  );
}
