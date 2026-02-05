import Image from 'next/image';
import { BarChart3, Target, Megaphone, TrendingUp, MousePointer, Calendar, Palette, Sparkles } from 'lucide-react';
import {
  MarketingHero,
  MarketingStatsBar,
  MarketingFeatureGrid,
  MarketingTestimonial,
  MarketingCTA,
} from '@/components/marketing';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Email Signature Marketing for Marketing Teams',
  description: 'Turn every email into a marketing opportunity. Add campaign banners, track clicks, and measure ROI from your team\'s email signatures.',
  keywords: ['marketing', 'campaign banners', 'click tracking', 'ROI', 'brand consistency'],
  canonical: '/for/marketing',
});

const painPoints = [
  {
    icon: Target,
    title: 'Untapped marketing channel',
    description: 'Your team sends thousands of emails daily. Each one is a missed branding opportunity.',
  },
  {
    icon: BarChart3,
    title: 'No way to measure ROI',
    description: 'You can\'t track if signature banners drive traffic or conversions.',
  },
  {
    icon: Megaphone,
    title: 'Inconsistent campaigns',
    description: 'Getting everyone to update their signature for a campaign is like herding cats.',
  },
  {
    icon: Calendar,
    title: 'Manual updates',
    description: 'Changing banners for events or promotions requires chasing down every employee.',
  },
];

const features = [
  {
    icon: MousePointer,
    title: 'Click Tracking',
    description: 'Track every click on signature links and banners. Know exactly which CTAs drive traffic.',
  },
  {
    icon: TrendingUp,
    title: 'ROI Dashboard',
    description: 'See how many leads and conversions your email signatures generate each month.',
  },
  {
    icon: Calendar,
    title: 'Scheduled Banners',
    description: 'Set up promotional banners in advance. They go live and expire automatically.',
  },
  {
    icon: Sparkles,
    title: 'A/B Testing',
    description: 'Test different CTAs and banners. We\'ll show you which performs better.',
  },
  {
    icon: Palette,
    title: 'Brand Templates',
    description: 'Create on-brand signature templates that marketing controls, not IT.',
  },
  {
    icon: Target,
    title: 'Campaign Attribution',
    description: 'Connect signature clicks to your CRM. See which deals came from email signatures.',
  },
];

const stats = [
  { value: '4,200+', label: 'Banner clicks/month' },
  { value: '23%', label: 'CTR increase' },
  { value: '$0', label: 'Ad spend' },
  { value: '100%', label: 'Brand consistency' },
];

const bannerExamples = [
  { title: 'Product Launch', color: 'from-violet-500 to-purple-600' },
  { title: 'Webinar Promo', color: 'from-blue-500 to-cyan-500' },
  { title: 'Holiday Sale', color: 'from-red-500 to-orange-500' },
  { title: 'Case Study', color: 'from-green-500 to-emerald-500' },
];

export default function MarketingPage() {
  return (
    <>
      <MarketingHero
        variant="violet"
        badge={{ icon: Megaphone, text: 'Built for Marketing Teams' }}
        title="Turn Every Email Into a Marketing Opportunity"
        description="Your team sends thousands of emails every day. Each one is a chance to promote your brand, drive traffic, and generate leads—for free."
        primaryButtonText="Get Started Free"
        primaryButtonHref="/signup"
        image={{
          src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
          alt: 'Marketing team collaboration',
        }}
        imageOverlay={
          <div className="absolute -bottom-6 -right-6 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">+847 clicks this week</p>
                <p className="text-sm text-gray-500">From signature banners</p>
              </div>
            </div>
          </div>
        }
      />

      <MarketingStatsBar stats={stats} variant="dark" />

      {/* Pain Points */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The hidden marketing channel</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Most marketing teams overlook email signatures. But with the right tools, 
              they become your highest-ROI channel.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {painPoints.map((point) => (
              <div key={point.title} className="bg-orange-50 border border-orange-100 rounded-xl p-6">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <point.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">{point.title}</h3>
                <p className="text-sm text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Examples */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Promotional banners that convert</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Add eye-catching banners to every signature. Promote launches, events, 
              content, and more—all from one dashboard.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bannerExamples.map((banner) => (
              <div key={banner.title} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className={`h-24 bg-gradient-to-r ${banner.color} flex items-center justify-center`}>
                  <span className="text-white font-semibold">{banner.title}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MousePointer className="h-4 w-4" />
                    <span>Click to learn more →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Calculate your signature ROI
              </h2>
              <p className="text-gray-600 mb-8">
                A 50-person team sending 30 emails/day = 1,500 daily impressions. 
                That's 45,000 impressions per month—completely free. With just a 
                1% click rate, that's 450 clicks to your landing page.
              </p>
              <div className="bg-violet-50 border border-violet-100 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Example: 50-person team</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Daily emails sent</span>
                    <span className="font-medium">1,500</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Monthly impressions</span>
                    <span className="font-medium">45,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Est. monthly clicks (1% CTR)</span>
                    <span className="font-medium">450</span>
                  </li>
                  <li className="flex justify-between border-t pt-3">
                    <span className="text-gray-600">Cost per click</span>
                    <span className="font-bold text-green-600">$0.00</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt="Marketing analytics dashboard"
                width={800}
                height={600}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <MarketingFeatureGrid
        title="Marketing-first features"
        description="Everything you need to turn email signatures into a measurable marketing channel."
        features={features}
        columns={3}
        iconVariant="violet"
        className="bg-gray-50"
      />

      <MarketingTestimonial
        quote="Our signature banners drive more traffic than some of our paid campaigns. It's essentially free advertising to a warm audience—people already emailing with us."
        author={{
          name: 'Sarah Mitchell',
          title: 'VP of Marketing, GrowthCo',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        }}
        variant="violet"
      />

      <MarketingCTA
        title="Ready to unlock your hidden marketing channel?"
        description="Start turning every email into a marketing opportunity. Free to try, no credit card required."
        primaryButtonText="Get Started Free"
        primaryButtonHref="/signup"
        secondaryButtonText="View Pricing"
        secondaryButtonHref="/pricing"
        variant="default"
      />
    </>
  );
}
