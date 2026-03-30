import {
  MarketingHero,
  MarketingStatsBar,
  MarketingFeatureGrid,
  MarketingTestimonial,
  MarketingCTA,
} from '@/components/marketing';
import { FAQSection } from '@/components/seo/faq-section';
import { findRelatedPages } from '@/lib/seo/internal-links';
import { resolveIcon } from './icon-map';
import { SectionRenderer } from './section-renderers';
import type { SEOLandingPageData } from './types';

export function SEOLandingPage({ data }: { data: SEOLandingPageData }) {
  const badgeIcon = data.hero.badge ? resolveIcon(data.hero.badge.icon) : undefined;
  const isComingSoon = data.status === 'coming-soon';

  const features = data.features.map((f) => ({
    icon: resolveIcon(f.icon),
    title: f.title,
    description: f.description,
  }));

  return (
    <>
      {isComingSoon && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-center gap-2 text-sm text-amber-800">
            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 border border-amber-300">
              Coming Soon
            </span>
            <span>This integration is on our roadmap. Sign up to be notified when it launches.</span>
          </div>
        </div>
      )}
      <MarketingHero
        badge={
          data.hero.badge
            ? { icon: badgeIcon, text: data.hero.badge.text }
            : undefined
        }
        title={data.hero.title}
        description={data.hero.description}
        variant={data.hero.variant}
        primaryButtonText={isComingSoon ? 'Join the Waitlist' : 'Get Started Free'}
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

      {(() => {
        const related = findRelatedPages(data.meta.canonical || `/${data.category}/${data.slug}`, 3);
        if (related.length === 0) return null;
        return (
          <section className="py-12 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {related.map((page) => (
                  <a
                    key={page.url}
                    href={page.url}
                    className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <span className="text-xs font-medium text-violet-600 uppercase tracking-wide">
                      {page.category}
                    </span>
                    <h3 className="font-semibold mt-1 text-gray-900">{page.title}</h3>
                    <span className="text-sm text-violet-600 mt-2 inline-block">
                      Read more →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

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
